import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Wifi, Star, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { isValidUrl, getDeviceCategory, isBot } from '../../lib/utils';

export const CardTapLandingPage: React.FC = () => {
  const { cardUid } = useParams<{ cardUid: string }>();
  const [searchParams] = useSearchParams();
  const isQr = searchParams.get('qr') === '1' || searchParams.get('source') === 'qr';
  const navigate = useNavigate();

  const { getCardByUid, getBusinessById, recordEvent, isLoading } = useData();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (!cardUid) {
      navigate('/');
      return;
    }

    const card = getCardByUid(cardUid);

    if (!card) {
      setErrorMsg(`No active card found registered with identifier "${cardUid}".`);
      return;
    }

    if (!card.is_active) {
      setErrorMsg(`Card "${card.label}" is currently paused or inactive.`);
      return;
    }

    const business = getBusinessById(card.business_id);
    if (!business || !business.is_active) {
      setErrorMsg('This business profile is currently suspended or inactive.');
      return;
    }

    // Record the analytics event
    if (!isBot()) {
      recordEvent({
        business_id: business.id,
        card_id: card.id,
        event_type: isQr ? 'qr_scan' : 'nfc_tap',
        device_category: getDeviceCategory(),
        destination_mode: business.destination_mode,
      });
    }

    // Redirect to Direct Review or Profile
    if (business.destination_mode === 'direct_review' && business.google_review_url) {
      const target = business.google_review_url.trim();
      if (isValidUrl(target)) {
        const timer = setTimeout(() => {
          window.location.replace(target);
        }, 200);
        return () => clearTimeout(timer);
      }
    }

    // Fallback: Profile
    navigate(`/p/${business.slug}?cid=${encodeURIComponent(card.card_uid)}`, { replace: true });
  }, [cardUid, isQr, getCardByUid, getBusinessById, isLoading, navigate, recordEvent]);

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

  const card = cardUid ? getCardByUid(cardUid) : undefined;
  const business = card ? getBusinessById(card.business_id) : undefined;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="w-full max-w-sm space-y-6">
        {/* Contactless Ping Animation */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-xl">
            <Wifi className="w-7 h-7 text-blue-400 rotate-90" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isQr ? 'QR Scan Verified' : 'NFC Connection Active'}</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Connecting to {business ? business.name : 'Business'}
          </h1>
          <p className="text-xs text-neutral-400">
            Redirecting you to Google Reviews...
          </p>
        </div>

        {business?.google_review_url && (
          <div className="pt-2">
            <a
              href={business.google_review_url}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Click here if not redirected</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
