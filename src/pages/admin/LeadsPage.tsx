import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Users,
  Search,
  Phone,
  MessageCircle,
  Plus,
  Download,
  RotateCcw,
  MapPin,
  CheckCircle2,
  Flame,
  LayoutGrid,
  List,
  X,
  Cloud,
  RefreshCw,
} from 'lucide-react';
import { INITIAL_LEADS, Lead } from '../../data/defaultLeads';
import { useData } from '../../context/DataContext';
import { supabase } from '../../lib/supabase';

const STORAGE_KEY = 'tapstars_leads_crm_v1';

export const LeadsPage: React.FC = () => {
  const { createBusiness, isSupabaseLive } = useData();
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Initialize leads from localStorage or default Gandhinagar leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_LEADS;
  });

  // Load leads from Supabase Cloud on mount & subscribe to real-time changes
  useEffect(() => {
    let isMounted = true;

    async function loadCloudLeads() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('custom_links')
          .eq('slug', '_system_leads_pipeline')
          .single();

        if (!error && data?.custom_links && Array.isArray(data.custom_links) && data.custom_links.length > 0) {
          if (isMounted) {
            setLeads(data.custom_links as Lead[]);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.custom_links));
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.warn('[TapStars] Error fetching cloud leads:', err);
      }
    }

    loadCloudLeads();

    // Subscribe to real-time updates so changes made on mobile phone instantly reflect on desktop
    let channel: any = null;
    if (supabase) {
      try {
        channel = supabase
          .channel('system-leads-realtime')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'businesses',
              filter: 'slug=eq._system_leads_pipeline',
            },
            (payload: any) => {
              if (
                payload.new?.custom_links &&
                Array.isArray(payload.new.custom_links) &&
                payload.new.custom_links.length > 0
              ) {
                setLeads(payload.new.custom_links as Lead[]);
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.new.custom_links));
                } catch {
                  // ignore
                }
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.warn('[TapStars] Realtime channel setup error:', err);
      }
    }

    return () => {
      isMounted = false;
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Save to localStorage & push to Supabase Cloud on change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage:', e);
    }

    const client = supabase;
    if (client) {
      const timer = setTimeout(async () => {
        setIsCloudSyncing(true);
        try {
          await client
            .from('businesses')
            .update({
              custom_links: leads as any,
              updated_at: new Date().toISOString(),
            })
            .eq('slug', '_system_leads_pipeline');
        } catch (err) {
          console.warn('[TapStars] Error syncing leads to Supabase:', err);
        } finally {
          setIsCloudSyncing(false);
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [leads]);

  // Manual pull from cloud
  const handleManualCloudSync = useCallback(async () => {
    if (!supabase) {
      showToast('Offline Mode: Supabase not active');
      return;
    }

    setIsManualSyncing(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('custom_links')
        .eq('slug', '_system_leads_pipeline')
        .single();

      if (!error && data?.custom_links && Array.isArray(data.custom_links) && data.custom_links.length > 0) {
        setLeads(data.custom_links as Lead[]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.custom_links));
        showToast('Pulled latest leads from cloud');
      } else {
        showToast('Already up to date with cloud');
      }
    } catch {
      showToast('Failed to sync from cloud');
    } finally {
      setIsManualSyncing(false);
    }
  }, [showToast]);

  // View mode: 'kanban' | 'list'
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [reviewTier, setReviewTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'reviews_asc' | 'reviews_desc' | 'name' | 'deal_value'>('reviews_asc');

  // Modal States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('Dental clinic');
  const [newLeadArea, setNewLeadArea] = useState('Kudasan');
  const [newLeadAddress, setNewLeadAddress] = useState('');
  const [newLeadReviews, setNewLeadReviews] = useState('10');
  const [newLeadRating, setNewLeadRating] = useState('5.0');
  const [newLeadDealValue, setNewLeadDealValue] = useState('1499');

  // Extract unique categories & areas
  const categories = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.category) set.add(l.category);
    });
    return Array.from(set).sort();
  }, [leads]);

  const areas = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.area) set.add(l.area);
    });
    return Array.from(set).sort();
  }, [leads]);

  // Filtered and Sorted Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            lead.business_name.toLowerCase().includes(q) ||
            lead.phone.toLowerCase().includes(q) ||
            lead.address.toLowerCase().includes(q) ||
            lead.area.toLowerCase().includes(q) ||
            lead.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && lead.category !== selectedCategory) {
          return false;
        }

        // Area filter
        if (selectedArea !== 'all' && lead.area !== selectedArea) {
          return false;
        }

        // Stage filter
        if (selectedStage !== 'all' && lead.stage !== selectedStage) {
          return false;
        }

        // Review count tier
        if (reviewTier === 'urgent' && lead.review_count >= 30) return false;
        if (reviewTier === 'medium' && (lead.review_count < 30 || lead.review_count > 80)) return false;
        if (reviewTier === 'established' && lead.review_count < 80) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'reviews_asc') return a.review_count - b.review_count;
        if (sortBy === 'reviews_desc') return b.review_count - a.review_count;
        if (sortBy === 'name') return a.business_name.localeCompare(b.business_name);
        if (sortBy === 'deal_value') return (b.deal_value || 0) - (a.deal_value || 0);
        return 0;
      });
  }, [leads, searchQuery, selectedCategory, selectedArea, selectedStage, reviewTier, sortBy]);

  // Pipeline Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const hotLeads = leads.filter((l) => l.review_count < 50).length;
    const inPipeline = leads.filter((l) =>
      ['contacted', 'demo_scheduled', 'pitched'].includes(l.stage)
    ).length;
    const won = leads.filter((l) => ['won', 'delivered'].includes(l.stage)).length;
    const totalRevenue = leads
      .filter((l) => ['won', 'delivered'].includes(l.stage))
      .reduce((acc, curr) => acc + (curr.deal_value || 1499), 0);
    const potentialPipelineValue = leads.reduce((acc, curr) => acc + (curr.deal_value || 1499), 0);

    return { total, hotLeads, inPipeline, won, totalRevenue, potentialPipelineValue };
  }, [leads]);

  // Stage updates
  const updateLeadStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              stage: newStage,
              last_contacted_at:
                newStage !== 'new' ? new Date().toISOString() : l.last_contacted_at,
            }
          : l
      )
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
    showToast(`Updated status to: ${newStage.replace('_', ' ').toUpperCase()}`);
  };

  // Update lead notes or deal value
  const updateLeadDetails = (leadId: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, ...updates } : l)));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null));
    }
    showToast('Lead details saved');
  };

  // Instant WhatsApp Pitch Generator
  const handleWhatsAppPitch = (lead: Lead) => {
    // Clean phone number (strip spaces/dashes)
    let cleanPhone = lead.phone.replace(/[^\d]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '91' + cleanPhone.substring(1);
    } else if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const message = `Namaste! JayrajSinh here from TapStars Gandhinagar.

I noticed that ${lead.business_name} in ${lead.area} has great customer satisfaction with a ${lead.review_rating}★ rating, but only ${lead.review_count} Google reviews. Most happy customers simply forget to post once they leave your counter.

With our TapStars Smart NFC Review Card on your counter or billing desk, your customer touches their phone and your Google 5-star review dialog pops up in 1 second. No app or typing needed.

I am demonstrating these cards to businesses in ${lead.area} today. Can I drop by for a quick 30-second live demo on your smartphone?`;

    // Automatically mark as contacted if it was new
    if (lead.stage === 'new') {
      updateLeadStage(lead.id, 'contacted');
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Convert to TapStars Business Client
  const handleConvertToClient = async (lead: Lead) => {
    try {
      const slug = lead.business_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 30);

      await createBusiness({
        name: lead.business_name,
        slug: slug || `client-${Date.now()}`,
        category: lead.category,
        description: `Verified client onboarded via TapStars Lead Pipeline. Location: ${lead.area}`,
        logo_url: '',
        cover_image_url: '',
        phone: lead.phone,
        whatsapp: lead.phone.replace(/[^\d]/g, ''),
        email: '',
        website: lead.website || '',
        address: lead.address,
        google_maps_url: '',
        google_review_url: '',
        instagram_url: '',
        facebook_url: '',
        youtube_url: '',
        linkedin_url: '',
        destination_mode: 'direct_review',
        is_active: true,
      });

      updateLeadStage(lead.id, 'won');
      showToast(`🎉 Converted "${lead.business_name}" to TapStars Client!`);
    } catch (e) {
      console.error(e);
      showToast('Error converting lead to client');
    }
  };

  // Add Custom Lead
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    const newLead: Lead = {
      id: `custom-lead-${Date.now()}`,
      business_name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      category: newLeadCategory,
      address: newLeadAddress.trim() || `${newLeadArea}, Gandhinagar`,
      area: newLeadArea,
      review_count: parseInt(newLeadReviews) || 0,
      review_rating: parseFloat(newLeadRating) || 5.0,
      stage: 'new',
      deal_value: parseInt(newLeadDealValue) || 1499,
      notes: '',
      created_at: new Date().toISOString(),
    };

    setLeads([newLead, ...leads]);
    setIsAddModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadAddress('');
    showToast(`Added lead: ${newLead.business_name}`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Business Name',
      'Phone',
      'Category',
      'Area',
      'Review Count',
      'Rating',
      'Pipeline Stage',
      'Deal Value (INR)',
      'Address',
      'Website',
      'Notes',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.business_name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.category}"`,
      `"${l.area}"`,
      l.review_count,
      l.review_rating,
      `"${l.stage}"`,
      l.deal_value || 1499,
      `"${l.address.replace(/"/g, '""')}"`,
      `"${l.website || ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TapStars_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file');
  };

  // Reset to default 69 Gandhinagar leads
  const handleResetLeads = async () => {
    if (window.confirm('Reset all leads back to the default 69 verified Gandhinagar businesses across all devices?')) {
      setLeads(INITIAL_LEADS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      if (supabase) {
        setIsCloudSyncing(true);
        try {
          await supabase
            .from('businesses')
            .update({
              custom_links: INITIAL_LEADS as any,
              updated_at: new Date().toISOString(),
            })
            .eq('slug', '_system_leads_pipeline');
        } catch (e) {
          console.warn('Error resetting leads in Supabase:', e);
        } finally {
          setIsCloudSyncing(false);
        }
      }
      showToast('Reset leads to default Gandhinagar list across all devices');
    }
  };

  const STAGES: { key: Lead['stage']; label: string; color: string; border: string }[] = [
    { key: 'new', label: 'New Leads', color: 'bg-neutral-100 text-neutral-800', border: 'border-neutral-200' },
    { key: 'contacted', label: 'Contacted', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
    { key: 'demo_scheduled', label: 'Demo Set', color: 'bg-purple-50 text-purple-700', border: 'border-purple-200' },
    { key: 'pitched', label: 'Pitched', color: 'bg-amber-50 text-amber-800', border: 'border-amber-200' },
    { key: 'won', label: 'Deals Won', color: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-200' },
    { key: 'delivered', label: 'Delivered', color: 'bg-teal-50 text-teal-800', border: 'border-teal-200' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-neutral-900 text-white rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-neutral-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
              Lead Pipeline & Client CRM
            </h1>

            {/* Cloud Sync Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              isSupabaseLive
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                : 'bg-amber-50 text-amber-800 border-amber-200/80'
            }`}>
              <Cloud className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-pulse text-amber-600' : isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span>
                {isCloudSyncing
                  ? 'Saving to Cloud...'
                  : isSupabaseLive
                  ? 'Cloud Synced (Live)'
                  : 'Offline (Local)'}
              </span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Gandhinagar High-Opportunity Businesses • NFC Google Review Card Sales System • Auto-synced across Phone & Laptop
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleManualCloudSync}
            disabled={isManualSyncing}
            title="Pull latest updates from Supabase Cloud"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-neutral-500 ${isManualSyncing ? 'animate-spin' : ''}`} />
            <span>{isManualSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleResetLeads}
            title="Reset to default 69 verified Gandhinagar leads"
            className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider font-mono">
            Total Pipeline
          </div>
          <div className="text-2xl font-black text-neutral-950">{metrics.total}</div>
          <div className="text-[10px] text-neutral-400">Gandhinagar businesses</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-amber-900 uppercase tracking-wider font-mono">
            <span>Hot Leads</span>
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-950">{metrics.hotLeads}</div>
          <div className="text-[10px] text-amber-700">&lt; 50 reviews (Highest urgency)</div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider font-mono">
            Active in Pitch
          </div>
          <div className="text-2xl font-black text-blue-950">{metrics.inPipeline}</div>
          <div className="text-[10px] text-blue-700">Contacted / In Demo</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-900 uppercase tracking-wider font-mono">
            <span>Deals Closed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">{metrics.won}</div>
          <div className="text-[10px] text-emerald-700">Cards ordered / delivered</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 text-white shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono">
            Closed Revenue
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{metrics.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-neutral-400">
            Pipeline: ₹{metrics.potentialPipelineValue.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by business name, phone, complex, or street..."
              className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-neutral-900 placeholder-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pipeline Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table View ({filteredLeads.length})</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-neutral-100 text-xs">
          <div>
            <label className="block text-[10px] font-semibold text-neutral-500 mb-1 uppercase tracking-wider font-mono">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none"
            >
              <option value="all">All Categories ({leads.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-neutral-500 mb-1 uppercase tracking-wider font-mono">
              Area / Sector
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none"
            >
              <option value="all">All Areas</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-neutral-500 mb-1 uppercase tracking-wider font-mono">
              Pipeline Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none"
            >
              <option value="all">All Stages</option>
              <option value="new">New Opportunity</option>
              <option value="contacted">Contacted</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="pitched">Pitched</option>
              <option value="won">Deals Won</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-neutral-500 mb-1 uppercase tracking-wider font-mono">
              Review Urgency
            </label>
            <select
              value={reviewTier}
              onChange={(e) => setReviewTier(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none"
            >
              <option value="all">All Review Counts</option>
              <option value="urgent">🔥 Hot (&lt; 30 reviews)</option>
              <option value="medium">⚡ Medium (30–80 reviews)</option>
              <option value="established">Established (80–150 reviews)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-neutral-500 mb-1 uppercase tracking-wider font-mono">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none"
            >
              <option value="reviews_asc">Fewest Reviews First</option>
              <option value="reviews_desc">Most Reviews First</option>
              <option value="name">Business Name (A–Z)</option>
              <option value="deal_value">Deal Value (Highest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: KANBAN PIPELINE BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
          {STAGES.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.stage === col.key);
            const colTotalValue = colLeads.reduce((acc, curr) => acc + (curr.deal_value || 1499), 0);

            return (
              <div
                key={col.key}
                className={`bg-neutral-100/60 rounded-2xl border ${col.border} p-3 flex flex-col space-y-3 min-h-[500px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200/70">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-neutral-900">{col.label}</span>
                    <span className="w-5 h-5 rounded-full bg-white border border-neutral-200 text-[10px] font-bold text-neutral-700 flex items-center justify-center shadow-2xs">
                      {colLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold">
                    ₹{colTotalValue.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="space-y-2.5 overflow-y-auto max-h-[70vh] pr-0.5">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 bg-white rounded-xl border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2.5 group"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1 text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-semibold truncate max-w-[110px]">
                          {lead.category}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md font-bold font-mono ${
                            lead.review_count < 20
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : lead.review_count < 50
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {lead.review_count} rev ({lead.review_rating}★)
                        </span>
                      </div>

                      {/* Business Title */}
                      <div>
                        <h4
                          onClick={() => setSelectedLead(lead)}
                          className="font-bold text-xs text-neutral-950 hover:text-blue-600 cursor-pointer line-clamp-2 leading-tight"
                        >
                          {lead.business_name}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-1">
                          <MapPin className="w-3 h-3 shrink-0 text-neutral-400" />
                          <span className="truncate">{lead.area}</span>
                        </div>
                      </div>

                      {/* Deal Value & Stage Selector */}
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px]">
                        <span className="font-mono font-bold text-emerald-700">
                          ₹{(lead.deal_value || 1499).toLocaleString('en-IN')}
                        </span>

                        <select
                          value={lead.stage}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                          className="text-[10px] bg-neutral-50 border border-neutral-200 rounded-md px-1.5 py-0.5 text-neutral-700 font-medium focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="demo_scheduled">Demo Set</option>
                          <option value="pitched">Pitched</option>
                          <option value="won">Won 🎉</option>
                          <option value="delivered">Delivered</option>
                          <option value="lost">Lost</option>
                        </select>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="grid grid-cols-3 gap-1 pt-1">
                        <button
                          onClick={() => handleWhatsAppPitch(lead)}
                          title="Open WhatsApp with customized pitch script"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-3 h-3 fill-white" />
                          <span>Chat</span>
                        </button>

                        <a
                          href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
                          title={`Call ${lead.phone}`}
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-[10px] font-semibold border border-neutral-200 transition-colors"
                        >
                          <span>Notes</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {colLeads.length === 0 && (
                    <div className="py-8 text-center text-neutral-400 text-xs italic">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: DETAILED TABLE / LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200/80 text-[10px] uppercase font-mono text-neutral-500">
                  <th className="py-3 px-4 font-semibold">Business Name</th>
                  <th className="py-3 px-4 font-semibold">Reviews & Urgency</th>
                  <th className="py-3 px-4 font-semibold">Area</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Contact Phone</th>
                  <th className="py-3 px-4 font-semibold">Stage</th>
                  <th className="py-3 px-4 font-semibold">Deal Value</th>
                  <th className="py-3 px-4 font-semibold text-right">Instant Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-50/60 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="font-bold text-neutral-950">{lead.business_name}</div>
                      <div className="text-[10px] text-neutral-400 max-w-xs truncate">{lead.address}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold font-mono text-[11px] ${
                            lead.review_count < 20
                              ? 'bg-rose-100 text-rose-800'
                              : lead.review_count < 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {lead.review_count < 30 && <Flame className="w-3 h-3 text-rose-600 fill-rose-500" />}
                          <span>{lead.review_count} Reviews</span>
                        </span>
                        <span className="text-neutral-500 font-mono text-[11px]">({lead.review_rating}★)</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-neutral-700">{lead.area}</td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium text-[11px]">
                        {lead.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-800">{lead.phone}</td>

                    <td className="py-3 px-4">
                      <select
                        value={lead.stage}
                        onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                        className="text-[11px] bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 text-neutral-800 font-semibold focus:outline-none"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="demo_scheduled">Demo Set</option>
                        <option value="pitched">Pitched</option>
                        <option value="won">Won 🎉</option>
                        <option value="delivered">Delivered</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                      ₹{(lead.deal_value || 1499).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleWhatsAppPitch(lead)}
                          title="Open WhatsApp with tailored pitch script"
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        </button>

                        <a
                          href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
                          title={`Call ${lead.phone}`}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => setSelectedLead(lead)}
                          title="View lead details & add notes"
                          className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold transition-colors"
                        >
                          Details
                        </button>

                        {lead.stage !== 'won' && lead.stage !== 'delivered' && (
                          <button
                            onClick={() => handleConvertToClient(lead)}
                            title="Convert into active TapStars Business Account"
                            className="px-2.5 py-1 rounded-lg bg-neutral-950 text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors"
                          >
                            + Client
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL & NOTES MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">
                  {selectedLead.category} • {selectedLead.area}
                </span>
                <h3 className="text-xl font-bold text-neutral-950 mt-1">{selectedLead.business_name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center text-xs">
              <div>
                <div className="text-[10px] text-neutral-400 font-mono">REVIEWS</div>
                <div className="font-bold text-neutral-950">{selectedLead.review_count}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 font-mono">RATING</div>
                <div className="font-bold text-neutral-950">{selectedLead.review_rating} ★</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 font-mono">DEAL VALUE</div>
                <div className="font-bold text-emerald-700">₹{selectedLead.deal_value || 1499}</div>
              </div>
            </div>

            {/* Address & Phone */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-mono font-semibold">{selectedLead.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-neutral-700">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{selectedLead.address}</span>
              </div>
            </div>

            {/* Stage Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Pipeline Stage</label>
              <select
                value={selectedLead.stage}
                onChange={(e) => updateLeadStage(selectedLead.id, e.target.value as any)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 font-bold focus:outline-none"
              >
                <option value="new">New Lead (Not Contacted)</option>
                <option value="contacted">Contacted (WhatsApp/Call Done)</option>
                <option value="demo_scheduled">Demo Scheduled</option>
                <option value="pitched">Pitched (Review Card Offered)</option>
                <option value="won">Won / Card Ordered 🎉</option>
                <option value="delivered">Delivered & Active on Counter</option>
                <option value="lost">Lost / Not Interested</option>
              </select>
            </div>

            {/* Notes Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Meeting & Follow-up Notes
              </label>
              <textarea
                rows={3}
                value={selectedLead.notes || ''}
                onChange={(e) => updateLeadDetails(selectedLead.id, { notes: e.target.value })}
                placeholder="e.g. Spoke to owner Dr. Patel, very receptive to 3-pack for reception. Drop by Tuesday 4 PM with sample card..."
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder-neutral-400"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleWhatsAppPitch(selectedLead)}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pitch on WhatsApp</span>
              </button>

              <button
                onClick={() => handleConvertToClient(selectedLead)}
                className="py-3 px-4 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
              >
                Convert to Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-950">Add New Lead</h3>
                <p className="text-xs text-neutral-500">Add a local business to your sales pipeline</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Royal Dental & Aesthetic Care"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="e.g. 098980 12345"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
                  <select
                    value={newLeadCategory}
                    onChange={(e) => setNewLeadCategory(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-neutral-900 font-medium focus:outline-none"
                  >
                    <option value="Dental clinic">Dental Clinic</option>
                    <option value="Beauty Parlour">Beauty Parlour / Salon</option>
                    <option value="Barber shop">Barber Shop / Grooming</option>
                    <option value="Cafe">Cafe / Bistro</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Car Wash">Car Wash & Detailing</option>
                    <option value="Gym">Gym & Fitness</option>
                    <option value="Retail">Retail Store</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Area / Sector</label>
                  <select
                    value={newLeadArea}
                    onChange={(e) => setNewLeadArea(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-neutral-900 font-medium focus:outline-none"
                  >
                    <option value="Kudasan">Kudasan</option>
                    <option value="Sargasan">Sargasan</option>
                    <option value="Infocity">Infocity</option>
                    <option value="GIFT City">GIFT City</option>
                    <option value="Sector 21">Sector 21</option>
                    <option value="Sector 22">Sector 22</option>
                    <option value="Sector 11">Sector 11</option>
                    <option value="Sector 6">Sector 6</option>
                    <option value="Sector 7">Sector 7</option>
                    <option value="Randesan">Randesan</option>
                    <option value="Koba">Koba</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Reviews</label>
                  <input
                    type="number"
                    value={newLeadReviews}
                    onChange={(e) => setNewLeadReviews(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Rating</label>
                  <input
                    type="text"
                    value={newLeadRating}
                    onChange={(e) => setNewLeadRating(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Deal (₹)</label>
                  <input
                    type="number"
                    value={newLeadDealValue}
                    onChange={(e) => setNewLeadDealValue(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Address / Landmark</label>
                <input
                  type="text"
                  value={newLeadAddress}
                  onChange={(e) => setNewLeadAddress(e.target.value)}
                  placeholder="e.g. Pramukh Arcade, Reliance Cross Road, Kudasan"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
