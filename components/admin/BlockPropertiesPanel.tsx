"use client";

import { BlockType, BlockContent, HeroContent, TextContent, ImageContent, GalleryContent, CtaContent, SpacerContent, AvailabilityContent, SectionContent, StepsContent, ColumnData, ElementData } from "@/lib/blocks/types";

type Props = {
  type: BlockType;
  content: BlockContent;
  onChange: (newContent: BlockContent) => void;
  openMedia: (callback: (url: string) => void) => void;
  // For atomic elements
  element?: ElementData | null;
  onElementChange?: (newElement: ElementData) => void;
};

import { useState } from "react";
import { CreatePageModal } from "./CreatePageModal";

export function BlockPropertiesPanel({ type, content, onChange, openMedia, element, onElementChange }: Props) {
  const [createModalFor, setCreateModalFor] = useState<string | null>(null);

  function update(fields: Partial<BlockContent>) {
    onChange({ ...content, ...fields } as BlockContent);
  }

  function updateElement(fields: any) {
    if (element && onElementChange) {
      onElementChange({ ...element, ...fields });
    }
  }

  function updateStyles(target: any, newStyles: any) {
    const currentStyles = target?.styles || {};
    if (target === element) {
      updateElement({ styles: { ...currentStyles, ...newStyles } });
    } else {
      update({ styles: { ...currentStyles, ...newStyles } } as any);
    }
  }

  const labelStyle = { display: "block", fontSize: "0.6rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.3rem" };
  const inputStyle = { width: "100%", padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem", marginBottom: "0.8rem" };
  const rowStyle = { marginBottom: "0.8rem" };


  return (
    <div style={{ padding: "1.5rem" }}>
      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid #875BF7", paddingBottom: "0.5rem" }}>
        {element ? `Elemento: ${element.type}` : `Bloque: ${type}`}
      </h3>

      {/* ATOMIC ELEMENT PROPERTIES */}
      {element && (
        <div style={{ background: "#F9FAFB", padding: "1rem", borderRadius: "8px", marginBottom: "2rem", border: "1px solid #EAEEF4" }}>
          {/* HEADING/TEXT removed: use inline editor */}
          {(element.type === "HEADING" || element.type === "TEXT") && (
            <p style={{ fontSize: "0.7rem", color: "#6B7280", fontStyle: "italic" }}>
              * Edita el texto y el SEO (H1-H6) directamente en la vista previa.
            </p>
          )}

          {element.type === "BUTTON" && (
            <>
              <div style={rowStyle}>
                <label style={labelStyle}>Enlace (Link)</label>
                <input value={(element as any).link || ""} onChange={(e) => updateElement({ link: e.target.value })} style={inputStyle} placeholder="https://..." />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Variante</label>
                <select value={(element as any).variant || "primary"} onChange={(e) => updateElement({ variant: e.target.value })} style={inputStyle}>
                  <option value="primary">Primario (Dorado)</option>
                  <option value="secondary">Secundario (Oscuro)</option>
                  <option value="outline">Contorno</option>
                </select>
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Alineación</label>
                <select value={element.styles?.textAlign || "left"} onChange={(e) => updateStyles(element, { textAlign: e.target.value })} style={inputStyle}>
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
            </>
          )}

          {element.type === "IMAGE" && (
            <>
              <div style={rowStyle}>
                <label style={labelStyle}>Imagen</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input value={element.src || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                  <button onClick={() => openMedia((url) => updateElement({ src: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
                </div>
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Texto Alternativo (Alt SEO)</label>
                <input value={element.alt || ""} onChange={(e) => updateElement({ alt: e.target.value })} style={inputStyle} placeholder="Describe la imagen..." />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Atributo Title (Hover)</label>
                <input value={(element as any).title || ""} onChange={(e) => updateElement({ title: e.target.value })} style={inputStyle} placeholder="Título de la imagen..." />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Carga (Performance)</label>
                <select value={(element as any).loading || "lazy"} onChange={(e) => updateElement({ loading: e.target.value })} style={inputStyle}>
                  <option value="lazy">Lazy (Recomendado - Lento)</option>
                  <option value="eager">Eager (Prioridad - Rápido)</option>
                </select>
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Alineación</label>
                <select value={element.styles?.textAlign || "center"} onChange={(e) => updateStyles(element, { textAlign: e.target.value })} style={inputStyle}>
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div style={rowStyle}>
                  <label style={labelStyle}>Opacidad ({Math.round((element.styles?.opacity ?? 1) * 100)}%)</label>
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={element.styles?.opacity ?? 1} 
                    onChange={(e) => updateStyles(element, { opacity: parseFloat(e.target.value) })} 
                    style={{ width: "100%" }} 
                  />
                </div>
                <div style={rowStyle}>
                  <label style={labelStyle}>Brillo ({Math.round((element.styles?.brightness ?? 1) * 100)}%)</label>
                  <input 
                    type="range" min="0" max="3" step="0.05" 
                    value={element.styles?.brightness ?? 1} 
                    onChange={(e) => updateStyles(element, { brightness: parseFloat(e.target.value) })} 
                    style={{ width: "100%" }} 
                  />
                </div>
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>Posición de Imagen</label>
                <select 
                  value={element.styles?.backgroundPosition || "center"} 
                  onChange={(e) => updateStyles(element, { backgroundPosition: e.target.value })} 
                  style={inputStyle}
                >
                  <option value="center">Centro</option>
                  <option value="cover">Completo (Se adapta)</option>
                  <option value="top">Arriba</option>
                  <option value="bottom">Abajo</option>
                  <option value="left">Izquierda</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
            </>

          )}


          <div style={rowStyle}>
            <label style={labelStyle}>Color Principal (Opcional)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="color" 
                value={element.styles?.color || "#000000"} 
                onChange={(e) => updateStyles(element, { color: e.target.value })} 
                style={{ ...inputStyle, width: "40px", padding: "2px", marginBottom: 0 }} 
              />
              <input 
                value={element.styles?.color || ""} 
                onChange={(e) => updateStyles(element, { color: e.target.value })} 
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }} 
                placeholder="Por defecto"
              />
              <button 
                onClick={() => updateStyles(element, { color: "" })} 
                style={{ padding: "0.5rem", background: "#F3F4F6", color: "#4B5563", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                title="Limpiar color"
              >
                ↺
              </button>
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Efecto de Animación</label>
            <select value={element.styles?.animation || "none"} onChange={(e) => updateStyles(element, { animation: e.target.value })} style={inputStyle}>
              <option value="none">Sin animación</option>
              <option value="fade-in">Aparecer (Fade)</option>
              <option value="slide-up">Deslizar Arriba</option>
              <option value="slide-down">Deslizar Abajo</option>
              <option value="slide-left">Deslizar Izquierda</option>
              <option value="slide-right">Deslizar Derecha</option>
              <option value="scale-in">Escalar</option>
              <option value="blur-in">Desenfoque (Blur)</option>
              <option value="bounce-in">Rebote (Bounce)</option>
              <option value="reveal-up">Revelar (Clip)</option>
              <option value="flip-x">Giro 3D</option>
              <option value="vortex">Vórtice (Efecto Loco)</option>
              <option value="celestial">Resplandor Celestial</option>
              <option value="swing">Balanceo</option>
              <option value="jello">Gelatina (Jello)</option>
              <option value="unfold">Desplegar</option>
              <option value="zoom-spin">Zoom + Giro</option>
              <option value="skew-reveal">Corte Inclinado</option>
              <option value="letter-spacing">Expansión Letras</option>
              <option value="tilt-3d">Perspectiva 3D</option>
              <option value="focus-in">Enfoque (Cámara)</option>
              <option value="float">Flotante (Bucle)</option>
              <option value="pulse">Pulso (Bucle)</option>
              <option value="glitch">Glitch (Efecto Error)</option>
              <option value="shimmer">Shimmer (Brillo)</option>

            </select>
          </div>
               {element.type === "CONTAINER" && (
            <>
              <div style={rowStyle}>
                <label style={labelStyle}>Distribución de Columnas</label>
                <select 
                  value={element.content?.columns?.length || 1} 
                  onChange={(e) => {
                    const count = Number(e.target.value);
                    const currentCols = element.content?.columns || [{ width: "100%", elements: [] }];
                    let newCols: ColumnData[] = [];
                    if (count > currentCols.length) {
                      newCols = [...currentCols];
                      for (let i = currentCols.length; i < count; i++) newCols.push({ width: `${100/count}%`, elements: [] });
                    } else if (count < currentCols.length) {
                      newCols = currentCols.slice(0, count);
                      const lastColIndex = count - 1;
                      const removedCols = currentCols.slice(count);
                      removedCols.forEach((col: ColumnData) => {
                        newCols[lastColIndex].elements = [...newCols[lastColIndex].elements, ...col.elements];
                      });
                    } else {
                      newCols = [...currentCols];
                    }
                    newCols = newCols.map(c => ({ ...c, width: `${100/count}%` }));
                    updateElement({ content: { ...element.content, columns: newCols } });
                  }} 
                  style={inputStyle}
                >
                  <option value={1}>1 Columna</option>
                  <option value={2}>2 Columnas</option>
                  <option value={3}>3 Columnas</option>
                  <option value={4}>4 Columnas</option>
                </select>
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>Imagen de Fondo</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input value={element.content?.styles?.backgroundImage || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                  <button onClick={() => openMedia((url) => {
                    updateElement({ content: { ...element.content, styles: { ...element.content?.styles, backgroundImage: url } } });
                  })} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
                </div>
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>Color de Fondo</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input 
                    type="color" 
                    value={element.content?.styles?.backgroundColor || "#FFFFFF"} 
                    onChange={(e) => updateElement({ content: { ...element.content, styles: { ...element.content?.styles, backgroundColor: e.target.value } } })} 
                    style={{ ...inputStyle, width: "40px", padding: "2px" }} 
                  />
                  <input 
                    value={element.content?.styles?.backgroundColor || ""} 
                    onChange={(e) => updateElement({ content: { ...element.content, styles: { ...element.content?.styles, backgroundColor: e.target.value } } })} 
                    style={{ ...inputStyle, flex: 1 }} 
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>

              <div style={rowStyle}>
                <label style={labelStyle}>Posición Fondo</label>
                <select 
                  value={element.content?.styles?.backgroundPosition || "center"} 
                  onChange={(e) => updateElement({ content: { ...element.content, styles: { ...element.content?.styles, backgroundPosition: e.target.value } } })} 
                  style={inputStyle}
                >
                  <option value="center">Centro</option>
                  <option value="cover">Completo (Se adapta)</option>
                  <option value="top">Arriba</option>
                  <option value="bottom">Abajo</option>
                  <option value="left">Izquierda</option>
                  <option value="right">Derecha</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={rowStyle}>
                  <label style={labelStyle}>Padding Top</label>
                  <input value={element.content?.styles?.paddingTop || ""} onChange={(e) => updateElement({ content: { ...element.content, styles: { ...element.content?.styles, paddingTop: e.target.value } } })} style={inputStyle} placeholder="2rem" />
                </div>
                <div style={rowStyle}>
                  <label style={labelStyle}>Padding Bottom</label>
                  <input value={element.content?.styles?.paddingBottom || ""} onChange={(e) => updateElement({ content: { ...element.content, styles: { ...element.content?.styles, paddingBottom: e.target.value } } })} style={inputStyle} placeholder="2rem" />
                </div>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            <button 
              onClick={() => onElementChange?.(null as any)} 
              style={{ flex: 1, padding: "0.6rem", background: "white", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
            >
              Cerrar Elemento
            </button>
            <button 
              onClick={() => {
                if(confirm("¿Eliminar este elemento?")) {
                  onElementChange?.("DELETE" as any);
                }
              }} 
              style={{ padding: "0.6rem", background: "#FEE2E2", color: "#EF4444", border: "1px solid #FECACA", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer" }}
            >
              🗑 Borrar
            </button>
          </div>
        </div>
      )}

      {/* CONTAINER PROPERTIES (Always accessible) */}
      {(type === "SECTION" || type === "HERO" || type === "CTA" || type === "TEXT") && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#875BF7", textTransform: "uppercase", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>Configuración del Contenedor</p>
          
          {(type === "SECTION" || type === "HERO" || type === "CTA" || type === "TEXT") && (
            <div style={rowStyle}>
              <label style={labelStyle}>Distribución de Columnas</label>
              <select 
                value={(content as any).columns?.length || 1} 
                onChange={(e) => {
                  const count = Number(e.target.value);
                  const currentCols = (content as any).columns || [{ width: "100%", elements: [] }];
                  let newCols: ColumnData[] = [];

                  if (count > currentCols.length) {
                    // Increasing columns: add empty ones
                    newCols = [...currentCols];
                    for (let i = currentCols.length; i < count; i++) {
                      newCols.push({ width: `${100/count}%`, elements: [] });
                    }
                  } else if (count < currentCols.length) {
                    // Decreasing columns: Move elements from removed columns to the last kept column
                    newCols = currentCols.slice(0, count);
                    const lastColIndex = count - 1;
                    const removedCols = currentCols.slice(count);
                    
                    removedCols.forEach((col: ColumnData) => {
                      newCols[lastColIndex].elements = [
                        ...newCols[lastColIndex].elements,
                        ...col.elements
                      ];
                    });
                  } else {
                    newCols = [...currentCols];
                  }

                  // Update widths for all to be equal
                  newCols = newCols.map(c => ({ ...c, width: `${100/count}%` }));
                  update({ columns: newCols });
                }} 
                style={inputStyle}
              >
                <option value={1}>1 Columna (Ancho total)</option>
                <option value={2}>2 Columnas (50/50)</option>
                <option value={3}>3 Columnas (33/33/33)</option>
                <option value={4}>4 Columnas (25/25/25/25)</option>
              </select>
            </div>
          )}

          <div style={rowStyle}>
            <label style={labelStyle}>Imagen de Fondo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as any).styles?.backgroundImage || (content as any).bgImage || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => {
                if (type === "SECTION") updateStyles(content, { backgroundImage: url });
                else update({ bgImage: url });
              })} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Color de Fondo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="color" 
                value={(content as any).styles?.backgroundColor || "#000000"} 
                onChange={(e) => updateStyles(content, { backgroundColor: e.target.value })} 
                style={{ ...inputStyle, width: "40px", padding: "2px" }} 
              />
              <input 
                value={(content as any).styles?.backgroundColor || ""} 
                onChange={(e) => updateStyles(content, { backgroundColor: e.target.value })} 
                style={{ ...inputStyle, flex: 1 }} 
                placeholder="#000000"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
            <div style={rowStyle}>
              <label style={labelStyle}>Opacidad ({Math.round(((content as any).styles?.opacity ?? (((content as any).overlayOpacity ?? 100) / 100)) * 100)}%)</label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={(content as any).styles?.opacity ?? (((content as any).overlayOpacity ?? 100) / 100)} 
                onChange={(e) => {
                  if (type === "SECTION") updateStyles(content, { opacity: parseFloat(e.target.value) });
                  else update({ overlayOpacity: parseFloat(e.target.value) * 100 });
                }} 
                style={{ width: "100%" }} 
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Brillo ({Math.round(((content as any).styles?.brightness ?? (content as any).brightness ?? 1) * 100)}%)</label>
              <input 
                type="range" min="0" max="3" step="0.05" 
                value={(content as any).styles?.brightness ?? (content as any).brightness ?? 1} 
                onChange={(e) => {
                  if (type === "SECTION") updateStyles(content, { brightness: parseFloat(e.target.value) });
                  else update({ brightness: parseFloat(e.target.value) });
                }} 
                style={{ width: "100%" }} 
              />
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Tamaño Fondo</label>
            <select 
              value={(content as any).styles?.backgroundSize || "auto"} 
              onChange={(e) => updateStyles(content, { backgroundSize: e.target.value })}
              style={inputStyle}
            >
              <option value="auto">Original (Auto)</option>
              <option value="cover">Cubrir (Cover)</option>
              <option value="contain">Contener (Contain)</option>
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Posición Fondo</label>
            <select 
              value={(content as any).styles?.backgroundPosition || (content as any).bgPosition || "center"} 
              onChange={(e) => {
                if (type === "SECTION") updateStyles(content, { backgroundPosition: e.target.value });
                else update({ bgPosition: e.target.value });
              }} 
              style={inputStyle}
            >
              <option value="center">Centro</option>
              <option value="top">Arriba</option>
              <option value="bottom">Abajo</option>
              <option value="left">Izquierda</option>
              <option value="right">Derecha</option>
              <option value="top left">Arriba Izquierda</option>
              <option value="top right">Arriba Derecha</option>
              <option value="bottom left">Abajo Izquierda</option>
              <option value="bottom right">Abajo Derecha</option>
            </select>
          </div>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #E5E7EB", paddingTop: "1rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "1rem" }}>Márgenes y Espaciado</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.8rem" }}>
              <div style={rowStyle}>
                <label style={labelStyle}>Margin Top</label>
                <input value={(content as any).styles?.marginTop || (content as any).marginTop || ""} onChange={(e) => update({ marginTop: e.target.value })} style={inputStyle} placeholder="0" />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Margin Bottom</label>
                <input value={(content as any).styles?.marginBottom || (content as any).marginBottom || ""} onChange={(e) => update({ marginBottom: e.target.value })} style={inputStyle} placeholder="0" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={rowStyle}>
                <label style={labelStyle}>Padding Top</label>
                <input value={(content as any).styles?.paddingTop || (content as any).paddingTop || ""} onChange={(e) => update({ paddingTop: e.target.value })} style={inputStyle} placeholder="0" />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Padding Bottom</label>
                <input value={(content as any).styles?.paddingBottom || (content as any).paddingBottom || ""} onChange={(e) => update({ paddingBottom: e.target.value })} style={inputStyle} placeholder="0" />
              </div>
            </div>
          </div>

          {(type === "HERO" || type === "CTA") && (
            <div style={{ marginTop: "1.5rem", borderTop: "1px solid #E5E7EB", paddingTop: "1rem" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "1rem" }}>Enlaces de Botones</p>
              <div style={rowStyle}>
                <input 
                  placeholder="Link 1 / Principal" 
                  value={(content as any).ctaPrimaryLink || (content as any).buttonLink || ""} 
                  onChange={(e) => {
                    if (type === "HERO") update({ ctaPrimaryLink: e.target.value });
                    else update({ buttonLink: e.target.value });
                  }} 
                  style={inputStyle} 
                />
                {type === "HERO" && (
                  <input 
                    placeholder="Link 2 / Secundario" 
                    value={(content as any).ctaSecondaryLink || ""} 
                    onChange={(e) => update({ ctaSecondaryLink: e.target.value })} 
                    style={inputStyle} 
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* HEADER BLOCK PROPERTIES */}
      {type === "HEADER" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
          <div style={rowStyle}>
            <label style={labelStyle}>Opciones de Cabecera</label>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 400 }}>
              <input type="checkbox" checked={(content as any).isSticky} onChange={(e) => update({ isSticky: e.target.checked })} />
              Sticky (Fijar al hacer scroll)
            </label>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 400, marginTop: "0.5rem" }}>
              <input type="checkbox" checked={(content as any).isTransparent} onChange={(e) => update({ isTransparent: e.target.checked })} />
              Transparente (Sobre Hero)
            </label>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Imagen del Logo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as any).logo || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ logo: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Altura del Logo (px)</label>
            <input value={(content as any).logoHeight || ""} onChange={(e) => update({ logoHeight: e.target.value })} style={inputStyle} placeholder="40px" />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Enlace del icono del logo</label>
            <input value={(content as any).logoLink || ""} onChange={(e) => update({ logoLink: e.target.value })} style={inputStyle} placeholder="/" />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Enlace del Botón CTA</label>
            <input value={(content as any).ctaLink || ""} onChange={(e) => update({ ctaLink: e.target.value })} style={inputStyle} placeholder="/contacto" />
          </div>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #E5E7EB", paddingTop: "1rem" }}>
             <p style={labelStyle}>Gestión de Enlaces</p>
             <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
               <button 
                 onClick={() => {
                   const current = (content as any).links || [];
                   update({ links: [...current, { label: "Nuevo Link", href: "#" }] });
                 }}
                 style={{ flex: 1, padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "0.7rem", cursor: "pointer" }}
               >
                 + Enlace
               </button>
               <button 
                 onClick={() => setCreateModalFor("HEADER_LINK")}
                 style={{ flex: 1, padding: "0.4rem", background: "#F0EBFE", border: "1px solid #875BF733", color: "#875BF7", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}
               >
                 ✨ Crear Página
               </button>
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
               {((content as any).links || []).map((link: any, i: number) => (
                 <div key={i} style={{ padding: "0.6rem", background: "#F9FAFB", borderRadius: "8px", border: "1px solid #EAEEF4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#374151" }}>Enlace {i + 1}</span>
                      <button onClick={() => {
                        const newLinks = [...(content as any).links];
                        newLinks.splice(i, 1);
                        update({ links: newLinks });
                      }} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>×</button>
                    </div>
                    <input 
                      value={link.label} 
                      onChange={(e) => {
                        const newLinks = [...(content as any).links];
                        newLinks[i] = { ...newLinks[i], label: e.target.value };
                        update({ links: newLinks });
                      }}
                      placeholder="Texto del enlace"
                      style={{ ...inputStyle, fontSize: "0.75rem", marginBottom: "0.4rem" }}
                    />
                    <input 
                      value={link.href} 
                      onChange={(e) => {
                        const newLinks = [...(content as any).links];
                        newLinks[i] = { ...newLinks[i], href: e.target.value };
                        update({ links: newLinks });
                      }}
                      placeholder="/url"
                      style={{ ...inputStyle, fontSize: "0.75rem", marginBottom: 0 }}
                    />
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      <CreatePageModal 
        isOpen={!!createModalFor}
        onClose={() => setCreateModalFor(null)}
        onConfirm={async (data) => {
          try {
            const res = await fetch("/api/admin/pages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            const json = await res.json();
            if (json.ok) {
              if (createModalFor === "HEADER_LINK") {
                const current = (content as any).links || [];
                update({ links: [...current, { label: data.title, href: `/${data.slug}` }] });
              } else if (createModalFor === "FOOTER_COLUMN") {
                const current = (content as any).columns || [];
                update({ columns: [...current, { title: data.title, links: [{ label: data.title, href: `/${data.slug}` }] }] });
              }
              // Optional: Add a toast or something
            } else {
              alert(json.error || "Error al crear la página");
            }
          } finally {
            setCreateModalFor(null);
          }
        }}
      />

      {/* FOOTER BLOCK PROPERTIES */}
      {type === "FOOTER" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
           <div style={rowStyle}>
            <label style={labelStyle}>Imagen del Logo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as any).logo || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ logo: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Copyright</label>
            <input value={(content as any).copyright || ""} onChange={(e) => update({ copyright: e.target.value })} style={inputStyle} />
          </div>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #E5E7EB", paddingTop: "1rem" }}>
            <p style={labelStyle}>Columnas de Enlaces</p>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button 
                onClick={() => {
                  const current = (content as any).columns || [];
                  update({ columns: [...current, { title: "Nueva Columna", links: [] }] });
                }}
                style={{ flex: 1, padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "0.7rem", cursor: "pointer" }}
              >
                + Columna
              </button>
              <button 
                onClick={() => setCreateModalFor("FOOTER_COLUMN")}
                style={{ flex: 1, padding: "0.4rem", background: "#F0EBFE", border: "1px solid #875BF733", color: "#875BF7", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}
              >
                ✨ Crear Página
              </button>
            </div>

             {((content as any).columns || []).map((col: any, i: number) => (
               <div key={i} style={{ padding: "0.8rem", background: "#F9FAFB", borderRadius: "8px", marginBottom: "0.8rem", border: "1px solid #EAEEF4" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <input 
                      value={col.title} 
                      onChange={(e) => {
                        const newCols = [...(content as any).columns];
                        newCols[i] = { ...newCols[i], title: e.target.value };
                        update({ columns: newCols });
                      }}
                      style={{ ...inputStyle, marginBottom: 0, width: "70%", fontWeight: 700 }}
                    />
                    <button onClick={() => {
                       const newCols = [...(content as any).columns];
                       newCols.splice(i, 1);
                       update({ columns: newCols });
                    }} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>×</button>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
                    {col.links.map((link: any, j: number) => (
                      <div key={j} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <input 
                          value={link.label}
                          onChange={(e) => {
                             const newCols = [...(content as any).columns];
                             const newLinks = [...newCols[i].links];
                             newLinks[j] = { ...newLinks[j], label: e.target.value };
                             newCols[i] = { ...newCols[i], links: newLinks };
                             update({ columns: newCols });
                          }}
                          placeholder="Texto"
                          style={{ ...inputStyle, marginBottom: 0, fontSize: "0.65rem" }}
                        />
                        <input 
                          value={link.href}
                          onChange={(e) => {
                             const newCols = [...(content as any).columns];
                             const newLinks = [...newCols[i].links];
                             newLinks[j] = { ...newLinks[j], href: e.target.value };
                             newCols[i] = { ...newCols[i], links: newLinks };
                             update({ columns: newCols });
                          }}
                          placeholder="/url"
                          style={{ ...inputStyle, marginBottom: 0, fontSize: "0.65rem" }}
                        />
                         <button onClick={() => {
                           const newCols = [...(content as any).columns];
                           const newLinks = [...newCols[i].links];
                           newLinks.splice(j, 1);
                           newCols[i] = { ...newCols[i], links: newLinks };
                           update({ columns: newCols });
                        }} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem" }}>×</button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newCols = [...(content as any).columns];
                        newCols[i] = { ...newCols[i], links: [...newCols[i].links, { label: "Enlace", href: "#" }] };
                        update({ columns: newCols });
                      }}
                      style={{ fontSize: "0.6rem", background: "white", border: "1px solid #D1D5DB", borderRadius: "4px", padding: "4px", cursor: "pointer", marginTop: "4px" }}
                    >+ Añadir enlace</button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* GALLERY BLOCK */}
      {type === "GALLERY" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
          <p style={labelStyle}>Configuración de Galería</p>
          <div style={rowStyle}>
            <label style={labelStyle}>Columnas</label>
            <select value={(content as GalleryContent).columns} onChange={(e) => update({ columns: Number(e.target.value) as any })} style={inputStyle}>
              <option value={2}>2 Columnas</option>
              <option value={3}>3 Columnas</option>
              <option value={4}>4 Columnas</option>
            </select>
          </div>
          <button
            onClick={() => openMedia((url) => {
              const currentImages = (content as GalleryContent).images || [];
              update({ images: [...currentImages, { src: url, alt: "", label: "" }] });
            })}
            style={{ width: "100%", padding: "0.6rem", background: "#F3F4F6", border: "1px dashed #D1D5DB", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem" }}
          >
            + Añadir imagen
          </button>
          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {((content as GalleryContent).images || []).map((img, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: "4px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                <img src={img.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={() => {
                    const newImages = [...(content as GalleryContent).images];
                    newImages.splice(i, 1);
                    update({ images: newImages });
                  }}
                  style={{ position: "absolute", top: 0, right: 0, background: "rgba(239, 68, 68, 0.8)", color: "white", border: "none", fontSize: "0.6rem", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEPS BLOCK */}
      {type === "STEPS" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
          <p style={labelStyle}>Color de Acento</p>
          <input 
            type="color" 
            value={(content as StepsContent).accentColor || "#daa520"} 
            onChange={(e) => update({ accentColor: e.target.value })} 
            style={{ ...inputStyle, width: "40px" }} 
          />
        </div>
      )}

      {/* AVAILABILITY BLOCK */}
      {type === "AVAILABILITY" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
          <p style={labelStyle}>Color de Botón Reserva</p>
          <input 
            type="color" 
            value={(content as AvailabilityContent).buttonColor || "#daa520"} 
            onChange={(e) => update({ buttonColor: e.target.value })} 
            style={{ ...inputStyle, width: "40px" }} 
          />
        </div>
      )}

      {/* SPACER BLOCK */}
      {type === "SPACER" && !element && (
        <div style={{ background: "#FFF", padding: "1.2rem", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
          <div style={rowStyle}>
            <label style={labelStyle}>Altura (px)</label>
            <input type="number" value={(content as SpacerContent).height} onChange={(e) => update({ height: Number(e.target.value) })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Gradiente</label>
            <select value={(content as SpacerContent).gradient} onChange={(e) => update({ gradient: e.target.value as any })} style={inputStyle}>
              <option value="none">Transparente</option>
              <option value="dark-to-light">Oscuro a Claro</option>
              <option value="light-to-dark">Claro a Oscuro</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
