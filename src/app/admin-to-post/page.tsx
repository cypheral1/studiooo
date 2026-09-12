"use client";

import { useEffect, useState, useRef } from "react";
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
  Tag,
  Film,
  Upload,
  Video,
  CheckCircle2,
  Play,
  Filter,
  Star,
  Sparkles,
  X,
} from "lucide-react";
import type { Product, Category, ShowcaseVideo } from "@/types/product";

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
  category: "Skincare",
  description: "",
  benefits: "",
  ingredients: "",
  howToUse: "",
  badge: "Verified Authentic",
  featured: true,
  images: [] as string[],
  videos: [] as string[],
};

const emptyVideoForm = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  category: "Skincare",
  videoUrl: "",
  youtubeId: "",
  channelUrl: "",
  result: "",
  featured: false,
};

export default function AdminPanelPage() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Tabs
  const [tab, setTab] = useState<"products" | "categories" | "videos" | "admins">("products");

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<ShowcaseVideo[]>([]);
  const [admins, setAdmins] = useState<AdminRecord[]>([]);

  // Filter state for products list
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Product Form State
  const [form, setForm] = useState(emptyProductForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // Video Form State
  const [videoForm, setVideoForm] = useState(emptyVideoForm);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // Custom manual URL input states
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [customVideoUrl, setCustomVideoUrl] = useState("");

  // Categories quick add
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [quickCategoryOpen, setQuickCategoryOpen] = useState(false);
  const [quickCategoryName, setQuickCategoryName] = useState("");

  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  // Uploading state
  const [uploadingImagesCount, setUploadingImagesCount] = useState<number>(0);
  const [uploadingVideosCount, setUploadingVideosCount] = useState<number>(0);

  const multiImageInputRef = useRef<HTMLInputElement>(null);
  const multiVideoInputRef = useRef<HTMLInputElement>(null);
  const showcaseVideoInputRef = useRef<HTMLInputElement>(null);

  const loadSession = async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
        await Promise.all([loadProducts(), loadCategories(), loadVideos()]);
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
      console.error(e);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadVideos = async () => {
    try {
      const res = await fetch("/api/admin/videos");
      if (res.ok) {
        const data = await res.json();
        setVideos(data.videos || []);
      }
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      setAdmin(data.admin);
      setLoginForm({ username: "", password: "" });
      await Promise.all([loadProducts(), loadCategories(), loadVideos()]);
      if (data.admin.role === "superadmin") await loadAdmins();
    } else {
      setLoginError(data.error || "Login failed");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAdmin(null);
    setProducts([]);
    setCategories([]);
    setVideos([]);
    setAdmins([]);
    setForm(emptyProductForm);
    setEditingSlug(null);
  };

  // Upload multiple image files from device
  const handleMultipleImagesUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingImagesCount(files.length);
    setStatus("");

    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", form.name || "products");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error("Image upload failed for file:", file.name, err);
      }
    }

    if (uploadedUrls.length > 0) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      setStatus(`Successfully uploaded ${uploadedUrls.length} image(s) from device!`);
    } else {
      setStatus("Failed to upload images");
    }
    setUploadingImagesCount(0);
  };

  // Upload multiple video files from device
  const handleMultipleVideosUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingVideosCount(files.length);
    setStatus("");

    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "product-videos");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error("Video upload failed for file:", file.name, err);
      }
    }

    if (uploadedUrls.length > 0) {
      setForm((prev) => ({
        ...prev,
        videos: [...prev.videos, ...uploadedUrls],
      }));
      setStatus(`Successfully uploaded ${uploadedUrls.length} video(s) from device!`);
    } else {
      setStatus("Failed to upload videos");
    }
    setUploadingVideosCount(0);
  };

  // Add custom image URL(s) - supports single or multiple URLs separated by newlines, commas, or spaces
  const handleAddCustomImageUrl = () => {
    if (!customImageUrl.trim()) return;
    // Extract all URLs (split by newline, comma, or whitespace)
    const rawTokens = customImageUrl
      .split(/[\n,\s]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0 && (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/")));

    if (rawTokens.length > 0) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...rawTokens],
      }));
      setStatus(`Added ${rawTokens.length} image URL(s)!`);
      setCustomImageUrl("");
    } else {
      // If no http prefix was found, still add the single string if valid
      const single = customImageUrl.trim();
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, single],
      }));
      setStatus("Added 1 image URL!");
      setCustomImageUrl("");
    }
  };

  // Add custom video URL(s) - supports single or multiple URLs
  const handleAddCustomVideoUrl = () => {
    if (!customVideoUrl.trim()) return;
    const rawTokens = customVideoUrl
      .split(/[\n,\s]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0 && (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/")));

    if (rawTokens.length > 0) {
      setForm((prev) => ({
        ...prev,
        videos: [...prev.videos, ...rawTokens],
      }));
      setStatus(`Added ${rawTokens.length} video URL(s)!`);
      setCustomVideoUrl("");
    } else {
      const single = customVideoUrl.trim();
      setForm((prev) => ({
        ...prev,
        videos: [...prev.videos, single],
      }));
      setStatus("Added 1 video URL!");
      setCustomVideoUrl("");
    }
  };

  // Set an image as cover/main (moves to index 0)
  const handleSetCoverImage = (index: number) => {
    if (index <= 0 || index >= form.images.length) return;
    const target = form.images[index];
    const rest = form.images.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      images: [target, ...rest],
    }));
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Remove video
  const handleRemoveVideo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  // Save Product (Create or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (form.images.length === 0) {
      setStatus("Please upload or add at least one product image");
      return;
    }

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category || "Skincare",
      badge: form.badge || "Verified Authentic",
      featured: form.featured,
      description: form.description.trim(),
      benefits: form.benefits.split("\n").filter(Boolean),
      ingredients: form.ingredients.split("\n").filter(Boolean),
      howToUse: form.howToUse.trim(),
      image: form.images[0], // primary cover image
      images: form.images,
      video: form.videos[0] || undefined,
      videos: form.videos.length > 0 ? form.videos : undefined,
    };

    const res = await fetch("/api/admin/products", {
      method: editingSlug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingSlug ? { slug: editingSlug, ...payload } : payload),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      setStatus(editingSlug ? "Product updated successfully" : "Product post published successfully!");
      setForm(emptyProductForm);
      setEditingSlug(null);
      await loadProducts();
    } else {
      setStatus(data.error || "Could not save product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingSlug(product.slug);
    const existingImages = product.images?.length
      ? product.images
      : product.image
      ? [product.image]
      : [];
    const existingVideos = product.videos?.length
      ? product.videos
      : product.video
      ? [product.video]
      : [];

    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category || "Skincare",
      description: product.description,
      benefits: product.benefits.join("\n"),
      ingredients: product.ingredients.join("\n"),
      howToUse: product.howToUse,
      badge: product.badge || "Verified Authentic",
      featured: product.featured !== false,
      images: existingImages,
      videos: existingVideos,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setStatus("Product deleted");
      if (editingSlug === slug) {
        setEditingSlug(null);
        setForm(emptyProductForm);
      }
      await loadProducts();
    } else {
      setStatus(data.error || "Delete failed");
    }
  };

  // Add Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName, description: newCategoryDesc }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setCategories(data.categories);
      setNewCategoryName("");
      setNewCategoryDesc("");
      setStatus("Category added successfully");
    } else {
      setStatus(data.error || "Could not add category");
    }
  };

  // Quick add category inline inside product form
  const handleQuickAddCategory = async () => {
    if (!quickCategoryName.trim()) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: quickCategoryName }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setCategories(data.categories);
      setForm((prev) => ({ ...prev, category: quickCategoryName.trim() }));
      setQuickCategoryName("");
      setQuickCategoryOpen(false);
      setStatus(`Added and selected "${quickCategoryName.trim()}"`);
    } else {
      setStatus(data.error || "Could not add category");
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Existing products under this category will keep their label.`)) return;
    const res = await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setCategories(data.categories);
      setStatus("Category deleted");
    } else {
      setStatus(data.error || "Delete failed");
    }
  };

  // Save Showcase Video
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: videoForm.title,
      subtitle: videoForm.subtitle,
      description: videoForm.description,
      category: videoForm.category,
      videoUrl: videoForm.videoUrl,
      youtubeId: videoForm.youtubeId,
      channelUrl: videoForm.channelUrl,
      result: videoForm.result,
      featured: videoForm.featured,
      ...(editingVideoId ? { id: editingVideoId } : {}),
    };

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setVideos(data.videos);
      setVideoForm(emptyVideoForm);
      setEditingVideoId(null);
      setStatus("Video showcase item saved!");
    } else {
      setStatus(data.error || "Could not save video");
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Delete this video item?")) return;
    const res = await fetch("/api/admin/videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setVideos(data.videos);
      setStatus("Video deleted");
    } else {
      setStatus(data.error || "Delete failed");
    }
  };

  // Admin users management
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
      setStatus("Admin added successfully");
    } else {
      setStatus(data.error || "Could not add admin");
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
      setStatus("Admin removed");
    } else {
      setStatus(data.error || "Could not remove admin");
    }
  };

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
        <div className="glass-card w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto text-[var(--cinematic-cyan)] mb-4 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
            <h1 className="text-2xl font-black uppercase tracking-wide">ADMIN PANEL</h1>
            <p className="text-sm text-[var(--cinematic-text-secondary)] mt-2">
              Sign in to manage products, categories & media for TrueOriginalShop
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
                className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)]"
                placeholder="admin or trueoriginalshopadmin"
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
                className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)]"
                placeholder="••••••••••••"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-500 font-medium">{loginError}</p>}
            <button type="submit" disabled={loginLoading} className="w-full btn-gradient py-3 rounded-xl font-bold uppercase tracking-wider">
              {loginLoading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter === "all") return true;
    return (p.category || "skincare").toLowerCase() === selectedCategoryFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--cinematic-bg)" }}>
      {/* Top Navbar */}
      <header className="glass border-b border-[var(--cinematic-border)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[var(--cinematic-cyan)] to-[var(--cinematic-pink)] flex items-center justify-center font-black text-white text-base">
              TO
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">TrueOriginalShop</p>
              <h1 className="text-lg font-black uppercase tracking-wide">ADMIN DASHBOARD</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--cinematic-text-secondary)] hidden sm:inline bg-white/40 px-3 py-1.5 rounded-lg border border-black/5">
              👤 <strong className="text-[var(--cinematic-text)]">{admin.username}</strong> ({admin.role})
            </span>
            <button
              onClick={handleLogout}
              className="glass-card hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/30 p-2 rounded-2xl border border-black/5 w-max max-w-full">
          <button
            onClick={() => setTab("products")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              tab === "products" ? "btn-gradient shadow-md scale-105" : "hover:bg-white/50 text-[var(--cinematic-text)]"
            }`}
          >
            <Package className="h-4 w-4" /> Products ({products.length})
          </button>
          <button
            onClick={() => setTab("categories")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              tab === "categories" ? "btn-gradient shadow-md scale-105" : "hover:bg-white/50 text-[var(--cinematic-text)]"
            }`}
          >
            <Tag className="h-4 w-4" /> Categories ({categories.length})
          </button>
          <button
            onClick={() => setTab("videos")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              tab === "videos" ? "btn-gradient shadow-md scale-105" : "hover:bg-white/50 text-[var(--cinematic-text)]"
            }`}
          >
            <Film className="h-4 w-4" /> Video Showcase ({videos.length})
          </button>
          {admin.role === "superadmin" && (
            <button
              onClick={() => setTab("admins")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                tab === "admins" ? "btn-gradient shadow-md scale-105" : "hover:bg-white/50 text-[var(--cinematic-text)]"
              }`}
            >
              <Users className="h-4 w-4" /> Admins ({admins.length})
            </button>
          )}
        </div>

        {/* Global status alert banner */}
        {status && (
          <div className="mb-6 glass-card rounded-2xl px-5 py-3 text-sm text-[var(--cinematic-text)] border border-[var(--cinematic-cyan)]/30 flex items-center justify-between animate-fade-in shadow-md">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--cinematic-cyan)]" /> {status}
            </span>
            <button onClick={() => setStatus("")} className="text-xs opacity-60 hover:opacity-100 uppercase tracking-wider font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 1: PRODUCTS (Multiple Images & Multiple Videos Upload) */}
        {/* ============================================================ */}
        {tab === "products" && (
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            {/* Left: Product Form */}
            <form onSubmit={handleSaveProduct} className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-wide">
                    {editingSlug ? "✏️ Edit Product Post" : "✨ Create New Product Post"}
                  </h2>
                  <p className="text-xs text-[var(--cinematic-text-secondary)] mt-1">
                    Upload multiple images & videos, select category, and publish
                  </p>
                </div>
                {editingSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSlug(null);
                      setForm(emptyProductForm);
                    }}
                    className="text-xs uppercase tracking-widest text-[var(--cinematic-pink)] font-bold hover:underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Category Selector with Quick Add */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-[var(--cinematic-cyan)]" /> Product Category <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setQuickCategoryOpen(!quickCategoryOpen)}
                    className="text-[11px] font-bold text-[var(--cinematic-cyan)] hover:underline flex items-center gap-1 uppercase"
                  >
                    <Plus className="h-3 w-3" /> {quickCategoryOpen ? "Close" : "New Category"}
                  </button>
                </div>

                {quickCategoryOpen && (
                  <div className="mb-3 p-3 rounded-xl bg-white/70 border border-[var(--cinematic-cyan)]/40 flex gap-2 animate-fade-in">
                    <input
                      type="text"
                      placeholder="e.g. Eye Care, Lip Care..."
                      value={quickCategoryName}
                      onChange={(e) => setQuickCategoryName(e.target.value)}
                      className="flex-1 bg-white px-3 py-2 rounded-lg text-xs outline-none border border-black/10"
                    />
                    <button
                      type="button"
                      onClick={handleQuickAddCategory}
                      className="btn-gradient px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Add & Select
                    </button>
                  </div>
                )}

                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)]"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  {categories.length === 0 && (
                    <>
                      <option value="Skincare">Skincare</option>
                      <option value="Eye Care">Eye Care</option>
                      <option value="Serum">Serum</option>
                      <option value="Sunscreen">Sunscreen</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Lip Care">Lip Care</option>
                      <option value="Haircare">Haircare</option>
                    </>
                  )}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Product Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="e.g. Retinol Eye Cream" />
                <Field label="Brand *" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} required placeholder="e.g. Beauty of Joseon" />
              </div>

              <Field
                label="Badge Label"
                value={form.badge}
                onChange={(v) => setForm({ ...form, badge: v })}
                placeholder="Verified Authentic, Top Rated, 100% Genuine"
              />

              <TextArea
                label="Description *"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
                required
                placeholder="Detailed description of the product benefits, authenticity markers, and texture..."
              />
              <TextArea
                label="Key Benefits (one per line)"
                value={form.benefits}
                onChange={(v) => setForm({ ...form, benefits: v })}
                rows={3}
                placeholder="Reduces dark circles & puffiness&#10;Strengthens skin barrier&#10;Hydrates deeply without greasiness"
              />
              <TextArea
                label="Core Ingredients (one per line)"
                value={form.ingredients}
                onChange={(v) => setForm({ ...form, ingredients: v })}
                rows={3}
                placeholder="Ginseng Root Extract&#10;Retinal (Vitamin A)&#10;Niacinamide&#10;Hyaluronic Acid"
              />
              <TextArea
                label="How to Use"
                value={form.howToUse}
                onChange={(v) => setForm({ ...form, howToUse: v })}
                rows={2}
                placeholder="After cleansing and toning, pump 1-2 times and gently pat around the eye area."
              />

              <label className="flex items-center gap-3 text-sm font-medium bg-white/40 p-3 rounded-xl border border-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded accent-[var(--cinematic-cyan)]"
                />
                Show in Where To Buy & Showcase carousels
              </label>

              {/* ========================================================================= */}
              {/* MULTIPLE IMAGES UPLOAD SECTION */}
              {/* ========================================================================= */}
              <div className="border-t border-black/10 pt-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[var(--cinematic-cyan)]" /> Product Images ({form.images.length}) <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-[var(--cinematic-text-secondary)]">
                      Upload multiple images at once from device or paste image URLs. The 1st image is the <strong>Cover Image</strong>.
                    </p>
                  </div>

                  {/* Multi-image device file picker */}
                  <input
                    type="file"
                    ref={multiImageInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleMultipleImagesUpload(e.target.files)}
                  />
                  <button
                    type="button"
                    onClick={() => multiImageInputRef.current?.click()}
                    disabled={uploadingImagesCount > 0}
                    className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    {uploadingImagesCount > 0 ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading ({uploadingImagesCount})...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" /> Upload Multiple Images
                      </>
                    )}
                  </button>
                </div>

                {/* Paste image URL(s) option */}
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2 items-center">
                    <LinkIcon className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                    <input
                      type="text"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomImageUrl();
                        }
                      }}
                      placeholder="Paste single or multiple image URLs (space, comma, or newline separated)"
                      className="flex-1 rounded-xl bg-white/70 border border-black/10 px-3 py-2 text-xs outline-none focus:border-[var(--cinematic-cyan)]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomImageUrl}
                    className="glass-card hover:bg-white px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[var(--cinematic-cyan)] shrink-0 border border-[var(--cinematic-cyan)]/30"
                  >
                    Add URL(s)
                  </button>
                </div>

                {/* Uploaded Images Gallery Grid */}
                {form.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white/30 p-3 rounded-2xl border border-black/5">
                    {form.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative group rounded-xl overflow-hidden border-2 bg-white/60 shadow-sm transition-all ${
                          idx === 0
                            ? "border-[var(--cinematic-cyan)] ring-2 ring-[var(--cinematic-cyan)]/40"
                            : "border-black/10 hover:border-black/30"
                        }`}
                      >
                        <div className="aspect-square w-full relative">
                          <img
                            src={imgUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/200x200?text=Invalid+Image";
                            }}
                          />
                        </div>

                        {/* Top badges */}
                        <div className="absolute top-1.5 left-1.5 z-10">
                          {idx === 0 ? (
                            <span className="bg-[var(--cinematic-cyan)] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                              <Star className="h-2.5 w-2.5 fill-black" /> Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              title="Make Cover Image"
                              className="bg-black/60 hover:bg-[var(--cinematic-cyan)] hover:text-black text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors opacity-80 hover:opacity-100"
                            >
                              Set Cover
                            </button>
                          )}
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title="Remove image"
                          className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => multiImageInputRef.current?.click()}
                    className="border-2 border-dashed border-black/20 hover:border-[var(--cinematic-cyan)] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/20 hover:bg-white/40"
                  >
                    <Upload className="h-8 w-8 mx-auto text-[var(--cinematic-cyan)] mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--cinematic-text)]">
                      Click to choose & upload multiple images from device
                    </p>
                    <p className="text-[11px] text-[var(--cinematic-text-secondary)] mt-1">
                      Supports JPG, PNG, WEBP (Batch selection enabled)
                    </p>
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* MULTIPLE VIDEOS UPLOAD SECTION */}
              {/* ========================================================================= */}
              <div className="border-t border-black/10 pt-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] flex items-center gap-1.5">
                      <Video className="h-4 w-4 text-[var(--cinematic-pink)]" /> Product Videos ({form.videos.length})
                    </label>
                    <p className="text-[11px] text-[var(--cinematic-text-secondary)]">
                      Upload video files (MP4, WebM, MOV up to 100MB) from device or attach YouTube links
                    </p>
                  </div>

                  {/* Multi-video device file picker */}
                  <input
                    type="file"
                    ref={multiVideoInputRef}
                    multiple
                    accept="video/mp4,video/webm,video/quicktime,video/ogg,video/m4v"
                    className="hidden"
                    onChange={(e) => handleMultipleVideosUpload(e.target.files)}
                  />
                  <button
                    type="button"
                    onClick={() => multiVideoInputRef.current?.click()}
                    disabled={uploadingVideosCount > 0}
                    className="glass-card hover:bg-white/80 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[var(--cinematic-pink)]/40 text-[var(--cinematic-pink)] shadow-sm"
                  >
                    {uploadingVideosCount > 0 ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading ({uploadingVideosCount})...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" /> Upload Device Videos
                      </>
                    )}
                  </button>
                </div>

                {/* Paste video / YouTube URL(s) option */}
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2 items-center">
                    <Video className="h-4 w-4 shrink-0 text-[var(--cinematic-pink)]" />
                    <input
                      type="text"
                      value={customVideoUrl}
                      onChange={(e) => setCustomVideoUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomVideoUrl();
                        }
                      }}
                      placeholder="Paste single or multiple video/YouTube URLs (space, comma, or newline separated)"
                      className="flex-1 rounded-xl bg-white/70 border border-black/10 px-3 py-2 text-xs outline-none focus:border-[var(--cinematic-pink)]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomVideoUrl}
                    className="glass-card hover:bg-white px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[var(--cinematic-pink)] shrink-0 border border-[var(--cinematic-pink)]/30"
                  >
                    Add Video Link(s)
                  </button>
                </div>

                {/* Attached Videos List */}
                {form.videos.length > 0 && (
                  <div className="space-y-3 bg-white/30 p-3 rounded-2xl border border-black/5">
                    {form.videos.map((vidUrl, idx) => {
                      const isYT = vidUrl.includes("youtube.com") || vidUrl.includes("youtu.be");

                      return (
                        <div key={idx} className="glass-card rounded-xl p-3 flex items-center justify-between gap-3 border border-white/40">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-20 h-14 rounded-lg bg-black/90 flex items-center justify-center shrink-0 overflow-hidden relative">
                              {isYT ? (
                                <Play className="h-6 w-6 text-red-500 fill-red-500" />
                              ) : (
                                <video src={vidUrl} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-[var(--cinematic-text)] truncate">
                                {isYT ? "YouTube Video Link" : `Uploaded Video ${idx + 1}`}
                              </p>
                              <p className="text-[10px] text-[var(--cinematic-text-secondary)] font-mono truncate">{vidUrl}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(idx)}
                            className="text-xs glass hover:bg-red-500/10 text-red-500 p-2 rounded-lg"
                            title="Remove video"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-wider shadow-lg">
                <Plus className="h-4 w-4" />
                {editingSlug ? "Save Product Changes" : "Publish Product Post"}
              </button>
            </form>

            {/* Right: Products List & Category Filtering */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/30 p-4 rounded-2xl border border-black/5">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wide">
                    All Products ({filteredProducts.length})
                  </h2>
                  <p className="text-xs text-[var(--cinematic-text-secondary)]">Filter and manage published posts</p>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-[var(--cinematic-cyan)] shrink-0" />
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="bg-white/80 border border-black/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none uppercase"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name.toLowerCase()}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center text-sm text-[var(--cinematic-text-secondary)]">
                  No products found under this category.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div key={product.slug} className="glass-card rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all border border-white/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-white/40 shrink-0 border border-black/5"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/100x100?text=Product";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--cinematic-cyan)]/15 text-[var(--cinematic-cyan)] border border-[var(--cinematic-cyan)]/30">
                            {product.category || "Skincare"}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--cinematic-pink)]">
                            {product.brand}
                          </span>
                          {((product.videos && product.videos.length > 0) || product.video) && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 flex items-center gap-1">
                              <Video className="h-2.5 w-2.5" /> Video
                            </span>
                          )}
                          {product.images && product.images.length > 1 && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600">
                              📷 {product.images.length} photos
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm truncate mt-1">{product.name}</h3>
                        <p className="text-xs text-[var(--cinematic-text-secondary)] truncate">{product.badge || "Verified Authentic"}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <a
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="text-xs glass hover:bg-white/80 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold"
                          >
                            <ExternalLink className="h-3 w-3 text-[var(--cinematic-cyan)]" /> View
                          </a>
                          <a
                            href={`https://wa.me/971583093948?text=${encodeURIComponent(
                              `Hi, I'm interested in the ${product.brand} ${product.name}.`
                            )}`}
                            target="_blank"
                            className="text-xs glass hover:bg-white/80 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold text-green-600"
                          >
                            <MessageCircle className="h-3 w-3" /> WA
                          </a>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-xs glass hover:bg-white/80 px-2.5 py-1 rounded-lg font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.slug)}
                            className="text-xs glass hover:bg-red-500/10 px-2.5 py-1 rounded-lg text-red-500 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CATEGORIES MANAGEMENT */}
        {/* ============================================================ */}
        {tab === "categories" && (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleAddCategory} className="glass-card rounded-3xl p-6 md:p-8 space-y-5 border border-white/20 shadow-xl">
              <h2 className="text-xl font-black uppercase tracking-wide flex items-center gap-2">
                <Tag className="h-5 w-5 text-[var(--cinematic-cyan)]" /> Add New Category
              </h2>
              <p className="text-xs text-[var(--cinematic-text-secondary)]">
                Create categories such as Skincare, Eye Care, Serum, Sunscreen, Makeup, etc.
              </p>

              <Field
                label="Category Name *"
                value={newCategoryName}
                onChange={setNewCategoryName}
                required
                placeholder="e.g. Eye Care"
              />
              <TextArea
                label="Description (Optional)"
                value={newCategoryDesc}
                onChange={setNewCategoryDesc}
                rows={3}
                placeholder="e.g. Creams, serums, and masks specifically formulated for the delicate eye area."
              />

              <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                <Plus className="h-4 w-4" /> Save Category
              </button>
            </form>

            {/* Categories List */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide">
                Current Categories ({categories.length})
              </h2>

              <div className="space-y-3">
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => (p.category || "skincare").toLowerCase() === cat.name.toLowerCase()
                  ).length;

                  return (
                    <div
                      key={cat.id}
                      className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4 border border-white/20 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">{cat.name}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/60 text-[var(--cinematic-cyan)] border border-black/5">
                            {count} {count === 1 ? "Product" : "Products"}
                          </span>
                        </div>
                        {cat.description && (
                          <p className="text-xs text-[var(--cinematic-text-secondary)] mt-1">{cat.description}</p>
                        )}
                        <p className="text-[10px] text-[var(--cinematic-text-secondary)] font-mono mt-1">slug: {cat.slug}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="text-xs glass hover:bg-red-500/10 px-3 py-2 rounded-xl text-red-500 flex items-center gap-1 font-bold shrink-0 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: VIDEOS & SHOWCASE MANAGEMENT */}
        {/* ============================================================ */}
        {tab === "videos" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <form onSubmit={handleSaveVideo} className="glass-card rounded-3xl p-6 md:p-8 space-y-5 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black uppercase tracking-wide flex items-center gap-2">
                  <Film className="h-5 w-5 text-[var(--cinematic-pink)]" />
                  {editingVideoId ? "Edit Showcase Video" : "Add Showcase Video"}
                </h2>
                {editingVideoId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideoId(null);
                      setVideoForm(emptyVideoForm);
                    }}
                    className="text-xs uppercase tracking-widest text-[var(--cinematic-pink)] font-bold hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <p className="text-xs text-[var(--cinematic-text-secondary)]">
                Upload video from your device or embed YouTube videos for the homepage & video masterclasses
              </p>

              <Field
                label="Video Title *"
                value={videoForm.title}
                onChange={(v) => setVideoForm({ ...videoForm, title: v })}
                required
                placeholder="e.g. Counterfeit Eye Serum Investigation"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Subtitle / Tag"
                  value={videoForm.subtitle || ""}
                  onChange={(v) => setVideoForm({ ...videoForm, subtitle: v })}
                  placeholder="e.g. INVESTIGATION • 2024"
                />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                    Category
                  </label>
                  <select
                    value={videoForm.category || "Skincare"}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-[var(--cinematic-cyan)]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    {categories.length === 0 && <option value="Skincare">Skincare</option>}
                  </select>
                </div>
              </div>

              <Field
                label="Result / Impact Badge"
                value={videoForm.result || ""}
                onChange={(v) => setVideoForm({ ...videoForm, result: v })}
                placeholder="e.g. 14,000+ FAKES REMOVED"
              />

              <TextArea
                label="Description"
                value={videoForm.description || ""}
                onChange={(v) => setVideoForm({ ...videoForm, description: v })}
                rows={3}
                placeholder="Summary of what the video covers or what was uncovered during the authenticity audit..."
              />

              {/* Video Source: Device Media Upload OR YouTube */}
              <div className="border-t border-black/10 pt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] block mb-2">
                    1. Direct Video File (Device Upload)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      ref={showcaseVideoInputRef}
                      accept="video/mp4,video/webm,video/quicktime,video/ogg,video/m4v"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append("folder", "showcase-videos");
                          const res = await fetch("/api/admin/upload", {
                            method: "POST",
                            body: formData,
                          });
                          const data = await res.json();
                          if (res.ok && data.success) {
                            setVideoForm((prev) => ({ ...prev, videoUrl: data.url, youtubeId: "" }));
                            setStatus("Showcase video uploaded from device!");
                          }
                        }
                      }}
                    />
                    <input
                      type="text"
                      value={videoForm.videoUrl || ""}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      placeholder="Upload file from device or enter video URL"
                      className="flex-1 rounded-xl bg-white/70 border border-black/10 px-4 py-2.5 text-xs outline-none focus:border-[var(--cinematic-cyan)]"
                    />
                    <button
                      type="button"
                      onClick={() => showcaseVideoInputRef.current?.click()}
                      className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                    >
                      <Upload className="h-3.5 w-3.5" /> Upload Video
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)] block mb-2">
                    2. OR YouTube ID / Short Link
                  </label>
                  <input
                    type="text"
                    value={videoForm.youtubeId || ""}
                    onChange={(e) => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                    placeholder="e.g. WQtkgwN3IZU or full https://youtube.com/shorts/..."
                    className="w-full rounded-xl bg-white/70 border border-black/10 px-4 py-2.5 text-xs outline-none focus:border-[var(--cinematic-cyan)]"
                  />
                </div>

                {/* Video Preview */}
                {videoForm.videoUrl && (
                  <div className="p-3 bg-black/80 rounded-2xl">
                    <p className="text-[10px] text-white/70 uppercase tracking-wider mb-2 font-bold flex items-center gap-1">
                      <Play className="h-3 w-3 text-[var(--cinematic-cyan)]" /> Live Device Video Preview:
                    </p>
                    <video src={videoForm.videoUrl} controls className="w-full max-h-52 rounded-xl object-contain" />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                <Plus className="h-4 w-4" />
                {editingVideoId ? "Update Video" : "Add Video to Showcase"}
              </button>
            </form>

            {/* Videos List */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide">
                Showcase Videos ({videos.length})
              </h2>

              <div className="space-y-3">
                {videos.map((vid) => (
                  <div key={vid.id} className="glass-card rounded-2xl p-4 flex gap-4 border border-white/20 shadow-md">
                    <div className="w-24 h-24 rounded-xl bg-black/80 flex items-center justify-center shrink-0 overflow-hidden relative">
                      {vid.videoUrl ? (
                        <video src={vid.videoUrl} className="w-full h-full object-cover opacity-80" />
                      ) : vid.youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${vid.youtubeId.replace(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#&?]*).*/, "$1")}/hqdefault.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Film className="h-8 w-8 text-white/40" />
                      )}
                      <Play className="h-6 w-6 text-white absolute fill-white/80 drop-shadow" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--cinematic-cyan)]/15 text-[var(--cinematic-cyan)]">
                          {vid.category || "Skincare"}
                        </span>
                        {vid.result && (
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-500/15 text-green-600">
                            {vid.result}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm truncate mt-1">{vid.title}</h3>
                      <p className="text-xs text-[var(--cinematic-text-secondary)] truncate">{vid.subtitle}</p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            setEditingVideoId(vid.id);
                            setVideoForm({
                              id: vid.id,
                              title: vid.title,
                              subtitle: vid.subtitle || "",
                              description: vid.description || "",
                              category: vid.category || "Skincare",
                              videoUrl: vid.videoUrl || "",
                              youtubeId: vid.youtubeId || "",
                              channelUrl: vid.channelUrl || "",
                              result: vid.result || "",
                              featured: vid.featured || false,
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-xs glass hover:bg-white/80 px-2.5 py-1 rounded-lg font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="text-xs glass hover:bg-red-500/10 px-2.5 py-1 rounded-lg text-red-500 flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: ADMIN ACCOUNTS (Superadmin only) */}
        {/* ============================================================ */}
        {tab === "admins" && admin.role === "superadmin" && (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleAddAdmin} className="glass-card rounded-3xl p-6 md:p-8 space-y-4 border border-white/20 shadow-xl">
              <h2 className="text-xl font-black uppercase flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[var(--cinematic-cyan)]" /> Add Admin User
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
              <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg">
                Create Admin Account
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-wide">Admin Accounts ({admins.length})</h2>
              {admins.map((item) => (
                <div key={item.username} className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4 border border-white/20 shadow-sm">
                  <div>
                    <p className="font-bold">{item.username}</p>
                    <p className="text-xs uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                      Role: {item.role}
                    </p>
                  </div>
                  {item.role !== "superadmin" && (
                    <button
                      onClick={() => handleRemoveAdmin(item.username)}
                      className="text-xs glass hover:bg-red-500/10 px-3 py-2 rounded-xl text-red-500 flex items-center gap-1 font-bold"
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
        className="mt-2 w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)]"
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
        className="mt-2 w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)] focus:ring-1 focus:ring-[var(--cinematic-cyan)]"
      />
    </div>
  );
}
