import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { WhereToBuy } from "@/components/sections/where-to-buy";
import { FreeGuide } from "@/components/sections/free-guide";
import { Faq } from "@/components/sections/faq";
import { VerificationSection } from "@/components/sections/verification";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhereToBuy />
        <FreeGuide />
        <Faq />
        <VerificationSection />
      </main>
      <Footer />
    </div>
  );
}
