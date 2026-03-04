import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

const trustedSellers = [
  { name: 'Amazon', logoId: 'amazon-logo', link: '#' },
  { name: 'Nykaa', logoId: 'nykaa-logo', link: '#' },
  { name: 'Sephora', logoId: 'sephora-logo', link: '#' },
  { name: 'Official Brand Stores', logoId: 'brand-store-logo', link: '#' },
];

export function WhereToBuy() {
  return (
    <section id="where-to-buy" className="py-24 sm:py-32 bg-secondary">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
            Shop Authentic, Always
          </h2>
          <p className="mt-6 text-lg leading-8 text-secondary-foreground/80">
            Purchase from our list of trusted and verified sellers to guarantee you're getting the genuine product.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {trustedSellers.map((seller) => {
            const logo = PlaceHolderImages.find(p => p.id === seller.logoId);
            return (
              <Link href={seller.link} key={seller.name}>
                <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {seller.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {logo && (
                      <Image
                        src={logo.imageUrl}
                        alt={`${seller.name} logo`}
                        width={150}
                        height={75}
                        className="object-contain"
                        data-ai-hint={logo.imageHint}
                      />
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
