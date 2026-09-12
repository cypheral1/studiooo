import { NextResponse } from 'next/server';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs-store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const blog = await getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog });
    }

    const blogs = await getAllBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
