import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { addCategory, deleteCategory, getAllCategories } from '@/lib/categories-store';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const categories = await getAllCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, description } = await req.json();
    const result = await addCategory(name, description);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    const categories = await getAllCategories();
    return NextResponse.json({ success: true, category: result.category, categories });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to add category' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    const result = await deleteCategory(id);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    const categories = await getAllCategories();
    return NextResponse.json({ success: true, categories });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 });
  }
}
