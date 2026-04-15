'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Instagram, Facebook, Twitter, Loader2, Heart, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/container';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Footer Newsletter' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: 'Subscribed! 🎉', description: 'Thanks for joining our newsletter.' });
        setEmail('');
      } else {
        toast({ variant: 'destructive', title: 'Error', description: data.error || data.message || 'Failed to subscribe.' });
      }
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-primary/20 text-white">
      {/* Newsletter Strip */}
      <div className="bg-black border-y border-primary/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
        <Container className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-primary tracking-wider uppercase">Stay in the Elite circle 💌</h3>
              <p className="text-white/70 text-sm mt-1">Get exclusive authenticity tips, luxury beauty alerts & VIP guides.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-white/15 border-white/20 text-white placeholder:text-white/50 rounded-full h-11 w-full md:w-64"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-black rounded-full px-6 h-11 font-bold text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg shadow-primary/20"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary/80 to-primary">
                <ShieldCheck className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold uppercase tracking-wide">
                TrueOriginal<span className="text-primary font-light">Shop</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Your trusted partner in luxury beauty authenticity. Verify cosmetics, shop exclusive collections with absolute confidence.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Instagram, Facebook].map((Icon, i) => (
                <Link key={i} href="#" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Icon className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-primary mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'Fake vs Original', href: '/fake-vs-original' },
                { name: 'Where to Buy', href: '/where-to-buy-original' },
                { name: 'Detection Guide', href: '/detection-guide' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-primary mb-4">Tools</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Verify Product', href: '/#verification' },
                { name: 'Comparisons', href: '/product-comparisons' },
                { name: 'Verification Tools', href: '/verification-tools' },
                { name: 'Free Guide', href: '/#free-guide' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-primary mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Contact Us', href: '#' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} TrueOriginalShop. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1 uppercase tracking-widest text-[10px]">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for luxury authenticity
          </p>
        </div>
      </Container>
    </footer>
  );
}
