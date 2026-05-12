"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  onResize: (deltaY: number) => void;
  onResizeEnd: () => void;
};

export function VerticalResizeHandle({ onResize, onResizeEnd }: Props) {
  const [isResizing, setIsResizing] = useState(false);
  const startY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startY.current = e.clientY;
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY.current;
      onResize(deltaY);
      startY.current = e.clientY;
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      onResizeEnd();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, onResize, onResizeEnd]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "12px",
        cursor: "ns-resize",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isResizing ? "rgba(135, 91, 247, 0.2)" : "transparent",
        transition: "background 0.2s",
      }}
    >
      <div 
        style={{ 
          width: "40px", 
          height: "4px", 
          background: isResizing ? "#875BF7" : "rgba(135, 91, 247, 0.4)", 
          borderRadius: "2px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }} 
      />
    </div>
  );
}
