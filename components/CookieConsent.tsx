"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

/* ── Types ── */
type Consent = { analytics: boolean; advertising: boolean };

export type TrackingConfig = {
  gtm:             string | null;
  ga4:             string | null;
  googleAds:       string | null;
  metaPixel:       string | null;
  tiktokPixel:     string | null;
  linkedinPartner: string | null;
  hotjarId:        string | null;
};

/* ── Cookie helpers ── */
const COOKIE = "gs_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|;)\\s*gs_consent=([^;]*)"));
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[1])) as Consent; } catch { return null; }
}

function writeConsent(c: Consent) {
  document.cookie =
    `${COOKIE}=${encodeURIComponent(JSON.stringify(c))};max-age=${MAX_AGE};path=/;SameSite=Lax`;
}

/* ─────────────────────────────────────────────────────────────────────────── */

export function CookieConsent(cfg: TrackingConfig) {
  const [consent,  setConsentState] = useState<Consent | null>(null);
  const [visible,  setVisible]      = useState(false);
  const [managing, setManaging]     = useState(false);
  const [draft,    setDraft]        = useState<Consent>({ analytics: false, advertising: false });

  useEffect(() => {
    const stored = readConsent();
    if (stored) { setConsentState(stored); }
    else        { setVisible(true); }
  }, []);

  function save(c: Consent) {
    writeConsent(c);
    setConsentState(c);
    setVisible(false);
    setManaging(false);
  }

  const an = consent?.analytics    ?? false;
  const ad = consent?.advertising  ?? false;

  /* Trigger re-render of Gestionar when opening */
  function openManage() {
    setDraft(consent ?? { analytics: false, advertising: false });
    setManaging(true);
  }

  return (
    <>
      {/* ── Analytics scripts ── */}
      {/* GTM: load only when both categories accepted (contains all tags) */}
      {cfg.gtm && an && ad && (
        <Script id="gtm" strategy="afterInteractive">{`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${cfg.gtm}');`}
        </Script>
      )}
      {/* GA4: only when no GTM and analytics accepted */}
      {cfg.ga4 && !cfg.gtm && an && (
        <>
          <Script id="ga4-lib" strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4}`} />
          <Script id="ga4-init" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${cfg.ga4}');`}
          </Script>
        </>
      )}
      {/* Hotjar */}
      {cfg.hotjarId && an && (
        <Script id="hotjar" strategy="afterInteractive">{`
(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${cfg.hotjarId},hjsv:6};a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}

      {/* ── Advertising scripts ── */}
      {cfg.googleAds && !cfg.gtm && ad && (
        <>
          <Script id="gads-lib" strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${cfg.googleAds}`} />
          <Script id="gads-init" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${cfg.googleAds}');`}
          </Script>
        </>
      )}
      {cfg.metaPixel && ad && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${cfg.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}
      {cfg.tiktokPixel && ad && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
ttq._o=ttq._o||{};ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript";
n.async=!0;n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];
e.parentNode.insertBefore(n,e)};ttq.load('${cfg.tiktokPixel}');ttq.page();
}(window,document,'ttq');`}
        </Script>
      )}
      {cfg.linkedinPartner && ad && (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
_linkedin_partner_id="${cfg.linkedinPartner}";
window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[];}
var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");
b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      )}

      {/* ── Cookie Banner ── */}
      {visible && (
        <div
          role="dialog"
          aria-label="Preferencias de cookies"
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(200,169,110,0.2)",
            padding: managing ? "1.5rem 2rem" : "1.25rem 2rem",
            display: "flex", flexDirection: "column", gap: "1rem",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Main row */}
          <div style={{
            display: "flex", alignItems: "flex-start",
            gap: "2rem", flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: "260px" }}>
              <p style={{
                fontSize: "0.78rem", fontWeight: 600,
                color: "#F5F0E8", marginBottom: "0.35rem",
                letterSpacing: "0.02em",
              }}>
                Este sitio usa cookies
              </p>
              <p style={{ fontSize: "0.73rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>
                Usamos cookies propias y de terceros para analizar el tráfico y mostrarte
                publicidad relevante. Puedes aceptar todo, rechazar las no esenciales o
                gestionar tus preferencias.{" "}
                <a href="/privacidad#cookies" style={{ color: "rgba(200,169,110,0.7)", textDecoration: "none" }}>
                  Más información
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
              <button
                onClick={() => save({ analytics: true, advertising: true })}
                style={btnStyle("gold")}
              >
                Aceptar todo
              </button>
              <button
                onClick={() => save({ analytics: false, advertising: false })}
                style={btnStyle("outline")}
              >
                Solo necesarias
              </button>
              <button
                onClick={openManage}
                style={btnStyle("ghost")}
              >
                Gestionar
              </button>
            </div>
          </div>

          {/* Expanded manage section */}
          {managing && (
            <div style={{
              borderTop: "1px solid rgba(200,169,110,0.15)",
              paddingTop: "1rem",
              display: "flex", flexDirection: "column", gap: "0.75rem",
            }}>
              <ToggleRow
                label="Cookies analíticas"
                description="Google Analytics y Hotjar — nos ayudan a entender cómo se usa la web."
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <ToggleRow
                label="Cookies publicitarias"
                description="Google Ads, Meta, TikTok y LinkedIn — miden la efectividad de nuestras campañas."
                checked={draft.advertising}
                onChange={(v) => setDraft((d) => ({ ...d, advertising: v }))}
              />
              <div style={{ display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
                <button onClick={() => setManaging(false)} style={btnStyle("ghost")}>
                  Cancelar
                </button>
                <button onClick={() => save(draft)} style={btnStyle("gold")}>
                  Guardar preferencias
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gestionar cookies link (always visible after consent) */}
      {!visible && consent !== null && (
        <button
          onClick={() => { setManaging(true); setVisible(true); }}
          style={{
            position: "fixed", bottom: "1rem", left: "1rem", zIndex: 9998,
            background: "rgba(10,10,10,0.8)",
            border: "1px solid rgba(200,169,110,0.2)",
            borderRadius: "20px",
            padding: "0.35rem 0.85rem",
            fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(200,169,110,0.6)", cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#C8A96E"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(200,169,110,0.6)"; }}
          aria-label="Gestionar preferencias de cookies"
        >
          Cookies
        </button>
      )}
    </>
  );
}

/* ── Sub-components ── */

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.15rem" }}>{label}</p>
        <p style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.5 }}>{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        style={{
          width: "42px", height: "24px", borderRadius: "12px", border: "none",
          background: checked ? "#C8A96E" : "rgba(255,255,255,0.12)",
          cursor: "pointer", position: "relative", flexShrink: 0,
          transition: "background 0.2s",
        }}
      >
        <span style={{
          position: "absolute", top: "3px",
          left: checked ? "21px" : "3px",
          width: "18px", height: "18px", borderRadius: "50%",
          background: "#fff", transition: "left 0.2s",
        }} />
      </button>
    </div>
  );
}

function btnStyle(variant: "gold" | "outline" | "ghost"): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "0.55rem 1.1rem", borderRadius: "4px",
    fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.06em",
    cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s",
  };
  if (variant === "gold") return { ...base, background: "#C8A96E", color: "#0A0A0A", border: "none" };
  if (variant === "outline") return { ...base, background: "transparent", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.2)" };
  return { ...base, background: "transparent", color: "rgba(245,240,232,0.45)", border: "none" };
}
