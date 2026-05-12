"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  children: React.ReactNode;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDelete?: () => void;
  label: string;
  isSticky?: boolean;
};

export function SortableBlock({ id, children, isSelected, onClick, onDelete, label, isSticky }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isSticky ? "sticky" : "relative",
    top: isSticky ? 0 : undefined,
    cursor: "pointer",
    outline: isSelected ? "3px solid #875BF7" : "none",
    outlineOffset: "-3px",
    zIndex: isDragging ? 100 : isSticky ? 1100 : isSelected ? 10 : 1,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div id={`block-${id}`} ref={setNodeRef} style={style} onClick={onClick}>
      {/* Drag Handle Overlay (optional, or make the whole block draggable) */}
      <div 
        {...attributes} 
        {...listeners}
        onClick={(e) => e.stopPropagation()} 
        style={{
          position: "absolute",
          top: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "2px 8px",
          background: "#875BF7",
          color: "white",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 700,
          boxShadow: "0 2px 8px rgba(135,91,247,0.4)",
          opacity: isDragging || isSelected ? 1 : 0,
          visibility: isDragging || isSelected ? "visible" : "hidden",
          transition: "all 0.2s",
          cursor: "grab",
          zIndex: 100,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Mover bloque"
      >
        ⠿
      </div>

      {children}

      {/* Block Label Badge */}
      {isSelected && !isDragging && (
        <div style={{
          position: "absolute", top: 0, right: 0, padding: "0.5rem",
          background: "#875BF7", color: "white", fontSize: "0.6rem", fontWeight: 700,
          textTransform: "uppercase", pointerEvents: "none", zIndex: 21
        }}>
          {label}
        </div>
      )}

      {/* Floating Delete Button */}
      {(isSelected || isDragging) && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
          style={{
            position: "absolute", top: "10px", right: "10px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "#FEE2E2", color: "#EF4444", border: "1px solid #FECACA",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 101, boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#EF4444", e.currentTarget.style.color = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FEE2E2", e.currentTarget.style.color = "#EF4444")}
          title="Eliminar bloque"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
