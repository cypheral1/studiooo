import { supabase } from '@/config/supabase';

export interface ProductAuthenticityCheckOutput {
  authenticityStatus: 'Original' | 'Suspicious' | 'Fake' | string;
  confidenceScore: number;
  reasons: string[];
}

export const saveVerification = async (
    inputData: any,
    resultData: ProductAuthenticityCheckOutput
) => {
    try {
        const { data: verification, error } = await supabase
            .from('verifications')
            .insert({
                product_image_data_uri: inputData.productImageDataUri,
                barcode_image_data_uri: inputData.barcodeImageDataUri,
                batch_code: inputData.batchCode,
                authenticity_status: resultData.authenticityStatus,
                confidence_score: resultData.confidenceScore,
                reasons: resultData.reasons,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data: verification };
    } catch (error: any) {
        console.error('Error saving verification:', error);
        return { success: false, error: error.message };
    }
};
