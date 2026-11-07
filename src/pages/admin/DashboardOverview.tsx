import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CreditCard,
  TrendingUp,
  Plus,
  QrCode,
  ExternalLink,
  Wifi,
  Sparkles,
  Star,
  Activity,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/admin/StatCard';
import { BusinessFormModal } from '../../components/business/BusinessFormModal';
import { CardModal } from '../../components/cards/CardModal';
import { QrCodeModal } from '../../components/qr/QrCodeModal';
import { formatNumber, formatDate } from '../../lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const {
    businesses,
    cards,
    events,
    adminStats,
    googleProfiles,
    subscriptions,
    createBusiness,
    createCard,
    toggleBusinessStatus,
  } = useData();

  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState<{ title: string; slug: string } | null>(null);

  // Generate chart data from events or past 7 days
  const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartData = chartDays.map((day, idx) => {
    const multiplier = [14, 19, 26, 24, 38, 48, 32][idx];
    const nfcTaps = Math.max(1, Math.round((adminStats.totalNfcTaps * multiplier) / 201));
    const qrScans = Math.max(1, Math.round((adminStats.totalQrScans * multiplier) / 201));

    return {
      day,
      nfcTaps,
      qrScans,
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">TapStars Admin Overview</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
              PLATFORM SUPER ADMIN
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitor platform-wide multi-business activity, NFC card inventory & subscription tiers
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCardModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-all shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Assign New NFC Card</span>
          </button>
          <button
            onClick={() => setBusinessModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Business Account</span>
          </button>
        </div>
      </div>

      {/* 6 Platform KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Registered Businesses"
          value={adminStats.totalBusinesses}
          subtitle={`${adminStats.activeBusinesses} currently active`}
          icon={Building2}
        />
        <StatCard
          title="Active NFC Cards"
          value={adminStats.totalCards}
          subtitle="Assigned touchpoints"
          icon={CreditCard}
        />
        <StatCard
          title="Total NFC Taps"
          value={formatNumber(adminStats.totalNfcTaps)}
          subtitle="Contactless interactions"
          icon={Wifi}
        />
        <StatCard
          title="Total QR Scans"
          value={formatNumber(adminStats.totalQrScans)}
          subtitle="Secondary backup scans"
          icon={QrCode}
        />
        <StatCard
          title="Google Profiles"
          value={Object.values(googleProfiles).filter((g) => g.is_connected).length}
          subtitle="Connected reputations"
          icon={Star}
        />
        <StatCard
          title="Monthly ARR/MRR"
          value={`₹${formatNumber(adminStats.monthlyRevenueInr)}`}
          subtitle={`${adminStats.totalSubscriptions} active subscriptions`}
          icon={DollarSign}
        />
      </div>

      {/* Main Interactive Chart */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Platform Activity Volume</h3>
            <p className="text-xs text-neutral-500">Contactless NFC taps vs QR camera scans across all onboarded clients</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-neutral-900"></div>
              <span className="font-medium text-neutral-700">NFC Taps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="font-medium text-neutral-700">QR Scans</span>
            </div>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="adminNfcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#171717" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="adminQrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#999" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#999" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0a0a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="nfcTaps"
                name="NFC Taps"
                stroke="#171717"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#adminNfcGrad)"
              />
              <Area
                type="monotone"
                dataKey="qrScans"
                name="QR Scans"
                stroke="#9333ea"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#adminQrGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Registered Businesses Quick Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-200/70 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Onboarded Business Accounts</h3>
            <p className="text-xs text-neutral-500">Live businesses receiving contactless Google reviews</p>
          </div>
          <Link
            to="/admin/businesses"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Manage All Businesses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-neutral-100">
          {businesses.map((biz) => {
            const bizAssignedCards = cards.filter((c) => c.business_id === biz.id);
            const sub = subscriptions[biz.id];
            const gProfile = googleProfiles[biz.id];

            return (
              <div
                key={biz.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={biz.logo_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80'}
                    alt={biz.name}
                    className="w-10 h-10 rounded-2xl object-cover border border-neutral-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900 text-sm">{biz.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 text-neutral-600">
                        /p/{biz.slug}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                      <span>{biz.category}</span>
                      <span>•</span>
                      <span>{bizAssignedCards.length} assigned cards</span>
                      <span>•</span>
                      <span className="text-amber-600 font-medium">
                        {gProfile?.average_rating || biz.google_rating || 4.9} ★
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      sub?.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {(sub?.plan_id || 'starter').toUpperCase()} (₹{sub?.price_inr || 0}/mo)
                  </span>

                  <button
                    onClick={() => toggleBusinessStatus(biz.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      biz.is_active
                        ? 'text-neutral-600 hover:text-neutral-900 bg-neutral-100'
                        : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                    }`}
                  >
                    {biz.is_active ? 'Active' : 'Paused'}
                  </button>

                  <a
                    href={`/p/${biz.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {businessModalOpen && (
        <BusinessFormModal
          isOpen={businessModalOpen}
          existingSlugs={businesses.map((b) => b.slug)}
          onClose={() => setBusinessModalOpen(false)}
          onSave={async (data) => {
            await createBusiness(data);
            setBusinessModalOpen(false);
          }}
        />
      )}

      {cardModalOpen && (
        <CardModal
          isOpen={cardModalOpen}
          businesses={businesses}
          onClose={() => setCardModalOpen(false)}
          onSave={async (data) => {
            await createCard(data);
            setCardModalOpen(false);
          }}
        />
      )}

      {qrModalData && (
        <QrCodeModal
          isOpen={Boolean(qrModalData)}
          onClose={() => setQrModalData(null)}
          title={qrModalData.title}
          slug={qrModalData.slug}
        />
      )}
    </div>
  );
};
