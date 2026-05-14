"use client";

import React from "react";

type Props = {
  label: string;
};

export function OccasionTag({ label }: Props) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        padding: "1.2rem 1.5rem",
        border: "1px solid " + (hovered ? "var(--gs-gold)" : "var(--gs-border)"),
        borderRadius: "4px",
        color: hovered ? "var(--gs-gold)" : "var(--gs-muted)",
        backgroundColor: hovered ? "rgba(218,165,32,0.08)" : "transparent",
        fontSize: "0.95rem",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </div>
  );
}
