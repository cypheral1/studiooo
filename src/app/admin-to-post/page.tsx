"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  LogOut,
  Package,
  Plus,
  Shield,
  Trash2,
  UserPlus,
  Users,
  ExternalLink,
  MessageCircle,
  Link as LinkIcon,
  BookOpen,
  Edit3,
  Search,
  FileText,
  Clock,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Product } from "@/types/product";
import type { Blog } from "@/types/blog";

interface AdminInfo {
  username: string;
  role: "superadmin" | "admin";
}

interface AdminRecord {
  username: string;
  role: "superadmin" | "admin";
  createdAt: string;
}

const emptyProductForm = {
  name: "",
  brand: "",
  description: "",
  benefits: "",
  ingredients: "",
  howToUse: "",
  badge: "Verified Authentic",
  featured: true,
  image: "",
  images: [] as string[],
};

const emptyBlogForm = {
  title: "",
  slug: "",
  tag: "GUIDE",
  author: "TrueOriginal Team",
  readTime: "4 min read",
  excerpt: "",
  content: "",
  image: "",
  featured: true,
};

const BLOG_TAGS = [
  "GUIDE",
  "SAFETY",
  "RESEARCH",
  "HEALTH",
  "TIPS",
  "INVESTIGATION",
  "AUTHENTICITY",
  "NEWS",
];

export default function AdminPanelPage() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<"products" | "blogs" | "admins">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [admins, setAdmins] = useState<AdminRecord[]>([]);

  // Product State
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [editingProductSlug, setEditingProductSlug] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState("");

  // Blog State
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [blogSearch, setBlogSearch] = useState("");

  // Status message
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });

  const notify = (message: string, type: "success" | "error" = "success") => {
    setStatus({ message, type });
    setTimeout(() => {
      setStatus(null);
    }, 6000);
  };

  const loadSession = async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
        await Promise.all([loadProducts(), loadBlogs()]);
        if (data.admin.role === "superadmin") {
          await loadAdmins();
        }
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error("Failed to load products", e);
    }
  };

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (e) {
      console.error("Failed to load blogs", e);
    }
  };

  const loadAdmins = async () => {
    try {
      const res = await fetch("/api/admin/admins");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
      }
    } catch (e) {
      console.error("Failed to load admins", e);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAdmin(data.admin);
        setLoginForm({ username: "", password: "" });
        await Promise.all([loadProducts(), loadBlogs()]);
        if (data.admin.role === "superadmin") await loadAdmins();
        notify(`Welcome back, ${data.admin.username}!`);
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Connection error during login");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAdmin(null);
    setProducts([]);
    setBlogs([]);
    setAdmins([]);
    setProductForm(emptyProductForm);
    setBlogForm(emptyBlogForm);
    setEditingProductSlug(null);
    setEditingBlogSlug(null);
    setStatus(null);
  };

  // ================= PRODUCTS CRUD =================
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...productForm,
      benefits: productForm.benefits.split("\n").filter(Boolean),
      ingredients: productForm.ingredients.split("\n").filter(Boolean),
      images: productForm.images.filter(Boolean),
    };

    const res = await fetch("/api/admin/products", {
      method: editingProductSlug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingProductSlug ? { slug: editingProductSlug, ...payload } : payload
      ),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      notify(editingProductSlug ? "Product updated in database!" : "Product added to Supabase database!");
      setProductForm(emptyProductForm);
      setEditingProductSlug(null);
      await loadProducts();
    } else {
      notify(data.error || "Could not save product", "error");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductSlug(product.slug);
    setProductForm({
      name: product.name,
      brand: product.brand,
      description: product.description,
      benefits: product.benefits.join("\n"),
      ingredients: product.ingredients.join("\n"),
      howToUse: product.howToUse,
      badge: product.badge || "Verified Authentic",
      featured: product.featured !== false,
      image: product.image,
      images: product.images || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete product "${slug}"?`)) return;
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      notify("Product deleted successfully");
      if (editingProductSlug === slug) {
        setEditingProductSlug(null);
        setProductForm(emptyProductForm);
      }
      await loadProducts();
    } else {
      notify(data.error || "Delete failed", "error");
    }
  };

  // ================= BLOGS CRUD =================
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      notify("Blog title and content are required", "error");
      return;
    }

    const payload = {
      title: blogForm.title.trim(),
      slug: blogForm.slug.trim() || undefined,
      tag: blogForm.tag.trim() || "GUIDE",
      author: blogForm.author.trim() || "TrueOriginal Team",
      readTime: blogForm.readTime.trim() || "4 min read",
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      image: blogForm.image.trim() || undefined,
      featured: blogForm.featured,
    };

    const res = await fetch("/api/admin/blogs", {
      method: editingBlogSlug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingBlogSlug ? { ...payload, slug: editingBlogSlug } : payload
      ),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      notify(
        editingBlogSlug
          ? "Blog post updated in database!"
          : "New blog post published to Supabase database!"
      );
      setBlogForm(emptyBlogForm);
      setEditingBlogSlug(null);
      await loadBlogs();
    } else {
      notify(data.error || "Could not save blog post", "error");
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogSlug(blog.slug);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      tag: blog.tag || "GUIDE",
      author: blog.author || "TrueOriginal Team",
      readTime: blog.readTime || "4 min read",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      featured: blog.featured !== false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm(`Are you sure you want to remove the blog post "${slug}"?`)) return;
    const res = await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      notify("Blog post removed successfully");
      if (editingBlogSlug === slug) {
        setEditingBlogSlug(null);
        setBlogForm(emptyBlogForm);
      }
      await loadBlogs();
    } else {
      notify(data.error || "Failed to remove blog post", "error");
    }
  };

  // ================= ADMINS CRUD =================
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAdmins(data.admins);
      setNewAdmin({ username: "", password: "" });
      notify("New admin created");
    } else {
      notify(data.error || "Could not add admin", "error");
    }
  };

  const handleRemoveAdmin = async (username: string) => {
    if (!confirm(`Remove admin "${username}"?`)) return;
    const res = await fetch("/api/admin/admins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAdmins(data.admins);
      notify("Admin removed");
    } else {
      notify(data.error || "Could not remove admin", "error");
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.tag.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.slug.toLowerCase().includes(blogSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cinematic-bg)" }}>
        <Loader2 className="h-8 w-8 animate-spin text-[var(--cinematic-cyan)]" />
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cinematic-bg)" }}>
        <div className="glass-card w-full max-w-md rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <Shield className="h-10 w-10 mx-auto text-[var(--cinematic-cyan)] mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-wide">Admin Panel</h1>
            <p className="text-sm text-[var(--cinematic-text-secondary)] mt-2">
              Sign in to manage database products &amp; blogs
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                Username
              </label>
              <input
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
                required
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                {loginError}
              </p>
            )}
            <button type="submit" disabled={loginLoading} className="w-full btn-gradient py-3 rounded-xl">
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 text-white selection:bg-[var(--cinematic-cyan)] selection:text-black" style={{ background: "var(--cinematic-bg)" }}>
      {/* Header */}
      <header className="glass border-b border-[var(--cinematic-border)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-[var(--cinematic-cyan)]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">
                Supabase Connected
              </p>
              <h1 className="text-lg md:text-xl font-black uppercase tracking-tight">Admin Portal</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--cinematic-text-secondary)] hidden sm:inline px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <strong className="text-white">{admin.username}</strong> ({admin.role})
            </span>
            <button
              onClick={handleLogout}
              className="glass-card px-3 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-4 w-4 text-red-400" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setTab("products");
                setEditingBlogSlug(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                tab === "products" ? "btn-gradient shadow-lg" : "glass-card hover:bg-white/10"
              }`}
            >
              <Package className="h-4 w-4" /> Products ({products.length})
            </button>
            <button
              onClick={() => {
                setTab("blogs");
                setEditingProductSlug(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                tab === "blogs" ? "btn-gradient shadow-lg" : "glass-card hover:bg-white/10"
              }`}
            >
              <BookOpen className="h-4 w-4" /> Blogs ({blogs.length})
            </button>
            {admin.role === "superadmin" && (
              <button
                onClick={() => {
                  setTab("admins");
                  setEditingProductSlug(null);
                  setEditingBlogSlug(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  tab === "admins" ? "btn-gradient shadow-lg" : "glass-card hover:bg-white/10"
                }`}
              >
                <Users className="h-4 w-4" /> Admins ({admins.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="text-xs glass-card px-3 py-2 rounded-xl flex items-center gap-1.5 hover:text-[var(--cinematic-cyan)]"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View Website
            </a>
            <a
              href="/blog"
              target="_blank"
              className="text-xs glass-card px-3 py-2 rounded-xl flex items-center gap-1.5 hover:text-[var(--cinematic-cyan)]"
            >
              <BookOpen className="h-3.5 w-3.5" /> Public Blog
            </a>
          </div>
        </div>

        {/* Global Alert Notification */}
        {status && (
          <div
            className={`mb-6 rounded-2xl px-5 py-4 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border ${
              status.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            }`}
          >
            {status.type === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            )}
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        {/* ===================== PRODUCTS TAB ===================== */}
        {tab === "products" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <form onSubmit={handleSaveProduct} className="glass-card rounded-3xl p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">
                    Database Storage
                  </span>
                  <h2 className="text-xl font-black uppercase">
                    {editingProductSlug ? "Edit Product" : "Add New Product"}
                  </h2>
                </div>
                {editingProductSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProductSlug(null);
                      setProductForm(emptyProductForm);
                    }}
                    className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--cinematic-text-secondary)]"
                  >
                    Cancel edit
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Product Name"
                  value={productForm.name}
                  onChange={(v) => setProductForm({ ...productForm, name: v })}
                  placeholder="e.g. Dark Spot Correcting Serum"
                  required
                />
                <Field
                  label="Brand"
                  value={productForm.brand}
                  onChange={(v) => setProductForm({ ...productForm, brand: v })}
                  placeholder="e.g. AXIS-Y"
                  required
                />
              </div>

              <Field
                label="Badge Label"
                value={productForm.badge}
                onChange={(v) => setProductForm({ ...productForm, badge: v })}
                placeholder="Verified Authentic"
              />

              <TextArea
                label="Description"
                value={productForm.description}
                onChange={(v) => setProductForm({ ...productForm, description: v })}
                placeholder="Detailed summary of formula, authentic features, and usage benefits..."
                required
              />
              <TextArea
                label="Benefits (one per line)"
                value={productForm.benefits}
                onChange={(v) => setProductForm({ ...productForm, benefits: v })}
                placeholder="Corrects Dark Spots & Hyperpigmentation&#10;Deep 72-Hour Hydration"
                rows={4}
              />
              <TextArea
                label="Key Ingredients (one per line)"
                value={productForm.ingredients}
                onChange={(v) => setProductForm({ ...productForm, ingredients: v })}
                placeholder="5% Niacinamide&#10;Centella Asiatica Extract"
                rows={4}
              />
              <TextArea
                label="How to Use"
                value={productForm.howToUse}
                onChange={(v) => setProductForm({ ...productForm, howToUse: v })}
                placeholder="Apply 2-3 drops after toner. Gently pat until absorbed."
                rows={3}
              />

              <label className="flex items-center gap-3 text-sm cursor-pointer p-3 rounded-xl bg-white/5 border border-white/10">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="h-4 w-4 accent-[var(--cinematic-cyan)]"
                />
                <span className="font-semibold text-xs uppercase tracking-wider">
                  Show in Where To Buy carousel &amp; Featured lists
                </span>
              </label>

              {/* Main Image URL */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                  Main Image URL
                </label>
                <div className="mt-2 flex gap-2 items-center">
                  <LinkIcon className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://example.com/product.jpg or /images/skincare/..."
                    className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white"
                  />
                </div>
                {productForm.image && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <img
                      src={productForm.image}
                      alt="preview"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                      className="w-16 h-16 rounded-lg object-cover border border-white/20"
                    />
                    <div className="text-xs text-[var(--cinematic-text-secondary)]">
                      <p className="font-bold text-white">Image Preview</p>
                      <p className="truncate max-w-xs">{productForm.image}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Image URLs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                  Gallery Image URLs (Optional Slideshow Slots)
                </label>
                <div className="mt-2 space-y-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-[var(--cinematic-text-secondary)] w-4 shrink-0">
                        {i + 1}
                      </span>
                      <LinkIcon className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                      <input
                        type="url"
                        value={productForm.images[i] || ""}
                        onChange={(e) => {
                          const updated = [...productForm.images];
                          updated[i] = e.target.value;
                          while (updated.length > 0 && !updated[updated.length - 1]) updated.pop();
                          setProductForm((prev) => ({ ...prev, images: updated }));
                        }}
                        placeholder={`Gallery image ${i + 1} URL`}
                        className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Plus className="h-4 w-4" />
                {editingProductSlug ? "Save Product Changes" : "Publish Product to Supabase"}
              </button>
            </form>

            {/* Products List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-black uppercase">
                  Current Products ({products.length})
                </h2>
                <div className="relative w-48">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:border-[var(--cinematic-cyan)]"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="glass-card rounded-2xl p-4 flex gap-4 transition-all hover:border-[var(--cinematic-cyan)]/50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/skincare/axis-y-glow-serum.jpg";
                      }}
                      className="w-20 h-20 rounded-xl object-cover bg-white/10 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">
                        {product.brand}
                      </p>
                      <h3 className="font-bold text-sm truncate text-white">{product.name}</h3>
                      <p className="text-xs text-[var(--cinematic-text-secondary)] mt-0.5 truncate">
                        {product.badge} {product.featured && "· Featured"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <a
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="text-xs glass px-2.5 py-1 rounded-lg flex items-center gap-1 hover:text-[var(--cinematic-cyan)]"
                        >
                          <ExternalLink className="h-3 w-3" /> View
                        </a>
                        <a
                          href={`https://wa.me/971583093948?text=${encodeURIComponent(
                            `Hi, I'm interested in getting the best price for the ${product.brand} ${product.name}.`
                          )}`}
                          target="_blank"
                          className="text-xs glass px-2.5 py-1 rounded-lg flex items-center gap-1 hover:text-emerald-400"
                        >
                          <MessageCircle className="h-3 w-3" /> WhatsApp
                        </a>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-xs glass px-2.5 py-1 rounded-lg hover:text-[var(--cinematic-cyan)] flex items-center gap-1"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.slug)}
                          className="text-xs glass px-2.5 py-1 rounded-lg text-red-400 hover:bg-red-500/20 flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-center py-12 text-sm text-[var(--cinematic-text-secondary)]">
                    No products found matching "{productSearch}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== BLOGS TAB ===================== */}
        {tab === "blogs" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <form onSubmit={handleSaveBlog} className="glass-card rounded-3xl p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-pink)]">
                    Supabase Blog Manager
                  </span>
                  <h2 className="text-xl font-black uppercase">
                    {editingBlogSlug ? "Edit Blog Article" : "Write & Add New Blog"}
                  </h2>
                </div>
                {editingBlogSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlogSlug(null);
                      setBlogForm(emptyBlogForm);
                    }}
                    className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--cinematic-text-secondary)]"
                  >
                    Cancel edit
                  </button>
                )}
              </div>

              <Field
                label="Article Title"
                value={blogForm.title}
                onChange={(v) => setBlogForm({ ...blogForm, title: v })}
                placeholder="e.g. How to Verify Any Cosmetic Product in 60 Seconds"
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                    Category Tag
                  </label>
                  <select
                    value={blogForm.tag}
                    onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white"
                  >
                    {BLOG_TAGS.map((t) => (
                      <option key={t} value={t} className="bg-[#111] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Author / Credential"
                  value={blogForm.author}
                  onChange={(v) => setBlogForm({ ...blogForm, author: v })}
                  placeholder="e.g. TrueOriginal Research Team"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Read Time"
                  value={blogForm.readTime}
                  onChange={(v) => setBlogForm({ ...blogForm, readTime: v })}
                  placeholder="4 min read"
                />

                <Field
                  label="Custom URL Slug (Optional)"
                  value={blogForm.slug}
                  onChange={(v) => setBlogForm({ ...blogForm, slug: v })}
                  placeholder="auto-generated-from-title"
                />
              </div>

              <TextArea
                label="Excerpt / Quick Summary"
                value={blogForm.excerpt}
                onChange={(v) => setBlogForm({ ...blogForm, excerpt: v })}
                placeholder="A compelling 2-sentence summary that appears on blog cards and Google search results..."
                rows={2}
              />

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                  Cover Image URL (Optional)
                </label>
                <div className="mt-2 flex gap-2 items-center">
                  <LinkIcon className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                  <input
                    type="url"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="https://example.com/cover.jpg or /images/..."
                    className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white"
                  />
                </div>
                {blogForm.image && (
                  <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <img
                      src={blogForm.image}
                      alt="Cover Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-white/20"
                    />
                    <span className="text-xs text-[var(--cinematic-text-secondary)]">Cover Preview</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                    Article Full Content (Markdown Supported)
                  </label>
                  <span className="text-[10px] text-[var(--cinematic-text-secondary)]">
                    Supports ## Headings, lists (- item), **bold**
                  </span>
                </div>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="## Main Insights&#10;&#10;Write the complete article body here. You can use markdown headings and bullet points..."
                  rows={10}
                  required
                  className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm font-mono leading-relaxed outline-none focus:border-[var(--cinematic-cyan)] text-white"
                />
              </div>

              <label className="flex items-center gap-3 text-sm cursor-pointer p-3 rounded-xl bg-white/5 border border-white/10">
                <input
                  type="checkbox"
                  checked={blogForm.featured}
                  onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                  className="h-4 w-4 accent-[var(--cinematic-cyan)]"
                />
                <span className="font-semibold text-xs uppercase tracking-wider">
                  Highlight this blog as Featured Article
                </span>
              </label>

              <button
                type="submit"
                className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="h-4 w-4" />
                {editingBlogSlug ? "Update Blog Article" : "Publish Blog to Supabase"}
              </button>
            </form>

            {/* Blogs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-black uppercase">
                  Published Articles ({blogs.length})
                </h2>
                <div className="relative w-48">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:border-[var(--cinematic-cyan)]"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.slug}
                    className="glass-card rounded-2xl p-4 transition-all hover:border-[var(--cinematic-cyan)]/50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--cinematic-cyan)]/10 text-[var(--cinematic-cyan)] border border-[var(--cinematic-cyan)]/30">
                            {blog.tag}
                          </span>
                          <span className="text-[10px] text-[var(--cinematic-text-secondary)] flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {blog.readTime || "4 min"}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-[var(--cinematic-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-[11px] text-[var(--cinematic-text-secondary)]">
                        By {blog.author} · {blog.date}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="glass px-2.5 py-1 rounded-lg flex items-center gap-1 text-[var(--cinematic-cyan)] hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> View
                        </a>
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="glass px-2.5 py-1 rounded-lg hover:text-white flex items-center gap-1"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.slug)}
                          className="glass px-2.5 py-1 rounded-lg text-red-400 hover:bg-red-500/20 flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredBlogs.length === 0 && (
                  <p className="text-center py-12 text-sm text-[var(--cinematic-text-secondary)]">
                    No articles found matching "{blogSearch}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== ADMINS TAB ===================== */}
        {tab === "admins" && admin.role === "superadmin" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={handleAddAdmin} className="glass-card rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="text-lg font-black uppercase flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[var(--cinematic-cyan)]" /> Add New Administrator
              </h2>
              <Field
                label="Username"
                value={newAdmin.username}
                onChange={(v) => setNewAdmin({ ...newAdmin, username: v })}
                required
              />
              <Field
                label="Password"
                value={newAdmin.password}
                onChange={(v) => setNewAdmin({ ...newAdmin, password: v })}
                type="password"
                required
              />
              <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider">
                Create Admin Account
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-lg font-black uppercase">Active Admin Accounts</h2>
              {admins.map((item) => (
                <div
                  key={item.username}
                  className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-bold text-white">{item.username}</p>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--cinematic-cyan)]">
                      {item.role}
                    </p>
                  </div>
                  {item.role !== "superadmin" && (
                    <button
                      onClick={() => handleRemoveAdmin(item.username)}
                      className="text-xs glass px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] text-white leading-relaxed"
      />
    </div>
  );
}
