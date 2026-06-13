"use client";

import { useState } from "react";
import Link from 'next/link';
import { Container } from '@/components/container';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import { CheckMyProductForm } from './check-my-product-form';
import { HighRiskSlideshow } from './high-risk-slideshow';

const trustedSellers = [
  { name: 'Amazon', emoji: '📦', link: '#', tag: 'Official Partner' },
  { name: 'Nykaa', emoji: '🛍️', link: '#', tag: 'Verified Seller' },
  { name: 'Sephora', emoji: '💎', link: '#', tag: 'Authorized' },
  { name: 'Brand Stores', emoji: '🏪', link: '#', tag: 'Direct' },
];

export function WhereToBuy() {
  const [isCheckProductOpen, setIsCheckProductOpen] = useState(false);

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
        
        <div className="mb-16">
          <HighRiskSlideshow />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustedSellers.map((seller) => (
            <Link href={seller.link} key={seller.name} className="group">
              <div className="flex flex-col items-center justify-center bg-black/60 rounded-2xl p-6 border border-primary/20 shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1 hover:border-primary/50 h-full backdrop-blur-md">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold mb-4 uppercase tracking-widest border border-primary/20">
                  <BadgeCheck className="h-3 w-3" />
                  {seller.tag}
                </div>
                <div className="text-5xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300">
                  {seller.emoji}
                </div>
                <p className="mt-2 text-sm font-semibold text-white/90 group-hover:text-primary transition-colors uppercase tracking-widest">
                  {seller.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <Link href="/where-to-buy-original" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all uppercase tracking-widest">
            View All Trusted Sellers <ArrowRight className="h-4 w-4" />
          </Link>
          <button 
            onClick={() => setIsCheckProductOpen(true)}
            className="bg-primary/10 border border-primary/30 text-primary rounded-full px-6 py-2.5 uppercase tracking-widest text-sm font-bold hover:bg-primary/20 transition-colors"
          >
            Check My Product
          </button>
        </div>
      </Container>
      
      <CheckMyProductForm 
        isOpen={isCheckProductOpen} 
        onClose={() => setIsCheckProductOpen(false)} 
      />
    </section>
  );
}
