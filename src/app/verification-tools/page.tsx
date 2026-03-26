import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  Wrench, Camera, ScanBarcode, Hash, QrCode,
  ShieldCheck, ArrowRight, Zap, Target, Clock,
  CheckCircle, Users, Award, TrendingUp, Upload
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Verification Tools - AI-Powered Authenticity Check | TrueOriginalShop",
  description:
    "Use our suite of AI-powered verification tools to check product authenticity. Photo analysis, barcode scanning, batch code verification, and more.",
};

const verificationTools = [
  {
    name: "AI Photo Analysis",
    icon: Camera,
    description: "Upload a photo of your product and our AI will analyze packaging, labels, and visual authenticity markers against our database of genuine products.",
    status: "Available",
    statusColor: "text-green-500 bg-green-500/10",
    features: ["Instant results", "95%+ accuracy", "Multi-angle support"],
    cta: "Upload Photo",
    ctaLink: "/#verification",
    color: "from-violet-500 to-purple-500",
    bgColor: "from-violet-500/10 to-purple-500/10",
  },
  {
    name: "Barcode Scanner",
    icon: ScanBarcode,
    description: "Scan or upload your product's barcode to verify it matches official brand records. We cross-reference against international barcode databases.",
    status: "Available",
    statusColor: "text-green-500 bg-green-500/10",
    features: ["UPC & EAN support", "Global database", "Brand verification"],
    cta: "Scan Barcode",
    ctaLink: "/#verification",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Batch Code Checker",
    icon: Hash,
    description: "Enter your product's batch code to verify manufacturing date, expiration, and factory of origin. Works with over 500+ brands worldwide.",
    status: "Available",
    statusColor: "text-green-500 bg-green-500/10",
    features: ["500+ brands", "Manufacture date", "Expiry verification"],
    cta: "Check Batch Code",
    ctaLink: "/#verification",
    color: "from-emerald-500 to-green-500",
    bgColor: "from-emerald-500/10 to-green-500/10",
  },
  {
    name: "QR Code Verification",
    icon: QrCode,
    description: "Many premium brands include QR codes on their packaging. Scan them to verify against the brand's authentication system directly.",
    status: "Available",
    statusColor: "text-green-500 bg-green-500/10",
    features: ["Brand-direct verification", "Instant validation", "Tamper detection"],
    cta: "Scan QR Code",
    ctaLink: "/#verification",
    color: "from-orange-500 to-amber-500",
    bgColor: "from-orange-500/10 to-amber-500/10",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Choose a Tool",
    description: "Select the verification method that matches what you have — a photo, barcode, batch code, or QR code.",
    icon: Target,
  },
  {
    step: 2,
    title: "Upload or Enter Data",
    description: "Upload a clear image or enter the code found on your product packaging. The clearer the input, the better the results.",
    icon: Upload,
  },
  {
    step: 3,
    title: "AI Analysis",
    description: "Our AI engine processes your input against databases of authentic products, looking for 50+ authenticity markers.",
    icon: Zap,
  },
  {
    step: 4,
    title: "Get Your Report",
    description: "Receive a detailed authenticity report with a confidence score, specific findings, and recommended next steps.",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: "2M+", label: "Products Verified", icon: CheckCircle },
  { value: "98.5%", label: "Accuracy Rate", icon: Target },
  { value: "500+", label: "Brands Supported", icon: Award },
  { value: "150K+", label: "Active Users", icon: Users },
  { value: "<30s", label: "Average Check Time", icon: Clock },
  { value: "24/7", label: "Always Available", icon: TrendingUp },
];

export default function VerificationToolsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-indigo-500/5" />
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                <Wrench className="h-4 w-4" />
                AI-Powered Verification
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Verification{" "}
                <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-shimmer">
                  Tools
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Our suite of AI-powered tools gives you multiple ways to verify
                product authenticity. Upload a photo, scan a barcode, or check a
                batch code — all free and instant.
              </p>
              <div className="mt-8">
                <Link
                  href="/#verification"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Start Verifying Now
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary">
          <Container>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto h-6 w-6 text-primary mb-2" />
                    <div className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Verification Tools Grid */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Our Verification Suite
              </h2>
              <p className="mt-4 text-foreground/70">
                Choose the right tool for your verification needs.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {verificationTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`bg-gradient-to-r ${tool.bgColor} px-6 py-5`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-headline text-lg font-bold">
                              {tool.name}
                            </h3>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tool.statusColor}`}>
                              <CheckCircle className="h-3 w-3" />
                              {tool.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-foreground/60 mb-4">
                        {tool.description}
                      </p>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {tool.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={tool.ctaLink}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tool.color} px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]`}
                      >
                        {tool.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-foreground/70">
                Verify any product in 4 simple steps.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />

                <div className="space-y-8">
                  {howItWorks.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="flex gap-6">
                        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/30">
                          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {step.step}
                          </span>
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="pt-2">
                          <h3 className="font-headline text-lg font-bold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 p-8 sm:p-16 text-center">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative">
                <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-6 animate-float" />
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                  Ready to Protect Yourself?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-foreground/70">
                  Join over 150,000 users who trust TrueOriginalShop to verify
                  their products. It&apos;s free, fast, and always available.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/#verification"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 animate-pulse-glow"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Start Verification — Free
                  </Link>
                  <Link
                    href="/detection-guide"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-muted"
                  >
                    Learn to Detect Manually <ArrowRight className="h-4 w-4" />
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
