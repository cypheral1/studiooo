"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "971500000000";

interface CheckMyProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckMyProductForm({ isOpen, onClose }: CheckMyProductFormProps) {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !productName) return;

    setIsSubmitting(true);

    // Simulate upload/processing time
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const message = `Hello! I would like to check the authenticity of a product.\n\nName: ${name}\nProduct Name: ${productName}${photo ? "\nI have a photo of the product as well." : ""}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setProductName("");
          setPhoto(null);
          onClose();
        }, 500);
      }, 1500); // Wait 1.5s to show success animation
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-[#050505] border border-primary/20 rounded-2xl backdrop-blur-md text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wide text-white">
            Check My <span className="text-primary">Product</span>
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Submit your product details below. You will be redirected to WhatsApp to send the info to our authenticity team.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2">Details Processed</h3>
            <p className="text-sm text-white/70">Redirecting you to WhatsApp securely...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="productName" className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Product Name *
              </label>
              <input
                id="productName"
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="e.g. Cerave Hydrating Cleanser"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="photo" className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Product Photo (Optional)
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]);
                  }
                }}
                className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-colors focus:outline-none focus:border-primary/50 transition-colors"
              />
              {photo && (
                <p className="text-xs text-primary mt-1">Selected: {photo.name}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name || !productName}
              className="w-full mt-4 bg-primary text-black font-bold uppercase tracking-widest py-3 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Verify on WhatsApp"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
