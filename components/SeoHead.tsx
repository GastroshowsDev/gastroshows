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

  return (
    <>
      {s.schemaOrg?.trim() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: s.schemaOrg }}
        />
      )}
      {s.customHeadScripts?.trim() && (
        <script
          id="custom-head-scripts"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const div = document.createElement('div');
                div.innerHTML = \`${s.customHeadScripts.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
                while (div.firstChild) {
                  if (div.firstChild.tagName === 'SCRIPT') {
                    const s = document.createElement('script');
                    Array.from(div.firstChild.attributes).forEach(a => s.setAttribute(a.name, a.value));
                    s.appendChild(document.createTextNode(div.firstChild.innerHTML));
                    document.head.appendChild(s);
                  } else {
                    document.head.appendChild(div.firstChild);
                  }
                }
              })();
            `
          }}
        />
      )}
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
    <script
      id="custom-body-scripts"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const div = document.createElement('div');
            div.innerHTML = \`${s.customBodyScripts.trim().replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
            while (div.firstChild) {
              if (div.firstChild.tagName === 'SCRIPT') {
                const s = document.createElement('script');
                Array.from(div.firstChild.attributes).forEach(a => s.setAttribute(a.name, a.value));
                s.appendChild(document.createTextNode(div.firstChild.innerHTML));
                document.body.appendChild(s);
              } else {
                document.body.appendChild(div.firstChild);
              }
            }
          })();
        `
      }}
    />
  );
}
