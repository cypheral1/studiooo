"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { TrendingUp, Flame, Star, Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const trendingProducts = [
  {
    id: 1,
    slug: "hyaluronic-acid-serum",
    name: "Hyaluronic Acid Serum",
    category: "Hydration",
    trend: "#1 Best Seller",
    description: "Deep hydration with plumping & refreshing formula.",
    image: "/trending/serum.png",
    searches: "2.4M+",
    growth: "+340%",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    slug: "retinol-night-cream",
    name: "Retinol Night Cream",
    category: "Anti-Aging",
    trend: "Viral on TikTok",
    description: "Rejuvenating formula with Peptide Complex.",
    image: "/trending/night-cream.png",
    searches: "1.8M+",
    growth: "+280%",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    slug: "vitamin-c-sunscreen",
    name: "Vitamin C Sunscreen SPF 50+",
    category: "Sun Protection",
    trend: "Summer Essential",
    description: "High protection UVA/UVB brightening sunscreen.",
    image: "/trending/sunscreen.png",
    searches: "3.1M+",
    growth: "+420%",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    slug: "stellar-lip-oil",
    name: "Stellar Lip Oil",
    category: "Lip Care",
    trend: "Editor's Pick",
    description: "Ultra-glossy nourishing lip oil with rosehip.",
    image: "/trending/lip-oil.png",
    searches: "1.5M+",
    growth: "+210%",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 5,
    slug: "niacinamide-serum",
    name: "Niacinamide 10% Serum",
    category: "Pore Care",
    trend: "Derma Approved",
    description: "Minimalist formula for pore refinement.",
    image: "/trending/niacinamide.png",
    searches: "2.0M+",
    growth: "+310%",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 6,
    slug: "celestial-sheet-mask",
    name: "Celestial Sheet Mask",
    category: "K-Beauty",
    trend: "K-Beauty Hit",
    description: "Premium Korean hydrating sheet mask.",
    image: "/trending/sheet-mask.png",
    searches: "1.2M+",
    growth: "+190%",
    color: "from-emerald-500 to-teal-600",
  },
];

export function TrendingNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const plugin = useRef(
    Autoplay({ delay: 3200, stopOnInteraction: true })
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trending"
      className="py-16 md:py-24 overflow-hidden"
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/30 uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <Flame className="h-3.5 w-3.5" />
            TRENDING NOW
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
            Elite Picks In <span className="text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Beauty</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto tracking-wide">
            The most searched, most loved luxury cosmetic products right now.
          </p>
        </div>

        {/* Product Carousel */}
        <div 
          className="mx-auto max-w-6xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
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
              {trendingProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/3">
                  <div className="p-1 h-full">
                    <Link href={`/product/${product.slug}`} className="block h-full">
                      <div className="group relative bg-black/60 rounded-2xl border border-primary/20 overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 hover:-translate-y-1 backdrop-blur-md h-full flex flex-col">
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                          <span className="text-primary font-bold uppercase tracking-widest border border-primary/50 bg-black/80 px-6 py-2 rounded-full backdrop-blur-sm">
                            View Product &rarr;
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden bg-black/40">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Trend Badge */}
                          <div className="absolute top-3 left-3 z-0">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${product.color} text-white text-[10px] font-bold shadow-md`}>
                              🔥 {product.trend}
                            </span>
                          </div>

                          {/* Growth Badge */}
                          <div className="absolute top-3 right-3 z-0">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 text-primary border border-primary/30 text-[10px] font-bold shadow-sm backdrop-blur-sm tracking-widest uppercase">
                              <TrendingUp className="h-3 w-3" />
                              {product.growth}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 border-t border-primary/20 flex flex-col flex-grow relative z-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{product.category}</span>
                          <h3 className="font-bold text-white mt-1 group-hover:text-primary transition-colors tracking-wide">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-white/50 line-clamp-1 mb-auto">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/20">
                            <div className="flex items-center gap-1 text-xs text-white/40 uppercase tracking-widest text-[10px]">
                              <Eye className="h-3 w-3" />
                              {product.searches} searches
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-primary fill-primary drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:flex justify-center items-center mt-8 gap-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10 border-primary/30 text-primary hover:bg-primary/20 hover:text-primary bg-black/60 backdrop-blur" />
              <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10 border-primary/30 text-primary hover:bg-primary/20 hover:text-primary bg-black/60 backdrop-blur" />
            </div>
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
