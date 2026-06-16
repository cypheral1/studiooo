import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { VapiAssistant } from '@/components/vapi-assistant';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ShippingMarquee } from '@/components/cinematic/shipping-marquee';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TrueOriginal — Cosmetic Quality Assurance',
  description: 'Verify cosmetic authenticity in seconds. Protect consumers from counterfeit beauty products with AI-powered detection technology.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
      </head>
      <body className={inter.className}>
        <Script
          id="google-translate-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,fa,ar',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        {/* Fixed marquee sits at the very top of every page */}
        <ShippingMarquee />
        {children}
        <VapiAssistant />
        <Toaster />
      </body>
    </html>
  );
}
