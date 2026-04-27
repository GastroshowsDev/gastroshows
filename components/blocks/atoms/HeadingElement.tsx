"use client";

import { HeadingElement as HeadingType } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";

type Props = {
  element: HeadingType;
  isEditing?: boolean;
  onUpdate?: (newElement: HeadingType) => void;
};

export function HeadingElement({ element, isEditing = false, onUpdate }: Props) {
  const Tag = `h${element.level}` as any;
  const { styles = {} } = element;

  return (
    <Tag
      style={{
        margin: styles.margin || "0 0 1.5rem 0",
        padding: styles.padding || "0",
        color: styles.color || "var(--gs-text)",
        textAlign: styles.textAlign || "inherit",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontWeight: 300,
        lineHeight: 1.2,
        fontSize: `calc(1em * ${7 - element.level} * 0.4 + 1rem)`, // Dynamic scaling
      }}
    >
      <InlineText
        value={element.text}
        onChange={(v) => onUpdate?.({ ...element, text: v })}
        isEditing={isEditing}
        tagName="span"
      />
      {element.accentText && (
        <span style={{ color: "var(--gs-gold)", fontStyle: "italic", marginLeft: "0.5rem" }}>
           <InlineText
            value={element.accentText}
            onChange={(v) => onUpdate?.({ ...element, accentText: v })}
            isEditing={isEditing}
            tagName="em"
          />
        </span>
      )}
    </Tag>
  );
}
