import Link from 'next/link';

export function SkinFinderCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: '120px 0' }}
    >
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-hero opacity-[0.03]"
          style={{ fontSize: '14vw', whiteSpace: 'nowrap' }}
        >
          SKIN FINDER
        </span>
      </div>

      <div className="px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <span
              className="text-label text-xs block mb-5"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              NEW FEATURE
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-6">
              FIND YOUR
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(to right, var(--cinematic-pink), var(--cinematic-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PERFECT
              </span>
              <br />
              ROUTINE.
            </h2>
            <p
              className="text-base md:text-lg mb-8 max-w-md"
              style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
            >
              Not sure which products are right for your skin? Answer 3 quick
              questions and our AI recommends a personalized skincare routine
              built around your exact skin type and concerns.
            </p>

            <Link
              href="/skin-finder"
              className="btn-gradient inline-block text-xs py-4 px-10"
              style={{ borderRadius: '0' }}
            >
              ✨ TRY SKIN FINDER
            </Link>
          </div>

          {/* Right — Feature tiles */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', label: 'TARGETED', desc: 'Recommendations based on your exact concern — acne, dark spots, wrinkles, and more.' },
              { icon: '🧬', label: 'SKIN-TYPED', desc: 'Results calibrated for normal, oily, dry, sensitive, or combination skin.' },
              { icon: '🌐', label: 'FACE + BODY', desc: 'Covers face, body, and lip concerns with distinct product categories.' },
              { icon: '⚡', label: 'INSTANT', desc: 'Get a full personalized routine with key ingredients in seconds.' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card px-5 py-6"
                style={{ borderRadius: '0' }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <p
                  className="text-label text-xs mb-2"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
