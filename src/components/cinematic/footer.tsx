'use client';

export function CinematicFooter() {
  const footerLinks = {
    product: [
      { label: 'Free Guide', href: '#free-guide' },
      { label: 'Case Studies', href: '#case-studies' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer
      className="relative overflow-hidden"
      id="contact"
      style={{ background: 'var(--cinematic-bg)' }}
    >
      {/* Massive CTA Section */}
      <div
        className="py-32 px-6 text-center"
        style={{ borderTop: '1px solid var(--cinematic-border)' }}
      >
        <span
          className="text-label text-xs block mb-6"
          style={{ color: 'var(--cinematic-cyan)' }}
        >
          READY TO PROTECT YOUR CONSUMERS?
        </span>
        <h2
          className="text-hero mb-8 mx-auto"
          style={{ maxWidth: '90rem' }}
        >
          LET&apos;S
          <br />
          <span
            style={{
              background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TALK.
          </span>
        </h2>
        <a
          href="https://wa.me/971583093948?text=Hi,%20I%20would%20like%20to%20verify%20my%20product%20authenticity"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient inline-block text-sm py-4 px-12"
          id="footer-cta"
          style={{ borderRadius: '0' }}
        >
          START VERIFICATION
        </a>
      </div>

      {/* Footer Grid */}
      <div
        className="px-6 py-16"
        style={{ borderTop: '1px solid var(--cinematic-border)' }}
      >
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="nav-dot-live" />
              <span className="text-label text-sm">TRUEORIGINAL</span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
            >
              The gold standard in cosmetic authenticity verification.
              Protecting consumers and brands worldwide.
            </p>
          </div>

          {/* Product */}
          <div>
            <span className="text-label text-xs block mb-6" style={{ color: 'var(--cinematic-text-secondary)' }}>
              PRODUCT
            </span>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:opacity-100 transition-colors duration-200"
                    style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <span className="text-label text-xs block mb-6" style={{ color: 'var(--cinematic-text-secondary)' }}>
              COMPANY
            </span>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:opacity-100 transition-colors duration-200"
                    style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span className="text-label text-xs block mb-6" style={{ color: 'var(--cinematic-text-secondary)' }}>
              LEGAL
            </span>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:opacity-100 transition-colors duration-200"
                    style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="px-6 py-6"
        style={{ borderTop: '1px solid var(--cinematic-border)' }}
      >
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
            © {new Date().getFullYear()} TrueOriginal. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs hover:opacity-100 transition-colors duration-200"
                style={{ color: 'var(--cinematic-text-secondary)' }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Massive background text */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="block text-center font-black uppercase"
          style={{
            fontSize: '18vw',
            lineHeight: '0.8',
            color: 'rgba(255, 255, 255, 0.02)',
            transform: 'translateY(30%)',
          }}
        >
          AUTHENTIC
        </span>
      </div>
    </footer>
  );
}
