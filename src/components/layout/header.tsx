'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ShieldCheck, Search, ChevronDown,
  Scale, Store, BookOpen, GitCompareArrows, Wrench, Sparkles, Newspaper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const categoryItems = [
  { 
    name: 'Fake vs Original', 
    href: '/fake-vs-original', 
    icon: Scale, 
    color: 'text-rose-500 bg-rose-50',
    subcategories: [
      { name: 'Skincare', href: '/fake-vs-original/skincare' },
      { name: 'Sunscream', href: '/fake-vs-original/sunscream' },
      { name: 'Serum', href: '/fake-vs-original/serum' },
      { name: 'Makeup', href: '/fake-vs-original/makeup' },
    ]
  },
  { name: 'Where to Buy', href: '/where-to-buy-original', icon: Store, color: 'text-emerald-500 bg-emerald-50' },
  { name: 'Detection Guide', href: '/detection-guide', icon: BookOpen, color: 'text-blue-500 bg-blue-50' },
  { name: 'Comparisons', href: '/product-comparisons', icon: GitCompareArrows, color: 'text-purple-500 bg-purple-50' },
  { name: 'Verification Tools', href: '/verification-tools', icon: Wrench, color: 'text-amber-500 bg-amber-50' },
  { name: 'Blog', href: '/blog', icon: Newspaper, color: 'text-indigo-500 bg-indigo-50' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      {/* Promo Strip */}
      <div className="bg-black border-b border-primary/20 text-primary overflow-hidden">
        <div className="flex items-center h-8">
          <div className="promo-ticker">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                <span className="text-xs font-semibold whitespace-nowrap uppercase tracking-widest">🛡️ Elite Product Verification</span>
                <span className="text-xs whitespace-nowrap">•</span>
                <span className="text-xs font-semibold whitespace-nowrap uppercase tracking-widest">✨ Luxury Authenticity Check</span>
                <span className="text-xs whitespace-nowrap">•</span>
                <span className="text-xs font-semibold whitespace-nowrap uppercase tracking-widest">📱 Premium Brands Supported</span>
                <span className="text-xs whitespace-nowrap">•</span>
                <span className="text-xs font-semibold whitespace-nowrap uppercase tracking-widest">⚡ Instant Results</span>
                <span className="text-xs whitespace-nowrap">•</span>
                <span className="text-xs font-semibold whitespace-nowrap uppercase tracking-widest">💄 Insider Beauty Guide</span>
                <span className="text-xs whitespace-nowrap">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-md shadow-primary/5 border-b border-primary/20' : 'bg-black/40 backdrop-blur-sm border-b border-white/10'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary/80 to-primary">
                <ShieldCheck className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold text-white hidden sm:block uppercase tracking-wide">
                TrueOriginal<span className="text-primary font-light">Shop</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/' ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                )}
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    categoryItems.some(item => pathname === item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  )}
                >
                  Categories
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform text-white/50', dropdownOpen && 'rotate-180')} />
                </button>

                <div
                  className={cn(
                    'absolute left-0 top-full mt-1 w-[320px] transition-all duration-200',
                    dropdownOpen
                      ? 'pointer-events-auto opacity-100 translate-y-0'
                      : 'pointer-events-none opacity-0 -translate-y-1'
                  )}
                >
                  <div className="rounded-2xl border border-primary/20 bg-black/95 backdrop-blur-xl shadow-2xl shadow-black overflow-hidden p-2">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-xl transition-colors',
                              isActive ? 'bg-primary/10' : 'hover:bg-white/5'
                            )}
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-black/50 border border-primary/20 text-primary')}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className={cn('text-sm font-medium', isActive ? 'text-primary' : 'text-white/90')}>
                              {item.name}
                            </span>
                          </Link>
                          {item.subcategories && (
                            <div className="pl-14 pr-3 pb-2 flex flex-col gap-1">
                              {item.subcategories.map(sub => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className={cn(
                                    'text-sm px-3 py-1.5 rounded-lg transition-colors',
                                    pathname === sub.href ? 'text-primary bg-primary/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                                  )}
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Link
                href="/#verification"
                className="px-3 py-2 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                Verify Product
              </Link>
            </nav>

            {/* Right: CTA */}
            <div className="flex items-center gap-3">
              <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-black shadow-lg shadow-primary/20 font-bold tracking-wide uppercase px-6">
                <Link href="/#verification">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Verify Now
                </Link>
              </Button>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-sm bg-white overflow-y-auto">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 pb-6 border-b">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                          <ShieldCheck className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">
                          TrueOriginal<span className="text-primary">Shop</span>
                        </span>
                      </div>

                      <nav className="mt-6 flex flex-col gap-1">
                        <Link
                          href="/"
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                            pathname === '/' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Home
                        </Link>

                        <p className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Categories
                        </p>

                        {categoryItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <div key={item.name} className="flex flex-col">
                              <Link
                                href={item.href}
                                className={cn(
                                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                  isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', item.color)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                {item.name}
                              </Link>
                              {item.subcategories && (
                                <div className="pl-14 pr-4 flex flex-col gap-1 pb-2">
                                  {item.subcategories.map(sub => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className={cn(
                                        'text-sm px-4 py-2 rounded-lg transition-colors',
                                        pathname === sub.href ? 'text-primary bg-primary/5' : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                                      )}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </nav>

                      <div className="mt-auto pt-6 border-t">
                        <Button asChild className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold">
                          <Link href="/#verification" onClick={() => setMobileMenuOpen(false)}>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Verify Product Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
