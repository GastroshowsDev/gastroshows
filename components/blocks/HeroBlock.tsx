"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { HeroContent, ColumnData } from "@/lib/blocks/types";

import { InlineText } from "@/components/admin/InlineText";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { SmartLink } from "./SmartLink";
import { ColumnsRenderer } from "./atoms/ColumnsRenderer";

type Props = {
  id: string;
  content: HeroContent;
  isEditing?: boolean;
  onUpdate?: (newContent: HeroContent) => void;
  onSelectElement?: (path: string) => void;
  selectedElementPath?: string | null;
};

const SHADOW_PHRASES = ["experiencias únicas", "que une a cualquier equipo"];
const shouldHaveShadow = (text?: string) => {
  if (!text) return false;
  const lower = text.toLowerCase();
  return SHADOW_PHRASES.some(phrase => lower.includes(phrase));
};

import { VerticalResizeHandle } from "../admin/VerticalResizeHandle";

export function HeroBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const TitleTag = content.titleTag || "h1";

  const updateField = (field: keyof HeroContent, value: any) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  const handleResize = (deltaY: number) => {
    const currentHeight = (content as any).styles?.minHeight || (content as any).minHeight || "100dvh";
    let numericValue = 800; // Default fallback
    
    if (typeof currentHeight === "string") {
      const match = currentHeight.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (match) {
        numericValue = parseFloat(match[1]);
        const unit = match[2] || "px";
        if (unit === "dvh" || unit === "vh") numericValue = (numericValue / 100) * window.innerHeight;
      }
    } else if (typeof currentHeight === "number") {
      numericValue = currentHeight;
    }

    const newValue = Math.max(200, numericValue + deltaY);
    onUpdate?.({
      ...content,
      styles: {
        ...content.styles,
        minHeight: `${newValue}px`
      }
    });
  };

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setTypedTitle(content.title);
  }, [content.title, content.animation, ready]);

  const opacity = (content.overlayOpacity ?? 70) / 100;
  const brightness = (content as any).brightness ?? 1;

  return (
    <section
      style={{
        position: "relative",
        minHeight: (content as any).styles?.minHeight || (content as any).minHeight || "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: (content as any).marginTop || "0px",
        marginBottom: (content as any).marginBottom || "0px",
        paddingTop: (content as any).paddingTop || "0px",
        paddingBottom: (content as any).paddingBottom || "0px",
      }}
    >
      {/* ... existing layers ... */}
      {/* Background and Overlay */}
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
          <div className="gs-hero-bg-container" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
             {/* Mirror Layer (Blurred) */}
             {(content.styles?.backgroundSize === "mirror") && (
              <div 
                style={{
                  position: "absolute",
                  inset: "-20px",
                  backgroundImage: `url("${content.bgImage}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(50px) brightness(0.6)",
                  opacity: 0.8,
                }}
              />
            )}

            {/* Main Image Layer */}
            <div 
              className="gs-hero-bg-div" 
              style={{ 
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${content.bgImage}")`,
                backgroundSize: (content.styles?.backgroundSize === "mirror") ? "contain" : (content.styles?.backgroundSize || "cover"),
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                filter: `brightness(${brightness})`,
              }} 
            />
            <style jsx>{`
              @media (max-width: 768px) {
                .gs-hero-bg-div {
                  background-size: ${(content.styles?.backgroundSize === "mirror") ? "contain" : (content.styles?.backgroundSize || "cover")} !important;
                }
              }
            `}</style>
          </div>
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
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", width: "100%", padding: "4rem 2rem" }}>
        {/* ... content ... */}
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
                styles={content.eyebrowStyles}
                onStyleChange={(s) => updateField("eyebrowStyles", { ...content.eyebrowStyles, ...s })}
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
          <TitleTag
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.5rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              lineHeight: 1.05,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}
            className={shouldHaveShadow(content.title) ? "shadow-revelado-dark" : ""}
          >
            <InlineText
              tagName="span"
              value={typedTitle}
              onChange={(v) => updateField("title", v)}
              isEditing={isEditing}
              styles={content.titleStyles}
              onStyleChange={(s) => updateField("titleStyles", { ...content.titleStyles, ...s })}
              currentTag={TitleTag}
              onTagChange={(t) => updateField("titleTag", t)}
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
                  styles={content.titleAccentStyles}
                  onStyleChange={(s) => updateField("titleAccentStyles", { ...content.titleAccentStyles, ...s })}
                  dataField="titleAccent"
                  placeholder="Acento"
                  style={{ 
                    color: "#daa520", 
                    fontStyle: "italic",
                    textShadow: (content.titleAccent || "").toLowerCase().includes("antes de que llegues") 
                      ? "none" 
                      : "var(--gs-gold-shadow)"
                  }}
                />
              </>
            )}
          </TitleTag>
        </AnimatedWrapper>

        {(content.subtitle || isEditing) && (
          <AnimatedWrapper animation={content.subtitleAnim || "fade-in"} delay={0.2}>
            <div
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
                styles={content.subtitleStyles}
                onStyleChange={(s) => updateField("subtitleStyles", { ...content.subtitleStyles, ...s })}
                dataField="subtitle"
                placeholder="Subtítulo o descripción corta"
              />
            </div>
          </AnimatedWrapper>
        )}

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3rem"
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
                    styles={content.ctaPrimaryStyles}
                    onStyleChange={(s) => updateField("ctaPrimaryStyles", { ...content.ctaPrimaryStyles, ...s })}
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
                    styles={content.ctaSecondaryStyles}
                    onStyleChange={(s) => updateField("ctaSecondaryStyles", { ...content.ctaSecondaryStyles, ...s })}
                    dataField="ctaSecondaryText"
                  />
                </HeroButton>
              </div>
            </AnimatedWrapper>
          )}
        </div>

        {/* Extra Elements (The "Unlock") */}
        <ColumnsRenderer 
          blockId={blockId}
          columns={content.columns || []}
          isEditing={isEditing}
          onUpdate={(newCols) => updateField("columns", newCols)}
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
        />
      </div>

      {isEditing && (
        <VerticalResizeHandle onResize={handleResize} onResizeEnd={() => {}} />
      )}
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
    ? hovered ? "#E8D5A8" : "#daa520"
    : hovered ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.4)";

  return (
    <SmartLink
      href={href}
      isEditing={isEditing}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={primary ? "gs-btn-primary" : "gs-btn-secondary"}
      style={{
        display: "inline-block",
        padding: "1.1rem 3rem",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "9999px",
        boxShadow: hovered
          ? primary
            ? "0 12px 36px rgba(200,169,110,0.4)"
            : "0 10px 32px rgba(200,169,110,0.25)"
          : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {children}
    </SmartLink>
  );
}
