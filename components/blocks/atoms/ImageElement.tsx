"use client";

import { ImageElement as ImageType } from "@/lib/blocks/types";
import Image from "next/image";

type Props = {
  element: ImageType;
  isEditing?: boolean;
  onUpdate?: (newElement: ImageType) => void;
};

export function ImageElement({ element, isEditing = false, onUpdate }: Props) {
  const { styles = {} } = element;

  return (
    <div style={{ 
      margin: styles.margin || "1rem 0", 
      textAlign: styles.textAlign as any || "center",
      position: "relative"
    }}>
      {element.src ? (
        <div style={{ 
          position: "relative", 
          display: "block", 
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          borderRadius: styles.borderRadius || "4px",
        }}>
          <img 
            src={element.src} 
            alt={element.alt} 
            style={{ 
              width: "100%",
              maxWidth: "100%", 
              height: "auto", 
              display: "block",
              opacity: styles.opacity ?? 1,
              filter: styles.brightness ? `brightness(${styles.brightness})` : "none",
              objectFit: styles.backgroundPosition === "cover" ? "cover" : "unset",
              objectPosition: styles.backgroundPosition === "cover" ? "center" : (styles.backgroundPosition || "center")
            }} 
          />
        </div>
      ) : (
        <div style={{ 
          padding: "3rem", 
          background: "#1A1A1A", 
          border: "1px dashed #333", 
          borderRadius: "4px",
          color: "#666",
          fontSize: "0.8rem"
        }}>
          Imagen Vacía (Configura en el panel)
        </div>
      )}
    </div>
  );
}
