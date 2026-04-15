'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/container';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { DownloadCloud, Loader2, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FreeGuide() {
    const guideImage = PlaceHolderImages.find(p => p.id === 'free-guide-cover');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'Free Guide Form' })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                toast({ title: 'Success! 🎉', description: 'Your free guide is on its way.' });
                setEmail('');
            } else {
                toast({ variant: 'destructive', title: 'Oops!', description: data.error || data.message || 'Failed to subscribe.' });
            }
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section id="free-guide" className="py-16 sm:py-24 bg-black/40 backdrop-blur-sm border-t border-primary/20">
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-black border border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.1)] text-white">
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-2xl" />

                    <div className="relative grid md:grid-cols-2 items-center">
                        {/* Content */}
                        <div className="p-8 sm:p-12 lg:p-16">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                                <Sparkles className="h-3 w-3" />
                                VIP INSIDER ACCESS
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white uppercase tracking-wide">
                                Become an Elite <span className="text-primary">Expert</span>
                            </h2>
                            <p className="mt-4 text-white/70 leading-relaxed max-w-lg">
                                Download our free guide to identifying fake cosmetic products. Protect yourself and your skin.
                            </p>

                            <div className="mt-4 space-y-2">
                                {['Learn expert verification techniques', 'Spot fakes from packaging alone', 'Protect your skin from harmful ingredients'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                                        <Check className="h-4 w-4 text-primary shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your VIP email"
                                    className="flex-grow bg-black/50 border-primary/30 text-white placeholder:text-white/40 rounded-xl h-12 focus:bg-black/70 focus:border-primary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-black rounded-xl px-6 h-12 font-bold text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <DownloadCloud className="h-4 w-4" />
                                            Unlock Guide
                                        </>
                                    )}
                                </button>
                            </form>
                            <p className="mt-3 text-xs text-white/50">
                                We respect your privacy. No spam.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="relative hidden md:block h-full min-h-[400px]">
                            {guideImage && (
                                <Image
                                    src={guideImage.imageUrl}
                                    alt={guideImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={guideImage.imageHint}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
