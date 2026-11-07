import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wifi,
  QrCode,
  CreditCard,
  Star,
  FileText,
  Building,
  Settings,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const CLIENT_NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/nfc-analytics', label: 'NFC Analytics', icon: Wifi },
  { to: '/dashboard/qr-analytics', label: 'QR Analytics', icon: QrCode },
  { to: '/dashboard/cards', label: 'My Cards', icon: CreditCard },
  { to: '/dashboard/reviews', label: 'Google Reviews', icon: Star },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
  { to: '/dashboard/profile', label: 'Business Profile', icon: Building },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export const ClientSidebar: React.FC = () => {
  const { isAdmin, activeBusinessId, setActiveBusinessId } = useAuth();
  const { businesses } = useData();

  const currentBusiness = businesses.find((b) => b.id === activeBusinessId) || businesses[0];

  return (
    <aside className="w-64 border-r border-neutral-200/80 bg-white flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Star className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-semibold text-neutral-900 tracking-tight text-base block leading-none">
                TapStars
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600 font-medium">
                Client Hub
              </span>
            </div>
          </div>
        </div>

        {/* Business Selector */}
        <div className="p-4 border-b border-neutral-100">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
            Active Business
          </label>
          <select
            value={activeBusinessId || businesses[0]?.id || ''}
            onChange={(e) => setActiveBusinessId(e.target.value)}
            className="w-full text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation list */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Workspace
          </div>
          {CLIENT_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer info & Admin switch */}
      <div className="p-4 border-t border-neutral-200/70 space-y-2">
        {isAdmin && (
          <NavLink
            to="/admin"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100/80 rounded-xl transition-colors border border-amber-200/60"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>TapStars Admin</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </NavLink>
        )}

        {currentBusiness && (
          <a
            href={`/p/${currentBusiness.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl transition-colors"
          >
            <span>View Public Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </aside>
  );
};
