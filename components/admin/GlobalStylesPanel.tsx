"use client";

import { useState } from "react";
import { CommonStyles } from "@/lib/blocks/types";

type MasterStyles = {
  logoUrl?: string;
  logoHeight?: string;
  h1: CommonStyles;
  h2: CommonStyles;
  h3: CommonStyles;
  h4: CommonStyles;
  h5: CommonStyles;
  h6: CommonStyles;
  p: CommonStyles;
  a: CommonStyles;
  button: CommonStyles;
  buttonSecondary: CommonStyles;
};

type Props = {
  styles: MasterStyles;
  onUpdate: (styles: MasterStyles) => void;
};

export function GlobalStylesPanel({ styles: initialStyles, onUpdate }: Props) {
  const [localStyles, setLocalStyles] = useState(initialStyles);
  const [isSaving, setIsSaving] = useState(false);

  const updateTag = (tag: keyof MasterStyles, newStyles: CommonStyles) => {
    setLocalStyles(prev => {
      const current = prev[tag];
      const currentObj = (typeof current === 'object' && current !== null) ? current : {};
      return { ...prev, [tag]: { ...currentObj, ...newStyles } };
    });
  };

  const getStyles = (tag: keyof MasterStyles): CommonStyles => {
    const val = localStyles[tag];
    return (typeof val === 'object' && val !== null) ? val as CommonStyles : {};
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

  const FONTS = [
    { label: "Por defecto",  value: "" },
    { label: "Cormorant",    value: "'Cormorant Garamond', serif" },
    { label: "Montserrat",   value: "'Montserrat', sans-serif" },
    { label: "Georgia",      value: "Georgia, serif" },
    { label: "Arial",        value: "Arial, sans-serif" },
  ];

  const FBtn = ({ active, onClick, children, title }: any) => (
    <button 
      onClick={onClick}
      title={title}
      style={{
        width: "28px", height: "28px", borderRadius: "4px", border: "1px solid #D1D5DB",
        background: active ? "#875BF7" : "white", color: active ? "white" : "#4B5563",
        fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", display: "flex", 
        alignItems: "center", justifyContent: "center", transition: "all 0.1s"
      }}
    >
      {children}
    </button>
  );

  const renderTagEditor = (tag: keyof MasterStyles, label: string) => (
    <div style={sectionStyle}>
      <label style={titleStyle}>{label}</label>
      
      {/* Tipografía */}
      <div style={rowStyle}>
        <span style={{ fontSize: "0.6rem", width: "50px" }}>Fuente</span>
        <select 
          style={inputStyle} 
          value={getStyles(tag).fontFamily || ""} 
          onChange={(e) => updateTag(tag, { fontFamily: e.target.value })}
        >
          {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      <div style={rowStyle}>
        <span style={{ fontSize: "0.6rem", width: "50px" }}>Formato</span>
        <div style={{ display: "flex", gap: "4px" }}>
          <FBtn active={getStyles(tag).bold} onClick={() => updateTag(tag, { bold: !getStyles(tag).bold })} title="Negrita">B</FBtn>
          <FBtn active={getStyles(tag).italic} onClick={() => updateTag(tag, { italic: !getStyles(tag).italic })} title="Cursiva">I</FBtn>
          <FBtn active={getStyles(tag).underline} onClick={() => updateTag(tag, { underline: !getStyles(tag).underline })} title="Subrayado">U</FBtn>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.6rem" }}>Size</span>
          <input 
            style={{ ...inputStyle, width: "50px", flex: "none" }} 
            value={getStyles(tag).fontSize || ""} 
            onChange={(e) => updateTag(tag, { fontSize: e.target.value })}
            placeholder="2rem"
          />
        </div>
      </div>

      <div style={rowStyle}>
        <span style={{ fontSize: "0.6rem", width: "50px" }}>Color</span>
        <input 
          type="color"
          style={{ width: "30px", height: "20px", padding: 0, border: "none", cursor: "pointer" }} 
          value={getStyles(tag).color || "#000000"} 
          onChange={(e) => updateTag(tag, { color: e.target.value })}
        />
        <input 
          style={inputStyle} 
          value={getStyles(tag).color || ""} 
          onChange={(e) => updateTag(tag, { color: e.target.value })}
          placeholder="#HEX"
        />
      </div>

      {(tag === "button" || tag === "buttonSecondary") && (
        <div style={{ marginTop: "0.8rem", paddingTop: "0.8rem", borderTop: "1px dashed #DDD" }}>
          <div style={rowStyle}>
            <span style={{ fontSize: "0.6rem", width: "50px" }}>Radio</span>
            <input 
              style={inputStyle} 
              value={getStyles(tag).borderRadius || ""} 
              onChange={(e) => updateTag(tag, { borderRadius: e.target.value })}
              placeholder="Ej: 8px"
            />
          </div>
          <div style={rowStyle}>
            <span style={{ fontSize: "0.6rem", width: "50px" }}>Fondo</span>
            <input 
              type="color"
              style={{ width: "30px", height: "20px", padding: 0, border: "none", cursor: "pointer" }} 
              value={getStyles(tag).backgroundColor || "#ffffff"} 
              onChange={(e) => updateTag(tag, { backgroundColor: e.target.value })}
            />
            <input 
              style={inputStyle} 
              value={getStyles(tag).backgroundColor || ""} 
              onChange={(e) => updateTag(tag, { backgroundColor: e.target.value })}
              placeholder="#HEX"
            />
          </div>
        </div>
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
      
      <div style={sectionStyle}>
        <label style={titleStyle}>Logotipo Global</label>
        <div style={rowStyle}>
          <span style={{ fontSize: "0.6rem", width: "50px" }}>URL</span>
          <input 
            style={inputStyle} 
            value={localStyles.logoUrl || ""} 
            onChange={(e) => setLocalStyles(prev => ({ ...prev, logoUrl: e.target.value }))}
            placeholder="https://.../logo.png"
          />
        </div>
        <div style={rowStyle}>
          <span style={{ fontSize: "0.6rem", width: "50px" }}>Altura</span>
          <input 
            style={inputStyle} 
            value={localStyles.logoHeight || ""} 
            onChange={(e) => setLocalStyles(prev => ({ ...prev, logoHeight: e.target.value }))}
            placeholder="40px"
          />
        </div>
        {localStyles.logoUrl && (
          <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", padding: "0.5rem", background: "white", borderRadius: "4px" }}>
            <img src={localStyles.logoUrl} style={{ height: localStyles.logoHeight || "40px", width: "auto" }} alt="Logo Preview" />
          </div>
        )}
      </div>

      {renderTagEditor("h1", "Título Principal (H1)")}
      {renderTagEditor("h2", "Título Sección (H2)")}
      {renderTagEditor("h3", "Título Bloque (H3)")}
      {renderTagEditor("p", "Párrafos (P)")}
      {renderTagEditor("button", "Botones Primarios")}
      {renderTagEditor("buttonSecondary", "Botones Secundarios")}
      {renderTagEditor("a", "Enlaces")}
      
      <div style={{ padding: "1rem", background: "#F0EBFE", borderRadius: "10px", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.65rem", color: "#875BF7", margin: 0, lineHeight: 1.5 }}>
          <strong>Nota:</strong> Al pulsar "Aplicar Cambios", los estilos se guardarán y se reflejarán en todos los elementos que no tengan estilos locales específicos.
        </p>
      </div>
    </div>
  );
}
