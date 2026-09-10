-- =========================================================
-- TrueOriginalShop Database Schema for Supabase
-- Run this script in the Supabase SQL Editor to initialize all tables
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
CREATE POLICY "Public can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable all product modifications" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Blogs: Public read, Anon/Service insert/update/delete
CREATE POLICY "Public can read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Enable all blog modifications" ON public.blogs FOR ALL USING (true) WITH CHECK (true);

-- Admins: Read and modify
CREATE POLICY "Enable admin operations" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- Subscribers: Allow insert and select
CREATE POLICY "Enable subscriber operations" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

-- Verifications: Allow insert and select
CREATE POLICY "Enable verification operations" ON public.verifications FOR ALL USING (true) WITH CHECK (true);
