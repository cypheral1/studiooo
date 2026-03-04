'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gift, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Where to Buy', href: '#where-to-buy' },
  { name: 'Free Guide', href: '#free-guide' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Upload & Check', href: '#verification' },
  { name: 'Proof', href: '#verification' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="font-medium text-foreground/80 transition-colors hover:text-foreground"
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 shadow-md backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="#home" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">
              TrueOriginalShop
            </span>
          </Link>
          <nav className="hidden items-center space-x-8 md:flex">
            <NavLinks />
          </nav>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                     <Link href="#home" className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold font-headline text-foreground">
                        TrueOriginalShop
                        </span>
                    </Link>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="mt-8 flex flex-col space-y-6">
                    <NavLinks />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
