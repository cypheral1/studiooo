'use client';

import { useState, useEffect, useCallback } from 'react';

/* ─── Slide data ─── */
const heroSlides = [
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

const spotlightSlides = [
  {
    src: '/images/slideshow/slide-6-berry-serum.jpg',
    alt: 'Coqualberry serum — Original verification',
    caption: 'BERRY SERUM',
    detail: 'Dropper cap shape & bottle finish differ on fakes',
  },
  {
    src: '/images/slideshow/slide-7-bottle-bottom.jpg',
    alt: 'Bottle bottom — Original vs Fake nozzle comparison',
    caption: 'BOTTLE BOTTOM',
    detail: 'Inner mechanism & seal pattern reveal counterfeits',
  },
  {
    src: '/images/slideshow/slide-8-retinal-shot.jpg',
    alt: 'Celimax Retinal Shot — Original vs Fake box',
    caption: 'RETINAL SHOT',
    detail: 'Box colour gradient & print sharpness differ clearly',
  },
];

/* ─── Reusable slideshow hook ─── */
function useSlideshow(length: number, intervalMs = 5000) {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (locked) return;
      setLocked(true);
      setCurrent(idx);
      setTimeout(() => setLocked(false), 600);
    },
    [locked]
  );

  const next = useCallback(() => goTo((current + 1) % length), [current, length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + length) % length), [current, length, goTo]);

  useEffect(() => {
    const t = setInterval(next, intervalMs);
    return () => clearInterval(t);
  }, [next, intervalMs]);

  return { current, goTo, next, prev };
}

/* ─── Slideshow card component ─── */
function SlideshowCard({
  slides,
  current,
  goTo,
  next,
  prev,
  className = '',
}: {
  slides: typeof heroSlides;
  current: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Glass frame */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/15">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-all duration-700"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'scale(1)' : 'scale(1.08)',
              transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
        ))}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
          <span
            className="text-label block text-[10px] mb-1"
            style={{ color: 'var(--cinematic-cyan)' }}
            translate="no"
          >
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <h2 className="text-white text-lg md:text-2xl font-black tracking-tight uppercase leading-tight">
            {slides.map((slide, i) => (
              <span key={i} style={{ display: i === current ? 'block' : 'none' }}>
                {slide.caption}
              </span>
            ))}
          </h2>
          <p className="text-white/60 text-xs md:text-sm mt-1 font-light">
            {slides.map((slide, i) => (
              <span key={i} style={{ display: i === current ? 'block' : 'none' }}>
                {slide.detail}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
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
                width: i === current ? '24px' : '8px',
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
  );
}

/* ─── Hero Section ─── */
export function CinematicHero() {
  const hero = useSlideshow(heroSlides.length, 5000);
  const spotlight = useSlideshow(spotlightSlides.length, 4000);

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section
        className="relative w-full min-h-screen overflow-hidden flex items-center"
        id="hero"
        style={{ background: 'var(--cinematic-bg)' }}
      >
        {/* BG watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-hero"
            style={{ color: 'rgba(18, 14, 22, 0.05)', fontSize: '20vw', whiteSpace: 'nowrap' }}
          >
            VERIFY
          </span>
        </div>

        {/* Content grid — slideshow left, text right */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 pt-28 pb-20 md:pt-0 md:pb-0">
          {/* Slideshow – left of center */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <SlideshowCard
              slides={heroSlides}
              current={hero.current}
              goTo={hero.goTo}
              next={hero.next}
              prev={hero.prev}
              className="w-full aspect-[3/4] md:aspect-[4/5]"
            />
          </div>

          {/* Text – right side */}
          <div className="w-full md:w-[55%] flex flex-col justify-center mt-12 md:mt-0">
            <span
              className="text-label text-xs block mb-4"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              COSMETIC QUALITY ASSURANCE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
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
              We help you detect counterfeit cosmetics before they touch your skin.
              Verify authenticity in seconds.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="/#how-it-works"
                className="btn-gradient text-xs py-3 px-8 inline-block"
                style={{ borderRadius: '0' }}
              >
                HOW IT WORKS
              </a>
              <a
                href="/skin-finder"
                className="text-label text-xs opacity-60 hover:opacity-100 transition-opacity"
              >
                FIND YOUR SKIN →
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
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

      {/* ═══════ SPOTLIGHT SECTION ═══════ */}
      <section
        className="relative w-full py-20 md:py-32 overflow-hidden"
        id="spotlight"
        style={{ background: 'var(--cinematic-bg)' }}
      >
        {/* BG watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-hero"
            style={{ color: 'rgba(18, 14, 22, 0.04)', fontSize: '14vw', whiteSpace: 'nowrap' }}
          >
            SPOTLIGHT
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Slideshow – same left side */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <SlideshowCard
              slides={spotlightSlides}
              current={spotlight.current}
              goTo={spotlight.goTo}
              next={spotlight.next}
              prev={spotlight.prev}
              className="w-full aspect-[3/4] md:aspect-[4/5]"
            />
          </div>

          {/* Text – right side */}
          <div className="w-full md:w-[55%] flex flex-col justify-center mt-12 md:mt-0">
            <span
              className="text-label text-xs block mb-4"
              style={{ color: 'var(--cinematic-pink)' }}
            >
              TRENDING COMPARISONS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95]">
              SPOT THE
              <br />
              <span
                style={{
                  background: 'linear-gradient(to right, var(--cinematic-pink), var(--cinematic-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FAKES.
              </span>
            </h2>
            <p
              className="mt-4 text-base md:text-lg max-w-md"
              style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
            >
              From serum droppers to tube seals — learn the telltale signs that
              separate authentic products from dangerous counterfeits.
            </p>

            <div className="mt-8">
              <a
                href="/fake-vs-original"
                className="btn-gradient text-xs py-3 px-8 inline-block"
                style={{ borderRadius: '0' }}
              >
                VIEW ALL COMPARISONS
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
