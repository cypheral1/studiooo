import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  Camera, ScanBarcode, Hash, QrCode,
  ShieldCheck, ArrowRight, Target, Clock,
  CheckCircle, Users, Award, TrendingUp, Upload, Sparkles, Zap
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
    description: "Upload a photo and our AI analyzes packaging, labels, and visual authenticity markers.",
    features: ["Instant results", "95%+ accuracy", "Multi-angle"],
    ctaLink: "/#verification",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 text-violet-600",
  },
  {
    name: "Barcode Scanner",
    icon: ScanBarcode,
    description: "Scan or upload your product's barcode to verify it matches official brand records.",
    features: ["UPC & EAN", "Global database", "Brand verified"],
    ctaLink: "/#verification",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50 text-blue-600",
  },
  {
    name: "Batch Code Checker",
    icon: Hash,
    description: "Enter your product's batch code to verify manufacturing date and factory of origin.",
    features: ["500+ brands", "Date verified", "Expiry check"],
    ctaLink: "/#verification",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "QR Code Verification",
    icon: QrCode,
    description: "Scan QR codes on packaging to verify against the brand's authentication system.",
    features: ["Brand-direct", "Instant", "Tamper proof"],
    ctaLink: "/#verification",
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50 text-orange-600",
  },
];

const howItWorks = [
  { step: 1, title: "Choose a Tool", description: "Select the verification method that matches what you have.", icon: Target },
  { step: 2, title: "Upload or Enter Data", description: "Upload a clear image or enter the code from your product.", icon: Upload },
  { step: 3, title: "AI Analysis", description: "Our AI checks 50+ authenticity markers against genuine product databases.", icon: Zap },
  { step: 4, title: "Get Your Report", description: "Receive a detailed authenticity report with confidence score.", icon: ShieldCheck },
];

const stats = [
  { value: "2M+", label: "Products Verified", icon: CheckCircle },
  { value: "98.5%", label: "Accuracy Rate", icon: Target },
  { value: "500+", label: "Brands Supported", icon: Award },
  { value: "150K+", label: "Active Users", icon: Users },
  { value: "<30s", label: "Average Time", icon: Clock },
  { value: "24/7", label: "Always Available", icon: TrendingUp },
];

export default function VerificationToolsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-br from-purple-50 via-background to-pink-50">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold mb-6 border border-purple-100">
                <Sparkles className="h-3.5 w-3.5" />
                AI-POWERED VERIFICATION
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Verification <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Tools</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                Multiple ways to verify authenticity — upload a photo,
                scan a barcode, or check a batch code. All free and instant! ⚡
              </p>
              <div className="mt-8">
                <Link
                  href="/#verification"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-8 py-3.5 text-sm font-bold shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Start Verifying Now
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white border-y border-border/50">
          <Container>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto h-5 w-5 text-primary mb-1.5" />
                    <div className="text-2xl font-extrabold text-foreground sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Tools Grid */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Our Verification <span className="text-primary">Suite</span>
              </h2>
              <p className="mt-4 text-muted-foreground">Choose the right tool for your verification needs.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
              {verificationTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tool.bg} mb-4 transition-transform group-hover:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tool.features.map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-emerald-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={tool.ctaLink}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tool.color} px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]`}
                      >
                        Use Tool <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="mt-4 text-muted-foreground">Verify any product in 4 simple steps.</p>
            </div>

            <div className="mx-auto max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
              {howItWorks.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold">
                        {step.step}
                      </span>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-8 sm:p-16 text-center text-white">
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <ShieldCheck className="mx-auto h-12 w-12 mb-6 animate-float" />
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Ready to Protect Yourself? 🛡️
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Join over 150,000 users who trust TrueOriginalShop. Free, fast, and always available.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/#verification"
                    className="inline-flex items-center gap-2 bg-white text-pink-600 rounded-full px-8 py-3.5 text-sm font-bold shadow-lg hover:bg-white/90 transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Start Verification — Free
                  </Link>
                  <Link
                    href="/detection-guide"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 text-white px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Detection Guide <ArrowRight className="h-4 w-4" />
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
