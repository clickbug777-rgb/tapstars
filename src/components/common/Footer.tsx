import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, ShieldCheck, Star, ArrowUpRight, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-neutral-950 flex items-center justify-center shadow-xs">
                <Wifi className="w-5 h-5 text-blue-600 rotate-90" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">TapStars</span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              One Tap. Endless Possibilities. Connect your customers to your business with smart contactless NFC and QR
              solutions &mdash; powered by permanent edge redirects you control from your dashboard.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Cloudflare Global Edge Network • Supabase PostgreSQL Live</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200 font-mono">
              Hardware
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Google Review Card
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Custom Branded Card
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  NFC + QR Dual Card
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Countertop Standees
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Hardware Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200 font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Google Reputation & Reviews
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Restaurant Digital Menus
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Digital Business Cards (vCard)
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Social Media Hub Cards
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  UPI & Instant Payment Links
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Appointment & Booking Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Company */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200 font-mono">
              Platform & Access
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Client Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Admin Workspace
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About TapStars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} TapStars Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Waterproof PVC</span>
            <span>•</span>
            <span>Zero App Downloads</span>
            <span>•</span>
            <span>iOS & Android Native</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
