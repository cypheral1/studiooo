import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fake vs Original Sunscream | TrueOriginalShop',
  description: 'How to spot fake sunscreen and sun protection products.',
};

export default function SunscreamGuidePage() {
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
              SUNSCREAM.
            </span>
          </h1>

          <div className="max-w-3xl text-base md:text-lg space-y-8" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">1. SPF Rating Verification</h3>
              <p>Authentic sunscreens display the SPF value prominently with a verified lab-tested rating. Fake products often print misleading SPF values (like SPF 100+) that have never been tested. Real sunscreens will specify UVA and UVB protection separately.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">2. Ingredient List Accuracy</h3>
              <p>Genuine sun protection products list active ingredients like Zinc Oxide, Titanium Dioxide, or chemical filters such as Avobenzone clearly. Counterfeits may omit active ingredients entirely or list incorrect concentrations.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">3. Consistency and Color</h3>
              <p>Real mineral sunscreens leave a natural white cast. If a product claiming to be SPF 50+ mineral sunscreen goes on completely clear instantly with no residue, it almost certainly contains little to no active UV filters.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">4. Regulatory Approval Marks</h3>
              <p>In India, look for the Drugs and Cosmetics Act license number. In the US, FDA OTC approval is required. Genuine products always show these on the packaging. Missing regulatory marks are an immediate red flag.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">5. The Smell Test</h3>
              <p>Fake sunscreens often have a chemical, petrol-like, or absent smell. Authentic formulas have a characteristic, mild cosmetic scent designed to be skin-safe. A very strong or unusual odor signals low-quality ingredients.</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="text-hero opacity-5" style={{ fontSize: '12vw', whiteSpace: 'nowrap' }}>
            SUNSCREAM
          </span>
        </div>
      </main>
      <CinematicFooter />
    </div>
  );
}
