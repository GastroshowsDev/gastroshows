"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePageActions } from "@/context/PageActionsContext";
import type { LandingContentMap } from "@/lib/landing-client";
import { c } from "@/lib/landing-client";

type Props = { content: LandingContentMap };

export function EventosPage({ content }: Props) {
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const features = [1, 2, 3, 4].map((n) => ({
    n,
    title: c(content, `ev.feat${n}.title`),
    body:  c(content, `ev.feat${n}.body`),
  }));

  return (
    <div style={{ background: "var(--gs-bg)", color: "var(--gs-text)", minHeight: "100vh" }}>

      {/* ── Nav back ── */}
      <div style={{ position: "fixed", top: "1.25rem", left: "1.5rem", zIndex: 100 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(200,169,110,0.7)", textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#daa520"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,169,110,0.7)"; }}
        >
          ← Inicio
        </Link>
      </div>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={c(content, "ev.hero.bg_image")}
            alt="Eventos privados GastroShows"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            sizes="100vw"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.6) 55%, rgba(5,5,5,0.8) 100%)",
          }} />
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          padding: "8rem 2rem 5rem",
          maxWidth: "680px",
          margin: "0 auto",
        }}>
          <p style={{
            fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "rgba(200,169,110,0.75)", marginBottom: "1.5rem",
          }}>
            {c(content, "ev.hero.eyebrow")}
          </p>

          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 6.5vw, 5rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            lineHeight: 1.05,
            marginBottom: "1.75rem",
          }}>
            {c(content, "ev.hero.title_line1")}<br />
            <em style={{ color: "#daa520", fontStyle: "italic" }}>
              {c(content, "ev.hero.title_em")}
            </em>
          </h1>

          <p style={{
            fontSize: "1.05rem", lineHeight: 1.85,
            color: "rgba(245,240,232,0.72)",
            maxWidth: "500px",
            marginBottom: "2.5rem",
          }}>
            {c(content, "ev.hero.subtitle")}
          </p>

          <CtaButton content={content} small />
        </div>
      </section>

      {/* ── Gradient divider ── */}
      <div style={{
        height: "120px",
        background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, var(--gs-bg) 100%)",
        marginTop: "-1px",
      }} />

      {/* ── Features ── */}
      <section style={{ padding: "0 2rem 6rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(200,169,110,0.6)", marginBottom: "0.85rem",
          }}>
            {c(content, "ev.feat.eyebrow")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
          }}>
            {c(content, "ev.feat.title")}
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "2px",
        }}>
          {features.map((feat) => (
            <FeatureCard key={feat.n} title={feat.title} body={feat.body} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "var(--gs-border)", maxWidth: "1100px", margin: "0 auto" }} />

      {/* ── CTA section ── */}
      <CtaSection content={content} />

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid var(--gs-border)",
        padding: "2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", color: "var(--gs-muted)", textTransform: "uppercase" }}>
          {c(content, "footer.tagline")}
        </p>
        <p style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.28)", marginTop: "0.5rem" }}>
          © {new Date().getFullYear()} {c(content, "footer.copyright")}
        </p>
      </footer>
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ title, body }: { title: string; body: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem 2rem",
        background: hovered ? "rgba(200,169,110,0.04)" : "transparent",
        borderLeft: `1px solid ${hovered ? "rgba(200,169,110,0.25)" : "var(--gs-border)"}`,
        transition: "all 0.3s",
      }}
    >
      <div style={{
        width: hovered ? "48px" : "28px",
        height: "2px",
        background: "#daa520",
        marginBottom: "1.5rem",
        transition: "width 0.3s",
      }} />

      <h3 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "1.4rem", fontWeight: 400,
        color: "var(--gs-text)",
        marginBottom: "0.85rem",
        lineHeight: 1.2,
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: "0.88rem", lineHeight: 1.75,
        color: "var(--gs-text-muted)",
      }}>
        {body}
      </p>
    </div>
  );
}

const GOLD = "var(--gs-gold)";

// ── CTA button (reusable) ─────────────────────────────────────────────────────
function CtaButton({ content, small }: { content: LandingContentMap; small?: boolean }) {

  const [hovered, setHovered] = useState(false);
  const { openVisit } = usePageActions();
  const phone = c(content, "ev.cta.whatsapp").replace(/\D/g, "");
  const waUrl = `https://wa.me/${phone}`;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: small ? "flex-start" : "center" }}>
      <button
        onClick={openVisit}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          padding: small ? "0.9rem 2.2rem" : "1.1rem 3rem",
          background: hovered ? "rgba(200,169,110,0.15)" : "transparent",
          color: GOLD,
          border: `1px solid ${GOLD}`,
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: "2px",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor: "pointer",
        }}
      >
        Reserva una visita
      </button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          padding: small ? "0.9rem 2.2rem" : "1.1rem 3rem",
          background: "#daa520",
          color: "#0A0A0A",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: "2px",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#E8D5A8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#daa520")}
      >
        <WhatsAppIcon />
        <span>{c(content, "ev.cta.button")} • {c(content, "ev.cta.whatsapp")}</span>
      </a>
    </div>
  );
}

// ── CTA full section ──────────────────────────────────────────────────────────
function CtaSection({ content }: { content: LandingContentMap }) {
  return (
    <section style={{
      padding: "6rem 2rem",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <p style={{
          fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(200,169,110,0.6)", marginBottom: "1.25rem",
        }}>
          Contacto
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          lineHeight: 1.2,
          marginBottom: "1.25rem",
        }}>
          {c(content, "ev.cta.title")}
        </h2>

        <p style={{
          fontSize: "0.95rem", lineHeight: 1.85,
          color: "var(--gs-text-muted)",
          marginBottom: "2.5rem",
        }}>
          {c(content, "ev.cta.body")}
        </p>

        <CtaButton content={content} />
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
