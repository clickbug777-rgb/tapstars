-- ==============================================================================
-- TAPSTARS - OPTIONAL DEMO SEED DATA
-- Fictional sample businesses to quickly test profiles, NFC cards, and analytics
-- ==============================================================================

-- 1. Insert Demo Businesses
INSERT INTO public.businesses (
    id, name, slug, category, description,
    logo_url, cover_image_url,
    phone, whatsapp, email, website, address,
    google_maps_url, google_review_url,
    instagram_url, facebook_url, youtube_url, linkedin_url,
    custom_links, destination_mode, is_active
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'ABC Cafe & Roastery',
    'abc-cafe',
    'Restaurant & Cafe',
    'Artisanal coffee roasters, fresh sourdough bakes, and all-day brunch made with locally sourced ingredients.',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    '+1 (555) 234-5678',
    '+15552345678',
    'hello@abccafe.example.com',
    'https://abccafe.example.com',
    '108 Artisan Alley, Downtown Market, Suite 4',
    'https://maps.google.com/?q=ABC+Cafe+Downtown',
    'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    'https://instagram.com/abccaferoasters',
    'https://facebook.com/abccafeofficial',
    NULL,
    NULL,
    '[{"id":"l1","label":"View Brunch Menu","url":"https://abccafe.example.com/menu"},{"id":"l2","label":"Order Online for Pickup","url":"https://abccafe.example.com/order"}]'::jsonb,
    'direct_review',
    true
),
(
    '00000000-0000-0000-0000-000000000002',
    'Urban Cuts Studio',
    'urban-cuts',
    'Salon & Spa',
    'Bespoke precision haircuts, beard sculpting, and premium scalp treatments for modern professionals.',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    '+1 (555) 456-7890',
    '+15554567890',
    'appointments@urbancuts.example.com',
    'https://urbancuts.example.com',
    '42 Fashion Blvd, Ground Floor, Central District',
    'https://maps.google.com/?q=Urban+Cuts+Studio',
    'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY5',
    'https://instagram.com/urbancutsstudio',
    NULL,
    NULL,
    NULL,
    '[{"id":"l3","label":"Book Appointment Online","url":"https://urbancuts.example.com/book"}]'::jsonb,
    'profile',
    true
),
(
    '00000000-0000-0000-0000-000000000003',
    'Smile Dental Clinic',
    'smile-dental',
    'Clinic & Healthcare',
    'Comprehensive family dentistry, invisible aligners, teeth whitening, and gentle painless care.',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    '+1 (555) 789-0123',
    '+15557890123',
    'care@smiledental.example.com',
    'https://smiledental.example.com',
    '750 Medical Center Way, Suite 300',
    'https://maps.google.com/?q=Smile+Dental+Clinic',
    'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY6',
    'https://instagram.com/smiledentalclinic',
    'https://facebook.com/smiledentalclinic',
    NULL,
    'https://linkedin.com/company/smiledental',
    '[{"id":"l4","label":"Schedule Consultation","url":"https://smiledental.example.com/consult"}]'::jsonb,
    'direct_review',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Demo NFC Cards
INSERT INTO public.nfc_cards (
    id, card_uid, business_id, label, is_active, tap_count, last_tapped_at
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    'CARD-ABC-01',
    '00000000-0000-0000-0000-000000000001',
    'Front Checkout Counter',
    true,
    142,
    now() - interval '25 minutes'
),
(
    '10000000-0000-0000-0000-000000000002',
    'CARD-ABC-02',
    '00000000-0000-0000-0000-000000000001',
    'Patio Table Stand #4',
    true,
    89,
    now() - interval '4 hours'
),
(
    '10000000-0000-0000-0000-000000000003',
    'CARD-URB-01',
    '00000000-0000-0000-0000-000000000002',
    'Reception Desk Tap Card',
    true,
    96,
    now() - interval '45 minutes'
),
(
    '10000000-0000-0000-0000-000000000004',
    'CARD-SMILE-01',
    '00000000-0000-0000-0000-000000000003',
    'Exit Payment Counter',
    true,
    67,
    now() - interval '2 hours'
)
ON CONFLICT (card_uid) DO NOTHING;
