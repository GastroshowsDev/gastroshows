"use client";

import { BlockType, BlockContent, HeroContent, TextContent, ImageContent, GalleryContent, CtaContent, SpacerContent } from "@/lib/blocks/types";

type Props = {
  type: BlockType;
  content: BlockContent;
  onChange: (newContent: BlockContent) => void;
  openMedia: (callback: (url: string) => void) => void;
};

export function BlockPropertiesPanel({ type, content, onChange, openMedia }: Props) {
  function update(fields: Partial<BlockContent>) {
    onChange({ ...content, ...fields } as BlockContent);
  }

  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" };
  const inputStyle = { width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #D1D5DB", fontSize: "0.85rem", marginBottom: "1rem" };
  const rowStyle = { marginBottom: "1rem" };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Propiedades: {type}
      </h3>

      {/* HERO PROPERTIES */}
      {type === "HERO" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Imagen de fondo</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={(content as HeroContent).bgImage} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ bgImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título principal</label>
            <input value={(content as HeroContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título acento (dorado)</label>
            <input value={(content as HeroContent).titleAccent} onChange={(e) => update({ titleAccent: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Subtítulo</label>
            <textarea value={(content as HeroContent).subtitle} onChange={(e) => update({ subtitle: e.target.value })} style={{ ...inputStyle, height: "80px" }} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Opacidad fondo (0-100)</label>
            <input type="number" value={(content as HeroContent).overlayOpacity} onChange={(e) => update({ overlayOpacity: Number(e.target.value) })} style={inputStyle} />
          </div>
        </>
      )}

      {/* TEXT PROPERTIES */}
      {type === "TEXT" && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>Eyebrow (pequeño arriba)</label>
            <input value={(content as TextContent).eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título</label>
            <input value={(content as TextContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto del cuerpo</label>
            <textarea value={(content as TextContent).body} onChange={(e) => update({ body: e.target.value })} style={{ ...inputStyle, height: "120px" }} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Alineación</label>
            <select value={(content as TextContent).alignment} onChange={(e) => update({ alignment: e.target.value as any })} style={inputStyle}>
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

      {/* GALLERY PROPERTIES */}
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
              <input value={(content as CtaContent).bgImage} readOnly style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              <button onClick={() => openMedia((url) => update({ bgImage: url }))} style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📷</button>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Título</label>
            <input value={(content as CtaContent).title} onChange={(e) => update({ title: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Texto botón</label>
            <input value={(content as CtaContent).buttonText} onChange={(e) => update({ buttonText: e.target.value })} style={inputStyle} />
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>URL botón</label>
            <input value={(content as CtaContent).buttonLink} onChange={(e) => update({ buttonLink: e.target.value })} style={inputStyle} />
          </div>
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
