import { prisma } from "@/lib/prisma";

export type SeoSettingsData = {
  id: string;
  siteTitle: string;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string;
  twitterHandle: string | null;
  canonicalUrl: string | null;
  robots: string;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  googleAnalyticsId: string | null;
  googleTagManagerId: string | null;
  metaPixelId: string | null;
  tiktokPixelId: string | null;
  linkedinPartnerId: string | null;
  hotjarId: string | null;
  googleAdsId: string | null;
  googleAdsLabel: string | null;
  customHeadScripts: string | null;
  customBodyScripts: string | null;
  schemaOrg: string | null;
};

const DEFAULTS: SeoSettingsData = {
  id: "default",
  siteTitle: "GastroShows · Barcelona",
  metaDescription: null,
  metaKeywords: null,
  ogTitle: null,
  ogDescription: null,
  ogImage: null,
  twitterCard: "summary_large_image",
  twitterHandle: null,
  canonicalUrl: null,
  robots: "index, follow",
  googleSiteVerification: null,
  bingSiteVerification: null,
  googleAnalyticsId: null,
  googleTagManagerId: null,
  metaPixelId: null,
  tiktokPixelId: null,
  linkedinPartnerId: null,
  hotjarId: null,
  googleAdsId: null,
  googleAdsLabel: null,
  customHeadScripts: null,
  customBodyScripts: null,
  schemaOrg: null,
};

export async function getSeoSettings(): Promise<SeoSettingsData> {
  try {
    const row = await prisma.seoSettings.findUnique({ where: { id: "default" } });
    return row ?? DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}
