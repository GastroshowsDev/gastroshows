"use client";
 
import { useState } from "react";

import { ButtonElement as ButtonType } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";
import { SmartLink } from "../SmartLink";

type Props = {
  element: ButtonType;
  isEditing?: boolean;
  onUpdate?: (newElement: ButtonType) => void;
};

export function ButtonElement({ element, isEditing = false, onUpdate }: Props) {
  const [hover, setHover] = useState(false);
  const { styles = {} } = element;

  const getVariantStyles = () => {
    const baseVariant = (() => {
      switch (element.variant) {
        case "primary":
          return {
            background: hover ? "var(--gs-gold-hover)" : "var(--gs-gold)",
            color: "#0F0F0F",
            border: "none",
          };
        case "outline":
          return {
            background: hover ? "rgba(218,165,32,0.08)" : "transparent",
            color: "var(--gs-gold)",
            border: "1px solid var(--gs-border-hover)",
          };
        default:
          return {
            background: hover ? "#2A2A2A" : "#1A1A1A",
            color: "var(--gs-text)",
            border: "1px solid var(--gs-border)",
          };
      }
    })();

    // Override text color if specifically set
    if (styles.color) {
      baseVariant.color = styles.color;
    }

    return baseVariant;
  };

  return (
    <div style={{ textAlign: styles.textAlign as any || "left", margin: styles.margin || "1rem 0" }}>
      <SmartLink
        href={element.link}
        isEditing={isEditing}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`gs-btn-${element.variant || "primary"}`}
        style={{
          display: "inline-block",
          padding: element.size === "lg" ? "1rem 2.8rem" : "0.75rem 1.8rem",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: styles.borderRadius || "4px",
          transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          cursor: "pointer",
          ...getVariantStyles(),
          ...(styles.backgroundColor ? { background: styles.backgroundColor } : {}),
          ...(styles.color ? { color: styles.color } : {}),
        }}
      >
        <InlineText
          value={element.text}
          onChange={(v) => onUpdate?.({ ...element, text: v })}
          isEditing={isEditing}
          tagName="span"
          style={{ background: "transparent", border: "none", padding: 0 }}
        />
      </SmartLink>
    </div>
  );
}
