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

import { ColumnsRenderer } from "./atoms/ColumnsRenderer";
import { AnimatedWrapper } from "./AnimatedWrapper";

export function SectionBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const { styles = {} } = content;

  return (
    <AnimatedWrapper animation={styles.animation}>
      <section style={{
        padding: styles.padding || "4rem 2rem",
        backgroundColor: styles.backgroundColor || "transparent",
        backgroundImage: styles.backgroundImage ? `url(${styles.backgroundImage})` : "none",
        backgroundSize: styles.backgroundSize || "cover",
        backgroundPosition: styles.backgroundPosition || "center",
        position: "relative",
        opacity: styles.opacity ?? 1,
        filter: styles.brightness ? `brightness(${styles.brightness})` : "none",
        marginTop: styles.marginTop || "0px",
        marginBottom: styles.marginBottom || "0px",
        marginLeft: styles.marginLeft || "0px",
        marginRight: styles.marginRight || "0px",
        paddingTop: styles.paddingTop || "6rem",
        paddingBottom: styles.paddingBottom || "8rem",
        paddingLeft: styles.paddingLeft || "2rem",
        paddingRight: styles.paddingRight || "2rem",
      }}>
        <ColumnsRenderer 
          blockId={blockId}
          columns={content.columns}
          isEditing={isEditing}
          fullWidth={content.fullWidth}
          onUpdate={(newCols) => onUpdate?.({ ...content, columns: newCols })}
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
        />
      </section>
    </AnimatedWrapper>
  );
}
