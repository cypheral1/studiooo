import Link from 'next/link';
import { ShieldCheck, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/container';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="#home" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline text-secondary-foreground">
                TrueOriginalShop
              </span>
            </Link>
            <p className="mt-4 text-secondary-foreground/80">
              Verify your cosmetics and shop with confidence. Your trusted partner in beauty authenticity.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-secondary-foreground/60 hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-secondary-foreground/60 hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-secondary-foreground/60 hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-headline font-semibold text-secondary-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#home" className="text-secondary-foreground/80 hover:text-primary">Home</Link></li>
              <li><Link href="#where-to-buy" className="text-secondary-foreground/80 hover:text-primary">Where to Buy</Link></li>
              <li><Link href="#faq" className="text-secondary-foreground/80 hover:text-primary">FAQ</Link></li>
              <li><Link href="#verification" className="text-secondary-foreground/80 hover:text-primary">Verify</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-headline font-semibold text-secondary-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-secondary-foreground/80 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-secondary-foreground/80 hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-secondary-foreground/80 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-headline font-semibold text-secondary-foreground">Stay Updated</h3>
            <p className="mt-4 text-secondary-foreground/80">
              Get our free guide and updates on authentic products.
            </p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} TrueOriginalShop. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
