import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
