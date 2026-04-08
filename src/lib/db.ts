import Database from 'better-sqlite3';
import path from 'path';

// --- INTERFACE UNIFICADA ---
export interface DbInterface {
  all: (sql: string, params?: any[]) => Promise<any[]>;
  get: (sql: string, params?: any[]) => Promise<any>;
  run: (sql: string, params?: any[]) => Promise<{ lastInsertRowid?: any; changes?: number }>;
}


let dbInstance: DbInterface;

// --- CONFIGURAÇÃO SQLITE (Local e Produção na HostGator) ---
const dbPath = path.resolve(process.cwd(), 'amam.db');
const sqliteDb = new Database(dbPath);
sqliteDb.pragma('foreign_keys = ON');

// Inicialização síncrona de tabelas para SQLite
sqliteDb.exec(`
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

dbInstance = {
  all: async (sql, params = []) => {
    try {
      return sqliteDb.prepare(sql).all(...params);
    } catch (error) {
      console.error(`[DB Error] all: ${sql}`, error);
      throw error;
    }
  },
  get: async (sql, params = []) => {
    try {
      return sqliteDb.prepare(sql).get(...params);
    } catch (error) {
      console.error(`[DB Error] get: ${sql}`, error);
      throw error;
    }
  },
  run: async (sql, params = []) => {
    try {
      const result = sqliteDb.prepare(sql).run(...params);
      return { lastInsertRowid: result.lastInsertRowid, changes: result.changes };
    } catch (error) {
      console.error(`[DB Error] run: ${sql}`, error);
      throw error;
    }
  }
};

console.log('✅ [DB] Conectado ao SQLite (Local/Produção)');


export default dbInstance;
