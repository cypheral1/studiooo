import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicHero } from '@/components/cinematic/hero';
import { CaseStudies } from '@/components/cinematic/case-studies';
import { CinematicFreeGuide } from '@/components/cinematic/free-guide';
import { CinematicFooter } from '@/components/cinematic/footer';
import { SkinFinderCTA } from '@/components/cinematic/skin-finder-cta';

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main>
        <CinematicHero />
        <CaseStudies />
        <SkinFinderCTA />
        <CinematicFreeGuide />
      </main>
      <CinematicFooter />
    </div>
  );
}
