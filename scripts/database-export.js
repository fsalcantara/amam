const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../amam.db');
const outputPath = path.resolve(__dirname, '../amam_migration.sql');

if (!fs.existsSync(dbPath)) {
  console.error('Arquivo amam.db não encontrado.');
  process.exit(1);
}

const db = new Database(dbPath);

const products = db.prepare('SELECT * FROM products').all();

let sql = `
-- Backup do Banco Amam Alimentos
-- Gerado para migração HostGator (MySQL)

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  highlights TEXT,
  category VARCHAR(100),
  image TEXT,
  ingredients TEXT,
  allergens TEXT,
  may_contain TEXT,
  contains_gluten TINYINT(1) DEFAULT 1,
  nutritional_info JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE products;

`;

products.forEach(p => {
  const fields = Object.keys(p);
  const values = fields.map(f => {
    let val = p[f];
    if (val === null) return 'NULL';
    if (typeof val === 'string') {
        val = val.replace(/'/g, "''");
        return `'${val}'`;
    }
    return val;
  });
  sql += `INSERT INTO products (${fields.join(', ')}) VALUES (${values.join(', ')});\n`;
});

// EXPORT JOBS
sql += `
CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  area VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
TRUNCATE TABLE jobs;
`;

const jobs = db.prepare('SELECT * FROM jobs').all();
jobs.forEach(j => {
  const fields = Object.keys(j);
  const values = fields.map(f => {
    let val = j[f];
    if (val === null) return 'NULL';
    if (typeof val === 'string') {
        val = val.replace(/'/g, "''");
        return `'${val}'`;
    }
    return val;
  });
  sql += `INSERT INTO jobs (${fields.join(', ')}) VALUES (${values.join(', ')});\n`;
});

// EXPORT APPLICATIONS
sql += `
CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR(50) PRIMARY KEY,
  job_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(250) NOT NULL,
  linkedin VARCHAR(255),
  cv_url LONGTEXT,
  answers JSON,
  proctoring JSON,
  ai_analysis JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
TRUNCATE TABLE applications;
`;

const apps = db.prepare('SELECT * FROM applications').all();
apps.forEach(a => {
  const fields = Object.keys(a);
  const values = fields.map(f => {
    let val = a[f];
    if (val === null) return 'NULL';
    if (typeof val === 'string') {
        val = val.replace(/'/g, "''");
        return `'${val}'`;
    }
    return val;
  });
  sql += `INSERT INTO applications (${fields.join(', ')}) VALUES (${values.join(', ')});\n`;
});

// EXPORT USERS
sql += `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
TRUNCATE TABLE users;
`;

const users = db.prepare('SELECT * FROM users').all();
users.forEach(u => {
  const fields = Object.keys(u);
  const values = fields.map(f => {
    let val = u[f];
    if (val === null) return 'NULL';
    if (typeof val === 'string') {
        val = val.replace(/'/g, "''");
        return `'${val}'`;
    }
    return val;
  });
  sql += `INSERT INTO users (${fields.join(', ')}) VALUES (${values.join(', ')});\n`;
});

fs.writeFileSync(outputPath, sql);

console.log(`\n✅ Sucesso! O arquivo de migração foi gerado em: ${outputPath}`);
console.log(`Importe este arquivo no phpMyAdmin da HostGator.`);
