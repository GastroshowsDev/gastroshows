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
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", GA_ID, {
            page_path: window.location.pathname,
            page_title: document.title,
          });
          (window as any).gtag = gtag;
        }
      }}
    />
  );
}
