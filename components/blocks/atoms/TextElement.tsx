"use client";

import { TextElement as TextType } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";

type Props = {
  element: TextType;
  isEditing?: boolean;
  onUpdate?: (newElement: TextType) => void;
};

export function TextElement({ element, isEditing = false, onUpdate }: Props) {
  const { styles = {} } = element;
  const Tag = element.tagName || "div";

  return (
    <Tag
      style={{
        margin: styles.margin || "0 0 1.5rem 0",
        padding: styles.padding || "0",
        color: styles.color || "var(--gs-text-sub)",
        textAlign: styles.textAlign || "inherit",
        fontSize: styles.fontSize || "1rem",
        lineHeight: 1.8,
        fontWeight: 300,
      }}
    >
      <InlineText
        value={element.body}
        onChange={(v) => onUpdate?.({ ...element, body: v })}
        isEditing={isEditing}
        tagName="span"
        styles={element.styles}
        onStyleChange={(s) => onUpdate?.({ ...element, styles: { ...element.styles, ...s } })}
        currentTag={Tag}
        onTagChange={(t) => onUpdate?.({ ...element, tagName: t })}
      />
    </Tag>
  );
}
