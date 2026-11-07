// Cloudflare Pages Function: /r/:slug (Edge NFC Redirect Handler - Backward Compatible)

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
  const slug = params.slug as string;
  const url = new URL(request.url);
  const cardUid = url.searchParams.get('cid') || undefined;
  const isQr = url.searchParams.get('qr') === '1' || url.searchParams.get('source') === 'qr';
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = (request.headers.get('referer') || '').slice(0, 255);

  // Determine device category
  let deviceCategory = 'mobile';
  if (/iPad|tablet/i.test(userAgent)) {
    deviceCategory = 'tablet';
  } else if (!/mobile|iphone|android/i.test(userAgent)) {
    deviceCategory = 'desktop';
  }

  // Detect bots/crawlers
  const isBot = /bot|spider|crawl|preview|slurp|facebookexternalhit|whatsapp|telegram|twitterbot|bingbot|googlebot/i.test(
    userAgent
  );

  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  if (!slug) {
    return Response.redirect(`${url.origin}/`, 302);
  }

  try {
    // Lookup business from Supabase REST API directly at edge
    const queryUrl = `${supabaseUrl}/rest/v1/businesses?slug=eq.${encodeURIComponent(
      slug
    )}&select=id,name,slug,destination_mode,google_review_url,is_active&limit=1`;

    const res = await fetch(queryUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) {
      return Response.redirect(`${url.origin}/p/${slug}`, 302);
    }

    const data: any = await res.json();
    if (!data || data.length === 0) {
      return Response.redirect(`${url.origin}/p/${slug}`, 302);
    }

    const business = data[0];

    // If business is paused/inactive
    if (!business.is_active) {
      return Response.redirect(`${url.origin}/p/${business.slug}?status=inactive`, 302);
    }

    // Record analytics asynchronously in background without blocking redirect
    if (!isBot) {
      context.waitUntil(
        (async () => {
          try {
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
                card_id: cardUid || null,
                event_type: isQr ? 'qr_scan' : 'nfc_tap',
                device_category: deviceCategory,
                destination_mode: business.destination_mode,
                referrer: referrer || null,
              }),
            });
          } catch {
            // Ignore background error
          }
        })()
      );
    }

    // Determine target redirect destination
    // Mode A: Direct Google Review
    if (business.destination_mode === 'direct_review' && business.google_review_url) {
      const targetUrl = business.google_review_url.trim();
      if (/^https?:\/\//i.test(targetUrl)) {
        return Response.redirect(targetUrl, 302);
      }
    }

    // Mode B: Digital Business Profile
    const cardParam = cardUid ? `?cid=${encodeURIComponent(cardUid)}` : '';
    return Response.redirect(`${url.origin}/p/${business.slug}${cardParam}`, 302);
  } catch {
    return Response.redirect(`${url.origin}/p/${slug}`, 302);
  }
};
