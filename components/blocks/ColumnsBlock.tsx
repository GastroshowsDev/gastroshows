"use client";

import type { ColumnsContent, BlockType, BlockContent } from "@/lib/blocks/types";
import { BlockRenderer } from "./BlockRenderer";

type Props = { 
  content: ColumnsContent;
  isEditing?: boolean;
  onUpdate?: (newContent: ColumnsContent) => void;
};

export function ColumnsBlock({ content, isEditing = false, onUpdate }: Props) {
  const cols = content.columns ?? 2;
  const children = content.children ?? [];

  return (
    <section style={{ padding: "3rem 2rem", background: "var(--gs-bg)" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "2rem",
        }}
      >
        {Array.from({ length: cols }, (_, colIndex) => (
          <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(children[colIndex] ?? []).map((child) => (
              <BlockRenderer
                key={child.id}
                isEditing={isEditing}
                block={{
                  id: child.id,
                  type: child.type as BlockType,
                  content: child.content as BlockContent,
                  order: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
