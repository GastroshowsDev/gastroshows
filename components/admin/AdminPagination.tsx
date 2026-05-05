"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

interface AdminPaginationProps {
  total: number;
  defaultLimit?: number;
}

export function AdminPagination({ total, defaultLimit = 25 }: AdminPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener valores de la URL o usar valores por defecto
  const offsetParam = parseInt(searchParams.get("offset") || "1");
  const limitParam = parseInt(searchParams.get("limit") || String(defaultLimit));

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Asegurar que el offset esté dentro de los límites
  const currentOffset = Math.max(1, Math.min(offsetParam, total));
  const currentLimit = Math.max(1, limitParam);
  const endRange = Math.min(currentOffset + currentLimit - 1, total);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const updateUrl = (newOffset: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String(newOffset));
    params.set("limit", String(newLimit));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    const newOffset = Math.max(1, currentOffset - currentLimit);
    if (newOffset !== currentOffset) updateUrl(newOffset, currentLimit);
  };

  const handleNext = () => {
    const newOffset = currentOffset + currentLimit;
    if (newOffset <= total) updateUrl(newOffset, currentLimit);
  };

  const handleRangeClick = () => {
    setEditValue(`${currentOffset}-${endRange}`);
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
    
    // Intentar parsear el formato "inicio-fin" o solo "inicio"
    const parts = editValue.split("-").map(p => parseInt(p.trim()));
    if (parts.length > 0 && !isNaN(parts[0])) {
      const newOffset = Math.max(1, Math.min(parts[0], total));
      let newLimit = currentLimit;
      
      if (parts.length > 1 && !isNaN(parts[1])) {
        newLimit = Math.max(1, parts[1] - newOffset + 1);
      }
      
      updateUrl(newOffset, newLimit);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleEditSubmit();
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", userSelect: "none" }}>
      {/* Texto del Rango Editable */}
      <div style={{ position: "relative", minWidth: "80px", textAlign: "right" }}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "2px 6px",
              fontSize: "0.85rem",
              background: "var(--color-admin-bg)",
              border: "1px solid var(--color-admin-accent)",
              borderRadius: "4px",
              color: "var(--color-admin-text)",
              textAlign: "center",
              outline: "none"
            }}
          />
        ) : (
          <div 
            onClick={handleRangeClick}
            className="pagination-range"
            style={{ 
              fontSize: "0.85rem", 
              fontWeight: 600, 
              color: "var(--color-admin-text)",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "background 0.2s"
            }}
          >
            {currentOffset}-{endRange} <span style={{ fontWeight: 400, opacity: 0.5, margin: "0 4px" }}>/</span> {total}
          </div>
        )}
      </div>

      {/* Flechas de Navegación */}
      <div style={{ display: "flex", gap: "1px", background: "var(--color-admin-border)", padding: "1px", borderRadius: "6px" }}>
        <button
          onClick={handlePrev}
          disabled={currentOffset === 1}
          style={{
            background: "var(--color-admin-surface)",
            border: "none",
            borderRight: "1px solid var(--color-admin-border)",
            borderRadius: "5px 0 0 5px",
            padding: "4px 8px",
            cursor: currentOffset === 1 ? "default" : "pointer",
            color: currentOffset === 1 ? "var(--color-admin-muted)" : "var(--color-admin-text)",
            display: "flex",
            alignItems: "center",
            opacity: currentOffset === 1 ? 0.5 : 1
          }}
        >
          <LucideChevronLeft size={16} />
        </button>
        <button
          onClick={handleNext}
          disabled={endRange >= total}
          style={{
            background: "var(--color-admin-surface)",
            border: "none",
            borderRadius: "0 5px 5px 0",
            padding: "4px 8px",
            cursor: endRange >= total ? "default" : "pointer",
            color: endRange >= total ? "var(--color-admin-muted)" : "var(--color-admin-text)",
            display: "flex",
            alignItems: "center",
            opacity: endRange >= total ? 0.5 : 1
          }}
        >
          <LucideChevronRight size={16} />
        </button>
      </div>

      <style jsx>{`
        .pagination-range:hover {
          background: var(--color-admin-accent-light);
          color: var(--color-admin-accent);
        }
      `}</style>
    </div>
  );
}
