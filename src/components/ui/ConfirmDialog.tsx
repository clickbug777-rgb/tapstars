import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-surface rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-in">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-ink-faint hover:text-ink hover:bg-bg-soft"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-danger-soft flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
          <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
        </div>
        <div className="px-6 py-4 bg-bg-soft border-t border-border flex items-center justify-end gap-2.5">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-ink-soft bg-surface border border-border hover:bg-border rounded-xl transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all shadow-sm ${
              variant === 'danger'
                ? 'bg-danger hover:bg-danger/90'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};