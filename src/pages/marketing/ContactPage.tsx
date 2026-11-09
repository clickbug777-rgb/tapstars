import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MessageCircle,
  CheckCircle2,
  Send,
  Clock,
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [cardType, setCardType] = useState('Google Review Card (White)');
  const [quantity, setQuantity] = useState('3 Cards (Most Popular)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold">
            <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Order & Business Inquiries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            Order Your TapStars Cards
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Ready to upgrade your counters? Submit an order request below or connect directly with our team on WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Order & Contact Grid */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Options */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-neutral-950 text-white shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
                    Instant Chat
                  </span>
                  <h3 className="text-2xl font-bold mt-1">Prefer WhatsApp?</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Message us directly to send your logo, confirm your Google review destination, and track your
                    shipment in real-time.
                  </p>
                </div>

                <a
                  href="https://wa.me/919820012345?text=Hi%20TapStars,%20I%20would%20like%20to%20order%20smart%20NFC%20cards%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp (+91 98200 12345)</span>
                </a>
              </div>

              {/* Direct Info */}
              <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
                <h4 className="font-bold text-neutral-950 text-sm">Direct Contact Channels</h4>

                <div className="space-y-3 text-xs text-neutral-600">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Email Inquiries</div>
                      <a href="mailto:support@tapstars.dev" className="text-blue-600 hover:underline">
                        support@tapstars.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Phone Support</div>
                      <span className="text-neutral-700 font-mono">+91 98200 12345 (Mon–Sat, 10 AM – 7 PM)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Dispatch Timeline</div>
                      <span className="text-neutral-700">Cards dispatched within 24–48 hours across India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Order Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950">Thank You, {name}!</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    We have received your order inquiry for <strong>{quantity}</strong> of{' '}
                    <strong>{cardType}</strong>. Our team will contact your WhatsApp at{' '}
                    <span className="font-mono text-neutral-900 font-semibold">{phone}</span> to confirm your Google
                    Review link and dispatch details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-950">Card Order & Inquiry Form</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Fill out your business requirements. No immediate payment required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rohan Mehta"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="ABC Cafe & Roastery"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Work Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@abccafe.in"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Select Hardware Type</label>
                      <select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 font-semibold"
                      >
                        <option value="Google Review Card (White)">Google Review Card (White Edition)</option>
                        <option value="Custom Branded NFC Card (Matte Black)">
                          Custom Branded NFC Card (Matte Black)
                        </option>
                        <option value="Restaurant Menu NFC Standee">Restaurant Menu Desk Standee</option>
                        <option value="Digital Business Card (vCard)">Executive Digital Business Card</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Select Quantity</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 font-semibold"
                      >
                        <option value="Single Card (Starter)">Single Card (Starter Test)</option>
                        <option value="3 Cards (Most Popular)">3 Cards (Popular — Cashier + 2 Tables)</option>
                        <option value="5 Cards (Value Pack)">5 Cards (Value Pack)</option>
                        <option value="10 Cards (Multi-Counter)">10 Cards (Multi-Counter / Franchise)</option>
                        <option value="Bulk 20+ Enterprise">Bulk 20+ Enterprise Setup</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Google Maps / Review Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="https://g.page/r/your-google-review-link"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      />
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        If you don't have it handy, our team will assist you in locating your exact Place ID.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Order Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
