'use client';

const steps = [
  {
    number: '01',
    title: 'SCAN',
    description: 'Upload a photo of your cosmetic product, packaging, or barcode. Our AI analyzes texture, labeling, and packaging markers.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="12" height="12" rx="1" />
        <rect x="24" y="4" width="12" height="12" rx="1" />
        <rect x="4" y="24" width="12" height="12" rx="1" />
        <rect x="24" y="24" width="12" height="12" rx="1" />
        <circle cx="20" cy="20" r="6" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'ANALYZE',
    description: 'Our proprietary detection engine cross-references against 50,000+ verified products in our database with 99.7% accuracy.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M12 20h16M20 12v16" />
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'VERIFY',
    description: 'Receive a detailed authenticity report with confidence score, red flags detected, and verification certificate for genuine products.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 4L6 12v8c0 8.4 6 16.2 14 18 8-1.8 14-9.6 14-18v-8L20 4z" />
        <path d="M14 20l4 4 8-8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const stats = [
  { value: '2.4M+', label: 'PRODUCTS VERIFIED' },
  { value: '99.7%', label: 'DETECTION ACCURACY' },
  { value: '180+', label: 'BRANDS COVERED' },
  { value: '<3s', label: 'AVERAGE SCAN TIME' },
];

export function HowItWorks() {
  return (
    <section className="py-32 px-6" id="how-it-works" style={{ background: 'var(--cinematic-bg)' }}>
      <div className="max-w-[90rem] mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <span className="text-label text-xs block mb-4" style={{ color: 'var(--cinematic-cyan)' }}>
            THE PROCESS
          </span>
          <h2 className="text-section">
            HOW IT
            <br />
            <span>
              WORKS
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-10 group"
              style={{
                borderLeft: i > 0 ? '1px solid var(--cinematic-border)' : 'none',
                borderTop: '1px solid var(--cinematic-border)',
                borderBottom: '1px solid var(--cinematic-border)',
              }}
              id={`step-${step.number}`}
            >
              {/* Step Number */}
              <span
                className="text-8xl font-black absolute top-6 right-6 select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.03)' }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="mb-8 transition-colors duration-300"
                style={{ color: 'var(--cinematic-cyan)' }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}
              >
                {step.description}
              </p>

              {/* Connecting Line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px]"
                  style={{ background: 'var(--cinematic-cyan)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ border: '1px solid var(--cinematic-border)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-8 text-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid var(--cinematic-border)' : 'none',
              }}
              id={`stat-${i}`}
            >
              <span
                className="text-3xl md:text-4xl font-black block mb-2"
                style={{
                  background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-label text-xs"
                style={{ color: 'var(--cinematic-text-secondary)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
