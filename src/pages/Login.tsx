import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@tapstars.dev');
  const [password, setPassword] = useState('demo-password-123');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await login(email, password);
    if (error) {
      setError(error.message);
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center shadow-sm">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-ink">TapStars</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-surface rounded-2xl border border-border p-8 shadow-md"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-ink mb-0.5">Welcome to TapStars</h1>
            <p className="text-sm text-ink-muted">Enter your credentials to access the admin dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger-soft border border-danger rounded-lg flex items-start gap-2.5 text-sm text-danger-ink">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-bg-soft focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-ink"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-bg-soft focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-ink"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 inline-flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-white bg-ink hover:bg-ink/90 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {submitting ? 'Signing in…' : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In to Dashboard
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-ink-faint text-center">
            Demo mode allows quick testing. For production, configure real Supabase credentials.
          </p>
        </form>
      </main>
    </div>
  );
};