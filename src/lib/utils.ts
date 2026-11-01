import { DeviceCategory } from '../types';

/**
 * Validates whether a given URL is safe and valid HTTPS/HTTP.
 * Prevents javascript:, data:, or malformed redirect injection.
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Normalizes input URL by adding https:// if protocol was omitted
 */
export function normalizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Generates an SEO & NFC-safe slug from a business name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-')  // collapse dashes and spaces
    .replace(/^-+|-+$/g, '');  // trim leading/trailing dashes
}

/**
 * Formats a phone number for tel: links
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Formats a WhatsApp link
 */
export function formatWhatsAppUrl(number: string, businessName?: string): string {
  const cleanNumber = number.replace(/[^\d]/g, '');
  const message = businessName
    ? encodeURIComponent(`Hi ${businessName}, I found your contact on TapStars!`)
    : encodeURIComponent('Hi, I found your business card on TapStars!');
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

/**
 * Detects device category from userAgent
 */
export function getDeviceCategory(): DeviceCategory {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/iPad|tablet|PlayBook|Silk/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|NetFront/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Basic bot detection to prevent analytics skewing
 */
export function isBot(userAgent?: string): boolean {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  return /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|slurp|facebookexternalhit|whatsapp|preview/i.test(
    ua
  );
}

/**
 * Pretty formats numbers (e.g. 1,450)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Formats date into readable string
 */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
