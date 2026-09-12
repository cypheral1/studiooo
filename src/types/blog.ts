export interface Blog {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  author: string;
  image?: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogInput {
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  author?: string;
  image?: string;
  date?: string;
  readTime?: string;
  featured?: boolean;
}
