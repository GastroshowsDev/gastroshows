"use client";

import type { TextContent } from "@/lib/blocks/types";

type Props = { content: TextContent };

export function TextBlock({ content }: Props) {
  const align = content.alignment ?? "center";

  return (
    <section
      style={{
        padding: "5rem 2rem 6rem",
        background: "var(--gs-bg)",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: align }}>
        {content.eyebrow && (
          <p
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
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.2,
              marginBottom: content.body ? "1.5rem" : 0,
              transition: "color 0.3s",
            }}
          >
            {content.title}
            {content.titleAccent && (
              <>
                <br />
                <em style={{ color: "var(--gs-gold)" }}>{content.titleAccent}</em>
              </>
            )}
          </h2>
        )}

        {content.body && (
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "var(--gs-text-sub)",
              maxWidth: align === "center" ? "600px" : undefined,
              margin: align === "center" ? "0 auto" : undefined,
              transition: "color 0.3s",
            }}
          >
            {content.body}
          </p>
        )}
      </div>
    </section>
  );
}
