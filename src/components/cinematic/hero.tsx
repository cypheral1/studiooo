'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    src: '/images/slideshow/slide-1-spf-cream.jpg',
    alt: 'SPF Cream — Fake vs Original comparison',
    caption: 'SPF CREAM',
    detail: 'Spot the difference in cap alignment & label quality',
  },
  {
    src: '/images/slideshow/slide-2-relief-cream.jpg',
    alt: 'Dr. Althea 345 Relief Cream — Real vs Fake',
    caption: 'RELIEF CREAM',
    detail: 'Check the "PRO LAB" branding and bottom text',
  },
  {
    src: '/images/slideshow/slide-3-texture-test.jpg',
    alt: 'Texture comparison — Fake vs Real product',
    caption: 'TEXTURE TEST',
    detail: 'Color & consistency reveal the truth instantly',
  },
  {
    src: '/images/slideshow/slide-4-wrinkle-pore.jpg',
    alt: 'Celimax Wrinkle & Pore — tube top comparison',
    caption: 'WRINKLE & PORE',
    detail: 'Embossed expiry date vs missing batch codes',
  },
  {
    src: '/images/slideshow/slide-5-centella-box.jpg',
    alt: 'SKIN1004 Madagascar Centella Cream — packaging check',
    caption: 'CENTELLA CREAM',
    detail: 'Authentic packaging shows batch number & MFG date',
  },
];

export function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  /* Auto-advance every 5 s */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      id="hero"
      style={{ background: 'var(--cinematic-bg)' }}
    >
      {/* Massive background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-hero"
          style={{
            color: 'rgba(18, 14, 22, 0.05)',
            fontSize: '20vw',
            whiteSpace: 'nowrap',
          }}
        >
          VERIFY
        </span>
      </div>

      {/* ─── Slideshow ─── */}
      <div className="relative z-10 w-[88vw] max-w-[520px] aspect-[3/4] md:aspect-[4/5]">
        {/* Glass frame */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/15">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'scale(1)' : 'scale(1.08)',
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          ))}

          {/* Slide caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <span
              className="text-label block text-[10px] mb-1"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <h2 className="text-white text-xl md:text-2xl font-black tracking-tight uppercase leading-tight">
              {slides[current].caption}
            </h2>
            <p className="text-white/60 text-xs md:text-sm mt-1 font-light">
              {slides[current].detail}
            </p>
          </div>
        </div>

        {/* ─── Nav buttons ─── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute -left-5 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute -right-5 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* ─── Dot indicators ─── */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group p-1"
            >
              <div
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: i === current ? '28px' : '10px',
                  background:
                    i === current
                      ? 'var(--cinematic-cyan)'
                      : 'rgba(18,14,22,0.2)',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Hero Text Overlay */}
      <div className="absolute bottom-24 md:bottom-32 left-6 md:left-12 z-20 max-w-2xl">
        <span
          className="text-label text-xs block mb-4"
          style={{ color: 'var(--cinematic-cyan)' }}
        >
          COSMETIC QUALITY ASSURANCE
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
          KNOW WHAT&apos;S
          <br />
          <span
            style={{
              background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            REAL.
          </span>
        </h1>
        <p
          className="mt-4 text-base md:text-lg max-w-md"
          style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
        >
          We help you detect counterfeit cosmetics before they touch your skin. Verify authenticity in seconds.
        </p>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 right-8 flex flex-col items-center gap-3 z-20">
        <span className="text-label text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--cinematic-text)]/40 to-transparent animate-float" />
      </div>

      {/* Side text */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-label text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
          PROTECTING BEAUTY SINCE 2024
        </span>
      </div>
    </section>
  );
}
