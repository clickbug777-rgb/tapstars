import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>Hardware Catalog & Specifications</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            Smart Physical NFC Hardware
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Industrial-grade contactless cards and stands built for high-traffic retail, hospitality, and corporate
            environments.
          </p>
        </div>
      </section>

      {/* Product 1: White Google Review Card */}
      <section className="py-16 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Showcase */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-sm flex items-center justify-center">
              <img
                src="/images/nfc-card-front-back.jpg"
                alt="TapStars Official Google Review NFC Card Front and Back"
                className="w-full max-w-md h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Product Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>Most Popular Initial Offering</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
                TapStars Google Review NFC Card (White Edition)
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Our flagship card designed to turn in-person customer delight into published 5-star Google reviews.
                Features the universally recognized Google 'G' icon, 5-star rating graphic, and an integrated contactless
                NFC chip. The back features a laser-sharp QR code for 100% device compatibility.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <div className="font-bold text-neutral-900">Front Design</div>
                  <div className="text-neutral-500 mt-0.5">Google 'G' + 5 Stars + Contactless Wave</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <div className="font-bold text-neutral-900">Back Design</div>
                  <div className="text-neutral-500 mt-0.5">High-Density QR Code Fallback</div>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pre-linked to your Google Business Profile before delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Remotely reconfigurable anytime via your TapStars dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Durable, waterproof, credit-card thickness (0.84mm)</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  <span>Order White Review Cards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product 2: Custom Branded Matte Black Card */}
      <section className="py-16 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Product Details */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-xs font-bold border border-neutral-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Bespoke Corporate Identity</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
                Custom Branded NFC Card (Matte Black Edition)
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Elevate your brand presence. Featuring an ultra-luxurious matte black PVC finish with your custom company
                logo, bespoke typography, and corporate styling. Perfect for upscale restaurants, salons, boutique hotels,
                and corporate executive business cards.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <div className="font-bold text-neutral-900">Custom Branding</div>
                  <div className="text-neutral-500 mt-0.5">High-Resolution Vector Logo Print</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <div className="font-bold text-neutral-900">Any Destination</div>
                  <div className="text-neutral-500 mt-0.5">Reviews, Menu, vCard, Socials, Payments</div>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Custom colorway, foil stamping, or matte monochrome</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dual NFC + Custom branded QR code on back</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Minimum order quantity from just 5 cards</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  <span>Request Custom Logo Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Image Showcase */}
            <div className="lg:col-span-6 bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-sm flex items-center justify-center order-1 lg:order-2">
              <img
                src="/images/nfc-custom-black-card.jpg"
                alt="TapStars Custom Branded Matte Black NFC Card"
                className="w-full max-w-md h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="py-20 bg-[#fafafa] border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
              Technical Hardware Specifications
            </h2>
            <p className="text-sm text-neutral-600">
              All TapStars products meet strict international contactless standards.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50 w-1/3">Microchip Type</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">NTAG213 / NTAG215 (NXP Semiconductors)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Operating Frequency</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">13.56 MHz (High Frequency RFID/NFC)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">International Standard</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">ISO/IEC 14443 Type A, NFC Forum Type 2</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Contactless Range</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">2 cm to 4 cm (Instant touch proximity)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Data Retention & Cycles</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">10+ Years retention • 100,000+ Read/Write cycles</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Card Material & Dimensions</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">CR80 (85.6mm × 54mm × 0.84mm) Waterproof PVC</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Power Requirements</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">100% Passive (Zero batteries or charging needed)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-neutral-900 bg-neutral-50/50">Operating Temperature</td>
                  <td className="py-4 px-6 text-neutral-700 font-mono">-25°C to +70°C (Weatherproof & heat-resistant)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
            Ready to Equip Your Business Counters?
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Order standard white Google Review cards or request bespoke branding for your franchise location.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Order Cards Now
            </Link>
            <Link
              to="/solutions"
              className="px-6 py-3.5 rounded-2xl bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
            >
              View Digital Solutions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
