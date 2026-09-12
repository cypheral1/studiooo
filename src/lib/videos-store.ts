import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ShowcaseVideo } from '@/types/product';
import { slugify } from '@/lib/admin-auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const VIDEOS_FILE = path.join(DATA_DIR, 'videos.json');

const INITIAL_VIDEOS: ShowcaseVideo[] = [
  {
    id: 'featured',
    title: 'COUNTERFEIT SERUM NETWORK',
    subtitle: 'INVESTIGATION • 2024',
    description: 'Uncovered a $2.3M counterfeit serum ring across 14 online marketplaces. Our detection flagged inconsistencies in packaging UV markers.',
    youtubeId: 'WQtkgwN3IZU',
    channelUrl: 'https://youtube.com/shorts/WQtkgwN3IZU',
    result: '14,000+ FAKES REMOVED',
    category: 'Skincare',
    featured: true,
  },
  {
    id: 'case-2',
    title: 'LIPSTICK BATCH FRAUD',
    subtitle: 'DETECTION • 2024',
    description: 'Identified expired products relabeled with new batch numbers at a major retailer.',
    youtubeId: 'MvULpi_qcgo',
    channelUrl: 'https://youtube.com/shorts/MvULpi_qcgo',
    result: '8,200 UNITS FLAGGED',
    category: 'Makeup',
  },
  {
    id: 'case-3',
    title: 'PERFUME AUTHENTICATION',
    subtitle: 'PARTNERSHIP • 2024',
    description: 'Integrated verification system for a luxury fragrance house across 200+ retail locations.',
    youtubeId: 'FWp6Cmc5agk',
    channelUrl: 'https://youtube.com/shorts/FWp6Cmc5agk',
    result: '99.9% ACCURACY',
    category: 'Eye Care',
  },
  {
    id: 'case-4',
    title: 'SKINCARE SUPPLY CHAIN',
    subtitle: 'AUDIT • 2024',
    description: 'Full supply chain audit revealing 3 unauthorized distributors selling diluted formulations.',
    youtubeId: 'IG7S_nYzc_k',
    channelUrl: 'https://youtube.com/shorts/IG7S_nYzc_k',
    result: '3 SOURCES BLOCKED',
    category: 'Skincare',
  },
];

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getAllVideos(): Promise<ShowcaseVideo[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(VIDEOS_FILE, 'utf8');
    const videos = JSON.parse(raw) as ShowcaseVideo[];
    if (videos && videos.length > 0) return videos;
  } catch {
    // missing or corrupted
  }

  await fs.writeFile(VIDEOS_FILE, JSON.stringify(INITIAL_VIDEOS, null, 2), 'utf8');
  return INITIAL_VIDEOS;
}

export async function saveVideo(
  input: Omit<ShowcaseVideo, 'id' | 'createdAt'> & { id?: string }
): Promise<{ success: boolean; video?: ShowcaseVideo; error?: string }> {
  if (!input.title?.trim()) {
    return { success: false, error: 'Video title is required' };
  }

  const videos = await getAllVideos();
  const id = input.id || slugify(input.title) || `vid-${Date.now()}`;
  const now = new Date().toISOString();

  const existingIdx = videos.findIndex((v) => v.id === id);

  const videoRecord: ShowcaseVideo = {
    id,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || '',
    description: input.description?.trim() || '',
    videoUrl: input.videoUrl?.trim() || undefined,
    youtubeId: input.youtubeId?.trim() || undefined,
    channelUrl: input.channelUrl?.trim() || undefined,
    result: input.result?.trim() || undefined,
    category: input.category?.trim() || 'Skincare',
    featured: input.featured ?? false,
    createdAt: existingIdx >= 0 ? videos[existingIdx].createdAt : now,
  };

  if (existingIdx >= 0) {
    videos[existingIdx] = videoRecord;
  } else {
    videos.push(videoRecord);
  }

  await ensureDataDir();
  await fs.writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2), 'utf8');
  return { success: true, video: videoRecord };
}

export async function deleteVideo(id: string): Promise<{ success: boolean; error?: string }> {
  const videos = await getAllVideos();
  const filtered = videos.filter((v) => v.id !== id);

  if (filtered.length === videos.length) {
    return { success: false, error: 'Video not found' };
  }

  await ensureDataDir();
  await fs.writeFile(VIDEOS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true };
}
