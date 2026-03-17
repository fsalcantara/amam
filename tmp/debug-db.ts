import pool from '../src/lib/db';

async function check() {
  try {
    console.log('--- TESTE DE CONEXÃO ---');
    console.log('Configuração:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });

    const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
    console.log('✅ Conexão OK!');
    console.log('📊 Total de produtos no banco:', (rows as any)[0].count);
    
    if ((rows as any)[0].count > 0) {
      const [products] = await pool.query('SELECT name, slug FROM products LIMIT 5');
      console.log('📋 Primeiros produtos:', products);
    }
    
    process.exit(0);
  } catch (err: any) {
    console.error('❌ ERRO CRÍTICO:', err.message);
    if (err.code === 'ER_NO_SUCH_TABLE') {
      console.error('👉 A tabela "products" não existe. Você precisa rodar o script setup-db.sql!');
    }
    process.exit(1);
  }
}

check();
