// --- INTERFACE UNIFICADA ---
export interface DbInterface {
  all: (sql: string, params?: any[]) => Promise<any[]>;
  get: (sql: string, params?: any[]) => Promise<any>;
  run: (sql: string, params?: any[]) => Promise<{ lastInsertRowid?: any; changes?: number }>;
}

const INIT_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS products (
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
  )`,
  `CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    area TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'CLT',
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS applications (
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
  )`,
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    force_password_reset INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
];

// --- TURSO HTTP API ---
const rawUrl = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN ?? '';

if (!rawUrl) {
  throw new Error(
    '[DB] TURSO_DATABASE_URL não configurado. Adicione a variável de ambiente.'
  );
}

const TURSO_URL = rawUrl
  .replace(/^libsql:\/\//, 'https://')
  .replace(/\/$/, '');

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

function parseRows(result: any): any[] {
  if (!result?.rows || !result?.cols) return [];
  const cols = result.cols.map((c: any) => c.name);
  return result.rows.map((row: any[]) =>
    Object.fromEntries(cols.map((col: string, i: number) => [col, row[i]?.value ?? null]))
  );
}

// Inicializa tabelas ao subir o módulo
(async () => {
  for (const stmt of INIT_STATEMENTS) {
    await tursoExecute(stmt);
  }
  console.log('✅ [DB] Turso conectado e tabelas verificadas');
})().catch(err => console.error('❌ [DB] Erro na inicialização:', err.message));

const dbInstance: DbInterface = {
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

export default dbInstance;
