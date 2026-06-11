import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/container';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BadgeCheck, ArrowRight } from 'lucide-react';

const trustedSellers = [
  { name: 'Amazon', logoId: 'amazon-logo', link: '#', tag: 'Official Partner' },
  { name: 'Nykaa', logoId: 'nykaa-logo', link: '#', tag: 'Verified Seller' },
  { name: 'Sephora', logoId: 'sephora-logo', link: '#', tag: 'Authorized' },
  { name: 'Brand Stores', logoId: 'brand-store-logo', link: '#', tag: 'Direct' },
];

export function WhereToBuy() {
  return (
    <section id="where-to-buy" className="py-16 sm:py-24 bg-black/40 backdrop-blur-sm border-t border-primary/20">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/30 uppercase tracking-widest">
            ✅ Elite Retailers
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl uppercase">
            Shop <span className="text-primary">Authentic</span>, Always
          </h2>
          <p className="mt-4 text-white/70">
            Purchase from our verified luxury sellers to guarantee you&apos;re getting the genuine product.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustedSellers.map((seller) => {
            const logo = PlaceHolderImages.find(p => p.id === seller.logoId);
            return (
              <Link href={seller.link} key={seller.name} className="group">
                <div className="flex flex-col items-center justify-center bg-black/60 rounded-2xl p-6 border border-primary/20 shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1 hover:border-primary/50 h-full backdrop-blur-md">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold mb-4 uppercase tracking-widest border border-primary/20">
                    <BadgeCheck className="h-3 w-3" />
                    {seller.tag}
                  </div>
                  {logo && (
                    <Image
                      src={logo.imageUrl}
                      alt={`${seller.name} logo`}
                      width={120}
                      height={60}
                      className="object-contain opacity-70 transition-opacity group-hover:opacity-100"
                      data-ai-hint={logo.imageHint}
                    />
                  )}
                  <p className="mt-3 text-sm font-semibold text-white/90 group-hover:text-primary transition-colors uppercase tracking-widest">
                    {seller.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/where-to-buy-original" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            View All Trusted Sellers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
