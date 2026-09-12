import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { deleteVideo, getAllVideos, saveVideo } from '@/lib/videos-store';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const videos = await getAllVideos();
  return NextResponse.json({ success: true, videos });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await saveVideo(body);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    const videos = await getAllVideos();
    return NextResponse.json({ success: true, video: result.video, videos });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save video' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Video ID is required' }, { status: 400 });
    }

    const result = await deleteVideo(id);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    const videos = await getAllVideos();
    return NextResponse.json({ success: true, videos });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete video' }, { status: 500 });
  }
}
