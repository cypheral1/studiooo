import { CinematicNav } from "@/components/cinematic/nav";
import { CinematicFooter } from "@/components/cinematic/footer";
import { Container } from "@/components/container";
import {
  Scale, AlertTriangle, CheckCircle, XCircle,
  Package, DollarSign, Droplets, Tag, ShieldCheck, Eye,
  ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake vs Original Products - How to Tell the Difference | TrueOriginalShop",
  description:
    "Learn how to identify fake cosmetic products vs originals. Compare packaging, texture, labeling, and more with our comprehensive guide.",
};

const comparisonPoints = [
  {
    category: "Packaging Quality",
    icon: Package,
    color: "text-[var(--cinematic-cyan)]",
    fake: "Thin, flimsy packaging with uneven edges. Print quality is blurry or pixelated. Colors are slightly off from the official branding.",
    original: "Sturdy, premium packaging with clean edges. Crisp, high-resolution printing. Colors perfectly match brand standards.",
    tip: "Compare the box weight and feel — originals are noticeably heavier and more rigid.",
  },
  {
    category: "Price Point",
    icon: DollarSign,
    color: "text-[var(--cinematic-pink)]",
    fake: "Suspiciously low prices — often 40-70% below retail. 'Too good to be true' deals. No official receipts.",
    original: "Consistent with official retail pricing. May have seasonal sales, but never extreme discounts.",
    tip: "If the deal seems too good to be true, it almost certainly is.",
  },
  {
    category: "Texture & Consistency",
    icon: Droplets,
    color: "text-[var(--cinematic-cyan)]",
    fake: "Grainy, lumpy, or watery texture. Inconsistent application. May separate quickly after opening.",
    original: "Smooth, homogeneous texture. Even application. Stable consistency throughout shelf life.",
    tip: "Swatch the product — fakes often feel different on skin and may cause irritation.",
  },
  {
    category: "Labeling & Fonts",
    icon: Tag,
    color: "text-[var(--cinematic-pink)]",
    fake: "Misspellings, grammatical errors, asymmetric label placement. Missing regulatory info.",
    original: "Perfect spelling and grammar. Precise label placement. All regulatory information present.",
    tip: "Check ingredient lists carefully — counterfeiters often miss or misspell chemical names.",
  },
  {
    category: "Batch Codes & Barcodes",
    icon: ShieldCheck,
    color: "text-[var(--cinematic-cyan)]",
    fake: "Printed over stickers, easily smudged. Batch codes that don't verify. Duplicate barcodes.",
    original: "Embossed or cleanly printed. Batch codes verify on official brand tools. Unique barcodes.",
    tip: "Always verify the batch code on the brand's official website or use our verification tool.",
  },
  {
    category: "Scent & Color",
    icon: Eye,
    color: "text-[var(--cinematic-pink)]",
    fake: "Strong chemical smell. Colors may appear slightly different compared to genuine products.",
    original: "Subtle, refined fragrance. True-to-swatch colors that match promotional materials.",
    tip: "If you own an original, compare side-by-side. The scent difference is usually the most obvious tell.",
  },
];

const redFlags = [
  "Price is more than 30% below the official retail price",
  "Seller has no official brand authorization or certificate",
  "Product arrives without proper sealed packaging",
  "Batch code doesn't match when verified online",
  "Packaging feels lightweight or flimsy compared to originals",
  "Spelling mistakes or blurry print on packaging",
  "No ingredient list or regulatory markings",
  "Seller refuses to provide proof of authenticity",
];

export default function FakeVsOriginalPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 text-center">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-[var(--cinematic-text)] text-xs font-bold mb-6 border border-white/40 uppercase tracking-widest backdrop-blur">
                <Scale className="h-4 w-4" />
                KNOW THE DIFFERENCE
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide mb-4">
                Fake vs <span className="bg-gradient-to-r from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] bg-clip-text text-transparent">Original</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--cinematic-text-secondary)] tracking-wide max-w-xl mx-auto">
                Counterfeits can harm your skin, waste your money, and fund
                illegal operations. Learn how to tell them apart! 🔍
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/verification-tools"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 shadow-lg"
                  style={{ borderRadius: '9999px' }}
                >
                  Verify a Product <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/fake-vs-original/skincare"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-6 py-3.5 text-sm font-semibold hover:bg-white/30 transition-colors text-[var(--cinematic-text)]"
                >
                  Read Guides
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Comparison Section */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                Side-by-Side <span className="text-[var(--cinematic-cyan)]">Comparison</span>
              </h2>
              <p className="mt-4 text-[var(--cinematic-text-secondary)]">
                Examine the key differences across 6 critical areas.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {comparisonPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.category}
                    className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-[var(--cinematic-border)]"
                  >
                    <div className="flex items-center gap-3 px-6 py-4 bg-white/30 border-b border-[var(--cinematic-border)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 border border-white/50">
                        <Icon className={`h-5 w-5 ${point.color}`} />
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-wide text-[var(--cinematic-text)]">{point.category}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--cinematic-border)]">
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Fake / Counterfeit</span>
                        </div>
                        <p className="text-sm text-[var(--cinematic-text-secondary)] leading-relaxed">{point.fake}</p>
                      </div>
                      <div className="p-6 bg-white/10">
                        <div className="mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Original / Authentic</span>
                        </div>
                        <p className="text-sm text-[var(--cinematic-text-secondary)] leading-relaxed">{point.original}</p>
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-white/20 border-t border-[var(--cinematic-border)]">
                      <p className="text-sm flex gap-2">
                        <span className="font-bold text-[var(--cinematic-text)]">💡 Pro Tip:</span>
                        <span className="text-[var(--cinematic-text-secondary)]">{point.tip}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Red Flags Section */}
        <section className="py-16 sm:py-24 bg-white/5 border-y border-[var(--cinematic-border)]">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-4 border border-red-500/20 uppercase tracking-widest">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  WARNING SIGNS
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                  Red Flags to Watch For
                </h2>
                <p className="mt-4 text-[var(--cinematic-text-secondary)]">
                  If you notice any of these warning signs, think twice before purchasing.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {redFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 glass-card rounded-xl p-4 hover:border-red-400/30 transition-all border border-[var(--cinematic-border)]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-500 border border-red-500/20">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[var(--cinematic-text-secondary)] font-medium leading-relaxed">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mt-8 glass-card border-[var(--cinematic-border)] rounded-2xl p-8 sm:p-16 flex flex-col items-center gap-6 justify-center text-center max-w-5xl mx-auto">
              <div className="h-16 w-16 bg-white/30 rounded-full flex items-center justify-center shrink-0 border border-white/40 mb-2">
                <Sparkles className="h-8 w-8 text-[var(--cinematic-cyan)]" />
              </div>
              <h2 className="text-3xl font-extrabold sm:text-4xl uppercase tracking-wide">
                Not Sure If Your Product Is Real?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[var(--cinematic-text-secondary)] text-lg">
                Use our AI-powered verification tools to check your product in
                seconds. Upload a photo and get an instant authenticity report.
              </p>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/verification-tools"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 shadow-lg"
                  style={{ borderRadius: '9999px' }}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Verify Now — Free
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
}
