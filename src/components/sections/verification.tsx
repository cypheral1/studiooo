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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UploadCloud, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5000000; // 5MB
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
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-4 text-center transition hover:bg-muted">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        {fileName ? fileName : <><span className="font-semibold">Click to upload</span> or drag & drop</>}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (max 5MB)</p>
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
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          colorClass: 'bg-green-500/10 border-green-500/30',
          title: 'Authentic Product',
        };
      case 'Suspicious':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
          colorClass: 'bg-yellow-500/10 border-yellow-500/30',
          title: 'Potentially Suspicious',
        };
      case 'Fake':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          colorClass: 'bg-red-500/10 border-red-500/30',
          title: 'Likely Fake',
        };
      default:
        return {
          icon: <AlertTriangle className="h-16 w-16 text-gray-500" />,
          colorClass: 'bg-gray-500/10 border-gray-500/30',
          title: 'Analysis Complete',
        };
    }
  };

  const { icon, colorClass, title } = getStatusInfo();
  
  return (
    <Card className={`w-full max-w-3xl transform animate-in fade-in-50 zoom-in-95 ${colorClass}`}>
      <CardHeader className="items-center text-center">
        {icon}
        <CardTitle className="text-3xl font-headline mt-4">{title}</CardTitle>
        <p className="text-lg text-muted-foreground">Confidence Score: {result.confidenceScore}%</p>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">Analysis Details:</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {result.reasons.map((reason, index) => <li key={index}>{reason}</li>)}
        </ul>
      </CardContent>
    </Card>
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
        title: 'Verification Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="verification" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Check Product Authenticity
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Upload your product information below. Our AI will analyze it for authenticity in seconds.
          </p>
        </div>

        <Card className="mx-auto mt-16 max-w-3xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="productImage"
                        render={({ field }) => <FileUploadInput field={field} label="Product Image" />}
                    />
                    <FormField
                        control={form.control}
                        name="barcodeImage"
                        render={({ field }) => <FileUploadInput field={field} label="Barcode Image" />}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="batchCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the batch code from the packaging" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : 'Verify Product'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div ref={resultsRef} className="mt-16 flex justify-center">
            {isLoading && (
                 <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                    <p className="font-semibold text-lg">Analyzing your product...</p>
                    <p>This may take up to a minute.</p>
                </div>
            )}
            {verificationResult && <VerificationResult result={verificationResult} />}
        </div>

      </Container>
    </section>
  );
}
