import React, { useState, useEffect } from 'react';
import { X, Globe, Phone, Mail, MapPin, Star, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from '../common/SocialIcons';
import { Business, DestinationMode, CustomLink } from '../../types';
import { generateSlug, isValidUrl, normalizeUrl } from '../../lib/utils';
import { CONFIG } from '../../lib/config';

interface BusinessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: Business | null;
  existingSlugs: string[];
}

const CATEGORIES = [
  'Restaurant & Cafe',
  'Salon & Spa',
  'Clinic & Healthcare',
  'Retail Store',
  'Hotel & Hospitality',
  'Gym & Fitness Studio',
  'Real Estate Agency',
  'Professional Services',
  'Automotive & Detailing',
  'Other Local Business',
];

export const BusinessFormModal: React.FC<BusinessFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  existingSlugs,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'links' | 'mode'>('details');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [googleReviewUrl, setGoogleReviewUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const [destinationMode, setDestinationMode] = useState<DestinationMode>('direct_review');
  const [isActive, setIsActive] = useState(true);

  const [slugModifiedManually, setSlugModifiedManually] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setSlugModifiedManually(true);
      setCategory(initialData.category || CATEGORIES[0]);
      setDescription(initialData.description || '');
      setLogoUrl(initialData.logo_url || '');
      setCoverImageUrl(initialData.cover_image_url || '');
      setPhone(initialData.phone || '');
      setWhatsapp(initialData.whatsapp || '');
      setEmail(initialData.email || '');
      setWebsite(initialData.website || '');
      setAddress(initialData.address || '');
      setGoogleMapsUrl(initialData.google_maps_url || '');
      setGoogleReviewUrl(initialData.google_review_url || '');
      setInstagramUrl(initialData.instagram_url || '');
      setFacebookUrl(initialData.facebook_url || '');
      setYoutubeUrl(initialData.youtube_url || '');
      setLinkedinUrl(initialData.linkedin_url || '');
      setCustomLinks(initialData.custom_links || []);
      setDestinationMode(initialData.destination_mode || 'direct_review');
      setIsActive(initialData.is_active ?? true);
    } else {
      // Reset form
      setName('');
      setSlug('');
      setSlugModifiedManually(false);
      setCategory(CATEGORIES[0]);
      setDescription('');
      setLogoUrl('');
      setCoverImageUrl('');
      setPhone('');
      setWhatsapp('');
      setEmail('');
      setWebsite('');
      setAddress('');
      setGoogleMapsUrl('');
      setGoogleReviewUrl('');
      setInstagramUrl('');
      setFacebookUrl('');
      setYoutubeUrl('');
      setLinkedinUrl('');
      setCustomLinks([]);
      setDestinationMode('direct_review');
      setIsActive(true);
    }
    setErrorMsg('');
    setActiveTab('details');
  }, [initialData, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugModifiedManually) {
      setSlug(generateSlug(val));
    }
  };

  const handleAddCustomLink = () => {
    setCustomLinks([
      ...customLinks,
      { id: `link-${Date.now()}`, label: '', url: '' },
    ]);
  };

  const handleRemoveCustomLink = (id: string) => {
    setCustomLinks(customLinks.filter((l) => l.id !== id));
  };

  const handleUpdateCustomLink = (id: string, field: 'label' | 'url', val: string) => {
    setCustomLinks(
      customLinks.map((l) => (l.id === id ? { ...l, [field]: val } : l))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter a business name.');
      setActiveTab('details');
      return;
    }

    const cleanSlug = generateSlug(slug || name);
    if (!cleanSlug) {
      setErrorMsg('Please specify a valid slug for the NFC URL.');
      setActiveTab('details');
      return;
    }

    // Check duplicate slug
    const isDuplicate = existingSlugs.some(
      (s) => s.toLowerCase() === cleanSlug.toLowerCase() && (!initialData || initialData.slug.toLowerCase() !== cleanSlug.toLowerCase())
    );

    if (isDuplicate) {
      setErrorMsg(`The slug "${cleanSlug}" is already taken by another business. Please choose a unique slug.`);
      setActiveTab('details');
      return;
    }

    // If destination mode is direct_review, check review URL
    if (destinationMode === 'direct_review' && googleReviewUrl && !isValidUrl(googleReviewUrl)) {
      setErrorMsg('Google Review URL must be a valid web link (e.g. https://search.google.com/...)');
      setActiveTab('links');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        name: name.trim(),
        slug: cleanSlug,
        category,
        description: description.trim(),
        logo_url: logoUrl.trim(),
        cover_image_url: coverImageUrl.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        website: website ? normalizeUrl(website) : '',
        address: address.trim(),
        google_maps_url: googleMapsUrl ? normalizeUrl(googleMapsUrl) : '',
        google_review_url: googleReviewUrl ? normalizeUrl(googleReviewUrl) : '',
        instagram_url: instagramUrl ? normalizeUrl(instagramUrl) : '',
        facebook_url: facebookUrl ? normalizeUrl(facebookUrl) : '',
        youtube_url: youtubeUrl ? normalizeUrl(youtubeUrl) : '',
        linkedin_url: linkedinUrl ? normalizeUrl(linkedinUrl) : '',
        custom_links: customLinks.filter((l) => l.label.trim() && l.url.trim()),
        destination_mode: destinationMode,
        is_active: isActive,
      });
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error saving business. Please check fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <div>
            <h3 className="font-semibold text-neutral-900 text-lg">
              {initialData ? 'Edit Business Profile' : 'Onboard New Business'}
            </h3>
            <p className="text-xs text-neutral-500">
              Configure business details, contact channels, and NFC tap destination.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-200 px-6 gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            1. Core Details & Slug
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'links'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            2. Contact & Reviews
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mode')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'mode'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            3. NFC Destination Mode
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. ABC Cafe & Roastery"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-sm"
                />
              </div>

              {/* Permanent Slug Field */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Permanent NFC URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-neutral-300 focus-within:ring-2 focus-within:ring-neutral-950 overflow-hidden bg-neutral-50/50">
                  <span className="px-3 text-xs text-neutral-400 font-mono select-none">
                    tapstars.pages.dev/r/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlugModifiedManually(true);
                      setSlug(generateSlug(e.target.value));
                    }}
                    placeholder="abc-cafe"
                    required
                    className="flex-1 py-2.5 pr-3 bg-transparent text-sm font-mono text-neutral-900 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  This permanent link is encoded into physical NFC cards. You can change the destination anytime without changing the card.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-sm bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Status</label>
                  <div className="flex items-center h-10">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-neutral-700">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                      />
                      Active (Accepts NFC taps & scans)
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Business Bio / Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Tell customers what you specialize in..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Logo Image URL</label>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://... (square image)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Cover Banner Image URL</label>
                  <input
                    type="url"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://... (header banner)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & REVIEWS */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
                  <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>Google Review Link (Key Feature)</span>
                </div>
                <input
                  type="text"
                  value={googleReviewUrl}
                  onChange={(e) => setGoogleReviewUrl(e.target.value)}
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-amber-800/80 mt-1">
                  Obtain this from Google Business Profile Manager: "Ask for reviews" link.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">WhatsApp Number</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+15550000000 (with country code)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@business.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Website</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://business.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Physical Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, Suite 400"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Google Maps Directions URL</label>
                <input
                  type="text"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              {/* Social Channels */}
              <div className="border-t border-neutral-100 pt-4 space-y-3">
                <span className="text-xs font-semibold text-neutral-800 block">Social Media Links</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-pink-600">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-blue-600">
                      <FacebookIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-red-600">
                      <YoutubeIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/@..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-blue-700">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Action Links */}
              <div className="border-t border-neutral-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-800">
                    Custom Action Buttons (e.g. Menu, Booking, Catalog)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCustomLink}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Button
                  </button>
                </div>
                <div className="space-y-2">
                  {customLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateCustomLink(link.id, 'label', e.target.value)}
                        placeholder="Button Label (e.g. View Menu)"
                        className="w-1/3 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleUpdateCustomLink(link.id, 'url', e.target.value)}
                        placeholder="https://example.com/menu"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomLink(link.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESTINATION MODE */}
          {activeTab === 'mode' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider block mb-1">
                  How NFC Tap Works
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Your physical NFC cards are programmed once with your permanent TapStars address.
                  You can change where the card goes anytime below without rewriting the card.
                </p>
              </div>

              {/* MODE SELECTION CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mode A: Direct Review */}
                <div
                  onClick={() => setDestinationMode('direct_review')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    destinationMode === 'direct_review'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono tracking-wider font-semibold opacity-80">
                      Mode A
                    </span>
                    {destinationMode === 'direct_review' && (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <h4 className="font-bold text-base mb-1.5">Direct Google Review</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      destinationMode === 'direct_review' ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    Customers tap the NFC card and are immediately forwarded straight to your Google 5-star review page. Maximum review conversion.
                  </p>
                </div>

                {/* Mode B: Full Digital Profile */}
                <div
                  onClick={() => setDestinationMode('profile')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    destinationMode === 'profile'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-mono tracking-wider font-semibold opacity-80">
                      Mode B
                    </span>
                    {destinationMode === 'profile' && (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <h4 className="font-bold text-base mb-1.5">Digital Business Profile</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      destinationMode === 'profile' ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    Customers tap the NFC card and see an elegant Apple-style mobile hub with Google Reviews, WhatsApp chat, Call, Save Contact, and links.
                  </p>
                </div>
              </div>

              {destinationMode === 'direct_review' && !googleReviewUrl && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Note: Please make sure to add your Google Review URL under Tab 2 (Contact & Reviews) so the redirect functions.
                  </span>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-xl"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            {activeTab !== 'details' && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'mode' ? 'links' : 'details')}
                className="px-3 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50"
              >
                Previous
              </button>
            )}
            {activeTab !== 'mode' ? (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'details' ? 'links' : 'mode')}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Business'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
