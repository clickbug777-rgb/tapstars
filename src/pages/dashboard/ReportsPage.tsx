import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  ArrowUpRight,
  Wifi,
  QrCode,
  Star,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ReportsPage: React.FC = () => {
  const { activeBusinessId } = useAuth();
  const { businesses, cards, events, getClientStats, googleProfiles } = useData();
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const stats = business ? getClientStats(business.id) : null;
  const bizCards = useMemo(() => {
    if (!business) return [];
    return cards.filter((c) => c.business_id === business.id);
  }, [cards, business]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    if (!business || !stats) return;

    const rows = [
      ['Metric', 'Value'],
      ['Business Name', business.name],
      ['Report Period', selectedMonth],
      ['Total NFC Taps', stats.totalTaps.toString()],
      ['Total QR Scans', stats.totalQrScans.toString()],
      ['Total Customer Engagement', stats.totalEngagement.toString()],
      ['Google Review Count', stats.totalReviews.toString()],
      ['Average Rating', stats.averageRating.toFixed(1)],
      ['Review Growth', `+${stats.reviewGrowth}`],
      ['Active NFC Cards', stats.activeCardsCount.toString()],
      [],
      ['Card Label', 'UID', 'Taps', 'QR Scans', 'Location'],
      ...bizCards.map((c) => [
        c.label,
        c.card_uid,
        c.tap_count.toString(),
        (c.qr_scan_count || 0).toString(),
        c.location_name || 'Front Desk',
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tapstars-report-${business.slug}-${selectedMonth.replace(' ', '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!business || !stats) return null;

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Monthly Performance Report</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Executive review of customer engagement, card traffic & Google reputation growth
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 shadow-xs focus:outline-none"
          >
            <option value="November 2026">November 2026 (Current)</option>
            <option value="October 2026">October 2026</option>
            <option value="September 2026">September 2026</option>
          </select>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Formatted Printable Report Paper */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-8 sm:p-12 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Report Top Meta */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b border-neutral-200/80 pb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <span>TapStars Analytics Report</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-950">{business.name}</h1>
            <p className="text-xs text-neutral-500">{business.address}</p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">{selectedMonth}</div>
            <div className="text-xs text-neutral-400">Generated on {new Date().toLocaleDateString()}</div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Verified Edge Performance
            </span>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wider text-neutral-400">
            Executive Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">Total NFC Taps</div>
              <div className="text-2xl font-bold text-neutral-950 mt-1">{stats.totalTaps}</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">+{stats.tapsGrowthPercentage}% vs prev</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">QR Camera Scans</div>
              <div className="text-2xl font-bold text-neutral-950 mt-1">{stats.totalQrScans}</div>
              <div className="text-[11px] text-neutral-400 mt-1">Secondary touchpoint</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">Google Reviews</div>
              <div className="text-2xl font-bold text-neutral-950 mt-1">{stats.totalReviews}</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">+{stats.reviewGrowth} new this month</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">Average Google Rating</div>
              <div className="text-2xl font-bold text-neutral-950 mt-1">{stats.averageRating.toFixed(1)} ★</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">Top Tier Standing</div>
            </div>
          </div>
        </div>

        {/* Hardware & Location Breakdown Table */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wider text-neutral-400">
            Contactless Hardware Performance
          </h3>
          <div className="border border-neutral-200/80 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200/80 text-neutral-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Card Label</th>
                  <th className="py-3 px-4">UID</th>
                  <th className="py-3 px-4">Placement Location</th>
                  <th className="py-3 px-4 text-right">NFC Taps</th>
                  <th className="py-3 px-4 text-right">QR Scans</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {bizCards.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 px-4 font-semibold text-neutral-900">{c.label}</td>
                    <td className="py-3 px-4 font-mono text-neutral-500">{c.card_uid}</td>
                    <td className="py-3 px-4 text-neutral-600">{c.location_name || 'Front Counter'}</td>
                    <td className="py-3 px-4 text-right font-bold text-neutral-900">{c.tap_count}</td>
                    <td className="py-3 px-4 text-right text-neutral-600">{c.qr_scan_count || 0}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        Online
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Recommendations Note */}
        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-xs space-y-2">
          <div className="font-bold text-neutral-900">TapStars Growth Insights</div>
          <p className="text-neutral-600 leading-relaxed">
            Customer tap conversion remained steady with highest engagement occurring between 1:00 PM – 4:00 PM.
            To continue accelerating your 5-star Google review velocity, train staff to remind happy patrons to tap the
            contactless card when delivering the check or receipt folder.
          </p>
        </div>
      </div>
    </div>
  );
};
