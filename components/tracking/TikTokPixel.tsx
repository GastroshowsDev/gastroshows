"use client";

import Script from "next/script";

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export function TikTokPixel() {
  if (!TIKTOK_PIXEL_ID) return null;

  return (
    <Script
      id="tiktok-pixel-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;++i)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<e.length;n++)e[n]=e[n].bind(ttq);
            return e};for(var o=ttq._i={},a=0;a<ttq.methods.length;++a)ttq[ttq.methods[a]]=
            ttq.setAndDefer(o,ttq.methods[a]);ttq.load=function(e,n){
            var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._AppId=e,ttq._CallbackQueue=[];
            var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=i,
            document.head.appendChild(t)};
            ttq.load("${TIKTOK_PIXEL_ID}");
            ttq.page();
          }(window, document, "ttq");
        `,
      }}
    />
  );
}
