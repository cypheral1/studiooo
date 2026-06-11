import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { VapiAssistant } from '@/components/vapi-assistant';
import { Toaster } from '@/components/ui/toaster';

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
      <body className={inter.className}>
        {children}
        <VapiAssistant />
        <Toaster />
      </body>
    </html>
  );
}
