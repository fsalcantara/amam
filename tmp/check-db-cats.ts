import db from '../src/lib/db';

async function run() {
  try {
    const cats = db.prepare('SELECT DISTINCT category FROM products').all() as any[];
    console.log('Categorias no DB:', cats.map(c => c.category));
    
    process.exit(0);
  } catch (err) {
    console.error('Erro:', err);
    process.exit(1);
  }
}

run();
