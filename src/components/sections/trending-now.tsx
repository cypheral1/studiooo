"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/container";
import { TrendingUp, Flame, Sparkles, Star, ArrowRight } from "lucide-react";

/* ─── Data ─── */
const trendingProducts = [
  {
    id: 1,
    name: "Hyaluronic Acid Serum",
    category: "Hydration",
    trend: "🔥 #1 Best Seller",
    description: "Deep hydration with plumping & refreshing formula. The most sought-after serum of 2025.",
    image: "/trending/serum.png",
    stats: { searches: "2.4M+", growth: "+340%" },
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    glow: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: 2,
    name: "Retinol Night Cream",
    category: "Anti-Aging",
    trend: "✨ Viral on TikTok",
    description: "Rejuvenating formula with Peptide Complex & Hyaluronic Acid for overnight transformation.",
    image: "/trending/night-cream.png",
    stats: { searches: "1.8M+", growth: "+280%" },
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 3,
    name: "Vitamin C Sunscreen SPF 50+",
    category: "Sun Protection",
    trend: "☀️ Summer Essential",
    description: "High protection UVA/UVB brightening sunscreen. Dermatologist tested & approved.",
    image: "/trending/sunscreen.png",
    stats: { searches: "3.1M+", growth: "+420%" },
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glow: "rgba(251, 146, 60, 0.4)",
  },
  {
    id: 4,
    name: "Stellar Lip Oil",
    category: "Lip Care",
    trend: "💄 Editor's Pick",
    description: "Ultra-glossy nourishing lip oil with rosehip and vitamin E. The luxury lip essential.",
    image: "/trending/lip-oil.png",
    stats: { searches: "1.5M+", growth: "+210%" },
    gradient: "from-pink-500 via-rose-500 to-purple-600",
    glow: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: 5,
    name: "Niacinamide 10% Serum",
    category: "Pore Care",
    trend: "🧪 Derma Approved",
    description: "Minimalist formula with Zinc PCA for pore refinement and oil control.",
    image: "/trending/niacinamide.png",
    stats: { searches: "2.0M+", growth: "+310%" },
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: 6,
    name: "Celestial Sheet Mask",
    category: "K-Beauty",
    trend: "🌙 K-Beauty Hit",
    description: "Premium Korean hydrating sheet mask. Moisturizing & revitalizing celestial formula.",
    image: "/trending/sheet-mask.png",
    stats: { searches: "1.2M+", growth: "+190%" },
    gradient: "from-teal-500 via-emerald-500 to-cyan-500",
    glow: "rgba(20, 184, 166, 0.4)",
  },
];

/* ─── Floating particles (client-only to avoid SSR hydration mismatch) ─── */
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    w: number; h: number; l: number; t: number; r: number; g: number; a: number; dur: number; del: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        w: Math.random() * 4 + 1,
        h: Math.random() * 4 + 1,
        l: Math.random() * 100,
        t: Math.random() * 100,
        r: 150 + Math.random() * 105,
        g: 100 + Math.random() * 155,
        a: 0.15 + Math.random() * 0.35,
        dur: 8 + Math.random() * 12,
        del: Math.random() * 8,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.l}%`,
            top: `${p.t}%`,
            background: `rgba(${p.r}, ${p.g}, 255, ${p.a})`,
            animation: `floatParticle ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── 3D Product Card ─── */
interface ProductCardProps {
  product: typeof trendingProducts[0];
  index: number;
  isVisible: boolean;
}

function ProductCard3D({ product, index, isVisible }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
    setGlarePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) rotateX(0deg)"
          : `translateY(80px) rotateX(${8 + index * 2}deg)`,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: product.glow }}
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
        style={{
          transform,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(15,15,30,0.9) 0%, rgba(20,10,40,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Glare overlay */}
        <div
          className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />

        {/* Image area */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          {/* Moving gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`}
            style={{ animation: "gradientShift 6s ease-in-out infinite alternate" } as React.CSSProperties}
          />

          {/* Product image with 3D float */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            style={{
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              }}
            />
          </div>

          {/* Trend badge */}
          <div className="absolute top-3 left-3 z-20">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-bold shadow-lg`}
              style={{ animation: "trendingPulse 2s ease-in-out infinite" }}
            >
              <Flame className="w-3 h-3" />
              {product.trend}
            </span>
          </div>

          {/* Growth indicator */}
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
              <TrendingUp className="w-3 h-3" />
              {product.stats.growth}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="relative p-5 space-y-3" style={{ transform: "translateZ(20px)" }}>
          {/* Category chip */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-purple-300 text-xs font-medium border border-white/10">
            <Sparkles className="w-3 h-3" />
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-headline text-xl font-bold text-white leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white/70">
                {product.stats.searches} searches
              </span>
            </div>
            <button
              className={`inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all duration-300`}
            >
              Explore
              <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${product.glow}, transparent 40%, transparent 60%, ${product.glow})`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "1px",
            borderRadius: "1rem",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Auto-scrolling marquee of trending tags ─── */
function TrendingMarquee() {
  const tags = [
    "Glass Skin", "Slugging", "Skin Cycling", "Retinol Sandwich",
    "Barrier Repair", "Peptide Serums", "SPF Layering", "K-Beauty",
    "Clean Beauty", "Lip Staining", "Dewy Dumpling Skin", "Glazed Donut Skin",
    "Coquette Blush", "Latte Makeup", "Cherry Mocha Lips", "Skinimalism",
  ];

  return (
    <div className="relative overflow-hidden py-4 my-8">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-4 whitespace-nowrap"
        style={{ animation: "trendingMarquee 30s linear infinite" }}
      >
        {[...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-white/5 border border-white/10 text-white/70 text-sm font-medium
              hover:bg-white/10 hover:text-white hover:border-purple-500/40
              transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span className="text-purple-400">#</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function TrendingNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trending"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, rgba(10,5,30,1) 15%, rgba(8,3,25,1) 85%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Particles */}
      <FloatingParticles />

      {/* Radial background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <Container>
        {/* ── Header with 3D entrance ── */}
        <div
          className="text-center mb-16 space-y-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) perspective(800px) rotateX(0deg)"
              : "translateY(60px) perspective(800px) rotateX(5deg)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                bg-gradient-to-r from-purple-500/10 to-blue-500/10
                border border-purple-500/20 text-purple-300 text-sm font-semibold
                shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              style={{ animation: "trendingPulse 3s ease-in-out infinite" }}
            >
              <TrendingUp className="w-4 h-4" />
              What&apos;s Hot Right Now
              <Flame className="w-4 h-4 text-orange-400" />
            </span>
          </div>

          {/* Title with gradient */}
          <h2 className="font-headline text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Trending
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
                animation: "gradientText 4s ease-in-out infinite alternate",
              }}
            >
              In Beauty
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Discover the most searched, most loved cosmetic products dominating
            the beauty world right now.
          </p>
        </div>

        {/* ── Trending tags marquee ── */}
        <TrendingMarquee />

        {/* ── 3D Product Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: "1200px" }}
        >
          {trendingProducts.map((product, index) => (
            <ProductCard3D
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="text-center mt-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s",
          }}
        >
          <p className="text-white/40 text-sm mb-4">
            Powered by real-time beauty trend data
          </p>
          <div className="flex items-center justify-center gap-2 text-white/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live trend tracking · Updated hourly
          </div>
        </div>
      </Container>


    </section>
  );
}
