import { NextResponse } from 'next/server';
import { getAllVideos } from '@/lib/videos-store';

export async function GET() {
  try {
    const videos = await getAllVideos();
    return NextResponse.json({ success: true, videos });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch videos' }, { status: 500 });
  }
}
