import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fake vs Original Skincare | TrueOriginalShop',
  description: 'Simple guide on identifying authentic skincare products.',
};

export default function SkincareGuidePage() {
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
                SKINCARE.
              </span>
            </h1>
            
            <div className="max-w-3xl text-base md:text-lg space-y-8" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">1. Check the Packaging</h3>
                <p>Authentic skincare products usually have high-quality packaging with precise typography, correct spelling, and consistent coloring. Fake products often feature flimsy materials, blurred text, or subtle misspellings.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">2. Verify the Batch Code</h3>
                <p>Genuine items have a printed or stamped batch code that matches on both the box and the container. Counterfeits might lack this entirely or use fake codes that don&apos;t verify on standard checker websites.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-white">3. Texture and Scent</h3>
                <p>Original skincare formulas are carefully balanced. If a lotion feels overly watery, excessively greasy, or has a strong chemical odor unlike the authentic product, it is likely a fake.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">4. Price Tag</h3>
                <p>If the deal seems too good to be true, it usually is. Heavy discounts on premium skincare from unverified sellers are a massive red flag.</p>
              </div>
            </div>
         </div>
         
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
            <span className="text-hero opacity-5" style={{ fontSize: '15vw', whiteSpace: 'nowrap' }}>
              SKINCARE
            </span>
         </div>
      </main>
      <CinematicFooter />
    </div>
  );
}
