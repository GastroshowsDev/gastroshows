"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LandingContentMap } from "@/lib/landing-client";
import { c } from "@/lib/landing-client";

const GASTRO_CHARS = ["G","a","s","t","r","o"];
const SHOWS_WORD = "Shows";

type Props = {
  onReservar: () => void;
  onRegalar: () => void;
  content: LandingContentMap;
};

export function HeroSection({ onReservar, onRegalar, content }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped]           = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [ready, setReady]           = useState(false);

  const tagline = c(content, "hero.tagline");

  /* Parallax on scroll */
  useEffect(() => {
    const raf = { id: 0 };
    const onScroll = () => {
      raf.id = requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf.id); };
  }, []);

  /* Typewriter — starts after title animation (~1.2 s) */
  useEffect(() => {
    setReady(true);
    const delay = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyped(tagline.slice(0, i));
        if (i >= tagline.length) {
          clearInterval(id);
          setInterval(() => setShowCursor((v) => !v), 530);
        }
      }, 48);
      return () => clearInterval(id);
    }, 1300);
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bgImage = c(content, "hero.bg_image");

  return (
    <section
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Parallax background */}
      <div
        ref={parallaxRef}
        style={{
          position: "absolute",
          inset: "-25% -5%",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <Image
          src={bgImage}
          alt="Restaurant"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Layered overlays */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.42) 45%, rgba(5,5,5,0.88) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(5,5,5,0.35) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "740px", padding: "0 2rem" }}>

        {/* Logo mark */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1rem", marginBottom: "2.5rem",
          opacity: ready ? 1 : 0,
          animation: ready ? "fadeUp 0.8s 0.1s both" : "none",
        }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,169,110,0.6))" }} />
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(200,169,110,0.7)" }}>
            {c(content, "hero.location")}
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(200,169,110,0.6))" }} />
        </div>

        {/* Title — letter by letter */}
        <h1
          aria-label="GastroShows"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            color: "#F5F0E8",
            marginBottom: "1.5rem",
          }}
        >
          {/* "Gastro" — staggered letter reveal */}
          {GASTRO_CHARS.map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: ready ? `letterReveal 0.55s ${i * 0.07}s both` : "none",
              }}
            >
              {char}
            </span>
          ))}
          {/* "Shows" — single element with metallic gradient shimmer */}
          <em
            style={{
              display: "inline-block",
              fontStyle: "italic",
              opacity: 0,
              animation: ready ? "letterReveal 0.7s 0.55s both" : "none",
              background: "linear-gradient(90deg, #9A7040 0%, #daa520 20%, #EDE0C4 40%, #FFFFFF 50%, #EDE0C4 60%, #daa520 80%, #9A7040 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animationDelay: ready ? "0.55s, 1.5s" : "0.55s",
              WebkitTextFillColor: "transparent",
            }}
            className="shows-shimmer"
          >
            {SHOWS_WORD}
          </em>
        </h1>

        {/* Typewriter tagline */}
        <p style={{
          fontSize: "clamp(1.425rem, 3.3vw, 1.8rem)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#F5F0E8",
          letterSpacing: "0.04em",
          lineHeight: 1.5,
          minHeight: "2em",
          marginBottom: "2.8rem",
          textShadow: "0 0 40px rgba(200,169,110,0.45), 0 2px 12px rgba(0,0,0,0.6)",
        }}>
          {typed}
          <span style={{
            opacity: typed.length >= tagline.length ? (showCursor ? 1 : 0) : 1,
            borderRight: "1px solid rgba(200,169,110,0.8)",
            marginLeft: "1px",
          }}>&nbsp;</span>
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          opacity: 0,
          animation: ready ? "fadeUp 0.8s 1.1s both" : "none",
        }}>
          <HeroButton onClick={onReservar} primary>{c(content, "hero.cta_reservar")}</HeroButton>
          <HeroButton onClick={onRegalar} primary={false}>{c(content, "hero.cta_regalar")}</HeroButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
        zIndex: 2,
        opacity: 0, animation: ready ? "fadeUp 0.8s 2s both" : "none",
      }}>
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,169,110,0.55)" }}>
          Descubrir
        </span>
        <div style={{
          width: "1px", height: "48px",
          background: "linear-gradient(to bottom, rgba(200,169,110,0.6), transparent)",
          animation: "bounceLine 2s 2.5s infinite",
        }} />
      </div>
    </section>
  );
}

function HeroButton({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary: boolean }) {
  const [hovered, setHovered] = useState(false);

  const bg = primary
    ? hovered ? "#E8D5A8" : "#daa520"
    : hovered ? "rgba(200,169,110,0.18)" : "rgba(200,169,110,0.06)";

  const border = primary
    ? "none"
    : `1px solid ${hovered ? "rgba(200,169,110,0.9)" : "rgba(200,169,110,0.55)"}`;

  const color = primary
    ? "#0A0A0A"
    : hovered ? "#F5F0E8" : "rgba(200,169,110,0.9)";

  const shadow = hovered
    ? primary
      ? "0 12px 36px rgba(200,169,110,0.4)"
      : "0 10px 32px rgba(200,169,110,0.25), inset 0 0 0 1px rgba(200,169,110,0.6)"
    : "none";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        color,
        border,
        padding: "1rem 2.8rem",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: "2px",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: shadow,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </button>
  );
}
