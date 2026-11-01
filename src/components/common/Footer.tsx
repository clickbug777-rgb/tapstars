import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Smartphone, Shield, Clock, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-lg text-ink">
                TapStars
              </span>
            </Link>
            <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
              The NFC digital business presence platform. One tap connects customers to reviews, social, contacts — without rewriting cards.
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-muted pt-2">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span>Free tier • Cloudflare Pages • Supabase</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-ink mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="hover:text-ink transition-colors">Admin Login</Link></li>
              <li><a href="#features" className="hover:text-ink transition-colors">Features</a></li>
              <li><Link to="/p/abc-cafe" className="hover:text-ink transition-colors">Demo Profile</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-ink mb-3 text-xs uppercase tracking-wider">Management</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/admin" className="hover:text-ink transition-colors">Dashboard</Link></li>
              <li><Link to="/admin/businesses" className="hover:text-ink transition-colors">Businesses</Link></li>
              <li><Link to="/admin/cards" className="hover:text-ink transition-colors">NFC Cards</Link></li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-semibold text-ink mb-3 text-xs uppercase tracking-wider">Status</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-ink-muted">Operational</span>
              </li>
              <li className="text-xs text-ink-muted">
                Built with <Star className="w-3 h-3 inline text-warning" /> by TapStars
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} TapStars Platform. Self-hosted on Cloudflare Pages.</p>
        </div>
      </div>
    </footer>
  );
};
