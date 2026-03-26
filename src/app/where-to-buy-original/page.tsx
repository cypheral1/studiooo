import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  Store, CheckCircle, ShieldCheck, Star, Globe,
  AlertTriangle, ExternalLink, BadgeCheck, Truck,
  CreditCard, RotateCcw, HeadphonesIcon, Lock
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
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "Nykaa",
    trustScore: 98,
    description: "India's leading beauty retailer. Sources directly from brands. Every product comes with authenticity guarantee and batch code verification.",
    features: ["Direct from brands", "Authenticity guaranteed", "Beauty rewards"],
    badge: "Official Partner",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Sephora",
    trustScore: 99,
    description: "Premium beauty retailer with strict sourcing policies. All products are sourced directly from brand partners with full traceability.",
    features: ["Premium brands only", "Free samples", "Loyalty rewards"],
    badge: "Authorized",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    name: "Official Brand Websites",
    trustScore: 100,
    description: "The gold standard. Buying directly from brand websites guarantees 100% authenticity. Many offer exclusive products and early access.",
    features: ["100% guaranteed", "Exclusive offers", "Direct support"],
    badge: "Direct",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Cult Beauty",
    trustScore: 97,
    description: "UK-based curated beauty retailer known for its strict vetting process. Only sells genuine products from authorized brand partners.",
    features: ["Curated selection", "Expert reviews", "Global shipping"],
    badge: "Authorized",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "ULTA Beauty",
    trustScore: 96,
    description: "Major US beauty retailer with both drugstore and prestige brands. Direct brand partnerships ensure product authenticity.",
    features: ["Wide range", "Salon services", "Points rewards"],
    badge: "Authorized",
    color: "from-red-500/20 to-rose-500/20",
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5" />
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                <Store className="h-4 w-4" />
                Verified Retailers
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Where to Buy{" "}
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-shimmer">
                  Original
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Shop with confidence from our curated list of trusted retailers
                and authorized sellers. Every store is vetted for authenticity
                and reliability.
              </p>
            </div>
          </Container>
        </section>

        {/* Trusted Retailers Grid */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted Retailers
              </h2>
              <p className="mt-4 text-foreground/70">
                These retailers are verified for authentic product sourcing.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustedRetailers.map((retailer) => (
                <div
                  key={retailer.name}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${retailer.color} blur-2xl opacity-50 transition-opacity group-hover:opacity-100`} />
                  <div className="relative">
                    {/* Badge */}
                    <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                      <BadgeCheck className="h-3 w-3" /> {retailer.badge}
                    </div>

                    {/* Name & Score */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-headline text-lg font-bold leading-tight">
                        {retailer.name}
                      </h3>
                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-green-500/10 px-2 py-1">
                        <Star className="h-3.5 w-3.5 fill-green-500 text-green-500" />
                        <span className="text-xs font-bold text-green-600 dark:text-green-400">
                          {retailer.trustScore}%
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/60 mb-4">
                      {retailer.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {retailer.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Shopping Tips */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Safe Online Shopping Tips
              </h2>
              <p className="mt-4 text-foreground/70">
                Follow these guidelines to protect yourself when shopping online.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shoppingTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.title}
                    className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
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

        {/* Red Flag Sellers */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Seller Red Flags
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  🚩 Avoid Sellers That Show These Signs
                </h2>
                <p className="mt-4 text-foreground/70">
                  These are common characteristics of unauthorized and counterfeit sellers.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sellerRedFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-all hover:border-red-500/40"
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

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 sm:p-16 text-center">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
              <div className="relative">
                <Globe className="mx-auto h-12 w-12 text-green-500 mb-6" />
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                  Already Bought a Product?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-foreground/70">
                  Even trusted sellers can occasionally have issues. Verify your
                  product&apos;s authenticity with our free AI-powered tools.
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/verification-tools"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Verify Your Product
                  </Link>
                  <Link
                    href="/fake-vs-original"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-muted"
                  >
                    Fake vs Original Guide
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
