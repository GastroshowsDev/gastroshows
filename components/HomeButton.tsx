"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const GOLD = "#C8A96E";

export function HomeButton() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  // Don't show on home page or admin
  if (pathname === "/" || pathname?.startsWith("/admin")) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "1.5rem",
        zIndex: 9000,
        animation: "fadeIn 0.5s ease",
      }}
    >
      <Link
        href="/"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          background: "rgba(10, 10, 10, 0.85)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${hovered ? "#FFF" : GOLD}`,
          borderRadius: "50%",
          color: GOLD,
          textDecoration: "none",
          boxShadow: hovered ? "0 10px 25px rgba(0,0,0,0.5)" : "0 5px 15px rgba(0,0,0,0.3)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
        title="Volver al inicio"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>
    </div>
  );
}
