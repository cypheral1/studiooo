'use client';

import { useState } from 'react';
import { DownloadCloud, Loader2, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CinematicFreeGuide() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Home Free Guide Form' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: 'Success! 🎉', description: 'Your free guide is on its way.' });
        setEmail('');
      } else {
        toast({ variant: 'destructive', title: 'Oops!', description: data.error || data.message || 'Failed to subscribe.' });
      }
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="purple-glow-section py-32 px-6 relative overflow-hidden" id="free-guide">
      <div className="max-w-[70rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="text-label text-xs block mb-4"
            style={{ color: 'var(--cinematic-purple)' }}
          >
            EXCLUSIVE INSIDER ACCESS
          </span>
          <h2 className="text-section text-center">
            FREE
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GUIDE
            </span>
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: 'var(--cinematic-text-secondary)' }}>
            Learn expert verification techniques to spot fake cosmetic products and protect your skin.
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="glass-card p-8 md:p-12 relative overflow-hidden"
          style={{
            borderRadius: '32px',
            border: '1px solid var(--cinematic-border)',
          }}
          id="free-guide-form-card"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* List of Benefits */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 text-xs font-bold tracking-widest uppercase border border-white/20">
                <Sparkles className="h-4.5 w-4.5" style={{ color: 'var(--cinematic-purple)' }} />
                What you will get
              </span>

              <div className="space-y-4">
                {[
                  'Step-by-step verification blueprints',
                  'High-resolution packaging warning examples',
                  'Key toxic ingredients list to avoid',
                  'Verified retailers database access'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm">
                      <Check className="h-4 w-4" style={{ color: 'var(--cinematic-purple)' }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--cinematic-text)' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--cinematic-text-secondary)' }}>
                    Your VIP Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/60 border border-black/10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] text-[#120E16] placeholder-[#5A4E65]/50 rounded-xl px-4 py-4 text-sm outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-gradient py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  style={{ borderRadius: '12px' }}
                >
                  {isLoading ? (
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  ) : (
                    <>
                      <DownloadCloud className="h-4.5 w-4.5" />
                      Get Free Guide
                    </>
                  )}
                </button>
              </form>
              <p className="mt-4 text-center text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
                We care about your data privacy. Instant delivery to your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
