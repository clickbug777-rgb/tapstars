import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  Building,
  User,
  Star,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, register, loginAsDemoClient, loginAsDemoAdmin, isDemoMode } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'signin'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const { error, role } = await login(email, password);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid email or password.');
    } else {
      if (role === 'super_admin' || role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const { error } = await register(email, password, fullName, businessName);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Registration failed.');
    } else {
      setSuccessMsg('Business account created! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Star className="w-5 h-5 text-blue-400 fill-blue-400" />
          </div>
          <span className="font-bold text-2xl text-neutral-950 tracking-tight">TapStars</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
          {activeTab === 'signin' ? 'Welcome Back' : 'Create Your Business Portal'}
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          {activeTab === 'signin'
            ? 'Sign in to access your business analytics, NFC cards & reputation'
            : 'Join over 100+ local businesses scaling 5-star Google reviews'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-6">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'signin' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'register' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Register Business
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@abccafe.in"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="password"
                    required={!isDemoMode}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rohan Mehta"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="The Mumbai Roastery"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rohan@mumbairoastery.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Creating Portal...' : 'Get Started Free'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Quick Demo Launchers */}
          <div className="border-t border-neutral-100 pt-5 space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 text-center">
              Quick Role Switcher (Instant Exploration)
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoClient();
                  navigate('/dashboard');
                }}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-900 text-xs font-semibold text-center transition-colors shadow-xs"
              >
                <span>Client Dashboard</span>
                <span className="block text-[10px] text-blue-600 font-normal mt-0.5">(ABC Cafe Owner)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsDemoAdmin();
                  navigate('/admin');
                }}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-xs font-semibold text-center transition-colors shadow-xs"
              >
                <span>Admin Dashboard</span>
                <span className="block text-[10px] text-amber-700 font-normal mt-0.5">(TapStars Platform)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
