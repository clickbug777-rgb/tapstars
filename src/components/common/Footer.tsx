import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-semibold text-lg text-neutral-900 tracking-tight">TapStars</span>
            </div>
            <p className="text-neutral-500 max-w-sm leading-relaxed text-sm">
              The complete NFC digital business presence platform. One tap connects customers to your Google
              reviews, social channels, contacts, and services — without ever rewriting physical cards.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Self-hosted on Cloudflare Pages • Supabase PostgreSQL • 100% Free Tier Deployable</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">
                  How NFC Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-neutral-900 transition-colors">
                  Google Review Tap
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-neutral-900 transition-colors">
                  Digital Profiles
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-neutral-900 transition-colors">
                  NFC FAQ & Chip Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Platform & Admin */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 text-xs uppercase tracking-wider">Management</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-neutral-900 transition-colors">
                  Admin Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-neutral-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/p/abc-cafe" className="hover:text-neutral-900 transition-colors">
                  Sample Profile (ABC Cafe)
                </Link>
              </li>
              <li>
                <Link to="/r/abc-cafe" className="hover:text-neutral-900 transition-colors">
                  Sample NFC Redirect
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} TapStars Platform. Designed for modern local businesses.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with precision</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
