import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Printer, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { CONFIG } from '../../lib/config';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
  cardUid?: string;
  initialType?: 'nfc_redirect' | 'profile';
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  title,
  slug,
  cardUid,
  initialType = 'nfc_redirect',
}) => {
  const [targetType, setTargetType] = useState<'nfc_redirect' | 'profile'>(initialType);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const targetUrl =
    targetType === 'nfc_redirect'
      ? CONFIG.getNfcUrl(slug, cardUid)
      : CONFIG.getProfileUrl(slug);

  useEffect(() => {
    if (!isOpen || !targetUrl) return;

    // Generate high resolution PNG data URL
    QRCode.toDataURL(targetUrl, {
      width: 600,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error', err));

    // Generate SVG
    QRCode.toString(targetUrl, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((svg) => setQrSvg(svg))
      .catch((err) => console.error('QR svg generation error', err));
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${slug}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-qr-code.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h3 className="font-semibold text-neutral-900 text-lg">QR Code Studio</h3>
            <p className="text-xs text-neutral-500">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target Type Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setTargetType('nfc_redirect')}
              className={`py-2 px-3 rounded-lg transition-all ${
                targetType === 'nfc_redirect'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Permanent NFC / Review URL
            </button>
            <button
              onClick={() => setTargetType('profile')}
              className={`py-2 px-3 rounded-lg transition-all ${
                targetType === 'profile'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Direct Profile Page
            </button>
          </div>

          {/* Printable Card Area */}
          <div
            ref={printRef}
            className="border border-neutral-200/80 rounded-2xl p-6 bg-gradient-to-b from-white to-neutral-50 flex flex-col items-center text-center shadow-sm"
          >
            {/* Business Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Tap or Scan with Camera</span>
            </div>

            <h4 className="font-bold text-neutral-900 text-xl tracking-tight mb-1">{title}</h4>
            <p className="text-xs text-neutral-500 mb-4 max-w-xs">
              Point your smartphone camera at the code below to open our digital experience.
            </p>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-xl shadow-md border border-neutral-200 mb-3">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 rounded-lg object-contain" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-neutral-400 text-xs">
                  Generating QR...
                </div>
              )}
            </div>

            <div className="text-[11px] font-mono text-neutral-500 max-w-xs truncate">
              {targetUrl}
            </div>

            <div className="mt-3 text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
              Powered by TapStars
            </div>
          </div>

          {/* Target URL Copy Field */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <span className="font-mono text-neutral-600 truncate flex-1">{targetUrl}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
            <a
              href={targetUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-neutral-400 hover:text-neutral-700"
              title="Open Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex flex-wrap items-center justify-end gap-2.5">
          <button
            onClick={handleDownloadSvg}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download SVG
          </button>
          <button
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download PNG (HD)
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Display Stand
          </button>
        </div>
      </div>
    </div>
  );
};
