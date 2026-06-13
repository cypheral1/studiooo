'use client';

export function ShippingMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-[var(--cinematic-cyan)]/20 via-[var(--cinematic-pink)]/20 to-[var(--cinematic-cyan)]/20 border-b border-white/10 overflow-hidden flex items-center py-2 relative z-20 backdrop-blur-md">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-flex;
          white-space: nowrap;
        }
      `}} />
      <div className="animate-marquee items-center">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="text-white font-black uppercase tracking-widest text-[10px] mx-8 flex items-center gap-2">
            FREE SHIPPING FOR YOU <span className="text-sm">🚚</span>
          </span>
        ))}
      </div>
    </div>
  );
}
