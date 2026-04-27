"use client";

import type { SpacerContent } from "@/lib/blocks/types";

type Props = { 
  content: SpacerContent;
  isEditing?: boolean;
  onUpdate?: (newContent: SpacerContent) => void;
};

const GRADIENTS: Record<string, string> = {
  none: "transparent",
  "dark-to-light": "linear-gradient(to bottom, #050505 0%, #050505 15%, var(--gs-bg) 100%)",
  "light-to-dark": "linear-gradient(to bottom, var(--gs-bg) 0%, var(--gs-bg) 15%, #050505 100%)",
};

export function SpacerBlock({ content, isEditing = false, onUpdate }: Props) {
  const h = content.height ?? 120;
  const grad = content.gradient ?? "none";

  return (
    <div
      style={{
        height: `${h}px`,
        background: GRADIENTS[grad] ?? "transparent",
        pointerEvents: "none",
        flexShrink: 0,
      }}
    />
  );
}
