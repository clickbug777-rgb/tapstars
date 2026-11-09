import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wifi,
  Star,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  Utensils,
  UserCheck,
  Share2,
  Calendar,
  CreditCard,
  MessageSquare,
  BarChart3,
  PhoneCall,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const HomePage: React.FC = () => {
  // Active state for interactive tap simulator
  const [activeDemoTab, setActiveDemoTab] = useState<
    'reviews' | 'menu' | 'vcard' | 'socials' | 'booking'
  >('reviews');

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick inquiry form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProduct, setInquiryProduct] = useState('Google Review Card (Pack of 3)');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  const faqs = [
    {
      q: 'Do customers need to download an app to tap the card?',
      a: 'No app is required. Both Apple iPhone (iPhone 7 and newer) and modern Android smartphones have native NFC readers built into the operating system. When a customer taps the card, their phone automatically pops up a browser notification and opens the destination within milliseconds.',
    },
    {
      q: 'What happens if we move location or change our Google Review link?',
      a: 'This is the superpower of TapStars. Your physical cards are permanently encoded with your unique TapStars edge URL. If your Google Review link changes, your menu updates, or you switch destinations, you simply update it in your TapStars dashboard. Your physical cards continue to work forever without being reprinted or reprogrammed.',
    },
    {
      q: 'What if a customer has an older phone without NFC?',
      a: 'Every TapStars smart card features a high-density, print-ready QR code on the back. Customers can simply open their camera app and scan the QR code to open the exact same destination with zero friction.',
    },
    {
      q: 'Is TapStars only for Google Reviews?',
      a: 'While Google Review Cards are our most popular initial product, TapStars cards can be programmed to open ANY digital destination — including digital restaurant menus, downloadable contact vCards, social media hubs, UPI payment links, catalogues, and appointment booking pages.',
    },
    {
      q: 'Can we get custom branded cards with our business logo?',
      a: 'Yes. We offer both standard TapStars Google Review Cards (white with official Google G and 5-star graphics) as well as fully customized matte-black or full-color branded cards featuring your custom logo and corporate identity.',
    },
    {
      q: 'How durable are the physical NFC cards?',
      a: 'TapStars cards are manufactured from premium, credit-card-grade waterproof PVC with embedded NTAG213/NTAG215 microchips. They are waterproof, scratch-resistant, and tested for over 100,000 tap cycles with zero battery or charging required.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-white border-b border-neutral-200/60">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/70 via-neutral-50/40 to-transparent pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Smart Contactless NFC & QR Infrastructure</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
                One Tap.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-neutral-950">
                  Endless Possibilities.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Connect your customers to your business with smart NFC and QR solutions. From instant 5-star Google
                Reviews and interactive digital menus to contact sharing and payment links &mdash; make every physical
                interaction simpler, faster, and measurable with TapStars.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#order-cards"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Order Review Cards</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/solutions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-800 text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition-all shadow-2xs"
                >
                  <span>Explore All Solutions</span>
                </Link>

                <a
                  href="#interactive-demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-neutral-600 hover:text-neutral-950 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Wifi className="w-4 h-4 text-blue-600 rotate-90" />
                  <span>Interactive Simulator</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero App Download Needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Works on iPhone & Android</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Waterproof PVC Hardware</span>
                </div>
              </div>
            </div>

            {/* Right Product Showcase (Featuring Genuine Product Photography) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Genuine Product Photo Hero Card */}
                <div className="relative z-10 rounded-3xl bg-neutral-950/5 p-3 sm:p-4 backdrop-blur-xs border border-neutral-200/80 shadow-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-inner relative group">
                    <img
                      src="/images/nfc-google-review-tap.png"
                      alt="TapStars NFC Smart Card Tapping on Smartphone for Instant Google Review"
                      className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                    />

                    {/* Floating Contactless Wave Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-md flex items-center gap-2 text-neutral-900 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <Wifi className="w-3.5 h-3.5 text-blue-600 rotate-90" />
                      <span>Instant Contactless Tap</span>
                    </div>

                    {/* Floating Review Rating Chip */}
                    <div className="absolute bottom-4 left-4 bg-neutral-950/90 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg flex items-center gap-2 text-xs">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="font-semibold text-[11px] text-neutral-200">
                        5.0 Google Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-Card Peek showing genuine front & back */}
                <div className="absolute -bottom-6 -right-6 z-20 w-44 sm:w-52 rounded-2xl overflow-hidden border-2 border-white shadow-xl hidden sm:block bg-white p-1">
                  <img
                    src="/images/nfc-card-front-back.jpg"
                    alt="TapStars Front and Back Dual NFC and QR Smart Card"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <div className="p-1.5 text-center">
                    <span className="text-[10px] font-bold text-neutral-700 font-mono">
                      NFC Front + QR Back
                    </span>
                  </div>
                </div>

                {/* Background Ambient Glow Blur */}
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10 rounded-full scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS IN 4 STEPS */}
      <section id="how-it-works" className="py-20 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Frictionless Customer Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              How TapStars Works in 4 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              No apps to download. No awkward typing. Just touch your phone to the card and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white font-mono font-bold text-base flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Select Your Physical Card</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Choose the Google Review Card, Restaurant Menu Card, or Custom Branded NFC Stand for your business.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-mono font-bold text-base flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Customer Taps or Scans</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Customers bring their iPhone or Android phone within 2–4 cm of the card, or scan the backup QR code.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-mono font-bold text-base flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Opens Instantly on Phone</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The customer’s native mobile browser opens your designated destination in less than 300 milliseconds.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-mono font-bold text-base flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Track Live Performance</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                View real-time tap counts, peak engagement hours, and device types directly on your TapStars dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TAP SIMULATOR SECTION */}
      <section id="interactive-demo" className="py-20 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Tap Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              See What Your Customers Experience
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Click any business use case below to simulate what opens on a customer’s phone when they tap your card.
            </p>
          </div>

          {/* Simulator Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f8f9fa] p-6 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-sm">
            {/* Left Options Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2">
                Choose a Digital Solution:
              </div>

              {/* Tab 1: Google Review */}
              <button
                onClick={() => setActiveDemoTab('reviews')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  activeDemoTab === 'reviews'
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-neutral-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">Google Review Card</div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Instantly opens the 5-star review submission form on Google Maps.
                  </p>
                </div>
              </button>

              {/* Tab 2: Digital Menu */}
              <button
                onClick={() => setActiveDemoTab('menu')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  activeDemoTab === 'menu'
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-neutral-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">Restaurant Digital Menu</div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Interactive menu with food photos, pricing, and daily specials.
                  </p>
                </div>
              </button>

              {/* Tab 3: Digital Business Card */}
              <button
                onClick={() => setActiveDemoTab('vcard')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  activeDemoTab === 'vcard'
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-neutral-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">Digital Business Card (vCard)</div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    1-tap "Save Contact" to customer phonebook with email, WhatsApp, and phone.
                  </p>
                </div>
              </button>

              {/* Tab 4: Social Media Hub */}
              <button
                onClick={() => setActiveDemoTab('socials')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  activeDemoTab === 'socials'
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-neutral-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">Social Media Hub</div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Connect customers to Instagram, YouTube, TikTok, and LinkedIn in one spot.
                  </p>
                </div>
              </button>

              {/* Tab 5: Booking & Appointments */}
              <button
                onClick={() => setActiveDemoTab('booking')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  activeDemoTab === 'booking'
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-neutral-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">Appointment & Booking Link</div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Direct customers to book their next appointment, table, or consultation.
                  </p>
                </div>
              </button>
            </div>

            {/* Right Realistic Mobile Phone Frame Simulation */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full max-w-[340px] bg-neutral-950 p-3.5 rounded-[44px] shadow-2xl border-4 border-neutral-800">
                {/* Dynamic Island / Speaker */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-neutral-900 ml-auto mr-3"></div>
                </div>

                {/* Simulated Screen Body */}
                <div className="relative overflow-hidden rounded-[36px] bg-white text-neutral-900 min-h-[560px] flex flex-col justify-between pt-9 pb-4 px-4 shadow-inner">
                  {/* Top Mobile Status Header */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 pb-2 border-b border-neutral-100">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3 text-neutral-900" />
                      <span className="text-[10px] bg-neutral-900 text-white px-1 rounded">5G</span>
                    </div>
                  </div>

                  {/* Active Simulation Screen Content */}
                  <div className="py-4 space-y-4 flex-1">
                    {/* Scenario 1: Google Review */}
                    {activeDemoTab === 'reviews' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80"
                            alt="Business"
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <div className="font-bold text-xs text-neutral-950">ABC Cafe & Roastery</div>
                            <div className="text-[10px] text-neutral-500">Google Business Verified</div>
                          </div>
                        </div>

                        <div className="text-center py-2 space-y-2">
                          <div className="text-xs font-semibold text-neutral-700">Rate your experience</div>
                          <div className="flex items-center justify-center gap-1.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400 cursor-pointer" />
                            ))}
                          </div>
                          <div className="text-[11px] text-neutral-500">5.0 Star Rating</div>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-400">
                          Share details of your own experience at this place...
                        </div>

                        <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs">
                          Post Google Review
                        </button>
                      </div>
                    )}

                    {/* Scenario 2: Restaurant Menu */}
                    {activeDemoTab === 'menu' && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="text-center pb-1 border-b border-neutral-100">
                          <div className="font-bold text-sm text-neutral-950">Artisan Cafe Menu</div>
                          <div className="text-[10px] text-neutral-500">Freshly Baked & Roasted Daily</div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-neutral-900">Ethiopian Single Origin Pour-Over</div>
                              <div className="text-[10px] text-neutral-500">Floral notes, blueberry finish</div>
                            </div>
                            <span className="font-bold text-neutral-900">₹260</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-neutral-900">Almond Croissant & Jam</div>
                              <div className="text-[10px] text-neutral-500">Double baked French pastry</div>
                            </div>
                            <span className="font-bold text-neutral-900">₹220</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-neutral-900">Truffle Avocado Sourdough</div>
                              <div className="text-[10px] text-neutral-500">Organic sourdough, poached eggs</div>
                            </div>
                            <span className="font-bold text-neutral-900">₹380</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-[10px] text-center font-semibold">
                          Tap card at table anytime to order more
                        </div>
                      </div>
                    )}

                    {/* Scenario 3: Digital Business Card */}
                    {activeDemoTab === 'vcard' && (
                      <div className="space-y-4 animate-in fade-in duration-300 text-center">
                        <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-neutral-900">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-neutral-950">Aarav Singhania</div>
                          <div className="text-[11px] text-neutral-500">Founder & Managing Director</div>
                        </div>

                        <button className="w-full py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
                          <UserCheck className="w-4 h-4" />
                          <span>Save Contact to Phone</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold text-neutral-800">
                            WhatsApp
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold text-neutral-800">
                            LinkedIn
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scenario 4: Socials */}
                    {activeDemoTab === 'socials' && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="text-center">
                          <div className="font-bold text-sm text-neutral-950">Follow @abccafe</div>
                          <div className="text-[10px] text-neutral-500">Official Social Media Directory</div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 flex items-center justify-between font-semibold text-purple-900">
                            <span>Instagram (@abccafe)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between font-semibold text-red-900">
                            <span>YouTube Channel</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between font-semibold text-blue-900">
                            <span>Facebook Community</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scenario 5: Booking */}
                    {activeDemoTab === 'booking' && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="text-center">
                          <div className="font-bold text-sm text-neutral-950">Schedule an Appointment</div>
                          <div className="text-[10px] text-neutral-500">Pick a convenient date & time</div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                          <div className="p-2 rounded-xl bg-neutral-900 text-white font-bold">11:00 AM</div>
                          <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200">1:30 PM</div>
                          <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200">4:00 PM</div>
                        </div>

                        <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs">
                          Confirm Booking
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mobile Footer Indicator */}
                  <div className="text-center pt-2 border-t border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400">Powered by TapStars Edge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCT SHOWCASE: PHYSICAL HARDWARE */}
      <section id="products" className="py-20 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>Genuine Physical NFC Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              Engineered for Thousands of Daily Taps
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Every TapStars card is crafted from high-durability waterproof PVC with integrated NTAG213/215 microchips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Product Card 1: Official Google Review Smart Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Flagship Product
                  </span>
                  <span className="font-mono text-xs text-neutral-400">Dual NFC + QR</span>
                </div>

                <div className="rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200/60">
                  <img
                    src="/images/nfc-card-front-back.jpg"
                    alt="TapStars Front and Back Dual Google Review NFC Card"
                    className="w-full h-64 object-contain p-4"
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-950">
                  TapStars Google Review NFC Card (White Edition)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  The industry-standard review card featuring the official Google 'G' icon, 5-star rating graphic, and a
                  high-density backup QR code on the back. Perfect for cashier counters, reception desks, and cafe bill
                  folders.
                </p>

                <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Embedded NTAG213/NTAG215 contactless chip</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Double-sided: NFC on front, QR code on back</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Waterproof, matte-finish PVC</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500">Available in Packs</div>
                  <div className="text-sm font-bold text-neutral-900">1-Pack, 3-Pack, 5-Pack & 10-Pack</div>
                </div>
                <a
                  href="#order-cards"
                  className="px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Order White Cards
                </a>
              </div>
            </div>

            {/* Product Card 2: Custom Branded Matte Black NFC Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white">
                    Custom Edition
                  </span>
                  <span className="font-mono text-xs text-neutral-400">Your Brand Logo</span>
                </div>

                <div className="rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200/60">
                  <img
                    src="/images/nfc-custom-black-card.jpg"
                    alt="TapStars Custom Branded Black NFC Card with Company Logo"
                    className="w-full h-64 object-contain p-4"
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-950">
                  Custom Branded NFC Card (Matte Black / Brand Print)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Tailored to your brand aesthetic. Features your custom logo, bespoke typography, and brand colors on a
                  sleek matte-black PVC finish. Ideal for premium dining, boutique salons, luxury clinics, and real estate.
                </p>

                <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Custom logo engraving and color palette</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Works for any destination (Reviews, Menu, vCard, Socials)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Remotely reprogrammable via TapStars dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500">Corporate & Franchise</div>
                  <div className="text-sm font-bold text-neutral-900">Custom MOQ from 5 Cards</div>
                </div>
                <a
                  href="#order-cards"
                  className="px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Request Custom Card
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 8 BUSINESS SOLUTIONS GRID */}
      <section id="solutions" className="py-20 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Versatile Business Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              One Physical Card. Any Digital Destination.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              TapStars is not limited to reviews. Deploy smart contactless touchpoints across every aspect of your
              business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Google Reviews */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Google Reviews</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Catch customers at the peak moment of satisfaction. Tap skips search results and opens your 5-star review
                form instantly.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Restaurants, Salons, Retail</div>
            </div>

            {/* 2. Restaurant Menus */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Digital Menus</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Replace greasy printed paper menus. Direct diners to interactive food menus with vibrant photography and
                daily specials.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Cafes, Bars, Rooftops</div>
            </div>

            {/* 3. Digital Business Cards */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Smart vCard Contacts</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Never run out of business cards again. 1-tap transfers your full contact card, email, phone, and website
                straight into their phonebook.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Founders, Consultants, Agents</div>
            </div>

            {/* 4. Social Media Hub */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Social Media Connections</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Grow your following on Instagram, YouTube, and LinkedIn by offering patrons a single tap to follow your
                brand.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Boutiques, Fitness, Studios</div>
            </div>

            {/* 5. Catalogues */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Product Lookbooks</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Let in-store shoppers browse your full online inventory, color variants, and technical specs while standing
                in your showroom.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Furniture, Fashion, Electronics</div>
            </div>

            {/* 6. Instant UPI Payments */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Payments & Tipping</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Zero friction payment touchpoints. Route to instant UPI payment apps, Razorpay links, or staff tipping jars
                in one tap.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Valet, Pop-up Stalls, Services</div>
            </div>

            {/* 7. Bookings & Appointments */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Bookings & Calendars</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Eliminate phone tag. Let patrons book their next haircut, dental checkup, or consultation right before they
                walk out the door.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Clinics, Spas, Law Firms</div>
            </div>

            {/* 8. Private Feedback */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-xs space-y-3 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-950 text-base">Direct Customer Feedback</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Capture constructive complaints privately before they hit Google. Direct unhappy customers to management
                resolution forms.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 pt-2">Best for: Hospitality, Hotels, Healthcare</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DASHBOARD & ANALYTICS SHOWCASE */}
      <section className="py-20 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Real-Time Business Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              The Software Layer Behind Every Card
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Physical cards are just the touchpoint. Your TapStars dashboard gives you real-time visibility and control
              over every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Highlights */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
                <div className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-blue-600 rotate-90" />
                  <span>Contactless Tap & QR Volume</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Track every card tap and backup QR scan across all your counters, tables, and staff members with clear
                  daily and monthly trends.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
                <div className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Remote Destination Switching</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Change redirect URLs on the fly. Switch between direct Google Reviews and a full digital profile in one
                  click without touching the card.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
                <div className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Google Reputation Health</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Monitor verified Google ratings, review counts, star distribution, and unanswered reviews requiring owner
                  attention.
                </p>
              </div>
            </div>

            {/* Right Live Dashboard Preview Tile */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase">Live Client Portal</div>
                  <div className="font-bold text-base text-neutral-950">ABC Cafe & Roastery Dashboard</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  GROWTH PLAN ACTIVE
                </span>
              </div>

              {/* Sample KPI Tiles */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-[11px] text-neutral-500 font-medium">Total NFC Taps</div>
                  <div className="text-xl font-bold text-neutral-950 mt-1">526</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+24% vs last mo</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-[11px] text-neutral-500 font-medium">QR Scans</div>
                  <div className="text-xl font-bold text-neutral-950 mt-1">130</div>
                  <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Backup Scans</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-[11px] text-neutral-500 font-medium">Google Rating</div>
                  <div className="text-xl font-bold text-neutral-950 mt-1">4.9 ★</div>
                  <div className="text-[10px] text-amber-600 font-semibold mt-0.5">148 Reviews</div>
                </div>
              </div>

              {/* Sample Card Row */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-mono text-xs">
                    #1
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900">Cash Counter Card</div>
                    <div className="font-mono text-[10px] text-neutral-500">tapstars.pages.dev/t/card-001</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-900">342 taps</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>Experience the Full Dashboard Live</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 bg-white border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600">
              Everything you need to know about TapStars smart contactless technology.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-neutral-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-neutral-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ORDER INQUIRY / CONVERSION SECTION */}
      <section id="order-cards" className="py-20 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-3 text-center sm:text-left">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
                Get Started Today
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Order Your TapStars Smart Cards
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
                Equip your business with contactless Google Review cards or custom branded NFC stands. Fast shipping
                across India and pre-configured for your business.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-white/10 rounded-2xl border border-white/20 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold">Inquiry Received!</h3>
                <p className="text-xs text-neutral-300">
                  Our TapStars representative will contact you via WhatsApp / phone to confirm your Google Business link
                  and dispatch your cards.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="relative z-10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Business or Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. ABC Cafe / Rohan Mehta"
                      className="w-full text-xs bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full text-xs bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Select Hardware Package
                  </label>
                  <select
                    value={inquiryProduct}
                    onChange={(e) => setInquiryProduct(e.target.value)}
                    className="w-full text-xs bg-neutral-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  >
                    <option value="Google Review Card (Starter 1-Card)">
                      Google Review Card (Starter 1-Card) — Standard White Edition
                    </option>
                    <option value="Google Review Card (Pack of 3)">
                      Google Review Card (Popular 3-Pack) — Cashier + 2 Tables
                    </option>
                    <option value="Custom Branded NFC Card (Matte Black)">
                      Custom Branded NFC Card (Matte Black with Custom Logo)
                    </option>
                    <option value="Full Restaurant Menu NFC Standee">
                      Restaurant Menu / vCard Contactless Desk Standee
                    </option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-md"
                  >
                    Submit Order Request
                  </button>

                  <a
                    href="https://wa.me/919820012345?text=Hi%20TapStars,%20I%20am%20interested%20in%20ordering%20NFC%20Google%20Review%20cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors border border-white/15 text-center flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick Order on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
