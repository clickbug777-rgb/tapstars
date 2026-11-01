import React, { useState } from 'react';
import {
  Settings,
  Database,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Shield,
  FileCode,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CONFIG } from '../../lib/config';

export const SettingsPage: React.FC = () => {
  const { isSupabaseLive, resetToDemoData, refreshData } = useData();
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const sampleEnv = `VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_BASE_URL=https://tapstars.pages.dev`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your local database to the 3 default demo businesses (ABC Cafe, Urban Cuts, Smile Dental)?')) {
      resetToDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-fade-in">
      {/* Top Header */}
      <div className="pb-2 border-b border-neutral-200/70">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Platform Settings</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Configure deployment hostnames, verify database connection, and manage storage.
        </p>
      </div>

      {/* 1. PERMANENT BASE URL */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-neutral-700" />
          <h3 className="font-bold text-neutral-900 text-sm">Permanent Base Hostname</h3>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          The permanent domain programmed into physical NFC cards. Once cards are printed and delivered to
          businesses, never change this address to prevent breaking existing cards.
        </p>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase font-mono tracking-wider text-neutral-400">
              Active Resolved Base URL
            </div>
            <div className="font-mono text-sm font-bold text-neutral-900">{CONFIG.getBaseUrl()}</div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-semibold">
            pages.dev Free Subdomain
          </span>
        </div>
      </div>

      {/* 2. SUPABASE POSTGRESQL CONNECTION STATUS */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-neutral-700" />
            <h3 className="font-bold text-neutral-900 text-sm">Database & Authentication</h3>
          </div>

          {isSupabaseLive ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Connected to Supabase PostgreSQL</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Local Demo Mode (No Supabase Linked)</span>
            </div>
          )}
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          TapStars uses Supabase for production database records, Row Level Security (RLS), and admin
          authentication.
        </p>

        {/* Instructions Card for Beginner */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
          <h4 className="font-bold text-neutral-900">How to Connect Your Free Supabase Project:</h4>
          <ol className="list-decimal list-inside space-y-1.5 text-neutral-600">
            <li>
              Go to{' '}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold underline inline-flex items-center gap-0.5"
              >
                supabase.com/dashboard <ExternalLink className="w-3 h-3" />
              </a>{' '}
              and sign up for free.
            </li>
            <li>Click <strong>New Project</strong> and name it <strong>tapstars</strong>.</li>
            <li>
              Open the <strong>SQL Editor</strong> tab on the left in Supabase, and run the SQL code from{' '}
              <code className="text-neutral-800 font-mono bg-neutral-200/70 px-1 py-0.5 rounded">
                supabase/schema.sql
              </code>.
            </li>
            <li>
              Copy your <strong>Project URL</strong> and <strong>anon public key</strong> from Project Settings → API.
            </li>
            <li>
              Paste them into your local <code className="font-mono bg-neutral-200 px-1 py-0.5 rounded">.env</code> file
              or Cloudflare Pages Environment Variables!
            </li>
          </ol>
        </div>

        {/* .env Helper */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-800">Environment Variables Format (.env)</span>
            <button
              onClick={handleCopyEnv}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEnv ? 'Copied' : 'Copy Template'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-[11px] overflow-x-auto">
            {sampleEnv}
          </pre>
        </div>
      </div>

      {/* 3. DEMO DATA RESET */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
        <h3 className="font-bold text-neutral-900 text-sm">Demo Data Management</h3>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Reset local storage to the original sample businesses: ABC Cafe, Urban Cuts Studio, and Smile Dental Clinic.
        </p>

        {resetSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            ✓ Reset complete. Demo businesses restored!
          </div>
        )}

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restore Default Sample Businesses</span>
        </button>
      </div>
    </div>
  );
};
