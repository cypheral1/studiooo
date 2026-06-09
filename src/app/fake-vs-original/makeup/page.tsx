import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fake vs Original Makeup | TrueOriginalShop',
  description: 'Spot counterfeit makeup products before they touch your skin.',
};

export default function MakeupGuidePage() {
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
              MAKEUP.
            </span>
          </h1>

          <div className="max-w-3xl text-base md:text-lg space-y-8" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">1. Pigmentation Quality</h3>
              <p>Authentic foundations, lipsticks, and eyeshadows deliver rich, even pigmentation in a single application. Fake makeup often appears patchy, chalky, or requires heavy layering to achieve any visible color payoff.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">2. Packaging Weight and Feel</h3>
              <p>Genuine MAC, Charlotte Tilbury, and NARS products have a distinct weight and build quality to their cases. Counterfeits use lightweight plastic that feels hollow. Compare the weight of your product to the official specs listed on the brand website.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">3. Shade Name and Numbering</h3>
              <p>Real makeup products have consistent shade names printed clearly on the packaging and the product itself. Counterfeit items often misspell shade names, use incorrect numbering, or print labels that peel off easily.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">4. Safety and Skin Reactions</h3>
              <p>Fake cosmetics may contain lead, mercury, arsenic, or high levels of bacteria. If a product causes burning, itching, rashes, or breakouts immediately after use, stop using it and verify its authenticity.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">5. Authorized Retailer Check</h3>
              <p>Always cross-reference the seller with the brand&apos;s official list of authorized retailers. Products sold through unauthorized channels on social media or discount apps have a significantly higher chance of being counterfeit.</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="text-hero opacity-5" style={{ fontSize: '16vw', whiteSpace: 'nowrap' }}>
            MAKEUP
          </span>
        </div>
      </main>
      <CinematicFooter />
    </div>
  );
}
