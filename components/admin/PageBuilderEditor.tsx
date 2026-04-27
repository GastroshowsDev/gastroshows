"use client";

import { useState, useEffect, useRef } from "react";
import { 
  BlockType, 
  BlockData, 
  BLOCK_DEFAULTS, 
  BLOCK_LABELS, 
  ELEMENT_LABELS 
} from "@/lib/blocks/types";
import { BlockPropertiesPanel } from "./BlockPropertiesPanel";
import { MediaGallery } from "./MediaGallery";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  KeyboardSensor,
  useSensor, 
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy,
  sortableKeyboardCoordinates 
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableBlock } from "./SortableBlock";

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
  const [history, setHistory] = useState<PageData[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedElementPath, setSelectedElementPath] = useState<{ col: number; el: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaCallback, setMediaCallback] = useState<((url: string) => void) | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Helper to update state and history
  const updatePageState = (newPage: PageData) => {
    if (page) {
      setHistory(prev => [JSON.parse(JSON.stringify(page)), ...prev].slice(0, 20));
    }
    setPage(newPage);
  };

  const undo = () => {
    if (history.length === 0) return;
    const [prevPage, ...rest] = history;
    setPage(prevPage);
    setHistory(rest);
    setSelectedBlockId(null);
    setSelectedElementPath(null);
  };

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/pages/${pageId}`);
      const json = await res.json();
      if (json.ok) {
        const pageData = json.data;
        const migratedBlocks = pageData.blocks.map((block: any) => {
          const content = block.content;
          if (block.type === "COLUMNS" || (block.type === "SECTION" && !content.columns?.[0]?.elements)) {
            const rawColumns = content.columns;
            const oldColumns = Array.isArray(rawColumns) ? rawColumns : (rawColumns ? [rawColumns] : []);
            const newColumns = oldColumns.map((col: any) => ({
              width: col.width || `${100 / (oldColumns.length || 1)}%`,
              elements: [
                ...(col.title ? [{ type: "HEADING", level: 3, text: col.title }] : []),
                ...(col.text ? [{ type: "TEXT", body: col.text }] : []),
                ...(col.image ? [{ type: "IMAGE", src: col.image, alt: col.title || "" }] : [])
              ]
            }));
            return { ...block, type: "SECTION", content: { columns: newColumns, styles: content.styles || { padding: "4rem 2rem" } } };
          }
          if (block.type === "TEXT" && !content.columns) {
            return {
              ...block,
              type: "SECTION",
              content: {
                columns: [{
                  width: "100%",
                  elements: [
                    ...(content.title ? [{ type: "HEADING", level: 2, text: content.title }] : []),
                    ...(content.body ? [{ type: "TEXT", body: content.body }] : [])
                  ]
                }],
                styles: content.styles || { padding: "4rem 2rem" }
              }
            };
          }
          return block;
        });
        setPage({ ...pageData, blocks: migratedBlocks });
      }
      setLoading(false);
    }
    load();
  }, [pageId]);

  async function save() {
    if (!page) return;
    setSaving(true);
    try {
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
      content: JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type] || {})),
      order: page.blocks.length,
    };
    updatePageState({ ...page, blocks: [...page.blocks, newBlock] });
    setSelectedBlockId(newBlock.id);
    setSelectedElementPath(null);
  }

  function updateBlockContent(id: string, content: any) {
    if (!page) return;
    updatePageState({
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
    
    const ordered = newBlocks.map((b, i) => ({ ...b, order: i }));
    updatePageState({ ...page, blocks: ordered });
  }

  function deleteBlock(id: string) {
    if (!page || !confirm("¿Borrar este bloque?")) return;
    updatePageState({
      ...page,
      blocks: page.blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })),
    });
    if (selectedBlockId === id) setSelectedBlockId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !page) return;

    if (active.id !== over.id) {
      const oldIndex = page.blocks.findIndex((b) => b.id === active.id);
      const newIndex = page.blocks.findIndex((b) => b.id === over.id);
      const reordered = arrayMove(page.blocks, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
      updatePageState({ ...page, blocks: reordered });
    }
  }

  if (loading || !page) return <div style={{ padding: "4rem", textAlign: "center" }}>Cargando editor...</div>;

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F4F6FA" }}>
      <aside style={{ width: "280px", background: "white", borderRight: "1px solid #EAEEF4", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #EAEEF4" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>Page Builder</h2>
          <p style={{ fontSize: "0.75rem", color: "#8B94A8", margin: "0.25rem 0 0" }}>Añade y organiza bloques.</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>1. Estructura / Layout</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {Object.entries(BLOCK_LABELS).filter(([type]) => type === "SECTION" || type === "AVAILABILITY").map(([type, info]) => (
              <button
                key={type}
                onClick={() => addBlock(type as BlockType)}
                style={{
                  padding: "0.75rem 0.5rem", background: "white", border: "1px solid #E5E7EB", borderRadius: "8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{info.icon}</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 600 }}>{info.label}</span>
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>2. Elementos (Arrastra a una columna)</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "2rem" }}>
            {Object.entries(ELEMENT_LABELS).map(([type, info]) => (
              <div
                key={type}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("elementType", type)}
                style={{
                  padding: "0.6rem 0.5rem", background: "white", border: "1px solid #E5E7EB", borderRadius: "8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", cursor: "grab",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "1rem" }}>{info.icon}</span>
                <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>{info.label}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>3. Presets</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "2rem" }}>
            {Object.entries(BLOCK_LABELS).filter(([type]) => type !== "SECTION" && type !== "AVAILABILITY" && type !== "COLUMNS").map(([type, info]) => (
              <button
                key={type}
                onClick={() => addBlock(type as BlockType)}
                style={{
                  padding: "0.5rem", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{info.icon}</span>
                <span style={{ fontSize: "0.6rem", fontWeight: 500 }}>{info.label}</span>
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
                <span style={{ flex: 1, fontWeight: 500 }}>{BLOCK_LABELS[block.type]?.label || `Bloque (${block.type})`}</span>
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

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1rem 2rem", background: "white", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              style={{ fontSize: "1.1rem", fontWeight: 700, border: "none", outline: "none", width: "240px" }}
            />
            <span style={{ color: "#9CA3AF" }}>/</span>
            <input
              value={page.slug}
              onChange={(e) => setPage({ ...page, slug: e.target.value })}
              style={{ fontSize: "0.9rem", color: "#6B7280", border: "none", outline: "none", width: "160px" }}
            />
            
            {/* UNDO BUTTON */}
            <button 
              onClick={undo} 
              disabled={history.length === 0}
              style={{ 
                marginLeft: "2rem", padding: "0.4rem 0.8rem", background: "#F3F4F6", border: "1px solid #D1D5DB", 
                borderRadius: "6px", fontSize: "0.75rem", cursor: history.length === 0 ? "not-allowed" : "pointer",
                opacity: history.length === 0 ? 0.5 : 1, display: "flex", alignItems: "center", gap: "0.4rem"
              }}
            >
              ↩ Deshacer
            </button>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
             <label style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                <input type="checkbox" checked={page.published} onChange={(e) => setPage({ ...page, published: e.target.checked })} />
                Publicada
             </label>
             <a href={`/admin/web/pages`} style={{ fontSize: "0.8rem", color: "#6B7280", textDecoration: "none" }}>Volver</a>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "var(--gs-bg)" }}>
          <div style={{ flex: 1, position: "relative" }}>
             <div style={{ position: "relative" }}>
               <DndContext
                 sensors={sensors}
                 collisionDetection={closestCenter}
                 onDragEnd={handleDragEnd}
                 modifiers={[restrictToVerticalAxis]}
               >
                 <SortableContext
                   items={page.blocks.map((b) => b.id)}
                   strategy={verticalListSortingStrategy}
                 >
                   {page.blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        id={block.id}
                        isSelected={selectedBlockId === block.id}
                        label={BLOCK_LABELS[block.type]?.label || block.type}
                        onClick={(e) => {
                          setSelectedBlockId(block.id);
                          const target = e.target as HTMLElement;
                          const field = target.closest("[data-field]")?.getAttribute("data-field");
                          if (field) {
                            setTimeout(() => {
                              const input = document.getElementById(`field-${field}`);
                              if (input) {
                                input.focus();
                                input.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }, 50);
                          }
                        }}
                      >
                        <PageBlockList 
                          blocks={[block]} 
                          isEditing={true} 
                          onUpdateBlock={updateBlockContent}
                          onSelectElement={(id, col, el) => {
                            setSelectedBlockId(id);
                            setSelectedElementPath({ col, el });
                          }}
                          selectedElementPath={selectedBlockId === block.id ? selectedElementPath : null}
                        />
                      </SortableBlock>
                    ))}
                 </SortableContext>
               </DndContext>
             </div>
          </div>
        </div>
      </main>

      <aside style={{ width: "320px", background: "white", borderLeft: "1px solid #EAEEF4", overflowY: "auto" }}>
        {selectedBlock ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Propiedades</span>
              <button onClick={() => deleteBlock(selectedBlock.id)} style={{ padding: "0.3rem 0.6rem", background: "#FEE2E2", color: "#EF4444", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}>Borrar</button>
            </div>
            <BlockPropertiesPanel
              type={selectedBlock.type}
              content={selectedBlock.content}
              onChange={(content) => updateBlockContent(selectedBlock.id, content)}
              element={selectedElementPath ? (selectedBlock.content as any).columns?.[selectedElementPath.col]?.elements?.[selectedElementPath.el] : null}
              onElementChange={(newEl) => {
                if (!selectedElementPath) return;
                const newContent = JSON.parse(JSON.stringify(selectedBlock.content));
                if (newEl === null) {
                   setSelectedElementPath(null);
                   return;
                }
                if (newEl === ("DELETE" as any)) {
                  newContent.columns[selectedElementPath.col].elements.splice(selectedElementPath.el, 1);
                  setSelectedElementPath(null);
                } else {
                  newContent.columns[selectedElementPath.col].elements[selectedElementPath.el] = newEl;
                }
                updateBlockContent(selectedBlock.id, newContent);
              }}
              openMedia={(callback) => {
                setMediaCallback(() => callback);
                setShowMedia(true);
              }}
            />
          </div>
        ) : (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#9CA3AF" }}>
            Selecciona un bloque para editar.
          </div>
        )}
      </aside>

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
