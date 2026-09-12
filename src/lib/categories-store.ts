import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Category } from '@/types/product';
import { slugify } from '@/lib/admin-auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

const INITIAL_CATEGORIES: Category[] = [
  { id: 'skincare', name: 'Skincare', slug: 'skincare', description: 'Serums, toners, creams, and cleansers for glowing skin' },
  { id: 'eye-care', name: 'Eye Care', slug: 'eye-care', description: 'Eye creams, serums, and patches for under-eye care' },
  { id: 'serum', name: 'Serum', slug: 'serum', description: 'Potent targeted active ingredient formulas' },
  { id: 'sunscreen', name: 'Sunscreen', slug: 'sunscreen', description: 'SPF and UV protection essentials' },
  { id: 'makeup', name: 'Makeup', slug: 'makeup', description: 'Foundations, lipsticks, and cosmetic beauty products' },
  { id: 'lip-care', name: 'Lip Care', slug: 'lip-care', description: 'Balms, tints, and lip treatments' },
  { id: 'haircare', name: 'Haircare', slug: 'haircare', description: 'Hair masks, oils, and scalp health' },
];

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getAllCategories(): Promise<Category[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(CATEGORIES_FILE, 'utf8');
    const categories = JSON.parse(raw) as Category[];
    if (categories && categories.length > 0) return categories;
  } catch {
    // File missing or error, seed default
  }

  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(INITIAL_CATEGORIES, null, 2), 'utf8');
  return INITIAL_CATEGORIES;
}

export async function addCategory(name: string, description?: string): Promise<{ success: boolean; category?: Category; error?: string }> {
  const trimmed = name.trim();
  if (!trimmed) {
    return { success: false, error: 'Category name is required' };
  }

  const slug = slugify(trimmed);
  const categories = await getAllCategories();

  if (categories.some((c) => c.slug === slug || c.name.toLowerCase() === trimmed.toLowerCase())) {
    return { success: false, error: 'Category already exists' };
  }

  const newCategory: Category = {
    id: slug,
    name: trimmed,
    slug,
    description: description?.trim() || '',
    createdAt: new Date().toISOString(),
  };

  categories.push(newCategory);
  await ensureDataDir();
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf8');

  return { success: true, category: newCategory };
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const categories = await getAllCategories();
  const filtered = categories.filter((c) => c.id !== id && c.slug !== id);

  if (filtered.length === categories.length) {
    return { success: false, error: 'Category not found' };
  }

  await ensureDataDir();
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true };
}
