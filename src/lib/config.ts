/**
 * Central Configuration for TapStars
 * Ensures consistent permanent URLs across NFC tags, QR codes, and redirects
 */

const getInitialBaseUrl = (): string => {
  // 1. Environment variable if provided during build
  if (import.meta.env.VITE_APP_BASE_URL) {
    return import.meta.env.VITE_APP_BASE_URL.replace(/\/+$/, '');
  }

  // 2. Browser window origin if available
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // If running on localhost or 127.0.0.1, we allow local testing,
    // but default production target is tapstars.pages.dev
    const origin = window.location.origin;
    if (origin.includes('pages.dev') || origin.includes('tapstars')) {
      return origin;
    }
    // Return window origin during local development
    return origin;
  }

  // 3. Fallback to production default
  return 'https://tapstars.pages.dev';
};

export const CONFIG = {
  appName: 'TapStars',
  tagline: 'One Tap. Your Entire Business.',
  defaultDomain: 'tapstars.pages.dev',
  getBaseUrl: getInitialBaseUrl,
  getNfcUrl: (slug: string, cardUid?: string): string => {
    const base = getInitialBaseUrl();
    const query = cardUid ? `?cid=${encodeURIComponent(cardUid)}` : '';
    return `${base}/r/${slug}${query}`;
  },
  getProfileUrl: (slug: string): string => {
    const base = getInitialBaseUrl();
    return `${base}/p/${slug}`;
  },
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isSupabaseConfigured: (): boolean => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return Boolean(url && key && url.startsWith('http') && !url.includes('YOUR_SUPABASE'));
  },
};
