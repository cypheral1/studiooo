'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function CinematicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [langExpanded, setLangExpanded] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FA', name: 'Persian' },
    { code: 'AR', name: 'Arabic' }
  ];

  useEffect(() => {
    // Read Google Translate cookie on mount
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const code = match[1].toUpperCase();
      // Verify it's one of our supported languages
      if (['EN', 'FA', 'AR'].includes(code)) {
        setActiveLang(code);
        if (code === 'AR' || code === 'FA') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      }
    }
  }, []);

  const handleLangChange = (code: string) => {
    const lowerCode = code.toLowerCase();
    // Set the cookie for both paths and domains just to be sure
    document.cookie = `googtrans=/en/${lowerCode}; path=/`;
    document.cookie = `googtrans=/en/${lowerCode}; domain=${window.location.hostname}; path=/`;
    
    if (lowerCode === 'ar' || lowerCode === 'fa') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    
    window.location.reload();
  };

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
    { label: 'SKIN FINDER', href: '/skin-finder' },
    { label: 'WHERE TO BUY', href: '/where-to-buy-original' },
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

        {/* Right Section: Language + CTA */}
        <div className="flex items-center gap-4">
          
          {/* Dynamic Island Language Selector */}
          <div 
            translate="no"
            className="relative flex items-center justify-center bg-black text-white rounded-[24px] transition-all duration-500 ease-out cursor-pointer overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.15)] z-50"
            style={{
              height: '36px',
              width: langExpanded ? '140px' : '56px',
            }}
            onMouseEnter={() => setLangExpanded(true)}
            onMouseLeave={() => setLangExpanded(false)}
            onClick={() => setLangExpanded(!langExpanded)}
          >
            {/* Collapsed State */}
            <div className={`absolute flex items-center justify-center w-full h-full transition-all duration-300 ${langExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <span className="text-[11px] font-bold tracking-widest">{activeLang}</span>
            </div>
            
            {/* Expanded State */}
            <div className={`absolute flex items-center justify-between w-full h-full px-4 transition-all duration-400 delay-75 ${langExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setLangExpanded(false);
                    handleLangChange(lang.code);
                  }}
                  title={lang.name}
                  className={`text-[10px] font-bold tracking-widest transition-all duration-200 hover:scale-110 ${activeLang === lang.code ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'text-white/40 hover:text-white/90'}`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>

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
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
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
        <div className="md:hidden mt-6 pb-6 border-t border-black/10 pt-6 animate-fade-in relative z-40">
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
