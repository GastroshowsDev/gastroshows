"use client";

import { SectionContent, ElementData } from "@/lib/blocks/types";
import { ElementRenderer } from "./ElementRenderer";
import { useState } from "react";
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  content: SectionContent;
  isEditing?: boolean;
  onUpdate?: (newContent: SectionContent) => void;
  onSelectElement?: (colIndex: number, elIndex: number) => void;
  selectedElementPath?: { col: number; el: number } | null;
};

// Sortable Wrapper for Elements
function SortableElement({ 
  id, 
  element, 
  isEditing, 
  isSelected, 
  onSelect, 
  onUpdate 
}: { 
  id: string, 
  element: ElementData, 
  isEditing: boolean, 
  isSelected: boolean,
  onSelect: () => void,
  onUpdate: (el: ElementData) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    cursor: isEditing ? "pointer" : "default",
    border: isEditing && isSelected ? "2px solid #875BF7" : (isEditing ? "1px dashed transparent" : "none"),
    borderRadius: "4px",
    padding: isEditing ? "2px" : "0",
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelect(); } }}>
      {isEditing && (
        <div 
          {...attributes} 
          {...listeners} 
          style={{ 
            position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", 
            background: "#875BF7", color: "white", fontSize: "10px", padding: "0 4px", 
            borderRadius: "4px", cursor: "grab", display: isDragging ? "none" : "block",
            zIndex: 20
          }}
        >
          ⋮⋮
        </div>
      )}
      <ElementRenderer element={element} isEditing={isEditing} onUpdate={onUpdate} />
    </div>
  );
}

import { AnimatedWrapper } from "./AnimatedWrapper";

export function SectionBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  // ... state and sensors ...
  const [dragOverCol, setDragOverCol] = useState<number | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // --- Drag & Drop Handlers ---
  const handleDragEnd = (event: DragEndEvent, colIdx: number) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt((active.id as string).split("-").pop() || "0");
    const newIndex = parseInt((over.id as string).split("-").pop() || "0");

    const newCols = [...content.columns];
    newCols[colIdx].elements = arrayMove(newCols[colIdx].elements, oldIndex, newIndex);
    onUpdate?.({ ...content, columns: newCols });
  };

  const onDrop = (e: React.DragEvent, colIdx: number) => {
    e.preventDefault();
    setDragOverCol(null);
    const type = e.dataTransfer.getData("elementType");
    if (!type) return;

    // Create new element based on type with all required properties
    let newEl: ElementData;
    if (type === "HEADING") {
      newEl = { type: "HEADING", text: "Nuevo Título", level: 2, styles: {} };
    } else if (type === "BUTTON") {
      newEl = { type: "BUTTON", text: "Nuevo Botón", link: "#", variant: "primary", size: "md", styles: {} };
    } else if (type === "TEXT") {
      newEl = { type: "TEXT", body: "Nuevo bloque de texto", styles: {} };
    } else if (type === "IMAGE") {
      newEl = { type: "IMAGE", src: "", alt: "", styles: {} };
    } else if (type === "SPACER") {
      newEl = { type: "SPACER", height: 40, styles: {} };
    } else return;

    const newCols = [...content.columns];
    newCols[colIdx].elements.push(newEl);
    onUpdate?.({ ...content, columns: newCols });
  };

  const { styles = {} } = content;

  return (
    <AnimatedWrapper animation={styles.animation}>
      <section style={{
        padding: styles.padding || "4rem 2rem",
        backgroundColor: styles.backgroundColor || "transparent",
        backgroundImage: styles.backgroundImage ? `url(${styles.backgroundImage})` : "none",
        backgroundSize: styles.backgroundSize || "cover",
        position: "relative"
      }}>
        <div 
          style={{
            maxWidth: content.fullWidth ? "100%" : "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: `var(--gs-stack, repeat(${content.columns.length}, 1fr))`,
            gap: "var(--gs-gap, 2rem)"
          } as React.CSSProperties}
        >
          {content.columns.map((col, colIdx) => (
            <div
              key={colIdx}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(colIdx); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => onDrop(e, colIdx)}
              style={{
                minHeight: isEditing ? "100px" : "auto",
                border: isEditing ? `1px dashed ${dragOverCol === colIdx ? "#875BF7" : "#333"}` : "none",
                borderRadius: "8px",
                padding: isEditing ? "1rem" : "0",
                background: dragOverCol === colIdx ? "rgba(135, 91, 247, 0.05)" : "transparent",
                transition: "all 0.2s"
              }}
            >
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, colIdx)}>
                <SortableContext items={col.elements.map((_, i) => `${blockId}-${colIdx}-${i}`)} strategy={verticalListSortingStrategy}>
                  {col.elements.map((el, elIdx) => (
                    <SortableElement
                      key={`${blockId}-${colIdx}-${elIdx}`}
                      id={`${blockId}-${colIdx}-${elIdx}`}
                      element={el}
                      isEditing={isEditing}
                      isSelected={selectedElementPath?.col === colIdx && selectedElementPath?.el === elIdx}
                      onSelect={() => onSelectElement?.(colIdx, elIdx)}
                      onUpdate={(newEl) => {
                        const newCols = [...content.columns];
                        newCols[colIdx].elements[elIdx] = newEl;
                        onUpdate?.({ ...content, columns: newCols });
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              
              {isEditing && col.elements.length === 0 && (
                <div style={{ textAlign: "center", color: "#666", fontSize: "0.8rem", paddingTop: "2rem" }}>
                  Suelta aquí un elemento
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </AnimatedWrapper>
  );
}
