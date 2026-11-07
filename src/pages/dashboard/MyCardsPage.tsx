import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Wifi,
  QrCode,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CONFIG } from '../../lib/config';
import { NfcCard } from '../../types';

export const MyCardsPage: React.FC = () => {
  const { activeBusinessId } = useAuth();
  const { businesses, cards, updateCard } = useData();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<NfcCard | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const bizCards = useMemo(() => {
    if (!business) return [];
    return cards.filter((c) => c.business_id === business.id);
  }, [cards, business]);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUid(id);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const startEdit = (card: NfcCard) => {
    setEditingCard(card);
    setEditLabel(card.label);
    setEditLocation(card.location_name || '');
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    setIsSaving(true);
    await updateCard(editingCard.id, {
      label: editLabel,
      location_name: editLocation,
    });
    setIsSaving(false);
    setEditingCard(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Assigned NFC Cards</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage your physical NFC card touchpoints, location labels & permanent tracking URLs
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{bizCards.length} Deployed Cards</span>
        </div>
      </div>

      {/* Info notice about card creation */}
      <div className="p-4 rounded-2xl bg-neutral-100/70 border border-neutral-200/70 flex items-start gap-3">
        <Info className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-600 leading-relaxed">
          <strong className="font-semibold text-neutral-900">Physical Hardware Provisioning:</strong> Physical cards are
          manufactured, serialized, and paired by TapStars administrators to guarantee 100% genuine edge routing. You can
          freely rename labels and location tags for internal tracking below.
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bizCards.map((card) => {
          const trackingUrl = CONFIG.getCardTrackingUrl(card.card_uid);
          const qrUrl = CONFIG.getQrTrackingUrl(card.card_uid);

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              {/* Card Header & Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-950 text-base">{card.label}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span className="text-xs text-neutral-500">{card.location_name || 'Front Desk Counter'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        card.is_active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {card.is_active ? 'ACTIVE' : 'PAUSED'}
                    </span>
                    <button
                      onClick={() => startEdit(card)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      title="Edit Location Label"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Permanent Tracking URL */}
                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    <span>Card Identifier</span>
                    <span className="font-mono text-neutral-600">{card.card_uid}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-blue-700 truncate">{trackingUrl}</span>
                    <button
                      onClick={() => handleCopy(trackingUrl, card.id)}
                      className="p-1 text-neutral-500 hover:text-neutral-900 shrink-0"
                      title="Copy URL"
                    >
                      {copiedUid === card.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500 mb-0.5">
                      <Wifi className="w-3 h-3 text-blue-600 rotate-90" />
                      <span>NFC Taps</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900">{card.tap_count}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500 mb-0.5">
                      <QrCode className="w-3 h-3 text-purple-600" />
                      <span>QR Scans</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900">{card.qr_scan_count || 0}</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>
                    Last active:{' '}
                    {card.last_tapped_at
                      ? new Date(card.last_tapped_at).toLocaleDateString()
                      : 'Never'}
                  </span>
                </div>

                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-900 hover:text-blue-600 inline-flex items-center gap-1"
                >
                  <span>Test Redirect</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="font-bold text-neutral-950 text-lg">Edit Card Label & Location</h3>
              <p className="text-xs text-neutral-500">
                Rename this card to identify which physical table or checkout counter it is placed on.
              </p>
            </div>

            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Card Label</label>
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  required
                  placeholder="e.g. Table 4 Patio or Main Cashier"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Location Placement Note
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="e.g. Ground Floor Reception Counter"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
