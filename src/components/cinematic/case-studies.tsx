'use client';

import { useState } from 'react';

const caseStudies = [
  {
    id: 'featured',
    title: 'COUNTERFEIT SERUM NETWORK',
    subtitle: 'INVESTIGATION • 2024',
    description:
      'Uncovered a $2.3M counterfeit serum ring across 14 online marketplaces. Our detection flagged inconsistencies in packaging UV markers.',
    videoId: 'WQtkgwN3IZU',
    channelUrl: 'https://youtube.com/shorts/WQtkgwN3IZU',
    result: '14,000+ FAKES REMOVED',
    featured: true,
  },
  {
    id: 'case-2',
    title: 'LIPSTICK BATCH FRAUD',
    subtitle: 'DETECTION • 2024',
    description:
      'Identified expired products relabeled with new batch numbers at a major retailer.',
    videoId: 'MvULpi_qcgo',
    channelUrl: 'https://youtube.com/shorts/MvULpi_qcgo',
    result: '8,200 UNITS FLAGGED',
  },
  {
    id: 'case-3',
    title: 'PERFUME AUTHENTICATION',
    subtitle: 'PARTNERSHIP • 2024',
    description:
      'Integrated verification system for a luxury fragrance house across 200+ retail locations.',
    videoId: 'FWp6Cmc5agk',
    channelUrl: 'https://youtube.com/shorts/FWp6Cmc5agk',
    result: '99.9% ACCURACY',
  },
  {
    id: 'case-4',
    title: 'SKINCARE SUPPLY CHAIN',
    subtitle: 'AUDIT • 2024',
    description:
      'Full supply chain audit revealing 3 unauthorized distributors selling diluted formulations.',
    videoId: 'IG7S_nYzc_k',
    channelUrl: 'https://youtube.com/shorts/IG7S_nYzc_k',
    result: '3 SOURCES BLOCKED',
  },
];

function VideoEmbed({
  videoId,
  title,
  channelUrl,
}: {
  videoId: string;
  title: string;
  channelUrl: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0 z-10"
      />
    );
  }

  return (
    <>
      {/* Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      {/* Play button */}
      <button
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 z-20 flex items-center justify-center group/play"
        aria-label={`Play ${title}`}
        id={`play-${videoId}`}
      >
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
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

      {/* YouTube link badge */}
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-14 z-30 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors glass hover:bg-white/20"
        style={{ color: 'var(--cinematic-text-secondary)' }}
        id={`yt-link-${videoId}`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        YouTube
      </a>
    </>
  );
}

export function CaseStudies() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const featured = caseStudies[0];
  const grid = caseStudies.slice(1);

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
            className="text-label text-xs block mb-4"
            style={{ color: 'var(--cinematic-pink)' }}
          >
            REAL RESULTS
          </span>
          <h2 className="text-section">
            CASE
            <br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
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
        <div
          className="relative w-full mb-6 overflow-hidden group cursor-pointer"
          style={{
            aspectRatio: '16/9',
            border: '1px solid var(--cinematic-border)',
          }}
          onMouseEnter={() => setHoveredId(featured.id)}
          onMouseLeave={() => setHoveredId(null)}
          id="featured-case"
        >
          {/* macOS Window Controls */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
            <div className="window-dot window-dot--red" />
            <div className="window-dot window-dot--yellow" />
            <div className="window-dot window-dot--green" />
          </div>

          {/* Result Badge */}
          <div className="absolute top-5 right-5 z-20 px-4 py-2 glass">
            <span
              className="text-label text-xs"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              {featured.result}
            </span>
          </div>

          {/* Video Embed */}
          <VideoEmbed
            videoId={featured.videoId}
            title={featured.title}
            channelUrl={featured.channelUrl}
          />

          {/* Bottom Text Overlay (hidden when playing) */}
          <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
            <span
              className="text-label text-xs block mb-2"
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

          {/* Arrow */}
          <div className="absolute bottom-8 right-8 z-10">
            <div
              className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 ${
                hoveredId === featured.id
                  ? 'bg-white text-black border-white'
                  : 'border-white/30 text-white'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 15L15 5M15 5H5M15 5V15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sub-cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grid.map((c) => (
            <div
              key={c.id}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: '9/16',
                border: '1px solid var(--cinematic-border)',
              }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              id={c.id}
            >
              {/* Result Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 glass">
                <span
                  className="text-label text-[10px]"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  {c.result}
                </span>
              </div>

              {/* Video Embed */}
              <VideoEmbed
                videoId={c.videoId}
                title={c.title}
                channelUrl={c.channelUrl}
              />

              {/* Bottom info overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                <span
                  className="text-label text-xs block mb-1"
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
