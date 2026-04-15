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
      <div
        className="group relative w-full overflow-hidden rounded-2xl shadow-lg bg-muted"
        style={{ aspectRatio: "9/16", maxHeight: "580px" }}
      >
        {!isStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 text-center px-4 mb-4">
              <h3 className="text-white font-bold text-lg drop-shadow-lg">
                {title}
              </h3>
            </div>

            <button
              onClick={() => setIsStarted(true)}
              id={`play-btn-${videoId}`}
              className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-full
                bg-primary hover:bg-primary/90 text-black font-bold text-sm
                shadow-[0_0_15px_rgba(212,175,55,0.3)]
                hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]
                hover:scale-105
                active:scale-95 uppercase tracking-widest
                transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              Play Video
            </button>
          </div>
        )}

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
      </div>

      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`view-yt-${videoId}`}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full
          bg-primary/10 text-primary font-semibold text-xs
          hover:bg-primary/20 transition-colors border border-primary/30 uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.05)]"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        Watch on YouTube
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <section id="videos" className="py-16 md:py-24 bg-black/60 backdrop-blur-sm relative border-t border-primary/20">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/30 uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            🎬 Featured Videos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
            Watch Our <span className="text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Masterclasses</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto tracking-wide">
            See why high-net-worth clients trust TrueOriginalShop for authentic beauty products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
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
