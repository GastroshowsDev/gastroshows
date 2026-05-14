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
            color: "#0A0A0A",
            border: "none",
          };
        case "outline":
          return {
            background: hover ? "rgba(218,165,32,0.1)" : "transparent",
            color: "var(--gs-gold)",
            border: "1px solid var(--gs-gold)",
          };
        default:
          return {
            background: hover ? "#333" : "#222",
            color: "white",
            border: "none",
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
          padding: element.size === "lg" ? "1rem 2.5rem" : "0.75rem 1.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: styles.borderRadius || undefined,
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
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
