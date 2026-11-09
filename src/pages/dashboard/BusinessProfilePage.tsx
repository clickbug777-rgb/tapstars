import React, { useState } from 'react';
import {
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DestinationMode } from '../../types';

export const BusinessProfilePage: React.FC = () => {
  const { activeBusinessId } = useAuth();
  const { businesses, updateBusiness } = useData();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];

  const [name, setName] = useState(business?.name || '');
  const [category, setCategory] = useState(business?.category || 'Restaurant & Cafe');
  const [description, setDescription] = useState(business?.description || '');
  const [phone, setPhone] = useState(business?.phone || '');
  const [whatsapp, setWhatsapp] = useState(business?.whatsapp || '');
  const [email, setEmail] = useState(business?.email || '');
  const [website, setWebsite] = useState(business?.website || '');
  const [address, setAddress] = useState(business?.address || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(business?.google_maps_url || '');
  const [googleReviewUrl, setGoogleReviewUrl] = useState(business?.google_review_url || '');
  const [placeId, setPlaceId] = useState(business?.place_id || '');
  const [destinationMode, setDestinationMode] = useState<DestinationMode>(
    business?.destination_mode || 'direct_review'
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setIsSaving(true);

    await updateBusiness(business.id, {
      name,
      category,
      description,
      phone,
      whatsapp,
      email,
      website,
      address,
      google_maps_url: googleMapsUrl,
      google_review_url: googleReviewUrl,
      place_id: placeId,
      destination_mode: destinationMode,
    });

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!business) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Business Profile & Routing</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Configure contact info, Google review destination & NFC card behavior
          </p>
        </div>

        <a
          href={`/p/${business.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors shadow-xs"
        >
          <span>Preview Public Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contactless Destination Mode Selector */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">NFC Tap Destination Mode</h3>
            <p className="text-xs text-neutral-500">Choose where customers land when they tap your physical NFC card</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setDestinationMode('direct_review')}
              className={`p-5 rounded-2xl border text-left transition-all ${
                destinationMode === 'direct_review'
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-neutral-900">Mode A: Instant Google Review (Fastest)</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Tapping the card skips any landing page and directly launches the customer's Google Review form for
                maximum 5-star conversion.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setDestinationMode('profile')}
              className={`p-5 rounded-2xl border text-left transition-all ${
                destinationMode === 'profile'
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-neutral-900">Mode B: Digital Business Profile</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Opens your branded TapStars profile page featuring your review button, WhatsApp, call, menu links, and
                social accounts.
              </p>
            </button>
          </div>
        </div>

        {/* General Business Details */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-5">
          <h3 className="font-bold text-neutral-950 text-base">General Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              >
                <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                <option value="Salon & Spa">Salon & Spa</option>
                <option value="Gym & Fitness">Gym & Fitness</option>
                <option value="Clinic & Healthcare">Clinic & Healthcare</option>
                <option value="Hotel & Hospitality">Hotel & Hospitality</option>
                <option value="Retail & Shopping">Retail & Shopping</option>
                <option value="Real Estate">Real Estate</option>
                <option value="General Local Business">General Local Business</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
          </div>
        </div>

        {/* Google Reputation & Maps Integration */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-5">
          <h3 className="font-bold text-neutral-950 text-base">Google Review Link & Maps Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Google Review Destination URL (Direct link)
              </label>
              <input
                type="url"
                value={googleReviewUrl}
                onChange={(e) => setGoogleReviewUrl(e.target.value)}
                required
                placeholder="https://g.page/r/your-google-review-id/review"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Found in your Google Business Profile: "Ask for reviews" &rarr; Copy link.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?cid=..."
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Google Place ID</label>
                <input
                  type="text"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
                  className="w-full text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-5">
          <h3 className="font-bold text-neutral-950 text-base">Contact & Communication</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+917383273362"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="917383273362"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@yourbusiness.com"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourbusiness.com"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full store/branch address"
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs sticky bottom-4 z-20">
          <div>
            {isSaved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <Check className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
