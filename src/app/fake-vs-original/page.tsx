import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
    color: "bg-violet-50 text-violet-600 border-violet-100",
    fake: "Thin, flimsy packaging with uneven edges. Print quality is blurry or pixelated. Colors are slightly off from the official branding.",
    original: "Sturdy, premium packaging with clean edges. Crisp, high-resolution printing. Colors perfectly match brand standards.",
    tip: "Compare the box weight and feel — originals are noticeably heavier and more rigid.",
  },
  {
    category: "Price Point",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    fake: "Suspiciously low prices — often 40-70% below retail. 'Too good to be true' deals. No official receipts.",
    original: "Consistent with official retail pricing. May have seasonal sales, but never extreme discounts.",
    tip: "If the deal seems too good to be true, it almost certainly is.",
  },
  {
    category: "Texture & Consistency",
    icon: Droplets,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    fake: "Grainy, lumpy, or watery texture. Inconsistent application. May separate quickly after opening.",
    original: "Smooth, homogeneous texture. Even application. Stable consistency throughout shelf life.",
    tip: "Swatch the product — fakes often feel different on skin and may cause irritation.",
  },
  {
    category: "Labeling & Fonts",
    icon: Tag,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    fake: "Misspellings, grammatical errors, asymmetric label placement. Missing regulatory info.",
    original: "Perfect spelling and grammar. Precise label placement. All regulatory information present.",
    tip: "Check ingredient lists carefully — counterfeiters often miss or misspell chemical names.",
  },
  {
    category: "Batch Codes & Barcodes",
    icon: ShieldCheck,
    color: "bg-pink-50 text-pink-600 border-pink-100",
    fake: "Printed over stickers, easily smudged. Batch codes that don't verify. Duplicate barcodes.",
    original: "Embossed or cleanly printed. Batch codes verify on official brand tools. Unique barcodes.",
    tip: "Always verify the batch code on the brand's official website or use our verification tool.",
  },
  {
    category: "Scent & Color",
    icon: Eye,
    color: "bg-purple-50 text-purple-600 border-purple-100",
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-br from-pink-50 via-background to-purple-50">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold mb-6 border border-red-100">
                <Scale className="h-3.5 w-3.5" />
                KNOW THE DIFFERENCE
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Fake vs <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Original</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                Counterfeits can harm your skin, waste your money, and fund
                illegal operations. Learn how to tell them apart! 🔍
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/verification-tools"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
                >
                  Verify a Product <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/detection-guide"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Detection Guide
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Comparison Section */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Side-by-Side <span className="text-primary">Comparison</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Examine the key differences across 6 critical areas.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {comparisonPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.category}
                    className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border/30">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${point.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-lg">{point.category}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Fake / Counterfeit</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.fake}</p>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Original / Authentic</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.original}</p>
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-primary/5 border-t border-border/20">
                      <p className="text-sm">
                        <span className="font-bold text-primary">💡 Pro Tip: </span>
                        <span className="text-muted-foreground">{point.tip}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Red Flags Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold mb-4 border border-red-100">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  WARNING SIGNS
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  🚩 Red Flags to Watch For
                </h2>
                <p className="mt-4 text-muted-foreground">
                  If you notice any of these warning signs, think twice before purchasing.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {redFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white rounded-xl border border-red-100 p-4 hover:shadow-md hover:border-red-200 transition-all"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-500">
                      {index + 1}
                    </span>
                    <p className="text-sm text-foreground/80">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-8 sm:p-16 text-center text-white">
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <Sparkles className="mx-auto h-12 w-12 mb-6 animate-float" />
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Not Sure If Your Product Is Real?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Use our AI-powered verification tools to check your product in
                  seconds. Upload a photo and get an instant authenticity report.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/verification-tools"
                    className="inline-flex items-center gap-2 bg-white text-pink-600 rounded-full px-8 py-3.5 text-sm font-bold shadow-lg hover:bg-white/90 transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Verify Now — Free
                  </Link>
                  <Link
                    href="/detection-guide"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 text-white px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Read Detection Guide
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
