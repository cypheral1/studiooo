import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import { Container } from '@/components/container';

export default function VitaminCSunscreenPage() {
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
              Summer Essential
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-4">
              Vitamin C Sunscreen <span className="text-primary">SPF 50+</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 uppercase tracking-widest text-sm">
              Category: Sun Protection
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
                <span className="text-2xl font-bold text-white mb-1">3.1M+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Searches/Mo</span>
              </div>
              <div className="flex flex-col items-center border-l border-primary/20 pl-6 md:pl-12">
                <span className="text-2xl font-bold text-primary mb-1">+420%</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Growth</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Banner */}
      <div className="w-full py-24 bg-gradient-to-r from-orange-800 via-amber-700 to-yellow-800 flex items-center justify-center border-y border-primary/20 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        <div className="text-9xl drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-500">
          ☀️
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                The #1 Trending Product of 2026
              </h2>
              <p className="text-white/80 leading-relaxed">
                With 3.1M monthly searches and an explosive +420% growth, Vitamin C Sunscreen has completely taken over the market. With 65% of discovery happening through social media channels, it&apos;s the ultimate multi-tasker that everyone wants in their routine.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                The Science Behind It
              </h2>
              <p className="text-white/80 leading-relaxed">
                Why does this combination work so well? L-Ascorbic Acid (Vitamin C) acts as a powerful antioxidant that neutralizes free radicals caused by UV exposure. When paired with high-quality UV filters, this dynamic duo offers up to 40% better protection against sun damage than SPF alone.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                Application Guide
              </h2>
              <ul className="space-y-3 text-white/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>The Two-Finger Rule:</strong> Squeeze product along the length of your pointer and middle finger for the correct amount.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Apply 15 Mins Before:</strong> Let it sink in before stepping into direct sunlight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Don&apos;t Forget the Neck:</strong> Apply generously to your neck and the back of your hands.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&rarr;</span>
                  <span><strong>Reapply Every 2 Hrs:</strong> Essential if you are sweating or swimming.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white border-b border-primary/20 pb-4">
                How to Spot a Fake
              </h2>
              <p className="text-white/80 leading-relaxed">
                Authentic Vitamin C is highly prone to oxidation. A major red flag for a fake or expired product is an <strong>oxidised formula</strong> that appears dark orange or brown and smells metallic. Also look out for a <strong>missing PA++++ certification</strong> on the label and suspicious, <strong>too-cheap pricing</strong> from unauthorized sellers.
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
