import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { CinematicNav } from "@/components/cinematic/nav";
import { CinematicFooter } from "@/components/cinematic/footer";
import { ShieldCheck, CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ShippingMarquee } from "@/components/cinematic/shipping-marquee";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in getting the best price for the ${product.brand} ${product.name}.`);
  const whatsappUrl = `https://wa.me/971583093948?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen text-[var(--cinematic-text)] flex flex-col selection:bg-[var(--cinematic-cyan)]/30" style={{ background: 'var(--cinematic-bg)' }}>
      <CinematicNav />
      
      <main className="flex-grow pt-24 pb-20 relative z-10">
        <ShippingMarquee />
        <div className="container mx-auto px-4 max-w-6xl mt-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--cinematic-text-secondary)] mb-8">
             <Link href="/" className="hover:text-[var(--cinematic-cyan)] transition-colors">Home</Link>
             <ChevronRight className="h-4 w-4" />
             <span className="text-[var(--cinematic-text)]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
             {/* Left: Image & QR */}
             <div className="relative">
                <div className="glass-card rounded-3xl overflow-hidden bg-white/20 p-8 flex flex-col items-center justify-center lg:sticky lg:top-28 shadow-xl">
                   <div className="aspect-square w-full relative mb-8">
                     <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
                   </div>
                   
                   {/* QR Code Section */}
                   <div className="w-full border-t border-white/10 pt-6 flex items-center justify-between">
                     <div className="flex flex-col">
                       <span className="text-xs text-[var(--cinematic-cyan)] font-bold tracking-widest uppercase mb-1">Authenticity Scan</span>
                       <span className="text-sm text-white/70">Scan QR to verify original product</span>
                     </div>
                     <div className="bg-white p-2 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                       <img 
                         src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent('https://trueoriginalshop.com/product/' + product.slug)}`} 
                         alt="QR Code" 
                         className="w-16 h-16 rounded-md" 
                       />
                     </div>
                   </div>
                </div>
             </div>

             {/* Right: Info */}
             <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cinematic-cyan)]/10 border border-[var(--cinematic-cyan)]/20 text-[var(--cinematic-cyan)] text-xs font-bold tracking-widest uppercase mb-4 w-max">
                   <ShieldCheck className="h-4 w-4" /> Verified Authentic
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                   {product.name}
                </h1>
                <h2 className="text-xl text-[var(--cinematic-pink)] font-semibold tracking-wider uppercase mb-6">
                   {product.brand}
                </h2>

                <p className="text-[var(--cinematic-text-secondary)] text-lg leading-relaxed mb-8">
                   {product.description}
                </p>

                {/* WhatsApp Button */}
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-card hover:bg-[var(--cinematic-cyan)]/20 border border-[var(--cinematic-cyan)]/30 transition-all duration-300 rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-bold shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] mb-10 group"
                >
                  <MessageCircle className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:text-white">
                    Contact for the best price
                  </span>
                </a>

                {/* Benefits */}
                <div className="mb-8">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-[var(--cinematic-cyan)]/50"></span>
                      Key Benefits
                   </h3>
                   <ul className="space-y-3">
                      {product.benefits.map((benefit, i) => (
                         <li key={i} className="flex items-start gap-3 text-[var(--cinematic-text-secondary)]">
                            <CheckCircle2 className="h-5 w-5 text-[var(--cinematic-cyan)] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-[var(--cinematic-pink)]/50"></span>
                      Core Ingredients
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient, i) => (
                         <span key={i} className="px-3 py-1.5 rounded-lg glass border border-white/10 text-sm">
                            {ingredient}
                         </span>
                      ))}
                   </div>
                </div>

                {/* How to Use */}
                <div>
                   <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-white/30"></span>
                      How to Use
                   </h3>
                   <p className="text-[var(--cinematic-text-secondary)] leading-relaxed p-4 glass-card rounded-xl">
                      {product.howToUse}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
