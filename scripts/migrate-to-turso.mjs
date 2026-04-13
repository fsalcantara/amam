/**
 * Migrate local SQLite (amam.db) → Turso HTTP API
 * Run: node scripts/migrate-to-turso.mjs
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Load .env.local manually ---
const envPath = path.resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  env[key] = val;
}

const TURSO_URL = env.TURSO_DATABASE_URL.replace('libsql://', 'https://').replace(/\/$/, '');
const TURSO_TOKEN = env.TURSO_AUTH_TOKEN;

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error('❌ TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing in .env.local');
  process.exit(1);
}

// --- Open local SQLite ---
const dbPath = path.resolve(__dirname, '..', 'amam.db');
const sqlite = new Database(dbPath, { readonly: true });
console.log(`✅ Opened local SQLite: ${dbPath}`);

// --- Turso HTTP execute ---
async function tursoExecute(sql, args = []) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: {
            sql,
            args: args.map(v => {
              if (v === null || v === undefined) return { type: 'null' };
              if (typeof v === 'number') return { type: 'integer', value: String(v) };
              return { type: 'text', value: String(v) };
            }),
          },
        },
        { type: 'close' },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Turso error: ${err}`);
  }

  const data = await res.json();
  const result = data.results?.[0];
  if (result?.type === 'error') {
    throw new Error(`Turso SQL error: ${result.error?.message}`);
  }
  return result?.response?.result;
}

// --- Migrate table ---
async function migrateTable(tableName, insertSql, rowMapper) {
  const rows = sqlite.prepare(`SELECT * FROM ${tableName}`).all();
  console.log(`\n📦 ${tableName}: ${rows.length} rows found`);

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const args = rowMapper(row);
    try {
      await tursoExecute(insertSql, args);
      inserted++;
      process.stdout.write('.');
    } catch (err) {
      if (err.message.includes('UNIQUE constraint failed') || err.message.includes('already exists')) {
        skipped++;
        process.stdout.write('s');
      } else {
        console.error(`\n⚠️  Row skipped: ${err.message}`);
        skipped++;
      }
    }
  }
  console.log(`\n  ✅ Inserted: ${inserted}, Skipped: ${skipped}`);
}

// --- Main ---
async function main() {
  console.log(`\n🚀 Starting migration to Turso: ${TURSO_URL}\n`);

  // Verify connection
  try {
    await tursoExecute('SELECT 1');
    console.log('✅ Turso connection OK');
  } catch (err) {
    console.error('❌ Could not connect to Turso:', err.message);
    process.exit(1);
  }

  // Create tables if they don't exist
  console.log('\n📐 Creating tables if not exist...');
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
      type TEXT NOT NULL,
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

  for (const stmt of INIT_STATEMENTS) {
    await tursoExecute(stmt);
  }
  console.log('✅ Tables ready');

  // Migrate users
  await migrateTable(
    'users',
    `INSERT OR IGNORE INTO users (id, username, password, name, role, is_active, force_password_reset, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    row => [row.id, row.username, row.password, row.name, row.role,
            row.is_active ?? 1, row.force_password_reset ?? 0, row.created_at]
  );

  // Migrate products
  await migrateTable(
    'products',
    `INSERT OR IGNORE INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    row => [row.id, row.name, row.slug, row.description, row.highlights, row.category,
            row.image, row.ingredients, row.allergens, row.may_contain,
            row.contains_gluten ?? 1, row.nutritional_info, row.created_at, row.updated_at]
  );

  // Migrate jobs
  await migrateTable(
    'jobs',
    `INSERT OR IGNORE INTO jobs (id, title, area, location, type, description, requirements, benefits, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    row => [row.id, row.title, row.area, row.location, row.type,
            row.description, row.requirements, row.benefits,
            row.is_active ?? 1, row.created_at, row.updated_at]
  );

  // Migrate applications
  await migrateTable(
    'applications',
    `INSERT OR IGNORE INTO applications (id, job_id, name, cpf, email, phone, linkedin, cv_url, answers, proctoring, ai_analysis, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    row => [row.id, row.job_id, row.name, row.cpf, row.email, row.phone,
            row.linkedin, row.cv_url, row.answers, row.proctoring, row.ai_analysis, row.created_at]
  );

  console.log('\n\n🎉 Migration complete!\n');
  sqlite.close();
}

main().catch(err => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});
