"use client";

import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const FONTS = [
  { label: "Por defecto",  value: "" },
  { label: "Cormorant",    value: "'Cormorant Garamond', serif" },
  { label: "Montserrat",   value: "'Montserrat', sans-serif" },
  { label: "Georgia",      value: "Georgia, serif" },
  { label: "Arial",        value: "Arial, sans-serif" },
  { label: "Courier New",  value: "'Courier New', monospace" },
];

const ANIMATIONS = [
  { label: "Ninguna",  value: "" },
  { label: "Fade In",  value: "fade-in" },
  { label: "Slide Up", value: "slide-up" },
  { label: "Pop In",   value: "pop-in" },
  { label: "Revelar",  value: "reveal" },
];

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
  styles?: any;
  currentTag?: string;
  onTagChange?: (newTag: any) => void;
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
  currentTag,
  onTagChange,
}: Props) {
  const elementRef  = useRef<HTMLElement>(null);
  const toolbarRef  = useRef<HTMLDivElement>(null);
  const plusBtnRef  = useRef<HTMLButtonElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [isFocused,    setIsFocused]    = useState(false);
  const [showToolbar,  setShowToolbar]  = useState(false);
  const [elemRect,     setElemRect]     = useState<DOMRect | null>(null);
  const [mounted,      setMounted]      = useState(false);

  // toolbarMouseDownRef prevents contentEditable blur from closing the toolbar
  // when the user mousedowns inside the toolbar (mousedown fires before blur).
  const toolbarMouseDownRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (elementRef.current && elementRef.current !== document.activeElement) {
      elementRef.current.innerText = value || "";
    }
  }, [value]);

  // Close toolbar when clicking outside element + toolbar + button
  useEffect(() => {
    if (!showToolbar) return;
    const handle = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        elementRef.current?.contains(t) ||
        toolbarRef.current?.contains(t) ||
        plusBtnRef.current?.contains(t)
      ) return;
      setShowToolbar(false);
      setIsFocused(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [showToolbar]);

  if (!isEditing) {
    return React.createElement(tagName, { style, className, "data-field": dataField }, value || placeholder);
  }

  const refreshRect = () => {
    if (elementRef.current) setElemRect(elementRef.current.getBoundingClientRect());
  };

  const handleFocus = () => {
    setIsFocused(true);
    refreshRect();
  };

  const handleBlur = () => {
    if (elementRef.current) onChangeRef.current(elementRef.current.innerText);
    if (toolbarMouseDownRef.current) {
      toolbarMouseDownRef.current = false;
      return; // toolbar click caught — don't close
    }
    if (!showToolbar) {
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagName !== "p" && tagName !== "div") {
      e.preventDefault();
      elementRef.current?.blur();
    }
    if (e.key === "Escape") {
      setShowToolbar(false);
      elementRef.current?.blur();
    }
  };

  const handlePlusMouseDown = (e: React.MouseEvent) => {
    toolbarMouseDownRef.current = true;
    e.preventDefault(); // keep contentEditable focused
  };
  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    refreshRect();
    setShowToolbar(v => !v);
  };
  const handleToolbarMouseDown = () => {
    toolbarMouseDownRef.current = true;
  };

  const sc = (partial: any) => onStyleChange?.(partial);

  // Toolbar vertical position: above the element, or below if not enough room
  const spaceAbove = elemRect ? elemRect.top : 999;
  const toolbarHeight = 72;
  const toolbarTop = elemRect
    ? spaceAbove >= toolbarHeight + 8
      ? elemRect.top - toolbarHeight - 8
      : elemRect.bottom + 8
    : 0;

  const hasStyleChange = !!onStyleChange;

  const plusButton = mounted && isFocused && elemRect && hasStyleChange
    ? createPortal(
        <button
          ref={plusBtnRef}
          onMouseDown={handlePlusMouseDown}
          onClick={handlePlusClick}
          title={showToolbar ? "Cerrar formato" : "Abrir formato"}
          style={{
            position:     "fixed",
            top:          elemRect.top - 12,
            left:         elemRect.right - 12,
            width:        "24px",
            height:       "24px",
            borderRadius: "50%",
            background:   showToolbar ? "#6B46C1" : "#875BF7",
            color:        "white",
            border:       "none",
            fontSize:     "18px",
            lineHeight:   1,
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            cursor:       "pointer",
            zIndex:       99998,
            boxShadow:    "0 2px 10px rgba(135,91,247,0.45)",
            transition:   "background 0.15s, transform 0.15s",
            transform:    showToolbar ? "rotate(45deg)" : "none",
            userSelect:   "none",
          }}
        >
          +
        </button>,
        document.body
      )
    : null;

  const toolbar = mounted && showToolbar && hasStyleChange && elemRect
    ? createPortal(
        <div
          ref={toolbarRef}
          onMouseDown={handleToolbarMouseDown}
          onClick={(e) => e.stopPropagation()}
          style={{
            position:       "fixed",
            top:            toolbarTop,
            left:           "50%",
            transform:      "translateX(-50%)",
            zIndex:         99999,
            background:     "#111",
            border:         "1px solid #252525",
            borderRadius:   "12px",
            padding:        "8px 16px",
            boxShadow:      "0 12px 40px rgba(0,0,0,0.6)",
            display:        "flex",
            alignItems:     "center",
            gap:            "10px",
            color:          "#fff",
            fontFamily:     "var(--font-montserrat), sans-serif",
            fontSize:       "0.72rem",
            whiteSpace:     "nowrap",
            overflowX:      "auto",
            maxWidth:       "calc(100vw - 32px)",
          }}
        >
          {/* Fuente */}
          <TGroup label="Fuente">
            <select
              value={styles.fontFamily || ""}
              onChange={(e) => sc({ fontFamily: e.target.value })}
              style={selStyle}
            >
              {FONTS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </TGroup>

          <Sep />

          {/* Tamaño */}
          <TGroup label="Tamaño">
            <input
              value={styles.fontSize || ""}
              onChange={(e) => sc({ fontSize: e.target.value })}
              placeholder="2rem"
              style={{ ...inpStyle, width: "60px" }}
            />
          </TGroup>

          <Sep />

          {/* Estilo */}
          <TGroup label="Estilo">
            <div style={{ display: "flex", gap: "3px" }}>
              <FBtn active={styles.bold}          onClick={() => sc({ bold: !styles.bold })}          title="Negrita"><strong>B</strong></FBtn>
              <FBtn active={styles.italic}        onClick={() => sc({ italic: !styles.italic })}      title="Cursiva"><em style={{ fontStyle: "italic" }}>I</em></FBtn>
              <FBtn active={styles.underline}     onClick={() => sc({ underline: !styles.underline })} title="Subrayado"><span style={{ textDecoration: "underline" }}>U</span></FBtn>
              <FBtn active={styles.strikethrough} onClick={() => sc({ strikethrough: !styles.strikethrough })} title="Tachado"><span style={{ textDecoration: "line-through" }}>S</span></FBtn>
            </div>
          </TGroup>

          <Sep />

          {/* Color */}
          <TGroup label="Color">
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="color"
                value={styles.color || "#ffffff"}
                onChange={(e) => sc({ color: e.target.value })}
                style={{ width: "28px", height: "28px", border: "1px solid #333", borderRadius: "5px", background: "none", cursor: "pointer", padding: "2px" }}
              />
              <input
                value={styles.color || ""}
                onChange={(e) => sc({ color: e.target.value })}
                placeholder="#fff"
                style={{ ...inpStyle, width: "64px" }}
              />
            </div>
          </TGroup>

          <Sep />

          {/* Posición / alineación */}
          <TGroup label="Posición">
            <div style={{ display: "flex", gap: "3px" }}>
              <FBtn active={!styles.textAlign || styles.textAlign === "left"}   onClick={() => sc({ textAlign: "left" })}    title="Izquierda">
                <AlignIcon dir="left" />
              </FBtn>
              <FBtn active={styles.textAlign === "center"} onClick={() => sc({ textAlign: "center" })}  title="Centro">
                <AlignIcon dir="center" />
              </FBtn>
              <FBtn active={styles.textAlign === "right"}  onClick={() => sc({ textAlign: "right" })}   title="Derecha">
                <AlignIcon dir="right" />
              </FBtn>
            </div>
          </TGroup>

          <Sep />

          {/* Interlineado */}
          <TGroup label="Interlineado">
            <input
              value={styles.lineHeight || ""}
              onChange={(e) => sc({ lineHeight: e.target.value })}
              placeholder="1.5"
              style={{ ...inpStyle, width: "52px" }}
            />
          </TGroup>

          <Sep />

          {/* Interletrado */}
          <TGroup label="Interletrado">
            <input
              value={styles.letterSpacing || ""}
              onChange={(e) => sc({ letterSpacing: e.target.value })}
              placeholder="0.1em"
              style={{ ...inpStyle, width: "60px" }}
            />
          </TGroup>

          <Sep />

          {/* Sombra */}
          <TGroup label="Sombra">
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <input
                type="color"
                value={styles.shadowColor || "#000000"}
                onChange={(e) => sc({ shadowColor: e.target.value })}
                title="Color de sombra"
                style={{ width: "20px", height: "20px", border: "1px solid #333", borderRadius: "3px", background: "none", cursor: "pointer", padding: "1px" }}
              />
              <input
                type="number"
                value={styles.shadowBlur ?? ""}
                onChange={(e) => sc({ shadowBlur: parseInt(e.target.value) || 0 })}
                placeholder="Blur"
                title="Difuminado (px)"
                style={{ ...inpStyle, width: "38px", padding: "3px 4px" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <input
                  type="number"
                  value={styles.shadowOffsetX ?? ""}
                  onChange={(e) => sc({ shadowOffsetX: parseInt(e.target.value) || 0 })}
                  placeholder="X"
                  title="Alcance X"
                  style={{ ...inpStyle, width: "32px", height: "14px", fontSize: "0.55rem", padding: "0 3px" }}
                />
                <input
                  type="number"
                  value={styles.shadowOffsetY ?? ""}
                  onChange={(e) => sc({ shadowOffsetY: parseInt(e.target.value) || 0 })}
                  placeholder="Y"
                  title="Alcance Y"
                  style={{ ...inpStyle, width: "32px", height: "14px", fontSize: "0.55rem", padding: "0 3px" }}
                />
              </div>
            </div>
          </TGroup>

          <Sep />

          {/* Animación */}
          <TGroup label="Animación">
            <select
              value={styles.animation || ""}
              onChange={(e) => sc({ animation: e.target.value })}
              style={selStyle}
            >
              {ANIMATIONS.map(a => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </TGroup>

          {onTagChange && (
            <>
              <Sep />
              <TGroup label="Etiqueta (SEO)">
                <select
                  value={currentTag || tagName}
                  onChange={(e) => onTagChange(e.target.value)}
                  style={{ ...selStyle, borderColor: "#875BF7", color: "#875BF7" }}
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                  <option value="p">P (Párrafo)</option>
                  <option value="div">DIV</option>
                  <option value="span">SPAN</option>
                </select>
              </TGroup>
            </>
          )}
        </div>,
        document.body
      )
    : null;

  const textShadow = (styles.shadowBlur !== undefined || styles.shadowOffsetX !== undefined || styles.shadowOffsetY !== undefined)
    ? `${styles.shadowOffsetX || 0}px ${styles.shadowOffsetY || 0}px ${styles.shadowBlur || 0}px ${styles.shadowColor || "rgba(0,0,0,0.5)"}`
    : style?.textShadow;

  return (
    <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
      {plusButton}
      {toolbar}

      {React.createElement(tagName, {
        ref: elementRef,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onKeyDown: handleKeyDown,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        style: {
          ...style,
          outline:    "none",
          minWidth:   "20px",
          minHeight:  "1em",
          cursor:     "text",
          borderRadius: "inherit",
          padding:    "0 4px",
          transition: "background 0.2s, border 0.2s",
          background: isFocused ? "rgba(135,91,247,0.04)" : "transparent",
          border:     isFocused ? "1px dashed rgba(135,91,247,0.2)" : "1px dashed transparent",
          ...styles,
          textShadow,
          fontWeight:     styles.bold          ? 700         : (styles.fontWeight  || style?.fontWeight),
          fontStyle:      styles.italic        ? "italic"    : (styles.fontStyle   || style?.fontStyle),
          textDecoration: [
            styles.underline     ? "underline"    : "",
            styles.strikethrough ? "line-through" : "",
          ].filter(Boolean).join(" ") || (style?.textDecoration as string | undefined) || undefined,
        },
        className,
        "data-placeholder": placeholder,
        "data-field": dataField,
      })}
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */

function TGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
      <span style={{ fontSize: "0.56rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Sep() {
  return <div style={{ width: "1px", height: "38px", background: "#222", flexShrink: 0 }} />;
}

function FBtn({
  children, onClick, active, title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width:       "26px",
        height:      "26px",
        background:  active ? "#875BF7" : "#1d1d1d",
        color:       active ? "#fff"    : "#888",
        border:      `1px solid ${active ? "#875BF7" : "#2e2e2e"}`,
        borderRadius: "5px",
        cursor:      "pointer",
        fontSize:    "12px",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        transition:  "all 0.12s",
      }}
    >
      {children}
    </button>
  );
}

function AlignIcon({ dir }: { dir: "left" | "center" | "right" }) {
  if (dir === "left") return (
    <svg width="12" height="12" viewBox="0 0 14 12" fill="currentColor">
      <rect x="0" y="0"  width="14" height="2" rx="1"/>
      <rect x="0" y="5"  width="9"  height="2" rx="1"/>
      <rect x="0" y="10" width="12" height="2" rx="1"/>
    </svg>
  );
  if (dir === "center") return (
    <svg width="12" height="12" viewBox="0 0 14 12" fill="currentColor">
      <rect x="0" y="0"  width="14" height="2" rx="1"/>
      <rect x="2.5" y="5" width="9" height="2" rx="1"/>
      <rect x="1" y="10" width="12" height="2" rx="1"/>
    </svg>
  );
  return (
    <svg width="12" height="12" viewBox="0 0 14 12" fill="currentColor">
      <rect x="0" y="0"  width="14" height="2" rx="1"/>
      <rect x="5" y="5"  width="9"  height="2" rx="1"/>
      <rect x="2" y="10" width="12" height="2" rx="1"/>
    </svg>
  );
}

/* ── Shared input/select styles ───────────────────────────────── */

const inpStyle: React.CSSProperties = {
  background:   "#1a1a1a",
  border:       "1px solid #2e2e2e",
  borderRadius: "5px",
  color:        "#e5e5e5",
  padding:      "3px 7px",
  fontSize:     "0.72rem",
  outline:      "none",
  height:       "26px",
};

const selStyle: React.CSSProperties = {
  background:   "#1a1a1a",
  border:       "1px solid #2e2e2e",
  borderRadius: "5px",
  color:        "#e5e5e5",
  padding:      "3px 6px",
  fontSize:     "0.72rem",
  outline:      "none",
  height:       "26px",
  cursor:       "pointer",
};
