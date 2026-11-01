import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ArrowLeft, AlertCircle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center shadow-sm">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-ink">TapStars</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-warning-soft flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-warning" />
          </div>
          <h1 className="text-2xl font-bold text-ink mb-3">Something went wrong</h1>
          <p className="text-sm text-ink-muted mb-6">The page you're looking for doesn't exist or may have been moved.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-ink hover:bg-ink/90 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
};
