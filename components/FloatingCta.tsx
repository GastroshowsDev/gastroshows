"use client";

import { usePageActions } from "@/context/PageActionsContext";

export function FloatingCta() {
  const { openReservation, openGift } = usePageActions();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        zIndex: 100,
      }}
    >
      <button
        onClick={openGift}
        style={{
          background: "transparent",
          border: "1px solid var(--gs-gold)",
          color: "var(--gs-gold)",
          padding: "0.75rem 1.5rem",
          fontFamily: "var(--font-montserrat)",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          background: "rgba(10,10,10,0.8)",
        } as React.CSSProperties}
      >
        Regalar
      </button>
      <button
        onClick={openReservation}
        style={{
          background: "var(--gs-gold)",
          border: "none",
          color: "#0A0A0A",
          padding: "0.85rem 1.75rem",
          fontFamily: "var(--font-montserrat)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(218,165,32,0.3)",
        }}
      >
        Reservar
      </button>
    </div>
  );
}
