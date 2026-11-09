import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Phone, Mail, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

const currentYear = new Date().getFullYear();

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

          {/* Column 1: Hardware & Solutions */}
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
                <Link to="/solutions" className="hover:text-white transition-colors">
                  All 8 Solutions
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & Pages */}
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
                <Link to="/about" className="hover:text-white transition-colors">
                  About TapStars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Order Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Founder */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200 font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="text-white font-semibold">JayrajSinh Mahida</div>
              
              <div>
                <a
                  href="https://wa.me/917383273362?text=Hi%20Jayraj,%20I%20am%20interested%20in%20TapStars%20smart%20NFC%20cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono">+91 73832 73362</span>
                </a>
              </div>

              <div>
                <a
                  href="tel:+917383273362"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono">+91 73832 73362</span>
                </a>
              </div>

              <div>
                <a
                  href="mailto:jayrajs.work@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>jayrajs.work@gmail.com</span>
                </a>
              </div>

              <div className="pt-1">
                <a
                  href="https://instagram.com/the__jayrajsinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-[11px]"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                  <span>@the__jayrajsinh</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} TapStars Platform. Built by JayrajSinh Mahida.</p>
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
