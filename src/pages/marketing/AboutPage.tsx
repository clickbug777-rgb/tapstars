import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Our Mission & Principles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            About TapStars
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            We build physical-to-digital touchpoints that make connecting with businesses as simple as a single touch.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              The Problem with Physical Interactions
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Every day, millions of customers walk into cafes, restaurants, clinics, boutiques, and offices. They have
              delightful experiences, but when asked to leave a Google review, browse a menu, save a phone number, or
              follow on social media, friction gets in the way.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Typing URLs on small keyboards leads to typos. Searching on Google Maps brings up competitors. Clunky QR
              codes require stepping back, focusing lenses, and adequate lighting. Paper menus and cards get stained and
              thrown away.
            </p>

            <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <h3 className="font-bold text-blue-950 text-base">The TapStars Answer</h3>
              <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                We believe physical-to-digital interactions should be as effortless as paying with Apple Pay or tapping a
                metro card. One tap. No apps. No typing. Just an instant, direct connection.
              </p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Zero Friction</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                No apps to install. No user registration for customers. If it takes more than 1 second to connect, it's too
                slow.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Permanent Hardware</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Cards should never become obsolete. When your link or business changes, your physical card keeps working
                forever.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Genuine Business Value</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We measure real customer taps, not vanity claims. Built to deliver tangible reputation and operational
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Join the TapStars Network</h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Equip your counter today and give your customers the modern contactless experience they expect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Order Cards Today
            </Link>
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
