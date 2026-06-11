import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  Search, Eye, Package, Droplets, Sparkles, Wind,
  FlaskConical, Scissors, ShieldCheck, ArrowRight,
  CheckCircle, Lightbulb, BookOpen
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counterfeit Detection Guide - Spot Fake Products | TrueOriginalShop",
  description:
    "Comprehensive step-by-step guide to detecting counterfeit cosmetic products. Learn expert techniques for skincare, makeup, perfume, and haircare.",
};

const detectionSteps = [
  {
    step: 1,
    title: "Examine the Packaging",
    icon: Package,
    description: "Start with the outer packaging. Authentic products use high-quality materials with crisp printing.",
    checks: [
      "Check for misspellings or grammatical errors on labels",
      "Verify print quality — genuine products have sharp, clear text",
      "Feel the box weight — originals use thicker, sturdier cardboard",
      "Look for tamper-evident seals and their quality",
      "Compare the color scheme with the brand's official images",
    ],
  },
  {
    step: 2,
    title: "Inspect the Product Itself",
    icon: Eye,
    description: "The product inside tells a lot. Compare its appearance, texture, and consistency.",
    checks: [
      "Check the color — it should match exactly with official swatches",
      "Feel the texture — originals have consistent, smooth formulations",
      "Test the consistency — fakes often feel watery or overly thick",
      "Look for separation or unusual settling in liquid products",
      "Examine the applicator/dispenser quality and branding",
    ],
  },
  {
    step: 3,
    title: "Verify Batch & Barcode",
    icon: ShieldCheck,
    description: "Every authentic product has verifiable batch codes and barcodes.",
    checks: [
      "Locate the batch code (usually on the bottom or back)",
      "Cross-reference with the brand's official batch checker",
      "Scan the barcode — it should return correct product info",
      "Check that the manufacturing date makes sense",
      "Verify the expiration date format matches the brand's style",
    ],
  },
  {
    step: 4,
    title: "Smell & Texture Test",
    icon: Droplets,
    description: "Your senses are powerful tools. Trust them.",
    checks: [
      "Compare the scent with a known original (if you have one)",
      "Note any strong chemical or alcohol smells (red flag)",
      "Test how the product feels on skin — too greasy or too dry?",
      "Check if the product absorbs normally or leaves residue",
      "Notice any unusual stinging or irritation (stop immediately)",
    ],
  },
  {
    step: 5,
    title: "Use Digital Verification",
    icon: FlaskConical,
    description: "Leverage technology for the most reliable results.",
    checks: [
      "Upload product photos to our AI verification tool",
      "Use brand-specific authentication apps if available",
      "Scan QR codes on packaging (if present)",
      "Check serial numbers against brand databases",
      "Take a clear photo of packaging details for analysis",
    ],
  },
];

const categoryGuides = [
  {
    category: "Skincare",
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    tips: [
      "Test serums on skin — fakes absorb differently",
      "Check for consistent fragrance throughout use",
      "Verify ingredient lists against official product pages",
      "Pump mechanisms should operate smoothly",
    ],
  },
  {
    category: "Makeup",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-500/10 to-rose-500/10",
    tips: [
      "Swatch the product — color payoff should match reviews",
      "Check brush/applicator quality and branding",
      "Authentic pressed powders don't crumble easily",
      "Magnetic closures should feel strong and precise",
    ],
  },
  {
    category: "Perfume",
    icon: Wind,
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-500/10 to-violet-500/10",
    tips: [
      "Genuine perfumes have 3 scent layers (top, heart, base)",
      "Check cap fit — it should be snug and perfectly aligned",
      "Sprayer should produce a fine, even mist",
      "Longevity test — real perfumes last 4-8 hours minimum",
    ],
  },
  {
    category: "Haircare",
    icon: Scissors,
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/10 to-orange-500/10",
    tips: [
      "Check shampoo/conditioner viscosity and lather quality",
      "Authentic products have consistent fragrances batch-to-batch",
      "Flip caps and pump mechanisms should feel sturdy",
      "Labels should withstand water exposure without peeling",
    ],
  },
];

const expertTips = [
  {
    icon: Lightbulb,
    title: "Buy from One Source First",
    description: "Start with an official source so you know what the genuine product looks, feels, and smells like. This becomes your reference.",
  },
  {
    icon: BookOpen,
    title: "Document Everything",
    description: "Take photos of packaging, batch codes, and the product itself. If you discover a fake, you'll have evidence for reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Use Multiple Checks",
    description: "Don't rely on a single verification method. Combine visual inspection, batch code checking, and our AI tool for best results.",
  },
  {
    icon: Search,
    title: "Research Before Buying",
    description: "Look up the seller, read reviews about product authenticity, and check if they're an authorized retailer for the brand.",
  },
];

export default function DetectionGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5" />
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Search className="h-4 w-4" />
                Expert-Level Knowledge
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Detection{" "}
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent animate-shimmer">
                  Guide
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Master the art of spotting counterfeit products with our
                comprehensive, step-by-step detection methodology used by
                industry professionals.
              </p>
            </div>
          </Container>
        </section>

        {/* Step-by-Step Detection Process */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                5-Step Detection Process
              </h2>
              <p className="mt-4 text-foreground/70">
                Follow this methodology for reliable product verification.
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              {detectionSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 border-b border-border/50 bg-muted/30 px-6 py-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-headline text-xl font-bold text-primary">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-headline text-lg font-bold">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <Icon className="h-6 w-6 text-primary/50" />
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {step.checks.map((check, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span className="text-foreground/70">{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Category-Specific Guides */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Category-Specific Tips
              </h2>
              <p className="mt-4 text-foreground/70">
                Different product types require different detection approaches.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {categoryGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <div
                    key={guide.category}
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`bg-gradient-to-r ${guide.bgColor} px-6 py-4`}>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${guide.color} shadow-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-headline text-xl font-bold">
                          {guide.category}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {guide.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span className="text-foreground/70">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Expert Tips */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Expert Tips
              </h2>
              <p className="mt-4 text-foreground/70">
                Pro advice from authenticity experts.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {expertTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.title}
                    className="rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-headline text-base font-bold mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {tip.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10 p-8 sm:p-16 text-center">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
              <div className="relative">
                <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-6" />
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                  Ready to Verify a Product?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-foreground/70">
                  Put your knowledge to the test or let our AI do the heavy
                  lifting. Upload a photo and get instant results.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/verification-tools"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Use Verification Tools
                  </Link>
                  <Link
                    href="/product-comparisons"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-muted"
                  >
                    View Comparisons <ArrowRight className="h-4 w-4" />
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
