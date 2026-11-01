import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  QrCode,
  BarChart3,
  Settings,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/businesses', label: 'Businesses', icon: Building2 },
  { to: '/admin/cards', label: 'NFC Cards', icon: CreditCard },
  { to: '/admin/qr-studio', label: 'QR Code Studio', icon: QrCode },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings & Cloud', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-neutral-200/80 bg-white flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-neutral-200/70">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="font-semibold text-neutral-900 tracking-tight text-base block leading-none">
              TapStars
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              SaaS Admin
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Management
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs font-semibold'
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

      {/* Footer Info Box */}
      <div className="p-4 m-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
        <div className="font-semibold text-neutral-900 flex items-center justify-between">
          <span>Target Production</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 font-mono">
            ₹0 Cost
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Permanent base host for NFC tags: <span className="font-mono text-neutral-800">tapstars.pages.dev</span>
        </p>
      </div>
    </aside>
  );
};
