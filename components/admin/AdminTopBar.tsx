"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

function SaveStatusIndicator() {
  const [status, setStatus] = useState<"idle" | "unsaved" | "saving" | "saved">("idle");

  useEffect(() => {
    const handleStatus = (e: any) => setStatus(e.detail);
    window.addEventListener("page-builder-status", handleStatus);
    return () => window.removeEventListener("page-builder-status", handleStatus);
  }, []);

  if (status === "idle") return null;

  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
      {status === "unsaved" && (
        <span title="Cambios por guardar" style={{ fontSize: "1.2rem", color: "var(--color-admin-text)", opacity: 0.6, cursor: "help" }}>
          💾
        </span>
      )}
      {status === "saving" && (
        <span title="Guardando..." style={{ fontSize: "1.2rem", animation: "gs-pulse 1s infinite" }}>
          ⏳
        </span>
      )}
      {status === "saved" && (
        <span title="Guardado y procesado" style={{ fontSize: "1.2rem", color: "#10B981" }}>
          ✅
        </span>
      )}
    </div>
  );
}

export function AdminTopBar({ onMenuClick }: { onMenuClick?: () => void } = {}) {
  return (
    <div
      style={{
        height: "52px",
        borderBottom: "1px solid var(--color-admin-border)",
        background: "var(--color-admin-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        flexShrink: 0,
      }}
    >
      {/* Hamburger — shown only on mobile */}
      <button
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="admin-hamburger"
        style={{
          display: "none",
          flexDirection: "column",
          gap: "5px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
      </button>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
        <SaveStatusIndicator />
        <ThemeToggle variant="admin" />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .admin-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
