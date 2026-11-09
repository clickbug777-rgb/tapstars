import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Star,
  Utensils,
  UserCheck,
  Share2,
  CreditCard,
  Zap,
  Calendar,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const SolutionsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'reputation' | 'hospitality' | 'corporate'>('all');

  const solutions = [
    {
      id: 'reviews',
      category: 'reputation',
      title: 'Google Reviews & Reputation',
      icon: Star,
      iconBg: 'bg-amber-50 text-amber-600',
      badge: 'Flagship Solution',
      problem:
        'Customers intend to leave positive reviews, but forget or find searching on Google Maps too cumbersome once they leave your store.',
      tapAction:
        'Tapping bypasses search results and instantly launches the Google Review submission dialog with 5 stars highlighted on their phone.',
      benefit:
        'Dramatically accelerates 5-star review velocity at checkout counters and dining tables, propelling local search ranking.',
      idealFor: 'Restaurants, Salons, Spas, Gyms, Dental Clinics, Boutiques',
      status: 'Live & Available',
    },
    {
      id: 'menus',
      category: 'hospitality',
      title: 'Restaurant & Cafe Digital Menus',
      icon: Utensils,
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: 'Hospitality Essential',
      problem:
        'Printed paper menus are expensive to reprint when prices change, easily soiled by food and drinks, and lack engaging photography.',
      tapAction:
        'Tapping opens a fast, mobile-optimized digital menu complete with high-resolution imagery, allergens, and daily specials.',
      benefit:
        'Update prices or seasonal specials instantly in your dashboard without reprinting paper menus. Zero physical wear-and-tear.',
      idealFor: 'Bistros, Rooftop Lounges, Craft Breweries, Patisseries',
      status: 'Live & Available',
    },
    {
      id: 'vcard',
      category: 'corporate',
      title: 'Digital Business Card (vCard)',
      icon: UserCheck,
      iconBg: 'bg-purple-50 text-purple-600',
      badge: 'Networking & Sales',
      problem:
        'Paper business cards are routinely discarded, misplaced, and can never be updated once printed with old phone numbers or titles.',
      tapAction:
        '1-tap downloads a complete verified vCard directly into the recipient’s phonebook with full name, WhatsApp, phone, email, and LinkedIn.',
      benefit:
        'Never run out of business cards at networking events. Save contacts in 2 seconds with 100% spelling accuracy.',
      idealFor: 'Founders, Realtors, Financial Advisors, Sales Executives',
      status: 'Live & Available',
    },
    {
      id: 'socials',
      category: 'corporate',
      title: 'Social Media Connect Hub',
      icon: Share2,
      iconBg: 'bg-pink-50 text-pink-600',
      badge: 'Community Growth',
      problem:
        'Asking visitors to "find us on Instagram" leads to spelling mistakes, wrong handles, or simply forgotten searches.',
      tapAction:
        'Tapping opens your branded TapStars profile page featuring 1-click links to Instagram, YouTube, Facebook, and TikTok.',
      benefit:
        'Converts walk-in customers into lifelong social media followers before they leave your establishment.',
      idealFor: 'Fashion Boutiques, Tattoo Studios, Fitness Centers, Bakeries',
      status: 'Live & Available',
    },
    {
      id: 'catalogues',
      category: 'corporate',
      title: 'Digital Product Catalogues',
      icon: CreditCard,
      iconBg: 'bg-blue-50 text-blue-600',
      badge: 'Showroom & Retail',
      problem:
        'Physical retail stores cannot stock every colorway or size on the floor, losing sales from customers who walk out.',
      tapAction:
        'Tapping an in-store display card launches your complete digital lookbook, technical datasheets, or ecommerce product page.',
      benefit:
        'Empowers in-store shoppers to browse your full online catalog while holding physical fabric swatches or product samples.',
      idealFor: 'Furniture Showrooms, High-End Apparel, Auto Dealerships',
      status: 'Live & Available',
    },
    {
      id: 'payments',
      category: 'hospitality',
      title: 'UPI & Instant Payment Links',
      icon: Zap,
      iconBg: 'bg-amber-50 text-amber-600',
      badge: 'Fintech & Tipping',
      problem:
        'Paper UPI QR stands get faded or tampered with, and passing around portable POS swipe machines slows down checkout.',
      tapAction:
        'Tapping instantly triggers the customer’s UPI app (Google Pay, PhonePe, Paytm) with your merchant VPA pre-filled.',
      benefit:
        'Fastest contactless collection for valet parking, quick-service counters, pop-up stalls, and staff tipping.',
      idealFor: 'Valet Services, Event Kiosks, Food Trucks, Service Desks',
      status: 'Live & Available',
    },
    {
      id: 'bookings',
      category: 'corporate',
      title: 'Appointment & Booking Portals',
      icon: Calendar,
      iconBg: 'bg-teal-50 text-teal-600',
      badge: 'Service Businesses',
      problem:
        'Clients walk out of appointments promising to "call next week to book", leading to forgotten appointments and lost revenue.',
      tapAction:
        'Tapping at the checkout desk opens your Calendly, Google Calendar, or salon booking system for next-slot reservation.',
      benefit:
        'Locks in repeat appointments on the spot while the customer is happiest with their service.',
      idealFor: 'Hair Salons, Wellness Spas, Dental Clinics, Therapy Practices',
      status: 'Live & Available',
    },
    {
      id: 'feedback',
      category: 'reputation',
      title: 'Direct Private Customer Feedback',
      icon: MessageSquare,
      iconBg: 'bg-neutral-100 text-neutral-800',
      badge: 'Reputation Defense',
      problem:
        'Unhappy customers rarely complain to junior staff; instead, they leave damaging 1-star reviews publicly on Google Maps.',
      tapAction:
        'Tapping opens a private feedback form routed directly to the owner/general manager’s WhatsApp or inbox for immediate resolution.',
      benefit:
        'Intercepts negative reviews before they become public, allowing you to resolve grievances and retain customer loyalty.',
      idealFor: 'Hotels, Fine Dining, Diagnostic Labs, Automotive Care',
      status: 'Live & Available',
    },
  ];

  const filteredSolutions = solutions.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>8 Proven Business Applications</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            One Tap. Endless Business Solutions.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            The NFC card is the physical key. The digital destination is the solution. Explore how leading businesses
            deploy TapStars across customer touchpoints.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Solutions (8)' },
              { id: 'reputation', label: 'Reputation & Reviews' },
              { id: 'hospitality', label: 'Dining & Hospitality' },
              { id: 'corporate', label: 'Corporate & Networking' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSolutions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-950">{item.title}</h3>

                    {/* Breakdown */}
                    <div className="space-y-3 pt-2 text-xs leading-relaxed">
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <span className="font-bold text-neutral-900 block mb-1">The Problem It Solves:</span>
                        <p className="text-neutral-600">{item.problem}</p>
                      </div>

                      <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/60">
                        <span className="font-bold text-blue-950 block mb-1">What Happens on Tap:</span>
                        <p className="text-blue-900">{item.tapAction}</p>
                      </div>

                      <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100/60">
                        <span className="font-bold text-emerald-950 block mb-1">Business Value Received:</span>
                        <p className="text-emerald-900">{item.benefit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-400 font-medium">Ideal For: </span>
                      <span className="font-semibold text-neutral-800">{item.idealFor}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="font-bold text-neutral-950 hover:text-blue-600 inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Deploy This</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
            Have a Unique Digital Destination in Mind?
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            TapStars cards can route to any URL, app scheme, or API endpoint. Contact us to configure a custom routing
            logic for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Consult with Our Team
            </Link>
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
            >
              Browse Hardware Catalog
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
