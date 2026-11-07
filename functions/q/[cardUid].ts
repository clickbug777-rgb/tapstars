// Cloudflare Pages Function: /q/:cardUid (Direct QR Scan Tracking Handler)

export const onRequest: PagesFunction = async (context) => {
  const { request, params } = context;
  const cardUid = params.cardUid as string;
  const url = new URL(request.url);

  // Redirect internally to the tracking engine with qr=1 parameter
  return Response.redirect(`${url.origin}/t/${encodeURIComponent(cardUid)}?qr=1${url.search.replace(/^\?/, '&')}`, 302);
};
