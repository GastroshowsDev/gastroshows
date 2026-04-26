"use client";

import Image from "next/image";
import { useState } from "react";
import type { LandingContentMap } from "@/lib/landing-client";
import { c } from "@/lib/landing-client";

type Props = { onRegalar: () => void; content: LandingContentMap };

export function RegaloSection({ onRegalar, content }: Props) {
  const [hovered, setHovered] = useState(false);

  const features: [string, string][] = [
    ["◇", c(content, "regalo.feature1")],
    ["◈", c(content, "regalo.feature2")],
  ];

  return (
    <section style={{ position: "relative", minHeight: "520px", overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Background image — always dark */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={c(content, "regalo.bg_image")}
          alt="Gift experience"
          fill
          loading="lazy"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          sizes="100vw"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.55) 100%)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%",
        margin: "0 auto",
        padding: "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "580px",
      }}>
        <p style={{
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(200,169,110,0.7)",
        }}>
          {c(content, "regalo.eyebrow")}
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "#F5F0E8",
          lineHeight: 1.2,
        }}>
          {c(content, "regalo.title_line1")}<br />
          <em style={{ color: "#C8A96E" }}>{c(content, "regalo.title_em")}</em>
        </h2>

        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(245,240,232,0.65)",
          maxWidth: "420px",
        }}>
          {c(content, "regalo.body")}
        </p>

        {/* Features */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "0.5rem 0" }}>
          {features.map(([icon, label]) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.75rem 1.4rem",
              border: "1px solid rgba(200,169,110,0.4)",
              borderRadius: "2px",
              background: "rgba(200,169,110,0.07)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ color: "#C8A96E", fontSize: "1.3rem" }}>{icon}</span>
              <span style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "rgba(245,240,232,0.92)",
                letterSpacing: "0.06em",
              }}>{label}</span>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={onRegalar}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered ? "#E8D5A8" : "#C8A96E",
              color: "#0A0A0A",
              border: "none",
              padding: "1.1rem 3rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              transform: hovered ? "translateY(-3px)" : "translateY(0)",
              boxShadow: hovered ? "0 12px 36px rgba(200,169,110,0.4)" : "none",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {c(content, "regalo.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}
