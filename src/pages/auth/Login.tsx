import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Smartphone, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CONFIG } from '../../lib/config';

export const LoginPage: React.FC = () => {
  const { login, enableDemoAdmin, isDemoMode, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const { error } = await login(email, password);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid credentials.');
    } else {
      navigate('/admin');
    }
  };

  const handleDemoSignIn = () => {
    enableDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-bold text-xl text-neutral-950 tracking-tight">TapStars</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Admin Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Manage businesses, NFC cards, redirects, and real-time analytics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-3xl border border-neutral-200/90 shadow-lg space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tapstars.dev"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-neutral-800">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="password"
                  required={!isDemoMode}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Mode Helper */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Beginner Quick Start</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Test the complete management system right away without configuring Supabase credentials first.
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2 px-3 rounded-xl bg-neutral-200/70 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition-colors"
              >
                Enter Instant Demo Admin
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
