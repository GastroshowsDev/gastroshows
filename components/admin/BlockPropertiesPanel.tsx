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

export function BlockPropertiesPanel({ type, content, onChange, openMedia, element, onElementChange }: Props) {
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
      <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#111827", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Propiedades: {element ? `${element.type}` : (type as any)}
      </h3>

      {/* ATOMIC ELEMENT PROPERTIES */}
      {element && (
        <div style={{ background: "#F9FAFB", padding: "1rem", borderRadius: "8px", marginBottom: "2rem", border: "1px solid #EAEEF4" }}>
          {element.type === "HEADING" && (
            <>
              <div style={rowStyle}>
                <label style={labelStyle}>Nivel de Título</label>
                <select value={(element as any).level || 2} onChange={(e) => updateElement({ level: Number(e.target.value) })} style={inputStyle}>
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>H{n}</option>)}
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
                <label style={labelStyle}>Texto Alternativo (SEO)</label>
                <input value={element.alt || ""} onChange={(e) => updateElement({ alt: e.target.value })} style={inputStyle} />
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
              <option value="float">Flotante (Bucle)</option>
              <option value="pulse">Pulso (Bucle)</option>
              <option value="glitch">Glitch (Efecto Error)</option>
              <option value="shimmer">Shimmer (Brillo)</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <button 
              onClick={() => onElementChange?.(null as any)} 
              style={{ flex: 1, padding: "0.5rem", background: "white", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer" }}
            >
              Cerrar
            </button>
            <button 
              onClick={() => {
                if(confirm("¿Eliminar este elemento?")) {
                  onElementChange?.("DELETE" as any);
                }
              }} 
              style={{ padding: "0.5rem", background: "#FEE2E2", color: "#EF4444", border: "1px solid #FECACA", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer" }}
            >
              🗑
            </button>
          </div>
        </div>
      )}

      {!element && type === "SECTION" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Número de Columnas</label>
            <select 
              value={(content as SectionContent).columns.length} 
              onChange={(e) => {
                const count = Number(e.target.value);
                const currentCols = (content as SectionContent).columns;
                let newCols: ColumnData[] = [];
                for (let i = 0; i < count; i++) {
                  newCols.push(currentCols[i] || { width: `${100/count}%`, elements: [] });
                }
                // Update widths for all
                newCols = newCols.map(c => ({ ...c, width: `${100/count}%` }));
                update({ columns: newCols });
              }} 
              style={inputStyle}
            >
              <option value={1}>1 Columna</option>
              <option value={2}>2 Columnas</option>
              <option value={3}>3 Columnas</option>
              <option value={4}>4 Columnas</option>
            </select>
          </div>

          <div style={{ borderTop: "1px solid #EEE", paddingTop: "1rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "1rem" }}>Estilos de Sección</p>
            
            <div style={rowStyle}>
              <label style={labelStyle}>Relleno Vertical (Padding)</label>
              <input 
                placeholder="4rem 2rem" 
                value={(content as SectionContent).styles?.padding || ""} 
                onChange={(e) => updateStyles(content, { padding: e.target.value })} 
                style={inputStyle} 
              />
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Color de Fondo</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input 
                  type="color" 
                  value={(content as SectionContent).styles?.backgroundColor || "#000000"} 
                  onChange={(e) => updateStyles(content, { backgroundColor: e.target.value })} 
                  style={{ ...inputStyle, width: "40px", padding: "2px" }} 
                />
                <input 
                  value={(content as SectionContent).styles?.backgroundColor || ""} 
                  onChange={(e) => updateStyles(content, { backgroundColor: e.target.value })} 
                  style={{ ...inputStyle, flex: 1 }} 
                  placeholder="#000000"
                />
              </div>
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Imagen de Fondo</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input value={(content as SectionContent).styles?.backgroundImage || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                <button onClick={() => openMedia((url) => updateStyles(content, { backgroundImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
              </div>
            </div>

            {/* Section Effects */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div style={rowStyle}>
                <label style={labelStyle}>Opacidad ({Math.round(((content as SectionContent).styles?.opacity ?? 1) * 100)}%)</label>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={(content as SectionContent).styles?.opacity ?? 1} 
                  onChange={(e) => updateStyles(content, { opacity: parseFloat(e.target.value) })} 
                  style={{ width: "100%" }} 
                />
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Brillo ({Math.round(((content as SectionContent).styles?.brightness ?? 1) * 100)}%)</label>
                <input 
                  type="range" min="0" max="3" step="0.05" 
                  value={(content as SectionContent).styles?.brightness ?? 1} 
                  onChange={(e) => updateStyles(content, { brightness: parseFloat(e.target.value) })} 
                  style={{ width: "100%" }} 
                />
              </div>
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Posición Fondo</label>
              <select 
                value={(content as SectionContent).styles?.backgroundPosition || "center"} 
                onChange={(e) => updateStyles(content, { backgroundPosition: e.target.value })} 
                style={inputStyle}
              >
                <option value="center">Centro</option>
                <option value="top">Arriba</option>
                <option value="bottom">Abajo</option>
                <option value="left">Izquierda</option>
                <option value="right">Derecha</option>
                <option value="center top">Centro Arriba</option>
                <option value="center bottom">Centro Abajo</option>
              </select>
            </div>
          </div>


        </>
      )}

      {/* HERO PROPERTIES */}
      {type === "HERO" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Imagen de fondo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input id="field-bgImage" value={(content as HeroContent).bgImage} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ bgImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto superior (Eyebrow)</label>
            <input id="field-eyebrow" placeholder="Ej: BARCELONA" value={(content as HeroContent).eyebrow || ""} onChange={(e) => update({ eyebrow: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título principal</label>
            <input id="field-title" value={(content as HeroContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título acento (dorado)</label>
            <input id="field-titleAccent" value={(content as HeroContent).titleAccent} onChange={(e) => update({ titleAccent: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Subtítulo</label>
            <textarea id="field-subtitle" value={(content as HeroContent).subtitle} onChange={(e) => update({ subtitle: e.target.value })} style={{ ...inputStyle, height: "80px" }} />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={rowStyle}>
              <label style={labelStyle}>Texto Botón 1</label>
              <input id="field-ctaPrimaryText" value={(content as HeroContent).ctaPrimaryText} onChange={(e) => update({ ctaPrimaryText: e.target.value })} style={inputStyle} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Link Botón 1</label>
              <input id="field-ctaPrimaryLink" value={(content as HeroContent).ctaPrimaryLink} onChange={(e) => update({ ctaPrimaryLink: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={rowStyle}>
              <label style={labelStyle}>Texto Botón 2</label>
              <input id="field-ctaSecondaryText" value={(content as HeroContent).ctaSecondaryText} onChange={(e) => update({ ctaSecondaryText: e.target.value })} style={inputStyle} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Link Botón 2</label>
              <input id="field-ctaSecondaryLink" value={(content as HeroContent).ctaSecondaryLink} onChange={(e) => update({ ctaSecondaryLink: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div style={{ padding: "1rem", background: "#F3F4F6", borderRadius: "8px", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "0.75rem" }}>Animaciones por elemento</p>
            
            <div style={rowStyle}>
              <label style={labelStyle}>Animación Eyebrow</label>
              <select value={(content as HeroContent).eyebrowAnim || "none"} onChange={(e) => update({ eyebrowAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Deslizar Arriba</option>
                <option value="reveal-up">Revelar</option>
              </select>
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Animación Título</label>
              <select value={(content as HeroContent).titleAnim || (content as HeroContent).animation || "none"} onChange={(e) => update({ titleAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Deslizar Arriba</option>
                <option value="bounce-in">Rebote</option>
                <option value="glitch">Glitch</option>
                <option value="flip-x">Giro 3D</option>
              </select>
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Animación Subtítulo</label>
              <select value={(content as HeroContent).subtitleAnim || "none"} onChange={(e) => update({ subtitleAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-left">Desde Izquierda</option>
                <option value="blur-in">Desenfoque</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={rowStyle}>
                <label style={labelStyle}>Animación Botón 1</label>
                <select value={(content as HeroContent).ctaPrimaryAnim || "none"} onChange={(e) => update({ ctaPrimaryAnim: e.target.value })} style={inputStyle}>
                  <option value="none">Sin animación</option>
                  <option value="scale-in">Escalar</option>
                  <option value="shimmer">Brillo (Shimmer)</option>
                  <option value="float">Flotar</option>
                </select>
              </div>
              <div style={rowStyle}>
                <label style={labelStyle}>Animación Botón 2</label>
                <select value={(content as HeroContent).ctaSecondaryAnim || "none"} onChange={(e) => update({ ctaSecondaryAnim: e.target.value })} style={inputStyle}>
                  <option value="none">Sin animación</option>
                  <option value="fade-in">Fade In</option>
                  <option value="slide-right">Desde Derecha</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={rowStyle}>
              <label style={labelStyle}>Opacidad Fondo ({Math.round(((content as HeroContent).overlayOpacity || 100))}%)</label>
              <input id="field-overlayOpacity" type="range" min="0" max="100" value={(content as HeroContent).overlayOpacity} onChange={(e) => update({ overlayOpacity: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Brillo ({Math.round(((content as any).brightness ?? 1) * 100)}%)</label>
              <input type="range" min="0" max="3" step="0.05" value={(content as any).brightness ?? 1} onChange={(e) => update({ brightness: parseFloat(e.target.value) })} style={{ width: "100%" }} />
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Posición Fondo</label>
            <select value={(content as HeroContent).bgPosition || "center"} onChange={(e) => update({ bgPosition: e.target.value })} style={inputStyle}>
              <option value="center">Centro</option>
              <option value="top">Arriba</option>
              <option value="bottom">Abajo</option>
              <option value="center 20%">Arriba (20%)</option>
              <option value="center 80%">Abajo (80%)</option>
            </select>
          </div>


        </>
      )}

      {/* TEXT PROPERTIES */}
      {type === "TEXT" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Eyebrow (pequeño arriba)</label>
            <input id="field-eyebrow" value={(content as TextContent).eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título</label>
            <input id="field-title" value={(content as TextContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título acento (dorado/cursiva)</label>
            <input id="field-titleAccent" value={(content as TextContent).titleAccent} onChange={(e) => update({ titleAccent: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto del cuerpo</label>
            <textarea id="field-body" value={(content as TextContent).body} onChange={(e) => update({ body: e.target.value })} style={{ ...inputStyle, height: "120px" }} />
          </div>
          {/* ... style controls remain ... */}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Tamaño fuente</label>
              <input id="field-fontSize" placeholder="1.1rem" value={(content as TextContent).fontSize || ""} onChange={(e) => update({ fontSize: e.target.value })} style={{ ...inputStyle, marginBottom: 0 }} />
            </div>
            <div>
              <label style={labelStyle}>Color texto</label>
              <input id="field-color" type="color" value={(content as TextContent).color || "#F5F0E8"} onChange={(e) => update({ color: e.target.value })} style={{ ...inputStyle, marginBottom: 0, padding: "2px" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", marginBottom: 0 }}>
              <input id="field-bold" type="checkbox" checked={(content as TextContent).bold || false} onChange={(e) => update({ bold: e.target.checked })} />
              Negrita
            </label>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", marginBottom: 0 }}>
              <input id="field-italic" type="checkbox" checked={(content as TextContent).italic || false} onChange={(e) => update({ italic: e.target.checked })} />
              Cursiva
            </label>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Animación de entrada</label>
            <select id="field-animation" value={(content as TextContent).animation || "none"} onChange={(e) => update({ animation: e.target.value as any })} style={inputStyle}>
              <option value="none">Ninguna</option>
              <option value="typewriter">Máquina de escribir</option>
              <option value="fade">Fundido</option>
              <option value="slide">Deslizar</option>
              <option value="zoom">Zoom</option>
              <option value="bounce">Rebote</option>
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Efecto al pasar el ratón (Hover)</label>
            <select id="field-hoverEffect" value={(content as TextContent).hoverEffect || "none"} onChange={(e) => update({ hoverEffect: e.target.value as any })} style={inputStyle}>
              <option value="none">Sin efecto</option>
              <option value="grow">Agrandar</option>
              <option value="glow">Brillar</option>
              <option value="lift">Elevar</option>
            </select>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Alineación</label>
            <select id="field-alignment" value={(content as TextContent).alignment} onChange={(e) => update({ alignment: e.target.value as any })} style={inputStyle}>
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
        </>
      )}

      {/* IMAGE PROPERTIES */}
      {type === "IMAGE" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Imagen</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as ImageContent).src} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ src: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto Alternativo (SEO)</label>
            <input value={(content as ImageContent).alt} onChange={(e) => update({ alt: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Pie de foto</label>
            <input value={(content as ImageContent).caption} onChange={(e) => update({ caption: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={{ ...labelStyle, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" checked={(content as ImageContent).fullWidth} onChange={(e) => update({ fullWidth: e.target.checked })} />
              Ancho completo
            </label>
          </div>
        </>
      )}

      {/* CTA PROPERTIES */}
      {type === "CTA" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Imagen de fondo (opcional)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as CtaContent).bgImage || ""} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ bgImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto superior (Eyebrow)</label>
            <input value={(content as CtaContent).eyebrow || ""} onChange={(e) => update({ eyebrow: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título</label>
            <input value={(content as CtaContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Cuerpo del texto</label>
            <textarea value={(content as CtaContent).body} onChange={(e) => update({ body: e.target.value })} style={{ ...inputStyle, height: "80px" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={rowStyle}>
              <label style={labelStyle}>Opacidad Fondo ({Math.round(((content as any).overlayOpacity ?? 1) * 100)}%)</label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={(content as any).overlayOpacity ?? 1} 
                onChange={(e) => update({ overlayOpacity: parseFloat(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Brillo ({Math.round(((content as any).brightness ?? 1) * 100)}%)</label>
              <input 
                type="range" min="0" max="3" step="0.05" 
                value={(content as any).brightness ?? 1} 
                onChange={(e) => update({ brightness: parseFloat(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Posición Fondo</label>
            <select value={(content as CtaContent).bgPosition || "center"} onChange={(e) => update({ bgPosition: e.target.value })} style={inputStyle}>
              <option value="center">Centro</option>
              <option value="top">Arriba</option>
              <option value="bottom">Abajo</option>
              <option value="center 30%">Arriba (30%)</option>
              <option value="center 70%">Abajo (70%)</option>
            </select>
          </div>


          
          <div style={{ padding: "1rem", background: "#F3F4F6", borderRadius: "8px", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "0.75rem" }}>Animaciones</p>
            <div style={rowStyle}>
              <label style={labelStyle}>Animación Título</label>
              <select value={(content as CtaContent).titleAnim || "fade-in"} onChange={(e) => update({ titleAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Deslizar Arriba</option>
                <option value="bounce-in">Rebote</option>
              </select>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Animación Cuerpo</label>
              <select value={(content as CtaContent).bodyAnim || "fade-in"} onChange={(e) => update({ bodyAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-left">Desde Izquierda</option>
              </select>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Animación Botón</label>
              <select value={(content as CtaContent).buttonAnim || "fade-in"} onChange={(e) => update({ buttonAnim: e.target.value })} style={inputStyle}>
                <option value="none">Sin animación</option>
                <option value="scale-in">Escalar</option>
                <option value="shimmer">Brillo (Shimmer)</option>
              </select>
            </div>
          </div>
        </>
      )}
      {type === "GALLERY" && (
        <>
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
            style={{ width: "100%", padding: "0.6rem", background: "#F3F4F6", border: "1px dashed #D1D5DB", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}
          >
            + Añadir imagen a galería
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
        </>
      )}

      {/* CTA PROPERTIES */}
      {type === "CTA" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Imagen de fondo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input id="field-bgImage" value={(content as CtaContent).bgImage} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ bgImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título</label>
            <input id="field-title" value={(content as CtaContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título acento (dorado)</label>
            <input id="field-titleAccent" value={(content as CtaContent).titleAccent} onChange={(e) => update({ titleAccent: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto botón</label>
            <input id="field-buttonText" value={(content as CtaContent).buttonText} onChange={(e) => update({ buttonText: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>URL botón</label>
            <input id="field-buttonLink" value={(content as CtaContent).buttonLink} onChange={(e) => update({ buttonLink: e.target.value })} style={inputStyle} />
          </div>
        </>
      )}

      {/* STEPS PROPERTIES */}
      {type === "STEPS" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Color de Acento (Opcional)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="color" 
                value={(content as StepsContent).accentColor || "#daa520"} 
                onChange={(e) => update({ accentColor: e.target.value })} 
                style={{ ...inputStyle, width: "40px", padding: "2px", marginBottom: 0 }} 
              />
              <input 
                value={(content as StepsContent).accentColor || ""} 
                onChange={(e) => update({ accentColor: e.target.value })} 
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }} 
                placeholder="Por defecto (Dorado)"
              />
              <button 
                onClick={() => update({ accentColor: "" })} 
                style={{ padding: "0.5rem", background: "#F3F4F6", color: "#4B5563", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                title="Limpiar color"
              >
                ↺
              </button>
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", fontStyle: "italic", marginTop: "1rem" }}>
            * El texto de este bloque se edita directamente haciendo clic sobre él en la vista previa.
          </p>
        </>
      )}

      {/* AVAILABILITY PROPERTIES */}
      {type === "AVAILABILITY" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Subtítulo (pequeño arriba)</label>
            <input id="field-subtitle" value={(content as AvailabilityContent).subtitle} onChange={(e) => update({ subtitle: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título principal</label>
            <input id="field-title" value={(content as AvailabilityContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto del botón</label>
            <input id="field-buttonText" value={(content as AvailabilityContent).buttonText || "Reservar ahora"} onChange={(e) => update({ buttonText: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Color del botón (Opcional)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="color" 
                value={(content as AvailabilityContent).buttonColor || "#daa520"} 
                onChange={(e) => update({ buttonColor: e.target.value })} 
                style={{ ...inputStyle, width: "40px", padding: "2px", marginBottom: 0 }} 
              />
              <input 
                value={(content as AvailabilityContent).buttonColor || ""} 
                onChange={(e) => update({ buttonColor: e.target.value })} 
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }} 
                placeholder="Por defecto (Dorado)"
              />
              <button 
                onClick={() => update({ buttonColor: "" })} 
                style={{ padding: "0.5rem", background: "#F3F4F6", color: "#4B5563", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                title="Limpiar color"
              >
                ↺
              </button>
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", fontStyle: "italic", marginTop: "1rem" }}>
            * El calendario y las plazas se actualizan automáticamente desde la base de datos.
          </p>
        </>
      )}

      {/* SPACER PROPERTIES */}
      {type === "SPACER" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Altura (píxeles)</label>
            <input type="number" value={(content as SpacerContent).height} onChange={(e) => update({ height: Number(e.target.value) })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Gradiente</label>
            <select value={(content as SpacerContent).gradient} onChange={(e) => update({ gradient: e.target.value as any })} style={inputStyle}>
              <option value="none">Ninguno (Transparente)</option>
              <option value="dark-to-light">Oscuro a Claro</option>
              <option value="light-to-dark">Claro a Oscuro</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
