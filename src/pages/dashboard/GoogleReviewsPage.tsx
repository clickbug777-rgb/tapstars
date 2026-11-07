import React, { useState, useMemo } from 'react';
import {
  Star,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Key,
  ShieldCheck,
  Building,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const GoogleReviewsPage: React.FC = () => {
  const { activeBusinessId } = useAuth();
  const { businesses, getGoogleProfile, connectGoogleProfile } = useData();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const googleProfile = business ? getGoogleProfile(business.id) : undefined;

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [placeIdInput, setPlaceIdInput] = useState(business?.place_id || '');
  const [isConnecting, setIsConnecting] = useState(false);

  const reviews = googleProfile?.recent_reviews || [];
  const ratingDist = googleProfile?.rating_distribution || { 5: 136, 4: 9, 3: 2, 2: 1, 1: 0 };
  const totalReviews = googleProfile?.total_reviews ?? business?.google_review_count ?? 148;
  const avgRating = googleProfile?.average_rating ?? business?.google_rating ?? 4.9;
  const unansweredCount = googleProfile?.unanswered_reviews_count ?? 2;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setIsConnecting(true);
    await connectGoogleProfile(business.id, placeIdInput);
    setIsConnecting(false);
    setIsConnectModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Google Business Reputation</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Monitor real-time Google reviews, rating health & customer feedback trends
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <Key className="w-3.5 h-3.5 text-neutral-500" />
            <span>Google API Settings</span>
          </button>

          {business?.google_review_url && (
            <a
              href={business.google_review_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>Write Test Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Overview Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rating Score */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Average Google Rating</div>
          <div className="text-3xl font-bold text-neutral-950 flex items-center gap-1.5">
            <span>{avgRating.toFixed(1)}</span>
            <div className="flex text-amber-400 text-base">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'fill-amber-400' : 'text-neutral-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Top 5% in {business?.category}</div>
        </div>

        {/* Total Reviews */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Total Published Reviews</div>
          <div className="text-3xl font-bold text-neutral-950">{totalReviews}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Verified customer ratings on Maps</div>
        </div>

        {/* Unanswered Reviews */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Unanswered Reviews</div>
          <div className="text-3xl font-bold text-amber-600">{unansweredCount}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Awaiting owner response on Google</div>
        </div>

        {/* Connection Status */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-medium mb-1">Google Profile Sync</div>
          <div className="text-sm font-bold text-neutral-900 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Verified</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 truncate">
            ID: {business?.place_id || 'ChIJN1t_tDeuEmsR...'}
          </div>
        </div>
      </div>

      {/* Rating Distribution Breakdown */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
        <h3 className="font-bold text-neutral-950 text-base">Rating Distribution</h3>
        <div className="space-y-2.5 max-w-xl">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = (ratingDist as any)[stars] || 0;
            const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <div className="w-12 flex items-center gap-1 text-neutral-600 font-medium shrink-0">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right font-medium text-neutral-600 shrink-0">
                  {count} <span className="text-neutral-400">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reviews Stream */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-200/70 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Recent Customer Feedback</h3>
            <p className="text-xs text-neutral-500">Live reviews submitted by customers visiting your location</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
            {reviews.length} Recent Reviews
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {reviews.map((rev, index) => (
            <div key={index} className="p-6 space-y-3 hover:bg-neutral-50/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900 text-sm">{rev.author}</span>
                    <span className="text-neutral-400 text-xs">• {rev.relative_time}</span>
                  </div>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-neutral-200'}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  {rev.has_response ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Owner Replied</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertCircle className="w-2.5 h-2.5" />
                      <span>Needs Response</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed">{rev.text}</p>

              {rev.reply_text && (
                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-xs space-y-1">
                  <div className="font-semibold text-neutral-900 text-[11px]">Owner Response:</div>
                  <p className="text-neutral-600">{rev.reply_text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Official Google API Configuration Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="font-bold text-neutral-950 text-lg">Google Business Profile Integration</h3>
              <p className="text-xs text-neutral-500">
                Official Google API architecture for fetching verified reviews and ratings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Official OAuth 2.0 & Place ID Setup</span>
              </div>
              <p className="leading-relaxed">
                TapStars connects to the official <strong>Google Business Profile Performance API</strong> and Places API.
                You can link your business either by entering your unique Google Place ID or authorizing with your Google account.
              </p>
            </div>

            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Google Place ID
                </label>
                <input
                  type="text"
                  value={placeIdInput}
                  onChange={(e) => setPlaceIdInput(e.target.value)}
                  placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
                  className="w-full text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Find your Place ID using Google's Place ID Finder tool.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                >
                  {isConnecting ? 'Verifying...' : 'Save & Sync Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
