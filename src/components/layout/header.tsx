'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ShieldCheck, Scale, Store, Search,
  GitCompareArrows, Wrench, ChevronDown, Home, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const categoryItems = [
  {
    name: 'Fake vs Original',
    href: '/fake-vs-original',
    icon: Scale,
    description: 'Learn to spot the differences between fake and authentic products',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    name: 'Where to Buy',
    href: '/where-to-buy-original',
    icon: Store,
    description: 'Find trusted retailers and verified sellers',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    name: 'Detection Guide',
    href: '/detection-guide',
    icon: Search,
    description: 'Step-by-step guide to detecting counterfeit products',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    name: 'Comparisons',
    href: '/product-comparisons',
    icon: GitCompareArrows,
    description: 'Side-by-side comparisons of popular products',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    name: 'Verification Tools',
    href: '/verification-tools',
    icon: Wrench,
    description: 'AI-powered tools to verify product authenticity',
    color: 'from-violet-500/20 to-indigo-500/20',
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 shadow-md backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">
              TrueOriginalShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 lg:flex">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            {/* Categories Mega Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  categoryItems.some(item => pathname === item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                )}
              >
                <Sparkles className="h-4 w-4" />
                Categories
                <ChevronDown className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  dropdownOpen && 'rotate-180'
                )} />
              </button>

              {/* Dropdown Panel */}
              <div
                className={cn(
                  'absolute right-0 top-full mt-2 w-[540px] origin-top-right transition-all duration-200',
                  dropdownOpen
                    ? 'pointer-events-auto scale-100 opacity-100'
                    : 'pointer-events-none scale-95 opacity-0'
                )}
              >
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl">
                  <div className="p-2">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'group flex items-start gap-4 rounded-xl p-3 transition-all duration-200',
                            isActive
                              ? 'bg-primary/10'
                              : 'hover:bg-muted/60'
                          )}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-200 group-hover:scale-110',
                            item.color
                          )}>
                            <Icon className={cn(
                              'h-5 w-5',
                              isActive ? 'text-primary' : 'text-foreground/70'
                            )} />
                          </div>
                          <div>
                            <p className={cn(
                              'text-sm font-semibold',
                              isActive ? 'text-primary' : 'text-foreground'
                            )}>
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-border/50 bg-muted/30 px-4 py-3">
                    <p className="text-xs text-muted-foreground text-center">
                      🛡️ Empowering you to shop with confidence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background overflow-y-auto">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
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
                  <nav className="mt-6 flex flex-col space-y-1">
                    <Link
                      href="/"
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                        pathname === '/'
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/70 hover:bg-muted'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>

                    <div className="px-4 pt-4 pb-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Categories
                      </p>
                    </div>

                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/70 hover:bg-muted'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br',
                            item.color
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {item.name}
                        </Link>
                      );
                    })}
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
