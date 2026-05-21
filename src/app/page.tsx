import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicHero } from '@/components/cinematic/hero';
import { HowItWorks } from '@/components/cinematic/how-it-works';
import { CaseStudies } from '@/components/cinematic/case-studies';
import { PricingSection } from '@/components/cinematic/pricing';
import { CinematicFooter } from '@/components/cinematic/footer';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main>
        <CinematicHero />
        <HowItWorks />
        <CaseStudies />
        <PricingSection />
      </main>
      <CinematicFooter />
    </div>
  );
}
