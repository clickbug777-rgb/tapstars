import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Business,
  NfcCard,
  AnalyticsEvent,
  AdminStats,
  ClientStats,
  DestinationMode,
  GoogleProfile,
  Subscription,
  SubscriptionPlanId,
} from '../types';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';
import {
  INITIAL_DEMO_BUSINESSES,
  INITIAL_DEMO_CARDS,
  INITIAL_DEMO_EVENTS,
  INITIAL_DEMO_GOOGLE_PROFILES,
  INITIAL_DEMO_SUBSCRIPTIONS,
} from '../lib/demoData';

interface DataContextType {
  businesses: Business[];
  cards: NfcCard[];
  events: AnalyticsEvent[];
  googleProfiles: Record<string, GoogleProfile>;
  subscriptions: Record<string, Subscription>;
  adminStats: AdminStats;
  stats: AdminStats;
  getClientStats: (businessId: string) => ClientStats;
  isLoading: boolean;
  isSupabaseLive: boolean;
  getBusinessBySlug: (slug: string) => Business | undefined;
  getBusinessById: (id: string) => Business | undefined;
  getCardByUid: (uid: string) => NfcCard | undefined;
  getCardsByBusinessId: (businessId: string) => NfcCard[];
  getEventsByBusinessId: (businessId: string) => AnalyticsEvent[];
  getGoogleProfile: (businessId: string) => GoogleProfile | undefined;
  getSubscription: (businessId: string) => Subscription | undefined;
  createBusiness: (business: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => Promise<Business>;
  updateBusiness: (id: string, updates: Partial<Business>) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<boolean>;
  toggleBusinessStatus: (id: string) => Promise<boolean>;
  createCard: (card: { card_uid: string; business_id: string; label: string; location_name?: string }) => Promise<NfcCard>;
  updateCard: (id: string, updates: Partial<NfcCard>) => Promise<NfcCard>;
  deleteCard: (id: string) => Promise<boolean>;
  toggleCardStatus: (id: string) => Promise<boolean>;
  updateSubscription: (businessId: string, planId: SubscriptionPlanId) => Promise<Subscription>;
  connectGoogleProfile: (businessId: string, placeId: string) => Promise<GoogleProfile>;
  recordEvent: (event: {
    business_id: string;
    card_id?: string;
    event_type: AnalyticsEvent['event_type'];
    device_category?: AnalyticsEvent['device_category'];
    destination_mode?: DestinationMode;
  }) => Promise<void>;
  resetToDemoData: () => void;
  refreshData: () => Promise<void>;
}

const STORAGE_KEY_BIZ = 'tapstars_data_businesses_v2';
const STORAGE_KEY_CARDS = 'tapstars_data_cards_v2';
const STORAGE_KEY_EVENTS = 'tapstars_data_events_v2';
const STORAGE_KEY_GOOGLE = 'tapstars_data_google_v2';
const STORAGE_KEY_SUBS = 'tapstars_data_subscriptions_v2';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [googleProfiles, setGoogleProfiles] = useState<Record<string, GoogleProfile>>({});
  const [subscriptions, setSubscriptions] = useState<Record<string, Subscription>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Load initial data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);

    if (supabase && CONFIG.isSupabaseConfigured()) {
      try {
        const [bizRes, cardRes, evtRes, googleRes, subRes] = await Promise.all([
          supabase.from('businesses').select('*').order('created_at', { ascending: false }),
          supabase.from('nfc_cards').select('*, businesses(name, slug)').order('created_at', { ascending: false }),
          supabase.from('tracking_events').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('google_profiles').select('*'),
          supabase.from('subscriptions').select('*'),
        ]);

        if (!bizRes.error && bizRes.data && bizRes.data.length > 0) {
          const mappedCards: NfcCard[] = (cardRes.data || []).map((c: any) => ({
            id: c.id,
            card_uid: c.card_uid,
            business_id: c.business_id,
            business_name: c.businesses?.name || '',
            business_slug: c.businesses?.slug || '',
            label: c.label || 'Main Counter',
            location_name: c.location_name || 'Front Desk',
            is_active: c.is_active ?? true,
            created_at: c.created_at,
            last_tapped_at: c.last_tapped_at,
            tap_count: c.tap_count || 0,
            qr_scan_count: c.qr_scan_count || 0,
          }));

          const googleMap: Record<string, GoogleProfile> = {};
          (googleRes.data || []).forEach((gp: any) => {
            googleMap[gp.business_id] = gp;
          });

          const subMap: Record<string, Subscription> = {};
          (subRes.data || []).forEach((sb: any) => {
            subMap[sb.business_id] = sb;
          });

          setBusinesses(bizRes.data as Business[]);
          setCards(mappedCards);
          setEvents((evtRes.data || []) as AnalyticsEvent[]);
          setGoogleProfiles(googleMap);
          setSubscriptions(subMap);
          setIsSupabaseLive(true);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[TapStars] Error fetching from Supabase, falling back to local store:', err);
      }
    }

    // Local / Demo Mode fallback
    const localBiz = localStorage.getItem(STORAGE_KEY_BIZ);
    const localCards = localStorage.getItem(STORAGE_KEY_CARDS);
    const localEvents = localStorage.getItem(STORAGE_KEY_EVENTS);
    const localGoogle = localStorage.getItem(STORAGE_KEY_GOOGLE);
    const localSubs = localStorage.getItem(STORAGE_KEY_SUBS);

    if (localBiz && localCards) {
      try {
        setBusinesses(JSON.parse(localBiz));
        setCards(JSON.parse(localCards));
        setEvents(localEvents ? JSON.parse(localEvents) : INITIAL_DEMO_EVENTS);
        setGoogleProfiles(localGoogle ? JSON.parse(localGoogle) : INITIAL_DEMO_GOOGLE_PROFILES);
        setSubscriptions(localSubs ? JSON.parse(localSubs) : INITIAL_DEMO_SUBSCRIPTIONS);
      } catch {
        setBusinesses(INITIAL_DEMO_BUSINESSES);
        setCards(INITIAL_DEMO_CARDS);
        setEvents(INITIAL_DEMO_EVENTS);
        setGoogleProfiles(INITIAL_DEMO_GOOGLE_PROFILES);
        setSubscriptions(INITIAL_DEMO_SUBSCRIPTIONS);
      }
    } else {
      setBusinesses(INITIAL_DEMO_BUSINESSES);
      setCards(INITIAL_DEMO_CARDS);
      setEvents(INITIAL_DEMO_EVENTS);
      setGoogleProfiles(INITIAL_DEMO_GOOGLE_PROFILES);
      setSubscriptions(INITIAL_DEMO_SUBSCRIPTIONS);
      localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(INITIAL_DEMO_BUSINESSES));
      localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(INITIAL_DEMO_CARDS));
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_DEMO_EVENTS));
      localStorage.setItem(STORAGE_KEY_GOOGLE, JSON.stringify(INITIAL_DEMO_GOOGLE_PROFILES));
      localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(INITIAL_DEMO_SUBSCRIPTIONS));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Sync to local storage for demo persistence
  const syncLocal = (
    newBiz: Business[],
    newCards: NfcCard[],
    newEvents: AnalyticsEvent[],
    newGoogle: Record<string, GoogleProfile>,
    newSubs: Record<string, Subscription>
  ) => {
    localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(newBiz));
    localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(newEvents));
    localStorage.setItem(STORAGE_KEY_GOOGLE, JSON.stringify(newGoogle));
    localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(newSubs));
  };

  const getBusinessBySlug = useCallback(
    (slug: string): Business | undefined => {
      const clean = slug.toLowerCase().trim();
      return businesses.find((b) => b.slug.toLowerCase() === clean);
    },
    [businesses]
  );

  const getBusinessById = useCallback(
    (id: string): Business | undefined => {
      return businesses.find((b) => b.id === id);
    },
    [businesses]
  );

  const getCardByUid = useCallback(
    (uid: string): NfcCard | undefined => {
      const clean = uid.toLowerCase().trim();
      return cards.find((c) => c.card_uid.toLowerCase() === clean);
    },
    [cards]
  );

  const getCardsByBusinessId = useCallback(
    (businessId: string): NfcCard[] => {
      return cards.filter((c) => c.business_id === businessId);
    },
    [cards]
  );

  const getEventsByBusinessId = useCallback(
    (businessId: string): AnalyticsEvent[] => {
      return events.filter((e) => e.business_id === businessId);
    },
    [events]
  );

  const getGoogleProfile = useCallback(
    (businessId: string): GoogleProfile | undefined => {
      return googleProfiles[businessId];
    },
    [googleProfiles]
  );

  const getSubscription = useCallback(
    (businessId: string): Subscription | undefined => {
      return subscriptions[businessId];
    },
    [subscriptions]
  );

  // Client Stats calculation for single business
  const getClientStats = useCallback(
    (businessId: string): ClientStats => {
      const bizCards = cards.filter((c) => c.business_id === businessId);
      const bizEvents = events.filter((e) => e.business_id === businessId);
      const gProfile = googleProfiles[businessId];
      const biz = businesses.find((b) => b.id === businessId);

      const totalTaps = bizCards.reduce((acc, c) => acc + (c.tap_count || 0), 0);
      const totalQrScans = bizCards.reduce((acc, c) => acc + (c.qr_scan_count || 0), 0);
      const totalEngagement = totalTaps + totalQrScans;
      const totalReviews = gProfile?.total_reviews ?? biz?.google_review_count ?? 148;
      const averageRating = gProfile?.average_rating ?? biz?.google_rating ?? 4.9;
      const activeCardsCount = bizCards.filter((c) => c.is_active).length;

      return {
        totalTaps,
        totalQrScans,
        totalEngagement,
        totalReviews,
        averageRating,
        reviewGrowth: 18,
        tapsGrowthPercentage: 24,
        activeCardsCount,
      };
    },
    [cards, events, googleProfiles, businesses]
  );

  // Admin stats
  const adminStats: AdminStats = useMemo(() => {
    const totalTaps = cards.reduce((acc, c) => acc + (c.tap_count || 0), 0);
    const totalQrScans = cards.reduce((acc, c) => acc + (c.qr_scan_count || 0), 0);
    const monthlyRevenue = Object.values(subscriptions).reduce((acc, s) => {
      return s.status === 'active' ? acc + (s.price_inr || 0) : acc;
    }, 0);

    return {
      totalBusinesses: businesses.length,
      activeBusinesses: businesses.filter((b) => b.is_active).length,
      totalCards: cards.length,
      totalNfcTaps: totalTaps,
      totalQrScans: totalQrScans,
      totalProfileVisits: events.filter((e) => e.event_type === 'profile_view').length,
      totalRedirectClicks: events.filter((e) => e.event_type === 'review_click' || e.event_type === 'nfc_tap').length,
      totalEvents: events.length,
      totalSubscriptions: Object.values(subscriptions).filter((s) => s.status === 'active').length,
      monthlyRevenueInr: monthlyRevenue,
    };
  }, [businesses, cards, events, subscriptions]);

  // Mutations
  const createBusiness = async (
    bizData: Omit<Business, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Business> => {
    if (isSupabaseLive && supabase) {
      const { data, error } = await supabase.from('businesses').insert([bizData]).select().single();
      if (!error && data) {
        setBusinesses((prev) => [data as Business, ...prev]);
        return data as Business;
      }
    }

    const newBiz: Business = {
      ...bizData,
      id: `biz-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newBiz, ...businesses];
    setBusinesses(updated);
    syncLocal(updated, cards, events, googleProfiles, subscriptions);
    return newBiz;
  };

  const updateBusiness = async (id: string, updates: Partial<Business>): Promise<Business> => {
    if (isSupabaseLive && supabase) {
      const { data, error } = await supabase.from('businesses').update(updates).eq('id', id).select().single();
      if (!error && data) {
        setBusinesses((prev) => prev.map((b) => (b.id === id ? (data as Business) : b)));
        return data as Business;
      }
    }

    const updated = businesses.map((b) => (b.id === id ? { ...b, ...updates, updated_at: new Date().toISOString() } : b));
    setBusinesses(updated);
    syncLocal(updated, cards, events, googleProfiles, subscriptions);
    return updated.find((b) => b.id === id)!;
  };

  const deleteBusiness = async (id: string): Promise<boolean> => {
    if (isSupabaseLive && supabase) {
      const { error } = await supabase.from('businesses').delete().eq('id', id);
      if (!error) {
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
        setCards((prev) => prev.filter((c) => c.business_id !== id));
        return true;
      }
    }

    const updatedBiz = businesses.filter((b) => b.id !== id);
    const updatedCards = cards.filter((c) => c.business_id !== id);
    setBusinesses(updatedBiz);
    setCards(updatedCards);
    syncLocal(updatedBiz, updatedCards, events, googleProfiles, subscriptions);
    return true;
  };

  const toggleBusinessStatus = async (id: string): Promise<boolean> => {
    const biz = businesses.find((b) => b.id === id);
    if (!biz) return false;
    await updateBusiness(id, { is_active: !biz.is_active });
    return true;
  };

  const createCard = async (cardData: {
    card_uid: string;
    business_id: string;
    label: string;
    location_name?: string;
  }): Promise<NfcCard> => {
    const biz = businesses.find((b) => b.id === cardData.business_id);
    const insertData = {
      card_uid: cardData.card_uid.trim().toLowerCase(),
      business_id: cardData.business_id,
      label: cardData.label,
      location_name: cardData.location_name || 'Front Desk',
      is_active: true,
      tap_count: 0,
      qr_scan_count: 0,
    };

    if (isSupabaseLive && supabase) {
      const { data, error } = await supabase.from('nfc_cards').insert([insertData]).select().single();
      if (!error && data) {
        const fullCard: NfcCard = {
          ...data,
          business_name: biz?.name || '',
          business_slug: biz?.slug || '',
        };
        setCards((prev) => [fullCard, ...prev]);
        return fullCard;
      }
    }

    const newCard: NfcCard = {
      ...insertData,
      id: `card-${Date.now()}`,
      business_name: biz?.name || '',
      business_slug: biz?.slug || '',
      created_at: new Date().toISOString(),
    };
    const updated = [newCard, ...cards];
    setCards(updated);
    syncLocal(businesses, updated, events, googleProfiles, subscriptions);
    return newCard;
  };

  const updateCard = async (id: string, updates: Partial<NfcCard>): Promise<NfcCard> => {
    if (isSupabaseLive && supabase) {
      const { data, error } = await supabase.from('nfc_cards').update(updates).eq('id', id).select().single();
      if (!error && data) {
        setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
        return data as NfcCard;
      }
    }

    const updated = cards.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCards(updated);
    syncLocal(businesses, updated, events, googleProfiles, subscriptions);
    return updated.find((c) => c.id === id)!;
  };

  const deleteCard = async (id: string): Promise<boolean> => {
    if (isSupabaseLive && supabase) {
      const { error } = await supabase.from('nfc_cards').delete().eq('id', id);
      if (!error) {
        setCards((prev) => prev.filter((c) => c.id !== id));
        return true;
      }
    }

    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    syncLocal(businesses, updated, events, googleProfiles, subscriptions);
    return true;
  };

  const toggleCardStatus = async (id: string): Promise<boolean> => {
    const card = cards.find((c) => c.id === id);
    if (!card) return false;
    await updateCard(id, { is_active: !card.is_active });
    return true;
  };

  const updateSubscription = async (businessId: string, planId: SubscriptionPlanId): Promise<Subscription> => {
    const prices: Record<SubscriptionPlanId, number> = {
      starter: 0,
      growth: 199,
      premium: 499,
      business_pro: 999,
    };

    const sub: Subscription = {
      id: subscriptions[businessId]?.id || `sub-${Date.now()}`,
      business_id: businessId,
      plan_id: planId,
      status: 'active',
      billing_cycle: 'monthly',
      price_inr: prices[planId],
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
      created_at: subscriptions[businessId]?.created_at || new Date().toISOString(),
    };

    const newSubs = { ...subscriptions, [businessId]: sub };
    setSubscriptions(newSubs);
    syncLocal(businesses, cards, events, googleProfiles, newSubs);
    return sub;
  };

  const connectGoogleProfile = async (businessId: string, placeId: string): Promise<GoogleProfile> => {
    const profile: GoogleProfile = {
      id: googleProfiles[businessId]?.id || `gp-${Date.now()}`,
      business_id: businessId,
      place_id: placeId,
      is_connected: true,
      total_reviews: 152,
      average_rating: 4.9,
      unanswered_reviews_count: 2,
      rating_distribution: {
        5: 140,
        4: 10,
        3: 2,
        2: 0,
        1: 0,
      },
      recent_reviews: [
        {
          author: 'Harsh Vardhan',
          rating: 5,
          relative_time: 'Just now',
          text: 'Super easy tap review card on the counter! 5 stars for the service.',
          has_response: false,
        },
      ],
      last_synced_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newGoogle = { ...googleProfiles, [businessId]: profile };
    setGoogleProfiles(newGoogle);
    syncLocal(businesses, cards, events, newGoogle, subscriptions);
    return profile;
  };

  const recordEvent = async (eventData: {
    business_id: string;
    card_id?: string;
    event_type: AnalyticsEvent['event_type'];
    device_category?: AnalyticsEvent['device_category'];
    destination_mode?: DestinationMode;
  }): Promise<void> => {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      business_id: eventData.business_id,
      card_id: eventData.card_id,
      event_type: eventData.event_type,
      device_category: eventData.device_category || 'mobile',
      destination_mode: eventData.destination_mode,
      created_at: new Date().toISOString(),
    };

    // Update in memory & state
    setEvents((prev) => [newEvent, ...prev.slice(0, 499)]);

    // Update card tap or qr counter
    if (eventData.card_id) {
      setCards((prev) =>
        prev.map((c) => {
          if (c.id === eventData.card_id || c.card_uid === eventData.card_id) {
            return {
              ...c,
              tap_count: eventData.event_type === 'nfc_tap' ? (c.tap_count || 0) + 1 : c.tap_count,
              qr_scan_count: eventData.event_type === 'qr_scan' ? (c.qr_scan_count || 0) + 1 : c.qr_scan_count,
              last_tapped_at: new Date().toISOString(),
            };
          }
          return c;
        })
      );
    }
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_BIZ);
    localStorage.removeItem(STORAGE_KEY_CARDS);
    localStorage.removeItem(STORAGE_KEY_EVENTS);
    localStorage.removeItem(STORAGE_KEY_GOOGLE);
    localStorage.removeItem(STORAGE_KEY_SUBS);
    setBusinesses(INITIAL_DEMO_BUSINESSES);
    setCards(INITIAL_DEMO_CARDS);
    setEvents(INITIAL_DEMO_EVENTS);
    setGoogleProfiles(INITIAL_DEMO_GOOGLE_PROFILES);
    setSubscriptions(INITIAL_DEMO_SUBSCRIPTIONS);
  };

  const refreshData = async () => {
    await loadInitialData();
  };

  return (
    <DataContext.Provider
      value={{
        businesses,
        cards,
        events,
        googleProfiles,
        subscriptions,
        adminStats,
        stats: adminStats,
        getClientStats,
        isLoading,
        isSupabaseLive,
        getBusinessBySlug,
        getBusinessById,
        getCardByUid,
        getCardsByBusinessId,
        getEventsByBusinessId,
        getGoogleProfile,
        getSubscription,
        createBusiness,
        updateBusiness,
        deleteBusiness,
        toggleBusinessStatus,
        createCard,
        updateCard,
        deleteCard,
        toggleCardStatus,
        updateSubscription,
        connectGoogleProfile,
        recordEvent,
        resetToDemoData,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
