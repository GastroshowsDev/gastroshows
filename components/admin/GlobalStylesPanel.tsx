"use client";

import { useState } from "react";
import { CommonStyles } from "@/lib/blocks/types";
import { PALETTES, Palette } from "@/lib/constants/palettes";
import { FONTS } from "@/lib/constants/fonts";

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
  paletteId?: string;
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

  const handleSelectPalette = (palette: Palette) => {
    setLocalStyles(prev => ({
      ...prev,
      paletteId: palette.id,
      h1: { ...prev.h1, color: palette.colors.heading },
      h2: { ...prev.h2, color: palette.colors.heading },
      h3: { ...prev.h3, color: palette.colors.heading },
      p: { ...prev.p, color: palette.colors.text },
      button: { ...prev.button, backgroundColor: palette.colors.accent, color: "#FFFFFF" },
    }));
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

  const FontSelector = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const filtered = FONTS.filter(f => 
      f.label.toLowerCase().includes(search.toLowerCase())
    );

    const currentLabel = FONTS.find(f => f.value === value)?.label || "Por defecto";

    return (
      <div style={{ position: "relative", flex: 1 }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <input
            type="text"
            placeholder={currentLabel}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            style={{ ...inputStyle, width: "100%" }}
          />
          {search && (
            <button 
              onClick={() => { setSearch(""); setIsOpen(false); }}
              style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "#9CA3AF" }}
            >✕</button>
          )}
        </div>

        {isOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 1000,
            background: "white", border: "1px solid #D1D5DB", borderRadius: "8px",
            marginTop: "4px", maxHeight: "200px", overflowY: "auto",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
          }}>
            {filtered.length > 0 ? filtered.map(f => (
              <div
                key={f.value}
                onClick={() => {
                  onChange(f.value);
                  setSearch("");
                  setIsOpen(false);
                }}
                style={{
                  padding: "0.6rem 0.8rem", cursor: "pointer", fontSize: "0.75rem",
                  background: value === f.value ? "#F3F4F6" : "transparent",
                  fontFamily: f.value || "inherit",
                  borderBottom: "1px solid #F3F4F6"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"}
                onMouseLeave={(e) => e.currentTarget.style.background = value === f.value ? "#F3F4F6" : "transparent"}
              >
                {f.label}
              </div>
            )) : (
              <div style={{ padding: "0.6rem", fontSize: "0.7rem", color: "#9CA3AF" }}>No hay resultados</div>
            )}
          </div>
        )}
        {isOpen && <div onClick={() => setIsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 999 }} />}
      </div>
    );
  };

  const FBtn = ({ active, onClick, children, title }: any) => (
    <button 
      onClick={onClick}
      title={title}
      style={{
        width: "28px", height: "28px", borderRadius: "4px", border: "1px solid #D1D5DB",
        background: active ? "var(--gs-accent)" : "white", color: active ? "white" : "#4B5563",
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
        <FontSelector 
          value={getStyles(tag).fontFamily || ""} 
          onChange={(v) => updateTag(tag, { fontFamily: v })}
        />
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
            padding: "0.5rem 1rem", background: "var(--gs-accent)", color: "white", border: "none",
            borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 2px 4px rgba(218,165,32,0.2)"
          }}
        >
          {isSaving ? "Aplicando..." : "Aplicar Cambios"}
        </button>
      </div>
      
      <div style={sectionStyle}>
        <label style={titleStyle}>Paletas de Color</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
          {PALETTES.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelectPalette(p)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: localStyles.paletteId === p.id ? "2px solid var(--gs-accent)" : "1px solid #D1D5DB",
                background: "white",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.name}</div>
              <div style={{ display: "flex", gap: "2px" }}>
                {[p.colors.bg, p.colors.accent, p.colors.heading, p.colors.muted].map(c => (
                  <div key={c} style={{ width: "12px", height: "12px", borderRadius: "2px", background: c }} />
                ))}
              </div>
            </button>
          ))}
        </div>
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
      
      <div style={{ padding: "1rem", background: "var(--gs-accent-light)", borderRadius: "10px", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.65rem", color: "var(--gs-accent)", margin: 0, lineHeight: 1.5 }}>
          <strong>Nota:</strong> Al pulsar "Aplicar Cambios", los estilos se guardarán y se reflejarán en todos los elementos que no tengan estilos locales específicos.
        </p>
      </div>
    </div>
  );
}
