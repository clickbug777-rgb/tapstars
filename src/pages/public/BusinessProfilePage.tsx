import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  MapPin,
  Star,
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from '../../components/common/SocialIcons';
import { useData } from '../../context/DataContext';
import { downloadVCard } from '../../lib/vcard';
import { formatWhatsAppUrl, sanitizePhone, getDeviceCategory, isBot } from '../../lib/utils';
import { CONFIG } from '../../lib/config';

export const BusinessProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBusinessBySlug, recordEvent, isLoading } = useData();

  const business = slug ? getBusinessBySlug(slug) : undefined;

  useEffect(() => {
    // Record profile view analytics on mount if not a bot
    if (business && !isBot()) {
      recordEvent({
        business_id: business.id,
        event_type: 'profile_view',
        device_category: getDeviceCategory(),
        destination_mode: 'profile',
      });
    }
  }, [business?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100/70 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-neutral-500 font-medium">Opening business profile...</span>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-neutral-200 text-center shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Profile Not Found</h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            The requested business profile URL is not registered or has been retired.
          </p>
          <Link
            to="/"
            className="inline-block mt-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
          >
            Go to TapStars Home
          </Link>
        </div>
      </div>
    );
  }

  if (!business.is_active) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-neutral-200 text-center shadow-lg space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">Profile Inactive</h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {business.name} has temporarily deactivated this profile. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  const handleActionClick = (eventType: any, url?: string) => {
    if (!isBot()) {
      recordEvent({
        business_id: business.id,
        event_type: eventType,
        device_category: getDeviceCategory(),
      });
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveContact = () => {
    if (!isBot()) {
      recordEvent({
        business_id: business.id,
        event_type: 'vcard_download',
        device_category: getDeviceCategory(),
      });
    }
    downloadVCard(business);
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 flex justify-center py-0 sm:py-8 antialiased">
      {/* Mobile-first centered profile card */}
      <div className="w-full max-w-md bg-white sm:rounded-3xl border-x sm:border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col justify-between min-h-screen sm:min-h-0">
        <div>
          {/* Header Cover Banner */}
          <div className="h-40 sm:h-44 w-full bg-gradient-to-r from-neutral-800 to-neutral-950 relative overflow-hidden">
            {business.cover_image_url ? (
              <img
                src={business.cover_image_url}
                alt={business.name}
                className="w-full h-full object-cover opacity-75"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <Sparkles className="w-16 h-16" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Profile Core Header */}
          <div className="px-6 pb-6 relative -mt-14 space-y-4">
            {/* Logo */}
            <div className="flex items-end justify-between">
              <div className="w-22 h-22 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-white relative">
                {business.logo_url ? (
                  <img
                    src={business.logo_url}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-900 text-white font-bold text-2xl flex items-center justify-center">
                    {business.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Business</span>
              </div>
            </div>

            {/* Business Titles */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-950 leading-tight">
                {business.name}
              </h1>
              <p className="text-xs font-semibold text-neutral-500 mt-0.5">{business.category}</p>
            </div>

            {business.description && (
              <p className="text-xs text-neutral-600 leading-relaxed">{business.description}</p>
            )}

            {/* Primary Action: Google 5-Star Review Highlight */}
            {business.google_review_url && (
              <a
                href={business.google_review_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleActionClick('review_click')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm shadow-md transition-all group"
              >
                <Star className="w-4 h-4 fill-neutral-950" />
                <span>Leave Us a 5-Star Review</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* Save to Phone Contacts (vCard) */}
            <button
              onClick={handleSaveContact}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Save Contact to Phone</span>
            </button>

            {/* Quick Contact Action Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Call */}
              {business.phone ? (
                <a
                  href={`tel:${sanitizePhone(business.phone)}`}
                  onClick={() => handleActionClick('call_click')}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 transition-all text-neutral-800"
                >
                  <Phone className="w-5 h-5 text-neutral-700 mb-1" />
                  <span className="text-[11px] font-semibold">Call</span>
                </a>
              ) : null}

              {/* WhatsApp */}
              {business.whatsapp ? (
                <a
                  href={formatWhatsAppUrl(business.whatsapp, business.name)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleActionClick('whatsapp_click')}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-[11px] font-semibold">WhatsApp</span>
                </a>
              ) : null}

              {/* Email */}
              {business.email ? (
                <a
                  href={`mailto:${business.email}`}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 transition-all text-neutral-800"
                >
                  <Mail className="w-5 h-5 text-neutral-700 mb-1" />
                  <span className="text-[11px] font-semibold">Email</span>
                </a>
              ) : null}
            </div>

            {/* Custom Links & Menus */}
            {business.custom_links && business.custom_links.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block">
                  Quick Actions
                </span>
                {business.custom_links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 text-neutral-900 text-xs font-semibold transition-all group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            )}

            {/* Location & Directions */}
            {(business.address || business.google_maps_url) && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Location & Hours
                </span>
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2.5">
                  {business.address && (
                    <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{business.address}</span>
                    </div>
                  )}
                  {business.google_maps_url && (
                    <a
                      href={business.google_maps_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleActionClick('directions_click')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 pt-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Get Driving Directions</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Social Media Channels */}
            {(business.instagram_url ||
              business.facebook_url ||
              business.youtube_url ||
              business.linkedin_url ||
              business.website) && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Connect on Social
                </span>
                <div className="flex flex-wrap gap-2">
                  {business.instagram_url && (
                    <a
                      href={business.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-pink-600 transition-colors"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {business.facebook_url && (
                    <a
                      href={business.facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-blue-600 transition-colors"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                  {business.youtube_url && (
                    <a
                      href={business.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-red-600 transition-colors"
                      title="YouTube"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                  )}
                  {business.linkedin_url && (
                    <a
                      href={business.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-blue-700 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleActionClick('website_click')}
                      className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors"
                      title="Official Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Brand Seal */}
        <div className="py-4 border-t border-neutral-100 text-center text-[10px] text-neutral-400 font-medium">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-neutral-700 transition-colors">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Powered by TapStars NFC Platform</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
