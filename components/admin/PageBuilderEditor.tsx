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
import { GlobalStylesPanel } from "./GlobalStylesPanel";
import { SectionPresetModal } from "./SectionPresetModal";
import { BlockFloatingToolbar } from "./BlockFloatingToolbar";
import { SECTION_PRESETS, HEADER_PRESETS, SectionPreset } from "@/lib/blocks/presets";
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
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  const [activeRightTab, setActiveRightTab] = useState<"properties" | "seo" | "global">("properties");
  const [leftTab, setLeftTab] = useState<"insert" | "layers">("insert");
  const [presetModalMode, setPresetModalMode] = useState<"SECTION" | "HEADER" | null>(null);
  const [selectedBlockRect, setSelectedBlockRect] = useState<DOMRect | null>(null);
  const [masterStyles, setMasterStyles] = useState<any>({
    h1: { fontSize: "3.5rem", fontWeight: 700, color: "#111827" },
    h2: { fontSize: "2.5rem", fontWeight: 700, color: "#111827" },
    h3: { fontSize: "1.75rem", fontWeight: 600, color: "#111827" },
    p: { fontSize: "1rem", color: "#4B5563" },
    button: { backgroundColor: "#875BF7", color: "#FFFFFF", borderRadius: "8px" },
    a: { color: "#875BF7" }
  });

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
          
          // 1. If it's already a modern SECTION with columns and elements, keep it
          if (block.type === "SECTION" && content.columns?.[0]?.elements) {
            return block;
          }

          // 2. Universal Migration for legacy or imported blocks with flat fields
          // (TEXT, HERO, CTA, COLUMNS, etc.)
          const elements: any[] = [];
          
          // Pull eyebrow
          if (content.eyebrow) elements.push({ type: "TEXT", body: content.eyebrow, id: `mig_${Math.random()}`, styles: { textAlign: "center", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.2em", color: "#daa520" } });
          
          // Pull title
          if (content.title) elements.push({ type: "HEADING", level: 2, text: content.title, id: `mig_${Math.random()}`, styles: { textAlign: "center" } });
          
          // Pull titleAccent
          if (content.titleAccent) elements.push({ type: "HEADING", level: 3, text: content.titleAccent, id: `mig_${Math.random()}`, styles: { textAlign: "center", fontStyle: "italic", color: "#daa520" } });
          
          // Pull body
          if (content.body) elements.push({ type: "TEXT", body: content.body, id: `mig_${Math.random()}` });

          // Pull buttons (CTA)
          if (content.ctaPrimaryText) elements.push({ type: "BUTTON", text: content.ctaPrimaryText, link: content.ctaPrimaryLink || "#", variant: "primary", id: `mig_${Math.random()}` });
          if (content.ctaSecondaryText) elements.push({ type: "BUTTON", text: content.ctaSecondaryText, link: content.ctaSecondaryLink || "#", variant: "outline", id: `mig_${Math.random()}` });

          // 3. Handle legacy COLUMNS (where data was directly on the column)
          let finalColumns = content.columns;
          if (block.type === "COLUMNS" || (content.columns && !content.columns[0]?.elements)) {
            const oldColumns = Array.isArray(content.columns) ? content.columns : (content.columns ? [content.columns] : []);
            finalColumns = oldColumns.map((col: any) => ({
              width: col.width || `${100 / (oldColumns.length || 1)}%`,
              elements: [
                ...(col.title ? [{ type: "HEADING", level: 3, text: col.title, id: `mig_${Math.random()}` }] : []),
                ...(col.text ? [{ type: "TEXT", body: col.text, id: `mig_${Math.random()}` }] : []),
                ...(col.image ? [{ type: "IMAGE", src: col.image, alt: col.title || "", id: `mig_${Math.random()}` }] : [])
              ]
            }));
          }

          // If we found any legacy fields or need to wrap elements
          if (elements.length > 0 || block.type === "TEXT" || block.type === "HERO" || block.type === "CTA" || block.type === "COLUMNS") {
            const columns = elements.length > 0 ? [{
              width: "100%",
              elements: [
                ...elements,
                ...(finalColumns?.[0]?.elements || [])
              ]
            }] : finalColumns;
            
            return {
              ...block,
              type: "SECTION",
              content: {
                ...content,
                columns,
                styles: content.styles || { padding: "5rem 2rem" }
              }
            };
          }

          return block;
        });

        // 2. Sanitize IDs (for elements missing IDs from old imports)
        const sanitizedBlocks = sanitizePageData(migratedBlocks);
        
        setPage({ ...pageData, blocks: sanitizedBlocks });
      }
      setLoading(false);
    }
    load();

    function sanitizePageData(blocks: BlockData[]): BlockData[] {
      return blocks.map(block => {
        if (!block.content.columns) return block;
        return {
          ...block,
          content: {
            ...block.content,
            columns: block.content.columns.map((col: any) => ({
              ...col,
              elements: sanitizeElements(col.elements)
            }))
          }
        };
      });
    }

    function sanitizeElements(elements: ElementData[]): ElementData[] {
      return (elements || []).map(el => {
        const newEl = { ...el };
        if (!newEl.id) {
          newEl.id = `el_${Math.random().toString(36).substr(2, 9)}`;
        }
        if (newEl.type === "CONTAINER" && newEl.content.columns) {
          newEl.content.columns = newEl.content.columns.map((col: any) => ({
            ...col,
            elements: sanitizeElements(col.elements)
          }));
        }
        return newEl;
      });
    }

    // Load master styles
    async function loadStyles() {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.master_styles) {
        try {
          setMasterStyles(JSON.parse(json.master_styles));
        } catch (e) {
          console.error("Failed to parse master styles", e);
        }
      }
    }
    loadStyles();
  }, [pageId]);

  async function saveMasterStyles(newStyles: any) {
    setMasterStyles(newStyles);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "master_styles", value: JSON.stringify(newStyles) })
    });
    window.dispatchEvent(new CustomEvent("master-styles-updated"));
  }

  async function save() {
    if (!page) return;
    setSaving(true);
    emitStatus("saving");
    try {
      const res = await fetch(`/api/admin/pages/${pageId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          published: page.published,
          seoTitle: page.seoTitle,
          seoDesc: page.seoDesc,
          blocks: page.blocks
        }),
      });

      if (res.ok) {
        emitStatus("saved");
      } else {
        console.error("Save failed");
        emitStatus("unsaved");
      }
      
      setTimeout(() => emitStatus("idle"), 8000);
    } catch (e) {
      console.error(e);
      emitStatus("unsaved");
    } finally {
      setSaving(false);
    }
  }

  function getInsertionIndex() {
    if (!page || page.blocks.length === 0) return 0;
    const container = document.getElementById("gs-editor-canvas-container");
    if (!container) return page.blocks.length;

    const midPoint = container.scrollTop + (container.clientHeight / 2);
    
    let closestIndex = page.blocks.length;
    let minDistance = Infinity;

    page.blocks.forEach((block, idx) => {
      const el = document.getElementById(`block-${block.id}`);
      if (el) {
        const elMid = el.offsetTop + (el.clientHeight / 2);
        const distance = Math.abs(midPoint - elMid);
        if (distance < minDistance) {
          minDistance = distance;
          // If the midpoint of the viewport is below the midpoint of the block, 
          // we want to insert AFTER this block.
          closestIndex = (midPoint > elMid) ? idx + 1 : idx;
        }
      }
    });

    return closestIndex;
  }

  function addBlock(type: BlockType) {
    if (!page) return;
    const insertIndex = getInsertionIndex();
    const newBlock: BlockData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type] || {})),
      order: insertIndex,
    };

    const newBlocks = [...page.blocks];
    newBlocks.splice(insertIndex, 0, newBlock);
    
    updatePageState({ 
      ...page, 
      blocks: newBlocks.map((b, i) => ({ ...b, order: i }))
    });
    setSelectedBlockId(newBlock.id);
    setSelectedElementPath(null);
  }

  function addPreset(preset: SectionPreset) {
    if (!page) return;
    const insertIndex = getInsertionIndex();
    const newBlocksToAdd = preset.blocks.map((b, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      type: b.type,
      content: JSON.parse(JSON.stringify(b.content)),
      order: insertIndex + i,
    }));

    const updatedBlocks = [...page.blocks];
    updatedBlocks.splice(insertIndex, 0, ...newBlocksToAdd);

    updatePageState({ 
      ...page, 
      blocks: updatedBlocks.map((b, i) => ({ ...b, order: i }))
    });
    setSelectedBlockId(newBlocksToAdd[0].id);
    setSelectedElementPath(null);
    setPresetModalMode(null);
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

  function duplicateBlock(id: string) {
    if (!page) return;
    const index = page.blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const blockToCopy = page.blocks[index];
    const newBlock = {
      ...JSON.parse(JSON.stringify(blockToCopy)),
      id: Math.random().toString(36).substr(2, 9),
      order: index + 1
    };

    const newBlocks = [...page.blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    
    updatePageState({ 
      ...page, 
      blocks: newBlocks.map((b, i) => ({ ...b, order: i }))
    });
    setSelectedBlockId(newBlock.id);
  }

  function deleteBlock(id: string) {
    if (!page || !confirm("¿Borrar este bloque?")) return;
    updatePageState({
      ...page,
      blocks: page.blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })),
    });
    if (selectedBlockId === id) setSelectedBlockId(null);
  }

  // Update selected block rect for floating toolbar
  useEffect(() => {
    if (!selectedBlockId) {
      setSelectedBlockRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.getElementById(`block-${selectedBlockId}`);
      if (el) {
        setSelectedBlockRect(el.getBoundingClientRect());
      }
    };

    updateRect();
    const container = document.getElementById("gs-editor-canvas-container");
    if (container) {
      container.addEventListener("scroll", updateRect);
      window.addEventListener("resize", updateRect);
      return () => {
        container.removeEventListener("scroll", updateRect);
        window.removeEventListener("resize", updateRect);
      };
    }
  }, [selectedBlockId, page?.blocks]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !page) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // 1. Block Reordering (Top-level blocks have simple IDs, elements usually have - or are UUIDs)
    const isBlock = page.blocks.some(b => b.id === activeId);
    const isOverBlock = page.blocks.some(b => b.id === overId);

    if (isBlock && isOverBlock) {
      const oldIndex = page.blocks.findIndex((b) => b.id === activeId);
      const newIndex = page.blocks.findIndex((b) => b.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(page.blocks, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
        updatePageState({ ...page, blocks: reordered });
      }
      return;
    }

    // 2. Element Movement (Any element to any position)
    const sourceElement = findElementById(page.blocks, activeId);
    if (!sourceElement) return;

    // Remove from source
    let newBlocks = removeElementById(page.blocks, activeId);

    // Find target block and column
    // The overId could be an element ID or a column target (col-blockId-colIdx)
    if (overId.startsWith("col-")) {
      const parts = overId.split("-");
      const targetBlockId = parts[1];
      const targetColIdx = parseInt(parts[2]);
      newBlocks = insertElementInColumn(newBlocks, targetBlockId, targetColIdx, sourceElement);
    } else {
      newBlocks = insertElementNearId(newBlocks, overId, sourceElement);
    }

    updatePageState({ ...page, blocks: newBlocks });
  }

  function insertElementInColumn(blocks: BlockData[], blockId: string, colIdx: number, element: ElementData): BlockData[] {
    return blocks.map(block => {
      if (block.id !== blockId) return block;
      const newCols = [...(block.content.columns || [])];
      if (newCols[colIdx]) {
        newCols[colIdx].elements.push(element);
      }
      return { ...block, content: { ...block.content, columns: newCols } };
    });
  }

  function findElementById(blocks: BlockData[], id: string): ElementData | null {
    for (const block of blocks) {
      if (block.content.columns) {
        for (const col of block.content.columns) {
          const found = findInElements(col.elements, id);
          if (found) return found;
        }
      }
    }
    return null;
  }

  function findInElements(elements: ElementData[], id: string): ElementData | null {
    for (const el of elements) {
      if (el.id === id) return el;
      if (el.type === "CONTAINER" && el.content.columns) {
        for (const col of el.content.columns) {
          const found = findInElements(col.elements, id);
          if (found) return found;
        }
      }
    }
    return null;
  }

  function removeElementById(blocks: BlockData[], id: string): BlockData[] {
    return blocks.map(block => ({
      ...block,
      content: {
        ...block.content,
        columns: block.content.columns?.map((col: any) => ({
          ...col,
          elements: removeFromElements(col.elements, id)
        }))
      }
    }));
  }

  function removeFromElements(elements: ElementData[], id: string): ElementData[] {
    return elements
      .filter(el => el.id !== id)
      .map(el => {
        if (el.type === "CONTAINER" && el.content.columns) {
          return {
            ...el,
            content: {
              ...el.content,
              columns: el.content.columns.map((col: any) => ({
                ...col,
                elements: removeFromElements(col.elements, id)
              }))
            }
          };
        }
        return el;
      });
  }

  function insertElementNearId(blocks: BlockData[], targetId: string, element: ElementData): BlockData[] {
    return blocks.map(block => {
      if (!block.content.columns) return block;
      return {
        ...block,
        content: {
          ...block.content,
          columns: block.content.columns.map((col: any) => ({
            ...col,
            elements: insertInElements(col.elements, targetId, element)
          }))
        }
      };
    });
  }

  function insertInElements(elements: ElementData[], targetId: string, element: ElementData): ElementData[] {
    const newElements: ElementData[] = [];
    let inserted = false;

    for (const el of elements) {
      if (el.id === targetId) {
        newElements.push(element);
        inserted = true;
      }
      
      if (el.type === "CONTAINER" && el.content.columns) {
        newElements.push({
          ...el,
          content: {
            ...el.content,
            columns: el.content.columns.map((col: any) => ({
              ...col,
              elements: insertInElements(col.elements, targetId, element)
            }))
          }
        });
      } else {
        newElements.push(el);
      }
    }

    // If not inserted yet and this was the target (meaning we might be dropping into an empty column)
    // dnd-kit sometimes gives the column path as overId
    // But for simplicity, if we reach the end of a list and haven't found it, we don't force it here.
    // The onDrop handler in ColumnsRenderer handles dropping NEW elements.
    // Moving EXISTING elements is handled by this DragEnd.
    
    return newElements;
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
                <button onClick={() => setPresetModalMode("HEADER")} style={insertButtonStyle("#F0EBFE", "#875BF733")}>
                  <span style={{ fontSize: "1rem" }}>☰</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Menú</span>
                </button>
                <button onClick={() => setPresetModalMode("SECTION")} style={insertButtonStyle()}>
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
              <button
                onClick={() => {
                  setSelectedBlockId(null);
                  setActiveRightTab("global" as any);
                }}
                style={{
                  padding: "0.8rem", borderRadius: "10px", border: "2px dashed #875BF7",
                  background: activeRightTab === "global" ? "#F0EBFE" : "transparent",
                  color: "#875BF7", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer",
                  marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
                }}
              >
                ✨ Estilos Maestros
              </button>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  if (over && active.id !== over.id) {
                    const oldIndex = page.blocks.findIndex(b => b.id === active.id);
                    const newIndex = page.blocks.findIndex(b => b.id === over.id);
                    const reordered = arrayMove(page.blocks, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
                    updatePageState({ ...page, blocks: reordered });
                  }
                }}
              >
                <SortableContext items={page.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {page.blocks.map((block, i) => (
                    <SidebarSortableItem 
                      key={block.id}
                      block={block}
                      index={i}
                      isSelected={selectedBlockId === block.id}
                      onClick={() => {
                        setSelectedBlockId(block.id);
                        setActiveRightTab("properties");
                      }}
                      onMoveUp={() => moveBlock(block.id, "up")}
                      onMoveDown={() => moveBlock(block.id, "down")}
                    />
                  ))}
                </SortableContext>
              </DndContext>
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
                  checked={!!page.published} 
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
               {selectedBlockId && (
                 <BlockFloatingToolbar 
                   blockId={selectedBlockId}
                   onDelete={deleteBlock}
                   onMove={moveBlock}
                   onDuplicate={duplicateBlock}
                   onSettings={() => setActiveRightTab("properties")}
                   rect={selectedBlockRect}
                 />
               )}
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
          {activeRightTab === "global" ? (
            <GlobalStylesPanel styles={masterStyles} onUpdate={saveMasterStyles} />
          ) : activeRightTab === "properties" ? (
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
      {presetModalMode && (
        <SectionPresetModal 
          title={presetModalMode === "HEADER" ? "Añadir Menú" : "Añadir Sección"}
          description={presetModalMode === "HEADER" ? "Elige un diseño para tu cabecera" : "Elige una plantilla para empezar rápidamente"}
          presets={presetModalMode === "HEADER" ? HEADER_PRESETS : SECTION_PRESETS}
          onSelect={addPreset} 
          onClose={() => setPresetModalMode(null)} 
        />
      )}
    </div>
  );
}

function SidebarSortableItem({ block, index, isSelected, onClick, onMoveUp, onMoveDown }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.6rem 0.8rem", 
    borderRadius: "8px", 
    border: `1px solid ${isSelected ? "#875BF7" : "#E5E7EB"}`,
    background: isSelected ? "#F0EBFE" : "white", 
    cursor: "pointer",
    display: "flex", 
    alignItems: "center", 
    gap: "0.6rem", 
    fontSize: "0.75rem",
    boxShadow: isSelected ? "0 4px 6px -1px rgba(135, 91, 247, 0.1)" : "none",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: "relative" as const,
    marginBottom: "0.5rem"
  };

  const layerButtonStyle = { 
    border: "none", background: "none", cursor: "pointer", fontSize: "0.6rem", 
    color: "#9CA3AF", padding: "2px", borderRadius: "4px" 
  };

  return (
    <div ref={setNodeRef} style={style} onClick={onClick}>
      <div {...attributes} {...listeners} style={{ cursor: "grab", color: "#9CA3AF", fontSize: "0.6rem", padding: "4px" }}>⠿</div>
      <span style={{ color: "#9CA3AF", fontSize: "0.6rem", width: "12px" }}>{index + 1}</span>
      <span style={{ flex: 1, fontWeight: 600, color: isSelected ? "#875BF7" : "#374151" }}>{BLOCK_LABELS[block.type]?.label || block.type}</span>
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} style={layerButtonStyle}>▲</button>
        <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} style={layerButtonStyle}>▼</button>
      </div>
    </div>
  );
}

