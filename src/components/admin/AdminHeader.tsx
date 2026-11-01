import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, LogOut, ExternalLink, Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminHeader: React.FC = () => {
  const { user, logout, isDemoMode } = useAuth();
  const { isSupabaseLive } = useData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-semibold text-neutral-900">TapStars</span>
        </Link>
        <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Admin Portal
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Backend Status Badge */}
        {isSupabaseLive ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Supabase PostgreSQL Live</span>
            <span className="sm:hidden">Live DB</span>
          </div>
        ) : (
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium hover:bg-amber-100 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Local Demo Mode (Connect DB)</span>
            <span className="sm:hidden">Demo Mode</span>
          </Link>
        )}

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/70 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Public Site</span>
        </Link>

        {/* Admin Account & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          <div className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <span className="text-xs text-neutral-700 hidden lg:inline-block max-w-[140px] truncate">
            {user?.email || 'admin@tapstars.dev'}
          </span>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
