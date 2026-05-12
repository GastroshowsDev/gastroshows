"use client";

import { useState } from "react";
import { SECTION_PRESETS, SectionPreset } from "@/lib/blocks/presets";

type Props = {
  onSelect: (preset: SectionPreset) => void;
  onClose: () => void;
};

export function SectionPresetModal({ onSelect, onClose }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Banner Principal");

  const categories = Array.from(new Set(SECTION_PRESETS.map(p => p.category)));

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        maxHeight: "80vh",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#111827" }}>Añadir Sección</h2>
            <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "0.2rem 0 0" }}>Elige una plantilla para empezar rápidamente</p>
          </div>
          <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <div style={{ width: "220px", borderRight: "1px solid #EAEEF4", padding: "1rem", background: "#F9FAFB", overflowY: "auto" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  textAlign: "left",
                  background: selectedCategory === cat ? "white" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  color: selectedCategory === cat ? "#875BF7" : "#4B5563",
                  cursor: "pointer",
                  marginBottom: "0.2rem",
                  boxShadow: selectedCategory === cat ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              {SECTION_PRESETS.filter(p => p.category === selectedCategory).map(preset => (
                <div
                  key={preset.id}
                  onClick={() => onSelect(preset)}
                  style={{
                    border: "2px solid #EAEEF4",
                    borderRadius: "12px",
                    padding: "1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#875BF7";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#EAEEF4";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <div style={{ fontSize: "1.5rem", width: "40px", height: "40px", background: "#F0EBFE", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {preset.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, margin: 0 }}>{preset.name}</h3>
                      <p style={{ fontSize: "0.7rem", color: "#6B7280", margin: 0 }}>{preset.description}</p>
                    </div>
                  </div>
                  <div style={{ height: "80px", background: "#F3F4F6", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#9CA3AF" }}>
                    Vista previa
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
