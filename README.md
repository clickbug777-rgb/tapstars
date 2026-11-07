# 🌟 TapStars — Enterprise Multi-Tenant SaaS Platform

> **One Tap. Your Entire Business Reputation.**  
> A high-performance, edge-accelerated contactless NFC & QR reputation management SaaS for local businesses.

---

## 🎯 Platform Architecture

TapStars is built as three interconnected experiences powered by **Cloudflare Pages edge functions** and **Supabase PostgreSQL with Row Level Security (RLS)**:

```
                                  TapStars Platform
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  Public Experience               Client Dashboard                 Admin Workspace
  - Marketing Website             - Overview (6 KPIs)              - Multi-Business Management
  - Digital Profiles (/p/:slug)   - NFC Analytics                  - NFC Card Provisioning
  - High-Speed Redirects          - QR Analytics                   - Subscription Revenue (₹ INR)
    • /t/:cardUid (Direct Edge)   - Card Location Tracking         - Platform Volume Charts
    • /q/:cardUid (QR Scan)       - Google Reputation Sync         - Cloudflare & Supabase Edge Status
    • /r/:slug (Legacy Cards)     - Monthly Reports & CSV Export
                                  - Business Profile Routing
                                  - Subscription Management
```

---

## ⚡ Edge NFC & QR Tracking Architecture (Zero Delay)

Every physical NFC card and printed QR code is assigned a permanent tracking identity:

| URL Pattern | Purpose | Edge Handling |
| :--- | :--- | :--- |
| `https://tapstars.pages.dev/t/:cardUid` | **Primary NFC Card Tap** | Edge function `/functions/t/[cardUid].ts` resolves card & business, logs `nfc_tap` asynchronously via `context.waitUntil()`, increments counter, and issues instant HTTP 302 redirect. |
| `https://tapstars.pages.dev/t/:cardUid?qr=1` | **QR Code Scan** | Logged as `qr_scan` event for comparison analytics without redirect lag. |
| `https://tapstars.pages.dev/q/:cardUid` | **Dedicated QR Route** | Redirects to `/t/:cardUid?qr=1`. |
| `https://tapstars.pages.dev/r/:slug` | **Legacy NFC Cards** | Backward-compatible support for pre-programmed cards using business slug. |

### Bot & Crawler Filtering
Edge functions automatically detect and filter crawlers (WhatsApp preview, Telegram bot, Googlebot, etc.) to ensure analytics reflect genuine human customer interactions.

---

## 🔐 Role-Based Access & Security (RLS)

- **Super Admin (`super_admin` / `admin`)**: Full platform control, card provisioning, business onboarding, and subscription management (`/admin`).
- **Client Owner (`client`)**: Access strictly limited to their own business metrics, assigned cards, reviews, and reports (`/dashboard`).
- **Row Level Security (RLS)**: Database queries are filtered at PostgreSQL engine level. One business cannot read another business's data.

---

## 🚀 Quick Start & Local Development

```bash
# Clone the repository
git clone https://github.com/clickbug777-rgb/tapstars.git
cd tapstars

# Install dependencies
npm install

# Start development server
npm run dev

# Run production type-check & build
npm run build

# Preview build locally
npm run preview
```

### 1-Click Role Switcher (Demo Mode)
If Supabase environment variables are omitted, TapStars runs in an offline demo mode with pre-seeded test data:
- **Client Demo**: Click *"Client Dashboard (ABC Cafe Owner)"* on the `/login` screen.
- **Admin Demo**: Click *"Admin Dashboard (TapStars Platform)"* on the `/login` screen.

---

## 🗄️ Database Migrations

Run the SQL migration in your Supabase SQL editor:
1. `supabase/migrations/20261107_saas_upgrade.sql`: Creates `profiles`, `businesses`, `business_members`, `nfc_cards`, `tracking_events`, `google_profiles`, and `subscriptions` with full RLS policies.
2. `supabase/seed_v2.sql`: Seeds multi-tenant demo businesses, assigned cards, Google reviews, and subscriptions.

---

## ☁️ Cloudflare Pages Deployment Guide

1. Push your repository to GitHub (`clickbug777-rgb/tapstars`).
2. Go to **Cloudflare Dashboard** &rarr; **Compute (Workers & Pages)** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
3. Select your repository `tapstars`.
4. Configure Build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Set Environment Variables:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGci...`
   - `VITE_APP_BASE_URL`: `https://tapstars.pages.dev`
   - `SUPABASE_URL`: Same as `VITE_SUPABASE_URL`
   - `SUPABASE_ANON_KEY`: Same as `VITE_SUPABASE_ANON_KEY`
6. Click **Save and Deploy**.

---

## 📊 Subscription Plans

| Tier | Price (INR) | NFC Cards | Features |
| :--- | :--- | :--- | :--- |
| **Starter** | Free | 1 Card | Basic tap counting, permanent URL redirect |
| **Growth** | ₹199 / mo | Up to 3 Cards | Device breakdown, QR backup studio, review tracking |
| **Premium** | ₹499 / mo | Up to 10 Cards | Location counters, executive printable reports, CSV export |
| **Business Pro** | ₹999 / mo | Unlimited | Multi-location franchise management, priority edge routing |

---

## 📜 License
MIT © TapStars Platform
