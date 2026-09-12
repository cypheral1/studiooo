import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs-store';
import { CinematicNav } from '@/components/cinematic/nav';
import { CinematicFooter } from '@/components/cinematic/footer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Share2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Article Not Found | TrueOriginalShop',
    };
  }

  return {
    title: `${blog.title} | TrueOriginalShop Blog`,
    description: blog.excerpt,
  };
}

function renderFormattedContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-5 space-y-2.5 list-none pl-1">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Markdown H2: ## Heading
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={`h2-${index}`}
          className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-10 mb-4 pb-2 border-b border-white/10"
        >
          {trimmed.replace('## ', '')}
        </h2>
      );
      return;
    }

    // Markdown H3: ### Heading
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-xl md:text-2xl font-bold text-[var(--cinematic-cyan)] mt-8 mb-3"
        >
          {trimmed.replace('### ', '')}
        </h3>
      );
      return;
    }

    // Markdown List item: - item or * item or 1. item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      inList = true;
      const text = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
      listItems.push(
        <li key={`li-${index}`} className="flex items-start gap-3 text-base text-white/80 leading-relaxed">
          <span className="h-2 w-2 rounded-full bg-[var(--cinematic-cyan)] mt-2 shrink-0" />
          <span>{renderInlineFormatting(text)}</span>
        </li>
      );
      return;
    }

    flushList();

    // Standard paragraph
    elements.push(
      <p
        key={`p-${index}`}
        className="text-base md:text-lg leading-relaxed text-white/80 my-4"
        style={{ fontWeight: 300 }}
      >
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  flushList();
  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Simple parser for **bold** text
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getAllBlogs();
  const related = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />

      <main className="flex-1 relative overflow-hidden" style={{ paddingTop: '120px' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--cinematic-cyan)] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-label text-xs font-bold px-3 py-1 rounded-md uppercase"
                style={{
                  color: 'var(--cinematic-cyan)',
                  border: '1px solid var(--cinematic-cyan)',
                  background: 'rgba(0, 240, 255, 0.05)',
                }}
              >
                {blog.tag}
              </span>

              <span className="text-xs text-[var(--cinematic-text-secondary)] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {blog.date}
              </span>

              {blog.readTime && (
                <span className="text-xs text-[var(--cinematic-text-secondary)] flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {blog.readTime}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between gap-4 py-4 border-y border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--cinematic-cyan)] border border-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{blog.author}</p>
                  <p className="text-[11px] text-[var(--cinematic-text-secondary)]">Authenticity Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-lg glass flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" /> Verified Guide
                </span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {blog.image && (
            <div className="w-full h-[320px] md:h-[450px] mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          {blog.excerpt && (
            <div
              className="p-6 rounded-2xl mb-8 border-l-4"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'var(--cinematic-cyan)',
              }}
            >
              <p className="text-lg md:text-xl font-light text-white leading-relaxed italic">
                "{blog.excerpt}"
              </p>
            </div>
          )}

          {/* Article Body */}
          <article className="prose prose-invert max-w-none mb-16">
            {renderFormattedContent(blog.content)}
          </article>

          {/* Verification CTA Box */}
          <div className="glass-card rounded-3xl p-8 my-12 border border-[var(--cinematic-cyan)]/30 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">
                  Live Product Scanner
                </span>
                <h3 className="text-2xl font-black uppercase text-white mt-1 mb-2">
                  Have a product you want to check?
                </h3>
                <p className="text-sm text-[var(--cinematic-text-secondary)] max-w-lg">
                  Use our free AI tool to inspect batch codes, box seals, and ingredient formulations in seconds.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/verification-tools"
                  className="btn-gradient px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" /> Scan Product Now
                </Link>
                <Link
                  href="/where-to-buy-original"
                  className="glass px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:text-white"
                >
                  Verified Products
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-xl font-black uppercase tracking-wide text-white mb-6">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="glass-card p-5 rounded-2xl block group hover:border-[var(--cinematic-cyan)]/50 transition-all"
                  >
                    <span className="text-[10px] font-bold text-[var(--cinematic-cyan)] uppercase tracking-wider block mb-2">
                      {rel.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[var(--cinematic-cyan)] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-[var(--cinematic-text-secondary)] mt-3">
                      {rel.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
