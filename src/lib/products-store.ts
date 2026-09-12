import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Product, ProductInput, SlideshowProduct } from '@/types/product';
import { slugify } from '@/lib/admin-auth';
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from '@/lib/whatsapp';
import { supabase } from '@/config/supabase';

export { WHATSAPP_NUMBER, buildWhatsAppUrl };

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'products');
const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads', 'media');

const SEED_PRODUCTS: Product[] = [
  {
    slug: 'axis-y-glow-serum',
    name: 'Dark Spot Correcting Glow Serum',
    brand: 'AXIS-Y',
    category: 'Skincare',
    image: '/images/skincare/axis-y-glow-serum.jpg',
    images: [
      '/images/skincare/axis-y-glow-serum/slide-1.jpg',
      '/images/skincare/axis-y-glow-serum/slide-2.jpg',
      '/images/skincare/axis-y-glow-serum/slide-3.jpg',
      '/images/skincare/axis-y-glow-serum/slide-4.jpg',
      '/images/skincare/axis-y-glow-serum/slide-5.jpg',
    ],
    description:
      'A popular K-beauty treatment designed to brighten the complexion, fade dark spots, and provide deep hydration.',
    benefits: [
      'Corrects Dark Spots & Hyperpigmentation',
      'Brightens Complexion & Improves Radiance',
      'Provides Deep Hydration & Retains Moisture',
      'Soothing & Balancing without irritation',
    ],
    ingredients: [
      '5% Niacinamide',
      'Plant-Derived Squalane',
      'Papaya & Sea Buckthorn Fruit Extracts',
      'Allantoin & Glutathione',
      'Sodium Hyaluronate',
    ],
    howToUse:
      'Apply a small amount to the entire face or targeted problem areas. Gently pat until completely absorbed.',
    badge: 'Verified Authentic',
    featured: true,
  },
  {
    slug: 'anua-niacinamide',
    name: 'Niacinamide 10% + TXA 4% Serum',
    brand: 'Anua',
    category: 'Serum',
    image: '/images/skincare/anua-niacinamide.jpg',
    images: [
      '/images/skincare/anua-niacinamide/slide-1.jpg',
      '/images/skincare/anua-niacinamide/slide-2.jpg',
      '/images/skincare/anua-niacinamide/slide-3.jpg',
      '/images/skincare/anua-niacinamide/slide-4.jpg',
    ],
    description:
      'A concentrated brightening treatment designed to address hyperpigmentation, dark spots, and uneven skin tone.',
    benefits: [
      'Targets Dark Spots & Stubborn Pigmentation',
      'Brightens Skin Tone for a Glass-Skin Finish',
      'Controls Oil & Minimizes Enlarged Pores',
      'Improves Overall Skin Texture',
    ],
    ingredients: [
      '10% Niacinamide',
      '4% Tranexamic Acid (TXA)',
      '2% Arbutin',
      'Hyaluronic Acid Complex',
      'Centella Asiatica Extract & Ceramides',
    ],
    howToUse:
      'Apply an appropriate amount to the skin. Use twice daily, and always follow up with sunscreen during the morning routine.',
    badge: 'Top Rated',
    featured: true,
  },
  {
    slug: 'medicube-kojic-acid',
    name: 'Kojic Acid Turmeric Vita Capsule Cream',
    brand: 'Medicube',
    category: 'Skincare',
    image: '/images/skincare/medicube-kojic-acid.jpg',
    description:
      'A brightening moisturizer designed to target hyperpigmentation and dullness with vitamin capsules that melt upon application.',
    benefits: [
      'Brightens & Evens Skin Tone',
      'Provides Deep, Multi-Layer Hydration',
      'Strengthens the Natural Skin Barrier',
      'Calms & Soothes Inflammation and Redness',
    ],
    ingredients: [
      'Kojic Acid',
      'Turmeric Root Extract',
      '5% Niacinamide',
      'Vitamin C (Ascorbic Acid)',
      '8 Types of Hyaluronic Acid',
    ],
    howToUse:
      'Apply a moderate amount as the final step of your skincare routine. Gently massage until the vitamin capsules fully melt.',
    badge: 'Guaranteed Original',
    featured: true,
  },
  {
    slug: 'anua-azelaic',
    name: 'Azelaic Acid 10% + Hyaluron Soothing Serum',
    brand: 'Anua',
    category: 'Serum',
    image: '/images/skincare/anua-azelaic.jpg',
    description:
      'A targeted skincare treatment designed to address acne, redness, and uneven skin texture while providing deep hydration.',
    benefits: [
      'Treats Breakouts & Reduces Inflammation',
      'Relieves Redness and Calms Sensitivity',
      'Provides Deep Hydration Without Drying',
      'Offers Gentle Exfoliation for Smoother Texture',
    ],
    ingredients: [
      '10% Azelaic Acid',
      'Hyaluronic Acid & Sodium Hyaluronate',
      'Centella Asiatica Extract',
      'Niacinamide',
      'Panthenol (Vitamin B5) & Ceramides',
    ],
    howToUse:
      'Start slowly by using 1-2 drops, 2-3 times per week. Always use sunscreen during the day.',
    badge: 'Official Stockist',
    featured: true,
  },
  {
    slug: 'dr-althea-345',
    name: '345 Relief Cream',
    brand: 'Dr. Althea',
    category: 'Skincare',
    image: '/images/skincare/dr-althea-345.jpg',
    images: [
      '/images/skincare/dr-althea-345/slide-1.jpg',
      '/images/skincare/dr-althea-345/slide-2.jpg',
      '/images/skincare/dr-althea-345/slide-3.jpg',
      '/images/skincare/dr-althea-345/slide-4.jpg',
      '/images/skincare/dr-althea-345/slide-5.jpg',
    ],
    description:
      'A dermatologist-developed gel-cream formulated for oily, combination, and acne-prone skin with 72-hour hydration.',
    benefits: [
      'Repairs & Strengthens Compromised Skin Barrier',
      'Significantly Reduces Redness and Sensitivity',
      'Provides 72-Hour Lightweight Hydration',
      'Regulates Oil Production & Fades Dark Spots',
    ],
    ingredients: [
      '5% Panthenol (Vitamin B5)',
      '3 Types of Ceramides (NP, AS, NS)',
      '4 Types of Peptides',
      'Niacinamide',
      'Centella Asiatica & Tea Tree Leaf Water',
    ],
    howToUse:
      'Apply an appropriate amount evenly over the face at the moisturizer step. Can be used morning and night.',
    badge: '100% Genuine',
    featured: true,
  },
];

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readProductsFile(): Promise<Product[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Product[];
    if (parsed && parsed.length > 0) {
      return parsed.map((p) => ({
        ...p,
        category: p.category || 'Skincare',
      }));
    }
  } catch {
    // missing or corrupted
  }

  const now = new Date().toISOString();
  const seeded = SEED_PRODUCTS.map((p) => ({
    ...p,
    createdAt: now,
    updatedAt: now,
  }));
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(seeded, null, 2), 'utf8');
  return seeded;
}

async function writeProductsFile(products: Product[]) {
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

function mapDbToProduct(row: any): Product {
  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    image: row.image,
    images: Array.isArray(row.images) ? row.images : [],
    description: row.description,
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    ingredients: Array.isArray(row.ingredients) ? row.ingredients : [],
    howToUse: row.how_to_use || row.howToUse || '',
    badge: row.badge || 'Verified Authentic',
    featured: row.featured ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapProductToDb(p: Product) {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    image: p.image,
    images: p.images || [],
    description: p.description,
    benefits: p.benefits,
    ingredients: p.ingredients,
    how_to_use: p.howToUse,
    badge: p.badge || 'Verified Authentic',
    featured: p.featured ?? true,
    updated_at: new Date().toISOString(),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      if (data.length > 0) {
        const products = data.map(mapDbToProduct);
        writeProductsFile(products).catch(() => {});
        return products;
      } else {
        // Table is empty in Supabase, auto-seed all existing products to Supabase
        const local = await readProductsFile();
        if (local.length > 0) {
          const toInsert = local.map(mapProductToDb);
          await supabase.from('products').upsert(toInsert, { onConflict: 'slug' });
          return local;
        }
      }
    }
  } catch {
    // Fallback to local
  }

  return readProductsFile();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return mapDbToProduct(data);
    }
  } catch {
    // Fallback to local
  }

  const products = await readProductsFile();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await readProductsFile();
  const catSlug = slugify(category);
  return products.filter((p) => slugify(p.category || 'skincare') === catSlug);
}

export async function getFeaturedProducts(): Promise<SlideshowProduct[]> {
  const products = await getAllProducts();
  return products
    .filter((p) => p.featured !== false)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category || 'Skincare',
      issue: p.badge || 'Verified Authentic',
      image: p.image,
    }));
}

function normalizeList(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

export async function createProduct(
  input: ProductInput
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const slug = slugify(input.slug || `${input.brand}-${input.name}`);

  if (!slug) {
    return { success: false, error: 'Could not generate a valid product slug' };
  }

  const now = new Date().toISOString();
  const product: Product = {
    slug,
    name: input.name.trim(),
    brand: input.brand.trim(),
    category: input.category?.trim() || 'Skincare',
    image: input.image,
    images: input.images?.length ? input.images : undefined,
    video: input.video?.trim() || input.videos?.[0] || undefined,
    videos: input.videos?.length ? input.videos.filter(Boolean) : (input.video ? [input.video] : undefined),
    description: input.description.trim(),
    benefits: normalizeList(input.benefits),
    ingredients: normalizeList(input.ingredients),
    howToUse: input.howToUse.trim(),
    badge: input.badge?.trim() || 'Verified Authentic',
    featured: input.featured ?? true,
    createdAt: now,
    updatedAt: now,
  };

  // 1. Try Supabase insert
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([mapProductToDb(product)])
      .select()
      .single();

    if (error) {
      console.warn('Supabase product insert returned error, falling back to local file:', error.message);
    } else if (data) {
      const created = mapDbToProduct(data);
      const localProducts = await readProductsFile();
      const updated = [created, ...localProducts.filter((p) => p.slug !== slug)];
      await writeProductsFile(updated);
      return { success: true, product: created };
    }
  } catch (err: any) {
    console.warn('Supabase product insert error:', err?.message);
  }

  // 2. Fallback to local
  const products = await readProductsFile();
  if (products.some((p) => p.slug === slug)) {
    return { success: false, error: 'A product with this slug already exists' };
  }

  products.push(product);
  await writeProductsFile(products);
  return { success: true, product };
}

export async function updateProduct(
  slug: string,
  input: Partial<ProductInput>
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const current = await getProductBySlug(slug);
  if (!current) {
    return { success: false, error: 'Product not found' };
  }

  const nextVideos = input.videos !== undefined
    ? input.videos.filter(Boolean)
    : (input.video !== undefined ? (input.video ? [input.video] : undefined) : current.videos);
  const updated: Product = {
    ...current,
    name: input.name?.trim() ?? current.name,
    brand: input.brand?.trim() ?? current.brand,
    category: input.category?.trim() ?? current.category ?? 'Skincare',
    image: input.image ?? current.image,
    images: input.images !== undefined ? (input.images.length ? input.images.filter(Boolean) : undefined) : current.images,
    video: input.video !== undefined ? (input.video?.trim() || undefined) : (nextVideos?.[0] ?? current.video),
    videos: nextVideos,
    description: input.description?.trim() ?? current.description,
    benefits: input.benefits ? normalizeList(input.benefits) : current.benefits,
    ingredients: input.ingredients ? normalizeList(input.ingredients) : current.ingredients,
    howToUse: input.howToUse?.trim() ?? current.howToUse,
    badge: input.badge?.trim() ?? current.badge,
    featured: input.featured ?? current.featured,
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Supabase update
  try {
    const { data, error } = await supabase
      .from('products')
      .update(mapProductToDb(updated))
      .eq('slug', slug)
      .select()
      .single();

    if (!error && data) {
      const saved = mapDbToProduct(data);
      const localProducts = await readProductsFile();
      const idx = localProducts.findIndex((p) => p.slug === slug);
      if (idx !== -1) {
        localProducts[idx] = saved;
      } else {
        localProducts.push(saved);
      }
      await writeProductsFile(localProducts);
      return { success: true, product: saved };
    }
  } catch (err: any) {
    console.warn('Supabase product update error:', err?.message);
  }

  // 2. Fallback to local
  const products = await readProductsFile();
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { success: false, error: 'Product not found' };
  }

  products[index] = updated;
  await writeProductsFile(products);
  return { success: true, product: updated };
}

export async function deleteProduct(slug: string): Promise<{ success: boolean; error?: string }> {
  // 1. Try Supabase delete
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.warn('Supabase product delete error:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase product delete error:', err?.message);
  }

  // 2. Fallback to local
  const products = await readProductsFile();
  const filtered = products.filter((p) => p.slug !== slug);

  if (filtered.length === products.length) {
    return { success: false, error: 'Product not found' };
  }

  await writeProductsFile(filtered);

  const productDir = path.join(UPLOADS_DIR, slug);
  try {
    await fs.rm(productDir, { recursive: true, force: true });
  } catch {
    // ignore missing upload dir
  }

  return { success: true };
}

/**
 * Universal media uploader for images and videos directly from device
 */
export async function saveMediaFile(
  file: File,
  folder: string = 'general'
): Promise<{ success: boolean; url?: string; fileType?: 'image' | 'video'; error?: string }> {
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  if (!isImage && !isVideo) {
    return { success: false, error: 'Only image or video files are allowed' };
  }

  // Max 100MB for video, 20MB for image
  const maxSize = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: isVideo ? 'Video must be 100MB or smaller' : 'Image must be 20MB or smaller',
    };
  }

  const safeFolder = slugify(folder) || 'general';
  const targetDir = path.join(MEDIA_DIR, safeFolder);
  await fs.mkdir(targetDir, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || (isVideo ? '.mp4' : '.jpg');
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const filepath = path.join(targetDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  const url = `/uploads/media/${safeFolder}/${filename}`;
  return {
    success: true,
    url,
    fileType: isVideo ? 'video' : 'image',
  };
}

// Backward compatibility helper
export async function saveProductImage(
  slug: string,
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  return saveMediaFile(file, slug || 'products');
}
