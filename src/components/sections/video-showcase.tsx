"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Play, ExternalLink } from "lucide-react";

interface VideoCardProps {
  videoId: string;
  title: string;
  channelUrl: string;
}

function VideoCard({ videoId, title, channelUrl }: VideoCardProps) {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[340px]">
      {/* Video Card */}
      <div
        className="group relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black"
        style={{ aspectRatio: "9/16", maxHeight: "580px" }}
      >
        {/* Thumbnail / Play Button Overlay */}
        {!isStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            {/* Thumbnail from YouTube */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Title */}
            <div className="relative z-10 text-center px-4 mb-6">
              <h3 className="text-white font-headline text-xl md:text-2xl font-bold drop-shadow-lg">
                {title}
              </h3>
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsStarted(true)}
              id={`play-btn-${videoId}`}
              className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-full
                bg-gradient-to-r from-purple-600 to-blue-600
                text-white font-bold text-lg
                shadow-[0_0_30px_rgba(139,92,246,0.5)]
                hover:shadow-[0_0_50px_rgba(139,92,246,0.7)]
                hover:scale-105
                active:scale-95
                transition-all duration-300 ease-out
                backdrop-blur-sm border border-white/20"
            >
              <Play className="w-6 h-6 fill-current" />
              Play Video
            </button>
          </div>
        )}

        {/* YouTube Embed iframe — only rendered after clicking Play */}
        {isStarted && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            style={{ zIndex: 10 }}
          />
        )}

        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl -z-10 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-500" />
      </div>

      {/* View on YouTube Button */}
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`view-yt-${videoId}`}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
          bg-gradient-to-r from-red-600 to-red-500
          text-white font-semibold text-sm
          shadow-lg shadow-red-600/20
          hover:shadow-red-600/40
          hover:scale-105
          active:scale-95
          transition-all duration-300 ease-out
          border border-red-400/30"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        View on YouTube
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <section id="videos" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            ✨ Featured Videos
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            Watch Our Videos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See why thousands trust TrueOriginalShop for authentic beauty products.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 justify-items-center">
          <VideoCard
            videoId="WQtkgwN3IZU"
            title="Authentic Beauty Tips"
            channelUrl="https://youtube.com/shorts/WQtkgwN3IZU"
          />
          <VideoCard
            videoId="MvULpi_qcgo"
            title="Product Verification Guide"
            channelUrl="https://youtube.com/shorts/MvULpi_qcgo"
          />
          <VideoCard
            videoId="FWp6Cmc5agk"
            title="Beauty Essentials"
            channelUrl="https://youtube.com/shorts/FWp6Cmc5agk"
          />
          <VideoCard
            videoId="IG7S_nYzc_k"
            title="Top Picks Revealed"
            channelUrl="https://youtube.com/shorts/IG7S_nYzc_k"
          />
        </div>
      </Container>
    </section>
  );
}
