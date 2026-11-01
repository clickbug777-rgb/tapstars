import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, CheckCircle, Share2, BarChart3, Shield, Clock, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            One Tap.{' '}
            <span className="text-primary">Your Entire Business.</span>
          </h1>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-8">
            Connect customers to your Google Reviews, social profiles, contact details, and more—without ever rewriting physical cards.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-ink hover:bg-ink/90 rounded-xl transition-all shadow-sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-ink hover:text-ink-dark rounded-xl hover:bg-bg-soft transition-all"
            >
              See Features
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm">
            <div className="flex items-center justify-center gap-2 text-ink-muted">
              <Shield className="w-4 h-4 text-success" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-ink-muted">
              <Clock className="w-4 h-4 text-primary" />
              <span>No paid subscriptions</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-ink-muted">
              <Star className="w-4 h-4 text-warning" />
              <span>Powered by Cloudflare Pages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-bg-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink mb-3">Features</h2>
            <p className="text-lg text-ink-muted">All the tools you need for digital presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, title: 'Google Reviews', desc: 'Direct link to collect 5-star reviews' },
              { icon: Share2, title: 'Social Media', desc: 'Instagram, Facebook, YouTube, LinkedIn' },
              { icon: Smartphone, title: 'WhatsApp', desc: 'Instant direct message support' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-surface rounded-xl border border-border">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
