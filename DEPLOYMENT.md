# 🚀 TapStars — Complete Free Deployment Guide (Cloudflare Pages + GitHub)

You do **not** need to buy a domain name, purchase hosting, or pay monthly software fees to launch TapStars. This guide walks you through deploying TapStars to Cloudflare's global edge network on a free `pages.dev` subdomain.

---

## Prerequisites (All 100% Free)
1. **GitHub Account**: [https://github.com/signup](https://github.com/signup)
2. **Cloudflare Account**: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
3. **Supabase Account**: [https://supabase.com](https://supabase.com) (refer to `DATABASE_SETUP.md`)

---

## Step 1: Push Your Project to GitHub

1. Open PowerShell or Terminal in your project directory:
   ```bash
   cd C:\TapStars
   ```
2. Initialize git and make your first commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete TapStars SaaS platform release"
   ```
3. Go to [https://github.com/new](https://github.com/new):
   - Repository name: `tapstars`
   - Privacy: **Private** (recommended) or Public
   - Leave "Initialize with README" **unchecked**
   - Click **"Create repository"**
4. Copy the two commands shown on GitHub under **"…or push an existing repository from the command line"**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/tapstars.git
   git push -u origin main
   ```

---

## Step 2: Connect GitHub to Cloudflare Pages

1. Log into your **Cloudflare Dashboard**: [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. On the left sidebar, click **"Compute (Workers & Pages)"** → **"Workers & Pages"**.
3. Click the blue **"Create application"** button.
4. Select the **"Pages"** tab at the top.
5. Click **"Connect to Git"**.
6. Select your GitHub account and authorize Cloudflare.
7. Choose your `tapstars` repository and click **"Begin setup"**.

---

## Step 3: Configure Build & Subdomain

1. **Project Name**: `tapstars`
   > ⚠️ **CRITICAL NOTE**: Your project name directly determines your free website address:  
   > `https://tapstars.pages.dev`  
   > *(If "tapstars" is taken by someone globally, choose a branded variation like `tapstars-app` or `tapstars-nfc`, and update `VITE_APP_BASE_URL` to match).*
2. **Production branch**: `main`
3. **Framework preset**: Select **Vite** from the dropdown.
4. **Build command**: `npm run build`
5. **Build output directory**: `dist`

---

## Step 4: Add Environment Variables

In the same setup screen, expand **"Environment variables (advanced)"** and click **"Add variable"**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Connects frontend to database |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase public key |
| `VITE_APP_BASE_URL` | `https://tapstars.pages.dev` | Base URL encoded on cards |
| `SUPABASE_URL` | `https://your-project.supabase.co` | Pages Functions serverless redirect |
| `SUPABASE_ANON_KEY` | `eyJhbGci...` | Pages Functions serverless auth |

Click **"Save and Deploy"**.

---

## Step 5: Verify Live Deployment

1. Cloudflare will run your build and publish it to the global edge network in ~60 seconds.
2. You will receive your live green URL:
   `https://tapstars.pages.dev`
3. Click the link to view your live marketing website!
4. Test the admin portal at `https://tapstars.pages.dev/login`.
5. Test your sample profile at `https://tapstars.pages.dev/p/abc-cafe`.

---

## Step 6: Program Your First Physical NFC Card

1. Order standard **NTAG213 or NTAG215 PVC cards** or stickers online (Amazon or local suppliers).
2. Install the free **NFC Tools** app on your iPhone or Android phone.
3. Open **NFC Tools** → Tap **Write** → Tap **Add a record**.
4. Select **URL / URI**.
5. Enter your business permanent link:  
   `https://tapstars.pages.dev/r/abc-cafe`
6. Tap **Write / 28 bytes** and touch your phone to the physical NFC card.
7. Now lock your phone, bring it near the card, and watch it instantly launch your business!
