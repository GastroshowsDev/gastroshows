import { getSeoSettings } from "@/lib/seo";

/**
 * Server component — injects tracking pixels, custom scripts, and JSON-LD
 * from the DB-stored SEO settings into every public page.
 * Meta tags (title, description, og, twitter) are handled separately via
 * generateMetadata in layout.tsx for proper Next.js integration.
 */
/**
 * SeoHead: only injects non-tracking scripts (JSON-LD, custom head code).
 * All tracking pixels are now managed by CookieConsent (consent-gated).
 */
export async function SeoHead() {
  const s = await getSeoSettings();

  const parts: string[] = [];

  // JSON-LD structured data (no consent required)
  if (s.schemaOrg?.trim()) {
    parts.push(`<script type="application/ld+json">${s.schemaOrg}</script>`);
  }

  // Custom head scripts — user's responsibility re: consent
  if (s.customHeadScripts?.trim()) {
    parts.push(s.customHeadScripts.trim());
  }

  if (parts.length === 0) return null;

  return (
    <>
      {parts.map((html, i) => (
        // eslint-disable-next-line react/no-danger
        <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </>
  );
}

/**
 * Returns tracking IDs from SEO settings for use in CookieConsent.
 * Call from layout.tsx and pass as props to <CookieConsent>.
 */
export async function getTrackingConfig() {
  const s = await getSeoSettings();
  return {
    gtm:             s.googleTagManagerId  ?? null,
    ga4:             s.googleAnalyticsId   ?? null,
    googleAds:       s.googleAdsId         ?? null,
    metaPixel:       s.metaPixelId         ?? null,
    tiktokPixel:     s.tiktokPixelId       ?? null,
    linkedinPartner: s.linkedinPartnerId   ?? null,
    hotjarId:        s.hotjarId            ?? null,
  };
}

/**
 * Body scripts — only custom body code (GTM noscript removed; GTM now consent-gated).
 */
export async function SeoBodyScripts() {
  const s = await getSeoSettings();

  if (!s.customBodyScripts?.trim()) return null;

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: s.customBodyScripts.trim() }} />
  );
}
