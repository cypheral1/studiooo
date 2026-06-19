"use client";

import { ShieldCheck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { SlideshowProduct } from '@/types/product';

export function HighRiskSlideshow({ products: initialProducts }: { products?: SlideshowProduct[] }) {
  const [products, setProducts] = useState<SlideshowProduct[]>(initialProducts || []);
  const plugin = useRef(
    Autoplay({ delay: 3200, stopOnInteraction: true })
  );

  useEffect(() => {
    if (initialProducts?.length) {
      setProducts(initialProducts);
      return;
    }

    fetch('/api/products?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
  }, [initialProducts]);

  if (!products.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--cinematic-text)] flex items-center justify-center gap-2">
          <ShieldCheck className="text-[var(--cinematic-cyan)] h-6 w-6" /> Trusted Brands That We Trust
        </h2>
        <p className="text-[var(--cinematic-text-secondary)] text-sm mt-2">
          These highly sought-after brands are fully verified and trusted by our community.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.slug} className="pl-4 md:basis-1/3">
                <div className="p-1 h-full">
                  <div className="group relative glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-white/30 flex items-center justify-center p-6">
                      <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10 block">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </Link>
                    </div>
                    <div className="p-4 border-t border-[var(--cinematic-border)] flex flex-col flex-grow relative z-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--cinematic-cyan)]">
                        {product.brand}
                      </span>
                      <Link href={`/product/${product.slug}`} className="hover:underline">
                        <h3 className="font-bold text-[var(--cinematic-text)] mt-1 group-hover:text-[var(--cinematic-pink)] transition-colors tracking-wide">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-4 pt-3 border-t border-[var(--cinematic-border)] flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 uppercase tracking-widest">{product.issue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center items-center mt-8 gap-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10 border-[var(--cinematic-border)] text-[var(--cinematic-text)] hover:bg-white/50 glass backdrop-blur" />
            <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10 border-[var(--cinematic-border)] text-[var(--cinematic-text)] hover:bg-white/50 glass backdrop-blur" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
