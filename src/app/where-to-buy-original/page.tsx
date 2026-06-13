import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import { Container } from '@/components/container';
import { HighRiskSlideshow } from '@/components/sections/high-risk-slideshow';
import { ShippingMarquee } from '@/components/cinematic/shipping-marquee';
import {
  Store, CheckCircle, ShieldCheck, Globe,
  AlertTriangle, BadgeCheck, Truck,
  CreditCard, RotateCcw, HeadphonesIcon, Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where to Buy Original Products - Trusted Retailers | TrueOriginalShop",
  description:
    "Find trusted retailers and verified sellers for authentic cosmetic products. Our curated list of authorized dealers ensures you get genuine products every time.",
};

const trustedRetailers = [
  {
    name: "Amazon (Authorized Sellers)",
    trustScore: 92,
    description: "Look for 'Ships from and sold by Amazon' or sellers with the 'Authorized Dealer' badge. Avoid third-party sellers without verification.",
    features: ["Easy returns", "Fast shipping", "Buyer protection"],
    badge: "Marketplace",
    emoji: "📦"
  },
  {
    name: "Nykaa",
    trustScore: 98,
    description: "India's leading beauty retailer. Sources directly from brands. Every product comes with authenticity guarantee and batch code verification.",
    features: ["Direct from brands", "Authenticity guaranteed", "Beauty rewards"],
    badge: "Official Partner",
    emoji: "🛍️"
  },
  {
    name: "Sephora",
    trustScore: 99,
    description: "Premium beauty retailer with strict sourcing policies. All products are sourced directly from brand partners with full traceability.",
    features: ["Premium brands only", "Free samples", "Loyalty rewards"],
    badge: "Authorized",
    emoji: "💎"
  },
  {
    name: "Official Brand Websites",
    trustScore: 100,
    description: "The gold standard. Buying directly from brand websites guarantees 100% authenticity. Many offer exclusive products and early access.",
    features: ["100% guaranteed", "Exclusive offers", "Direct support"],
    badge: "Direct",
    emoji: "🌐"
  },
  {
    name: "Cult Beauty",
    trustScore: 97,
    description: "UK-based curated beauty retailer known for its strict vetting process. Only sells genuine products from authorized brand partners.",
    features: ["Curated selection", "Expert reviews", "Global shipping"],
    badge: "Authorized",
    emoji: "💄"
  },
  {
    name: "ULTA Beauty",
    trustScore: 96,
    description: "Major US beauty retailer with both drugstore and prestige brands. Direct brand partnerships ensure product authenticity.",
    features: ["Wide range", "Salon services", "Points rewards"],
    badge: "Authorized",
    emoji: "✨"
  },
];

const shoppingTips = [
  {
    icon: Lock,
    title: "Verify Website Security",
    description: "Always check for HTTPS and a valid SSL certificate. Look for the padlock icon in your browser's address bar.",
  },
  {
    icon: CreditCard,
    title: "Use Secure Payment Methods",
    description: "Pay with credit cards or trusted services like PayPal that offer buyer protection for fraudulent purchases.",
  },
  {
    icon: RotateCcw,
    title: "Check Return Policies",
    description: "Legitimate retailers always have clear return and refund policies. No returns = red flag.",
  },
  {
    icon: HeadphonesIcon,
    title: "Test Customer Service",
    description: "Before purchasing, try contacting the seller. Legitimate businesses have responsive, professional customer support.",
  },
  {
    icon: BadgeCheck,
    title: "Look for Authorization",
    description: "Check if the seller is listed as an authorized retailer on the brand's official website.",
  },
  {
    icon: Truck,
    title: "Track Your Shipment",
    description: "Genuine sellers provide tracking numbers. If a seller can't provide shipping info, avoid purchasing.",
  },
];

const sellerRedFlags = [
  "No physical address or contact information",
  "Social media-only storefronts with no website",
  "Prices significantly below market value (40%+ off)",
  "Stock photos instead of actual product images",
  "No return or refund policy",
  "Requests payment via wire transfer or cryptocurrency only",
  "New seller account with no reviews or history",
  "Refuses to show proof of brand authorization",
];

export default function WhereToBuyOriginalPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 pt-32 pb-20">
        <ShippingMarquee />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 text-center">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-[var(--cinematic-text)] text-xs font-bold mb-6 border border-white/40 uppercase tracking-widest backdrop-blur">
                <Store className="h-4 w-4" />
                Verified Retailers
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide mb-4">
                Where to Buy <br/> <span className="bg-gradient-to-r from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] bg-clip-text text-transparent">Original</span>
              </h1>
              <p className="text-lg text-[var(--cinematic-text-secondary)] mb-8 tracking-wide">
                Shop with confidence from our curated list of trusted retailers and authorized sellers. Every store is vetted for authenticity and reliability.
              </p>
            </div>
          </Container>
        </section>

        {/* Carousel Section */}
        <section className="py-12 border-y border-[var(--cinematic-border)] bg-white/10 backdrop-blur-md">
          <Container>
            <HighRiskSlideshow />
          </Container>
        </section>

        {/* Trusted Retailers Grid */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                Trusted <span className="bg-gradient-to-r from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] bg-clip-text text-transparent">Retailers</span>
              </h2>
              <p className="mt-4 text-[var(--cinematic-text-secondary)]">
                These retailers are verified for authentic product sourcing.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustedRetailers.map((retailer) => (
                <div
                  key={retailer.name}
                  className="group flex flex-col glass-card rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300">
                      {retailer.emoji}
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/30 px-2.5 py-1 text-[10px] font-bold text-[var(--cinematic-text)] uppercase tracking-widest border border-white/40">
                      <BadgeCheck className="h-3 w-3" /> {retailer.badge}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-wide mb-2 group-hover:text-[var(--cinematic-cyan)] transition-colors">
                    {retailer.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">Trust Score:</span>
                     <div className="flex items-center gap-1 bg-white/40 px-2 py-0.5 rounded text-[var(--cinematic-text)] text-sm font-bold border border-white/50">
                       {retailer.trustScore}%
                     </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--cinematic-text-secondary)] mb-6 flex-grow">
                    {retailer.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--cinematic-border)]">
                    {retailer.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 rounded border border-white/30 bg-white/20 px-2.5 py-1 text-xs text-[var(--cinematic-text)]"
                      >
                        <CheckCircle className="h-3 w-3 text-[var(--cinematic-cyan)]" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Shopping Tips */}
        <section className="py-20 sm:py-28 bg-white/5 border-y border-[var(--cinematic-border)]">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                Safe Online <span className="text-[var(--cinematic-pink)]">Shopping Tips</span>
              </h2>
              <p className="mt-4 text-[var(--cinematic-text-secondary)]">
                Follow these guidelines to protect yourself when shopping online.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shoppingTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.title}
                    className="rounded-2xl glass-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/30 border border-white/40">
                      <Icon className="h-6 w-6 text-[var(--cinematic-text)]" />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wide mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--cinematic-text-secondary)]">
                      {tip.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Red Flag Sellers */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500 border border-red-500/20">
                  <AlertTriangle className="h-4 w-4" />
                  Seller Red Flags
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                  Avoid Sellers That Show These Signs
                </h2>
                <p className="mt-4 text-[var(--cinematic-text-secondary)]">
                  These are common characteristics of unauthorized and counterfeit sellers.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sellerRedFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-all hover:border-red-500/30 backdrop-blur-sm"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--cinematic-text)] font-medium">
                      {flag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="pb-16 pt-8">
          <Container>
            <div className="mt-8 glass-card border-[var(--cinematic-border)] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-white/30 rounded-full flex items-center justify-center shrink-0 border border-white/40">
                  <Globe className="h-8 w-8 text-[var(--cinematic-text)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-2">Already Bought a Product?</h3>
                  <p className="text-sm text-[var(--cinematic-text-secondary)] leading-relaxed max-w-xl">
                    Even trusted sellers can occasionally have issues. Verify your
                    product&apos;s authenticity with our free AI-powered tools.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0">
                <Link
                  href="/verification-tools"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 shadow-lg"
                  style={{ borderRadius: '9999px' }}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Verify Product
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
