import { Business, NfcCard, AnalyticsEvent, GoogleProfile, Subscription } from '../types';

export const INITIAL_DEMO_BUSINESSES: Business[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'ABC Cafe & Roastery',
    slug: 'abc-cafe',
    category: 'Restaurant & Cafe',
    description: 'Specialty artisanal coffee roastery & sourdough bakery in Bandra West, Mumbai.',
    logo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    phone: '+919820012345',
    whatsapp: '919820012345',
    email: 'hello@abccafe.in',
    website: 'https://abccafe.in',
    address: 'Plot 42, Waterfield Road, Bandra West, Mumbai 400050',
    google_maps_url: 'https://maps.google.com/?cid=1234567890123456789',
    google_review_url: 'https://g.page/r/Cb_7kG8_Sample/review',
    place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    google_rating: 4.9,
    google_review_count: 148,
    owner_id: 'user-demo-client-1',
    instagram_url: 'https://instagram.com/abccafe_mumbai',
    facebook_url: 'https://facebook.com/abccafe',
    youtube_url: '',
    linkedin_url: '',
    custom_links: [
      { id: '1', label: 'View Today’s Specials Menu', url: 'https://abccafe.in/menu.pdf' },
      { id: '2', label: 'Book a Table on Zomato', url: 'https://zomato.com' },
    ],
    destination_mode: 'direct_review',
    is_active: true,
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Glow Luxury Hair & Spa',
    slug: 'glow-salon',
    category: 'Salon & Spa',
    description: 'Bespoke hair styling, organic facials, and luxury bridal spa treatments.',
    logo_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    phone: '+919820054321',
    whatsapp: '919820054321',
    email: 'appointments@glowluxury.in',
    website: 'https://glowluxury.in',
    address: 'Shop 3, Indiranagar 100ft Road, Bengaluru 560038',
    google_maps_url: 'https://maps.google.com/?cid=9876543210987654321',
    google_review_url: 'https://g.page/r/Cb_7kG8_Glow/review',
    place_id: 'ChIJN2t_tDeuEmsRUsoyG83frY5',
    google_rating: 4.8,
    google_review_count: 92,
    owner_id: 'user-demo-client-2',
    instagram_url: 'https://instagram.com/glow_luxury_spa',
    facebook_url: '',
    youtube_url: '',
    linkedin_url: '',
    custom_links: [
      { id: '1', label: 'Book Online Appointment', url: 'https://glowluxury.in/book' },
    ],
    destination_mode: 'profile',
    is_active: true,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Apex High-Performance Gym',
    slug: 'apex-gym',
    category: 'Gym & Fitness',
    description: 'Strength training, functional fitness, and recovery lounge with ice baths in Gurugram.',
    logo_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    phone: '+919820099887',
    whatsapp: '919820099887',
    email: 'fit@apexgym.in',
    website: 'https://apexgym.in',
    address: 'Level 2, Cyber Hub, DLF Phase 2, Gurugram 122002',
    google_maps_url: 'https://maps.google.com/?cid=1122334455667788990',
    google_review_url: 'https://g.page/r/Cb_7kG8_Apex/review',
    place_id: 'ChIJN3t_tDeuEmsRUsoyG83frY6',
    google_rating: 4.9,
    google_review_count: 215,
    owner_id: 'user-demo-client-3',
    instagram_url: 'https://instagram.com/apexgym_india',
    facebook_url: '',
    youtube_url: '',
    linkedin_url: '',
    custom_links: [],
    destination_mode: 'direct_review',
    is_active: true,
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_DEMO_CARDS: NfcCard[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    card_uid: 'card-001',
    business_id: '00000000-0000-0000-0000-000000000001',
    business_name: 'ABC Cafe & Roastery',
    business_slug: 'abc-cafe',
    label: 'Main Billing Counter',
    location_name: 'Cash Register #1',
    is_active: true,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    last_tapped_at: new Date(Date.now() - 25 * 60000).toISOString(),
    tap_count: 342,
    qr_scan_count: 88,
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    card_uid: 'card-002',
    business_id: '00000000-0000-0000-0000-000000000001',
    business_name: 'ABC Cafe & Roastery',
    business_slug: 'abc-cafe',
    label: 'Outdoor Patio Stand',
    location_name: 'Table 14 - Garden Patio',
    is_active: true,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    last_tapped_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    tap_count: 184,
    qr_scan_count: 42,
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    card_uid: 'card-003',
    business_id: '00000000-0000-0000-0000-000000000002',
    business_name: 'Glow Luxury Hair & Spa',
    business_slug: 'glow-salon',
    label: 'Styling Mirror #1',
    location_name: 'Senior Stylist Station',
    is_active: true,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    last_tapped_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    tap_count: 215,
    qr_scan_count: 31,
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    card_uid: 'card-004',
    business_id: '00000000-0000-0000-0000-000000000003',
    business_name: 'Apex High-Performance Gym',
    business_slug: 'apex-gym',
    label: 'Check-in Turnstile',
    location_name: 'Main Entrance Turnstile',
    is_active: true,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    last_tapped_at: new Date(Date.now() - 45 * 60000).toISOString(),
    tap_count: 512,
    qr_scan_count: 124,
  },
];

export const INITIAL_DEMO_GOOGLE_PROFILES: Record<string, GoogleProfile> = {
  '00000000-0000-0000-0000-000000000001': {
    id: '20000000-0000-0000-0000-000000000001',
    business_id: '00000000-0000-0000-0000-000000000001',
    place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    is_connected: true,
    total_reviews: 148,
    average_rating: 4.9,
    unanswered_reviews_count: 3,
    rating_distribution: {
      5: 136,
      4: 9,
      3: 2,
      2: 1,
      1: 0,
    },
    recent_reviews: [
      {
        author: 'Rohan Mehta',
        rating: 5,
        relative_time: '2 days ago',
        text: 'Loved the cold brew and almond croissant! Tapped the card on the bill folder, super smooth experience.',
        has_response: true,
        reply_text: 'Thank you so much Rohan! Glad you enjoyed the cold brew.',
      },
      {
        author: 'Priya Sharma',
        rating: 5,
        relative_time: '4 days ago',
        text: 'Best sourdough in Bandra. Staff is warm and the ambient music is great.',
        has_response: false,
      },
      {
        author: 'Arjun Patel',
        rating: 4,
        relative_time: '1 week ago',
        text: 'Great coffee, seating gets crowded on Sunday mornings.',
        has_response: false,
      },
      {
        author: 'Maya Sen',
        rating: 5,
        relative_time: '2 weeks ago',
        text: 'The baristas really know their beans. Tried their Ethiopia pour-over and it was sensational!',
        has_response: true,
      },
    ],
    last_synced_at: new Date(Date.now() - 3600000).toISOString(),
  },
  '00000000-0000-0000-0000-000000000002': {
    id: '20000000-0000-0000-0000-000000000002',
    business_id: '00000000-0000-0000-0000-000000000002',
    place_id: 'ChIJN2t_tDeuEmsRUsoyG83frY5',
    is_connected: true,
    total_reviews: 92,
    average_rating: 4.8,
    unanswered_reviews_count: 1,
    rating_distribution: {
      5: 81,
      4: 8,
      3: 2,
      2: 1,
      1: 0,
    },
    recent_reviews: [
      {
        author: 'Sneha Roy',
        rating: 5,
        relative_time: 'Yesterday',
        text: 'Outstanding keratin treatment! Clean and relaxing salon atmosphere.',
        has_response: true,
      },
      {
        author: 'Kavita Verma',
        rating: 5,
        relative_time: '5 days ago',
        text: 'Bridal prep packages are totally worth it. The staff is so gentle.',
        has_response: false,
      },
    ],
    last_synced_at: new Date(Date.now() - 7200000).toISOString(),
  },
};

export const INITIAL_DEMO_SUBSCRIPTIONS: Record<string, Subscription> = {
  '00000000-0000-0000-0000-000000000001': {
    id: '30000000-0000-0000-0000-000000000001',
    business_id: '00000000-0000-0000-0000-000000000001',
    plan_id: 'growth',
    status: 'active',
    billing_cycle: 'monthly',
    price_inr: 199,
    current_period_start: new Date(Date.now() - 15 * 86400000).toISOString(),
    current_period_end: new Date(Date.now() + 15 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  '00000000-0000-0000-0000-000000000002': {
    id: '30000000-0000-0000-0000-000000000002',
    business_id: '00000000-0000-0000-0000-000000000002',
    plan_id: 'premium',
    status: 'active',
    billing_cycle: 'monthly',
    price_inr: 499,
    current_period_start: new Date(Date.now() - 10 * 86400000).toISOString(),
    current_period_end: new Date(Date.now() + 20 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  '00000000-0000-0000-0000-000000000003': {
    id: '30000000-0000-0000-0000-000000000003',
    business_id: '00000000-0000-0000-0000-000000000003',
    plan_id: 'business_pro',
    status: 'active',
    billing_cycle: 'monthly',
    price_inr: 999,
    current_period_start: new Date(Date.now() - 5 * 86400000).toISOString(),
    current_period_end: new Date(Date.now() + 25 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
};

// Generate realistic daily events over the last 30 days
const generateRealisticEvents = (): AnalyticsEvent[] => {
  const events: AnalyticsEvent[] = [];
  const now = Date.now();
  const dayMs = 86400000;

  INITIAL_DEMO_BUSINESSES.forEach((biz) => {
    const bizCards = INITIAL_DEMO_CARDS.filter((c) => c.business_id === biz.id);
    const cardId = bizCards[0]?.id || '10000000-0000-0000-0000-000000000001';

    // Last 30 days
    for (let day = 0; day < 30; day++) {
      const dayTimestamp = now - day * dayMs;
      // Volume variation
      const baseDailyTaps = biz.slug === 'abc-cafe' ? 12 : biz.slug === 'apex-gym' ? 18 : 8;
      const count = Math.max(3, Math.floor(baseDailyTaps + (Math.sin(day) * 5)));

      for (let i = 0; i < count; i++) {
        const timeOffset = Math.floor(Math.random() * (12 * 3600000));
        const eventDate = new Date(dayTimestamp - timeOffset).toISOString();
        const isQr = i % 4 === 0;

        events.push({
          id: `evt-${biz.slug}-${day}-${i}`,
          business_id: biz.id,
          card_id: cardId,
          event_type: isQr ? 'qr_scan' : 'nfc_tap',
          device_category: i % 3 === 0 ? 'desktop' : 'mobile',
          destination_mode: biz.destination_mode,
          created_at: eventDate,
          referrer: isQr ? 'Camera App' : 'Apple CoreNFC',
        });
      }
    }
  });

  return events;
};

export const INITIAL_DEMO_EVENTS: AnalyticsEvent[] = generateRealisticEvents();
