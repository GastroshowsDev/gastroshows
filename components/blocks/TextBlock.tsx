import { useState, useEffect } from "react";
import type { TextContent } from "@/lib/blocks/types";
import { getAnimationStyles, getHoverStyles } from "@/lib/blocks/animations";
import { InlineText } from "@/components/admin/InlineText";

type Props = { 
  content: TextContent;
  isEditing?: boolean;
  onUpdate?: (newContent: TextContent) => void;
};

export function TextBlock({ content, isEditing = false, onUpdate }: Props) {
  const align = content.alignment ?? "center";
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typedBody, setTypedBody] = useState("");

  const updateField = (field: keyof TextContent, value: any) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (content.animation === "typewriter" && ready) {
      let i = 0;
      const fullText = content.body || "";
      const interval = setInterval(() => {
        setTypedBody(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setTypedBody(content.body || "");
    }
  }, [content.body, content.animation, ready]);

  const animStyles = getAnimationStyles(content.animation, ready);
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
      <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: align, ...animStyles }}>
        {(content.eyebrow || isEditing) && (
          <div data-field="eyebrow">
            <InlineText
              tagName="p"
              value={content.eyebrow || ""}
              onChange={(v) => updateField("eyebrow", v)}
              isEditing={isEditing}
              placeholder="SECCIÓN"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                marginBottom: "1rem",
              }}
            />
          </div>
        )}

        {(content.title || isEditing) && (
          <h2
            data-field="title"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.2,
              marginBottom: content.body ? "1.5rem" : 0,
            }}
          >
            <InlineText
              tagName="span"
              value={content.title || ""}
              onChange={(v) => updateField("title", v)}
              isEditing={isEditing}
              placeholder="Título"
            />
            {(content.titleAccent || isEditing) && (
              <>
                <br />
                <InlineText
                  tagName="em"
                  data-field="titleAccent"
                  value={content.titleAccent || ""}
                  onChange={(v) => updateField("titleAccent", v)}
                  isEditing={isEditing}
                  placeholder="Acento"
                  style={{ color: "var(--gs-gold)" }}
                />
              </>
            )}
          </h2>
        )}

        {(content.body || isEditing) && (
          <div
            data-field="body"
            style={{
              fontSize: content.fontSize || "1.1rem",
              lineHeight: "1.7",
              color: content.color || "rgba(245,240,232,0.7)",
              fontWeight: content.bold ? "bold" : "normal",
              fontStyle: content.italic ? "italic" : "normal",
              maxWidth: "800px",
              margin: content.alignment === "center" ? "0 auto" : "0",
              whiteSpace: "pre-wrap",
            }}
          >
            <InlineText
              tagName="div"
              value={typedBody}
              onChange={(v) => updateField("body", v)}
              isEditing={isEditing}
              placeholder="Escribe el contenido aquí..."
            />
          </div>
        )}
      </div>
    </section>
  );
}
