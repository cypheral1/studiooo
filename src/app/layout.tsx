import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';
import { VapiAssistant } from "@/components/vapi-assistant";
import { BackgroundVideo } from "@/components/layout/background-video";

export const metadata: Metadata = {
  title: 'TrueOriginalShop',
  description: 'Verify Your Cosmetics. Buy Only the True Originals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased text-foreground bg-transparent min-h-screen")}>
        <BackgroundVideo videoId="WQtkgwN3IZU" />
        <div className="relative z-10">
          {children}
        </div>
        <VapiAssistant />
        <Toaster />
      </body>
    </html>
  );
}
