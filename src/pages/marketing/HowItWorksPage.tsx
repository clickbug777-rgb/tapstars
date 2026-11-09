import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wifi,
  QrCode,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-blue-600" />
            <span>Contactless Architecture Guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            How TapStars Contactless Technology Works
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Near Field Communication (NFC) explained in plain, everyday language &mdash; and why it transforms physical
            customer interactions.
          </p>
        </div>
      </section>

      {/* Step by Step Visual Guide */}
      <section className="py-16 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <span className="w-14 h-14 rounded-2xl bg-neutral-950 text-white font-mono font-bold text-xl flex items-center justify-center mx-auto md:mx-0 shadow-xs">
                  01
                </span>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-neutral-950">Place or Hand the Card to Your Customer</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Your TapStars card is positioned at checkout counters, presented in cafe bill folders, displayed on
                  dining tables, or handed out during corporate meetings. Zero cables, batteries, or pairing needed.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <span className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-mono font-bold text-xl flex items-center justify-center mx-auto md:mx-0 shadow-xs">
                  02
                </span>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-neutral-950">Customer Brings Their Phone Within 2–4 cm</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  The smartphone’s passive NFC antenna generates a subtle electromagnetic field that instantly energizes
                  the microchip embedded in the card. No contact or pressing required — a gentle hover triggers the read.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <span className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-mono font-bold text-xl flex items-center justify-center mx-auto md:mx-0 shadow-xs">
                  03
                </span>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-neutral-950">
                  Instant Native Notification Opens Your Destination
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  The phone screen automatically displays a native banner. Tapping it opens your configured destination
                  (Google Review, menu, vCard, or booking form) in less than 300 milliseconds. No app installation needed.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <span className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-mono font-bold text-xl flex items-center justify-center mx-auto md:mx-0 shadow-xs">
                  04
                </span>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-neutral-950">Real-Time Cloudflare Edge Analytics</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Every tap passes through TapStars’ global Cloudflare edge network, logging device type, timestamp, and
                  location anonymously before redirecting. You view aggregate customer engagement in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFC Contactless vs QR Code Comparison */}
      <section className="py-20 bg-white border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">NFC Contactless vs. QR Code Scanning</h2>
            <p className="text-sm text-neutral-600">
              Why TapStars includes both technologies on every single card for 100% customer coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NFC Column */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Wifi className="w-5 h-5 rotate-90" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-950">NFC (Near Field Communication)</h3>
                  <span className="text-xs font-semibold text-blue-600 font-mono">Primary Interaction</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                The modern standard used by Apple Pay, Google Wallet, and contactless credit cards. Zero camera opening
                required &mdash; just touch the phone to the card.
              </p>

              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fastest possible interaction (&lt; 0.2 seconds)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Works in pitch-dark rooms or low-light restaurants</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No need to open the camera app or focus a lens</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Built natively into iPhone XS+ and modern Androids</span>
                </li>
              </ul>
            </div>

            {/* QR Column */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-950">QR Code (Printed on Back)</h3>
                  <span className="text-xs font-semibold text-purple-600 font-mono">100% Universal Backup</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                Printed on the back of every TapStars card. If a patron has an older phone or has NFC toggled off in
                settings, they simply scan the back QR code.
              </p>

              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Universal fallback for 100% phone compatibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scannable with any standard smartphone camera</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Routes to the exact same Cloudflare edge destination</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Separately tracked on your dashboard as "QR Scan"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Compatibility Matrix */}
      <section className="py-20 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Device Compatibility Matrix</h2>
            <p className="text-sm text-neutral-600">Over 98% of active smartphones in India support TapStars natively.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-950 text-base">Apple iPhone (iOS)</h3>
              <p className="text-xs text-neutral-600">
                All iPhones running iOS 14 or newer have Background NFC Tag Reading enabled 24/7 automatically without
                opening any app.
              </p>
              <div className="text-xs font-mono text-neutral-800 space-y-1">
                <div>• iPhone 16 / 16 Pro / 16 Max (Instant)</div>
                <div>• iPhone 15 / 15 Pro / 15 Plus (Instant)</div>
                <div>• iPhone 14 / 13 / 12 / 11 / XS / XR (Instant)</div>
                <div>• iPhone 7 / 8 / X (Via Control Center NFC)</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-950 text-base">Android (Samsung, Pixel, OnePlus, Xiaomi)</h3>
              <p className="text-xs text-neutral-600">
                Almost all modern Android smartphones manufactured after 2018 have NFC enabled in system settings (same
                as Google Pay / contactless UPI).
              </p>
              <div className="text-xs font-mono text-neutral-800 space-y-1">
                <div>• Samsung Galaxy S-Series, Z-Fold, A-Series</div>
                <div>• Google Pixel 3 through Pixel 9 Pro</div>
                <div>• OnePlus 6 through OnePlus 13</div>
                <div>• Xiaomi / Vivo / Oppo with NFC enabled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Experience It In Your Own Business</h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Order your pre-configured starter pack today and begin collecting customer interactions immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Order Smart NFC Cards
            </Link>
            <Link
              to="/"
              className="px-6 py-3.5 rounded-2xl bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
