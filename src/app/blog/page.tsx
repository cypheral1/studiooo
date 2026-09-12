import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blogs-store';
import { Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Skincare Authenticity Blog & Insights | TrueOriginalShop',
  description: 'Expert tips, laboratory research, and news on product authenticity and beauty safety.',
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      <main className="flex-1 flex flex-col relative overflow-hidden" style={{ paddingTop: '120px' }}>
        <div className="px-6 md:px-12 py-16 md:py-24 max-w-[90rem] mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-label text-xs block mb-4" style={{ color: 'var(--cinematic-cyan)' }}>
                INSIGHTS &amp; AUTHENTICITY RESEARCH
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
                  BLOG &amp; GUIDES.
                </span>
              </h1>
              <p className="max-w-xl text-base md:text-lg" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
                Dermatologist-reviewed advice, counterfeit detection blueprints, and beauty safety investigations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin-to-post"
                className="text-xs px-4 py-2 rounded-xl glass-card flex items-center gap-2 hover:border-[var(--cinematic-cyan)]/50 transition-colors"
                style={{ color: 'var(--cinematic-text-secondary)' }}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--cinematic-cyan)]" /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 md:p-8 transition-all duration-300 hover:translate-y-[-4px] flex flex-col justify-between rounded-2xl block"
                style={{
                  border: '1px solid var(--cinematic-border)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="text-label text-[10px] inline-block px-3 py-1 font-bold rounded-md uppercase"
                      style={{
                        color: 'var(--cinematic-cyan)',
                        border: '1px solid var(--cinematic-cyan)',
                        background: 'rgba(0, 240, 255, 0.05)',
                      }}
                    >
                      {post.tag}
                    </span>
                    {post.readTime && (
                      <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--cinematic-text-secondary)' }}>
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    )}
                  </div>

                  {post.image && (
                    <div className="w-full h-44 mb-5 rounded-xl overflow-hidden relative border border-white/10">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[var(--cinematic-cyan)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--cinematic-text-secondary)', fontWeight: 300 }}>
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs" style={{ color: 'var(--cinematic-text-secondary)' }}>
                    {post.date}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--cinematic-cyan)' }}>
                    READ ARTICLE <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
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
