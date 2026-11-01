# TapStars Deployment Guide

## Prerequisites
- GitHub account
- Cloudflare account  
- Supabase project (free tier)

## Step 1: Set up Supabase

1. Create project at https://supabase.com
2. Get URL and anon key from Settings → API
3. Run `supabase/schema.sql` in SQL Editor

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial TapStars"
git remote add origin https://github.com/YOUR_NAME/tapstars.git
git push -u origin main
```

## Step 3: Create Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages → Create project
2. Connect your GitHub repo
3. Set:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
5. Deploy

## Production URLs
- Main: https://tapstars.pages.dev
- Profile: /p/business-name  
- NFC Redirect: /r/business-name

## Test NFC
Program a card with: https://tapstars.pages.dev/r/abc-cafe

## Troubleshooting
- 404 on routes? Check `_redirects` has SPA fallback
- Env vars missing? Refresh in Settings → Environment variables
