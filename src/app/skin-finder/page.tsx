'use client';

import { useState } from 'react';
import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import Image from 'next/image';

// ── Types ──────────────────────────────────────────────────────────────────

type Area = 'face' | 'body' | 'lips' | 'eyes' | 'other';

interface NavItem {
  id: string;
  label: string;
  emoji: string;
  image: string;
}

interface SkinTypeItem {
  id: string;
  label: string;
  desc: string;
}

interface Product {
  type: string;
  name: string;
  keyIngredients: string[];
  tip: string;
}

interface ResultData {
  summary: string;
  routine: string[];
  products: Product[];
}

// ── Data ───────────────────────────────────────────────────────────────────

const AREAS: NavItem[] = [
  { id: 'face', label: 'Face', emoji: '🧖', image: '/images/skinfinder/face.png' },
  { id: 'body', label: 'Body', emoji: '🫶', image: '/images/skinfinder/body.png' },
  { id: 'lips', label: 'Lips', emoji: '💋', image: '/images/skinfinder/lips.png' },
  { id: 'eyes', label: 'Eyes', emoji: '👁️', image: '/images/skinfinder/eyes.png' },
  { id: 'other', label: 'Other', emoji: '✨', image: '/images/skinfinder/face.png' },
];

const CONCERNS: Record<string, NavItem[]> = {
  face: [
    { id: 'acne', label: 'Acne', emoji: '🔴', image: '/images/skinfinder/acne.png' },
    { id: 'darkspot', label: 'Dark Spots', emoji: '🌑', image: '/images/skinfinder/darkspot.png' },
    { id: 'redness', label: 'Redness', emoji: '🌸', image: '/images/skinfinder/acne.png' },
    { id: 'wrinkles', label: 'Wrinkles', emoji: '〰️', image: '/images/skinfinder/eyes.png' },
    { id: 'dullness', label: 'Dullness', emoji: '☁️', image: '/images/skinfinder/face.png' },
  ],
  body: [
    { id: 'acne', label: 'Body Acne', emoji: '🔴', image: '/images/skinfinder/acne.png' },
    { id: 'darkspot', label: 'Dark Spots', emoji: '🌑', image: '/images/skinfinder/darkspot.png' },
    { id: 'dryness', label: 'Dryness', emoji: '🏜️', image: '/images/skinfinder/body.png' },
    { id: 'stretch', label: 'Stretch Marks', emoji: '〰️', image: '/images/skinfinder/body.png' },
  ],
  lips: [
    { id: 'dryness', label: 'Chapping', emoji: '🏜️', image: '/images/skinfinder/lips.png' },
    { id: 'darkspot', label: 'Dark Lips', emoji: '🌑', image: '/images/skinfinder/lips.png' },
    { id: 'lines', label: 'Fine Lines', emoji: '〰️', image: '/images/skinfinder/lips.png' },
  ],
  eyes: [
    { id: 'darkcircle', label: 'Dark Circles', emoji: '🐼', image: '/images/skinfinder/eyes.png' },
    { id: 'puffiness', label: 'Puffiness', emoji: '🎈', image: '/images/skinfinder/eyes.png' },
    { id: 'finelines', label: 'Crow\'s Feet', emoji: '〰️', image: '/images/skinfinder/eyes.png' },
  ],
  other: [
    { id: 'texture', label: 'Uneven Texture', emoji: '🌒', image: '/images/skinfinder/face.png' },
    { id: 'pores', label: 'Large Pores', emoji: '🕳️', image: '/images/skinfinder/acne.png' },
    { id: 'sensitivity', label: 'Sensitivity', emoji: '🥺', image: '/images/skinfinder/darkspot.png' },
  ]
};

const SKIN_TYPES: SkinTypeItem[] = [
  { id: 'normal', label: 'Normal', desc: 'Balanced, not too oily or dry' },
  { id: 'oily', label: 'Oily', desc: 'Shiny, enlarged pores' },
  { id: 'dry', label: 'Dry', desc: 'Tight, flaky, rough patches' },
  { id: 'sensitive', label: 'Sensitive', desc: 'Reacts easily, prone to irritation' },
  { id: 'combination', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[3px] rounded-full transition-all duration-500"
          style={{
            flex: i === current ? 2 : 1,
            background:
              i < current
                ? 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))'
                : i === current
                ? 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-purple))'
                : 'rgba(0,0,0,0.1)',
          }}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  emoji,
  image,
  selected,
  onClick,
}: {
  label: string;
  emoji: string;
  image?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300"
      style={{
        width: '130px',
        height: '130px',
        border: selected
          ? '2px solid var(--cinematic-cyan)'
          : '2px solid rgba(255,255,255,0.1)',
        background: selected
          ? 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(236,72,153,0.08))'
          : 'var(--cinematic-card)',
        backdropFilter: 'blur(8px)',
        color: selected ? 'var(--cinematic-cyan)' : 'var(--cinematic-text)',
        boxShadow: selected ? '0 0 20px rgba(6,182,212,0.2)' : '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '16px',
      }}
    >
      {image && (
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          <img src={image} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center">
        <span className="text-3xl mb-2 drop-shadow-md">{emoji}</span>
        <span className="text-[10px] font-black tracking-wider uppercase drop-shadow-md bg-black/40 text-white px-2 py-1 rounded-sm">{label}</span>
      </div>
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function SkinFinderPage() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState<Area | null>(null);
  const [concern, setConcern] = useState<string | null>(null);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [customConcern, setCustomConcern] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setArea(null);
    setConcern(null);
    setCustomConcern('');
    setSkinType(null);
    setResult(null);
    setError(null);
  };

  const canProceed =
    (step === 0 && area) ||
    (step === 1 && concern) ||
    (step === 2 && skinType);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/skin-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, concern: concern === 'custom' ? customConcern : concern, skinType }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'API error');
      }

      setResult(data.data as ResultData);
      setStep(3);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = [
    'WHERE IS YOUR SKIN CONCERN?',
    'WHAT IS YOUR MAIN CONCERN?',
    'WHAT IS YOUR SKIN TYPE?',
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--cinematic-bg)' }}
    >
      <CinematicNav />

      <main
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{ paddingTop: '120px' }}
      >
        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <span
            className="text-hero opacity-[0.04]"
            style={{ fontSize: '12vw', whiteSpace: 'nowrap' }}
          >
            SKIN FINDER
          </span>
        </div>

        <div className="px-6 md:px-12 py-16 md:py-24 max-w-[90rem] mx-auto w-full relative z-10">
          {/* Page Header */}
          <div className="mb-12 md:mb-16">
            <span
              className="text-label text-xs block mb-4"
              style={{ color: 'var(--cinematic-cyan)' }}
            >
              AI-POWERED
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-6">
              SKIN SOLUTION
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FINDER.
              </span>
            </h1>
            <p
              className="text-base md:text-lg max-w-xl"
              style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
            >
              Answer 3 quick questions and get AI-curated product recommendations
              tailored to your exact skin profile.
            </p>
          </div>

          {/* Card */}
          <div
            className="glass-card max-w-2xl"
            style={{ padding: '40px', borderRadius: '0' }}
          >
            {/* Steps */}
            {step < 3 && !loading && (
              <>
                <ProgressBar current={step} total={3} />

                <p
                  className="text-label text-xs mb-2"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  STEP {step + 1} OF 3
                </p>
                <h2
                  className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8"
                  style={{ color: 'var(--cinematic-text)' }}
                >
                  {stepLabels[step]}
                </h2>

                {/* Step 0 — Area */}
                {step === 0 && (
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {AREAS.map((a) => (
                      <Chip
                        key={a.id}
                        label={a.label}
                        emoji={a.emoji}
                        image={a.image}
                        selected={area === a.id}
                        onClick={() => {
                          setArea(a.id as Area);
                          setConcern(null);
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Step 1 — Concern */}
                {step === 1 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      {(CONCERNS[area!] || []).map((c) => (
                        <Chip
                          key={c.id}
                          label={c.label}
                          emoji={c.emoji}
                          image={c.image}
                          selected={concern === c.id}
                          onClick={() => {
                            setConcern(c.id);
                            setCustomConcern('');
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[rgba(0,0,0,0.1)]"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white/40 backdrop-blur-md px-3 text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] rounded-full">
                          OR
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col w-full">
                      <label className="text-xs font-bold tracking-widest uppercase mb-3 text-[var(--cinematic-text-secondary)]">
                        TYPE YOUR PROBLEM
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g., Hormonal breakouts around the jawline..."
                        value={customConcern}
                        onChange={(e) => {
                          setCustomConcern(e.target.value);
                          setConcern(e.target.value.trim() !== '' ? 'custom' : null);
                        }}
                        className="px-5 py-4 w-full bg-[rgba(255,255,255,0.4)] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)] transition-all duration-300 rounded-xl backdrop-blur-sm"
                        style={{ color: 'var(--cinematic-text)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 — Skin Type */}
                {step === 2 && (
                  <div className="flex flex-col gap-3">
                    {SKIN_TYPES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSkinType(s.id)}
                        className="text-left px-5 py-4 transition-all duration-200"
                        style={{
                          border:
                            skinType === s.id
                              ? '2px solid var(--cinematic-cyan)'
                              : '2px solid rgba(0,0,0,0.08)',
                          background:
                            skinType === s.id
                              ? 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(124,58,237,0.06))'
                              : 'rgba(255,255,255,0.3)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '16px',
                          boxShadow: skinType === s.id ? '0 0 20px rgba(6,182,212,0.15)' : '0 4px 20px rgba(0,0,0,0.05)',
                        }}
                      >
                        <div
                          className="text-sm font-black uppercase tracking-wider"
                          style={{
                            color:
                              skinType === s.id
                                ? 'var(--cinematic-cyan)'
                                : 'var(--cinematic-text)',
                          }}
                        >
                          {s.label}
                        </div>
                        <div
                          className="text-xs mt-1"
                          style={{
                            color: 'var(--cinematic-text-secondary)',
                            fontWeight: 300,
                          }}
                        >
                          {s.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-10">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded-full"
                      style={{
                        border: '2px solid rgba(0,0,0,0.1)',
                        background: 'transparent',
                        color: 'var(--cinematic-text-secondary)',
                      }}
                    >
                      ← BACK
                    </button>
                  )}
                  <button
                    disabled={!canProceed}
                    onClick={() =>
                      step === 2
                        ? handleGetRecommendations()
                        : setStep(step + 1)
                    }
                    className="btn-gradient flex-1 py-4 text-xs tracking-widest rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {step === 2 ? '✨ FIND MY PRODUCTS' : 'CONTINUE →'}
                  </button>
                </div>
              </>
            )}

            {/* Loading */}
            {loading && (
              <div className="py-16 text-center">
                <div className="text-4xl mb-6">🧴</div>
                <p
                  className="text-label text-sm mb-2"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  ANALYZING YOUR SKIN PROFILE
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
                >
                  Finding the best products for you…
                </p>
                <div
                  className="mt-8 h-[2px] w-48 mx-auto overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: '40%',
                      background:
                        'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                      animation: 'slide 1.4s ease-in-out infinite',
                    }}
                  />
                </div>
                <style>{`@keyframes slide { 0%{transform:translateX(-200%)} 100%{transform:translateX(400%)} }`}</style>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="py-12 text-center">
                <div className="text-3xl mb-4">⚠️</div>
                <p
                  className="text-sm font-bold mb-6"
                  style={{ color: 'var(--cinematic-text)' }}
                >
                  {error}
                </p>
                <button
                  onClick={reset}
                  className="btn-gradient px-8 py-3 text-xs tracking-widest rounded-full"
                >
                  TRY AGAIN
                </button>
              </div>
            )}

            {/* Results */}
            {step === 3 && result && !loading && (
              <div>
                <ProgressBar current={3} total={3} />

                <span
                  className="text-label text-xs block mb-3"
                  style={{ color: 'var(--cinematic-cyan)' }}
                >
                  YOUR PERSONALIZED ROUTINE
                </span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                  RESULTS.
                </h2>

                {/* Profile Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[area, concern, skinType].map(
                    (tag) =>
                      tag && (
                        <span
                          key={tag}
                          className="text-label text-xs px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(6,182,212,0.1)',
                            color: 'var(--cinematic-cyan)',
                            border: '1px solid rgba(6,182,212,0.3)',
                          }}
                        >
                          {tag.toUpperCase()}
                        </span>
                      )
                  )}
                </div>

                {/* Summary */}
                <p
                  className="text-base mb-8 pb-8"
                  style={{
                    color: 'var(--cinematic-text-secondary)',
                    fontWeight: 300,
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {result.summary}
                </p>

                {/* Routine Steps */}
                {result.routine?.length > 0 && (
                  <div className="mb-8">
                    <p
                      className="text-label text-xs mb-4"
                      style={{ color: 'var(--cinematic-purple)' }}
                    >
                      DAILY ROUTINE
                    </p>
                    <div className="flex flex-col gap-3">
                      {result.routine.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 px-4 py-3 rounded-xl"
                          style={{
                            background: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(0,0,0,0.06)',
                          }}
                        >
                          <div
                            className="text-xs font-black flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
                            style={{
                              background:
                                'linear-gradient(135deg, var(--cinematic-cyan), var(--cinematic-purple))',
                              color: '#fff',
                            }}
                          >
                            {i + 1}
                          </div>
                          <span
                            className="text-sm"
                            style={{
                              color: 'var(--cinematic-text)',
                              fontWeight: 300,
                            }}
                          >
                            {s.replace(/^Step \d+:\s*/i, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Cards */}
                <div className="mb-8">
                  <p
                    className="text-label text-xs mb-4"
                    style={{ color: 'var(--cinematic-pink)' }}
                  >
                    RECOMMENDED PRODUCTS
                  </p>
                  <div className="flex flex-col gap-4">
                    {result.products?.map((p, i) => (
                      <div
                        key={i}
                        className="px-5 py-4 rounded-2xl"
                        style={{
                          border: '1px solid rgba(0,0,0,0.08)',
                          background: 'rgba(255,255,255,0.5)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <span
                          className="text-label text-xs block mb-1"
                          style={{ color: 'var(--cinematic-cyan)' }}
                        >
                          {p.type}
                        </span>
                        <p
                          className="font-black text-sm uppercase tracking-wide mb-3"
                          style={{ color: 'var(--cinematic-text)' }}
                        >
                          {p.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {p.keyIngredients?.map((ing) => (
                            <span
                              key={ing}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                background: 'rgba(124,58,237,0.08)',
                                color: 'var(--cinematic-purple)',
                                border: '1px solid rgba(124,58,237,0.2)',
                              }}
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                        <p
                          className="text-xs"
                          style={{
                            color: 'var(--cinematic-text-secondary)',
                            fontWeight: 300,
                          }}
                        >
                          💡 {p.tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded-full"
                  style={{
                    border: '2px solid rgba(0,0,0,0.1)',
                    background: 'transparent',
                    color: 'var(--cinematic-text-secondary)',
                  }}
                >
                  ↩ START OVER
                </button>

                <p
                  className="text-xs text-center mt-4"
                  style={{
                    color: 'var(--cinematic-text-secondary)',
                    opacity: 0.5,
                    fontWeight: 300,
                  }}
                >
                  AI recommendations are for general guidance only. Consult a
                  dermatologist for medical concerns.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}

