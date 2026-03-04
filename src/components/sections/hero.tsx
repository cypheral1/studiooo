import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Gift } from 'lucide-react';
import { Container } from '@/components/container';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      <div className="relative z-10 flex h-full items-center">
        <Container>
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Verify Your Cosmetics.
              <br />
              Buy Only the True Originals.
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/90">
              Our mission is to empower you to shop with confidence, ensuring every beauty product you purchase is 100% authentic. Avoid counterfeits, protect your skin, and get the quality you deserve.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="#verification">
                  Check Product Authenticity
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#free-guide">
                  Get Free Guide
                  <Gift />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
