import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sggmrgvbdtukrqvuekux.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    fetch: (url, options) => {
      // Use 3s timeout to prevent hanging when Supabase server is initializing or offline
      return fetch(url, {
        ...options,
        signal: options?.signal || AbortSignal.timeout(3000),
      });
    },
  },
});
