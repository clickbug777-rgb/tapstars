import React, { useState } from 'react';
import { Activity, Clock } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { useData } from '../context';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { stats, businesses } = useData();
  const { isSupabaseLive } = useData();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');

  const activeBusinesses = businesses.filter((b) => b.is_active).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="text-sm text-ink-muted">
            {isSupabaseLive ? 'Real-time analytics from production database' : 'Demo mode - local storage'}
          </p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as any)}
          className="px-3 py-2.5 text-sm border border-border rounded-xl bg-surface text-ink"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Businesses" value={stats.totalBusinesses} icon={Activity} />
        <StatCard label="Active Businesses" value={activeBusinesses} icon={Clock} />
        <StatCard label="Total Cards" value={stats.totalCards} icon={Activity} />
        <StatCard label="Total Taps" value={stats.totalRedirectClicks} icon={Activity} />
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-ink mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/admin/businesses/new"
            className="p-4 bg-surface rounded-xl border border-border hover:shadow transition-all"
          >
            <h3 className="font-medium text-ink mb-1">Add Business</h3>
            <p className="text-xs text-ink-muted">Create a new business profile</p>
          </Link>
          <Link
            to="/admin/cards"
            className="p-4 bg-surface rounded-xl border border-border hover:shadow transition-all"
          >
            <h3 className="font-medium text-ink mb-1">Manage Cards</h3>
            <p className="text-xs text-ink-muted">Create and assign NFC cards</p>
          </Link>
          <Link
            to="/admin/analytics"
            className="p-4 bg-surface rounded-xl border border-border hover:shadow transition-all"
          >
            <h3 className="font-medium text-ink mb-1">View Analytics</h3>
            <p className="text-xs text-ink-muted">Check tap and visit statistics</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
