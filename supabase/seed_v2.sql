-- ==============================================================================
-- TAPSTARS V2 SEED DATA
-- Demonstrates multi-tenant SaaS: Admins, Business Owners, NFC Cards, Subscriptions & Analytics
-- ==============================================================================

-- 1. Sample Businesses
INSERT INTO public.businesses (
    id, name, slug, category, description,
    logo_url, cover_image_url, phone, whatsapp, email, website,
    address, google_maps_url, google_review_url, place_id,
    google_rating, google_review_count, destination_mode, is_active
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'ABC Cafe & Roastery',
    'abc-cafe',
    'Restaurant & Cafe',
    'Specialty artisanal coffee roastery & sourdough bakery in Bandra West.',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    '+919820012345',
    '919820012345',
    'hello@abccafe.in',
    'https://abccafe.in',
    'Plot 42, Waterfield Road, Bandra West, Mumbai 400050',
    'https://maps.google.com/?cid=1234567890123456789',
    'https://g.page/r/Cb_7kG8_Sample/review',
    'ChIJN1t_tDeuEmsRUsoyG83frY4',
    4.9,
    148,
    'direct_review',
    true
),
(
    '00000000-0000-0000-0000-000000000002',
    'Glow Luxury Hair & Spa',
    'glow-salon',
    'Salon & Spa',
    'Bespoke hair styling, organic facials, and luxury bridal spa treatments.',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    '+919820054321',
    '919820054321',
    'appointments@glowluxury.in',
    'https://glowluxury.in',
    'Shop 3, Indiranagar 100ft Road, Bengaluru 560038',
    'https://maps.google.com/?cid=9876543210987654321',
    'https://g.page/r/Cb_7kG8_Glow/review',
    'ChIJN2t_tDeuEmsRUsoyG83frY5',
    4.8,
    92,
    'profile',
    true
),
(
    '00000000-0000-0000-0000-000000000003',
    'Apex High-Performance Gym',
    'apex-gym',
    'Gym & Fitness',
    'Strength training, functional fitness, and recovery lounge with ice baths.',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    '+919820099887',
    '919820099887',
    'fit@apexgym.in',
    'https://apexgym.in',
    'Level 2, Cyber Hub, DLF Phase 2, Gurugram 122002',
    'https://maps.google.com/?cid=1122334455667788990',
    'https://g.page/r/Cb_7kG8_Apex/review',
    'ChIJN3t_tDeuEmsRUsoyG83frY6',
    4.9,
    215,
    'direct_review',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 2. NFC Cards (Assigned with unique tracking identities)
INSERT INTO public.nfc_cards (
    id, card_uid, business_id, label, location_name, is_active, tap_count, qr_scan_count
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    'card-001',
    '00000000-0000-0000-0000-000000000001',
    'Cash Counter #1',
    'Main Billing Counter',
    true,
    342,
    88
),
(
    '10000000-0000-0000-0000-000000000002',
    'card-002',
    '00000000-0000-0000-0000-000000000001',
    'Outdoor Patio Stand',
    'Garden Seating Area',
    true,
    184,
    42
),
(
    '10000000-0000-0000-0000-000000000003',
    'card-003',
    '00000000-0000-0000-0000-000000000002',
    'Styling Mirror #1',
    'Main Hair Studio Station',
    true,
    215,
    31
),
(
    '10000000-0000-0000-0000-000000000004',
    'card-004',
    '00000000-0000-0000-0000-000000000003',
    'Check-in Turnstile',
    'Gym Entrance Turnstile',
    true,
    512,
    124
)
ON CONFLICT (card_uid) DO NOTHING;

-- 3. Google Business Profiles Integration State
INSERT INTO public.google_profiles (
    id, business_id, place_id, is_connected, total_reviews, average_rating, unanswered_reviews_count, rating_distribution, recent_reviews
) VALUES
(
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'ChIJN1t_tDeuEmsRUsoyG83frY4',
    true,
    148,
    4.9,
    3,
    '{"5": 136, "4": 9, "3": 2, "2": 1, "1": 0}'::jsonb,
    '[
        {"author": "Rohan Mehta", "rating": 5, "relative_time": "2 days ago", "text": "Loved the cold brew and almond croissant! Tapped the card on the bill folder, super smooth experience.", "has_response": true},
        {"author": "Priya Sharma", "rating": 5, "relative_time": "4 days ago", "text": "Best sourdough in Bandra. Staff is warm and the ambient music is great.", "has_response": false},
        {"author": "Arjun Patel", "rating": 4, "relative_time": "1 week ago", "text": "Great coffee, seating gets crowded on Sunday mornings.", "has_response": false}
    ]'::jsonb
),
(
    '20000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'ChIJN2t_tDeuEmsRUsoyG83frY5',
    true,
    92,
    4.8,
    1,
    '{"5": 81, "4": 8, "3": 2, "2": 1, "1": 0}'::jsonb,
    '[
        {"author": "Sneha Roy", "rating": 5, "relative_time": "Yesterday", "text": "Outstanding keratin treatment! Clean and relaxing salon atmosphere.", "has_response": true}
    ]'::jsonb
)
ON CONFLICT (business_id) DO NOTHING;

-- 4. Subscriptions
INSERT INTO public.subscriptions (
    id, business_id, plan_id, status, billing_cycle, price_inr
) VALUES
(
    '30000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'growth',
    'active',
    'monthly',
    199
),
(
    '30000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'premium',
    'active',
    'monthly',
    499
),
(
    '30000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'business_pro',
    'active',
    'monthly',
    999
)
ON CONFLICT (business_id) DO NOTHING;
