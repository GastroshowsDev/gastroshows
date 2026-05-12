"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  anchorRect: DOMRect | null;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export function WidgetConfigPopup({ anchorRect, onClose, children, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!anchorRect) return null;

  const top = anchorRect.top + window.scrollY - 10;
  const left = anchorRect.left + anchorRect.width / 2;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        transform: "translate(-50%, -100%)",
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        zIndex: 9999,
        minWidth: "280px",
        padding: "1rem",
        animation: "popupFadeIn 0.2s ease-out",
      }}
    >
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translate(-50%, -95%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.5rem" }}>
        <h4 style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</h4>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#9CA3AF" }}>&times;</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {children}
      </div>
    </div>
  );
}
