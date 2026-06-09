import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fake vs Original Serum | TrueOriginalShop',
  description: 'How to identify authentic face serums and avoid counterfeits.',
};

export default function SerumGuidePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 flex flex-col relative overflow-hidden" style={{ paddingTop: '120px' }}>
        <div className="px-6 md:px-12 py-16 md:py-24 max-w-[90rem] mx-auto w-full relative z-10">
          <span className="text-label text-xs block mb-4" style={{ color: 'var(--cinematic-cyan)' }}>
            AUTHENTICITY GUIDE
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-8">
            FAKE VS ORIGINAL
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SERUM.
            </span>
          </h1>

          <div className="max-w-3xl text-base md:text-lg space-y-8" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">1. Active Ingredient Concentration</h3>
              <p>Genuine serums like Vitamin C or Niacinamide clearly state the active percentage on the packaging (e.g. "10% Niacinamide"). Fakes rarely list exact percentages, or they list them but the formula is diluted far below the claimed amount.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">2. Texture and Absorption</h3>
              <p>Authentic serums have a consistent, lightweight texture designed for rapid absorption. Counterfeit serums may feel sticky, too oily, or leave a film because they are made with cheap filler oils instead of active concentrates.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">3. Oxidation and Color</h3>
              <p>Real Vitamin C serums are typically a pale yellow when fresh. Fakes may be completely colorless (no ascorbic acid) or pre-oxidized dark orange. Always check the expected color for the specific serum you&apos;re buying.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">4. Hologram and Seal</h3>
              <p>Premium serum brands like The Ordinary, Skinceuticals, or Paula&apos;s Choice include tamper-evident seals and holograms on the box. If the seal is missing or looks reprinted, do not use the product.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">5. Results Timeline</h3>
              <p>Authentic serums deliver visible results within the expected timeframe (e.g. skin brightening in 4–6 weeks). If a product claims instant dramatic results or produces no change whatsoever, it&apos;s likely counterfeit or completely inactive.</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="text-hero opacity-5" style={{ fontSize: '18vw', whiteSpace: 'nowrap' }}>
            SERUM
          </span>
        </div>
      </main>
      <CinematicFooter />
    </div>
  );
}
