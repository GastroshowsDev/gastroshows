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
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "4px 12px",
          background: "rgba(135, 91, 247, 0.9)",
          color: "white",
          borderRadius: "20px",
          fontSize: "0.6rem",
          fontWeight: 700,
          textTransform: "uppercase",
          opacity: isDragging || isSelected ? 1 : 0,
          transition: "opacity 0.2s",
          cursor: "grab",
          zIndex: 20,
          pointerEvents: "auto",
        }}
      >
        {isDragging ? "Soltar para reordenar" : "Arrastrar"}
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
