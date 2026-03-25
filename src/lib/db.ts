import mysql from 'mysql2/promise';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// --- CONFIGURAÇÃO ---
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.DB_HOST;

// --- INTERFACE UNIFICADA ---
export interface DbInterface {
  all: (sql: string, params?: any[]) => Promise<any[]>;
  get: (sql: string, params?: any[]) => Promise<any>;
  run: (sql: string, params?: any[]) => Promise<{ lastInsertRowid?: any; changes?: number }>;
}

let dbInstance: DbInterface;

if (isProduction) {
  // CONFIGURAÇÃO MYSQL (Produção - HostGator)
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'amam_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  dbInstance = {
    all: async (sql, params = []) => {
      const [rows] = await pool.execute(sql.replace(/\?/g, '?'), params);
      return rows as any[];
    },
    get: async (sql, params = []) => {
      const [rows] = await pool.execute(sql, params);
      return (rows as any[])[0];
    },
    run: async (sql, params = []) => {
      const [result] = await pool.execute(sql.replace(/\?/g, '?'), params);
      const res = result as any;
      return { 
        lastInsertRowid: res.insertId, 
        changes: res.affectedRows 
      };
    }
  };
  
  console.log('✅ [DB] Conectado ao MySQL (Produção)');
} else {
  // CONFIGURAÇÃO SQLITE (Desenvolvimento Local)
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
    all: async (sql, params = []) => sqliteDb.prepare(sql).all(...params),
    get: async (sql, params = []) => sqliteDb.prepare(sql).get(...params),
    run: async (sql, params = []) => {
      const result = sqliteDb.prepare(sql).run(...params);
      return { lastInsertRowid: result.lastInsertRowid, changes: result.changes };
    }
  };
  
  console.log('✅ [DB] Conectado ao SQLite (Local)');
}

export default dbInstance;
