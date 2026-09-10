import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from '@/lib/blogs-store';

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const blogs = await getAllBlogs();
  return NextResponse.json({ success: true, blogs });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await createBlog(body);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error creating blog' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, ...input } = body;

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Blog slug is required' }, { status: 400 });
    }

    const result = await updateBlog(slug, input);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Blog slug is required' }, { status: 400 });
    }

    const result = await deleteBlog(slug);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error deleting blog' },
      { status: 500 }
    );
  }
}
