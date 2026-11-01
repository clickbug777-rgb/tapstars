import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Businesses', to: '/admin/businesses', icon: Building2 },
  { label: 'NFC Cards', to: '/admin/cards', icon: CreditCard },
  { label: 'QR Codes', to: '/admin/qr', icon: QrCode },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-bg-soft text-ink">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-250 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center shadow-sm">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight leading-none">TapStars</span>
            <span className="text-[10px] uppercase tracking-wider text-ink-faint font-medium">
              Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary-soft text-primary-ink'
                    : 'text-ink-soft hover:bg-bg-soft hover:text-ink'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">
                {user?.user_metadata?.name || user?.email || 'Administrator'}
              </p>
              <p className="text-xs text-ink-faint truncate">{user?.email || 'demo@tapstars.dev'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger-soft transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur-md border-b border-border flex items-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-ink-soft hover:text-ink hover:bg-bg-soft rounded-lg"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <span className="hidden sm:inline">TapStars</span>
            <ChevronDown className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="font-medium text-ink">Admin Panel</span>
          </div>
          <div className="ml-auto">
            <Link
              to="/"
              className="text-sm text-ink-soft hover:text-ink px-3 py-1.5 rounded-lg hover:bg-bg-soft transition-colors"
            >
              View public site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};