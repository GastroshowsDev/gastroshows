"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <Script
      id="ga4-script"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined") {
          const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
          w.dataLayer = w.dataLayer || [];
          function gtag(...args: unknown[]) {
            w.dataLayer.push(args);
          }
          gtag("js", new Date());
          gtag("config", GA_ID, {
            page_path: window.location.pathname,
            page_title: document.title,
          });
          w.gtag = gtag;
        }
      }}
    />
  );
}
