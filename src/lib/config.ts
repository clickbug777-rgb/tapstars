/**
 * Central Configuration for TapStars
 * Ensures consistent permanent URLs across NFC tags, QR codes, and redirects
 */

const DEFAULT_SUPABASE_URL = 'https://zxuxszlfshakdtdrwqtk.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dXhzemxmc2hha2R0ZHJ3cXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MTk3NDcsImV4cCI6MjEwOTA5NTc0N30.KDzXeEQwV9YoWr-7iO9xQuavB86VvdnIKSKuA_yUn8w';

const getInitialBaseUrl = (): string => {
  if (import.meta.env.VITE_APP_BASE_URL) {
    return import.meta.env.VITE_APP_BASE_URL.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (origin.includes('pages.dev') || origin.includes('tapstars')) {
      return origin;
    }
    return origin;
  }

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
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
  isSupabaseConfigured: (): boolean => true,
};
