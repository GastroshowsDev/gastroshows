"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  children: React.ReactNode;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  label: string;
};

export function SortableBlock({ id, children, isSelected, onClick, label }: Props) {
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
    position: "relative",
    cursor: "pointer",
    outline: isSelected ? "3px solid #875BF7" : "none",
    outlineOffset: "-3px",
    zIndex: isDragging ? 100 : isSelected ? 10 : 1,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} onClick={onClick}>
      {/* Drag Handle Overlay (optional, or make the whole block draggable) */}
      <div 
        {...attributes} 
        {...listeners}
        onClick={(e) => e.stopPropagation()} // Don't deselect when clicking handle
        style={{
          position: "absolute",
          top: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "6px 16px",
          background: "#875BF7",
          color: "white",
          borderRadius: "30px",
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          boxShadow: "0 4px 15px rgba(135,91,247,0.4)",
          opacity: isDragging || isSelected ? 1 : 0,
          visibility: isDragging || isSelected ? "visible" : "hidden",
          transition: "all 0.2s",
          cursor: "grab",
          zIndex: 100,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>🖐️</span>
        {isDragging ? "Soltando..." : "Mover bloque"}
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
    </div>
  );
}
