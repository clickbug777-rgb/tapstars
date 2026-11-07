import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, LayoutDashboard, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-neutral-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Smartphone className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg tracking-tight text-neutral-900 leading-none">
                TapStars
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                NFC Business Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a href="#how-it-works" className="hover:text-neutral-950 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-neutral-950 transition-colors">
              Features
            </a>
            <a href="#demo" className="hover:text-neutral-950 transition-colors">
              Live Preview
            </a>
            <a href="#industries" className="hover:text-neutral-950 transition-colors">
              Industries
            </a>
            <a href="#faq" className="hover:text-neutral-950 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              isAdmin ? (
                <button
                  onClick={() => navigate('/admin')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-xs transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-xs transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-white" />
                  <span>Client Dashboard</span>
                </button>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  Client Sign In
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-xs transition-all group"
                >
                  <span>Order NFC Cards</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
          >
            Features
          </a>
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
          >
            Live Preview
          </a>
          <a
            href="#industries"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
          >
            Industries
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
          >
            FAQ
          </a>

          <div className="pt-4 border-t border-neutral-200 space-y-2">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(isAdmin ? '/admin' : '/dashboard');
                }}
                className="w-full text-center py-2.5 rounded-xl font-semibold text-xs bg-neutral-950 text-white"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 rounded-xl font-semibold text-xs border border-neutral-200 text-neutral-900"
                >
                  Client Sign In
                </Link>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 rounded-xl font-semibold text-xs bg-neutral-950 text-white"
                >
                  Order NFC Cards
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
