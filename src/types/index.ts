export type DestinationMode = 'direct_review' | 'profile';

export type DeviceCategory = 'mobile' | 'desktop' | 'tablet';

export type EventType =
  | 'nfc_tap'
  | 'qr_scan'
  | 'profile_view'
  | 'review_click'
  | 'call_click'
  | 'whatsapp_click'
  | 'directions_click'
  | 'website_click'
  | 'vcard_download';

export interface CustomLink {
  id: string;
  label: string;
  url: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  logo_url: string;
  cover_image_url: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  google_maps_url: string;
  google_review_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  linkedin_url: string;
  custom_links?: CustomLink[];
  destination_mode: DestinationMode;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NfcCard {
  id: string;
  card_uid: string; // e.g. "CARD-ABC-01"
  business_id: string;
  business_name?: string;
  business_slug?: string;
  label: string;
  is_active: boolean;
  created_at: string;
  last_tapped_at?: string;
  tap_count: number;
}

export interface AnalyticsEvent {
  id: string;
  business_id: string;
  card_id?: string;
  event_type: EventType;
  created_at: string;
  referrer?: string;
  device_category: DeviceCategory;
  destination_mode?: DestinationMode;
}

export interface AdminStats {
  totalBusinesses: number;
  activeBusinesses: number;
  totalCards: number;
  totalProfileVisits: number;
  totalRedirectClicks: number;
  totalEvents: number;
}
