import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | TrueOriginalShop',
  description: 'Expert tips and news on product authenticity and beauty safety.',
};

const blogPosts = [
  {
    title: 'How to Verify Any Cosmetic Product in 60 Seconds',
    excerpt: 'A quick guide to using batch codes, QR scans, and packaging checks to instantly tell if your product is genuine or counterfeit.',
    date: 'June 5, 2025',
    tag: 'GUIDE',
  },
  {
    title: 'The Hidden Dangers of Fake Sunscreen',
    excerpt: 'Counterfeit sunscreens offer zero UV protection while exposing your skin to harmful chemicals. Here is what to watch out for.',
    date: 'May 28, 2025',
    tag: 'SAFETY',
  },
  {
    title: 'Top 5 Most Counterfeited Beauty Brands in 2025',
    excerpt: 'From MAC to The Ordinary, these brands are the most targeted by counterfeiters. Learn which products to be extra careful about.',
    date: 'May 15, 2025',
    tag: 'RESEARCH',
  },
  {
    title: 'Why Fake Serums Can Damage Your Skin Permanently',
    excerpt: 'Counterfeit serums often contain undisclosed acids and heavy metals that cause long-term scarring and pigmentation issues.',
    date: 'May 2, 2025',
    tag: 'HEALTH',
  },
  {
    title: 'Buying Cosmetics Online: A Complete Safety Checklist',
    excerpt: 'Follow this checklist before purchasing any beauty product from an online marketplace to protect yourself from scams.',
    date: 'April 20, 2025',
    tag: 'TIPS',
  },
  {
    title: 'How Counterfeit Cosmetics Enter the Market',
    excerpt: 'An inside look at how fake beauty products are manufactured, distributed, and sold through seemingly legitimate channels.',
    date: 'April 8, 2025',
    tag: 'INVESTIGATION',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 flex flex-col relative overflow-hidden" style={{ paddingTop: '120px' }}>
        <div className="px-6 md:px-12 py-16 md:py-24 max-w-[90rem] mx-auto w-full relative z-10">
          <span className="text-label text-xs block mb-4" style={{ color: 'var(--cinematic-cyan)' }}>
            INSIGHTS &amp; NEWS
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-4">
            OUR
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, var(--cinematic-cyan), var(--cinematic-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BLOG.
            </span>
          </h1>
          <p className="max-w-xl text-base md:text-lg mb-16" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
            Expert advice, authenticity guides, and the latest news in the world of beauty safety.
          </p>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group p-6 md:p-8 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  border: '1px solid var(--cinematic-border)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  className="text-label text-[10px] inline-block mb-4 px-3 py-1"
                  style={{
                    color: 'var(--cinematic-cyan)',
                    border: '1px solid var(--cinematic-cyan)',
                  }}
                >
                  {post.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
                    {post.date}
                  </span>
                  <span className="text-xs font-bold group-hover:underline" style={{ color: 'var(--cinematic-cyan)' }}>
                    READ →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="text-hero opacity-5" style={{ fontSize: '18vw', whiteSpace: 'nowrap' }}>
            BLOG
          </span>
        </div>
      </main>
      <CinematicFooter />
    </div>
  );
}
