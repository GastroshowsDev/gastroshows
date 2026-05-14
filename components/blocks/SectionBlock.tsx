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
    border: isEditing && isSelected ? "2px solid var(--gs-accent)" : (isEditing ? "1px dashed transparent" : "none"),
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
            background: "var(--gs-accent)", color: "white", fontSize: "10px", padding: "0 4px", 
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

import { LayoutHandles } from "../admin/LayoutHandles";

import { getBlockBaseStyles, getBackgroundImageStyles } from "@/utils/blockStyles";

export function SectionBlock({ id: blockId, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const { styles = {} } = content;
  const bgImage = styles.backgroundImage || (content as any).bgImage || (content as any).backgroundImage;
  const bgVideo = styles.backgroundVideo;

  const handleUpdateStyles = (newStyles: any) => {
    onUpdate?.({
      ...content,
      styles: { ...styles, ...newStyles }
    });
  };

  return (
    <AnimatedWrapper animation={styles.animation}>
      <section className="layout-handle-container" style={getBlockBaseStyles(styles)}>
        {(bgImage || bgVideo) && (
          <div className="gs-section-bg-container" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
            {(() => {
              if (bgVideo) {
                const videoStr = bgVideo || "";
                
                // YouTube logic
                const ytMatch = videoStr.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                if (ytMatch && ytMatch[1]) {
                  const ytId = ytMatch[1];
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0`}
                      style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", border: "none" }}
                      allow="autoplay; encrypted-media"
                    />
                  );
                }

                // Google Drive logic
                const driveMatch = videoStr.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
                if (driveMatch && driveMatch[1]) {
                  const driveId = driveMatch[1];
                  return (
                    <iframe
                      src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`}
                      style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", border: "none" }}
                      allow="autoplay"
                    />
                  );
                }

                // Native Video (mp4, webm, etc) or custom URLs
                return (
                  <video 
                    src={bgVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                );
              }

              return (
                <>
                  {/* Mirror Layer (Blurred) */}
                  {styles.backgroundSize === "mirror" && (
                    <div 
                      style={{
                        ...getBackgroundImageStyles(bgImage, { ...styles, backgroundSize: "cover" }),
                        inset: "-20px",
                        filter: "blur(40px) brightness(0.7)",
                        opacity: 0.6,
                      }}
                    />
                  )}
                  
                  {/* Main Image Layer */}
                  <div 
                    className="gs-section-bg"
                    style={getBackgroundImageStyles(bgImage, styles)}
                  />
                </>
              );
            })()}
          </div>
        )}
        <style jsx>{`
          @media (max-width: 768px) {
            .gs-section-bg {
              background-size: ${styles.backgroundSize === "mirror" ? "contain" : (styles.backgroundSize || "cover")} !important;
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
          <LayoutHandles 
            styles={styles} 
            onUpdate={handleUpdateStyles} 
            isEditing={isEditing} 
          />
        )}
      </section>
    </AnimatedWrapper>
  );
}
