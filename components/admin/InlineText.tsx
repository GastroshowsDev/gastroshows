"use client";

import React, { useRef, useEffect } from "react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  isEditing?: boolean;
  tagName?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "em";
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
};

/**
 * A wrapper that makes text editable directly in the UI when isEditing is true.
 * Uses contentEditable for a true WYSIWYG experience.
 */
export function InlineText({
  value,
  onChange,
  isEditing = false,
  tagName = "div",
  style,
  className,
  placeholder,
}: Props) {
  const elementRef = useRef<HTMLElement>(null);

  // Sync content with value if external change happens (and not focused)
  useEffect(() => {
    if (elementRef.current && elementRef.current !== document.activeElement) {
      elementRef.current.innerText = value || "";
    }
  }, [value]);

  if (!isEditing) {
    return React.createElement(tagName, { style, className }, value || placeholder);
  }

  const handleBlur = () => {
    if (elementRef.current) {
      onChange(elementRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagName !== "p" && tagName !== "div") {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  return React.createElement(tagName, {
    ref: elementRef,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    // Prevent the block selection/smart focus from firing when we want to edit text
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
    style: {
      ...style,
      outline: "none",
      minWidth: "20px",
      minHeight: "1em",
      cursor: "text",
      background: "rgba(135, 91, 247, 0.15)", // More visible highlight
      borderRadius: "2px",
      padding: "0 4px",
      border: "1px dashed rgba(135, 91, 247, 0.3)",
    },
    className,
    "data-placeholder": placeholder,
  });
}
