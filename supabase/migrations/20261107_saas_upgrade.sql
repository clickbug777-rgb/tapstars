-- ==============================================================================
-- TAPSTARS V2 — SAAS PLATFORM UPGRADE MIGRATION
-- Multi-Tenant Client Dashboards, Card Assignment, RLS & Reputation Architecture
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. User Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('super_admin', 'admin', 'client')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 3. Enhance Businesses Table
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
    place_id TEXT,
    google_rating NUMERIC(2,1) DEFAULT 5.0,
    google_review_count INTEGER DEFAULT 0,
    instagram_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    linkedin_url TEXT,
    custom_links JSONB DEFAULT '[]'::jsonb,
    destination_mode TEXT NOT NULL DEFAULT 'direct_review' CHECK (destination_mode IN ('direct_review', 'profile')),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure new columns exist if table already exists from v1
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='businesses' AND column_name='place_id') THEN
        ALTER TABLE public.businesses ADD COLUMN place_id TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='businesses' AND column_name='google_rating') THEN
        ALTER TABLE public.businesses ADD COLUMN google_rating NUMERIC(2,1) DEFAULT 5.0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='businesses' AND column_name='google_review_count') THEN
        ALTER TABLE public.businesses ADD COLUMN google_review_count INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='businesses' AND column_name='owner_id') THEN
        ALTER TABLE public.businesses ADD COLUMN owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON public.businesses(is_active);

-- 4. Business Memberships (Multi-user per business)
CREATE TABLE IF NOT EXISTS public.business_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'manager', 'viewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(business_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_business_members_user ON public.business_members(user_id);
CREATE INDEX IF NOT EXISTS idx_business_members_biz ON public.business_members(business_id);

-- 5. NFC Cards Table
CREATE TABLE IF NOT EXISTS public.nfc_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_uid TEXT NOT NULL UNIQUE,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    label TEXT NOT NULL DEFAULT 'Main Counter',
    location_name TEXT DEFAULT 'Main Entrance / Reception',
    is_active BOOLEAN NOT NULL DEFAULT true,
    tap_count INTEGER NOT NULL DEFAULT 0,
    qr_scan_count INTEGER NOT NULL DEFAULT 0,
    last_tapped_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure location_name & qr_scan_count exist if table already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='nfc_cards' AND column_name='location_name') THEN
        ALTER TABLE public.nfc_cards ADD COLUMN location_name TEXT DEFAULT 'Main Entrance / Reception';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='nfc_cards' AND column_name='qr_scan_count') THEN
        ALTER TABLE public.nfc_cards ADD COLUMN qr_scan_count INTEGER DEFAULT 0;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_nfc_cards_business ON public.nfc_cards(business_id);
CREATE INDEX IF NOT EXISTS idx_nfc_cards_uid ON public.nfc_cards(card_uid);

-- 6. Tracking Events (Unified NFC & QR Analytics)
CREATE TABLE IF NOT EXISTS public.tracking_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    card_id UUID REFERENCES public.nfc_cards(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('nfc_tap', 'qr_scan', 'profile_view', 'review_click', 'call_click', 'whatsapp_click', 'directions_click', 'website_click', 'vcard_download')),
    device_category TEXT DEFAULT 'mobile' CHECK (device_category IN ('mobile', 'desktop', 'tablet')),
    destination_mode TEXT CHECK (destination_mode IN ('direct_review', 'profile')),
    referrer TEXT,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tracking_events_biz_time ON public.tracking_events(business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_card ON public.tracking_events(card_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_type ON public.tracking_events(event_type);

-- Keep backwards-compatible view for analytics_events
CREATE OR REPLACE VIEW public.analytics_events AS
SELECT * FROM public.tracking_events;

-- 7. Google Business Profiles (Reputation Management Integration)
CREATE TABLE IF NOT EXISTS public.google_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    place_id TEXT,
    account_id TEXT,
    location_id TEXT,
    is_connected BOOLEAN NOT NULL DEFAULT false,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    average_rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
    unanswered_reviews_count INTEGER NOT NULL DEFAULT 0,
    rating_distribution JSONB DEFAULT '{"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}'::jsonb,
    recent_reviews JSONB DEFAULT '[]'::jsonb,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_google_profiles_biz ON public.google_profiles(business_id);

-- 8. Subscriptions (Pricing Tiers & Plan Management)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL DEFAULT 'starter' CHECK (plan_id IN ('starter', 'growth', 'premium', 'business_pro')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'trial', 'past_due', 'canceled')),
    billing_cycle TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
    price_inr INTEGER NOT NULL DEFAULT 0,
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
    current_period_end TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_biz ON public.subscriptions(business_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- 9. Trigger for Auto Profile Creation on auth.users Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'client')
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if current user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('super_admin', 'admin')
    );
$$;

-- Helper Function: Check if user belongs to business
CREATE OR REPLACE FUNCTION public.has_business_access(b_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.business_members
            WHERE business_id = b_id AND user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.businesses
            WHERE id = b_id AND owner_id = auth.uid()
        )
    );
$$;

-- A. Profiles RLS
DROP POLICY IF EXISTS "Users can read own profile or admins read all" ON public.profiles;
CREATE POLICY "Users can read own profile or admins read all"
    ON public.profiles FOR SELECT
    USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (id = auth.uid() OR public.is_admin());

-- B. Businesses RLS
DROP POLICY IF EXISTS "Public can view active businesses" ON public.businesses;
CREATE POLICY "Public can view active businesses"
    ON public.businesses FOR SELECT
    USING (is_active = true OR public.has_business_access(id));

DROP POLICY IF EXISTS "Admins full manage businesses" ON public.businesses;
CREATE POLICY "Admins full manage businesses"
    ON public.businesses FOR ALL
    USING (public.is_admin());

DROP POLICY IF EXISTS "Owners can update their business" ON public.businesses;
CREATE POLICY "Owners can update their business"
    ON public.businesses FOR UPDATE
    USING (public.has_business_access(id));

-- C. Business Members RLS
DROP POLICY IF EXISTS "Members can view their business members" ON public.business_members;
CREATE POLICY "Members can view their business members"
    ON public.business_members FOR SELECT
    USING (public.has_business_access(business_id));

DROP POLICY IF EXISTS "Admins manage members" ON public.business_members;
CREATE POLICY "Admins manage members"
    ON public.business_members FOR ALL
    USING (public.is_admin());

-- D. NFC Cards RLS
DROP POLICY IF EXISTS "Public can resolve active cards for redirect" ON public.nfc_cards;
CREATE POLICY "Public can resolve active cards for redirect"
    ON public.nfc_cards FOR SELECT
    USING (is_active = true OR public.has_business_access(business_id));

DROP POLICY IF EXISTS "Admins can manage all cards" ON public.nfc_cards;
CREATE POLICY "Admins can manage all cards"
    ON public.nfc_cards FOR ALL
    USING (public.is_admin());

-- E. Tracking Events RLS
DROP POLICY IF EXISTS "Public can record tracking events" ON public.tracking_events;
CREATE POLICY "Public can record tracking events"
    ON public.tracking_events FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Business members can view their tracking events" ON public.tracking_events;
CREATE POLICY "Business members can view their tracking events"
    ON public.tracking_events FOR SELECT
    USING (public.has_business_access(business_id));

-- F. Google Profiles RLS
DROP POLICY IF EXISTS "Business members can view their google profile" ON public.google_profiles;
CREATE POLICY "Business members can view their google profile"
    ON public.google_profiles FOR SELECT
    USING (public.has_business_access(business_id));

DROP POLICY IF EXISTS "Admins can manage google profiles" ON public.google_profiles;
CREATE POLICY "Admins can manage google profiles"
    ON public.google_profiles FOR ALL
    USING (public.is_admin());

-- G. Subscriptions RLS
DROP POLICY IF EXISTS "Business members can view their subscription" ON public.subscriptions;
CREATE POLICY "Business members can view their subscription"
    ON public.subscriptions FOR SELECT
    USING (public.has_business_access(business_id));

DROP POLICY IF EXISTS "Admins can manage subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can manage subscriptions"
    ON public.subscriptions FOR ALL
    USING (public.is_admin());
