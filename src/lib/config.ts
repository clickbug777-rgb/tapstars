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
  
  // Permanent Edge Card Tracking Identity (Highest priority)
  getCardTrackingUrl: (cardUid: string): string => {
    const base = getInitialBaseUrl();
    return `${base}/t/${encodeURIComponent(cardUid.toLowerCase())}`;
  },

  // Permanent Edge QR Code Tracking Identity
  getQrTrackingUrl: (cardUid: string): string => {
    const base = getInitialBaseUrl();
    return `${base}/t/${encodeURIComponent(cardUid.toLowerCase())}?qr=1`;
  },

  // Backward compatible NFC URL (for existing pre-programmed cards)
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
  isSupabaseConfigured: (): boolean => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return Boolean(url && key && url.includes('supabase.co'));
  },
};
