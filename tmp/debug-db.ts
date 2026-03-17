import db from '../src/lib/db';

function check() {
  try {
    console.log('--- TESTE DE CONEXÃO SQLITE ---');
    console.log('Arquivo:', 'amam.db');

    const row = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    console.log('✅ Conexão OK!');
    console.log('📊 Total de produtos no banco:', row.count);
    
    if (row.count > 0) {
      const products = db.prepare('SELECT name, slug FROM products LIMIT 5').all();
      console.log('📋 Primeiros produtos:', products);
    }
    
    process.exit(0);
  } catch (err: any) {
    console.error('❌ ERRO CRÍTICO:', err.message);
    if (err.message.includes('no such table')) {
      console.error('👉 A tabela "products" não existe.');
    }
    process.exit(1);
  }
}

check();
