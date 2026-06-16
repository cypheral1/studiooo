'use client';

const ITEMS = [
  { icon: '🚚', text: 'FREE SHIPPING ON ALL ORDERS' },
  { icon: '✅', text: 'VERIFIED AUTHENTIC PRODUCTS' },
  { icon: '🛡️', text: '100% GENUINE GUARANTEE' },
  { icon: '📦', text: 'SECURE & FAST DELIVERY' },
];

// Duplicate so we get exactly 2 copies for the seamless -50% loop
const TRACK = [...ITEMS, ...ITEMS];

export function ShippingMarquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(90deg, #0ea5e9 0%, #6366f1 45%, #ec4899 75%, #0ea5e9 100%);
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          display: flex;
          align-items: center;
          height: 38px;
          min-width: 0;
          z-index: 200;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          width: max-content;
          animation: marquee-loop 30s linear infinite;
          will-change: transform;
          /* no vertical padding here — the wrapper's height + align-items centers it */
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }
        .marquee-icon {
          animation: icon-bounce 1.4s ease-in-out infinite;
          line-height: 1;
          display: inline-flex;
          align-items: center;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 36px;
          color: #fff;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow: 0 1px 6px rgba(0,0,0,0.2);
          line-height: 1;
        }
        .marquee-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          flex-shrink: 0;
          margin-left: 36px;
        }
      `}</style>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {TRACK.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-icon" style={{ fontSize: 15 }}>{item.icon}</span>
              {item.text}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
