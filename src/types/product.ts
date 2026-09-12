export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
}

export interface ShowcaseVideo {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  videoUrl?: string; // Direct uploaded device video or mp4 link
  youtubeId?: string; // YouTube ID or Short code
  channelUrl?: string;
  result?: string;
  category?: string;
  featured?: boolean;
  createdAt?: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category?: string;
  image: string;
  images?: string[];
  video?: string;
  videos?: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  badge?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  slug?: string;
  name: string;
  brand: string;
  category?: string;
  image: string;
  images?: string[];
  video?: string;
  videos?: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  badge?: string;
  featured?: boolean;
}

export interface SlideshowProduct {
  slug: string;
  name: string;
  brand: string;
  issue: string;
  image: string;
  category?: string;
}
