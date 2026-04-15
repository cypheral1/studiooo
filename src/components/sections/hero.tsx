import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Container } from '@/components/container';
import { ArrowRight, Gift, ShieldCheck, Sparkles, Star } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <Container>
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-primary/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-white text-sm font-medium tracking-wide">Trusted by Premium Audiences</span>
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-primary fill-primary" />
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] drop-shadow-2xl">
            Experience Validated
            <br />
            <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              Luxury Cosmetics
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-md">
            Dubai's premier AI-powered authenticity verification. Spot fakes instantly, buy exclusive collections with absolute confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#verification"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 text-sm font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 uppercase tracking-wider"
            >
              <Sparkles className="h-4 w-4" />
              Access VIP Verification
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#free-guide"
              className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full px-6 py-4 text-sm font-semibold border border-primary/30 hover:border-primary transition-all tracking-wide uppercase"
            >
              <Gift className="h-4 w-4" />
              Get Insider Guide
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap gap-6 sm:gap-10 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/5">
            {[
              { value: 'Elite', label: 'Verification Access' },
              { value: '99.9%', label: 'Precision Rate' },
              { value: 'Global', label: 'Luxury Brands' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-white/70 uppercase tracking-widest mt-1 text-xs font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
