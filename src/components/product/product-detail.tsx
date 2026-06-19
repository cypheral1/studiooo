"use client";

import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  ChevronLeft,
  Images,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { CinematicNav } from "@/components/cinematic/nav";
import { CinematicFooter } from "@/components/cinematic/footer";
import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ProductDetail({ product }: { product: Product }) {
  const gallery: string[] = product.images?.length ? product.images : [product.image];
  const hasGallery = gallery.length > 1;
  const whatsappUrl = buildWhatsAppUrl(product.name, product.brand);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  }, [gallery.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
  }, [gallery.length]);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, gallery.length]);

  return (
    <div
      className="min-h-screen text-[var(--cinematic-text)] flex flex-col selection:bg-[var(--cinematic-cyan)]/30"
      style={{ background: "var(--cinematic-bg)" }}
    >
      <CinematicNav />

      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl mt-8">
          <div className="flex items-center gap-2 text-sm text-[var(--cinematic-text-secondary)] mb-8">
            <Link href="/" className="hover:text-[var(--cinematic-cyan)] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/where-to-buy-original" className="hover:text-[var(--cinematic-cyan)] transition-colors">
              Where to Buy
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[var(--cinematic-text)]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="relative">
              <div className="glass-card rounded-3xl overflow-hidden bg-white/20 p-6 flex flex-col items-center justify-center lg:sticky lg:top-28 shadow-xl">
                <div className="aspect-square w-full relative mb-4 overflow-hidden rounded-2xl bg-black/10">
                  <img
                    key={activeIndex}
                    src={gallery[activeIndex]}
                    alt={`${product.name} – image ${activeIndex + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ffffff10'/%3E%3Ctext x='50%25' y='45%25' font-family='sans-serif' font-size='48' fill='%23ffffff30' text-anchor='middle' dominant-baseline='middle'%3E🖼%3C/text%3E%3Ctext x='50%25' y='62%25' font-family='sans-serif' font-size='14' fill='%23ffffff30' text-anchor='middle'%3EImage not found%3C/text%3E%3C/svg%3E`;
                    }}
                    className="w-full h-full object-contain drop-shadow-2xl transition-opacity duration-500"
                    style={{ animation: "fadeIn 0.4s ease" }}
                  />

                  {hasGallery && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[var(--cinematic-cyan)]/70 flex items-center justify-center transition-all duration-200 backdrop-blur-sm z-10"
                      >
                        <ChevronLeft className="h-5 w-5 text-white" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[var(--cinematic-cyan)]/70 flex items-center justify-center transition-all duration-200 backdrop-blur-sm z-10"
                      >
                        <ChevronRight className="h-5 w-5 text-white" />
                      </button>
                      <button
                        onClick={() => openLightbox(activeIndex)}
                        aria-label="Open fullscreen gallery"
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-[var(--cinematic-cyan)]/70 flex items-center justify-center transition-all duration-200 backdrop-blur-sm z-10"
                      >
                        <Images className="h-4 w-4 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {hasGallery && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          aria-label={`Go to image ${i + 1}`}
                          className={`rounded-full transition-all duration-300 ${
                            i === activeIndex
                              ? "w-5 h-2 bg-[var(--cinematic-cyan)]"
                              : "w-2 h-2 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 w-full overflow-x-auto pb-2">
                      {gallery.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                            i === activeIndex
                              ? "border-[var(--cinematic-cyan)] scale-105"
                              : "border-white/10 hover:border-white/40"
                          }`}
                        >
                          <img
                          src={src}
                          alt={`Thumbnail ${i + 1}`}
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffffff10'/%3E%3Ctext x='50%25' y='55%25' font-family='sans-serif' font-size='24' fill='%23ffffff30' text-anchor='middle' dominant-baseline='middle'%3E🖼%3C/text%3E%3C/svg%3E`;
                          }}
                          className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cinematic-cyan)]/10 border border-[var(--cinematic-cyan)]/20 text-[var(--cinematic-cyan)] text-xs font-bold tracking-widest uppercase mb-4 w-max">
                <ShieldCheck className="h-4 w-4" /> {product.badge || "Verified Authentic"}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">{product.name}</h1>
              <h2 className="text-xl text-[var(--cinematic-pink)] font-semibold tracking-wider uppercase mb-6">
                {product.brand}
              </h2>

              <p className="text-[var(--cinematic-text-secondary)] text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover:bg-[var(--cinematic-cyan)]/20 border border-[var(--cinematic-cyan)]/30 transition-all duration-300 rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-bold shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] mb-10 group"
              >
                <MessageCircle className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--cinematic-text)] to-[var(--cinematic-text-secondary)] group-hover:text-[var(--cinematic-text)]">
                  Contact for the best price
                </span>
              </a>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[var(--cinematic-cyan)]/50"></span>
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--cinematic-text-secondary)]">
                      <CheckCircle2 className="h-5 w-5 text-[var(--cinematic-cyan)] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[var(--cinematic-pink)]/50"></span>
                  Core Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg glass border border-white/10 text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-white/30"></span>
                  How to Use
                </h3>
                <p className="text-[var(--cinematic-text-secondary)] leading-relaxed p-4 glass-card rounded-xl">
                  {product.howToUse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-4xl mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <p className="text-white/60 text-sm mb-3">
              {lightboxIndex + 1} / {gallery.length}
            </p>
            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-black/30">
              <img
                src={gallery[lightboxIndex]}
                alt={`${product.name} – photo ${lightboxIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <CinematicFooter />
    </div>
  );
}
