# 🗄️ TapStars — Database Setup Guide (Supabase PostgreSQL)

This guide takes you step-by-step through setting up your free PostgreSQL database and authentication for TapStars using Supabase. No coding or database experience is required.

---

## 1. Create Your Free Supabase Account & Project

1. Visit [https://supabase.com](https://supabase.com) and click **"Start your project"** (Sign up using your GitHub or Google account).
2. On your Supabase dashboard, click the green **"New Project"** button.
3. Choose your Organization, and enter:
   - **Name**: `tapstars`
   - **Database Password**: Choose a strong password and save it in your password manager.
   - **Region**: Choose the region closest to your customers (e.g., `South Asia (Mumbai)` or `East US`).
   - **Pricing Plan**: Free (₹0/month).
4. Click **"Create new project"**. It will take about 1–2 minutes to provision your database.

---

## 2. Execute Database Schema (Tables & Row Level Security)

1. In your Supabase project dashboard, look at the left sidebar and click on the **SQL Editor** icon (represented by `>_`).
2. Click **"New Query"** at the top.
3. Open the file `supabase/schema.sql` from your TapStars project folder, copy all of its contents, and paste them into the Supabase SQL Editor.
4. Click the green **"Run"** button (or press `Ctrl + Enter` / `Cmd + Enter`).
5. You will see `Success. No rows returned`.

### What this created:
- `businesses`: Stores business details, slug, Google Review URLs, WhatsApp, and destination modes.
- `nfc_cards`: Stores physical card identifiers (`CARD-ABC-01`), assigned business, tap counters, and location labels.
- `analytics_events`: Logs privacy-compliant contactless taps, profile views, and click interactions.
- **Row Level Security (RLS)**: Enforces that public visitors can only read active public profiles and record clicks, while only authenticated administrators can modify or delete business records.

---

## 3. (Optional) Insert Demo Test Data

If you want three pre-populated test businesses (**ABC Cafe**, **Urban Cuts Studio**, and **Smile Dental Clinic**) in your database right away:

1. In the Supabase **SQL Editor**, click **"New Query"**.
2. Open `supabase/seed.sql`, copy all text, and paste it into the editor.
3. Click **"Run"**.

---

## 4. Obtain Your API Keys

1. In Supabase, click the **Settings gear icon (⚙️)** at the bottom of the left sidebar.
2. Select **API** under Configuration.
3. Locate:
   - **Project URL**: (e.g., `https://abcdefghijkl.supabase.co`)
   - **Project API keys** → `anon` `public`: (A long string starting with `eyJhbGci...`)

---

## 5. Configure Your TapStars App

### For Local Testing:
1. In your project directory, copy `.env.example` to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
   VITE_APP_BASE_URL=https://tapstars.pages.dev
   ```

### For Cloudflare Pages Deployment:
Add these same variables in the Cloudflare Pages Dashboard under **Settings → Environment Variables**.

---

## ⚠️ Important Note on Free Tier Maintenance

Supabase's free tier automatically pauses projects that have had zero database queries for over 7 consecutive days. 
- During development and initial customer testing, this is completely fine: if it ever pauses, you can simply click "Restore project" in the Supabase dashboard.
- Once you onboard paying commercial clients, you can either keep the database active with an automated ping, or upgrade to Supabase Pro ($25/mo) when your monthly card sales revenue covers it.
