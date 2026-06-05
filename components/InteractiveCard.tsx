"use client";

import React from "react";

type Props = {
  icon?: string;
  title: string;
  desc: string;
  style?: React.CSSProperties;
};

export function InteractiveCard({ icon, title, desc, style = {} }: Props) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        padding: "2.5rem",
        border: "1px solid var(--gs-border)",
        background: hovered ? "rgba(218,165,32,0.06)" : "rgba(218,165,32,0.02)",
        borderColor: hovered ? "var(--gs-border-hover)" : "var(--gs-border)",
        borderRadius: "4px",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <div style={{ fontSize: "2.2rem", marginBottom: "1.5rem" }}>{icon}</div>}
      <h3
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.35rem",
          color: "var(--gs-text)",
          marginBottom: "1rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "var(--gs-text-sub)", fontSize: "0.95rem", lineHeight: 1.8 }}>
        {desc}
      </p>
    </div>
  );
}
