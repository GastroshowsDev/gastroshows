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
        color: styles.color || undefined,
        textAlign: styles.textAlign || "inherit",
        fontSize: styles.fontSize || undefined,
        fontWeight: styles.fontWeight || undefined,
      }}
    >
      <InlineText
        value={element.text}
        onChange={(v) => onUpdate?.({ ...element, text: v })}
        isEditing={isEditing}
        tagName="span"
        styles={element.styles}
        onStyleChange={(s) => onUpdate?.({ ...element, styles: { ...element.styles, ...s } })}
        currentTag={Tag}
        onTagChange={(t) => {
          const level = parseInt(t.replace("h", ""));
          if (!isNaN(level)) onUpdate?.({ ...element, level: level as any });
        }}
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
