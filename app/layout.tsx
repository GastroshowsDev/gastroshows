import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SeoHead, SeoBodyScripts, getTrackingConfig } from "@/components/SeoHead";
import { CookieConsent } from "@/components/CookieConsent";
import { getSeoSettings } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSeoSettings();

  const title = s.siteTitle || "GastroShows · Barcelona";
  const description =
    s.metaDescription ||
    "Una cena que comienza antes de que llegues. Cuatro emails, cuatro pistas, una ubicación secreta que descubrirás tú solo.";

  return {
    title,
    description,
    keywords: s.metaKeywords ?? undefined,
    robots: "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ...(s.canonicalUrl ? { alternates: { canonical: s.canonicalUrl } } : {}),
    ...(s.googleSiteVerification
      ? { verification: { google: s.googleSiteVerification, ...(s.bingSiteVerification ? { other: { "msvalidate.01": s.bingSiteVerification } } : {}) } }
      : s.bingSiteVerification
        ? { other: { "msvalidate.01": s.bingSiteVerification } }
        : {}),
    openGraph: {
      title: s.ogTitle || title,
      description: s.ogDescription || description,
      ...(s.ogImage ? { images: [{ url: s.ogImage }] } : {}),
      type: "website",
      locale: "es_ES",
    },
    twitter: {
      card: (s.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
      ...(s.twitterHandle ? { site: s.twitterHandle, creator: s.twitterHandle } : {}),
      title: s.ogTitle || title,
      description: s.ogDescription || description,
      ...(s.ogImage ? { images: [s.ogImage] } : {}),
    },
  };
}

import Script from "next/script";
import { PublicShell } from "@/components/PublicShell";
import { GoogleTagManager } from "@/components/tracking/GoogleTagManager";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { TikTokPixel } from "@/components/tracking/TikTokPixel";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tracking = await getTrackingConfig();

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <SeoHead />
        <GoogleTagManager />
      </head>

      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <MetaPixel />
        <TikTokPixel />
        <SeoBodyScripts />
        <Providers>
          <PublicShell>
            {children}
          </PublicShell>
        </Providers>
        <CookieConsent {...tracking} />
      </body>
    </html>
  );
}

