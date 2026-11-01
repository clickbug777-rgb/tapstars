import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Business, NfcCard, AnalyticsEvent, AdminStats, DestinationMode } from '../types';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';
import { INITIAL_DEMO_BUSINESSES, INITIAL_DEMO_CARDS, INITIAL_DEMO_EVENTS } from '../lib/demoData';

interface DataContextType {
  businesses: Business[];
  cards: NfcCard[];
  events: AnalyticsEvent[];
  stats: AdminStats;
  isLoading: boolean;
  isSupabaseLive: boolean;
  getBusinessBySlug: (slug: string) => Business | undefined;
  getBusinessById: (id: string) => Business | undefined;
  getCardsByBusinessId: (businessId: string) => NfcCard[];
  createBusiness: (business: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => Promise<Business>;
  updateBusiness: (id: string, updates: Partial<Business>) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<boolean>;
  toggleBusinessStatus: (id: string) => Promise<boolean>;
  createCard: (card: { card_uid: string; business_id: string; label: string }) => Promise<NfcCard>;
  updateCard: (id: string, updates: Partial<NfcCard>) => Promise<NfcCard>;
  deleteCard: (id: string) => Promise<boolean>;
  toggleCardStatus: (id: string) => Promise<boolean>;
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

const STORAGE_KEY_BIZ = 'tapstars_data_businesses';
const STORAGE_KEY_CARDS = 'tapstars_data_cards';
const STORAGE_KEY_EVENTS = 'tapstars_data_events';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Load initial data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);

    if (supabase && CONFIG.isSupabaseConfigured()) {
      try {
        const [bizRes, cardRes, evtRes] = await Promise.all([
          supabase.from('businesses').select('*').order('created_at', { ascending: false }),
          supabase.from('nfc_cards').select('*, businesses(name, slug)').order('created_at', { ascending: false }),
          supabase.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(200),
        ]);

        if (!bizRes.error && bizRes.data) {
          const mappedCards: NfcCard[] = (cardRes.data || []).map((c: any) => ({
            id: c.id,
            card_uid: c.card_uid,
            business_id: c.business_id,
            business_name: c.businesses?.name || '',
            business_slug: c.businesses?.slug || '',
            label: c.label || 'NFC Card',
            is_active: c.is_active ?? true,
            created_at: c.created_at,
            last_tapped_at: c.last_tapped_at,
            tap_count: c.tap_count || 0,
          }));

          setBusinesses(bizRes.data as Business[]);
          setCards(mappedCards);
          setEvents((evtRes.data || []) as AnalyticsEvent[]);
          setIsSupabaseLive(true);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[TapStars] Error fetching from Supabase, using local fallback:', err);
      }
    }

    // Local / Demo Mode fallback
    const localBiz = localStorage.getItem(STORAGE_KEY_BIZ);
    const localCards = localStorage.getItem(STORAGE_KEY_CARDS);
    const localEvents = localStorage.getItem(STORAGE_KEY_EVENTS);

    if (localBiz && localCards) {
      try {
        setBusinesses(JSON.parse(localBiz));
        setCards(JSON.parse(localCards));
        setEvents(localEvents ? JSON.parse(localEvents) : INITIAL_DEMO_EVENTS);
      } catch {
        setBusinesses(INITIAL_DEMO_BUSINESSES);
        setCards(INITIAL_DEMO_CARDS);
        setEvents(INITIAL_DEMO_EVENTS);
      }
    } else {
      // Seed initial demo data
      setBusinesses(INITIAL_DEMO_BUSINESSES);
      setCards(INITIAL_DEMO_CARDS);
      setEvents(INITIAL_DEMO_EVENTS);
      localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(INITIAL_DEMO_BUSINESSES));
      localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(INITIAL_DEMO_CARDS));
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_DEMO_EVENTS));
    }

    setIsSupabaseLive(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Sync to localStorage in demo mode
  const syncLocal = (newBiz: Business[], newCards: NfcCard[], newEvents: AnalyticsEvent[]) => {
    if (!isSupabaseLive) {
      localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(newBiz));
      localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(newEvents));
    }
  };

  const getBusinessBySlug = useCallback(
    (slug: string) => {
      const cleanSlug = slug.toLowerCase().trim();
      return businesses.find((b) => b.slug.toLowerCase() === cleanSlug);
    },
    [businesses]
  );

  const getBusinessById = useCallback(
    (id: string) => {
      return businesses.find((b) => b.id === id);
    },
    [businesses]
  );

  const getCardsByBusinessId = useCallback(
    (businessId: string) => {
      return cards.filter((c) => c.business_id === businessId);
    },
    [cards]
  );

  // Business CRUD
  const createBusiness = async (
    data: Omit<Business, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Business> => {
    const newId = `biz-${Date.now()}`;
    const now = new Date().toISOString();
    const newBiz: Business = {
      ...data,
      id: newId,
      created_at: now,
      updated_at: now,
    };

    if (supabase && isSupabaseLive) {
      const { data: inserted, error } = await supabase
        .from('businesses')
        .insert({
          name: data.name,
          slug: data.slug,
          category: data.category,
          description: data.description,
          logo_url: data.logo_url,
          cover_image_url: data.cover_image_url,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          website: data.website,
          address: data.address,
          google_maps_url: data.google_maps_url,
          google_review_url: data.google_review_url,
          instagram_url: data.instagram_url,
          facebook_url: data.facebook_url,
          youtube_url: data.youtube_url,
          linkedin_url: data.linkedin_url,
          custom_links: data.custom_links || [],
          destination_mode: data.destination_mode,
          is_active: data.is_active,
        })
        .select()
        .single();

      if (!error && inserted) {
        const fullBiz = inserted as Business;
        const updatedList = [fullBiz, ...businesses];
        setBusinesses(updatedList);
        return fullBiz;
      }
    }

    const updated = [newBiz, ...businesses];
    setBusinesses(updated);
    syncLocal(updated, cards, events);
    return newBiz;
  };

  const updateBusiness = async (id: string, updates: Partial<Business>): Promise<Business> => {
    const now = new Date().toISOString();

    if (supabase && isSupabaseLive) {
      await supabase
        .from('businesses')
        .update({
          ...updates,
          updated_at: now,
        })
        .eq('id', id);
    }

    const updated = businesses.map((b) => (b.id === id ? { ...b, ...updates, updated_at: now } : b));
    setBusinesses(updated);

    // Also update card references if slug or name changed
    const target = updated.find((b) => b.id === id);
    let updatedCards = cards;
    if (target && (updates.name || updates.slug)) {
      updatedCards = cards.map((c) =>
        c.business_id === id
          ? {
              ...c,
              business_name: target.name,
              business_slug: target.slug,
            }
          : c
      );
      setCards(updatedCards);
    }

    syncLocal(updated, updatedCards, events);
    return target!;
  };

  const deleteBusiness = async (id: string): Promise<boolean> => {
    if (supabase && isSupabaseLive) {
      await supabase.from('businesses').delete().eq('id', id);
    }
    const updatedBiz = businesses.filter((b) => b.id !== id);
    const updatedCards = cards.filter((c) => c.business_id !== id);
    setBusinesses(updatedBiz);
    setCards(updatedCards);
    syncLocal(updatedBiz, updatedCards, events);
    return true;
  };

  const toggleBusinessStatus = async (id: string): Promise<boolean> => {
    const target = businesses.find((b) => b.id === id);
    if (!target) return false;
    const newStatus = !target.is_active;
    await updateBusiness(id, { is_active: newStatus });
    return newStatus;
  };

  // Cards CRUD
  const createCard = async (cardData: {
    card_uid: string;
    business_id: string;
    label: string;
  }): Promise<NfcCard> => {
    const business = businesses.find((b) => b.id === cardData.business_id);
    const newCard: NfcCard = {
      id: `card-${Date.now()}`,
      card_uid: cardData.card_uid.trim().toUpperCase(),
      business_id: cardData.business_id,
      business_name: business?.name || '',
      business_slug: business?.slug || '',
      label: cardData.label || 'NFC Card',
      is_active: true,
      created_at: new Date().toISOString(),
      tap_count: 0,
    };

    if (supabase && isSupabaseLive) {
      const { data: inserted, error } = await supabase
        .from('nfc_cards')
        .insert({
          card_uid: newCard.card_uid,
          business_id: newCard.business_id,
          label: newCard.label,
          is_active: true,
        })
        .select()
        .single();

      if (!error && inserted) {
        const full = {
          ...newCard,
          id: inserted.id,
          created_at: inserted.created_at,
        };
        const updated = [full, ...cards];
        setCards(updated);
        return full;
      }
    }

    const updated = [newCard, ...cards];
    setCards(updated);
    syncLocal(businesses, updated, events);
    return newCard;
  };

  const updateCard = async (id: string, updates: Partial<NfcCard>): Promise<NfcCard> => {
    if (supabase && isSupabaseLive) {
      await supabase.from('nfc_cards').update(updates).eq('id', id);
    }

    const targetBiz = updates.business_id ? businesses.find((b) => b.id === updates.business_id) : undefined;

    const updated = cards.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          ...updates,
          ...(targetBiz ? { business_name: targetBiz.name, business_slug: targetBiz.slug } : {}),
        };
      }
      return c;
    });

    setCards(updated);
    syncLocal(businesses, updated, events);
    return updated.find((c) => c.id === id)!;
  };

  const deleteCard = async (id: string): Promise<boolean> => {
    if (supabase && isSupabaseLive) {
      await supabase.from('nfc_cards').delete().eq('id', id);
    }
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    syncLocal(businesses, updated, events);
    return true;
  };

  const toggleCardStatus = async (id: string): Promise<boolean> => {
    const target = cards.find((c) => c.id === id);
    if (!target) return false;
    const newStatus = !target.is_active;
    await updateCard(id, { is_active: newStatus });
    return newStatus;
  };

  // Analytics event recording
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

    // If card tapped, increment card tap count
    if (eventData.card_id) {
      const card = cards.find((c) => c.id === eventData.card_id || c.card_uid === eventData.card_id);
      if (card) {
        updateCard(card.id, {
          tap_count: (card.tap_count || 0) + 1,
          last_tapped_at: new Date().toISOString(),
        });
      }
    }

    if (supabase && isSupabaseLive) {
      await supabase.from('analytics_events').insert({
        business_id: eventData.business_id,
        card_id: eventData.card_id || null,
        event_type: eventData.event_type,
        device_category: eventData.device_category || 'mobile',
        destination_mode: eventData.destination_mode,
      });
    }

    const updatedEvents = [newEvent, ...events.slice(0, 300)];
    setEvents(updatedEvents);
    syncLocal(businesses, cards, updatedEvents);
  };

  const resetToDemoData = () => {
    setBusinesses(INITIAL_DEMO_BUSINESSES);
    setCards(INITIAL_DEMO_CARDS);
    setEvents(INITIAL_DEMO_EVENTS);
    localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(INITIAL_DEMO_BUSINESSES));
    localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(INITIAL_DEMO_CARDS));
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_DEMO_EVENTS));
  };

  // Computed dashboard statistics
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((b) => b.is_active).length;
  const totalCards = cards.length;
  const totalProfileVisits = events.filter((e) => e.event_type === 'profile_view').length;
  const totalRedirectClicks = events.filter(
    (e) => e.event_type === 'nfc_tap' || e.event_type === 'review_click' || e.event_type === 'qr_scan'
  ).length;
  const totalEvents = events.length;

  const stats: AdminStats = {
    totalBusinesses,
    activeBusinesses,
    totalCards,
    totalProfileVisits,
    totalRedirectClicks,
    totalEvents,
  };

  return (
    <DataContext.Provider
      value={{
        businesses,
        cards,
        events,
        stats,
        isLoading,
        isSupabaseLive,
        getBusinessBySlug,
        getBusinessById,
        getCardsByBusinessId,
        createBusiness,
        updateBusiness,
        deleteBusiness,
        toggleBusinessStatus,
        createCard,
        updateCard,
        deleteCard,
        toggleCardStatus,
        recordEvent,
        resetToDemoData,
        refreshData: loadInitialData,
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
