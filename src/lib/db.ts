import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Inicializa o banco de dados SQLite
const dbPath = path.resolve(process.cwd(), 'amam.db');

// Garante que o diretório existe (caso não seja a raiz)
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath, { verbose: console.log });

// Habilita chaves estrangeiras
db.pragma('foreign_keys = ON');

// Cria a tabela de produtos se não existir (para facilitar o desenvolvimento local)
db.exec(`
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
  )
`);

export default db;
