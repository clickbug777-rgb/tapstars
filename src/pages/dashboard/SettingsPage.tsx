import React, { useState } from 'react';
import {
  Settings,
  Shield,
  CreditCard,
  User,
  Key,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SubscriptionPlanId } from '../../types';

export const SettingsPage: React.FC = () => {
  const { user, profile, activeBusinessId } = useAuth();
  const { businesses, getSubscription, updateSubscription } = useData();

  const business = businesses.find((b) => b.id === activeBusinessId) || businesses[0];
  const subscription = business ? getSubscription(business.id) : undefined;

  const [activePlan, setActivePlan] = useState<SubscriptionPlanId>(
    subscription?.plan_id || 'growth'
  );
  const [isUpdatingSub, setIsUpdatingSub] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);

  const plans = [
    {
      id: 'starter' as SubscriptionPlanId,
      name: 'Starter',
      price: 'Free',
      description: 'Single NFC card and basic tap analytics',
      features: ['1 NFC Smart Card', 'Basic tap counting', 'Standard redirect speeds'],
    },
    {
      id: 'growth' as SubscriptionPlanId,
      name: 'Growth',
      price: '₹199 / mo',
      description: 'Detailed analytics, QR backup & review tracking',
      features: ['Up to 3 NFC Smart Cards', 'Full analytics & device breakdown', 'Google review tracking', 'QR generator studio'],
      recommended: true,
    },
    {
      id: 'premium' as SubscriptionPlanId,
      name: 'Premium',
      price: '₹499 / mo',
      description: 'Multi-counter tracking & downloadable reports',
      features: ['Up to 10 NFC Smart Cards', 'Monthly executive PDF reports', 'Priority edge DNS', 'Place ID review sync'],
    },
    {
      id: 'business_pro' as SubscriptionPlanId,
      name: 'Business Pro',
      price: '₹999 / mo',
      description: 'Multi-location chain with dedicated manager',
      features: ['Unlimited Smart Cards', 'Multi-location franchise dashboard', 'Automated reports', '24/7 Priority support'],
    },
  ];

  const handlePlanChange = async (planId: SubscriptionPlanId) => {
    if (!business) return;
    setIsUpdatingSub(true);
    await updateSubscription(business.id, planId);
    setActivePlan(planId);
    setIsUpdatingSub(false);
    setSubSuccess(true);
    setTimeout(() => setSubSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Account & Subscription Settings</h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          Manage your login credentials, notification preferences & TapStars SaaS plan
        </p>
      </div>

      {/* Account Profile Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
        <h3 className="font-bold text-neutral-950 text-base">Account Identity</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-500 mb-1">Owner Name</label>
            <input
              type="text"
              readOnly
              value={profile?.full_name || 'Business Manager'}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-500 mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={user?.email || 'owner@tapstars.dev'}
              className="w-full text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Subscription Tier Management */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Subscription Plan</h3>
            <p className="text-xs text-neutral-500">Upgrade or manage your active monthly subscription tier</p>
          </div>

          {subSuccess && (
            <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscription updated!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => {
            const isCurrent = activePlan === p.id;
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">{p.name}</span>
                    {p.recommended && !isCurrent && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Popular
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
                        Active
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-2xl font-bold tracking-tight">{p.price}</div>
                    <p className={`text-xs mt-1 ${isCurrent ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {p.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-neutral-200/20 text-xs">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-400' : 'text-emerald-600'}`}
                        />
                        <span className={isCurrent ? 'text-neutral-200' : 'text-neutral-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    disabled={isCurrent || isUpdatingSub}
                    onClick={() => handlePlanChange(p.id)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                      isCurrent
                        ? 'bg-white/10 text-neutral-400 cursor-default'
                        : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
