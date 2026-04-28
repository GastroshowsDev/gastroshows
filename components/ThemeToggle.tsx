"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Variant = "public" | "admin";

export function ThemeToggle({ variant = "public" }: { variant?: Variant }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "clandestino" : true; // Default to true for Clandestino

  if (variant === "admin") {
    return (
      <button
        onClick={() => setTheme(isDark ? "revelado" : "clandestino")}
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        style={{
          width: "100%", padding: "0.5rem", borderRadius: "6px",
          border: "1px solid var(--color-admin-border)", background: "transparent",
          color: "var(--color-admin-muted)", fontSize: "0.75rem", cursor: "pointer",
          transition: "all 0.15s", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "0.4rem",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.borderColor = "var(--color-admin-accent)";
          btn.style.color = "var(--color-admin-accent)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.borderColor = "var(--color-admin-border)";
          btn.style.color = "var(--color-admin-muted)";
        }}
      >
        {isDark ? "☀" : "☾"} {isDark ? "Modo claro" : "Modo oscuro"}
      </button>
    );
  }

  /* ── Public variant: CLANDESTINO / REVELADO pill ── */
  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        background: isDark ? "rgba(8,8,8,0.82)" : "rgba(248,245,238,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${isDark ? "rgba(200,169,110,0.45)" : "rgba(100,74,20,0.4)"}`,
        borderRadius: "100px",
        padding: "3px",
        gap: "1px",
        boxShadow: isDark
          ? "0 4px 24px rgba(200,169,110,0.12), 0 0 0 1px rgba(200,169,110,0.08)"
          : "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(100,74,20,0.06)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {([
        { value: "clandestino",  emoji: "🕯", label: "Clandestino" },
        { value: "revelado", emoji: "☀", label: "Revelado" },
      ] as const).map(({ value, emoji, label }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "100px",
              border: "none",
              background: active
                ? "var(--gs-gold)"
                : "transparent",
              color: active
                ? "#0A0A0A"
                : isDark ? "rgba(200,169,110,0.45)" : "rgba(100,74,20,0.45)",
              fontSize: "0.58rem",
              fontWeight: active ? 700 : 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              whiteSpace: "nowrap",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <span style={{ fontSize: "0.75rem" }}>{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
