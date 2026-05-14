"use client";

import { useState, useEffect, useRef } from "react";
import { CommonStyles } from "@/lib/blocks/types";

type LayoutProperty = "paddingTop" | "paddingBottom" | "marginTop" | "marginBottom" | "minHeight";

type Props = {
  styles: CommonStyles;
  onUpdate: (newStyles: CommonStyles) => void;
  isEditing?: boolean;
  showMinHeight?: boolean;
};

export function LayoutHandles({ styles, onUpdate, isEditing = false, showMinHeight = false }: Props) {
  const [activeProperty, setActiveProperty] = useState<LayoutProperty | null>(null);
  const [previewValue, setPreviewValue] = useState<number | null>(null);
  const startY = useRef(0);
  const startValue = useRef(0);

  const handleMouseDown = (e: React.MouseEvent, prop: LayoutProperty) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProperty(prop);
    startY.current = e.clientY;
    
    let currentVal = styles[prop] || "0";
    if (prop === "minHeight") {
        if (typeof currentVal === "string" && (currentVal.includes("vh") || currentVal.includes("dvh"))) {
            currentVal = `${window.innerHeight}px`;
        }
    }
    const numeric = parseFloat(currentVal.toString().replace(/[^0-9.-]/g, "")) || 0;
    startValue.current = numeric;
    setPreviewValue(numeric);
  };

  useEffect(() => {
    if (!activeProperty) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY.current;
      
      let finalDelta = deltaY;
      
      if (activeProperty === "paddingTop") {
        finalDelta = -deltaY;
      } else if (activeProperty === "paddingBottom") {
        finalDelta = deltaY;
      } else if (activeProperty === "marginTop" || activeProperty === "marginBottom") {
        finalDelta = deltaY;
      } else if (activeProperty === "minHeight") {
        finalDelta = deltaY;
      }

      const newValue = Math.max(activeProperty === "minHeight" ? 200 : 0, startValue.current + finalDelta);
      setPreviewValue(newValue);
    };

    const handleMouseUp = () => {
      setPreviewValue((currentPreview) => {
        if (currentPreview !== null) {
          onUpdate({ ...styles, [activeProperty]: `${currentPreview}px` });
        }
        return null;
      });
      setActiveProperty(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeProperty, styles, onUpdate]);

  if (!isEditing) return null;

  const getPropValue = (prop: LayoutProperty) => {
    if (activeProperty === prop && previewValue !== null) return `${previewValue}px`;
    return styles[prop] || "0px";
  };

  const Handle = ({ prop, label, color }: { prop: LayoutProperty, label: string, color: string }) => {
    const isTop = prop.includes("Top");
    const isMargin = prop.includes("margin");
    const value = getPropValue(prop);

    return (
      <div
        onMouseDown={(e) => handleMouseDown(e, prop)}
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: isMargin ? (isTop ? "-10px" : "-10px") : "0",
          left: isMargin ? "15%" : "0",
          right: isMargin ? "15%" : "0",
          height: "14px",
          cursor: "ns-resize",
          zIndex: isMargin ? 110 : 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: activeProperty === prop ? 1 : 0,
          transition: "opacity 0.2s",
          pointerEvents: "auto"
        }}
        className="layout-handle-area"
      >
        <div style={{
          width: isMargin ? "100px" : "60px",
          height: "4px",
          background: color,
          borderRadius: "2px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <span style={{
            position: "absolute",
            [isTop ? "bottom" : "top"]: "8px",
            fontSize: "9px",
            fontWeight: 800,
            color: "white",
            background: color,
            padding: "1px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            {label}: {value}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .layout-handle-container:not(.no-handles):hover .layout-handle-area {
          opacity: 0.4 !important;
        }
        .layout-handle-container.is-selected:not(.no-handles) .layout-handle-area {
          opacity: 0.5 !important;
        }
        .layout-handle-area:hover {
          opacity: 1 !important;
        }
      `}</style>
      
      {/* Ghost Overlays for feedback */}
      {activeProperty && previewValue !== null && (
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
        }}>
          {activeProperty === "paddingTop" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: `${previewValue}px`, background: "rgba(135,91,247,0.1)", borderBottom: "1px dashed #875BF7" }} />}
          {activeProperty === "paddingBottom" && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${previewValue}px`, background: "rgba(135,91,247,0.1)", borderTop: "1px dashed #875BF7" }} />}
          {activeProperty === "marginTop" && <div style={{ position: "absolute", top: `-${previewValue}px`, left: 0, right: 0, height: `${previewValue}px`, background: "rgba(255,165,0,0.1)", borderBottom: "1px dashed orange" }} />}
          {activeProperty === "marginBottom" && <div style={{ position: "absolute", bottom: `-${previewValue}px`, left: 0, right: 0, height: `${previewValue}px`, background: "rgba(255,165,0,0.1)", borderTop: "1px dashed orange" }} />}
          {activeProperty === "minHeight" && <div style={{ position: "absolute", inset: 0, background: "rgba(0,191,255,0.05)", borderBottom: "2px solid #00BFFF" }} />}
        </div>
      )}

      <Handle prop="paddingTop" label="Padding Top" color="#875BF7" />
      <Handle prop="paddingBottom" label="Padding Bottom" color="#875BF7" />
      <Handle prop="marginTop" label="Margin Top" color="#FFA500" />
      <Handle prop="marginBottom" label="Margin Bottom" color="#FFA500" />
      {showMinHeight && <Handle prop="minHeight" label="Altura Mínima" color="#00BFFF" />}
    </>
  );
}
