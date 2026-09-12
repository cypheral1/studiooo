'use client';

import { useState, useEffect } from 'react';
import type { ShowcaseVideo } from '@/types/product';

const DEFAULT_CASE_STUDIES: ShowcaseVideo[] = [
  {
    id: 'featured',
    title: 'COUNTERFEIT SERUM NETWORK',
    subtitle: 'INVESTIGATION • 2024',
    description:
      'Uncovered a $2.3M counterfeit serum ring across 14 online marketplaces. Our detection flagged inconsistencies in packaging UV markers.',
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
    description:
      'Identified expired products relabeled with new batch numbers at a major retailer.',
    youtubeId: 'MvULpi_qcgo',
    channelUrl: 'https://youtube.com/shorts/MvULpi_qcgo',
    result: '8,200 UNITS FLAGGED',
    category: 'Makeup',
  },
  {
    id: 'case-3',
    title: 'PERFUME AUTHENTICATION',
    subtitle: 'PARTNERSHIP • 2024',
    description:
      'Integrated verification system for a luxury fragrance house across 200+ retail locations.',
    youtubeId: 'FWp6Cmc5agk',
    channelUrl: 'https://youtube.com/shorts/FWp6Cmc5agk',
    result: '99.9% ACCURACY',
    category: 'Eye Care',
  },
  {
    id: 'case-4',
    title: 'SKINCARE SUPPLY CHAIN',
    subtitle: 'AUDIT • 2024',
    description:
      'Full supply chain audit revealing 3 unauthorized distributors selling diluted formulations.',
    youtubeId: 'IG7S_nYzc_k',
    channelUrl: 'https://youtube.com/shorts/IG7S_nYzc_k',
    result: '3 SOURCES BLOCKED',
    category: 'Skincare',
  },
];

function extractYoutubeId(val?: string): string | null {
  if (!val) return null;
  const match = val.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#&?]*)/);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(val.trim())) return val.trim();
  return null;
}

function VideoEmbed({
  video,
}: {
  video: ShowcaseVideo;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const youtubeId = extractYoutubeId(video.youtubeId) || extractYoutubeId(video.videoUrl);
  const isDirectVideo = !!video.videoUrl && !youtubeId;

  if (isPlaying) {
    if (isDirectVideo) {
      return (
        <video
          src={video.videoUrl}
          autoPlay
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 bg-black"
        />
      );
    }

    if (youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0 z-10"
        />
      );
    }
  }

  return (
    <>
      {/* Thumbnail or Video Poster */}
      {youtubeId ? (
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      ) : isDirectVideo ? (
        <video
          src={video.videoUrl}
          className="w-full h-full object-cover opacity-70 bg-black"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
          <span className="text-white/20 text-4xl font-black uppercase">VIDEO</span>
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      {/* Play button */}
      <button
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 z-20 flex items-center justify-center group/play cursor-pointer"
        aria-label={`Play ${video.title}`}
        id={`play-${video.id}`}
      >
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-[0_0_30px_rgba(6,182,212,0.5)] shadow-lg"
          style={{
            background:
              'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>

      {/* Link badge if available */}
      {video.channelUrl && (
        <a
          href={video.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-14 z-30 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors glass hover:bg-white/20 rounded-lg"
          style={{ color: 'var(--cinematic-text-secondary)' }}
          id={`yt-link-${video.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch
        </a>
      )}
    </>
  );
}

export function CaseStudies() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cases, setCases] = useState<ShowcaseVideo[]>(DEFAULT_CASE_STUDIES);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.videos?.length > 0) {
          setCases(data.videos);
        }
      })
      .catch(() => {});
  }, []);

  const featured = cases[0] || DEFAULT_CASE_STUDIES[0];
  const grid = cases.length > 1 ? cases.slice(1) : DEFAULT_CASE_STUDIES.slice(1);

  return (
    <section
      className="py-32 px-6"
      id="case-studies"
      style={{ background: 'var(--cinematic-card)' }}
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span
            className="text-label text-xs block mb-4 font-bold"
            style={{ color: 'var(--cinematic-pink)' }}
          >
            REAL RESULTS & INVESTIGATIONS
          </span>
          <h2 className="text-section">
            CASE
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STUDIES
            </span>
          </h2>
          <p
            className="mt-6 max-w-xl"
            style={{
              color: 'var(--cinematic-text-secondary)',
              fontWeight: 300,
            }}
          >
            Every detection tells a story. See how we&apos;ve protected millions
            of consumers from counterfeit cosmetics.
          </p>
        </div>

        {/* Featured Case — Full Width */}
        {featured && (
          <div
            className="relative w-full mb-6 overflow-hidden group cursor-pointer rounded-2xl"
            style={{
              aspectRatio: '16/9',
              border: '1px solid var(--cinematic-border)',
            }}
            onMouseEnter={() => setHoveredId(featured.id)}
            onMouseLeave={() => setHoveredId(null)}
            id="featured-case"
          >
            {/* Window Controls */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
              <div className="window-dot window-dot--red" />
              <div className="window-dot window-dot--yellow" />
              <div className="window-dot window-dot--green" />
            </div>

            {/* Result Badge & Category */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
              {featured.category && (
                <div className="px-3 py-1.5 glass rounded-lg">
                  <span className="text-label text-xs uppercase font-bold" style={{ color: 'var(--cinematic-pink)' }}>
                    {featured.category}
                  </span>
                </div>
              )}
              {featured.result && (
                <div className="px-4 py-2 glass rounded-lg">
                  <span
                    className="text-label text-xs font-bold"
                    style={{ color: 'var(--cinematic-cyan)' }}
                  >
                    {featured.result}
                  </span>
                </div>
              )}
            </div>

            {/* Video Embed */}
            <VideoEmbed video={featured} />

            {/* Bottom Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
              <span
                className="text-label text-xs block mb-2 font-bold"
                style={{ color: 'var(--cinematic-cyan)' }}
              >
                {featured.subtitle}
              </span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
                {featured.title}
              </h3>
              <p
                className="text-sm max-w-xl"
                style={{ color: 'var(--cinematic-text-secondary)' }}
              >
                {featured.description}
              </p>
            </div>
          </div>
        )}

        {/* Sub-cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grid.map((c) => (
            <div
              key={c.id}
              className="relative overflow-hidden group cursor-pointer rounded-2xl"
              style={{
                aspectRatio: '9/16',
                border: '1px solid var(--cinematic-border)',
              }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              id={c.id}
            >
              {/* Result Badge */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1">
                {c.category && (
                  <div className="px-2.5 py-1 glass rounded-md">
                    <span className="text-label text-[10px] uppercase font-bold" style={{ color: 'var(--cinematic-pink)' }}>
                      {c.category}
                    </span>
                  </div>
                )}
                {c.result && (
                  <div className="px-3 py-1.5 glass rounded-md">
                    <span
                      className="text-label text-[10px] font-bold"
                      style={{ color: 'var(--cinematic-cyan)' }}
                    >
                      {c.result}
                    </span>
                  </div>
                )}
              </div>

              {/* Video Embed */}
              <VideoEmbed video={c} />

              {/* Bottom info overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                <span
                  className="text-label text-xs block mb-1 font-bold"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  {c.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
                  {c.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--cinematic-text-secondary)' }}
                >
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
