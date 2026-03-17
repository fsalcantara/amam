import { NextResponse } from 'next/server';
import { productService } from '@/features/products/services/productService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await productService.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await productService.createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
