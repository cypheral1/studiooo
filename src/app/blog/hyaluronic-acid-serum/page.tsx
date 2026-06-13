import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import { Container } from '@/components/container';

export default function HyaluronicAcidSerumPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/20">
        <Container>
          <div className="flex items-center h-16">
            <Link href="/#trending" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <Container>
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/30 uppercase tracking-widest">
              #1 Best Seller
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-4">
              Hyaluronic Acid <span className="text-primary">Serum</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 uppercase tracking-widest text-sm">
              Category: Hydration
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-12">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-primary mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">4.9/5 Rating</span>
              </div>
              <div className="flex flex-col items-center border-l border-primary/20 pl-6 md:pl-12">
                <span className="text-2xl font-bold text-white mb-1">2.4M+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Searches/Mo</span>
              </div>
              <div className="flex flex-col items-center border-l border-primary/20 pl-6 md:pl-12">
                <span className="text-2xl font-bold text-primary mb-1">+340%</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Growth</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Banner */}
      <div className="w-full py-24 bg-gradient-to-r from-violet-900 via-purple-800 to-indigo-900 flex items-center justify-center border-y border-primary/20 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        <div className="text-9xl drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-500">
          💧
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                Why Everyone is Obsessed
              </h2>
              <p className="text-white/80 leading-relaxed">
                Hyaluronic Acid has become the cornerstone of the modern $349B beauty industry. Known for its incredible ability to hold up to 1000x its weight in water, this powerhouse ingredient delivers an instant plumping effect, reducing the appearance of fine lines and giving the skin that coveted "glass" look.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                What to Look For in an Original
              </h2>
              <p className="text-white/80 leading-relaxed">
                When purchasing from top brands like The Ordinary, SkinCeuticals, or La Roche-Posay, check the ingredient list. Authentic formulas will list "Sodium Hyaluronate" (the salt form of HA which penetrates better) within the first five ingredients. If it&apos;s listed at the very bottom, the concentration is too low to be effective.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                How to Use It
              </h2>
              <ul className="space-y-3 text-white/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Apply on Damp Skin:</strong> Never apply to dry skin; it needs moisture to pull into your pores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Use After Cleansing:</strong> It should be the first step after washing and toning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Seal It In:</strong> Always follow up with a moisturizer to lock the hydration in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Twice Daily:</strong> Safe for both morning and evening routines.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                Spotting a Fake
              </h2>
              <p className="text-white/80 leading-relaxed">
                Because of its high demand, counterfeit serums are flooding the market. Look out for a <strong>watery consistency</strong> (real HA has a slight slip or viscosity to it). Furthermore, fakes often have <strong>no inner seal</strong> under the dropper cap, and the packaging may feature <strong>smudged labels</strong> or slightly incorrect fonts.
              </p>
            </div>
            
            {/* Trust Banner */}
            <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">Verify Before You Buy</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Counterfeit products are on the rise. Always check the packaging, consistency, and seller reputation before applying any product to your skin.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-primary/20">
              <Link href="/#where-to-buy" className="w-full sm:w-auto bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-primary/90 transition-colors text-center">
                Buy Original Now
              </Link>
              <Link href="/#trending" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-center">
                &larr; More Products
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </div>
  )
}
