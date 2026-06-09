import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/container";
import { Newspaper } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | TrueOriginalShop",
  description: "Read the latest news, tips, and guides about product authenticity.",
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-background to-purple-500/5" />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Newspaper className="h-4 w-4" />
                Our Blog
              </div>
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Latest from{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Our Blog
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
                Expert advice, authenticity guides, and the latest news in the world of beauty and cosmetics.
              </p>
            </div>
          </Container>
        </section>
        
        <section className="py-20">
          <Container>
            <div className="text-center text-foreground/60 py-12">
              <p>Articles coming soon. Check back later for updates!</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
