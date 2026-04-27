"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { HeroContent } from "@/lib/blocks/types";

import { InlineText } from "@/components/admin/InlineText";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { SmartLink } from "./SmartLink";

export function HeroBlock({ content, isEditing = false, onUpdate }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  const updateField = (field: keyof HeroContent, value: any) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  useEffect(() => {
    setReady(true);
    // ... scroll logic ...
  }, []);

  useEffect(() => {
    // ... typewriter logic ...
    if (content.animation === "typewriter" && ready) {
       // keep legacy typewriter if selected
    }
    setTypedTitle(content.title);
  }, [content.title, content.animation, ready]);

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
      {/* ... parallax and overlay ... */}
      <div
        ref={parallaxRef}
        style={{
          position: "absolute",
          inset: "-25% -5%",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        {content.bgImage && (
          <Image src={content.bgImage} alt="" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        )}
      </div>

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
        {(content.eyebrow || isEditing) && (
          <AnimatedWrapper animation={content.eyebrowAnim || "fade-in"}>
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "1.5rem", 
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ height: "1px", width: "40px", background: "rgba(200,169,110,0.4)" }} />
              <InlineText
                tagName="span"
                value={content.eyebrow || ""}
                onChange={(v) => updateField("eyebrow", v)}
                isEditing={isEditing}
                dataField="eyebrow"
                placeholder="UBICACIÓN"
                style={{ 
                  fontSize: "0.75rem", 
                  letterSpacing: "0.4em", 
                  textTransform: "uppercase", 
                  color: "rgba(245,240,232,0.8)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 500,
                }}
              />
              <div style={{ height: "1px", width: "40px", background: "rgba(200,169,110,0.4)" }} />
            </div>
          </AnimatedWrapper>
        )}

        <AnimatedWrapper animation={content.titleAnim || content.animation || "fade-in"}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              lineHeight: 1.05,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}
          >
            <InlineText
              tagName="span"
              value={typedTitle}
              onChange={(v) => updateField("title", v)}
              isEditing={isEditing}
              dataField="title"
              placeholder="Título principal"
            />
            {(content.titleAccent || isEditing) && (
              <>
                <br />
                <InlineText
                  tagName="em"
                  value={content.titleAccent || ""}
                  onChange={(v) => updateField("titleAccent", v)}
                  isEditing={isEditing}
                  dataField="titleAccent"
                  placeholder="Acento"
                  style={{ color: "#C8A96E", fontStyle: "italic" }}
                />
              </>
            )}
          </h1>
        </AnimatedWrapper>

        {(content.subtitle || isEditing) && (
          <AnimatedWrapper animation={content.subtitleAnim || "fade-in"} delay={0.2}>
            <p
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(245,240,232,0.8)",
                lineHeight: 1.6,
                marginBottom: "2.5rem",
              }}
            >
              <InlineText
                tagName="span"
                value={content.subtitle || ""}
                onChange={(v) => updateField("subtitle", v)}
                isEditing={isEditing}
                dataField="subtitle"
                placeholder="Subtítulo o descripción corta"
              />
            </p>
          </AnimatedWrapper>
        )}

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {(content.ctaPrimaryText || isEditing) && (
            <AnimatedWrapper animation={content.ctaPrimaryAnim || "fade-in"} delay={0.4}>
              <div data-field="ctaPrimaryText" style={{ display: "contents" }}>
                <HeroButton href={content.ctaPrimaryLink} primary isEditing={isEditing}>
                  <InlineText
                    tagName="span"
                    value={content.ctaPrimaryText || "Boton Primario"}
                    onChange={(v) => updateField("ctaPrimaryText", v)}
                    isEditing={isEditing}
                    dataField="ctaPrimaryText"
                  />
                </HeroButton>
              </div>
            </AnimatedWrapper>
          )}
          {(content.ctaSecondaryText || isEditing) && (
            <AnimatedWrapper animation={content.ctaSecondaryAnim || "fade-in"} delay={0.5}>
              <div data-field="ctaSecondaryText" style={{ display: "contents" }}>
                <HeroButton href={content.ctaSecondaryLink} primary={false} isEditing={isEditing}>
                  <InlineText
                    tagName="span"
                    value={content.ctaSecondaryText || "Boton Secundario"}
                    onChange={(v) => updateField("ctaSecondaryText", v)}
                    isEditing={isEditing}
                    dataField="ctaSecondaryText"
                  />
                </HeroButton>
              </div>
            </AnimatedWrapper>
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
  isEditing,
}: {
  children: React.ReactNode;
  href?: string;
  primary: boolean;
  isEditing: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const bg = primary
    ? hovered ? "#E8D5A8" : "#C8A96E"
    : hovered ? "rgba(200,169,110,0.18)" : "rgba(200,169,110,0.06)";

  return (
    <SmartLink
      href={href}
      isEditing={isEditing}
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
    </SmartLink>
  );
}
