import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/features/products/data/mock-data';
import { productService } from '@/features/products/services/productService';
import db from '@/lib/db';

export async function GET() {
  try {
    // 1. Check if table is empty
    const result = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    const count = result.count;

    if (count > 0) {
      return NextResponse.json({ message: 'Banco já possui dados. Seed cancelado para evitar duplicatas.' });
    }

    // 2. Insert mock data
    for (const product of PRODUCTS) {
      await productService.createProduct(product);
    }

    return NextResponse.json({ 
      message: 'Seed concluído com sucesso!', 
      count: PRODUCTS.length 
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Erro ao popular banco. Verifique se a tabela "products" foi criada.' }, { status: 500 });
  }
}
