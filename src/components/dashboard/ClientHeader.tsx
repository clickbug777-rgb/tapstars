import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LogOut, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../../lib/config';

export const ClientHeader: React.FC = () => {
  const { user, profile, logout, activeBusinessId } = useAuth();
  const { businesses, getSubscription } = useData();
  const navigate = useNavigate();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const subscription = business ? getSubscription(business.id) : undefined;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const planName = subscription?.plan_id ? subscription.plan_id.toUpperCase() : 'STARTER';

  return (
    <header className="h-16 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-neutral-900 text-sm tracking-tight">
              {business ? business.name : 'Client Portal'}
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>{planName} PLAN</span>
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {business ? CONFIG.getCardTrackingUrl(business.slug) : 'tapstars.pages.dev'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {business && (
          <a
            href={CONFIG.getCardTrackingUrl(business.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <span>Test Tap Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        <div className="h-4 w-px bg-neutral-200 hidden sm:block"></div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-neutral-900">
              {profile?.full_name || user?.email || 'Business Owner'}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              {user?.email || 'client@tapstars.dev'}
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
