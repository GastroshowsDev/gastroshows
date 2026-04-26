"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

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

      <div style={{ marginLeft: "auto" }}>
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
