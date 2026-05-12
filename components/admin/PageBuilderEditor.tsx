"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Globe } from "lucide-react";
import { 
  BlockType, 
  BlockData, 
  ElementData,
  BLOCK_DEFAULTS, 
  BLOCK_LABELS, 
  ELEMENT_LABELS 
} from "@/lib/blocks/types";
import { BlockPropertiesPanel } from "./BlockPropertiesPanel";
import { PageSeoPanel } from "./PageSeoPanel";
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
  const [selectedElementPath, setSelectedElementPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaCallback, setMediaCallback] = useState<((url: string) => void) | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<"properties" | "seo">("properties");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const emitStatus = (status: "idle" | "unsaved" | "saving" | "saved") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("page-builder-status", { detail: status }));
    }
  };

  // Helper to update state and history
  const updatePageState = (newPage: PageData) => {
    if (page) {
      setHistory(prev => [JSON.parse(JSON.stringify(page)), ...prev].slice(0, 20));
    }
    setPage(newPage);
    emitStatus("unsaved");
  };

  const undo = () => {
    if (history.length === 0) return;
    const [prevPage, ...rest] = history;
    setPage(prevPage);
    setHistory(rest);
    setSelectedBlockId(null);
    setSelectedElementPath(null);
    emitStatus("unsaved");
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
    emitStatus("saving");
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

      emitStatus("saved");
      
      // Auto-revert to idle after 8 seconds
      setTimeout(() => emitStatus("idle"), 8000);
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

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // 1. Block Reordering (Top-level)
    if (!activeId.includes("-")) {
      const oldIndex = page.blocks.findIndex((b) => b.id === activeId);
      const newIndex = page.blocks.findIndex((b) => b.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(page.blocks, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
        updatePageState({ ...page, blocks: reordered });
      }
      return;
    }

    // 2. Element Reordering (Cross-container)
    const sourcePath = activeId;
    const targetPath = overId;

    const activeEl = getElementByPath(page.blocks, sourcePath);
    if (!activeEl) return;

    // Remove from source
    let newBlocks = updateElementByPath(page.blocks, sourcePath, "DELETE");

    // Insert at target
    // We need a helper to insert at a specific position
    newBlocks = insertElementByPath(newBlocks, targetPath, activeEl);

    updatePageState({ ...page, blocks: newBlocks });
  }

  function insertElementByPath(blocks: BlockData[], path: string, element: ElementData): BlockData[] {
    const parts = path.split("-");
    const blockId = parts[0];
    
    return blocks.map(block => {
      if (block.id !== blockId) return block;
      
      const newBlock = JSON.parse(JSON.stringify(block));
      let current: any = newBlock.content;
      
      for (let i = 1; i < parts.length; i += 2) {
        const colIdx = parseInt(parts[i]);
        const elIdx = parseInt(parts[i+1]);
        
        if (i + 1 === parts.length - 1) {
          // Insert BEFORE the target element
          current.columns[colIdx].elements.splice(elIdx, 0, element);
          break;
        }
        current = current.columns[colIdx].elements[elIdx].content;
      }
      return newBlock;
    });
  }

  // Recursive helpers for deep elements
  function getElementByPath(blocks: BlockData[], path: string): ElementData | null {
    const parts = path.split("-");
    const blockId = parts[0];
    const block = blocks.find(b => b.id === blockId);
    if (!block) return null;

    // Handle Virtual Header/Footer Elements
    if (parts[1] === "logo") {
      return { 
        type: "IMAGE", 
        src: block.content.logo || "", 
        alt: "Logo", 
        styles: { textAlign: "left" },
        // Add metadata to identify it as a virtual element
        isVirtual: true,
        virtualPath: path
      } as any;
    }
    if (parts[1] === "link") {
       const idx = parseInt(parts[2]);
       const links = block.content.links || [];
       const link = links[idx];
       if (!link) return null;
       return { 
         type: "BUTTON", 
         text: link.label, 
         link: link.href, 
         variant: "outline", 
         size: "sm",
         isVirtual: true,
         virtualPath: path
       } as any;
    }
    if (parts[1] === "cta") {
      return { 
        type: "BUTTON", 
        text: block.content.ctaText || "", 
        link: block.content.ctaLink || "", 
        variant: "primary", 
        size: "md",
        isVirtual: true,
        virtualPath: path
      } as any;
    }
    if (parts[1] === "coltitle") {
      const idx = parseInt(parts[2]);
      const col = block.content.columns?.[idx];
      if (!col) return null;
      return { 
        type: "HEADING", 
        text: col.title, 
        level: 4,
        isVirtual: true,
        virtualPath: path
      } as any;
    }
    if (parts[1] === "copyright") {
      return { 
        type: "TEXT", 
        body: block.content.copyright || "",
        isVirtual: true,
        virtualPath: path
      } as any;
    }

    let current: any = block.content;
    for (let i = 1; i < parts.length; i += 2) {
      const colIdx = parseInt(parts[i]);
      const elIdx = parseInt(parts[i+1]);
      const el = current.columns?.[colIdx]?.elements?.[elIdx];
      if (!el) return null;
      if (i + 1 === parts.length - 1) return el;
      current = el.content;
    }
    return null;
  }

  function updateElementByPath(blocks: BlockData[], path: string, newEl: ElementData | null | "DELETE"): BlockData[] {
    const parts = path.split("-");
    const blockId = parts[0];
    
    return blocks.map(block => {
      if (block.id !== blockId) return block;
      
      const newBlock = JSON.parse(JSON.stringify(block));

      // Handle Virtual Header/Footer Updates
      if (parts[1] === "logo") {
        if (newEl === "DELETE") newBlock.content.logo = "";
        else if (newEl) newBlock.content.logo = (newEl as any).src;
        return newBlock;
      }
      if (parts[1] === "link") {
        const idx = parseInt(parts[2]);
        if (newEl === "DELETE") {
          newBlock.content.links.splice(idx, 1);
        } else if (newEl) {
          newBlock.content.links[idx] = { 
            ...newBlock.content.links[idx], 
            label: (newEl as any).text, 
            href: (newEl as any).link 
          };
        }
        return newBlock;
      }
      if (parts[1] === "cta") {
        if (newEl === "DELETE") {
          newBlock.content.ctaText = "";
          newBlock.content.ctaLink = "";
        } else if (newEl) {
          newBlock.content.ctaText = (newEl as any).text;
          newBlock.content.ctaLink = (newEl as any).link;
        }
        return newBlock;
      }
      if (parts[1] === "coltitle") {
        const idx = parseInt(parts[2]);
        if (newEl) newBlock.content.columns[idx].title = (newEl as any).text;
        return newBlock;
      }
      if (parts[1] === "copyright") {
        if (newEl) newBlock.content.copyright = (newEl as any).body;
        return newBlock;
      }

      let current: any = newBlock.content;
      
      for (let i = 1; i < parts.length; i += 2) {
        const colIdx = parseInt(parts[i]);
        const elIdx = parseInt(parts[i+1]);
        
        if (i + 1 === parts.length - 1) {
          if (newEl === "DELETE") {
            current.columns[colIdx].elements.splice(elIdx, 1);
          } else if (newEl === null) {
            // No-op or handle closing
          } else {
            current.columns[colIdx].elements[elIdx] = newEl;
          }
          break;
        }
        current = current.columns[colIdx].elements[elIdx].content;
      }
      return newBlock;
    });
  }

  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [leftTab, setLeftTab] = useState<"insert" | "layers">("insert");
  const isResizing = useRef(false);

  // Sidebar Styles Helpers
  const sectionHeaderStyle = { 
    fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" as const, 
    color: "#9CA3AF", marginBottom: "0.8rem", marginTop: "0.5rem", letterSpacing: "0.05em" 
  };
  
  const insertButtonStyle = (bg = "white", border = "1px solid #E5E7EB") => ({
    padding: "0.6rem 0.4rem", background: bg, border, borderRadius: "8px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", cursor: "pointer",
    transition: "all 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  } as React.CSSProperties);

  const draggableItemStyle = (bg = "white", border = "1px solid #E5E7EB") => ({
    padding: "0.6rem 0.4rem", background: bg, border, borderRadius: "8px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", cursor: "grab",
    transition: "all 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  } as React.CSSProperties);

  const layerButtonStyle = { 
    border: "none", background: "none", cursor: "pointer", fontSize: "0.6rem", 
    color: "#9CA3AF", padding: "2px", borderRadius: "4px" 
  };

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 250 && newWidth <= 600) {
      setSidebarWidth(newWidth);
    }
  };

  if (loading || !page) return <div style={{ padding: "4rem", textAlign: "center" }}>Cargando editor...</div>;

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F4F6FA" }}>
      {/* Sidebar Izquierda ... */}
      {/* Sidebar Izquierda */}
      <aside style={{ width: "260px", background: "white", borderRight: "1px solid #EAEEF4", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "1.2rem", borderBottom: "1px solid #EAEEF4", display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "32px", height: "32px", background: "#875BF7", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900 }}>G</div>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, margin: 0, color: "#111827" }}>Builder</h2>
        </div>

        {/* Sidebar Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #EAEEF4" }}>
          <button 
            onClick={() => setLeftTab("insert")}
            style={{ 
              flex: 1, padding: "0.75rem", fontSize: "0.7rem", fontWeight: 700, border: "none", 
              background: leftTab === "insert" ? "white" : "#F9FAFB",
              color: leftTab === "insert" ? "#875BF7" : "#6B7280",
              borderBottom: leftTab === "insert" ? "2px solid #875BF7" : "none",
              cursor: "pointer"
            }}
          >
            INSERTAR
          </button>
          <button 
            onClick={() => setLeftTab("layers")}
            style={{ 
              flex: 1, padding: "0.75rem", fontSize: "0.7rem", fontWeight: 700, border: "none", 
              background: leftTab === "layers" ? "white" : "#F9FAFB",
              color: leftTab === "layers" ? "#875BF7" : "#6B7280",
              borderBottom: leftTab === "layers" ? "2px solid #875BF7" : "none",
              cursor: "pointer"
            }}
          >
            ESTRUCTURA
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {leftTab === "insert" ? (
            <>
              <p style={sectionHeaderStyle}>1. Estructura</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <button onClick={() => addBlock("HEADER")} style={insertButtonStyle("#F0EBFE", "#875BF733")}>
                  <span style={{ fontSize: "1rem" }}>☰</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Menú</span>
                </button>
                <button onClick={() => addBlock("SECTION")} style={insertButtonStyle()}>
                  <span style={{ fontSize: "1rem" }}>🔳</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Sección</span>
                </button>
                <button onClick={() => addBlock("FOOTER")} style={insertButtonStyle()}>
                  <span style={{ fontSize: "1rem" }}>🏁</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Footer</span>
                </button>
              </div>

              <p style={sectionHeaderStyle}>2. Elementos</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {Object.entries(ELEMENT_LABELS).filter(([type]) => type !== "AVAILABILITY" && type !== "CALENDAR").map(([type, info]) => (
                  <div
                    key={type}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("elementType", type)}
                    style={draggableItemStyle()}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{info.icon}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>{info.label}</span>
                  </div>
                ))}
              </div>

              <p style={sectionHeaderStyle}>3. Widgets</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <button onClick={() => addBlock("AVAILABILITY")} style={insertButtonStyle()}>
                  <span style={{ fontSize: "1rem" }}>📅</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Disponibilidad</span>
                </button>
                
                {[
                  { type: "REVIEWS",  label: "Google Reviews", icon: "⭐" },
                  { type: "FORM",     label: "Formulario",     icon: "📋" },
                  { type: "CALENDAR", label: "Calendario",     icon: "📆" }
                ].map((widget) => (
                  <div
                    key={widget.type}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("elementType", widget.type)}
                    style={draggableItemStyle("#F0EBFE", "#875BF733")}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{widget.icon}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "#875BF7" }}>{widget.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {page.blocks.map((block, i) => (
                <div
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  style={{
                    padding: "0.6rem 0.8rem", borderRadius: "8px", border: `1px solid ${selectedBlockId === block.id ? "#875BF7" : "#E5E7EB"}`,
                    background: selectedBlockId === block.id ? "#F0EBFE" : "white", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.75rem",
                    boxShadow: selectedBlockId === block.id ? "0 4px 6px -1px rgba(135, 91, 247, 0.1)" : "none"
                  }}
                >
                  <span style={{ color: "#9CA3AF", fontSize: "0.6rem", width: "12px" }}>{i + 1}</span>
                  <span style={{ flex: 1, fontWeight: 600, color: selectedBlockId === block.id ? "#875BF7" : "#374151" }}>{BLOCK_LABELS[block.type]?.label || block.type}</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "up"); }} style={layerButtonStyle}>▲</button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "down"); }} style={layerButtonStyle}>▼</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ padding: "1rem", borderTop: "1px solid #EAEEF4", background: "#F9FAFB" }}>
          <button
            onClick={save}
            disabled={saving}
            style={{ 
              width: "100%", padding: "0.75rem", background: "#875BF7", color: "white", 
              border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", 
              fontSize: "0.8rem", boxShadow: "0 4px 12px rgba(135, 91, 247, 0.25)",
              transition: "transform 0.1s active"
            }}
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </aside>


      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1rem 2rem", background: "white", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("gs-toggle-sidebar"))}
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem",
                cursor: "pointer",
                color: "var(--color-admin-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                marginRight: "0.5rem"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-admin-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <Menu size={20} />
            </button>

            <input
              value={page.title}
              onChange={(e) => {
                setPage({ ...page, title: e.target.value });
                emitStatus("unsaved");
              }}
              style={{ fontSize: "1.1rem", fontWeight: 700, border: "none", outline: "none", width: "160px" }}
            />
            <span style={{ color: "#9CA3AF" }}>/</span>
            <input
              value={page.slug}
              onChange={(e) => {
                setPage({ ...page, slug: e.target.value });
                emitStatus("unsaved");
              }}
              style={{ fontSize: "0.8rem", color: "#6B7280", border: "none", outline: "none", width: "120px" }}
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
             <label style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", marginRight: "1rem" }}>
                <input 
                  type="checkbox" 
                  checked={page.published} 
                  onChange={(e) => {
                    setPage({ ...page, published: e.target.checked });
                    emitStatus("unsaved");
                  }} 
                />
                Publicada
             </label>
             <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                title="Ver web pública"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid #EAEEF4",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  marginRight: "1rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.borderColor = "#efb810";
                  e.currentTarget.style.background = "#fef8e7";
                  e.currentTarget.style.color = "#efb810";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "#EAEEF4";
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                <Globe size={18} />
              </a>

             <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "6px", padding: "0.2rem", marginRight: "1rem" }}>
               <button 
                 onClick={() => setPreviewMode("desktop")}
                 style={{ padding: "0.3rem 0.6rem", background: previewMode === "desktop" ? "white" : "transparent", boxShadow: previewMode === "desktop" ? "0 1px 2px rgba(0,0,0,0.1)" : "none", border: "none", borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer", color: previewMode === "desktop" ? "black" : "#6b7280" }}
               >💻 Escritorio</button>
               <button 
                 onClick={() => setPreviewMode("mobile")}
                 style={{ padding: "0.3rem 0.6rem", background: previewMode === "mobile" ? "white" : "transparent", boxShadow: previewMode === "mobile" ? "0 1px 2px rgba(0,0,0,0.1)" : "none", border: "none", borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer", color: previewMode === "mobile" ? "black" : "#6b7280" }}
               >📱 Móvil</button>
             </div>
             <a href={`/admin/web`} style={{ fontSize: "0.8rem", color: "#6B7280", textDecoration: "none" }}>Volver</a>
          </div>
        </div>

        <div id="gs-editor-canvas-container" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "var(--gs-bg)", alignItems: "center" }}>
          <div 
            className={previewMode === "mobile" ? "gs-mobile-preview" : ""}
            style={{ 
              flex: 1, 
              position: "relative", 
              width: previewMode === "mobile" ? "414px" : "100%",
              transition: "width 0.3s ease",
              margin: "0 auto",
              backgroundColor: "white",
              boxShadow: previewMode === "mobile" ? "0 0 20px rgba(0,0,0,0.05)" : "none",
              minHeight: "100%",
            }}
          >
             <div style={{ position: "relative" }}>
               <DndContext
                 sensors={sensors}
                 collisionDetection={closestCenter}
                 onDragStart={({ active }) => setActiveId(active.id as string)}
                 onDragEnd={(e) => { handleDragEnd(e); setActiveId(null); }}
                 onDragCancel={() => setActiveId(null)}
                 modifiers={activeId?.includes("-") ? [] : [restrictToVerticalAxis]}
               >
                 <SortableContext
                   items={page.blocks.map((b) => b.id)}
                   strategy={verticalListSortingStrategy}
                 >
                   {page.blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        id={block.id}
                        isSticky={block.type === "HEADER" && (block.content as any).isSticky}
                        isSelected={selectedBlockId === block.id && !selectedElementPath}
                        label={BLOCK_LABELS[block.type]?.label || block.type}
                        onDelete={() => deleteBlock(block.id)}
                        onClick={(e) => {
                          setSelectedBlockId(block.id);
                          setSelectedElementPath(null);
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
                          onSelectElement={(id) => {
                            const blockId = id.split("-")[0];
                            setSelectedBlockId(blockId);
                            setSelectedElementPath(id);
                          }}
                          selectedElementPath={selectedElementPath}
                        />
                      </SortableBlock>
                    ))}
                 </SortableContext>
               </DndContext>
             </div>
          </div>
        </div>
      </main>

      <aside style={{ width: `${sidebarWidth}px`, background: "white", borderLeft: "1px solid #EAEEF4", display: "flex", flexDirection: "column", position: "relative", flexShrink: 0 }}>
        {/* Resizer Handle */}
        <div 
          onMouseDown={startResizing}
          style={{
            position: "absolute",
            left: "-3px",
            top: 0,
            bottom: 0,
            width: "6px",
            cursor: "col-resize",
            zIndex: 10,
            background: "transparent",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#875BF733"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        />

        <div style={{ display: "flex", borderBottom: "1px solid #EAEEF4" }}>
          <button 
            onClick={() => setActiveRightTab("properties")}
            style={{ flex: 1, padding: "0.8rem", border: "none", background: activeRightTab === "properties" ? "white" : "#F9FAFB", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", borderBottom: activeRightTab === "properties" ? "2px solid #875BF7" : "none", color: activeRightTab === "properties" ? "#875BF7" : "#6B7280" }}
          >
            Propiedades
          </button>
          <button 
            onClick={() => setActiveRightTab("seo")}
            style={{ flex: 1, padding: "0.8rem", border: "none", background: activeRightTab === "seo" ? "white" : "#F9FAFB", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", borderBottom: activeRightTab === "seo" ? "2px solid #875BF7" : "none", color: activeRightTab === "seo" ? "#875BF7" : "#6B7280" }}
          >
            SEO
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {activeRightTab === "properties" ? (
            selectedBlock ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "0.8rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Contenido</span>
                  <button onClick={() => deleteBlock(selectedBlock.id)} style={{ padding: "0.2rem 0.4rem", background: "#FEE2E2", color: "#EF4444", border: "none", borderRadius: "4px", fontSize: "0.6rem", cursor: "pointer" }}>Borrar</button>
                </div>
                <BlockPropertiesPanel
                  type={selectedBlock.type}
                  content={selectedBlock.content}
                  onChange={(content) => updateBlockContent(selectedBlock.id, content)}
                  element={selectedElementPath ? getElementByPath(page.blocks, selectedElementPath) : null}
                  onElementChange={(newEl) => {
                    if (!selectedElementPath) return;
                    if (newEl === null) {
                       setSelectedElementPath(null);
                       return;
                    }
                    const newBlocks = updateElementByPath(page.blocks, selectedElementPath, newEl);
                    updatePageState({ ...page, blocks: newBlocks });
                    if ((newEl as any) === "DELETE") setSelectedElementPath(null);
                  }}
                  openMedia={(callback) => {
                    setMediaCallback(() => callback);
                    setShowMedia(true);
                  }}
                />
              </div>
            ) : (
              <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#9CA3AF", fontSize: "0.7rem" }}>
                Selecciona un bloque para editar sus propiedades.
              </div>
            )
          ) : (
            <PageSeoPanel 
              page={page} 
              onUpdate={(newPage) => {
                setPage(newPage);
                emitStatus("unsaved");
              }}
              openMedia={(callback) => {
                setMediaCallback(() => callback);
                setShowMedia(true);
              }}
            />
          )}
        </div>
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
