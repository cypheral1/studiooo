'use client';

import { useState, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  productAuthenticityCheck,
  type ProductAuthenticityCheckOutput
} from '@/ai/flows/product-authenticity-check';
import { useToast } from '@/hooks/use-toast';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UploadCloud, CheckCircle, AlertTriangle, XCircle, Loader2, ShieldCheck, Sparkles } from 'lucide-react';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  productImage: z.any()
    .refine((file) => file, "Product image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  barcodeImage: z.any()
    .refine((file) => file, "Barcode image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  batchCode: z.string().min(1, 'Batch code is required.'),
});

type FormValues = z.infer<typeof formSchema>;

function FileUploadInput({ field, label }: { field: any, label: string }) {
    const [fileName, setFileName] = useState<string | null>(null);

    return (
        <FormItem>
            <FormLabel className="text-sm font-semibold text-white/90">{label}</FormLabel>
            <FormControl>
                <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-black/40 p-6 text-center transition-all hover:border-primary/60 hover:bg-black/60 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3 border border-primary/30">
                      <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-white/80">
                        {fileName ? <span className="font-semibold text-primary">{fileName}</span> : <><span className="font-semibold text-primary">Click to upload</span> or drag & drop</>}
                    </p>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">PNG, JPG, WEBP (max 5MB)</p>
                    <Input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            field.onChange(file);
                            setFileName(file?.name ?? null);
                        }}
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    />
                </label>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

function VerificationResult({ result }: { result: ProductAuthenticityCheckOutput }) {
  const getStatusInfo = () => {
    switch (result.authenticityStatus) {
      case 'Original':
        return {
          icon: <CheckCircle className="h-16 w-16 text-emerald-500" />,
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-700',
          title: '✅ Authentic Product!',
        };
      case 'Suspicious':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-amber-500" />,
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100 text-amber-700',
          title: '⚠️ Potentially Suspicious',
        };
      case 'Fake':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          bg: 'bg-red-50 border-red-200',
          badge: 'bg-red-100 text-red-700',
          title: '🚫 Likely Counterfeit',
        };
      default:
        return {
          icon: <AlertTriangle className="h-16 w-16 text-gray-500" />,
          bg: 'bg-gray-50 border-gray-200',
          badge: 'bg-gray-100 text-gray-700',
          title: 'Analysis Complete',
        };
    }
  };

  const { icon, bg, badge, title } = getStatusInfo();
  
  return (
    <div className={`w-full max-w-3xl rounded-3xl border border-white/10 p-8 animate-scale-in bg-black/80 shadow-2xl shadow-primary/5 backdrop-blur-md`}>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-2xl font-extrabold text-white tracking-wide">{title}</h3>
        <span className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold mt-3 border bg-black/50 ${badge === 'bg-emerald-100 text-emerald-700' ? 'border-emerald-500/30 text-emerald-400' : badge === 'bg-amber-100 text-amber-700' ? 'border-amber-500/30 text-amber-400' : 'border-red-500/30 text-red-400'}`}>
          Confidence: {result.confidenceScore}%
        </span>
      </div>
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Analysis Details</h4>
        <ul className="space-y-2">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                {index + 1}
              </span>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export function VerificationSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<ProductAuthenticityCheckOutput | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { batchCode: '' },
  });

  const fileToDataUri = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setVerificationResult(null);

    try {
      const productImageDataUri = await fileToDataUri(data.productImage);
      const barcodeImageDataUri = await fileToDataUri(data.barcodeImage);

      const result = await productAuthenticityCheck({
        productImageDataUri,
        barcodeImageDataUri,
        batchCode: data.batchCode,
      });

      setVerificationResult(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Verification failed:', error);
      toast({
        variant: 'destructive',
        title: 'Verification Failed 😔',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="verification" className="py-16 sm:py-24 bg-black/60 backdrop-blur-sm relative border-y border-primary/20">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/30 uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Analysis
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl uppercase">
            Verify <span className="text-primary">Authenticity</span>
          </h2>
          <p className="mt-4 text-white/70">
            Ensure your luxury cosmetics are genuine. Upload product details and let our AI authenticate it instantly.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl shadow-primary/10 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="productImage"
                        render={({ field }) => <FileUploadInput field={field} label="📸 Product Image" />}
                    />
                    <FormField
                        control={form.control}
                        name="barcodeImage"
                        render={({ field }) => <FileUploadInput field={field} label="📊 Barcode Image" />}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="batchCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-white/90">🔢 Batch Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the batch code from the packaging"
                          className="rounded-xl h-12 bg-black/50 border-primary/30 focus:border-primary text-white placeholder:text-white/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black uppercase tracking-wider rounded-xl h-14 font-extrabold text-sm shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Verify Product Now
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>

        <div ref={resultsRef} className="mt-12 flex justify-center">
            {isLoading && (
                 <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                      <ShieldCheck className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="font-semibold text-foreground">Analyzing your product...</p>
                    <p className="text-sm text-muted-foreground">This may take up to a minute ⏳</p>
                </div>
            )}
            {verificationResult && <VerificationResult result={verificationResult} />}
        </div>

      </Container>
    </section>
  );
}
