import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { saveProductImage } from '@/lib/products-store';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file');
  const slug = String(formData.get('slug') || '');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ success: false, error: 'Product slug is required' }, { status: 400 });
  }

  const result = await saveProductImage(slug, file);
  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
