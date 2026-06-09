'use client';

import Link from 'next/link';
import { useState } from 'react';

export function CinematicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'HOW IT WORKS', href: '/#how-it-works' },
    { 
      label: 'FAKE VS ORIGINAL', 
      href: '/fake-vs-original',
      subLinks: [
        { label: 'SKINCARE', href: '/fake-vs-original/skincare' },
        { label: 'SUNSCREAM', href: '/fake-vs-original/sunscream' },
        { label: 'SERUM', href: '/fake-vs-original/serum' },
        { label: 'MAKEUP', href: '/fake-vs-original/makeup' },
      ]
    },
    { label: 'BLOG', href: '/blog' },
    { label: 'CONTACT', href: '/#contact' },
  ];

  return (
    <nav className="nav-cinematic" id="main-nav">
      <div className="flex items-center justify-between max-w-[90rem] mx-auto">
        {/* Logo + Live Dot */}
        <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
          <div className="nav-dot-live" />
          <span className="text-label text-lg tracking-[0.2em]" style={{ fontSize: '1.125rem' }}>
            TRUEORIGINAL
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 relative z-50">
          {navLinks.map((link) => (
            link.subLinks ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="text-label text-xs opacity-70 hover:opacity-100 transition-opacity duration-200 flex items-center gap-1"
                >
                  {link.label}
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <div className="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white/90 backdrop-blur-md border border-black/5 shadow-xl py-2 flex flex-col">
                    {link.subLinks.map(sub => (
                      <Link key={sub.label} href={sub.href} className="px-4 py-2.5 text-xs tracking-wider text-black opacity-70 hover:opacity-100 hover:bg-black/5 transition-colors">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-label text-xs opacity-70 hover:opacity-100 transition-opacity duration-200"
                id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="/#free-guide"
            className="hidden sm:inline-block btn-gradient text-xs py-3 px-6"
            id="nav-cta"
            style={{ borderRadius: '0' }}
          >
            FREE GUIDE
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-6 pb-6 border-t border-black/10 pt-6 animate-fade-in relative z-50">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.label} className="flex flex-col gap-3">
                <Link
                  href={link.href}
                  className="text-label text-sm opacity-70 hover:opacity-100 transition-opacity"
                  onClick={() => {
                    if (!link.subLinks) setMobileOpen(false);
                  }}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <div className="pl-4 flex flex-col gap-4 border-l border-black/10 ml-1 mt-1">
                    {link.subLinks.map(sub => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="text-label text-xs opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/#free-guide"
              className="btn-gradient text-xs py-3 px-6 text-center mt-4"
              onClick={() => setMobileOpen(false)}
              style={{ borderRadius: '0' }}
            >
              FREE GUIDE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
