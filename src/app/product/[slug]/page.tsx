"use client";

import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { CinematicNav } from "@/components/cinematic/nav";
import { CinematicFooter } from "@/components/cinematic/footer";
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

import { use, useState, useCallback, useEffect } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const gallery: string[] =
    (product as { images?: string[] }).images ?? [product.image];
  const hasGallery = gallery.length > 1;

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

  // Keyboard navigation for lightbox
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

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in getting the best price for the ${product.brand} ${product.name}.`
  );
  const whatsappUrl = `https://wa.me/971583093948?text=${whatsappMessage}`;

  return (
    <div
      className="min-h-screen text-[var(--cinematic-text)] flex flex-col selection:bg-[var(--cinematic-cyan)]/30"
      style={{ background: "var(--cinematic-bg)" }}
    >
      <CinematicNav />

      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl mt-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--cinematic-text-secondary)] mb-8">
            <Link href="/" className="hover:text-[var(--cinematic-cyan)] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[var(--cinematic-text)]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

            {/* ── Left: Image / Slideshow ── */}
            <div className="relative">
              <div className="glass-card rounded-3xl overflow-hidden bg-white/20 p-6 flex flex-col items-center justify-center lg:sticky lg:top-28 shadow-xl">

                {/* Main image area */}
                <div className="aspect-square w-full relative mb-4 overflow-hidden rounded-2xl bg-black/10">
                  <img
                    key={activeIndex}
                    src={gallery[activeIndex]}
                    alt={`${product.name} – image ${activeIndex + 1}`}
                    className="w-full h-full object-contain drop-shadow-2xl transition-opacity duration-500"
                    style={{ animation: "fadeIn 0.4s ease" }}
                  />

                  {/* Prev / Next arrows (only when gallery) */}
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

                      {/* Expand button */}
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

                {/* Dot indicators */}
                {hasGallery && (
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
                )}

                {/* Thumbnail strip */}
                {hasGallery && (
                  <div className="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-hide">
                    {gallery.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Thumbnail ${i + 1}`}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          i === activeIndex
                            ? "border-[var(--cinematic-cyan)] scale-105 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                            : "border-white/10 hover:border-white/40"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Slideshow button */}
                {hasGallery && (
                  <button
                    onClick={() => openLightbox(activeIndex)}
                    id="open-slideshow-btn"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--cinematic-cyan)]/10 hover:bg-[var(--cinematic-cyan)]/20 border border-[var(--cinematic-cyan)]/30 text-[var(--cinematic-cyan)] font-semibold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                  >
                    <Images className="h-4 w-4" />
                    View Full Slideshow ({gallery.length} photos)
                  </button>
                )}

                {/* QR Code Section */}
                <div className="w-full border-t border-white/10 pt-6 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--cinematic-cyan)] font-bold tracking-widest uppercase mb-1">
                      Authenticity Scan
                    </span>
                    <span className="text-sm text-white/70">
                      Scan QR to verify original product
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(
                        "https://trueoriginalshop.com/product/" + product.slug
                      )}`}
                      alt="QR Code"
                      className="w-16 h-16 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Info ── */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cinematic-cyan)]/10 border border-[var(--cinematic-cyan)]/20 text-[var(--cinematic-cyan)] text-xs font-bold tracking-widest uppercase mb-4 w-max">
                <ShieldCheck className="h-4 w-4" /> Verified Authentic
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                {product.name}
              </h1>
              <h2 className="text-xl text-[var(--cinematic-pink)] font-semibold tracking-wider uppercase mb-6">
                {product.brand}
              </h2>

              <p className="text-[var(--cinematic-text-secondary)] text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover:bg-[var(--cinematic-cyan)]/20 border border-[var(--cinematic-cyan)]/30 transition-all duration-300 rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-bold shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] mb-10 group"
              >
                <MessageCircle className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:text-white">
                  Contact for the best price
                </span>
              </a>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[var(--cinematic-cyan)]/50"></span>
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[var(--cinematic-text-secondary)]"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[var(--cinematic-cyan)] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[var(--cinematic-pink)]/50"></span>
                  Core Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg glass border border-white/10 text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Use */}
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

      {/* ── Lightbox / Fullscreen Slideshow ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Counter */}
            <p className="text-white/60 text-sm mb-3">
              {lightboxIndex + 1} / {gallery.length}
            </p>

            {/* Main lightbox image */}
            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-black/30">
              <img
                key={lightboxIndex}
                src={gallery[lightboxIndex]}
                alt={`${product.name} – photo ${lightboxIndex + 1}`}
                className="w-full h-full object-contain"
                style={{ animation: "fadeIn 0.3s ease" }}
              />

              {/* Prev */}
              <button
                onClick={() =>
                  setLightboxIndex((i) =>
                    i === 0 ? gallery.length - 1 : i - 1
                  )
                }
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[var(--cinematic-cyan)]/70 flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  setLightboxIndex((i) =>
                    i === gallery.length - 1 ? 0 : i + 1
                  )
                }
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[var(--cinematic-cyan)]/70 flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Lightbox thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    i === lightboxIndex
                      ? "border-[var(--cinematic-cyan)] scale-105"
                      : "border-white/20 hover:border-white/50"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <CinematicFooter />
    </div>
  );
}
