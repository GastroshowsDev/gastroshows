"use client";

import Image from "next/image";
import { useState } from "react";
import type { CtaContent } from "@/lib/blocks/types";

type Props = { 
  content: CtaContent;
  isEditing?: boolean;
  onUpdate?: (newContent: CtaContent) => void;
};

export function CtaBlock({ content, isEditing = false, onUpdate }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "400px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image */}
      {content.bgImage && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={content.bgImage}
            alt=""
            fill
            loading="lazy"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.55) 100%)",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "580px",
          margin: "0 auto",
          padding: "5rem 2rem",
          textAlign: content.bgImage ? "left" : "center",
        }}
      >
        {content.eyebrow && (
          <p
            data-field="eyebrow"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: content.bgImage ? "rgba(200,169,110,0.7)" : "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            {content.eyebrow}
          </p>
        )}

        <h2
          data-field="title"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: content.bgImage ? "#F5F0E8" : "var(--gs-text)",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
          }}
        >
          {content.title}
          {content.titleAccent && (
            <>
              <br />
              <em data-field="titleAccent" style={{ color: "#C8A96E", fontStyle: "italic" }}>{content.titleAccent}</em>
            </>
          )}
        </h2>

        {content.body && (
          <p
            data-field="body"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: content.bgImage ? "rgba(245,240,232,0.65)" : "var(--gs-text-sub)",
              marginBottom: "2rem",
            }}
          >
            {content.body}
          </p>
        )}

        {content.buttonText && (
          <div data-field="buttonText" style={{ display: "contents" }}>
            <a
              href={content.buttonLink || "#"}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-block",
                background: hovered ? "#E8D5A8" : "#C8A96E",
                color: "#0A0A0A",
                border: "none",
                padding: "1.1rem 3rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "pointer",
                borderRadius: "2px",
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hovered ? "0 12px 36px rgba(200,169,110,0.4)" : "none",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {content.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
