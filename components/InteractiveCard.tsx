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
        padding: "2rem",
        border: "1px solid var(--gs-border)",
        background: hovered ? "rgba(218,165,32,0.08)" : "rgba(218,165,32,0.03)",
        borderColor: hovered ? "var(--gs-gold)" : "var(--gs-border)",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>}
      <h3
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.3rem",
          color: "var(--gs-text)",
          marginBottom: "0.8rem",
          fontWeight: 400,
        }}
      >
        {title}
      </h3>
      <p style={{ color: "var(--gs-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
        {desc}
      </p>
    </div>
  );
}
