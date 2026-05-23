'use client';

import Link from 'next/link';
import { useState } from 'react';

export function CinematicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'CASE STUDIES', href: '#case-studies' },
    { label: 'FREE GUIDE', href: '#free-guide' },
    { label: 'CONTACT', href: '#contact' },
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
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label text-xs opacity-70 hover:opacity-100 transition-opacity duration-200"
              id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#free-guide"
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
        <div className="md:hidden mt-6 pb-6 border-t border-black/10 pt-6 animate-fade-in">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-label text-sm opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#free-guide"
              className="btn-gradient text-xs py-3 px-6 text-center"
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
