"use client";

import { useEffect, useState } from "react";

export function DemoModeToggle() {
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        setIsDemo(data.demo_mode === "true");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggle = async () => {
    const newValue = !isDemo;
    setIsDemo(newValue);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "demo_mode", value: String(newValue) })
      });
      // Force reload or update context if needed
      window.dispatchEvent(new CustomEvent("gs-demo-mode-changed", { detail: newValue }));
    } catch (error) {
      setIsDemo(!newValue);
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={toggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: isDemo ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
        border: `1px solid ${isDemo ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
        color: isDemo ? "#EF4444" : "#10B981",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        marginRight: "1rem"
      }}
      title={isDemo ? "Modo Demo Activo (Pagos simulados)" : "Modo Real Activo (Redsys)"}
    >
      <span style={{ 
        width: "6px", 
        height: "6px", 
        borderRadius: "50%", 
        background: "currentColor",
        animation: isDemo ? "gs-pulse 1.5s infinite" : "none"
      }} />
      {isDemo ? "DEMO MODE" : "LIVE MODE"}
    </button>
  );
}
