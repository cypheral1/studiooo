import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import {
  GitCompareArrows, CheckCircle, XCircle, AlertTriangle,
  Star, ShieldCheck, ArrowRight, Crown, TrendingUp,
  Flame, Eye
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Comparisons - Real vs Fake Side by Side | TrueOriginalShop",
  description:
    "Detailed side-by-side comparisons of the most counterfeited cosmetic products. See exactly how to spot fakes vs genuine items.",
};

const featuredComparisons = [
  {
    product: "MAC Ruby Woo Lipstick",
    brand: "MAC Cosmetics",
    category: "Makeup",
    riskLevel: "High",
    riskColor: "text-red-500",
    differences: [
      { aspect: "Packaging Weight", fake: "Lighter, hollow feel", real: "Solid, weighted metal case" },
      { aspect: "Color Payoff", fake: "Thin, streaky application", real: "Rich, opaque in one swipe" },
      { aspect: "Scent", fake: "Strong chemical odor", real: "Subtle vanilla fragrance" },
      { aspect: "Logo", fake: "Printed logo, easily scratched", real: "Embossed with clean edges" },
    ],
  },
  {
    product: "Charlotte Tilbury Flawless Filter",
    brand: "Charlotte Tilbury",
    category: "Skincare/Makeup",
    riskLevel: "Very High",
    riskColor: "text-red-600",
    differences: [
      { aspect: "Bottle Glass", fake: "Thin glass, light weight", real: "Heavy, premium glass bottle" },
      { aspect: "Pump Mechanism", fake: "Loose, dispenses unevenly", real: "Smooth, controlled dispensing" },
      { aspect: "Product Texture", fake: "Grainy with visible particles", real: "Silky smooth, homogeneous" },
      { aspect: "Cap Fit", fake: "Loose, clicks weakly", real: "Magnetic, snaps firmly" },
    ],
  },
  {
    product: "Dyson Airwrap",
    brand: "Dyson",
    category: "Haircare Tools",
    riskLevel: "Extreme",
    riskColor: "text-red-700",
    differences: [
      { aspect: "Motor Sound", fake: "Loud, rattling noise", real: "Quiet, smooth hum" },
      { aspect: "Attachments", fake: "Loose fit, cheap plastic", real: "Precision-fit, quality materials" },
      { aspect: "Serial Number", fake: "Missing or invalid", real: "Verifiable on Dyson website" },
      { aspect: "Heat Control", fake: "Erratic temperatures", real: "Precise, intelligent heat control" },
    ],
  },
  {
    product: "The Ordinary Niacinamide Serum",
    brand: "The Ordinary",
    category: "Skincare",
    riskLevel: "High",
    riskColor: "text-red-500",
    differences: [
      { aspect: "Dropper Quality", fake: "Stiff, poor suction", real: "Smooth, consistent suction" },
      { aspect: "Liquid Consistency", fake: "Watery, almost clear", real: "Slightly viscous, translucent" },
      { aspect: "Label Print", fake: "Blurry text, wrong font size", real: "Crisp, exact brand typography" },
      { aspect: "Scent", fake: "No scent or strong chemical", real: "Very faint, neutral scent" },
    ],
  },
  {
    product: "Dior Sauvage EDP",
    brand: "Dior",
    category: "Perfume",
    riskLevel: "Very High",
    riskColor: "text-red-600",
    differences: [
      { aspect: "Atomizer", fake: "Coarse spray, uneven mist", real: "Fine, even mist spray" },
      { aspect: "Longevity", fake: "Fades within 1-2 hours", real: "Lasts 6-8+ hours easily" },
      { aspect: "Box Interior", fake: "Thin insert, product moves", real: "Molded cradle, no movement" },
      { aspect: "Batch Code", fake: "Sticker, easily peels", real: "Printed/embossed, permanent" },
    ],
  },
  {
    product: "La Mer Moisturizing Cream",
    brand: "La Mer",
    category: "Skincare",
    riskLevel: "Extreme",
    riskColor: "text-red-700",
    differences: [
      { aspect: "Jar Weight", fake: "Lightweight glass/plastic", real: "Heavy, luxurious glass jar" },
      { aspect: "Cream Texture", fake: "Greasy, doesn't absorb well", real: "Rich but absorbs beautifully" },
      { aspect: "Scent", fake: "Artificial, overpowering", real: "Subtle sea mineral fragrance" },
      { aspect: "Lid Seal", fake: "No inner seal or thin foil", real: "Quality inner seal with branding" },
    ],
  },
];

const mostCounterfeited = [
  { rank: 1, name: "Dyson Airwrap / Supersonic", icon: Flame, stat: "72% of online units tested were fake" },
  { rank: 2, name: "MAC Lipsticks (Ruby Woo, Velvet Teddy)", icon: TrendingUp, stat: "65% fake rate on unauthorized sellers" },
  { rank: 3, name: "Charlotte Tilbury Flawless Filter", icon: AlertTriangle, stat: "58% of social media purchases are fake" },
  { rank: 4, name: "Perfumes (Dior, Chanel, Tom Ford)", icon: Crown, stat: "50% of discount perfumes are counterfeit" },
  { rank: 5, name: "The Ordinary Serums", icon: Eye, stat: "45% higher fake rate due to popularity" },
];

export default function ProductComparisonsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5" />
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400">
                <GitCompareArrows className="h-4 w-4" />
                Real vs Fake
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Product{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent animate-shimmer">
                  Comparisons
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Detailed side-by-side breakdowns of the most counterfeited
                beauty and cosmetic products. Know exactly what to look for.
              </p>
            </div>
          </Container>
        </section>

        {/* Most Counterfeited Ranking */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500">
                <Flame className="h-4 w-4" />
                Highest Risk Products
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Most Counterfeited Products
              </h2>
              <p className="mt-4 text-foreground/70">
                These products are the most frequently counterfeited in the beauty industry.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {mostCounterfeited.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.rank}
                    className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 font-headline text-xl font-bold text-red-500">
                      #{item.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline text-base font-bold truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-red-500/80 font-medium">
                        {item.stat}
                      </p>
                    </div>
                    <Icon className="h-5 w-5 shrink-0 text-red-500/50" />
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Detailed Comparisons */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Detailed Comparisons
              </h2>
              <p className="mt-4 text-foreground/70">
                Examine specific products with our comprehensive comparison tables.
              </p>
            </div>

            <div className="space-y-8">
              {featuredComparisons.map((comparison) => (
                <div
                  key={comparison.product}
                  className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  {/* Product Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 bg-muted/30 px-6 py-4">
                    <div>
                      <h3 className="font-headline text-lg font-bold">
                        {comparison.product}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {comparison.brand} · {comparison.category}
                      </p>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold ${comparison.riskColor}`}>
                      <AlertTriangle className="h-3 w-3" />
                      {comparison.riskLevel} Risk
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Aspect
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-red-500">
                            <span className="flex items-center gap-1">
                              <XCircle className="h-3.5 w-3.5" /> Fake
                            </span>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-500">
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" /> Original
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.differences.map((diff, i) => (
                          <tr
                            key={diff.aspect}
                            className={i % 2 === 0 ? "bg-muted/10" : ""}
                          >
                            <td className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                              {diff.aspect}
                            </td>
                            <td className="px-6 py-3 text-sm text-foreground/60">
                              {diff.fake}
                            </td>
                            <td className="px-6 py-3 text-sm text-foreground/60">
                              {diff.real}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-secondary">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 p-8 sm:p-16 text-center">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="relative">
                <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-6" />
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                  Have a Product to Compare?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-foreground/70">
                  Upload your product photo and let our AI compare it against
                  authentic product databases in seconds.
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
                    Fake vs Original Guide <ArrowRight className="h-4 w-4" />
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
