"use client";

import React, { useRef, useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  onStyleChange?: (newStyles: any) => void;
  isEditing?: boolean;
  tagName?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "em";
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  dataField?: string;
  styles?: any; // Existing style object from content
};

export function InlineText({
  value,
  onChange,
  onStyleChange,
  isEditing = false,
  tagName = "span",
  style,
  className,
  placeholder,
  dataField,
  styles = {},
}: Props) {
  const elementRef = useRef<HTMLElement>(null);
  const [showPlus, setShowPlus] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (elementRef.current && elementRef.current !== document.activeElement) {
      elementRef.current.innerText = value || "";
    }
  }, [value]);

  if (!isEditing) {
    return React.createElement(tagName, { style, className, "data-field": dataField }, value || placeholder);
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

  const handleFocus = (e: React.FocusEvent) => {
    const rect = e.target.getBoundingClientRect();
    setToolbarPos({ top: rect.top - 40, left: rect.left });
    setShowPlus(true);
  };

  const toggleToolbar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowToolbar(!showToolbar);
  };

  return (
    <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
      {showPlus && (
        <button
          onClick={toggleToolbar}
          style={{
            position: "absolute",
            top: "-24px",
            right: "0",
            background: "#875BF7",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {showToolbar ? "×" : "+"}
        </button>
      )}

      {showToolbar && onStyleChange && (
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "100%",
            left: "0",
            marginBottom: "30px",
            background: "#1A1A1A",
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "1rem",
            zIndex: 10000,
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            width: "280px",
            color: "#fff",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.8rem",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={tLabelStyle}>Tamaño</label>
              <input 
                value={styles.fontSize || ""} 
                onChange={(e) => onStyleChange({ fontSize: e.target.value })} 
                placeholder="2rem" style={tInputStyle} 
              />
            </div>
            <div>
              <label style={tLabelStyle}>Color</label>
              <input 
                type="color" 
                value={styles.color || "#F5F0E8"} 
                onChange={(e) => onStyleChange({ color: e.target.value })} 
                style={{ ...tInputStyle, height: "32px", padding: "2px" }} 
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "5px", marginBottom: "15px", flexWrap: "wrap" }}>
            <ToolbarBtn active={styles.bold} onClick={() => onStyleChange({ bold: !styles.bold })}>B</ToolbarBtn>
            <ToolbarBtn active={styles.italic} onClick={() => onStyleChange({ italic: !styles.italic })}>I</ToolbarBtn>
            <ToolbarBtn active={styles.underline} onClick={() => onStyleChange({ underline: !styles.underline })}>U</ToolbarBtn>
            <ToolbarBtn active={styles.strikethrough} onClick={() => onStyleChange({ strikethrough: !styles.strikethrough })}>S</ToolbarBtn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={tLabelStyle}>Interlineado</label>
              <input 
                value={styles.lineHeight || ""} 
                onChange={(e) => onStyleChange({ lineHeight: e.target.value })} 
                placeholder="1.5" style={tInputStyle} 
              />
            </div>
            <div>
              <label style={tLabelStyle}>Interletrado</label>
              <input 
                value={styles.letterSpacing || ""} 
                onChange={(e) => onStyleChange({ letterSpacing: e.target.value })} 
                placeholder="0.1em" style={tInputStyle} 
              />
            </div>
          </div>

          <div>
            <label style={tLabelStyle}>Animación</label>
            <select 
              value={styles.animation || "none"} 
              onChange={(e) => onStyleChange({ animation: e.target.value })}
              style={tInputStyle}
            >
              <option value="none">Ninguna</option>
              <option value="fade-in">Fade In</option>
              <option value="slide-up">Slide Up</option>
              <option value="pop-in">Pop In</option>
              <option value="reveal">Revelar</option>
            </select>
          </div>
        </div>
      )}

      {React.createElement(tagName, {
        ref: elementRef,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: () => { handleBlur(); setShowPlus(false); },
        onFocus: handleFocus,
        onKeyDown: handleKeyDown,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        style: {
          ...style,
          outline: "none",
          minWidth: "20px",
          minHeight: "1em",
          cursor: "text",
          borderRadius: "2px",
          padding: "0 4px",
          border: "1px dashed transparent",
          transition: "background 0.2s, border 0.2s",
          ...(isEditing && {
             background: showPlus ? "rgba(135, 91, 247, 0.08)" : "transparent",
             border: showPlus ? "1px dashed rgba(135, 91, 247, 0.3)" : "1px dashed transparent",
          }),
          ...styles, 
          fontWeight: styles.bold ? 700 : (styles.fontWeight || style?.fontWeight),
          fontStyle: styles.italic ? "italic" : (styles.fontStyle || style?.fontStyle),
          textDecoration: `${styles.underline ? 'underline ' : ''}${styles.strikethrough ? 'line-through' : ''}` || style?.textDecoration,
        },
        className,
        "data-placeholder": placeholder,
        "data-field": dataField,
      })}
    </div>
  );
}

function ToolbarBtn({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "32px",
        height: "32px",
        background: active ? "#875BF7" : "#333",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "12px",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

const tLabelStyle = {
  display: "block",
  fontSize: "0.65rem",
  color: "#9CA3AF",
  marginBottom: "4px",
  textTransform: "uppercase" as const,
  fontWeight: 600,
};

const tInputStyle = {
  width: "100%",
  background: "#2A2A2A",
  border: "1px solid #444",
  borderRadius: "4px",
  color: "#fff",
  padding: "4px 8px",
  fontSize: "0.75rem",
  outline: "none",
};

