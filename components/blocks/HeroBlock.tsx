"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { HeroContent } from "@/lib/blocks/types";

type Props = { content: HeroContent };

export function HeroBlock({ content }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = (content.overlayOpacity ?? 70) / 100;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Parallax background */}
      {content.bgImage && (
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
            src={content.bgImage}
            alt=""
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(180deg, rgba(5,5,5,${opacity}) 0%, rgba(5,5,5,${opacity * 0.6}) 45%, rgba(5,5,5,${Math.min(opacity * 1.25, 1)}) 100%)`,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "740px", padding: "0 2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            lineHeight: 1.05,
            color: "#F5F0E8",
            marginBottom: "1.5rem",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}
        >
          {content.title}
          {content.titleAccent && (
            <>
              <br />
              <em style={{ color: "#C8A96E", fontStyle: "italic" }}>{content.titleAccent}</em>
            </>
          )}
        </h1>

        {content.subtitle && (
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(245,240,232,0.8)",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              opacity: ready ? 1 : 0,
              transition: "opacity 0.8s 0.3s",
            }}
          >
            {content.subtitle}
          </p>
        )}

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s 0.6s",
          }}
        >
          {content.ctaPrimaryText && (
            <HeroButton href={content.ctaPrimaryLink} primary>
              {content.ctaPrimaryText}
            </HeroButton>
          )}
          {content.ctaSecondaryText && (
            <HeroButton href={content.ctaSecondaryLink} primary={false}>
              {content.ctaSecondaryText}
            </HeroButton>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroButton({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const bg = primary
    ? hovered ? "#E8D5A8" : "#C8A96E"
    : hovered ? "rgba(200,169,110,0.18)" : "rgba(200,169,110,0.06)";

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        background: bg,
        color: primary ? "#0A0A0A" : hovered ? "#F5F0E8" : "rgba(200,169,110,0.9)",
        border: primary ? "none" : `1px solid ${hovered ? "rgba(200,169,110,0.9)" : "rgba(200,169,110,0.55)"}`,
        padding: "1rem 2.8rem",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "2px",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? primary
            ? "0 12px 36px rgba(200,169,110,0.4)"
            : "0 10px 32px rgba(200,169,110,0.25)"
          : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </a>
  );
}
