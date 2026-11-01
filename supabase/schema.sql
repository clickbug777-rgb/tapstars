-- ==============================================================================
-- TAPSTARS - COMPLETE SUPABASE POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Businesses Table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'General',
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    website TEXT,
    address TEXT,
    google_maps_url TEXT,
    google_review_url TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    linkedin_url TEXT,
    custom_links JSONB DEFAULT '[]'::jsonb,
    destination_mode TEXT NOT NULL DEFAULT 'direct_review' CHECK (destination_mode IN ('direct_review', 'profile')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for instant slug lookup during NFC taps and QR scans
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON public.businesses(is_active);

-- 3. NFC Cards Table
CREATE TABLE IF NOT EXISTS public.nfc_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_uid TEXT NOT NULL UNIQUE,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    label TEXT NOT NULL DEFAULT 'Main Card',
    is_active BOOLEAN NOT NULL DEFAULT true,
    tap_count INTEGER NOT NULL DEFAULT 0,
    last_tapped_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nfc_cards_business ON public.nfc_cards(business_id);
CREATE INDEX IF NOT EXISTS idx_nfc_cards_uid ON public.nfc_cards(card_uid);

-- 4. Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    card_id UUID REFERENCES public.nfc_cards(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('nfc_tap', 'qr_scan', 'profile_view', 'review_click', 'call_click', 'whatsapp_click', 'directions_click', 'website_click', 'vcard_download')),
    device_category TEXT DEFAULT 'mobile' CHECK (device_category IN ('mobile', 'desktop', 'tablet')),
    destination_mode TEXT CHECK (destination_mode IN ('direct_review', 'profile')),
    referrer TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_business_time ON public.analytics_events(business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);

-- 5. Updated_at Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_businesses_updated_at ON public.businesses;
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- A. Businesses RLS
-- Public can view active businesses
DROP POLICY IF EXISTS "Public can view active businesses" ON public.businesses;
CREATE POLICY "Public can view active businesses"
    ON public.businesses
    FOR SELECT
    USING (is_active = true);

-- Authenticated users (Admins) have full management rights
DROP POLICY IF EXISTS "Admins have full access to businesses" ON public.businesses;
CREATE POLICY "Admins have full access to businesses"
    ON public.businesses
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- B. NFC Cards RLS
-- Public can read active cards for card UID lookup
DROP POLICY IF EXISTS "Public can read active NFC cards" ON public.nfc_cards;
CREATE POLICY "Public can read active NFC cards"
    ON public.nfc_cards
    FOR SELECT
    USING (is_active = true);

-- Admins have full access to NFC cards
DROP POLICY IF EXISTS "Admins have full access to nfc_cards" ON public.nfc_cards;
CREATE POLICY "Admins have full access to nfc_cards"
    ON public.nfc_cards
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- C. Analytics Events RLS
-- Public can log events (nfc taps, scans, clicks)
DROP POLICY IF EXISTS "Public can record analytics events" ON public.analytics_events;
CREATE POLICY "Public can record analytics events"
    ON public.analytics_events
    FOR INSERT
    WITH CHECK (true);

-- Admins can read and analyze analytics events
DROP POLICY IF EXISTS "Admins can view analytics events" ON public.analytics_events;
CREATE POLICY "Admins can view analytics events"
    ON public.analytics_events
    FOR SELECT
    TO authenticated
    USING (true);

-- Admins can delete or manage old analytics
DROP POLICY IF EXISTS "Admins can manage analytics events" ON public.analytics_events;
CREATE POLICY "Admins can manage analytics events"
    ON public.analytics_events
    FOR DELETE
    TO authenticated
    USING (true);
