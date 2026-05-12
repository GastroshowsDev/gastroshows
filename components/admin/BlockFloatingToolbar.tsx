"use client";

import { Trash2, ArrowUp, ArrowDown, Copy, Settings } from "lucide-react";
import React from "react";

type Props = {
  blockId: string;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: "up" | "down") => void;
  onDuplicate: (id: string) => void;
  onSettings: (id: string) => void;
  rect: DOMRect | null;
};

export function BlockFloatingToolbar({ blockId, onDelete, onMove, onDuplicate, onSettings, rect }: Props) {
  if (!rect) return null;

  // Position the toolbar above the block
  const top = rect.top + window.scrollY - 50;
  const left = rect.left + rect.width / 2;

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        transform: "translateX(-50%)",
        display: "flex",
        gap: "0.25rem",
        background: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(8px)",
        padding: "0.4rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        zIndex: 2000,
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "gs-fade-in-up 0.2s ease-out"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ToolbarButton icon={<ArrowUp size={16} />} onClick={() => onMove(blockId, "up")} label="Subir" />
      <ToolbarButton icon={<ArrowDown size={16} />} onClick={() => onMove(blockId, "down")} label="Bajar" />
      <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "0 0.25rem" }} />
      <ToolbarButton icon={<Copy size={16} />} onClick={() => onDuplicate(blockId)} label="Duplicar" />
      <ToolbarButton icon={<Settings size={16} />} onClick={() => onSettings(blockId)} label="Ajustes" />
      <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "0 0.25rem" }} />
      <ToolbarButton 
        icon={<Trash2 size={16} />} 
        onClick={() => onDelete(blockId)} 
        label="Eliminar" 
        color="#EF4444" 
      />

      <style jsx>{`
        @keyframes gs-fade-in-up {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({ icon, onClick, label, color = "white" }: { icon: React.ReactNode, onClick: () => void, label: string, color?: string }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        background: "none",
        border: "none",
        color: color,
        padding: "0.5rem",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        opacity: 0.8
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "none";
        e.currentTarget.style.opacity = "0.8";
      }}
    >
      {icon}
    </button>
  );
}
