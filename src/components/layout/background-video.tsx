"use client";

import { useEffect, useState } from "react";

interface BackgroundVideoProps {
  videoId: string;
}

export function BackgroundVideo({ videoId }: BackgroundVideoProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-black">
      {/* Gradient overlay to ensure text is readable at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-20 pointer-events-none" />
      
      <iframe
        className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-50 scale-[1.5] md:scale-[2]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&playsinline=1`}
        title="Background Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
