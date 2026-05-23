'use client';

export function CinematicHero() {
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

      {/* 3D Cube */}
      <div className="cube-perspective relative z-10">
        <div className="cube-wrapper">
          {/* Front Face — Serum */}
          <div className="cube-face cube-face--front">
            <img
              src="/images/cube-serum.png"
              alt="Authentic Serum Verification"
              draggable={false}
            />
            <span className="face-label">AUTHENTIC</span>
          </div>

          {/* Bottom Face — Lipstick */}
          <div className="cube-face cube-face--bottom">
            <img
              src="/images/cube-lipstick.png"
              alt="Lipstick Quality Check"
              draggable={false}
            />
            <span className="face-label">VERIFIED</span>
          </div>

          {/* Back Face — Perfume */}
          <div className="cube-face cube-face--back">
            <img
              src="/images/cube-perfume.png"
              alt="Fragrance Authentication"
              draggable={false}
            />
            <span className="face-label">CERTIFIED</span>
          </div>

          {/* Top Face — Skincare */}
          <div className="cube-face cube-face--top">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
              alt="Skincare QA Testing"
              draggable={false}
            />
            <span className="face-label">TRUSTED</span>
          </div>
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
