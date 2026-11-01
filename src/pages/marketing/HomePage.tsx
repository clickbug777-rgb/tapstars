import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Star,
  Wifi,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  Share2,
  Clock,
  ExternalLink,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { NfcCardPreview } from '../../components/cards/NfcCardPreview';
import { useData } from '../../context/DataContext';

export const HomePage: React.FC = () => {
  const { businesses } = useData();
  const navigate = useNavigate();
  const sampleBusiness = businesses[0] || {
    name: 'ABC Cafe & Roastery',
    slug: 'abc-cafe',
    category: 'Restaurant & Cafe',
    logo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderBiz, setOrderBiz] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('5');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How does an NFC card work for my customers?',
      a: 'NFC (Near Field Communication) is the same contactless technology used by Apple Pay and contactless credit cards. Customers simply bring the top of their iPhone or Android phone within 2–4 cm of your card. A popup banner appears instantly on their screen taking them straight to your Google Review page or digital business profile. No app download is required.',
    },
    {
      q: 'What happens if we move location or change our Google Review link?',
      a: 'This is the core strength of TapStars. Your physical cards are permanently encoded with your unique TapStars URL (e.g. tapstars.pages.dev/r/your-business). If you update your Google Review URL, change your address, or switch between direct review and digital profile mode, you simply update it from the dashboard. Your physical cards continue to work forever without being rewritten.',
    },
    {
      q: 'Do customers need to download an app?',
      a: 'No. Both iOS (iPhone 7 and newer) and modern Android smartphones have native NFC readers built directly into the operating system. Tapping the card triggers the browser automatically.',
    },
    {
      q: 'What if a customer has an older phone without NFC?',
      a: 'Every TapStars NFC card also features a custom-designed high-resolution QR code on the back. Customers can simply point their phone camera at the QR code to open the exact same destination.',
    },
    {
      q: 'What NFC chips are supported?',
      a: 'TapStars works with standard NTAG213, NTAG215, and NTAG216 NFC chips and cards. You can easily program them using the free NFC Tools application on any iPhone or Android phone.',
    },
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col antialiased">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Soft subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 via-neutral-50/30 to-transparent pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Gen NFC Business Presence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
                Make Every Customer Connection Count.
              </h1>

              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                One tap connects your customers to everything your business offers. Collect 5-star Google reviews,
                share contacts, social profiles, and WhatsApp — powered by permanent smart cards you control from a
                single dashboard.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Get Started with TapStars</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200/90 rounded-full shadow-2xs transition-all"
                >
                  See How It Works
                </a>
              </div>

              {/* Value Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-neutral-100 text-left">
                <div>
                  <div className="text-lg font-bold text-neutral-900">1 Tap</div>
                  <div className="text-xs text-neutral-500">Instant connection</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">100%</div>
                  <div className="text-xs text-neutral-500">Reprogram-free</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">₹0</div>
                  <div className="text-xs text-neutral-500">Hosting & domain cost</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D NFC Card Demo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-neutral-100/70 border border-neutral-200/80 shadow-inner flex flex-col items-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                  Interactive NFC Card Preview
                </div>

                <NfcCardPreview
                  businessName={sampleBusiness.name}
                  category={sampleBusiness.category}
                  slug={sampleBusiness.slug}
                  cardUid="CARD-ABC-01"
                  logoUrl={sampleBusiness.logo_url}
                  theme="dark"
                />

                <div className="mt-6 flex items-center justify-center gap-4 text-xs">
                  <Link
                    to={`/r/${sampleBusiness.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
                  >
                    <span>Test NFC Tap Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-neutral-300">•</span>
                  <Link
                    to={`/p/${sampleBusiness.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
                  >
                    <span>View Digital Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW NFC WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-neutral-50/70 border-y border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-400">
              The Architecture
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              How TapStars Technology Works
            </p>
            <p className="text-neutral-600 text-sm sm:text-base">
              A permanent digital link between physical smart cards and your customizable cloud dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  1
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Customer Taps Physical Card</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Your customer brings their phone near your TapStars card or scans the QR code. The chip broadcasts
                  your permanent URL: <span className="font-mono text-xs text-neutral-900">tapstars.pages.dev/r/your-biz</span>.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400">
                <Wifi className="w-4 h-4 text-blue-500 rotate-90" />
                <span>Zero app install needed</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  2
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Edge Routing & Event Log</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Cloudflare Pages Functions instantly look up your business settings, count the tap event in your
                  private analytics, and route the customer in milliseconds.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant sub-50ms redirect</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  3
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Instant Review or Digital Hub</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Customer lands directly on your Google 5-Star review box or your complete mobile profile with
                  vCard contact saving, WhatsApp chat, and booking links.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Maximum customer action</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-400">
              Powerful Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              Engineered for Real-World Business Growth
            </p>
            <p className="text-neutral-600 text-sm sm:text-base">
              Everything local businesses need to turn physical foot traffic into reviews and repeat customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mb-4">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Direct Google 5-Star Review Tap</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Send customers straight to the Google review submission window with one tap at the checkout counter,
                eliminating friction and drastically increasing reviews.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Apple-Grade Digital Business Profile</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                A sleek, responsive mobile landing page showcasing all your links, contact numbers, hours,
                directions, and social accounts in a clean Apple-inspired layout.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Save Contact (.vcf vCard)</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Allows customers to download and save your complete business contact information directly into their
                iPhone or Android Contacts app with a single click.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 border border-neutral-200 flex items-center justify-center mb-4">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Dynamic QR Code Generation</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Instant high-resolution QR codes downloadable in PNG and SVG, plus ready-to-print stand templates for
                acrylic table-top talkers and counter signs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Privacy-First Real Analytics</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Track true customer engagement: NFC taps, QR scans, profile visits, call clicks, and WhatsApp
                inquiries without tracking invasive personal data or recording bot traffic.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-neutral-400/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1.5">Multi-Card & Table Management</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Assign multiple NFC cards to one business (e.g., Table 1, Table 2, Reception, Takeaway Counter) and
                see which locations generate the highest customer action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PROFILE DEMO PREVIEW SECTION */}
      <section id="demo" className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customer Experience Preview</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                What Customers Experience When They Tap.
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                When set to Digital Profile mode, customers view a fast, mobile-optimized hub styled to match Apple's
                clean design guidelines.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Instant 1-Click WhatsApp Chat with prefilled greetings</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Direct phone calling and Google Maps turn-by-turn directions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>One-click vCard download to save business directly in phone contacts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Custom buttons for Restaurant Menus, Online Booking, or Catalogs</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to={`/p/${sampleBusiness.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-all shadow-md"
                >
                  <span>Open Sample Profile in New Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Realistic Phone Mockup Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[320px] rounded-[42px] p-3.5 bg-neutral-800 border-4 border-neutral-700 shadow-2xl relative">
                {/* Speaker notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20"></div>

                {/* Inner Screen */}
                <div className="w-full bg-white rounded-[32px] overflow-hidden text-neutral-900 text-xs shadow-inner">
                  {/* Banner */}
                  <div className="h-28 bg-gradient-to-br from-neutral-800 to-neutral-900 relative">
                    <img
                      src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
                      alt="Banner"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>

                  <div className="px-4 pb-6 -mt-10 relative space-y-3">
                    <div className="w-16 h-16 rounded-2xl border-2 border-white overflow-hidden shadow-md bg-white">
                      <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80"
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">ABC Cafe & Roastery</h4>
                      <p className="text-[10px] text-neutral-500">Restaurant & Cafe • Downtown</p>
                    </div>

                    {/* Quick action grid */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="p-2 rounded-xl bg-neutral-100 text-center font-medium">
                        <PhoneCall className="w-3.5 h-3.5 mx-auto mb-1 text-neutral-700" />
                        Call
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-center font-medium">
                        <MessageCircle className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-600" />
                        WhatsApp
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-800 text-center font-medium">
                        <Star className="w-3.5 h-3.5 mx-auto mb-1 text-amber-600 fill-amber-500" />
                        Review
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-1.5 pt-1">
                      <div className="w-full py-2 bg-neutral-900 text-white rounded-xl text-center font-semibold">
                        Save to Contacts
                      </div>
                      <div className="w-full py-2 bg-neutral-100 text-neutral-800 rounded-xl text-center font-medium">
                        View Brunch Menu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section id="industries" className="py-20 bg-neutral-50/70 border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-400">
              Built For Every Industry
            </h2>
            <p className="text-3xl font-bold tracking-tight text-neutral-950">
              Transforming Customer Touchpoints
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            {[
              { title: 'Cafes & Restaurants', desc: 'Place on tables or checkout to gain 5-star reviews upon bill payment.' },
              { title: 'Salons & Spas', desc: 'Allow clients to rebook online or follow Instagram before leaving.' },
              { title: 'Clinics & Dentists', desc: 'Direct patients to leave verified Google reviews and download emergency contacts.' },
              { title: 'Retail Stores', desc: 'Connect shoppers to your WhatsApp concierge and seasonal catalog.' },
              { title: 'Hotels & Resorts', desc: 'Concierge cards with room service menus, WiFi logins, and TripAdvisor ratings.' },
              { title: 'Fitness & Gyms', desc: 'Instant Google review tap at check-in or booking trial sessions.' },
              { title: 'Real Estate Agents', desc: 'Modern contactless business cards sharing current active property listings.' },
              { title: 'Auto Detailing & Garages', desc: 'Collect glowing reviews when customers pick up their serviced vehicles.' },
            ].map((ind, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs text-left">
                <h4 className="font-bold text-neutral-900 text-sm mb-1">{ind.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-400">Common Questions</h2>
            <p className="text-3xl font-bold text-neutral-950">Frequently Asked Questions</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-semibold text-neutral-900 text-sm flex items-center justify-between gap-4 hover:bg-neutral-50/50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT & ORDER SECTION */}
      <section id="contact" className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 shadow-2xl">
            <div className="max-w-xl mx-auto text-center space-y-3 mb-8">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
                Get TapStars for Your Business
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Start Collecting More Reviews Today.
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Inquire about custom-branded TapStars NFC cards, counter stands, and digital setup for your local
                business.
              </p>
            </div>

            {orderSubmitted ? (
              <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Thank you, {orderName}. Our TapStars specialist will reach out to {orderEmail} shortly with your
                  custom card samples and onboarding setup.
                </p>
                <button
                  onClick={() => setOrderSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs text-neutral-400 hover:text-white underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={orderBiz}
                      onChange={(e) => setOrderBiz(e.target.value)}
                      placeholder="e.g. Acme Coffee"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      placeholder="jane@acmecoffee.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Estimated NFC Cards</label>
                    <select
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1 Card (Starter)</option>
                      <option value="5">5 Cards (Counter + Tables)</option>
                      <option value="15">15 Cards (Full Venue)</option>
                      <option value="50">50+ Cards (Franchise / Multi-Location)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-all shadow-md mt-2"
                >
                  Request TapStars Onboarding & Pricing
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
