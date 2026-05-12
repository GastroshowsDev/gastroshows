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
  onSelectElement?: (id: string) => void;
  selectedElementPath?: string | null;
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
      <ElementRenderer id={id} element={element} isEditing={isEditing} onUpdate={onUpdate} />
    </div>
  );
}

import { ColumnsRenderer } from "./atoms/ColumnsRenderer";
import { AnimatedWrapper } from "./AnimatedWrapper";

import { VerticalResizeHandle } from "../admin/VerticalResizeHandle";

export function SectionBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const { styles = {} } = content;
  const bgImage = styles.backgroundImage || (content as any).bgImage || (content as any).backgroundImage;
  const bgPos = styles.backgroundPosition || (content as any).bgPosition || "center";

  const handleResize = (deltaY: number) => {
    const currentPadding = styles.paddingBottom || (content as any).paddingBottom || "8rem";
    let numericValue = 128; // Default 8rem
    let unit = "px";

    if (typeof currentPadding === "string") {
      const match = currentPadding.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (match) {
        numericValue = parseFloat(match[1]);
        unit = match[2] || "px";
        if (unit === "rem") numericValue *= 16; // Approx conversion
      }
    }

    const newValue = Math.max(0, numericValue + deltaY);
    onUpdate?.({
      ...content,
      styles: {
        ...styles,
        paddingBottom: `${newValue}px`
      }
    });
  };

  return (
    <AnimatedWrapper animation={styles.animation}>
      <section style={{
        position: "relative",
        padding: styles.padding || "0",
        backgroundColor: styles.backgroundColor || (content as any).bgColor || "transparent",
        marginTop: styles.marginTop || (content as any).marginTop || "0px",
        marginBottom: styles.marginBottom || (content as any).marginBottom || "0px",
        paddingTop: styles.paddingTop || (content as any).paddingTop || "6rem",
        paddingBottom: styles.paddingBottom || (content as any).paddingBottom || "8rem",
        paddingLeft: styles.paddingLeft || (content as any).paddingLeft || "2rem",
        paddingRight: styles.paddingRight || (content as any).paddingRight || "2rem",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden"
      }}>
        {bgImage && (
          <div 
            className="gs-section-bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: styles.backgroundSize || "auto",
              backgroundPosition: (bgPos === "cover" ? "center center" : bgPos) as any,
              backgroundRepeat: "no-repeat",
              opacity: styles.opacity ?? (((content as any).overlayOpacity ?? 100) / 100),
              filter: styles.brightness ? `brightness(${styles.brightness})` : ((content as any).brightness ? `brightness(${(content as any).brightness})` : "none"),
              zIndex: 0,
            }}
          />
        )}
        <style jsx>{`
          @media (max-width: 768px) {
            .gs-section-bg {
              background-size: cover !important;
            }
          }
        `}</style>
        
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <ColumnsRenderer 
            blockId={blockId}
            columns={content.columns}
            isEditing={isEditing}
            fullWidth={content.fullWidth}
            onUpdate={(newCols) => onUpdate?.({ ...content, columns: newCols })}
            onSelectElement={onSelectElement}
            selectedElementPath={selectedElementPath}
          />
        </div>

        {isEditing && (
          <VerticalResizeHandle onResize={handleResize} onResizeEnd={() => {}} />
        )}
      </section>
    </AnimatedWrapper>
  );
}
