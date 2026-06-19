export interface Product {
  slug: string;
  name: string;
  brand: string;
  image: string;
  images?: string[];
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
  image: string;
  images?: string[];
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
}
