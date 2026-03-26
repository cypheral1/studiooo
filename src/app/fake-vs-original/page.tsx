import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  Scale, AlertTriangle, CheckCircle, XCircle, Eye,
  Package, DollarSign, Droplets, Tag, ShieldCheck,
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
    fake: "Thin, flimsy packaging with uneven edges. Print quality is blurry or pixelated. Colors are slightly off from the official branding.",
    original: "Sturdy, premium packaging with clean edges. Crisp, high-resolution printing. Colors perfectly match brand standards.",
    tip: "Compare the box weight and feel — originals are noticeably heavier and more rigid.",
  },
  {
    category: "Price Point",
    icon: DollarSign,
    fake: "Suspiciously low prices — often 40-70% below retail. 'Too good to be true' deals. No official receipts or authorization.",
    original: "Consistent with official retail pricing. May have seasonal sales, but never extreme discounts. Comes with authentic receipts.",
    tip: "If the deal seems too good to be true, it almost certainly is. Check official brand pricing first.",
  },
  {
    category: "Texture & Consistency",
    icon: Droplets,
    fake: "Grainy, lumpy, or watery texture. Inconsistent application. May separate or change color quickly after opening.",
    original: "Smooth, homogeneous texture. Even application. Stable consistency throughout the product's shelf life.",
    tip: "Swatch the product — fakes often feel different on skin and may cause irritation.",
  },
  {
    category: "Labeling & Fonts",
    icon: Tag,
    fake: "Misspellings, grammatical errors, asymmetric label placement. Fonts that look 'close but not quite right'. Missing regulatory info.",
    original: "Perfect spelling and grammar. Precise label placement. Correct fonts used. All required regulatory information present.",
    tip: "Check ingredient lists carefully — counterfeiters often miss or misspell chemical names.",
  },
  {
    category: "Batch Codes & Barcodes",
    icon: ShieldCheck,
    fake: "Printed over stickers, easily smudged. Batch codes that don't verify on official checkers. Duplicate barcodes across different products.",
    original: "Embossed or cleanly printed. Batch codes verify on official brand tools. Unique barcodes for each product variant.",
    tip: "Always verify the batch code on the brand's official website or use our AI verification tool.",
  },
  {
    category: "Scent & Color",
    icon: Eye,
    fake: "Strong chemical or alcohol smell. Colors may appear slightly different — too vibrant or too dull compared to genuine products.",
    original: "Subtle, refined fragrance consistent with the brand's profile. True-to-swatch colors that match promotional materials.",
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
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-background to-orange-500/5" />
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                <Scale className="h-4 w-4" />
                Know the Difference
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Fake vs{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-shimmer">
                  Original
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Counterfeits can harm your skin, waste your money, and fund
                illegal operations. Learn how to tell them apart with our
                comprehensive comparison guide.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/verification-tools"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Verify a Product <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/detection-guide"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Detection Guide
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Comparison Section */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Side-by-Side Comparison
              </h2>
              <p className="mt-4 text-foreground/70">
                Examine the key differences across 6 critical areas.
              </p>
            </div>

            <div className="space-y-8">
              {comparisonPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.category}
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 border-b border-border/50 bg-muted/30 px-6 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-bold">
                          {point.category}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Comparison #{index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                      {/* Fake Side */}
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="text-sm font-bold uppercase tracking-wider text-red-500">
                            Fake / Counterfeit
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/70">
                          {point.fake}
                        </p>
                      </div>

                      {/* Original Side */}
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-bold uppercase tracking-wider text-green-500">
                            Original / Authentic
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/70">
                          {point.original}
                        </p>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="border-t border-border/50 bg-primary/5 px-6 py-3">
                      <p className="text-sm">
                        <span className="font-semibold text-primary">
                          💡 Pro Tip:{" "}
                        </span>
                        <span className="text-foreground/70">{point.tip}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Red Flags Section */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Warning Signs
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  🚩 Red Flags to Watch For
                </h2>
                <p className="mt-4 text-foreground/70">
                  If you notice any of these warning signs, think twice before
                  purchasing.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {redFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-all hover:border-red-500/40 hover:shadow-md"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {flag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 p-8 sm:p-16 text-center">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <Sparkles className="mx-auto h-12 w-12 text-primary mb-6" />
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                  Not Sure If Your Product Is Real?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-foreground/70">
                  Use our AI-powered verification tools to check your product in
                  seconds. Upload a photo and get an instant authenticity report.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/verification-tools"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Verify Now — Free
                  </Link>
                  <Link
                    href="/detection-guide"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-muted"
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
