'use client';

import { useState } from 'react';

const caseStudies = [
  {
    id: 'featured',
    title: 'COUNTERFEIT SERUM NETWORK',
    subtitle: 'INVESTIGATION • 2024',
    description: 'Uncovered a $2.3M counterfeit serum ring across 14 online marketplaces. Our detection flagged inconsistencies in packaging UV markers.',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80',
    result: '14,000+ FAKES REMOVED',
    featured: true,
  },
  {
    id: 'case-2',
    title: 'LIPSTICK BATCH FRAUD',
    subtitle: 'DETECTION • 2024',
    description: 'Identified expired products relabeled with new batch numbers at a major retailer.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    result: '8,200 UNITS FLAGGED',
  },
  {
    id: 'case-3',
    title: 'PERFUME AUTHENTICATION',
    subtitle: 'PARTNERSHIP • 2024',
    description: 'Integrated verification system for a luxury fragrance house across 200+ retail locations.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    result: '99.9% ACCURACY',
  },
  {
    id: 'case-4',
    title: 'SKINCARE SUPPLY CHAIN',
    subtitle: 'AUDIT • 2024',
    description: 'Full supply chain audit revealing 3 unauthorized distributors selling diluted formulations.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    result: '3 SOURCES BLOCKED',
  },
  {
    id: 'case-5',
    title: 'PALETTE VERIFICATION',
    subtitle: 'CONSUMER REPORT • 2024',
    description: 'Mass consumer campaign that verified 50,000 eyeshadow palettes in a single weekend.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    result: '50K VERIFIED',
  },
];

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
          <span className="text-label text-xs block mb-4" style={{ color: 'var(--cinematic-pink)' }}>
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
            style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
          >
            Every detection tells a story. See how we&apos;ve protected millions
            of consumers from counterfeit cosmetics.
          </p>
        </div>

        {/* Featured Case — Full Width */}
        <div
          className="relative w-full mb-6 overflow-hidden group cursor-pointer"
          style={{ aspectRatio: '16/9', border: '1px solid var(--cinematic-border)' }}
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
          <div
            className="absolute top-5 right-5 z-20 px-4 py-2 glass"
          >
            <span className="text-label text-xs" style={{ color: 'var(--cinematic-cyan)' }}>
              {featured.result}
            </span>
          </div>

          <img
            src={featured.image}
            alt={featured.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              hoveredId === featured.id ? 'scale-105 grayscale-0' : 'grayscale'
            }`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <span
              className="text-label text-xs block mb-2"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              {featured.subtitle}
            </span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
              {featured.title}
            </h3>
            <p className="text-sm max-w-xl" style={{ color: 'var(--cinematic-text-secondary)' }}>
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 15L15 5M15 5H5M15 5V15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sub-cases 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grid.map((c) => (
            <div
              key={c.id}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: '4/3',
                border: '1px solid var(--cinematic-border)',
              }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              id={c.id}
            >
              {/* Result Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 glass">
                <span className="text-label text-[10px]" style={{ color: 'var(--cinematic-cyan)' }}>
                  {c.result}
                </span>
              </div>

              <img
                src={c.image}
                alt={c.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredId === c.id ? 'scale-105 grayscale-0' : 'grayscale'
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span
                  className="text-label text-xs block mb-1"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  {c.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
                  {c.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
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
