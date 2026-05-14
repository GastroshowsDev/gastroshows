import { ColumnData, ElementData, BLOCK_DEFAULTS } from "@/lib/blocks/types";
import { ElementRenderer } from "../ElementRenderer";
import { useState } from "react";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { LayoutHandles } from "../../admin/LayoutHandles";

type Props = {
  blockId: string;
  columns: ColumnData[];
  isEditing?: boolean;
  onUpdate: (newColumns: ColumnData[]) => void;
  onSelectElement?: (id: string) => void;
  selectedElementPath?: string | null;
  fullWidth?: boolean;
};

function SortableElement({ 
  id, 
  element, 
  isEditing, 
  isSelected, 
  onSelect, 
  onUpdate,
  onSelectSubElement,
  selectedElementPath
}: { 
  id: string, 
  element: ElementData, 
  isEditing: boolean, 
  isSelected: boolean,
  onSelect: (id: string) => void,
  onUpdate: (el: ElementData) => void,
  onSelectSubElement?: (path: string) => void,
  selectedElementPath?: string | null
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
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`layout-handle-container ${isSelected ? "is-selected" : ""} ${element.type === "TEXT" || element.type === "HEADING" ? "no-handles" : ""}`}
      onClick={(e) => { 
        if(isEditing) { 
          if (element.type !== "TEXT" && element.type !== "HEADING") {
            e.stopPropagation();
          }
          onSelect(id); 
        } 
      }}
    >
      {isEditing && (
        <div 
          {...attributes} 
          {...listeners} 
          style={{ 
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", 
            background: "#875BF7", color: "white", fontSize: "12px", padding: "2px 8px", 
            borderRadius: "4px", cursor: "grab", display: isDragging ? "none" : "block",
            zIndex: 20, boxShadow: "0 2px 8px rgba(135,91,247,0.4)",
            fontWeight: 700
          }}
          onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          title="Mover y seleccionar elemento"
        >
          ⠿
        </div>
      )}

      {isEditing && isSelected && (
        <button
          onClick={(e) => { e.stopPropagation(); onUpdate("DELETE" as any); }}
          style={{
            position: "absolute", top: "5px", right: "5px",
            width: "24px", height: "24px", borderRadius: "50%",
            background: "#FEE2E2", color: "#EF4444", border: "1px solid #FECACA",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 101, boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: "0.6rem"
          }}
          title="Eliminar elemento"
        >
          🗑️
        </button>
      )}
      <ElementRenderer 
        id={id} 
        element={element} 
        isEditing={isEditing} 
        onUpdate={onUpdate} 
        onSelectElement={onSelectSubElement}
        selectedElementPath={selectedElementPath}
      />
      
      {isEditing && isSelected && element.type !== "TEXT" && element.type !== "HEADING" && (
        <LayoutHandles 
          styles={element.styles || {}} 
          onUpdate={(newStyles) => onUpdate({ ...element, styles: { ...element.styles, ...newStyles } })}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

function ColumnContainer({
  blockId,
  colIdx,
  col,
  isEditing,
  onUpdate,
  onSelectElement,
  selectedElementPath,
  activeColumns
}: {
  blockId: string,
  colIdx: number,
  col: ColumnData,
  isEditing: boolean,
  onUpdate: (newCols: ColumnData[]) => void,
  onSelectElement?: (id: string) => void,
  selectedElementPath?: string | null,
  activeColumns: ColumnData[]
}) {
  const columnId = `col-${blockId}-${colIdx}`;
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: isEditing ? "80px" : "auto",
        border: isEditing ? `1px dashed ${isOver ? "#875BF7" : "#333"}` : "none",
        borderRadius: "8px",
        padding: isEditing ? "1rem" : "0",
        background: isOver ? "rgba(135, 91, 247, 0.08)" : "transparent",
        transition: "all 0.2s",
        minWidth: 0,
        overflow: "hidden",
        position: "relative"
      }}
    >
      <SortableContext 
        items={col.elements.map((el, i) => el.id || `${blockId}-${colIdx}-${i}`)} 
        strategy={verticalListSortingStrategy}
      >
        {col.elements.map((el, elIdx) => {
          const elId = el.id || `${blockId}-${colIdx}-${elIdx}`;
          return (
            <SortableElement
              key={elId}
              id={elId}
              element={el}
              isEditing={isEditing}
              isSelected={selectedElementPath === elId}
              onSelect={(id) => onSelectElement?.(id)}
              onUpdate={(newEl) => {
                const newCols = [...activeColumns];
                if (newEl === ("DELETE" as any)) {
                  newCols[colIdx].elements.splice(elIdx, 1);
                } else {
                  newCols[colIdx].elements[elIdx] = newEl;
                }
                onUpdate(newCols);
              }}
              onSelectSubElement={onSelectElement}
              selectedElementPath={selectedElementPath}
            />
          );
        })}
      </SortableContext>
      
      {isEditing && col.elements.length === 0 && (
        <div style={{ textAlign: "center", color: "#666", fontSize: "0.7rem", paddingTop: "1rem", border: "1px dashed #444", borderRadius: "4px" }}>
          Suelta elementos aquí
        </div>
      )}
    </div>
  );
}

export function ColumnsRenderer({ 
  blockId, 
  columns = [], 
  isEditing = false, 
  onUpdate, 
  onSelectElement, 
  selectedElementPath,
  fullWidth = false
}: Props) {
  // Fallback for missing columns
  const activeColumns = columns.length > 0 ? columns : [{ width: "100%", elements: [] }];

  const onDropNative = (e: React.DragEvent, colIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData("elementType");
    if (!type) return;

    let newEl: ElementData;
    const defaults = BLOCK_DEFAULTS[type as keyof typeof BLOCK_DEFAULTS];
    
    if (defaults) {
      newEl = { id: Math.random().toString(36).substr(2, 9), ...JSON.parse(JSON.stringify(defaults)) };
    } else if (type === "HEADING") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "HEADING", text: "Nuevo Título", level: 2, styles: {} };
    } else if (type === "BUTTON") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "BUTTON", text: "Nuevo Botón", link: "#", variant: "primary", size: "md", styles: {} };
    } else if (type === "TEXT") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "TEXT", body: "Nuevo bloque de texto", styles: {} };
    } else if (type === "IMAGE") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "IMAGE", src: "", alt: "", styles: {} };
    } else if (type === "SPACER") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "SPACER", height: 40, styles: {} };
    } else if (type === "AVAILABILITY") {
      newEl = { 
        id: Math.random().toString(36).substr(2, 9),
        type: "AVAILABILITY", 
        title: "Hay {total} plazas libres esta semana", 
        subtitle: "DISPONIBILIDAD", 
        buttonText: "Reservar ahora", 
        styles: {} 
      };
    } else if (type === "CALENDAR") {
      newEl = { id: Math.random().toString(36).substr(2, 9), type: "CALENDAR", styles: {} };
    } else if (type === "CONTAINER") {
      newEl = { 
        id: Math.random().toString(36).substr(2, 9),
        type: "CONTAINER", 
        content: { 
          columns: [{ width: "100%", elements: [] }],
          styles: { padding: "2rem" }
        },
        styles: {} 
      };
    } else return;

    const newCols = [...activeColumns];
    newCols[colIdx].elements.push(newEl);
    onUpdate(newCols);
  };

  return (
    <div 
      style={{
        maxWidth: fullWidth ? "100%" : "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: `var(--gs-stack, repeat(${activeColumns.length}, 1fr))`,
        gap: "var(--gs-gap, 2rem)"
      } as React.CSSProperties}
    >
      {activeColumns.map((col, colIdx) => (
        <div key={colIdx} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropNative(e, colIdx)}>
          <ColumnContainer
            blockId={blockId}
            colIdx={colIdx}
            col={col}
            isEditing={isEditing}
            onUpdate={onUpdate}
            onSelectElement={onSelectElement}
            selectedElementPath={selectedElementPath}
            activeColumns={activeColumns}
          />
        </div>
      ))}
    </div>
  );
}
