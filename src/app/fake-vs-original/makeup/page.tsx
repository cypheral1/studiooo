import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import { Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake vs Original Makeup | TrueOriginalShop",
  description: "Learn how to spot fake makeup products with our comprehensive guides.",
};

export default function MakeupGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-background to-purple-500/5" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
                <Scale className="h-4 w-4" />
                Makeup Guide
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Fake vs Original{" "}
                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Makeup
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Comprehensive comparison guides to help you identify authentic makeup products from counterfeit ones.
              </p>
            </div>
          </Container>
        </section>
        
        <section className="py-20">
          <Container>
            <div className="text-center text-foreground/60 py-12">
              <p>Content coming soon. Stay tuned for detailed comparisons of popular makeup brands.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
