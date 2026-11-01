import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  Eye,
  Star,
  Download,
  Filter,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/admin/StatCard';
import { formatNumber, formatDate } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { businesses, cards, events, stats } = useData();
  const [selectedBizId, setSelectedBizId] = useState<string>('all');

  const filteredEvents =
    selectedBizId === 'all'
      ? events
      : events.filter((e) => e.business_id === selectedBizId);

  // Device Breakdown
  const mobileCount = filteredEvents.filter((e) => e.device_category === 'mobile').length || 1;
  const desktopCount = filteredEvents.filter((e) => e.device_category === 'desktop').length;
  const tabletCount = filteredEvents.filter((e) => e.device_category === 'tablet').length;

  const deviceData = [
    { name: 'Mobile', value: mobileCount, color: '#2563eb' },
    { name: 'Desktop', value: desktopCount, color: '#10b981' },
    { name: 'Tablet', value: tabletCount, color: '#f59e0b' },
  ].filter((d) => d.value > 0);

  // Business-wise breakdown
  const businessBreakdown = businesses.map((b) => {
    const bizEvents = events.filter((e) => e.business_id === b.id);
    const taps = bizEvents.filter((e) => e.event_type === 'nfc_tap').length;
    const views = bizEvents.filter((e) => e.event_type === 'profile_view').length;
    const reviewClicks = bizEvents.filter((e) => e.event_type === 'review_click').length;

    return {
      name: b.name.split(' ')[0], // short name
      fullName: b.name,
      taps,
      views,
      reviewClicks,
      total: taps + views + reviewClicks,
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/70">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Analytics & Engagement</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Transparent event logs of customer interactions across NFC taps, QR scans, and profiles.
          </p>
        </div>

        {/* Business Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-neutral-400" />
          <select
            value={selectedBizId}
            onChange={(e) => setSelectedBizId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950"
          >
            <option value="all">All Businesses Combined</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total NFC Taps"
          value={formatNumber(
            filteredEvents.filter((e) => e.event_type === 'nfc_tap').length
          )}
          subtitle="Contactless card taps"
          icon={Wifi}
        />
        <StatCard
          title="Digital Profile Views"
          value={formatNumber(
            filteredEvents.filter((e) => e.event_type === 'profile_view').length
          )}
          subtitle="Mobile page visits"
          icon={Eye}
        />
        <StatCard
          title="Review Submissions Initiated"
          value={formatNumber(
            filteredEvents.filter((e) => e.event_type === 'review_click').length
          )}
          subtitle="Google Review clicks"
          icon={Star}
        />
        <StatCard
          title="Contact Cards Saved"
          value={formatNumber(
            filteredEvents.filter((e) => e.event_type === 'vcard_download').length
          )}
          subtitle=".vcf downloads"
          icon={Download}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Business Volume Breakdown (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Engagement by Client Business</h3>
            <p className="text-xs text-neutral-400">Total customer interactions comparison</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Bar dataKey="taps" name="NFC Taps" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="views" name="Profile Views" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Customer Devices</h3>
            <p className="text-xs text-neutral-400">Visitor hardware categorization</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs">
            <div className="flex items-center justify-between text-neutral-600">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Mobile Phones</span>
              </div>
              <span className="font-semibold text-neutral-900">
                {Math.round((mobileCount / (filteredEvents.length || 1)) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-600">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-emerald-600" />
                <span>Desktop Browsers</span>
              </div>
              <span className="font-semibold text-neutral-900">
                {Math.round((desktopCount / (filteredEvents.length || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Event Log */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-neutral-900 text-sm">Recent Event Stream</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Business</th>
                <th className="py-2.5 px-4">Event</th>
                <th className="py-2.5 px-4">Device</th>
                <th className="py-2.5 px-4">Destination Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredEvents.slice(0, 15).map((e) => {
                const b = businesses.find((biz) => biz.id === e.business_id);
                return (
                  <tr key={e.id} className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">
                      {formatDate(e.created_at)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-900">
                      {b ? b.name : 'Unknown Business'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-medium text-neutral-700">
                        {e.event_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 capitalize text-neutral-500">{e.device_category}</td>
                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                      {e.destination_mode || 'default'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
