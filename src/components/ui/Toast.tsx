import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

let listeners: ((t: ToastItem[]) => void)[] = [];
let queue: ToastItem[] = [];
let uid = 0;

function emit() {
  listeners.forEach((l) => l([...queue]));
}

export const toast = {
  show(type: ToastType, message: string) {
    const item: ToastItem = { id: ++uid, type, message };
    queue.push(item);
    emit();
    setTimeout(() => {
      queue = queue.filter((q) => q.id !== item.id);
      emit();
    }, 4000);
  },
  success(msg: string) { this.show('success', msg); },
  error(msg: string) { this.show('error', msg); },
  info(msg: string) { this.show('info', msg); },
};

export const ToastContainer: React.FC = () => {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => {
    listeners.push(setItems);
    return () => {
      listeners = listeners.filter((l) => l !== setItems);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[110] flex flex-col gap-2 w-full max-w-sm px-4">
      {items.map((t) => {
        const cfg = {
          success: { icon: CheckCircle2, ring: 'text-success', bg: 'bg-success-soft' },
          error: { icon: AlertCircle, ring: 'text-danger', bg: 'bg-danger-soft' },
          info: { icon: Info, ring: 'text-primary', bg: 'bg-primary-soft' },
        }[t.type];
        const Icon = cfg.icon;
        return (
          <div
            key={t.id}
            className={`flex items-start gap-3 ${cfg.bg} border border-black/5 rounded-xl px-4 py-3 shadow-lg animate-slide-in-right`}
            role="alert"
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cfg.ring}`} />
            <p className="text-sm font-medium text-ink flex-1">{t.message}</p>
            <button
              onClick={() => {
                queue = queue.filter((q) => q.id !== t.id);
                emit();
              }}
              className="text-ink-faint hover:text-ink"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};