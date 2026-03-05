'use server';
/**
 * @fileOverview A Genkit flow for checking the authenticity of cosmetic products.
 *
 * - productAuthenticityCheck - A function that handles the cosmetic product authenticity check process.
 * - ProductAuthenticityCheckInput - The input type for the productAuthenticityCheck function.
 * - ProductAuthenticityCheckOutput - The return type for the productAuthenticityCheck function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductAuthenticityCheckInputSchema = z.object({
  productImageDataUri: z
    .string()
    .describe(
      "A photo of the cosmetic product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  barcodeImageDataUri: z
    .string()
    .describe(
      "A photo of the product's barcode, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  batchCode: z.string().describe("The batch code of the cosmetic product."),
});
export type ProductAuthenticityCheckInput = z.infer<
  typeof ProductAuthenticityCheckInputSchema
>;

const ProductAuthenticityCheckOutputSchema = z.object({
  authenticityStatus: z
    .union([z.literal('Original'), z.literal('Suspicious'), z.literal('Fake')])
    .describe(
      "The assessment of the product's authenticity: 'Original', 'Suspicious', or 'Fake'."
    ),
  confidenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe("A confidence score (0-100) for the authenticity assessment."),
  reasons: z
    .array(z.string())
    .describe("Detailed reasons and findings supporting the authenticity assessment."),
});
export type ProductAuthenticityCheckOutput = z.infer<
  typeof ProductAuthenticityCheckOutputSchema
>;

import { saveVerification } from '@/controllers/verificationController';

export async function productAuthenticityCheck(
  input: ProductAuthenticityCheckInput
): Promise<ProductAuthenticityCheckOutput> {
  const result = await productAuthenticityCheckFlow(input);

  try {
    await saveVerification(input, result);
  } catch (error) {
    console.error('Failed to save to Supabase:', error);
  }

  return result;
}

const authenticityCheckPrompt = ai.definePrompt({
  name: 'authenticityCheckPrompt',
  input: { schema: ProductAuthenticityCheckInputSchema },
  output: { schema: ProductAuthenticityCheckOutputSchema },
  prompt: `You are an expert in cosmetic product authenticity verification. Your task is to analyze the provided product image, barcode image, and batch code to determine if the cosmetic product is original, suspicious, or fake.

Carefully examine all provided information. Use the barcode and batch code to identify potential discrepancies with known genuine product characteristics. Assess the product packaging, labeling, and any visible details from the product image against what is typical for authentic products of its brand.

Provide an authenticity status (Original, Suspicious, or Fake), a confidence score (0-100), and a detailed list of reasons supporting your assessment. If the product appears suspicious or fake, highlight the specific details that led to this conclusion.

Product Image: {{media url=productImageDataUri}}
Barcode Image: {{media url=barcodeImageDataUri}}
Batch Code: {{{batchCode}}}`,
});

const productAuthenticityCheckFlow = ai.defineFlow(
  {
    name: 'productAuthenticityCheckFlow',
    inputSchema: ProductAuthenticityCheckInputSchema,
    outputSchema: ProductAuthenticityCheckOutputSchema,
  },
  async (input) => {
    const { output } = await authenticityCheckPrompt(input);
    return output!;
  }
);
