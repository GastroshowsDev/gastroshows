"use client";

import Image from "next/image";
import { useState } from "react";
import { InlineText } from "@/components/admin/InlineText";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { SmartLink } from "./SmartLink";
import { ColumnsRenderer } from "./atoms/ColumnsRenderer";
import type { CtaContent } from "@/lib/blocks/types";

type Props = { 
  id: string;
  content: CtaContent;
  isEditing?: boolean;
  onUpdate?: (newContent: CtaContent) => void;
  onSelectElement?: (colIndex: number, elIndex: number) => void;
  selectedElementPath?: { col: number; el: number } | null;
};

export function CtaBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const [hovered, setHovered] = useState(false);

  const handleUpdate = (field: keyof CtaContent, value: any) => {
    if (onUpdate) onUpdate({ ...content, [field]: value });
  };

  const TitleTag = content.titleTag || "h2";
  const overlayOpacity = (content as any).overlayOpacity ?? 1;
  const brightness = (content as any).brightness ?? 1;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "400px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: content.bgImage ? "transparent" : "var(--gs-bg)",
        marginTop: (content as any).marginTop || "0px",
        marginBottom: (content as any).marginBottom || "0px",
        paddingTop: (content as any).paddingTop || "0px",
        paddingBottom: (content as any).paddingBottom || "0px",
      }}
    >
      {content.bgImage && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={content.bgImage}
            alt=""
            fill
            loading="lazy"
            className="gs-bg-image"
            style={{ objectFit: "cover", objectPosition: content.bgPosition || "center 30%", "--img-brightness": brightness } as any}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, rgba(5,5,5,${0.92 * overlayOpacity}) 0%, rgba(5,5,5,${0.75 * overlayOpacity}) 50%, rgba(5,5,5,${0.55 * overlayOpacity}) 100%)`,
            }}
          />
        </div>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem",
          textAlign: content.bgImage ? "left" : "center",
        }}
      >
        {content.eyebrow !== undefined && (
          <AnimatedWrapper animation={content.eyebrowAnim || "fade-in"}>
            <div
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                fontWeight: 700,
                marginBottom: "1rem",
                opacity: 1,
              }}
            >
              <InlineText
                tagName="span"
                value={content.eyebrow}
                onChange={(v) => handleUpdate("eyebrow", v)}
                isEditing={isEditing}
                styles={content.eyebrowStyles}
                onStyleChange={(s) => onUpdate?.({ ...content, eyebrowStyles: { ...content.eyebrowStyles, ...s } })}
                dataField="eyebrow"
              />
            </div>
          </AnimatedWrapper>
        )}

        <AnimatedWrapper animation={content.titleAnim || "fade-in"}>
          <TitleTag
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              color: content.bgImage ? "#F5F0E8" : "var(--gs-text)",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            <InlineText
              tagName="span"
              value={content.title}
              onChange={(v) => handleUpdate("title", v)}
              isEditing={isEditing}
              styles={content.titleStyles}
              onStyleChange={(s) => onUpdate?.({ ...content, titleStyles: { ...content.titleStyles, ...s } })}
              currentTag={TitleTag}
              onTagChange={(t) => handleUpdate("titleTag", t)}
              dataField="title"
            />
            {(content.titleAccent || isEditing) && (
              <>
                <br />
                <em style={{ 
                  color: "var(--gs-gold)", 
                  fontStyle: "italic",
                  textShadow: (content.titleAccent || "").toLowerCase().includes("antes de que llegues") 
                    ? "none" 
                    : "var(--gs-gold-shadow)"
                }}>
                  <InlineText
                    tagName="span"
                    value={content.titleAccent || ""}
                    onChange={(v) => handleUpdate("titleAccent", v)}
                    isEditing={isEditing}
                    styles={content.titleAccentStyles}
                    onStyleChange={(s) => onUpdate?.({ ...content, titleAccentStyles: { ...content.titleAccentStyles, ...s } })}
                    dataField="titleAccent"
                  />
                </em>
              </>
            )}
          </TitleTag>
        </AnimatedWrapper>

        {content.body !== undefined && (
          <AnimatedWrapper animation={content.bodyAnim || "fade-in"} delay={0.2}>
            <div
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: content.bgImage ? "rgba(245,240,232,0.85)" : "var(--gs-text-sub)",
                marginBottom: "2rem",
              }}
            >
              <InlineText
                tagName="span"
                value={content.body}
                onChange={(v) => handleUpdate("body", v)}
                isEditing={isEditing}
                styles={content.bodyStyles}
                onStyleChange={(s) => onUpdate?.({ ...content, bodyStyles: { ...content.bodyStyles, ...s } })}
                dataField="body"
              />
            </div>
          </AnimatedWrapper>
        )}

        {(content.buttonText || isEditing) && (
          <AnimatedWrapper animation={content.buttonAnim || "fade-in"} delay={0.4}>
            <div style={{ display: "contents" }}>
              <SmartLink
                href={content.buttonLink}
                isEditing={isEditing}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: "inline-block",
                  background: hovered ? "#E8D5A8" : "#daa520",
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
                  borderRadius: "9999px",
                  transform: hovered ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hovered ? "0 12px 36px rgba(200,169,110,0.4)" : "none",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <InlineText
                  value={content.buttonText || "Boton"}
                  onChange={(v) => handleUpdate("buttonText", v)}
                  isEditing={isEditing}
                  styles={content.buttonStyles}
                  onStyleChange={(s) => onUpdate?.({ ...content, buttonStyles: { ...content.buttonStyles, ...s } })}
                  dataField="buttonText"
                />
              </SmartLink>
            </div>
          </AnimatedWrapper>
        )}

        {/* Unlock elements support */}
        <div style={{ marginTop: "3rem" }}>
          <ColumnsRenderer 
            blockId={blockId}
            columns={content.columns || []}
            isEditing={isEditing}
            onUpdate={(newCols) => handleUpdate("columns", newCols)}
            onSelectElement={onSelectElement}
            selectedElementPath={selectedElementPath}
          />
        </div>
      </div>
    </section>
  );
}
