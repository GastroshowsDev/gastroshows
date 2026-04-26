"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", label: "Fusión de sabores" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", label: "Cocina de autor" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", label: "Ingredientes de temporada" },
  { src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80", label: "Postres de diseño" },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", label: "Cada plato, una historia" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99eb4b450?auto=format&fit=crop&w=800&q=80", label: "Arte en el plato" },
] as const;

export function GaleriaSection() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      style={{
        padding: "5rem 2rem 6rem",
        background: "var(--gs-bg2)",
        transition: "background 0.3s",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
          El escenario
        </p>
        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          lineHeight: 1.2,
          transition: "color 0.3s",
        }}>
          Cada plato, una obra.
        </h2>
      </div>

      {/* Grid */}
      <div
        ref={ref}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {PHOTOS.map((photo, i) => (
          <GalleryCell
            key={photo.src}
            src={photo.src}
            label={photo.label}
            delay={i * 0.08}
            visible={visible}
          />
        ))}
      </div>

      {/* Pull quote */}
      <blockquote style={{
        textAlign: "center",
        maxWidth: "640px",
        margin: "4rem auto 0",
        padding: "0 2rem",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "var(--gs-text-muted)",
          lineHeight: 1.65,
          transition: "color 0.3s",
        }}>
          "No viniste a cenar. Viniste a vivir algo que no podrás explicar del todo."
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--gs-border)", maxWidth: "80px" }} />
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gs-muted)" }}>
            GastroShows
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--gs-border)", maxWidth: "80px" }} />
        </div>
      </blockquote>
    </section>
  );
}

function GalleryCell({
  src, label, delay, visible,
}: {
  src: string; label: string; delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "280px",
        overflow: "hidden",
        borderRadius: "2px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
      }}
    >
      <Image
        src={src}
        alt={label}
        fill
        loading="lazy"
        sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Permanent bottom gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 55%)",
      }} />
      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(200,169,110,0.08)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: "1.1rem",
        left: "1.25rem",
        right: "1.25rem",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.1rem",
          fontWeight: 300,
          color: "#F5F0E8",
          letterSpacing: "0.03em",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "transform 0.4s",
        }}>
          {label}
        </p>
      </div>

      {/* Gold corner accent on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "40px", height: "40px",
        borderTop: "1px solid rgba(200,169,110,0.6)",
        borderLeft: "1px solid rgba(200,169,110,0.6)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: "40px", height: "40px",
        borderBottom: "1px solid rgba(200,169,110,0.6)",
        borderRight: "1px solid rgba(200,169,110,0.6)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s",
      }} />
    </div>
  );
}
