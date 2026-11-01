# TapStars

**One Tap. Your Entire Business.**

A free-tier NFC digital business presence platform built for local businesses.

## What It Does

TapStars lets businesses create permanent, programmable NFC/QR URLs that direct customers to:
- Google Reviews
- Social Media (Instagram, Facebook, YouTube, LinkedIn)
- Contact info (phone, email, address)
- WhatsApp chat
- Digital business profile

The key: NFC card URLs never change. Update destinations from the dashboard without rewriting cards.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React + Vite** | Frontend |
| **Tailwind CSS** | Styling |
| **Supabase** | Database + Auth |
| **Cloudflare Pages** | Hosting |
| **Cloudflare Functions** | Edge redirects |

## Live Demo

Three demo businesses:
- `https://tapstars.pages.dev/p/abc-cafe` (Coffee shop - direct review mode)
- `https://tapstars.pages.dev/p/urban-cuts` (Salon - profile mode)
- `https://tapstars.pages.dev/p/smile-dental` (Dental clinic)

## Development

```bash
# Install deps
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for step-by-step instructions.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |

## Demo Mode

Without Supabase credentials, the app runs in demo mode using localStorage with three sample businesses.

## File Structure

```
src/
  pages/          # Route pages
  components/     # Reusable components
  context/        # React context (Auth, Data)
  lib/            # Utilities, config, demo data
  types/          # TypeScript types
```

## License

MIT - Built for local businesses by TapStars
