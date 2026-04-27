"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePageActions } from "@/context/PageActionsContext";
import { DisponibilidadSection } from "./DisponibilidadSection";
import { HeroSection } from "./HeroSection";
import { RegaloSection } from "./RegaloSection";
import { RitualSection } from "./RitualSection";
import type { LandingContentMap } from "@/lib/landing-client";
import { c } from "@/lib/landing-client";

type Props = { content: LandingContentMap };

export function LandingPage({ content }: Props) {
  const { openReservation, openGift } = usePageActions();

  // Always start at top — prevents browser scroll restoration from jumping mid-page
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ThemeToggle variant="public" />

      <HeroSection
        content={content}
        onReservar={openReservation}
        onRegalar={openGift}
      />

      {/* Hero → Ritual fade */}
      <div style={{
        height: "140px",
        background: "linear-gradient(to bottom, #050505 0%, #050505 15%, var(--gs-bg) 100%)",
        pointerEvents: "none",
        flexShrink: 0,
      }} />

      <RitualSection content={content} />

      <DisponibilidadSection onReservar={openReservation} />

      {/* Disponibilidad → Regalo fade */}
      <div style={{
        height: "140px",
        background: "linear-gradient(to bottom, var(--gs-bg) 0%, var(--gs-bg) 15%, #050505 100%)",
        pointerEvents: "none",
        flexShrink: 0,
      }} />

      <RegaloSection content={content} onRegalar={openGift} />
      <LandingFooter content={content} />
    </>
  );
}

function LandingFooter({ content }: { content: LandingContentMap }) {
  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid rgba(200,169,110,0.1)",
      padding: "3rem 2rem",
      textAlign: "center",
    }}>
      {/* Logo line */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginBottom: "1.75rem" }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,169,110,0.25))", maxWidth: "120px" }} />
        <span style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 300,
          letterSpacing: "0.12em",
          color: "#F5F0E8",
        }}>
          Gastro<em style={{ color: "#C8A96E" }}>Shows</em>
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(200,169,110,0.25))", maxWidth: "120px" }} />
      </div>

      <p style={{
        fontSize: "0.62rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(136,136,136,0.5)",
        marginBottom: "1.5rem",
      }}>
        {c(content, "footer.tagline")}
      </p>

      {/* Links */}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
        {[
          { label: "Aviso legal",  href: "/aviso-legal" },
          { label: "Privacidad",   href: "/privacidad"  },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(200,169,110,0.4)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8A96E"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,169,110,0.4)"; }}
          >
            {label}
          </a>
        ))}
      </div>

      <p style={{ fontSize: "0.6rem", color: "rgba(136,136,136,0.3)", letterSpacing: "0.08em" }}>
        © {new Date().getFullYear()} {c(content, "footer.copyright")}
      </p>
    </footer>
  );
}
