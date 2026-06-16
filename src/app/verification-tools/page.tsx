import { CinematicNav } from "@/components/cinematic/nav";
import { CinematicFooter } from "@/components/cinematic/footer";
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
    color: "from-[var(--cinematic-cyan)] to-blue-500",
  },
  {
    name: "Barcode Scanner",
    icon: ScanBarcode,
    description: "Scan or upload your product's barcode to verify it matches official brand records.",
    features: ["UPC & EAN", "Global database", "Brand verified"],
    ctaLink: "/#verification",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Batch Code Checker",
    icon: Hash,
    description: "Enter your product's batch code to verify manufacturing date and factory of origin.",
    features: ["500+ brands", "Date verified", "Expiry check"],
    ctaLink: "/#verification",
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "QR Code Verification",
    icon: QrCode,
    description: "Scan QR codes on packaging to verify against the brand's authentication system.",
    features: ["Brand-direct", "Instant", "Tamper proof"],
    ctaLink: "/#verification",
    color: "from-[var(--cinematic-pink)] to-rose-500",
  },
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
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 text-center">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-[var(--cinematic-text)] text-xs font-bold mb-6 border border-white/40 uppercase tracking-widest backdrop-blur">
                <Sparkles className="h-4 w-4" />
                AI-POWERED VERIFICATION
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide mb-4">
                Verification <span className="bg-gradient-to-r from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] bg-clip-text text-transparent">Tools</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--cinematic-text-secondary)] tracking-wide max-w-xl mx-auto">
                Multiple ways to verify authenticity — upload a photo,
                scan a barcode, or check a batch code. All free and instant! ⚡
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/#verification"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 shadow-lg"
                  style={{ borderRadius: '9999px' }}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Start Verifying Now
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white/10 backdrop-blur-md border-y border-[var(--cinematic-border)]">
          <Container>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto h-6 w-6 text-[var(--cinematic-cyan)] mb-2 drop-shadow-sm" />
                    <div className="text-2xl font-extrabold text-[var(--cinematic-text)] sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-[var(--cinematic-text-secondary)] font-bold uppercase tracking-widest">{stat.label}</div>
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
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                Our Verification <span className="bg-gradient-to-r from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] bg-clip-text text-transparent">Suite</span>
              </h2>
              <p className="mt-4 text-[var(--cinematic-text-secondary)]">Choose the right tool for your verification needs.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {verificationTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group flex flex-col glass-card rounded-2xl border border-[var(--cinematic-border)] shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} shadow-lg mb-5 transition-transform group-hover:scale-110`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-xl uppercase tracking-wide text-[var(--cinematic-text)] mb-3">{tool.name}</h3>
                      <p className="text-sm text-[var(--cinematic-text-secondary)] mb-6 leading-relaxed flex-grow">{tool.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.features.map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1 rounded border border-white/30 bg-white/20 px-2.5 py-1 text-xs text-[var(--cinematic-text)]">
                            <CheckCircle className="h-3 w-3 text-[var(--cinematic-cyan)]" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={tool.ctaLink}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/30 hover:bg-white/50 border border-white/40 px-6 py-3 text-sm font-bold text-[var(--cinematic-text)] shadow-sm transition-all hover:shadow-md"
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

        {/* CTA */}
        <section className="pb-16 pt-8">
          <Container>
            <div className="mt-8 glass-card border-[var(--cinematic-border)] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-white/30 rounded-full flex items-center justify-center shrink-0 border border-white/40">
                  <ShieldCheck className="h-8 w-8 text-[var(--cinematic-text)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-2">Ready to Protect Yourself?</h3>
                  <p className="text-sm text-[var(--cinematic-text-secondary)] leading-relaxed max-w-xl">
                    Join over 150,000 users who trust TrueOriginalShop. Free, fast, and always available.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0">
                <Link
                  href="/#verification"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 shadow-lg"
                  style={{ borderRadius: '9999px' }}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Start Verification
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
