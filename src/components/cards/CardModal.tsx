import React, { useState, useEffect } from 'react';
import { X, Wifi, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { NfcCard, Business } from '../../types';
import { CONFIG } from '../../lib/config';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: { card_uid: string; business_id: string; label: string }) => Promise<void>;
  businesses: Business[];
  initialData?: NfcCard | null;
  selectedBusinessId?: string;
}

export const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  onSave,
  businesses,
  initialData,
  selectedBusinessId,
}) => {
  const [businessId, setBusinessId] = useState('');
  const [cardUid, setCardUid] = useState('');
  const [label, setLabel] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setBusinessId(initialData.business_id);
      setCardUid(initialData.card_uid);
      setLabel(initialData.label);
    } else {
      const defaultBiz = selectedBusinessId || (businesses.length > 0 ? businesses[0].id : '');
      setBusinessId(defaultBiz);
      const biz = businesses.find((b) => b.id === defaultBiz);
      const prefix = biz ? biz.slug.slice(0, 3).toUpperCase() : 'CARD';
      const randomNum = Math.floor(10 + Math.random() * 90);
      setCardUid(`${prefix}-${randomNum}`);
      setLabel('Front Counter Card');
    }
    setErrorMsg('');
  }, [initialData, selectedBusinessId, businesses, isOpen]);

  if (!isOpen) return null;

  const selectedBiz = businesses.find((b) => b.id === businessId);
  const nfcUrl = selectedBiz ? CONFIG.getNfcUrl(selectedBiz.slug, cardUid) : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) {
      setErrorMsg('Please select a business to assign this card to.');
      return;
    }
    if (!cardUid.trim()) {
      setErrorMsg('Please provide a card identifier.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        card_uid: cardUid.trim().toUpperCase(),
        business_id: businessId,
        label: label.trim() || 'NFC Card',
      });
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error saving card.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-base">
                {initialData ? 'Edit NFC Card' : 'Register New NFC Card'}
              </h3>
              <p className="text-xs text-neutral-500">Assign physical card to business</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Assigned Business <span className="text-red-500">*</span>
            </label>
            <select
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="" disabled>
                Select a business
              </option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.slug})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Card Identifier / Serial <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cardUid}
              onChange={(e) => setCardUid(e.target.value.toUpperCase())}
              placeholder="e.g. CARD-ABC-01"
              required
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              Printed on the physical NFC card or marked for inventory.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Location / Placement Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Front Cashier, Table 4, Reception Stand"
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          {/* NFC URL Display */}
          {nfcUrl && (
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                Permanent Card NFC URL
              </span>
              <div className="font-mono text-xs text-blue-700 bg-white p-2 rounded-lg border border-neutral-200 break-all select-all">
                {nfcUrl}
              </div>
              <p className="text-[10px] text-neutral-500 mt-2">
                Program this exact URL onto your physical NTAG213 / NTAG215 NFC card using the free NFC Tools app on your smartphone.
              </p>
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Card' : 'Save Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
