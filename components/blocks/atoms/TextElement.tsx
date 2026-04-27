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

  return (
    <div
      style={{
        margin: styles.margin || "0 0 1rem 0",
        padding: styles.padding || "0",
        color: styles.color || "rgba(245,240,232,0.8)",
        textAlign: styles.textAlign || "inherit",
        fontSize: "1rem",
        lineHeight: 1.7,
      }}
    >
      <InlineText
        value={element.body}
        onChange={(v) => onUpdate?.({ ...element, body: v })}
        isEditing={isEditing}
        tagName="div"
      />
    </div>
  );
}
