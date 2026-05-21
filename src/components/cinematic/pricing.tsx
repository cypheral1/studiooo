'use client';

import { useState } from 'react';

const plans = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 0,
    priceLabel: 'FREE',
    description: 'For individual consumers verifying personal purchases',
    features: [
      '5 Scans per Month',
      'Basic Authenticity Report',
      'Barcode Verification',
      'Community Support',
      'Mobile App Access',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: 49,
    priceLabel: '$49',
    description: 'For retailers & resellers who need bulk verification',
    features: [
      'Unlimited Scans',
      'Detailed Forensic Reports',
      'Batch Code Analysis',
      'API Access',
      'Priority Support',
      'Supply Chain Tracking',
      'Certification Badges',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: 0,
    priceLabel: 'CUSTOM',
    description: 'For brands protecting their products at scale',
    features: [
      'White-label Solution',
      'Real-time Monitoring',
      'Custom AI Training',
      'Dedicated Account Manager',
      'Legal Takedown Support',
      'Marketplace Integration',
      'Compliance Dashboard',
      'SLA Guarantee',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const [sliderValue, setSliderValue] = useState(50);
  const scansPerMonth = Math.round(sliderValue * 20);
  const calculatedPrice = sliderValue <= 5 ? 0 : Math.round(sliderValue * 0.98);

  return (
    <section className="pricing-glow py-32 px-6 relative overflow-hidden" id="pricing">
      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span
            className="text-label text-xs block mb-4"
            style={{ color: 'var(--cinematic-purple)' }}
          >
            TRANSPARENT PRICING
          </span>
          <h2 className="text-section text-center">
            PROTECT
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              YOUR BRAND
            </span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`price-${plan.id}`}
              className={`relative p-8 transition-transform duration-300 ${
                plan.highlighted
                  ? 'bg-white text-[#111111] scale-100 md:scale-105 z-10'
                  : 'glass-card'
              }`}
              style={{
                border: plan.highlighted ? 'none' : '1px solid var(--cinematic-border)',
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                    color: '#fff',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <span
                  className="text-label text-xs block mb-4"
                  style={{ color: plan.highlighted ? '#666' : 'var(--cinematic-text-secondary)' }}
                >
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-black">
                    {plan.priceLabel}
                  </span>
                  {plan.price > 0 && (
                    <span
                      className="text-sm"
                      style={{ color: plan.highlighted ? '#999' : 'var(--cinematic-text-secondary)' }}
                    >
                      /mo
                    </span>
                  )}
                </div>
                <p
                  className="mt-3 text-sm"
                  style={{ color: plan.highlighted ? '#666' : 'var(--cinematic-text-secondary)' }}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <path
                        d="M4 8L7 11L12 5"
                        stroke={plan.highlighted ? '#111' : 'var(--cinematic-cyan)'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontWeight: 400 }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  plan.highlighted
                    ? 'bg-[#111] text-white hover:bg-[#222]'
                    : 'btn-gradient'
                }`}
                style={{ border: 'none' }}
                id={`btn-${plan.id}`}
              >
                {plan.id === 'enterprise' ? 'CONTACT SALES' : 'GET STARTED'}
              </button>
            </div>
          ))}
        </div>

        {/* Volume Calculator */}
        <div
          className="max-w-2xl mx-auto p-10"
          style={{
            background: 'var(--cinematic-pricing-card)',
            borderRadius: '32px',
          }}
          id="price-calculator"
        >
          <div className="text-center mb-8">
            <span className="text-label text-xs block mb-2" style={{ color: 'var(--cinematic-purple)' }}>
              VOLUME CALCULATOR
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              ESTIMATE YOUR COST
            </h3>
          </div>

          <div className="text-center mb-4">
            <span
              className="text-6xl md:text-7xl font-black"
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {calculatedPrice === 0 ? 'FREE' : `$${calculatedPrice}`}
            </span>
            <span className="block text-sm mt-2" style={{ color: 'var(--cinematic-text-secondary)' }}>
              {scansPerMonth.toLocaleString()} scans per month
            </span>
          </div>

          <div className="px-4">
            <input
              type="range"
              min="0"
              max="200"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="slider-cinematic"
              id="price-slider"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
                PERSONAL
              </span>
              <span className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
                ENTERPRISE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
