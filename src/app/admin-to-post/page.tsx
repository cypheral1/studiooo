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
  Link,
} from "lucide-react";
import type { Product } from "@/types/product";

interface AdminInfo {
  username: string;
  role: "superadmin" | "admin";
}

interface AdminRecord {
  username: string;
  role: "superadmin" | "admin";
  createdAt: string;
}

const emptyForm = {
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

export default function AdminPanelPage() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<"products" | "admins">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });

  const loadSession = async () => {
    const res = await fetch("/api/admin/me");
    if (res.ok) {
      const data = await res.json();
      setAdmin(data.admin);
      await loadProducts();
      if (data.admin.role === "superadmin") {
        await loadAdmins();
      }
    } else {
      setAdmin(null);
    }
    setLoading(false);
  };

  const loadProducts = async () => {
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || []);
    }
  };

  const loadAdmins = async () => {
    const res = await fetch("/api/admin/admins");
    if (res.ok) {
      const data = await res.json();
      setAdmins(data.admins || []);
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
      await loadProducts();
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
    setAdmins([]);
    setForm(emptyForm);
    setEditingSlug(null);
  };


  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const payload = {
      ...form,
      benefits: form.benefits.split("\n").filter(Boolean),
      ingredients: form.ingredients.split("\n").filter(Boolean),
      images: form.images.length ? form.images : undefined,
    };

    const res = await fetch("/api/admin/products", {
      method: editingSlug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingSlug ? { slug: editingSlug, ...payload } : payload),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      setStatus(editingSlug ? "Product updated" : "Product added");
      setForm(emptyForm);
      setEditingSlug(null);
      await loadProducts();
    } else {
      setStatus(data.error || "Could not save product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingSlug(product.slug);
    setForm({
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
    if (!confirm("Delete this product?")) return;
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
        setForm(emptyForm);
      }
      await loadProducts();
    } else {
      setStatus(data.error || "Delete failed");
    }
  };

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
      setStatus("Admin added");
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
        <div className="glass-card w-full max-w-md rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <Shield className="h-10 w-10 mx-auto text-[var(--cinematic-cyan)] mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-wide">Admin Panel</h1>
            <p className="text-sm text-[var(--cinematic-text-secondary)] mt-2">
              Sign in to manage products for TrueOriginalShop
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
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <button type="submit" disabled={loginLoading} className="w-full btn-gradient py-3 rounded-xl">
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--cinematic-bg)" }}>
      <header className="glass border-b border-[var(--cinematic-border)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">TrueOriginalShop</p>
            <h1 className="text-xl font-black uppercase">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--cinematic-text-secondary)] hidden sm:inline">
              {admin.username} · {admin.role}
            </span>
            <button onClick={handleLogout} className="glass-card px-3 py-2 rounded-xl text-sm flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setTab("products")}
            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              tab === "products" ? "btn-gradient" : "glass-card"
            }`}
          >
            <Package className="h-4 w-4" /> Products
          </button>
          {admin.role === "superadmin" && (
            <button
              onClick={() => setTab("admins")}
              className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                tab === "admins" ? "btn-gradient" : "glass-card"
              }`}
            >
              <Users className="h-4 w-4" /> Admins
            </button>
          )}
        </div>

        {status && (
          <div className="mb-6 glass-card rounded-xl px-4 py-3 text-sm text-[var(--cinematic-text)]">{status}</div>
        )}

        {tab === "products" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <form onSubmit={handleSaveProduct} className="glass-card rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-black uppercase">
                  {editingSlug ? "Edit Product" : "Add Product"}
                </h2>
                {editingSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSlug(null);
                      setForm(emptyForm);
                    }}
                    className="text-xs uppercase tracking-widest text-[var(--cinematic-text-secondary)]"
                  >
                    Cancel edit
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="Brand" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} required />
              </div>

              <Field
                label="Badge Label"
                value={form.badge}
                onChange={(v) => setForm({ ...form, badge: v })}
                placeholder="Verified Authentic"
              />

              <TextArea
                label="Description"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
                required
              />
              <TextArea
                label="Benefits (one per line)"
                value={form.benefits}
                onChange={(v) => setForm({ ...form, benefits: v })}
                rows={4}
              />
              <TextArea
                label="Ingredients (one per line)"
                value={form.ingredients}
                onChange={(v) => setForm({ ...form, ingredients: v })}
                rows={4}
              />
              <TextArea
                label="How to Use"
                value={form.howToUse}
                onChange={(v) => setForm({ ...form, howToUse: v })}
                rows={3}
              />

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4"
                />
                Show in Where To Buy carousel
              </label>

              {/* Main Image URL */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                  Main Image URL
                </label>
                <div className="mt-2 flex gap-2 items-center">
                  <Link className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://i.imgur.com/example.jpg"
                    className="flex-1 rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-amber-500/80 font-medium">
                  ⚠️ Must be a <strong>direct image link</strong> ending in .jpg / .png / .webp — not a webpage URL.
                  Right-click any image online → "Copy image address"
                </p>
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                    className="mt-2 w-24 h-24 rounded-xl object-cover border border-white/30"
                  />
                )}
              </div>

              {/* Gallery Images */}
              {/* Gallery Image URLs - 4 fixed slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                  Gallery Image URLs
                </label>
                <div className="mt-2 space-y-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-[var(--cinematic-text-secondary)] w-4 shrink-0">{i + 1}</span>
                      <Link className="h-4 w-4 shrink-0 text-[var(--cinematic-cyan)]" />
                      <input
                        type="url"
                        value={form.images[i] || ""}
                        onChange={(e) => {
                          const updated = [...form.images];
                          updated[i] = e.target.value;
                          // trim trailing empty slots
                          while (updated.length > 0 && !updated[updated.length - 1]) updated.pop();
                          setForm((prev) => ({ ...prev, images: updated }));
                        }}
                        placeholder={`Gallery image ${i + 1} URL`}
                        className="flex-1 rounded-xl bg-white/60 border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
                      />
                      {form.images[i] && (
                        <img
                          src={form.images[i]}
                          alt=""
                          onError={(e) => (e.currentTarget.style.opacity = "0.3")}
                          className="w-10 h-10 rounded-lg object-cover border border-white/30 shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full btn-gradient py-3 rounded-xl flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                {editingSlug ? "Update Product" : "Add Product"}
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-lg font-black uppercase">Current Products ({products.length})</h2>
              {products.map((product) => (
                <div key={product.slug} className="glass-card rounded-2xl p-4 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--cinematic-cyan)]">
                      {product.brand}
                    </p>
                    <h3 className="font-bold truncate">{product.name}</h3>
                    <p className="text-xs text-[var(--cinematic-text-secondary)] mt-1">{product.badge}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <a
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="text-xs glass px-2 py-1 rounded-lg flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> View
                      </a>
                      <a
                        href={`https://wa.me/971583093948?text=${encodeURIComponent(
                          `Hi, I'm interested in getting the best price for the ${product.brand} ${product.name}.`
                        )}`}
                        target="_blank"
                        className="text-xs glass px-2 py-1 rounded-lg flex items-center gap-1"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-xs glass px-2 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.slug)}
                        className="text-xs glass px-2 py-1 rounded-lg text-red-500 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "admins" && admin.role === "superadmin" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={handleAddAdmin} className="glass-card rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-black uppercase flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Add Admin
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
              <button type="submit" className="w-full btn-gradient py-3 rounded-xl">
                Create Admin
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-lg font-black uppercase">Admin Accounts</h2>
              {admins.map((item) => (
                <div key={item.username} className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold">{item.username}</p>
                    <p className="text-xs uppercase tracking-widest text-[var(--cinematic-text-secondary)]">
                      {item.role}
                    </p>
                  </div>
                  {item.role !== "superadmin" && (
                    <button
                      onClick={() => handleRemoveAdmin(item.username)}
                      className="text-xs glass px-3 py-2 rounded-lg text-red-500 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
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
        className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
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
        className="mt-2 w-full rounded-xl bg-white/60 border border-black/10 px-4 py-3 text-sm outline-none focus:border-[var(--cinematic-cyan)]"
      />
    </div>
  );
}


