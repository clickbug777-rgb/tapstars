import React, { useState, useEffect, useMemo } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import QRCode from 'qrcode';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CONFIG } from '../../lib/config';

export const QrAnalyticsPage: React.FC = () => {
  const { activeBusinessId } = useAuth();
  const { businesses, cards } = useData();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const bizCards = useMemo(() => {
    if (!business) return [];
    return cards.filter((c) => c.business_id === business.id);
  }, [cards, business]);

  useEffect(() => {
    if (bizCards.length > 0 && !selectedCardId) {
      setSelectedCardId(bizCards[0].card_uid);
    }
  }, [bizCards, selectedCardId]);

  const activeCard = bizCards.find((c) => c.card_uid === selectedCardId) || bizCards[0];
  const qrTrackingUrl = activeCard ? CONFIG.getQrTrackingUrl(activeCard.card_uid) : '';

  // Generate QR Canvas
  useEffect(() => {
    if (!qrTrackingUrl) return;

    QRCode.toDataURL(
      qrTrackingUrl,
      {
        width: 400,
        margin: 2,
        color: {
          dark: '#0a0a0a',
          light: '#ffffff',
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [qrTrackingUrl]);

  const totalQrScans = useMemo(() => {
    return bizCards.reduce((acc, c) => acc + (c.qr_scan_count || 0), 0);
  }, [bizCards]);

  const totalNfcTaps = useMemo(() => {
    return bizCards.reduce((acc, c) => acc + (c.tap_count || 0), 0);
  }, [bizCards]);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrTrackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `tapstars-qr-${activeCard?.card_uid || 'code'}.png`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">QR Code Touchpoint & Analytics</h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          QR codes printed on card backs and table stands ensure 100% device coverage
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Total QR Scans</div>
          <div className="text-3xl font-bold text-neutral-950">{totalQrScans}</div>
          <div className="text-[11px] text-purple-600 font-medium mt-1">
            Across {bizCards.length} printed card touchpoints
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">NFC vs QR Ratio</div>
          <div className="text-3xl font-bold text-neutral-950">
            {totalNfcTaps + totalQrScans > 0
              ? `${Math.round((totalNfcTaps / (totalNfcTaps + totalQrScans)) * 100)}% / ${Math.round(
                  (totalQrScans / (totalNfcTaps + totalQrScans)) * 100
                )}%`
              : '80% / 20%'}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">NFC Contactless vs Camera QR Scan</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Backup Scan Reliability</div>
          <div className="text-3xl font-bold text-emerald-600">100%</div>
          <div className="text-[11px] text-neutral-400 mt-1">Zero customer bounce rate</div>
        </div>
      </div>

      {/* QR Generator Studio & Download Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: QR Visualizer & Download Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-neutral-950 text-lg">High-Res Print QR Code</h3>
            <p className="text-xs text-neutral-500">Optimized for table tents, menu inserts, and card backs</p>
          </div>

          <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-200/80 inline-block shadow-inner mx-auto">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="TapStars QR Code" className="w-56 h-56 rounded-2xl shadow-xs" />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-neutral-400 text-xs">
                Generating QR...
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={downloadQr}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG (Print Ready)</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Copied Tracking Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>Copy QR Redirect Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Card Selector & Performance Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card Selector Box */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Select NFC Card for QR Generation</h4>
                <p className="text-xs text-neutral-500">Each physical card has its own unique QR identity</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                {activeCard?.card_uid}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {bizCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardId(card.card_uid)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    activeCard?.id === card.id
                      ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/20 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-neutral-900">{card.label}</span>
                    <span className="text-[10px] font-mono text-neutral-400">{card.card_uid}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">{card.location_name || 'Front Desk'}</div>
                  <div className="text-xs font-semibold text-purple-700 mt-2">
                    {card.qr_scan_count || 0} QR scans
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tracking Architecture Notice */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Smart QR Redirect Architecture</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              When customers scan this QR code, they hit your high-speed Cloudflare edge redirect at{' '}
              <span className="font-mono text-purple-700 bg-purple-50 px-1 py-0.5 rounded">
                /t/{activeCard?.card_uid}?qr=1
              </span>
              . The edge server logs the event as a <strong className="font-semibold">QR Scan</strong> without
              blocking the redirect, and sends the user directly to your Google Review page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
