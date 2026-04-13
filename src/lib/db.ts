import path from 'path';

// --- INTERFACE UNIFICADA ---
export interface DbInterface {
  all: (sql: string, params?: any[]) => Promise<any[]>;
  get: (sql: string, params?: any[]) => Promise<any>;
  run: (sql: string, params?: any[]) => Promise<{ lastInsertRowid?: any; changes?: number }>;
}

const INIT_SQL = `
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    highlights TEXT,
    category TEXT,
    image TEXT,
    ingredients TEXT,
    allergens TEXT,
    may_contain TEXT,
    contains_gluten INTEGER DEFAULT 1,
    nutritional_info TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    area TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    linkedin TEXT,
    cv_url TEXT,
    answers TEXT,
    proctoring TEXT,
    ai_analysis TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    force_password_reset INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

let dbInstance: DbInterface;

// --- TURSO HTTP API (Vercel / Produção) ---
if (process.env.TURSO_DATABASE_URL) {
  const TURSO_URL = process.env.TURSO_DATABASE_URL
    .replace(/^libsql:\/\//, 'https://')
    .replace(/\/$/, '');
  const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN ?? '';

  function mapArg(v: any) {
    if (v === null || v === undefined) return { type: 'null' };
    if (typeof v === 'number') return { type: Number.isInteger(v) ? 'integer' : 'float', value: String(v) };
    return { type: 'text', value: String(v) };
  }

  async function tursoExecute(sql: string, args: any[] = []) {
    const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TURSO_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql, args: args.map(mapArg) } },
          { type: 'close' },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Turso HTTP error ${res.status}: ${err}`);
    }

    const data = await res.json();
    const first = data.results?.[0];

    if (first?.type === 'error') {
      throw new Error(`Turso SQL error: ${first.error?.message ?? JSON.stringify(first.error)}`);
    }

    return first?.response?.result;
  }

  // Initialize tables on startup
  (async () => {
    for (const stmt of INIT_SQL.split(';').map((s: string) => s.trim()).filter(Boolean)) {
      await tursoExecute(stmt);
    }
  })().catch(console.error);

  function parseRows(result: any): any[] {
    if (!result?.rows || !result?.cols) return [];
    const cols = result.cols.map((c: any) => c.name);
    return result.rows.map((row: any[]) =>
      Object.fromEntries(cols.map((col: string, i: number) => [col, row[i]?.value ?? null]))
    );
  }

  dbInstance = {
    all: async (sql, params = []) => {
      const result = await tursoExecute(sql, params);
      return parseRows(result);
    },
    get: async (sql, params = []) => {
      const result = await tursoExecute(sql, params);
      return parseRows(result)[0] ?? null;
    },
    run: async (sql, params = []) => {
      const result = await tursoExecute(sql, params);
      return {
        lastInsertRowid: result?.last_insert_rowid,
        changes: result?.affected_row_count ?? 0,
      };
    },
  };

  console.log('✅ [DB] Conectado ao Turso HTTP API (Produção)');

// --- SQLITE LOCAL ---
} else {
  const Database = require('better-sqlite3');
  const dbPath = process.env.DB_PATH
    ? path.resolve(process.env.DB_PATH)
    : path.resolve(process.cwd(), 'amam.db');

  const sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.pragma('foreign_keys = ON');
  sqliteDb.pragma('busy_timeout = 5000');
  sqliteDb.exec(INIT_SQL);

  dbInstance = {
    all: async (sql, params = []) => sqliteDb.prepare(sql).all(...params),
    get: async (sql, params = []) => sqliteDb.prepare(sql).get(...params) ?? null,
    run: async (sql, params = []) => {
      const result = sqliteDb.prepare(sql).run(...params);
      return { lastInsertRowid: result.lastInsertRowid, changes: result.changes };
    },
  };

  console.log(`✅ [DB] Conectado ao SQLite local: ${dbPath}`);
}

export default dbInstance;
