import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Star, Wifi, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { isValidUrl, getDeviceCategory, isBot } from '../../lib/utils';

export const NfcRedirectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const cardUid = searchParams.get('cid') || undefined;
  const navigate = useNavigate();

  const { getBusinessBySlug, recordEvent, isLoading } = useData();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return; // Wait for database fetch

    if (!slug) {
      navigate('/');
      return;
    }

    const business = getBusinessBySlug(slug);

    if (!business) {
      setErrorMsg(`No business found registered with the slug "${slug}".`);
      return;
    }

    if (!business.is_active) {
      setErrorMsg(`The NFC card for ${business.name} is currently inactive or paused.`);
      return;
    }

    // Record the NFC Tap Event
    if (!isBot()) {
      recordEvent({
        business_id: business.id,
        card_id: cardUid,
        event_type: 'nfc_tap',
        device_category: getDeviceCategory(),
        destination_mode: business.destination_mode,
      });
    }

    // Handle Mode A: Direct Google Review
    if (business.destination_mode === 'direct_review' && business.google_review_url) {
      const target = business.google_review_url.trim();
      if (isValidUrl(target)) {
        // Immediate clean redirect
        const timer = setTimeout(() => {
          window.location.replace(target);
        }, 350);
        return () => clearTimeout(timer);
      }
    }

    // Handle Mode B: Digital Business Profile
    navigate(`/p/${business.slug}`, { replace: true });
  }, [slug, cardUid, getBusinessBySlug, navigate, recordEvent]);

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-neutral-200 text-center shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Card Unavailable</h2>
          <p className="text-xs text-neutral-500 leading-relaxed">{errorMsg}</p>
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

  const business = slug ? getBusinessBySlug(slug) : undefined;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="w-full max-w-sm space-y-6">
        {/* Contactless Animation */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-xl">
            <Wifi className="w-7 h-7 text-blue-400 rotate-90" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NFC Connection Active</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Connecting to {business ? business.name : 'Business'}...
          </h2>
          <p className="text-xs text-neutral-400">
            Forwarding you to the 5-star Google Review page.
          </p>
        </div>

        {/* Fallback button if browser blocks instant redirect */}
        {business?.google_review_url && (
          <div className="pt-2">
            <a
              href={business.google_review_url}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-all shadow-md"
            >
              <span>Click here if not redirected automatically</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
