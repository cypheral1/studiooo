'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/container';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Loader2 } from 'lucide-react';
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
                toast({ title: 'Success!', description: 'Your free guide is on its way.' });
                setEmail('');
            } else {
                toast({ variant: 'destructive', title: 'Error', description: data.error || data.message || 'Failed to subscribe.' });
            }
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section id="free-guide" className="py-24 sm:py-32">
            <Container>
                <Card className="overflow-hidden bg-accent/30 shadow-lg">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 sm:p-12">
                            <h2 className="font-headline text-4xl font-bold tracking-tight text-accent-foreground sm:text-5xl">
                                Become a Counterfeit Expert
                            </h2>
                            <p className="mt-6 text-lg text-accent-foreground/80">
                                Download our free guide, "How to Identify Fake Cosmetic Products," and learn the secrets to spotting fakes. Protect yourself and your skin with this essential knowledge.
                            </p>
                            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="flex-grow bg-background"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type="submit" size="lg" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            Get Free Guide
                                            <DownloadCloud className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                            <p className="mt-4 text-xs text-accent-foreground/60">
                                We respect your privacy. No spam.
                            </p>
                        </div>
                        <div className="relative hidden h-80 md:h-auto md:block">
                            {guideImage && (
                                <Image
                                    src={guideImage.imageUrl}
                                    alt={guideImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={guideImage.imageHint}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </Container>
        </section>
    );
}
