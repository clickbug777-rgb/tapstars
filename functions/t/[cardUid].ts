// Cloudflare Pages Function: /t/:cardUid (High-Performance Edge Card & QR Tracking Redirect)

interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

const DEFAULT_SUPABASE_URL = 'https://zxuxszlfshakdtdrwqtk.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dXhzemxmc2hha2R0ZHJ3cXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MTk3NDcsImV4cCI6MjEwOTA5NTc0N30.KDzXeEQwV9YoWr-7iO9xQuavB86VvdnIKSKuA_yUn8w';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, params, env } = context;
  const cardUid = ((params.cardUid as string) || '').trim().toLowerCase();
  const url = new URL(request.url);
  const isQrSource = url.searchParams.get('qr') === '1' || url.searchParams.get('source') === 'qr';
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = (request.headers.get('referer') || '').slice(0, 255);

  // 1. Bot & Crawler Detection (Prevent artificial tap pollution)
  const isBot = /bot|spider|crawl|preview|slurp|facebookexternalhit|whatsapp|telegram|twitterbot|bingbot|googlebot/i.test(
    userAgent
  );

  // 2. Anonymized Device Category Detection
  let deviceCategory = 'mobile';
  if (/iPad|tablet/i.test(userAgent)) {
    deviceCategory = 'tablet';
  } else if (!/mobile|iphone|android/i.test(userAgent)) {
    deviceCategory = 'desktop';
  }

  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  if (!cardUid) {
    return Response.redirect(`${url.origin}/`, 302);
  }

  try {
    // 3. Resolve Card and Associated Business in a Single Fast Query
    const queryUrl = `${supabaseUrl}/rest/v1/nfc_cards?card_uid=ilike.${encodeURIComponent(
      cardUid
    )}&select=id,card_uid,label,location_name,is_active,business_id,businesses(id,name,slug,destination_mode,google_review_url,is_active)&limit=1`;

    const res = await fetch(queryUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) {
      // Fallback directly to client side handler
      return Response.redirect(`${url.origin}/t-view/${encodeURIComponent(cardUid)}${url.search}`, 302);
    }

    const cards: any = await res.json();
    if (!cards || cards.length === 0) {
      // Card not found or unassigned
      return Response.redirect(`${url.origin}/t-view/${encodeURIComponent(cardUid)}${url.search}`, 302);
    }

    const card = cards[0];
    const business = card.businesses;

    // Check if card or business is deactivated
    if (!card.is_active || !business || !business.is_active) {
      const targetSlug = business?.slug || '';
      return Response.redirect(`${url.origin}/p/${targetSlug}?card_status=inactive`, 302);
    }

    const eventType = isQrSource ? 'qr_scan' : 'nfc_tap';

    // 4. Asynchronously Record Analytics Event Without Blocking Redirect
    if (!isBot) {
      context.waitUntil(
        (async () => {
          try {
            // A. Log event to tracking_events
            await fetch(`${supabaseUrl}/rest/v1/tracking_events`, {
              method: 'POST',
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
              },
              body: JSON.stringify({
                business_id: business.id,
                card_id: card.id,
                event_type: eventType,
                device_category: deviceCategory,
                destination_mode: business.destination_mode,
                referrer: referrer || null,
              }),
            });

            // B. Increment card tap/scan counter
            const counterPatch = isQrSource
              ? { qr_scan_count: (card.qr_scan_count || 0) + 1, last_tapped_at: new Date().toISOString() }
              : { tap_count: (card.tap_count || 0) + 1, last_tapped_at: new Date().toISOString() };

            await fetch(`${supabaseUrl}/rest/v1/nfc_cards?id=eq.${card.id}`, {
              method: 'PATCH',
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
              },
              body: JSON.stringify(counterPatch),
            });
          } catch (e) {
            // Silently swallow analytics error to never impact redirect reliability
          }
        })()
      );
    }

    // 5. Determine Redirect Destination
    // Mode A: Direct Google Review
    if (business.destination_mode === 'direct_review' && business.google_review_url) {
      const targetUrl = business.google_review_url.trim();
      if (/^https?:\/\//i.test(targetUrl)) {
        return Response.redirect(targetUrl, 302);
      }
    }

    // Mode B: Digital Business Profile
    return Response.redirect(`${url.origin}/p/${business.slug}?cid=${encodeURIComponent(card.card_uid)}`, 302);
  } catch (err) {
    // Resilient Fallback to avoid dead-ends
    return Response.redirect(`${url.origin}/t-view/${encodeURIComponent(cardUid)}${url.search}`, 302);
  }
};
