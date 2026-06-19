import { NextResponse } from 'next/server';
import { getAllProducts, getFeaturedProducts } from '@/lib/products-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get('featured') === 'true';

  if (featured) {
    const products = await getFeaturedProducts();
    return NextResponse.json({ success: true, products });
  }

  const products = await getAllProducts();
  return NextResponse.json({ success: true, products });
}
