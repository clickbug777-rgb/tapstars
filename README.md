# 🌟 TapStars — One Tap. Your Entire Business.

> Complete, production-grade NFC & QR Digital Business Presence Platform. Free-tier deployable to Cloudflare Pages & Supabase PostgreSQL with ₹0 monthly overhead.

---

## 💡 What is TapStars?

**TapStars** is a self-hosted SaaS platform that enables you to sell physical contactless NFC cards and smart stands to local businesses (restaurants, salons, clinics, retail shops, gyms, real estate firms).

### The Core Problem Solved:
Normally, writing a Google Review link directly into an NFC chip is risky: if the business moves, changes ownership, or Google updates their link format, the physical card becomes useless.

### The TapStars Solution:
Every business receives a **permanent TapStars URL** (e.g. `tapstars.pages.dev/r/abc-cafe`) programmed into the physical NFC card. You can dynamically switch the destination from your admin dashboard anytime without ever rewriting the physical cards:
- **Mode A (Direct Review)**: Customer taps phone → Immediately redirected to 5-star Google Review box.
- **Mode B (Digital Profile)**: Customer taps phone → Lands on a sleek Apple-inspired mobile business profile with WhatsApp chat, call, vCard contact saving, menus, and directions.

---

## 🛠️ Technology Stack (100% Free Tier Deployable)

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, React Router 7.
- **Analytics & Visualizations**: Recharts, QRCode generator with SVG/PNG/Print export.
- **Edge Backend**: Cloudflare Pages Functions (`/r/:slug` edge redirect & bot filtering).
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS).
- **Hosting**: Cloudflare Pages on free `pages.dev` subdomain with ₹0 cost.
- **Code Repository**: GitHub for automated CI/CD edge deployment.

---

## 📁 Project Structure

```text
tapstars/
├── functions/                    # Cloudflare Pages Serverless Edge Functions
│   ├── r/
│   │   └── [slug].ts             # Instant edge NFC redirect & analytics logger
│   └── api/
│       └── analytics.ts          # Public telemetry collector
├── public/
│   ├── _redirects                # Cloudflare Pages SPA rewrite rules
│   ├── favicon.svg               # SVG brand favicon
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── admin/                # Admin sidebar, header, stats card, layout
│   │   ├── business/             # Business CRUD modal & forms
│   │   ├── cards/                # 3D interactive NFC card preview & card modal
│   │   ├── common/               # Navbar, footer, social icons
│   │   └── qr/                   # QR code modal & print-ready stand generator
│   ├── context/
│   │   ├── AuthContext.tsx       # Supabase auth + Demo Admin quick-start
│   │   └── DataContext.tsx       # Unified client businesses & NFC cards data layer
│   ├── lib/
│   │   ├── config.ts             # Central permanent URL configuration
│   │   ├── demoData.ts           # Demo businesses (ABC Cafe, Urban Cuts, Smile Dental)
│   │   ├── supabase.ts           # Supabase client with graceful fallback
│   │   ├── utils.ts              # URL validator, slugifier, bot detector
│   │   └── vcard.ts              # Apple & Android .vcf contact card generator
│   ├── pages/
│   │   ├── admin/                # Overview, Businesses, NFC Cards, QR Studio, Analytics, Settings
│   │   ├── auth/                 # Admin Login page
│   │   ├── marketing/            # Apple-style high-converting Landing Page
│   │   └── public/               # /p/:slug (Digital Profile) & /r/:slug (NFC Redirect)
│   ├── types/
│   │   └── index.ts              # Comprehensive TypeScript interfaces
│   ├── App.tsx                   # Client routes & providers
│   ├── index.css                 # Apple typography & Tailwind styling
│   └── main.tsx
├── supabase/
│   ├── schema.sql                # Complete PostgreSQL RLS migrations
│   └── seed.sql                  # Fictional demo seed data
├── .env.example                  # Environment configuration template
├── DATABASE_SETUP.md             # Beginner guide for Supabase setup
├── DEPLOYMENT.md                 # Step-by-step Cloudflare Pages deployment guide
└── SECURITY.md                   # Security audit & open-redirect safeguards
```

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Explore Pre-built Routes
- **Marketing Landing Page**: [http://localhost:5173/](http://localhost:5173/)
- **Sample Business Profile**: [http://localhost:5173/p/abc-cafe](http://localhost:5173/p/abc-cafe)
- **NFC Tap Redirect**: [http://localhost:5173/r/abc-cafe](http://localhost:5173/r/abc-cafe)
- **Admin Sign In**: [http://localhost:5173/login](http://localhost:5173/login) (Click *"Enter Instant Demo Admin"*)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 📦 Production Deployment

For full beginner-friendly deployment instructions without paying for hosting or domains:
- See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for Cloudflare Pages setup.
- See [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) for Supabase database setup.

---

## 📜 License
MIT License. Built for independent entrepreneurs and local business growth.
