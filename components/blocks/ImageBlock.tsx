"use client";

import Image from "next/image";
import type { ImageContent } from "@/lib/blocks/types";

type Props = { 
  content: ImageContent;
  isEditing?: boolean;
  onUpdate?: (newContent: ImageContent) => void;
};

export function ImageBlock({ content, isEditing = false, onUpdate }: Props) {
  if (!content.src) return null;

  return (
    <section
      style={{
        padding: content.fullWidth ? 0 : "3rem 2rem",
        background: "var(--gs-bg)",
      }}
    >
      <div
        style={{
          maxWidth: content.fullWidth ? "100%" : "900px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: content.fullWidth ? 0 : "2px",
          }}
        >
          <Image
            src={content.src}
            alt={content.alt || ""}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        </div>

        {content.caption && (
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--gs-muted)",
              marginTop: "0.75rem",
              textAlign: "center",
              fontStyle: "italic",
              padding: content.fullWidth ? "0 2rem" : 0,
            }}
          >
            {content.caption}
          </p>
        )}
      </div>
    </section>
  );
}
