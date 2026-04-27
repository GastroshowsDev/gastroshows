import { useState, useEffect } from "react";
import type { TextContent } from "@/lib/blocks/types";
import { getAnimationStyles, getHoverStyles } from "@/lib/blocks/animations";

type Props = { content: TextContent };

export function TextBlock({ content }: Props) {
  const align = content.alignment ?? "center";
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typedBody, setTypedBody] = useState("");

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
        {content.eyebrow && (
          <p
            data-field="eyebrow"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            {content.eyebrow}
          </p>
        )}

        {content.title && (
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
            {content.title}
            {content.titleAccent && (
              <>
                <br />
                <em data-field="titleAccent" style={{ color: "var(--gs-gold)" }}>{content.titleAccent}</em>
              </>
            )}
          </h2>
        )}

        {content.body && (
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
            {typedBody}
          </div>
      </div>
    </section>
  );
}
