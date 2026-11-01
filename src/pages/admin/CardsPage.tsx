import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Smartphone,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { NfcCard } from '../../types';
import { CardModal } from '../../components/cards/CardModal';
import { QrCodeModal } from '../../components/qr/QrCodeModal';
import { NfcCardPreview } from '../../components/cards/NfcCardPreview';
import { CONFIG } from '../../lib/config';
import { formatDate } from '../../lib/utils';

export const CardsPage: React.FC = () => {
  const { cards, businesses, createCard, updateCard, deleteCard, toggleCardStatus } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<NfcCard | null>(null);
  const [qrModalData, setQrModalData] = useState<{ title: string; slug: string; cardUid: string } | null>(
    null
  );
  const [previewCard, setPreviewCard] = useState<NfcCard | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (slug: string, cardUid: string, id: string) => {
    const url = CONFIG.getNfcUrl(slug, cardUid);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, uid: string) => {
    if (confirm(`Are you sure you want to delete NFC card ${uid}?`)) {
      await deleteCard(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/70">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">NFC Card Management</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Register, program, and monitor physical contactless NFC cards and stands.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCard(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Card</span>
        </button>
      </div>

      {/* NFC WRITING GUIDE CARD FOR BEGINNERS */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-950 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Wifi className="w-4 h-4 rotate-90" />
          </div>
          <h3 className="font-bold text-sm">How to Program Physical NFC Cards (Zero-Code Guide)</h3>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
          1. Buy blank <span className="font-semibold text-white">NTAG213 or NTAG215 cards/stickers</span> (approx ₹20–₹50 each).<br />
          2. Download the free app <span className="font-semibold text-white">"NFC Tools"</span> from the App Store (iPhone) or Play Store (Android).<br />
          3. Tap <span className="font-semibold text-white">Write → Add a record → URL / URI</span> and paste the permanent TapStars URL from the table below.<br />
          4. Tap <span className="font-semibold text-white">Write</span> and touch your phone to the physical card. Done! The card will now work permanently.
        </p>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        {cards.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <CreditCard className="w-10 h-10 mx-auto text-neutral-300" />
            <h3 className="text-sm font-semibold text-neutral-800">No NFC cards registered yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Create your first card record and link it to a client business.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold"
            >
              Register Card
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-neutral-50/70 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6">Card UID / Placement</th>
                  <th className="py-3.5 px-4">Assigned Business</th>
                  <th className="py-3.5 px-4">Permanent NFC URL</th>
                  <th className="py-3.5 px-4">Taps</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {cards.map((c) => {
                  const targetBiz = businesses.find((b) => b.id === c.business_id);
                  const slug = targetBiz ? targetBiz.slug : c.business_slug || '';
                  const nfcUrl = CONFIG.getNfcUrl(slug, c.card_uid);

                  return (
                    <tr key={c.id} className="hover:bg-neutral-50/50 transition-colors">
                      {/* Card UID & Label */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 font-mono font-bold text-xs shrink-0 border border-neutral-200">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-mono font-bold text-neutral-900 text-xs">{c.card_uid}</div>
                            <div className="text-[11px] text-neutral-400">{c.label}</div>
                          </div>
                        </div>
                      </td>

                      {/* Business */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-neutral-900 text-xs">
                          {targetBiz ? targetBiz.name : c.business_name || 'Unassigned'}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          {slug ? `/r/${slug}` : 'No slug'}
                        </div>
                      </td>

                      {/* Permanent NFC URL */}
                      <td className="py-4 px-4 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-neutral-500 truncate max-w-[170px]" title={nfcUrl}>
                            {nfcUrl.replace(/^https?:\/\//, '')}
                          </span>
                          <button
                            onClick={() => handleCopyUrl(slug, c.card_uid, c.id)}
                            title="Copy Permanent URL to write to NFC chip"
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                          >
                            {copiedId === c.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Tap Count */}
                      <td className="py-4 px-4 font-semibold text-neutral-900">
                        {c.tap_count || 0} taps
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleCardStatus(c.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                            c.is_active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {c.is_active ? 'Active' : 'Disabled'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() =>
                              setQrModalData({
                                title: targetBiz ? `${targetBiz.name} (${c.label})` : c.card_uid,
                                slug,
                                cardUid: c.card_uid,
                              })
                            }
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                            title="Generate Matching QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPreviewCard(c)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                            title="3D Card Preview"
                          >
                            <Sparkles className="w-4 h-4 text-amber-500" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingCard(c);
                              setModalOpen(true);
                            }}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                            title="Edit Card"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id, c.card_uid)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Card Edit Modal */}
      <CardModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCard(null);
        }}
        initialData={editingCard}
        businesses={businesses}
        onSave={async (data) => {
          if (editingCard) {
            await updateCard(editingCard.id, data);
          } else {
            await createCard(data);
          }
        }}
      />

      {/* QR Code Modal */}
      {qrModalData && (
        <QrCodeModal
          isOpen={Boolean(qrModalData)}
          onClose={() => setQrModalData(null)}
          title={qrModalData.title}
          slug={qrModalData.slug}
          cardUid={qrModalData.cardUid}
        />
      )}

      {/* 3D Visualizer Modal */}
      {previewCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative border border-neutral-200 shadow-2xl">
            <button
              onClick={() => setPreviewCard(null)}
              className="absolute top-4 right-4 text-xs font-semibold text-neutral-400 hover:text-neutral-900"
            >
              ✕ Close
            </button>
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              {previewCard.label || previewCard.card_uid}
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Interactive 3D simulation of the physical card
            </p>

            <NfcCardPreview
              businessName={previewCard.business_name || 'Business'}
              category="NFC Card"
              slug={previewCard.business_slug || ''}
              cardUid={previewCard.card_uid}
              theme="dark"
            />
          </div>
        </div>
      )}
    </div>
  );
};
