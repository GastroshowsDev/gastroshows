"use client";

import { useState, useEffect } from "react";
import type { TextContent } from "@/lib/blocks/types";
import { getHoverStyles } from "@/lib/blocks/animations";
import { InlineText } from "@/components/admin/InlineText";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { ColumnsRenderer } from "./atoms/ColumnsRenderer";

type Props = { 
  id: string;
  content: TextContent;
  isEditing?: boolean;
  onUpdate?: (newContent: TextContent) => void;
  onSelectElement?: (colIndex: number, elIndex: number) => void;
  selectedElementPath?: { col: number; el: number } | null;
};

const SHADOW_PHRASES = ["experiencias únicas", "que une a cualquier equipo"];
const shouldHaveShadow = (text?: string) => {
  if (!text) return false;
  const lower = text.toLowerCase();
  return SHADOW_PHRASES.some(phrase => lower.includes(phrase));
};

export function TextBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const align = content.alignment ?? "center";
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typedBody, setTypedBody] = useState("");
  const TitleTag = content.titleTag || "h2";

  const updateField = (field: keyof TextContent, value: any) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setTypedBody(content.body || "");
  }, [content.body, content.animation, ready]);

  const hoverStyles = getHoverStyles(content.hoverEffect, hovered);

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "5rem 2rem 6rem",
        background: "var(--gs-bg)",
        transition: "background 0.3s",
        ...hoverStyles,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: align }}>
        {(content.eyebrow || isEditing) && (
          <AnimatedWrapper animation={content.eyebrowAnim || "fade-in"}>
            <InlineText
              tagName="p"
              value={content.eyebrow || ""}
              onChange={(v) => updateField("eyebrow", v)}
              isEditing={isEditing}
              styles={content.eyebrowStyles}
              onStyleChange={(s) => updateField("eyebrowStyles", { ...content.eyebrowStyles, ...s })}
              dataField="eyebrow"
              placeholder="SECCIÓN"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                marginBottom: "1rem",
              }}
            />
          </AnimatedWrapper>
        )}

        {(content.title || isEditing) && (
          <AnimatedWrapper animation={content.titleAnim || content.animation || "fade-in"}>
            <TitleTag
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                lineHeight: 1.2,
                marginBottom: content.body ? "1.5rem" : 0,
              }}
              className={shouldHaveShadow(content.title) ? "shadow-revelado-dark" : ""}
            >
              <InlineText
                tagName="span"
                value={content.title || ""}
                onChange={(v) => updateField("title", v)}
                isEditing={isEditing}
                styles={content.titleStyles}
                onStyleChange={(s) => updateField("titleStyles", { ...content.titleStyles, ...s })}
                currentTag={TitleTag}
                onTagChange={(t) => updateField("titleTag", t)}
                dataField="title"
                placeholder="Título"
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
                    style={{ color: "var(--gs-gold)" }}
                  />
                </>
              )}
            </TitleTag>
          </AnimatedWrapper>
        )}

        {(content.body || isEditing) && (
          <AnimatedWrapper animation={content.bodyAnim || "fade-in"} delay={0.2}>
            <div
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "rgba(245,240,232,0.7)",
                maxWidth: "1100px",
                margin: content.alignment === "center" ? "0 auto" : "0",
                whiteSpace: "pre-wrap",
                marginBottom: "3rem"
              }}
              className={shouldHaveShadow(content.body) ? "shadow-revelado-dark" : ""}
            >
              <InlineText
                tagName="div"
                value={typedBody}
                onChange={(v) => updateField("body", v)}
                isEditing={isEditing}
                styles={content.bodyStyles}
                onStyleChange={(s) => updateField("bodyStyles", { ...content.bodyStyles, ...s })}
                dataField="body"
                placeholder="Escribe el contenido aquí..."
              />
            </div>
          </AnimatedWrapper>
        )}

        {/* Extra elements support */}
        <ColumnsRenderer 
          blockId={blockId}
          columns={content.columns || []}
          isEditing={isEditing}
          onUpdate={(newCols) => updateField("columns", newCols)}
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
        />
      </div>
    </section>
  );
}
