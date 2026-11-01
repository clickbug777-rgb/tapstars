// Cloudflare Pages Function: /r/:slug (Edge NFC Redirect Handler)

interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, params, env } = context;
  const slug = params.slug as string;
  const url = new URL(request.url);
  const cardUid = url.searchParams.get('cid') || undefined;
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';

  // Determine device category
  let deviceCategory = 'mobile';
  if (/iPad|tablet/i.test(userAgent)) {
    deviceCategory = 'tablet';
  } else if (!/mobile|iphone|android/i.test(userAgent)) {
    deviceCategory = 'desktop';
  }

  // Detect bots/crawlers
  const isBot = /bot|spider|crawl|preview|slurp|facebookexternalhit|whatsapp/i.test(userAgent);

  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!slug) {
    return Response.redirect(`${url.origin}/`, 302);
  }

  // If Supabase is not configured yet, redirect to SPA route to handle seamlessly
  if (!supabaseUrl || !supabaseKey) {
    return Response.redirect(`${url.origin}/#/r/${slug}${url.search}`, 302);
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
      // Fallback to client-side routing
      return Response.redirect(`${url.origin}/p/${slug}`, 302);
    }

    const data: any = await res.json();
    if (!data || data.length === 0) {
      // Slug not found
      return Response.redirect(`${url.origin}/p/not-found?slug=${encodeURIComponent(slug)}`, 302);
    }

    const business = data[0];

    // If business is paused/inactive
    if (!business.is_active) {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Card Inactive - TapStars</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fafafa; color: #18181b; }
              .card { background: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e4e4e7; max-width: 400px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
              p { font-size: 0.875rem; color: #71717a; line-height: 1.5; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Card Inactive</h1>
              <p>This business profile is currently suspended or undergoing updates. Please check back shortly.</p>
            </div>
          </body>
        </html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    // Record analytics asynchronously in background without blocking redirect
    if (!isBot) {
      context.waitUntil(
        fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            business_id: business.id,
            event_type: 'nfc_tap',
            device_category: deviceCategory,
            destination_mode: business.destination_mode,
            referrer: referrer.slice(0, 255),
          }),
        }).catch(() => {})
      );
    }

    // Determine target redirect destination
    if (business.destination_mode === 'direct_review' && business.google_review_url) {
      // Validate review URL protocol to prevent open redirect vulnerabilities
      const targetUrl = business.google_review_url.trim();
      if (/^https:\/\//i.test(targetUrl)) {
        return Response.redirect(targetUrl, 302);
      }
    }

    // Default or Mode B: Digital Business Profile
    return Response.redirect(`${url.origin}/p/${business.slug}`, 302);
  } catch (error) {
    // If anything fails at edge, fallback to SPA
    return Response.redirect(`${url.origin}/p/${slug}`, 302);
  }
};
