"use client";

import { useState } from "react";
import { CommonStyles } from "@/lib/blocks/types";

type MasterStyles = {
  h1: CommonStyles;
  h2: CommonStyles;
  h3: CommonStyles;
  h4: CommonStyles;
  h5: CommonStyles;
  h6: CommonStyles;
  p: CommonStyles;
  a: CommonStyles;
  button: CommonStyles;
};

type Props = {
  styles: MasterStyles;
  onUpdate: (styles: MasterStyles) => void;
};

export function GlobalStylesPanel({ styles: initialStyles, onUpdate }: Props) {
  const [localStyles, setLocalStyles] = useState(initialStyles);
  const [isSaving, setIsSaving] = useState(false);

  const updateTag = (tag: keyof MasterStyles, newStyles: CommonStyles) => {
    setLocalStyles(prev => ({ ...prev, [tag]: { ...prev[tag], ...newStyles } }));
  };

  const handleApply = async () => {
    setIsSaving(true);
    await onUpdate(localStyles);
    setIsSaving(false);
  };

  const sectionStyle = {
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#F9FAFB",
    borderRadius: "10px",
    border: "1px solid #EAEEF4"
  };

  const titleStyle = {
    fontSize: "0.7rem",
    fontWeight: 800,
    textTransform: "uppercase" as const,
    color: "#4B5563",
    marginBottom: "0.8rem",
    display: "block"
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem"
  };

  const inputStyle = {
    flex: 1,
    padding: "0.4rem",
    fontSize: "0.7rem",
    borderRadius: "4px",
    border: "1px solid #D1D5DB"
  };

  const renderTagEditor = (tag: keyof MasterStyles, label: string) => (
    <div style={sectionStyle}>
      <label style={titleStyle}>{label}</label>
      <div style={rowStyle}>
        <span style={{ fontSize: "0.6rem", width: "50px" }}>Fuente</span>
        <input 
          style={inputStyle} 
          value={localStyles[tag]?.fontSize || ""} 
          onChange={(e) => updateTag(tag, { fontSize: e.target.value })}
          placeholder="Ej: 2rem"
        />
      </div>
      <div style={rowStyle}>
        <span style={{ fontSize: "0.6rem", width: "50px" }}>Color</span>
        <input 
          type="color"
          style={{ width: "30px", height: "20px", padding: 0, border: "none" }} 
          value={localStyles[tag]?.color || "#000000"} 
          onChange={(e) => updateTag(tag, { color: e.target.value })}
        />
        <input 
          style={inputStyle} 
          value={localStyles[tag]?.color || ""} 
          onChange={(e) => updateTag(tag, { color: e.target.value })}
          placeholder="#HEX"
        />
      </div>
      {tag === "button" && (
        <>
          <div style={rowStyle}>
            <span style={{ fontSize: "0.6rem", width: "50px" }}>Radio</span>
            <input 
              style={inputStyle} 
              value={localStyles[tag]?.borderRadius || ""} 
              onChange={(e) => updateTag(tag, { borderRadius: e.target.value })}
              placeholder="Ej: 8px"
            />
          </div>
          <div style={rowStyle}>
            <span style={{ fontSize: "0.6rem", width: "50px" }}>Fondo</span>
            <input 
              style={inputStyle} 
              value={localStyles[tag]?.backgroundColor || ""} 
              onChange={(e) => updateTag(tag, { backgroundColor: e.target.value })}
              placeholder="#HEX"
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0 }}>Estilos Maestros</h3>
        <button 
          onClick={handleApply}
          disabled={isSaving}
          style={{
            padding: "0.5rem 1rem", background: "#875BF7", color: "white", border: "none",
            borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 2px 4px rgba(135,91,247,0.2)"
          }}
        >
          {isSaving ? "Aplicando..." : "Aplicar Cambios"}
        </button>
      </div>
      
      {renderTagEditor("h1", "Título Principal (H1)")}
      {renderTagEditor("h2", "Título Sección (H2)")}
      {renderTagEditor("h3", "Título Bloque (H3)")}
      {renderTagEditor("p", "Párrafos (P)")}
      {renderTagEditor("button", "Botones Primarios")}
      {renderTagEditor("a", "Enlaces")}
      
      <div style={{ padding: "1rem", background: "#F0EBFE", borderRadius: "10px", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.65rem", color: "#875BF7", margin: 0, lineHeight: 1.5 }}>
          <strong>Nota:</strong> Al pulsar "Aplicar Cambios", los estilos se guardarán y se reflejarán en todos los elementos que no tengan estilos locales específicos.
        </p>
      </div>
    </div>
  );
}
