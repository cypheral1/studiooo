-- =========================================================
-- TrueOriginalShop Complete Database Schema & Data Migration for Supabase
-- Run this complete script in the Supabase SQL Editor
-- =========================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    benefits JSONB DEFAULT '[]'::jsonb,
    ingredients JSONB DEFAULT '[]'::jsonb,
    how_to_use TEXT,
    badge TEXT DEFAULT 'Verified Authentic',
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);

-- 2. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    tag TEXT DEFAULT 'GUIDE',
    author TEXT DEFAULT 'TrueOriginal Team',
    image TEXT,
    date TEXT NOT NULL,
    read_time TEXT DEFAULT '4 min read',
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_tag ON public.blogs (tag);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs (created_at DESC);

-- 3. ADMINS TABLE
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admins_username ON public.admins (username);

-- 4. SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'Website Form',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_image_data_uri TEXT,
    barcode_image_data_uri TEXT,
    batch_code TEXT,
    authenticity_status TEXT,
    confidence_score NUMERIC,
    reasons JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- Enable Row Level Security (RLS) & Policies
-- =========================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

-- Products: Public read, Anon/Service insert/update/delete
DROP POLICY IF EXISTS "Public can read products" ON public.products;
CREATE POLICY "Public can read products" ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all product modifications" ON public.products;
CREATE POLICY "Enable all product modifications" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Blogs: Public read, Anon/Service insert/update/delete
DROP POLICY IF EXISTS "Public can read blogs" ON public.blogs;
CREATE POLICY "Public can read blogs" ON public.blogs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all blog modifications" ON public.blogs;
CREATE POLICY "Enable all blog modifications" ON public.blogs FOR ALL USING (true) WITH CHECK (true);

-- Admins: Read and modify
DROP POLICY IF EXISTS "Enable admin operations" ON public.admins;
CREATE POLICY "Enable admin operations" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- Subscribers: Allow insert and select
DROP POLICY IF EXISTS "Enable subscriber operations" ON public.subscribers;
CREATE POLICY "Enable subscriber operations" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

-- Verifications: Allow insert and select
DROP POLICY IF EXISTS "Enable verification operations" ON public.verifications;
CREATE POLICY "Enable verification operations" ON public.verifications FOR ALL USING (true) WITH CHECK (true);

-- =========================================================
-- SEED EXISTING PRODUCTS INTO SUPABASE
-- =========================================================
INSERT INTO public.products (slug, name, brand, image, images, description, benefits, ingredients, how_to_use, badge, featured)
VALUES
(
  'axis-y-glow-serum',
  'Dark Spot Correcting Glow Serum',
  'AXIS-Y',
  '/images/skincare/axis-y-glow-serum.jpg',
  '["/images/skincare/axis-y-glow-serum/slide-1.jpg", "/images/skincare/axis-y-glow-serum/slide-2.jpg", "/images/skincare/axis-y-glow-serum/slide-3.jpg", "/images/skincare/axis-y-glow-serum/slide-4.jpg", "/images/skincare/axis-y-glow-serum/slide-5.jpg"]'::jsonb,
  'A popular K-beauty treatment designed to brighten the complexion, fade dark spots, and provide deep hydration.',
  '["Corrects Dark Spots & Hyperpigmentation", "Brightens Complexion & Improves Radiance", "Provides Deep Hydration & Retains Moisture", "Soothing & Balancing without irritation"]'::jsonb,
  '["5% Niacinamide", "Plant-Derived Squalane", "Papaya & Sea Buckthorn Fruit Extracts", "Allantoin & Glutathione", "Sodium Hyaluronate"]'::jsonb,
  'Apply a small amount to the entire face or targeted problem areas. Gently pat until completely absorbed.',
  'Verified Authentic',
  true
),
(
  'anua-niacinamide',
  'Niacinamide 10% + TXA 4% Serum',
  'Anua',
  '/images/skincare/anua-niacinamide.jpg',
  '["/images/skincare/anua-niacinamide/slide-1.jpg", "/images/skincare/anua-niacinamide/slide-2.jpg", "/images/skincare/anua-niacinamide/slide-3.jpg", "/images/skincare/anua-niacinamide/slide-4.jpg"]'::jsonb,
  'A concentrated brightening treatment designed to address hyperpigmentation, dark spots, and uneven skin tone.',
  '["Targets Dark Spots & Stubborn Pigmentation", "Brightens Skin Tone for a Glass-Skin Finish", "Controls Oil & Minimizes Enlarged Pores", "Improves Overall Skin Texture"]'::jsonb,
  '["10% Niacinamide", "4% Tranexamic Acid (TXA)", "2% Arbutin", "Hyaluronic Acid Complex", "Centella Asiatica Extract & Ceramides"]'::jsonb,
  'Apply an appropriate amount to the skin. Use twice daily, and always follow up with sunscreen during the morning routine.',
  'Top Rated',
  true
),
(
  'medicube-kojic-acid',
  'Kojic Acid Turmeric Vita Capsule Cream',
  'Medicube',
  '/images/skincare/medicube-kojic-acid.jpg',
  '[]'::jsonb,
  'A brightening moisturizer designed to target hyperpigmentation and dullness with vitamin capsules that melt upon application.',
  '["Brightens & Evens Skin Tone", "Provides Deep, Multi-Layer Hydration", "Strengthens the Natural Skin Barrier", "Calms & Soothes Inflammation and Redness"]'::jsonb,
  '["Kojic Acid", "Turmeric Root Extract", "5% Niacinamide", "Vitamin C (Ascorbic Acid)", "8 Types of Hyaluronic Acid"]'::jsonb,
  'Apply a moderate amount as the final step of your skincare routine. Gently massage until the vitamin capsules fully melt.',
  'Guaranteed Original',
  true
),
(
  'anua-azelaic',
  'Azelaic Acid 10% + Hyaluron Soothing Serum',
  'Anua',
  '/images/skincare/anua-azelaic.jpg',
  '[]'::jsonb,
  'A targeted skincare treatment designed to address acne, redness, and uneven skin texture while providing deep hydration.',
  '["Treats Breakouts & Reduces Inflammation", "Relieves Redness and Calms Sensitivity", "Provides Deep Hydration Without Drying", "Offers Gentle Exfoliation for Smoother Texture"]'::jsonb,
  '["10% Azelaic Acid", "Hyaluronic Acid & Sodium Hyaluronate", "Centella Asiatica Extract", "Niacinamide", "Panthenol (Vitamin B5) & Ceramides"]'::jsonb,
  'Start slowly by using 1-2 drops, 2-3 times per week. Always use sunscreen during the day.',
  'Official Stockist',
  true
),
(
  'dr-althea-345',
  '345 Relief Cream',
  'Dr. Althea',
  '/images/skincare/dr-althea-345.jpg',
  '["/images/skincare/dr-althea-345/slide-1.jpg", "/images/skincare/dr-althea-345/slide-2.jpg", "/images/skincare/dr-althea-345/slide-3.jpg", "/images/skincare/dr-althea-345/slide-4.jpg", "/images/skincare/dr-althea-345/slide-5.jpg"]'::jsonb,
  'A dermatologist-developed gel-cream formulated for oily, combination, and acne-prone skin with 72-hour hydration.',
  '["Repairs & Strengthens Compromised Skin Barrier", "Significantly Reduces Redness and Sensitivity", "Provides 72-Hour Lightweight Hydration", "Regulates Oil Production & Fades Dark Spots"]'::jsonb,
  '["5% Panthenol (Vitamin B5)", "3 Types of Ceramides (NP, AS, NS)", "4 Types of Peptides", "Niacinamide", "Centella Asiatica & Tea Tree Leaf Water"]'::jsonb,
  'Apply an appropriate amount evenly over the face at the moisturizer step. Can be used morning and night.',
  '100% Genuine',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  image = EXCLUDED.image,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  benefits = EXCLUDED.benefits,
  ingredients = EXCLUDED.ingredients,
  how_to_use = EXCLUDED.how_to_use,
  badge = EXCLUDED.badge,
  featured = EXCLUDED.featured;

-- =========================================================
-- SEED EXISTING BLOGS INTO SUPABASE
-- =========================================================
INSERT INTO public.blogs (slug, title, excerpt, content, tag, author, image, date, read_time, featured)
VALUES
(
  'how-to-verify-any-cosmetic-product-in-60-seconds',
  'How to Verify Any Cosmetic Product in 60 Seconds',
  'A quick guide to using batch codes, QR scans, and packaging checks to instantly tell if your product is genuine or counterfeit.',
  '## Quick Verification Checklist

Counterfeit beauty products are flooding global marketplaces, but you can protect yourself with these four quick checks:

### 1. Inspect the Batch Code
Every genuine cosmetic product features a factory-printed batch code (usually stamped or dot-matrix printed) on both the outer carton and the bottom of the bottle or tube.
- Ensure the batch code on the box matches the batch code on the bottle.
- Use an online batch code checker to verify the manufacturing date and shelf life.

### 2. Verify Holograms & Tamper Seals
Legitimate brands use specialized holographic security seals with microtext. Counterfeits often use cheap silver stickers without dynamic light refraction.

### 3. Texture, Color & Scent Analysis
Original formulas have consistent viscosity and subtle fragrance profiles. If a serum feels watery, excessively sticky, or smells strongly of chemical alcohol or metallic perfume, stop using it immediately.

### 4. Use TrueOriginalShop Verification
Scan your packaging, barcode, and batch code with our AI-powered verification tool to check against official manufacturer databases.',
  'GUIDE',
  'TrueOriginal Research Team',
  '/images/skincare/axis-y-glow-serum.jpg',
  'June 5, 2025',
  '4 min read',
  true
),
(
  'the-hidden-dangers-of-fake-sunscreen',
  'The Hidden Dangers of Fake Sunscreen',
  'Counterfeit sunscreens offer zero UV protection while exposing your skin to harmful chemicals. Here is what to watch out for.',
  '## Why Counterfeit Sunscreens Are Dangerous

Unlike fake luxury apparel or accessories, counterfeit skincare poses direct, severe health risks. Sunscreens are categorized as over-the-counter drugs in many jurisdictions for good reason.

### Zero UV Protection
Lab tests on intercepted counterfeit sunscreens have repeatedly revealed SPF ratings below 5, despite labels claiming SPF 50+ PA++++. Applying fake sunscreen gives a false sense of security while allowing deep UVA/UVB damage.

### Harmful Contaminants
Counterfeit labs operate in unsanitary environments without safety regulations. Intercepted batches have tested positive for:
- Heavy metals like lead, mercury, and arsenic
- Undisclosed industrial chemical binders
- Bacterial and microbial contamination

### How to Spot Fake Sunscreens
1. Packaging Fonts & Alignments: Look for fuzzy printing, typos in ingredient lists, or missing PA designations.
2. Cap and Dispenser Quality: Authentic brands use precise injection molding. Fake caps often leak or fit loosely.
3. Price Discrepancy: If a premium $25 sunscreen is listed for $6 on an unverified marketplace, it is almost certainly counterfeit.',
  'SAFETY',
  'Dr. Sarah Lin (Dermatology Specialist)',
  '/images/skincare/anua-niacinamide.jpg',
  'May 28, 2025',
  '5 min read',
  true
),
(
  'top-5-most-counterfeited-beauty-brands-in-2025',
  'Top 5 Most Counterfeited Beauty Brands in 2025',
  'From K-Beauty bestsellers to viral cult favorites, learn which brands are most targeted by counterfeiters.',
  '## High-Target Skincare Brands in 2025

The explosion of social media skincare trends has made viral products the top targets for counterfeit operations. Here are the 5 brands currently experiencing the highest rates of fake replicas:

1. AXIS-Y: The Dark Spot Correcting Glow Serum has thousands of unauthorized knockoffs across third-party marketplaces. Look for the authentic green tint and pump mechanism.
2. Anua: The Heartleaf 77% Soothing Toner and Niacinamide + TXA Serums. Replicas often use diluted water solutions with synthetic scent additives.
3. Medicube: Collagen and Kojic Acid lines. Genuine packaging features crisp metallic embossing and distinct QR authentication.
4. Dr. Althea: The 345 Relief Cream. Original tubes have precise crimp markings and specific consistency.
5. Beauty of Joseon: Relief Sun and Glow Serums. Authentic bottles feature distinct matte finishes and correct hangul typography.

Always purchase directly from verified stockists or confirm your batch codes before applying new products.',
  'RESEARCH',
  'TrueOriginal Intelligence Lab',
  '/images/skincare/medicube-kojic-acid.jpg',
  'May 15, 2025',
  '6 min read',
  true
),
(
  'why-fake-serums-can-damage-your-skin-permanently',
  'Why Fake Serums Can Damage Your Skin Permanently',
  'Counterfeit serums often contain undisclosed acids and heavy metals that cause long-term scarring and pigmentation issues.',
  '## The Biological Impact of Counterfeit Serums

Active serums (such as Vitamin C, Niacinamide, Retinol, and chemical exfoliants) rely on precise pH balances and stable formulations. When counterfeiters mimic these formulas, dangerous shortcuts are taken.

### 1. Acid Burns & Compromised Skin Barriers
Uncontrolled acid concentrations in fake exfoliants can cause chemical burns, leading to permanent hyperpigmentation and post-inflammatory erythema (PIE).

### 2. Contact Dermatitis & Allergic Sensitization
Unknown fillers, industrial fragrances, and unrefined solvents trigger acute allergic reactions, intense swelling, and chronic eczema flare-ups.

### 3. Severe Microbial Infections
Without proper pharmaceutical-grade preservatives, fake serums foster fungal and bacterial proliferation, leading to deep cystic breakouts and facial cellulitis.

### What to Do If You Suspect a Fake Product
- Wash immediately with lukewarm water and a gentle, neutral cleanser.
- Discontinue use and document the product batch code and purchase receipt.
- Consult a dermatologist if redness, burning, or swelling persists.',
  'HEALTH',
  'Clinical Skincare Advisory',
  '/images/skincare/anua-azelaic.jpg',
  'May 2, 2025',
  '4 min read',
  false
),
(
  'buying-cosmetics-online-a-complete-safety-checklist',
  'Buying Cosmetics Online: A Complete Safety Checklist',
  'Follow this checklist before purchasing any beauty product from an online marketplace to protect yourself from scams.',
  '## Safe Online Shopping Guide

Online shopping offers incredible convenience, but open third-party seller platforms make it easy for unauthorized counterfeiters to mix fake inventory with genuine products.

### Pre-Purchase Checklist
- Check the Seller Profile: Is it "Sold & Shipped by Brand" or an unverified third-party merchant?
- Scrutinize Reviews with Photos: Look for customer photos showing misprinted labels, broken seals, or strange textures.
- Beware of "Too Good to Be True" Discounts: A 70% discount on a current bestseller is almost always counterfeit stock.
- Check Return Policies: Legitimate authorized retailers guarantee authenticity and accept returns on defective items.

### Post-Delivery Checklist
- Inspect outer carton seals and barcode integrity.
- Compare tube weight, cap tightness, and font thickness against an authentic sample.
- Perform a 24-hour patch test behind your ear or inner forearm before applying to your face.',
  'TIPS',
  'TrueOriginal Team',
  '/images/skincare/dr-althea-345.jpg',
  'April 20, 2025',
  '3 min read',
  false
),
(
  'how-counterfeit-cosmetics-enter-the-market',
  'How Counterfeit Cosmetics Enter the Market',
  'An inside look at how fake beauty products are manufactured, distributed, and sold through seemingly legitimate channels.',
  '## The Supply Chain of Fake Cosmetics

Understanding how counterfeit cosmetics reach consumer shelves helps shoppers recognize suspicious patterns in retail and online channels.

### 1. Commingled Inventory Warehouses
Many massive fulfillment centers store inventory from multiple third-party sellers in unified bins. Even if you order from a legitimate storefront, commingling can result in receiving counterfeit items shipped from adjacent seller bins.

### 2. Lookalike Packaging Replication
Advanced packaging replication uses discarded original molds and high-resolution scans to duplicate outer boxes with 90%+ visual accuracy, while filling bottles with substandard chemical mixtures.

### 3. Social Media Marketplace Dropshipping
Counterfeiters leverage short-form video ads and temporary storefronts, shutting down before customer complaints and safety reports can trigger account bans.

### Protecting Your Household
Always purchase from authorized retailers, official brand websites, or verified stockists like TrueOriginalShop.',
  'INVESTIGATION',
  'TrueOriginal Investigation Desk',
  NULL,
  'April 8, 2025',
  '7 min read',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tag = EXCLUDED.tag,
  author = EXCLUDED.author,
  image = EXCLUDED.image,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  featured = EXCLUDED.featured;
