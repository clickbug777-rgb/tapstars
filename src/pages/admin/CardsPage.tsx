import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Wifi,
  QrCode,
  Copy,
  Check,
  Edit2,
  Trash2,
  ExternalLink,
  Info,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { NfcCard } from '../../types';
import { CardModal } from '../../components/cards/CardModal';
import { QrCodeModal } from '../../components/qr/QrCodeModal';
import { CONFIG } from '../../lib/config';
import { formatDate } from '../../lib/utils';

export const CardsPage: React.FC = () => {
  const { cards, businesses, createCard, updateCard, deleteCard, toggleCardStatus } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<NfcCard | null>(null);
  const [qrModalData, setQrModalData] = useState<{ title: string; slug: string; cardUid: string } | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [businessFilter, setBusinessFilter] = useState('ALL');

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.card_uid.toLowerCase().includes(searchFilter.toLowerCase()) ||
      card.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (card.business_name || '').toLowerCase().includes(searchFilter.toLowerCase());
    const matchesBiz = businessFilter === 'ALL' || card.business_id === businessFilter;
    return matchesSearch && matchesBiz;
  });

  const handleCopyUrl = (cardUid: string, id: string) => {
    const url = CONFIG.getCardTrackingUrl(cardUid);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, uid: string) => {
    if (confirm(`Are you sure you want to deactivate and remove NFC card "${uid}"?`)) {
      await deleteCard(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/70">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">NFC Card Management & Provisioning</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Register, serialize, assign and program physical contactless NFC cards and stands.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCard(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Card</span>
        </button>
      </div>

      {/* Guide Banner */}
      <div className="p-5 rounded-3xl bg-neutral-950 text-white shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Wifi className="w-4 h-4 rotate-90" />
          </div>
          <h3 className="font-bold text-sm">Edge Card Tracking Standard (/t/:cardUid)</h3>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
          Every physical card has an immutable tracking identifier encoded into its NTAG213/215 chip (e.g.{' '}
          <code className="text-blue-400 bg-white/10 px-1 py-0.5 rounded font-mono">
            https://tapstars.pages.dev/t/card-001
          </code>
          ). Tapping logs analytics at the Cloudflare edge in &lt;10ms and immediately forwards customers to their Google
          Review destination.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search by UID, label or business name..."
          className="flex-1 text-xs bg-white border border-neutral-200 rounded-xl px-3.5 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 shadow-xs"
        />

        <select
          value={businessFilter}
          onChange={(e) => setBusinessFilter(e.target.value)}
          className="text-xs bg-white border border-neutral-200 rounded-xl px-3.5 py-2 text-neutral-800 focus:outline-none shadow-xs font-semibold"
        >
          <option value="ALL">All Businesses ({businesses.length})</option>
          {businesses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/70 border-b border-neutral-200/80 text-neutral-500 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Card UID</th>
                <th className="py-3.5 px-4">Label & Location</th>
                <th className="py-3.5 px-4">Assigned Business</th>
                <th className="py-3.5 px-4">Tracking URL</th>
                <th className="py-3.5 px-4 text-center">NFC Taps</th>
                <th className="py-3.5 px-4 text-center">QR Scans</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCards.map((card) => {
                const trackingUrl = CONFIG.getCardTrackingUrl(card.card_uid);
                const qrUrl = CONFIG.getQrTrackingUrl(card.card_uid);
                const biz = businesses.find((b) => b.id === card.business_id);

                return (
                  <tr key={card.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-950">
                      {card.card_uid}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900">{card.label}</div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span>{card.location_name || 'Counter'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-neutral-800">
                        {card.business_name || biz?.name || 'Unassigned'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-blue-700 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200/60 max-w-xs truncate">
                        <span className="truncate">{trackingUrl}</span>
                        <button
                          onClick={() => handleCopyUrl(card.card_uid, card.id)}
                          className="text-neutral-400 hover:text-neutral-900 shrink-0"
                          title="Copy Permanent NFC Link"
                        >
                          {copiedId === card.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-neutral-900">
                      {card.tap_count}
                    </td>

                    <td className="py-3.5 px-4 text-center text-purple-700 font-semibold">
                      {card.qr_scan_count || 0}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCardStatus(card.id)}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          card.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {card.is_active ? 'ACTIVE' : 'PAUSED'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            setQrModalData({
                              title: card.label,
                              slug: biz?.slug || '',
                              cardUid: card.card_uid,
                            })
                          }
                          className="p-1.5 text-neutral-400 hover:text-purple-600 rounded-lg hover:bg-neutral-100"
                          title="View QR Code"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingCard(card);
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                          title="Edit Card"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(card.id, card.card_uid)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100"
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalOpen && (
        <CardModal
          isOpen={modalOpen}
          initialData={editingCard || undefined}
          businesses={businesses}
          onClose={() => {
            setModalOpen(false);
            setEditingCard(null);
          }}
          onSave={async (data) => {
            if (editingCard) {
              await updateCard(editingCard.id, data);
            } else {
              await createCard(data);
            }
            setModalOpen(false);
            setEditingCard(null);
          }}
        />
      )}

      {qrModalData && (
        <QrCodeModal
          isOpen={Boolean(qrModalData)}
          onClose={() => setQrModalData(null)}
          title={qrModalData.title}
          slug={qrModalData.slug}
          cardUid={qrModalData.cardUid}
        />
      )}
    </div>
  );
};
