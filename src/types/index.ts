export type DestinationMode = 'direct_review' | 'profile';

export type DeviceCategory = 'mobile' | 'desktop' | 'tablet';

export type UserRole = 'super_admin' | 'admin' | 'client';

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

export type SubscriptionPlanId = 'starter' | 'growth' | 'premium' | 'business_pro';
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'canceled';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  business_id?: string;
  created_at?: string;
}

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
  place_id?: string;
  google_rating?: number;
  google_review_count?: number;
  owner_id?: string;
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

export interface BusinessMember {
  id: string;
  business_id: string;
  user_id: string;
  role: 'owner' | 'manager' | 'viewer';
  created_at: string;
}

export interface NfcCard {
  id: string;
  card_uid: string; // e.g. "card-001"
  business_id: string;
  business_name?: string;
  business_slug?: string;
  label: string;
  location_name?: string;
  is_active: boolean;
  created_at: string;
  last_tapped_at?: string;
  tap_count: number;
  qr_scan_count?: number;
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
  ip_hash?: string;
}

export interface GoogleReviewItem {
  author: string;
  author_photo?: string;
  rating: number;
  relative_time: string;
  text: string;
  has_response: boolean;
  reply_text?: string;
}

export interface GoogleProfile {
  id: string;
  business_id: string;
  place_id?: string;
  account_id?: string;
  location_id?: string;
  is_connected: boolean;
  total_reviews: number;
  average_rating: number;
  unanswered_reviews_count: number;
  rating_distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recent_reviews: GoogleReviewItem[];
  last_synced_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Subscription {
  id: string;
  business_id: string;
  plan_id: SubscriptionPlanId;
  status: SubscriptionStatus;
  billing_cycle: 'monthly' | 'yearly';
  price_inr: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export interface AdminStats {
  totalBusinesses: number;
  activeBusinesses: number;
  totalCards: number;
  totalNfcTaps: number;
  totalQrScans: number;
  totalProfileVisits: number;
  totalRedirectClicks: number;
  totalEvents: number;
  totalSubscriptions: number;
  monthlyRevenueInr: number;
}

export interface ClientStats {
  totalTaps: number;
  totalQrScans: number;
  totalEngagement: number;
  totalReviews: number;
  averageRating: number;
  reviewGrowth: number;
  tapsGrowthPercentage: number;
  activeCardsCount: number;
}
