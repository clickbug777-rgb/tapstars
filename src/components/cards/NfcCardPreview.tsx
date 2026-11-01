import React, { useState } from 'react';
import { Wifi, Sparkles, QrCode, ExternalLink, RotateCcw } from 'lucide-react';
import { CONFIG } from '../../lib/config';

interface NfcCardPreviewProps {
  businessName: string;
  category: string;
  slug: string;
  cardUid?: string;
  logoUrl?: string;
  theme?: 'dark' | 'light' | 'gold';
}

export const NfcCardPreview: React.FC<NfcCardPreviewProps> = ({
  businessName,
  category,
  slug,
  cardUid = 'CARD-001',
  logoUrl,
  theme = 'dark',
}) => {
  const [flipped, setFlipped] = useState(false);
  const nfcUrl = CONFIG.getNfcUrl(slug || 'your-business', cardUid);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Perspective Card Container */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[380px] h-[215px] sm:h-[240px] cursor-pointer select-none group perspective-1000"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full duration-700 transition-transform preserve-3d rounded-2xl shadow-xl hover:shadow-2xl ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT OF THE CARD */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between backface-hidden border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-neutral-800 text-white shadow-2xl'
                : 'bg-gradient-to-br from-white via-neutral-50 to-neutral-100 border-neutral-200 text-neutral-900 shadow-xl'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top row: Brand & NFC Wave */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={businessName}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center font-bold text-white text-base shadow-sm">
                    {businessName ? businessName.charAt(0).toUpperCase() : 'T'}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-sm tracking-tight line-clamp-1">{businessName || 'Business Name'}</div>
                  <div className="text-[11px] text-neutral-400 font-medium">{category || 'Local Business'}</div>
                </div>
              </div>

              {/* NFC Contactless Wave Symbol */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Wifi className="w-4 h-4 text-blue-400 rotate-90" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300">TAP</span>
              </div>
            </div>

            {/* Middle: Integrated NFC Chip Graphic */}
            <div className="flex items-center justify-between my-2">
              <div className="w-11 h-8 rounded-md bg-gradient-to-r from-amber-400/80 via-amber-200/90 to-amber-400/80 border border-amber-300/60 p-1 flex flex-col justify-between opacity-90 shadow-inner">
                <div className="w-full h-[1px] bg-amber-700/40"></div>
                <div className="w-full h-[1px] bg-amber-700/40"></div>
                <div className="w-full h-[1px] bg-amber-700/40"></div>
              </div>
              <div className="text-[11px] font-mono text-neutral-400 tracking-wider">
                {cardUid}
              </div>
            </div>

            {/* Bottom Row: Tap URL & TapStars Seal */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-300 truncate max-w-[200px]">
                <span>tapstars.pages.dev/r/</span>
                <span className="text-blue-400 font-semibold">{slug || 'slug'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                TapStars
              </div>
            </div>
          </div>

          {/* BACK OF THE CARD */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between backface-hidden border ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-white'
                : 'bg-white border-neutral-200 text-neutral-900'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 tracking-wider">MAGNETIC & NFC BACK</span>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center py-2 space-y-1">
              <div className="text-xs font-semibold text-neutral-200">Hold near top of phone to tap</div>
              <div className="text-[11px] text-neutral-400">Or scan backup QR code if NFC is switched off</div>
              <div className="mt-2 text-[10px] font-mono text-neutral-400 bg-black/30 py-1 px-2 rounded-md inline-block max-w-full truncate">
                {nfcUrl}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-white/10 pt-2">
              <span>NTAG213 / NTAG215 Compatible</span>
              <span>100% Reprogram-free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Helper flip button */}
      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className="mt-3.5 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors py-1 px-3 rounded-full bg-neutral-100 hover:bg-neutral-200"
      >
        <RotateCcw className="w-3 h-3" />
        Click to flip card (Front / Back)
      </button>
    </div>
  );
};
