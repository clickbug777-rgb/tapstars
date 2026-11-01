import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Building2,
  CreditCard,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CONFIG } from '../../lib/config';

export const QrStudioPage: React.FC = () => {
  const { businesses, cards } = useData();

  const [selectedBusinessId, setSelectedBusinessId] = useState(
    businesses.length > 0 ? businesses[0].id : ''
  );
  const [selectedCardId, setSelectedCardId] = useState<string>('none');
  const [targetType, setTargetType] = useState<'nfc_redirect' | 'profile'>('nfc_redirect');

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrSvg, setQrSvg] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedBiz = businesses.find((b) => b.id === selectedBusinessId) || businesses[0];
  const selectedCard = cards.find((c) => c.id === selectedCardId);

  const targetUrl = selectedBiz
    ? targetType === 'nfc_redirect'
      ? CONFIG.getNfcUrl(selectedBiz.slug, selectedCard?.card_uid)
      : CONFIG.getProfileUrl(selectedBiz.slug)
    : '';

  useEffect(() => {
    if (!targetUrl) return;

    QRCode.toDataURL(targetUrl, {
      width: 700,
      margin: 2,
      color: {
        dark: '#0a0a0a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));

    QRCode.toString(targetUrl, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#0a0a0a',
        light: '#ffffff',
      },
    })
      .then((svg) => setQrSvg(svg))
      .catch((err) => console.error(err));
  }, [targetUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl || !selectedBiz) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${selectedBiz.slug}-tapstars-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = () => {
    if (!qrSvg || !selectedBiz) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBiz.slug}-tapstars-qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="pb-2 border-b border-neutral-200/70">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">QR Code Studio</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Generate, customize, and export high-resolution QR codes for acrylic counter stands, menus, and table cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customizer Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Select Client Business
            </label>
            <select
              value={selectedBusinessId}
              onChange={(e) => {
                setSelectedBusinessId(e.target.value);
                setSelectedCardId('none');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.slug})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Link to Specific Card (Optional)
            </label>
            <select
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="none">General Business Link (No Card ID)</option>
              {cards
                .filter((c) => c.business_id === selectedBusinessId)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.card_uid} — {c.label}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              QR Target Destination
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setTargetType('nfc_redirect')}
                className={`py-2 px-2.5 rounded-lg transition-all ${
                  targetType === 'nfc_redirect'
                    ? 'bg-white text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Permanent NFC / Review URL
              </button>
              <button
                type="button"
                onClick={() => setTargetType('profile')}
                className={`py-2 px-2.5 rounded-lg transition-all ${
                  targetType === 'profile'
                    ? 'bg-white text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Direct Digital Profile
              </button>
            </div>
          </div>

          {/* Target URL Preview */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
            <span className="text-[10px] font-semibold uppercase font-mono tracking-wider text-neutral-400 block">
              Encoded Target URL
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-800 truncate flex-1">{targetUrl}</span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50 shadow-2xs shrink-0 flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table Stand Display</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs shadow-2xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG (HD)</span>
              </button>
              <button
                onClick={handleDownloadSvg}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs shadow-2xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG (Vector)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Printable Display Template Preview (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md bg-white border-2 border-neutral-200 rounded-3xl p-8 shadow-xl text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Review Us on Google</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                {selectedBiz?.name || 'Your Business'}
              </h2>
              <p className="text-xs text-neutral-500">
                Tap your phone to our card or scan the code below with your camera.
              </p>
            </div>

            {/* Big QR Container */}
            <div className="p-4 bg-white rounded-2xl border-2 border-neutral-200/90 shadow-md inline-block my-2">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-56 h-56 object-contain rounded-xl" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-neutral-400">
                  Rendering QR...
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-neutral-900">
                {selectedCard ? `Location: ${selectedCard.label}` : 'One Tap Connection'}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 truncate max-w-xs mx-auto">
                {targetUrl}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
              <span>NFC + QR Enabled</span>
              <span>Powered by TapStars</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
