import { NextResponse } from 'next/server';
import { productService } from '@/features/products/services/productService';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await productService.getProductById(id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const updatedProduct = await productService.updateProduct(id, body);
  if (!updatedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await productService.deleteProduct(id);
  return new NextResponse(null, { status: 204 });
}
