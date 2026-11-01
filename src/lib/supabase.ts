import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CONFIG } from './config';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = CONFIG.supabaseUrl;
  const anonKey = CONFIG.supabaseAnonKey;

  if (CONFIG.isSupabaseConfigured()) {
    try {
      client = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
      return client;
    } catch (err) {
      console.warn('[TapStars] Error creating Supabase client:', err);
      return null;
    }
  }

  return null;
}

export const supabase = getSupabaseClient();
