"use client";

import { useState, useEffect } from "react";
import { BlockType, BlockData, BLOCK_DEFAULTS, BLOCK_LABELS } from "@/lib/blocks/types";
import { BlockPropertiesPanel } from "./BlockPropertiesPanel";
import { MediaGallery } from "./MediaGallery";
import { PageBlockList } from "@/components/blocks/BlockRenderer";

type PageData = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  seoTitle: string;
  seoDesc: string;
  blocks: BlockData[];
};

export function PageBuilderEditor({ pageId }: { pageId: string }) {
  const [page, setPage] = useState<PageData | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaCallback, setMediaCallback] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/pages/${pageId}`);
      const json = await res.json();
      if (json.ok) setPage(json.data);
      setLoading(false);
    }
    load();
  }, [pageId]);

  async function save() {
    if (!page) return;
    setSaving(true);
    try {
      // 1. Save metadata
      await fetch(`/api/admin/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          published: page.published,
          seoTitle: page.seoTitle,
          seoDesc: page.seoDesc,
        }),
      });

      // 2. Save blocks
      await fetch(`/api/admin/pages/${pageId}/blocks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks: page.blocks }),
      });

      alert("Cambios guardados con éxito");
    } finally {
      setSaving(false);
    }
  }

  function addBlock(type: BlockType) {
    if (!page) return;
    const newBlock: BlockData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type])),
      order: page.blocks.length,
    };
    setPage({ ...page, blocks: [...page.blocks, newBlock] });
    setSelectedBlockId(newBlock.id);
  }

  function updateBlockContent(id: string, content: any) {
    if (!page) return;
    setPage({
      ...page,
      blocks: page.blocks.map((b) => (b.id === id ? { ...b, content } : b)),
    });
  }

  function moveBlock(id: string, direction: "up" | "down") {
    if (!page) return;
    const index = page.blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === page.blocks.length - 1) return;

    const newBlocks = [...page.blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    // Update order field
    const ordered = newBlocks.map((b, i) => ({ ...b, order: i }));
    setPage({ ...page, blocks: ordered });
  }

  function deleteBlock(id: string) {
    if (!page || !confirm("¿Borrar este bloque?")) return;
    setPage({
      ...page,
      blocks: page.blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })),
    });
    if (selectedBlockId === id) setSelectedBlockId(null);
  }

  if (loading || !page) return <div style={{ padding: "4rem", textAlign: "center" }}>Cargando editor...</div>;

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F4F6FA" }}>
      {/* Sidebar: Blocks & Structure */}
      <aside style={{ width: "280px", background: "white", borderRight: "1px solid #EAEEF4", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #EAEEF4" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>Page Builder</h2>
          <p style={{ fontSize: "0.75rem", color: "#8B94A8", margin: "0.25rem 0 0" }}>Añade y organiza bloques.</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>Bloques Disponibles</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "2rem" }}>
            {Object.entries(BLOCK_LABELS).map(([type, info]) => (
              <button
                key={type}
                onClick={() => addBlock(type as BlockType)}
                style={{
                  padding: "0.75rem 0.5rem", background: "white", border: "1px solid #E5E7EB", borderRadius: "8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#875BF7")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              >
                <span style={{ fontSize: "1.2rem" }}>{info.icon}</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 600 }}>{info.label}</span>
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>Estructura de la página</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {page.blocks.map((block, i) => (
              <div
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                style={{
                  padding: "0.6rem 0.8rem", borderRadius: "8px", border: `1px solid ${selectedBlockId === block.id ? "#875BF7" : "#E5E7EB"}`,
                  background: selectedBlockId === block.id ? "#F0EBFE" : "white", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.8rem"
                }}
              >
                <span style={{ color: "#9CA3AF" }}>{i + 1}</span>
                <span style={{ flex: 1, fontWeight: 500 }}>{BLOCK_LABELS[block.type].label}</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "up"); }} style={{ border: "none", background: "none", cursor: "pointer" }}>▲</button>
                  <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "down"); }} style={{ border: "none", background: "none", cursor: "pointer" }}>▼</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ padding: "1rem", borderTop: "1px solid #EAEEF4" }}>
          <button
            onClick={save}
            disabled={saving}
            style={{ width: "100%", padding: "0.75rem", background: "#875BF7", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
          >
            {saving ? "Guardando..." : "Guardar Página"}
          </button>
        </div>
      </aside>

      {/* Main Canvas (Preview) */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1rem 2rem", background: "white", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              style={{ fontSize: "1.1rem", fontWeight: 700, border: "none", outline: "none", width: "240px" }}
              placeholder="Título de la página"
            />
            <span style={{ color: "#9CA3AF" }}>/</span>
            <input
              value={page.slug}
              onChange={(e) => setPage({ ...page, slug: e.target.value })}
              style={{ fontSize: "0.9rem", color: "#6B7280", border: "none", outline: "none", width: "160px" }}
              placeholder="slug"
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
             <label style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                <input type="checkbox" checked={page.published} onChange={(e) => setPage({ ...page, published: e.target.checked })} />
                Publicada
             </label>
             <a href={`/admin/web/pages`} style={{ fontSize: "0.8rem", color: "#6B7280", textDecoration: "none" }}>Volver al listado</a>
          </div>
        </div>

        {/* Real-time Preview Area */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "#050505" }}>
          <div style={{ flex: 1, position: "relative" }}>
             {/* We wrap PageBlockList to capture clicks for selection */}
             <div style={{ position: "relative" }}>
               {page.blocks.map((block) => (
                 <div
                   key={block.id}
                   onClick={(e) => {
                     setSelectedBlockId(block.id);
                     
                     // Smart Focus Logic
                     const target = e.target as HTMLElement;
                     const field = target.closest("[data-field]")?.getAttribute("data-field");
                     if (field) {
                       // We use a small timeout to ensure the panel has rendered the new block's fields
                       setTimeout(() => {
                         const input = document.getElementById(`field-${field}`);
                         if (input) {
                           input.focus();
                           input.scrollIntoView({ behavior: "smooth", block: "center" });
                           // Highlight effect
                           const originalBg = input.style.background;
                           input.style.background = "#FEF3C7"; // Light yellow
                           setTimeout(() => { input.style.background = originalBg; }, 1000);
                         }
                       }, 50);
                     }
                   }}
                   style={{
                     position: "relative",
                     cursor: "pointer",
                     outline: selectedBlockId === block.id ? "3px solid #875BF7" : "none",
                     outlineOffset: "-3px",
                     zIndex: selectedBlockId === block.id ? 10 : 1,
                   }}
                 >
                    <PageBlockList 
                      blocks={[block]} 
                      isEditing={true} 
                      onUpdateBlock={updateBlockContent} 
                    />
                    
                    {/* Selection Overlay */}
                    {selectedBlockId === block.id && (
                      <div style={{
                        position: "absolute", top: 0, right: 0, padding: "0.5rem",
                        background: "#875BF7", color: "white", fontSize: "0.6rem", fontWeight: 700,
                        textTransform: "uppercase", pointerEvents: "none"
                      }}>
                        {BLOCK_LABELS[block.type].label}
                      </div>
                    )}
                 </div>
               ))}
               
               {page.blocks.length === 0 && (
                 <div style={{ padding: "8rem 2rem", textAlign: "center", color: "rgba(245,240,232,0.3)" }}>
                    <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-cormorant), serif" }}>La página está vacía</p>
                    <p style={{ fontSize: "0.9rem" }}>Añade bloques desde la barra lateral izquierda para empezar a diseñar.</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar: Properties */}
      <aside style={{ width: "320px", background: "white", borderLeft: "1px solid #EAEEF4", overflowY: "auto" }}>
        {selectedBlock ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Editor de Bloque</span>
              <button onClick={() => deleteBlock(selectedBlock.id)} style={{ padding: "0.3rem 0.6rem", background: "#FEE2E2", color: "#EF4444", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}>Borrar</button>
            </div>
            <BlockPropertiesPanel
              type={selectedBlock.type}
              content={selectedBlock.content}
              onChange={(content) => updateBlockContent(selectedBlock.id, content)}
              openMedia={(callback) => {
                setMediaCallback(() => callback);
                setShowMedia(true);
              }}
            />
          </div>
        ) : (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#9CA3AF" }}>
            Selecciona un bloque para editar sus propiedades.
          </div>
        )}
      </aside>

      {/* Media Gallery Modal */}
      {showMedia && (
        <MediaGallery
          onSelect={(url) => {
            if (mediaCallback) mediaCallback(url);
            setShowMedia(false);
          }}
          onClose={() => setShowMedia(false)}
        />
      )}
    </div>
  );
}
