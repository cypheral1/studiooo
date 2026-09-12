import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Blog, BlogInput } from '@/types/blog';
import { slugify } from '@/lib/admin-auth';
import { supabase } from '@/config/supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

const SEED_BLOGS: Blog[] = [
  {
    slug: 'how-to-verify-any-cosmetic-product-in-60-seconds',
    title: 'How to Verify Any Cosmetic Product in 60 Seconds',
    excerpt: 'A quick guide to using batch codes, QR scans, and packaging checks to instantly tell if your product is genuine or counterfeit.',
    content: `## Quick Verification Checklist

Counterfeit beauty products are flooding global marketplaces, but you can protect yourself with these four quick checks:

### 1. Inspect the Batch Code
Every genuine cosmetic product features a factory-printed batch code (usually stamped or dot-matrix printed) on both the outer carton and the bottom of the bottle or tube.
- Ensure the batch code on the box **matches** the batch code on the bottle.
- Use an online batch code checker to verify the manufacturing date and shelf life.

### 2. Verify Holograms & Tamper Seals
Legitimate brands use specialized holographic security seals with microtext. Counterfeits often use cheap silver stickers without dynamic light refraction.

### 3. Texture, Color & Scent Analysis
Original formulas have consistent viscosity and subtle fragrance profiles. If a serum feels watery, excessively sticky, or smells strongly of chemical alcohol or metallic perfume, stop using it immediately.

### 4. Use TrueOriginalShop Verification
Scan your packaging, barcode, and batch code with our AI-powered verification tool to check against official manufacturer databases.`,
    tag: 'GUIDE',
    author: 'TrueOriginal Research Team',
    date: 'June 5, 2025',
    readTime: '4 min read',
    featured: true,
    image: '/images/skincare/axis-y-glow-serum.jpg',
  },
  {
    slug: 'the-hidden-dangers-of-fake-sunscreen',
    title: 'The Hidden Dangers of Fake Sunscreen',
    excerpt: 'Counterfeit sunscreens offer zero UV protection while exposing your skin to harmful chemicals. Here is what to watch out for.',
    content: `## Why Counterfeit Sunscreens Are Dangerous

Unlike fake luxury apparel or accessories, counterfeit skincare poses direct, severe health risks. Sunscreens are categorized as over-the-counter drugs in many jurisdictions for good reason.

### Zero UV Protection
Lab tests on intercepted counterfeit sunscreens have repeatedly revealed SPF ratings below 5, despite labels claiming SPF 50+ PA++++. Applying fake sunscreen gives a false sense of security while allowing deep UVA/UVB damage.

### Harmful Contaminants
Counterfeit labs operate in unsanitary environments without safety regulations. Intercepted batches have tested positive for:
- Heavy metals like lead, mercury, and arsenic
- Undisclosed industrial chemical binders
- Bacterial and microbial contamination

### How to Spot Fake Sunscreens
1. **Packaging Fonts & Alignments**: Look for fuzzy printing, typos in ingredient lists, or missing PA designations.
2. **Cap and Dispenser Quality**: Authentic brands use precise injection molding. Fake caps often leak or fit loosely.
3. **Price Discrepancy**: If a premium $25 sunscreen is listed for $6 on an unverified marketplace, it is almost certainly counterfeit.`,
    tag: 'SAFETY',
    author: 'Dr. Sarah Lin (Dermatology Specialist)',
    date: 'May 28, 2025',
    readTime: '5 min read',
    featured: true,
    image: '/images/skincare/anua-niacinamide.jpg',
  },
  {
    slug: 'top-5-most-counterfeited-beauty-brands-in-2025',
    title: 'Top 5 Most Counterfeited Beauty Brands in 2025',
    excerpt: 'From K-Beauty bestsellers to viral cult favorites, learn which brands are most targeted by counterfeiters.',
    content: `## High-Target Skincare Brands in 2025

The explosion of social media skincare trends has made viral products the top targets for counterfeit operations. Here are the 5 brands currently experiencing the highest rates of fake replicas:

1. **AXIS-Y**: The Dark Spot Correcting Glow Serum has thousands of unauthorized knockoffs across third-party marketplaces. Look for the authentic green tint and pump mechanism.
2. **Anua**: The Heartleaf 77% Soothing Toner and Niacinamide + TXA Serums. Replicas often use diluted water solutions with synthetic scent additives.
3. **Medicube**: Collagen and Kojic Acid lines. Genuine packaging features crisp metallic embossing and distinct QR authentication.
4. **Dr. Althea**: The 345 Relief Cream. Original tubes have precise crimp markings and specific consistency.
5. **Beauty of Joseon**: Relief Sun and Glow Serums. Authentic bottles feature distinct matte finishes and correct hangul typography.

Always purchase directly from verified stockists or confirm your batch codes before applying new products.`,
    tag: 'RESEARCH',
    author: 'TrueOriginal Intelligence Lab',
    date: 'May 15, 2025',
    readTime: '6 min read',
    featured: true,
    image: '/images/skincare/medicube-kojic-acid.jpg',
  },
  {
    slug: 'why-fake-serums-can-damage-your-skin-permanently',
    title: 'Why Fake Serums Can Damage Your Skin Permanently',
    excerpt: 'Counterfeit serums often contain undisclosed acids and heavy metals that cause long-term scarring and pigmentation issues.',
    content: `## The Biological Impact of Counterfeit Serums

Active serums (such as Vitamin C, Niacinamide, Retinol, and chemical exfoliants) rely on precise pH balances and stable formulations. When counterfeiters mimic these formulas, dangerous shortcuts are taken.

### 1. Acid Burns & Compromised Skin Barriers
Uncontrolled acid concentrations in fake exfoliants can cause chemical burns, leading to permanent hyperpigmentation and post-inflammatory erythema (PIE).

### 2. Contact Dermatitis & Allergic Sensitization
Unknown fillers, industrial fragrances, and unrefined solvents trigger acute allergic reactions, intense swelling, and chronic eczema flare-ups.

### 3. Severe Microbial Infections
Without proper pharmaceutical-grade preservatives, fake serums foster fungal and bacterial proliferation, leading to deep cystic breakouts and facial cellulitis.

### What to Do If You Suspect a Fake Product
- **Wash immediately** with lukewarm water and a gentle, neutral cleanser.
- **Discontinue use** and document the product batch code and purchase receipt.
- **Consult a dermatologist** if redness, burning, or swelling persists.`,
    tag: 'HEALTH',
    author: 'Clinical Skincare Advisory',
    date: 'May 2, 2025',
    readTime: '4 min read',
    featured: false,
    image: '/images/skincare/anua-azelaic.jpg',
  },
  {
    slug: 'buying-cosmetics-online-a-complete-safety-checklist',
    title: 'Buying Cosmetics Online: A Complete Safety Checklist',
    excerpt: 'Follow this checklist before purchasing any beauty product from an online marketplace to protect yourself from scams.',
    content: `## Safe Online Shopping Guide

Online shopping offers incredible convenience, but open third-party seller platforms make it easy for unauthorized counterfeiters to mix fake inventory with genuine products.

### Pre-Purchase Checklist
- [ ] **Check the Seller Profile**: Is it "Sold & Shipped by Brand" or an unverified third-party merchant?
- [ ] **Scrutinize Reviews with Photos**: Look for customer photos showing misprinted labels, broken seals, or strange textures.
- [ ] **Beware of "Too Good to Be True" Discounts**: A 70% discount on a current bestseller is almost always counterfeit stock.
- [ ] **Check Return Policies**: Legitimate authorized retailers guarantee authenticity and accept returns on defective items.

### Post-Delivery Checklist
- [ ] Inspect outer carton seals and barcode integrity.
- [ ] Compare tube weight, cap tightness, and font thickness against an authentic sample.
- [ ] Perform a 24-hour patch test behind your ear or inner forearm before applying to your face.`,
    tag: 'TIPS',
    author: 'TrueOriginal Team',
    date: 'April 20, 2025',
    readTime: '3 min read',
    featured: false,
    image: '/images/skincare/dr-althea-345.jpg',
  },
  {
    slug: 'how-counterfeit-cosmetics-enter-the-market',
    title: 'How Counterfeit Cosmetics Enter the Market',
    excerpt: 'An inside look at how fake beauty products are manufactured, distributed, and sold through seemingly legitimate channels.',
    content: `## The Supply Chain of Fake Cosmetics

Understanding how counterfeit cosmetics reach consumer shelves helps shoppers recognize suspicious patterns in retail and online channels.

### 1. Commingled Inventory Warehouses
Many massive fulfillment centers store inventory from multiple third-party sellers in unified bins. Even if you order from a legitimate storefront, commingling can result in receiving counterfeit items shipped from adjacent seller bins.

### 2. Lookalike Packaging Replication
Advanced packaging replication uses discarded original molds and high-resolution scans to duplicate outer boxes with 90%+ visual accuracy, while filling bottles with substandard chemical mixtures.

### 3. Social Media Marketplace Dropshipping
Counterfeiters leverage short-form video ads and temporary storefronts, shutting down before customer complaints and safety reports can trigger account bans.

### Protecting Your Household
Always purchase from authorized retailers, official brand websites, or verified stockists like TrueOriginalShop.`,
    tag: 'INVESTIGATION',
    author: 'TrueOriginal Investigation Desk',
    date: 'April 8, 2025',
    readTime: '7 min read',
    featured: false,
  },
];

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readBlogsFile(): Promise<Blog[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(BLOGS_FILE, 'utf8');
    return JSON.parse(raw) as Blog[];
  } catch {
    const now = new Date().toISOString();
    const seeded = SEED_BLOGS.map((b) => ({
      ...b,
      createdAt: now,
      updatedAt: now,
    }));
    await fs.writeFile(BLOGS_FILE, JSON.stringify(seeded, null, 2), 'utf8');
    return seeded;
  }
}

async function writeBlogsFile(blogs: Blog[]) {
  await ensureDataDir();
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
}

// Convert Supabase DB record to Blog interface
function mapDbToBlog(row: any): Blog {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tag: row.tag || 'GUIDE',
    author: row.author || 'TrueOriginal Team',
    image: row.image || undefined,
    date: row.date || new Date(row.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: row.read_time || '4 min read',
    featured: row.featured ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Convert Blog object to Supabase row format
function mapBlogToDb(blog: Blog) {
  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    tag: blog.tag,
    author: blog.author,
    image: blog.image || null,
    date: blog.date,
    read_time: blog.readTime || '4 min read',
    featured: blog.featured ?? true,
    updated_at: new Date().toISOString(),
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      if (data.length > 0) {
        const blogs = data.map(mapDbToBlog);
        writeBlogsFile(blogs).catch(() => {});
        return blogs;
      } else {
        // Table is empty in Supabase, auto-seed all existing blogs to Supabase
        const local = await readBlogsFile();
        if (local.length > 0) {
          const toInsert = local.map(mapBlogToDb);
          await supabase.from('blogs').upsert(toInsert, { onConflict: 'slug' });
          return local;
        }
      }
    }
  } catch {
    // Supabase table or network issue, fallback to local store
  }

  return readBlogsFile();
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return mapDbToBlog(data);
    }
  } catch {
    // Fallback to local
  }

  const blogs = await readBlogsFile();
  return blogs.find((b) => b.slug === slug);
}

export async function createBlog(
  input: BlogInput
): Promise<{ success: boolean; blog?: Blog; error?: string }> {
  const slug = slugify(input.slug || input.title);

  if (!slug) {
    return { success: false, error: 'Could not generate a valid blog slug' };
  }

  if (!input.title?.trim()) {
    return { success: false, error: 'Blog title is required' };
  }

  if (!input.content?.trim()) {
    return { success: false, error: 'Blog content is required' };
  }

  const now = new Date();
  const dateFormatted = input.date || now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const newBlog: Blog = {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt?.trim() || input.content.slice(0, 150).replace(/[#*`_]/g, '') + '...',
    content: input.content.trim(),
    tag: input.tag?.trim() || 'GUIDE',
    author: input.author?.trim() || 'TrueOriginal Team',
    image: input.image?.trim() || undefined,
    date: dateFormatted,
    readTime: input.readTime?.trim() || `${Math.max(1, Math.ceil(input.content.split(/\s+/).length / 200))} min read`,
    featured: input.featured ?? true,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  // 1. Try Supabase insert
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([mapBlogToDb(newBlog)])
      .select()
      .single();

    if (error) {
      console.warn('Supabase blog insert returned error, falling back to local file:', error.message);
    } else if (data) {
      const created = mapDbToBlog(data);
      // Sync local
      const localBlogs = await readBlogsFile();
      const updated = [created, ...localBlogs.filter((b) => b.slug !== slug)];
      await writeBlogsFile(updated);
      return { success: true, blog: created };
    }
  } catch (err: any) {
    console.warn('Supabase blog insert error:', err?.message);
  }

  // 2. Fallback to local store
  const localBlogs = await readBlogsFile();
  if (localBlogs.some((b) => b.slug === slug)) {
    return { success: false, error: 'A blog with this slug already exists' };
  }

  localBlogs.unshift(newBlog);
  await writeBlogsFile(localBlogs);
  return { success: true, blog: newBlog };
}

export async function updateBlog(
  slug: string,
  input: Partial<BlogInput>
): Promise<{ success: boolean; blog?: Blog; error?: string }> {
  const current = await getBlogBySlug(slug);
  if (!current) {
    return { success: false, error: 'Blog not found' };
  }

  const updatedBlog: Blog = {
    ...current,
    title: input.title?.trim() ?? current.title,
    excerpt: input.excerpt?.trim() ?? current.excerpt,
    content: input.content?.trim() ?? current.content,
    tag: input.tag?.trim() ?? current.tag,
    author: input.author?.trim() ?? current.author,
    image: input.image !== undefined ? input.image.trim() || undefined : current.image,
    date: input.date?.trim() ?? current.date,
    readTime: input.readTime?.trim() ?? current.readTime,
    featured: input.featured ?? current.featured,
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Supabase update
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update(mapBlogToDb(updatedBlog))
      .eq('slug', slug)
      .select()
      .single();

    if (!error && data) {
      const saved = mapDbToBlog(data);
      // Sync local
      const localBlogs = await readBlogsFile();
      const idx = localBlogs.findIndex((b) => b.slug === slug);
      if (idx !== -1) {
        localBlogs[idx] = saved;
      } else {
        localBlogs.unshift(saved);
      }
      await writeBlogsFile(localBlogs);
      return { success: true, blog: saved };
    }
  } catch (err: any) {
    console.warn('Supabase blog update error:', err?.message);
  }

  // 2. Fallback to local store
  const localBlogs = await readBlogsFile();
  const idx = localBlogs.findIndex((b) => b.slug === slug);
  if (idx === -1) {
    return { success: false, error: 'Blog not found' };
  }
  localBlogs[idx] = updatedBlog;
  await writeBlogsFile(localBlogs);
  return { success: true, blog: updatedBlog };
}

export async function deleteBlog(
  slug: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Try Supabase delete
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.warn('Supabase blog delete error:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase blog delete error:', err?.message);
  }

  // 2. Fallback to local store
  const localBlogs = await readBlogsFile();
  const filtered = localBlogs.filter((b) => b.slug !== slug);

  if (filtered.length === localBlogs.length) {
    return { success: false, error: 'Blog post not found' };
  }

  await writeBlogsFile(filtered);
  return { success: true };
}
