"use client";

import { useState } from "react";
import { SectionPreset } from "@/lib/blocks/presets";
import { PageBlockList } from "@/components/blocks/BlockRenderer";

type Props = {
  onSelect: (preset: SectionPreset) => void;
  onClose: () => void;
  presets: SectionPreset[];
  title: string;
  description: string;
};

function PresetPreview({ blocks }: { blocks: any[] }) {
  return (
    <div style={{ 
      height: "180px", 
      background: "#F9FAFB", 
      borderRadius: "12px", 
      overflow: "hidden", 
      position: "relative",
      border: "1px solid #EAEEF4"
    }}>
      <div style={{ 
        transform: "scale(0.15)", 
        transformOrigin: "top left", 
        width: "666%", // 100 / 0.15
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0
      }}>
        <PageBlockList blocks={blocks} isEditing={false} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "transparent" }} />
    </div>
  );
}

export function SectionPresetModal({ onSelect, onClose, presets, title, description }: Props) {
  const categories = Array.from(new Set(presets.map(p => p.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || "");

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
        maxWidth: "1000px",
        height: "90vh",
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 30px 60px -12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: 0, color: "#111827", letterSpacing: "-0.02em" }}>{title}</h2>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.2rem 0 0" }}>{description}</p>
          </div>
          <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          {categories.length > 1 && (
            <div style={{ width: "240px", borderRight: "1px solid #EAEEF4", padding: "1.5rem", background: "#F9FAFB", overflowY: "auto" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    width: "100%",
                    padding: "0.8rem 1.2rem",
                    textAlign: "left",
                    background: selectedCategory === cat ? "#875BF7" : "transparent",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    color: selectedCategory === cat ? "white" : "#4B5563",
                    cursor: "pointer",
                    marginBottom: "0.4rem",
                    transition: "all 0.2s"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {presets.filter(p => !selectedCategory || p.category === selectedCategory).map(preset => (
                <div
                  key={preset.id}
                  onClick={() => onSelect(preset)}
                  style={{
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <PresetPreview blocks={preset.blocks} />
                  <div style={{ padding: "0 0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontSize: "1.2rem" }}>{preset.icon}</span>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0 }}>{preset.name}</h3>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0 }}>{preset.description}</p>
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
