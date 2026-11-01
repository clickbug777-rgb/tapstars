# 🛡️ TapStars — Security Architecture & Guidelines

TapStars is built following rigorous security and data integrity principles.

---

## 1. Protection Against Open Redirect Vulnerabilities
Redirecting incoming NFC traffic is a high-risk vector if unconstrained. TapStars enforces multi-layer redirect validation:
- **Protocol Whitelist**: Only validated `https://` and `http://` protocols are executed. Arbitrary URI schemes (`javascript:`, `data:`, `vbscript:`, `file:`) are strictly blocked.
- **Slug Verification**: Requests to `/r/:slug` only route to existing active records stored in your verified database.
- **Serverless Edge Enforcement**: In Cloudflare Pages Functions (`functions/r/[slug].ts`), incoming redirect requests are validated before returning HTTP 302 responses.

---

## 2. Row Level Security (RLS) & Access Control
- **Public Traffic Constraints**: Public visitors can only perform `SELECT` queries on businesses where `is_active = true`. Unauthenticated visitors cannot view administrative metadata, drafts, or internal card counts.
- **Public Analytics Isolation**: Public visitors can `INSERT` analytics events (taps, clicks, scans) to record interactions, but can never `SELECT`, `UPDATE`, or `DELETE` event history.
- **Admin Isolation**: Modifying business data, creating NFC cards, or viewing comprehensive analytics requires authenticated session tokens verified by Supabase PostgreSQL.

---

## 3. Credential Safety & No Hardcoded Secrets
- **Zero Secrets in Git**: No database connection strings, passwords, or service-role keys are hardcoded in the codebase.
- **Client Key Isolation**: Only the Supabase `anon` public key is packaged in frontend bundles. The `service_role` super-admin key is **never** used in client code.
- **Environment Isolation**: Production credentials are supplied strictly via Cloudflare Pages Environment Variables or local `.env` files (which are ignored in `.gitignore`).

---

## 4. Privacy-Compliant Analytics & Bot Filtering
- **No Invasive Tracking**: TapStars records aggregate interactions without storing IP addresses, fingerprinting, or personally identifiable information (PII).
- **Automated Bot Filtering**: Known web crawlers, search bots (Googlebot, Bingbot, etc.), and link-preview spiders are filtered out so they do not artificially inflate client tap counts.
