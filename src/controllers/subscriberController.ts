import { supabase } from '@/config/supabase';

export const saveSubscriber = async (email: string, source: string = 'Website Form') => {
    try {
        // Check if subscriber already exists
        const { data: existing, error: selectError } = await supabase
            .from('subscribers')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (selectError) {
            throw selectError;
        }

        if (existing) {
            return { success: true, message: 'Already subscribed', data: existing };
        }

        // Insert new subscriber
        const { data: newSubscriber, error: insertError } = await supabase
            .from('subscribers')
            .insert({ email, source })
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        return { success: true, data: newSubscriber };
    } catch (error: any) {
        console.error('Error saving subscriber:', error);
        return { success: false, error: error.message };
    }
};
