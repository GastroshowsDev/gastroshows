"use client";

import { usePageActions } from "@/context/PageActionsContext";

type Props = { label?: string };

export function ReservarButton({ label = "Reservar" }: Props) {
  const { openReservation } = usePageActions();
  return (
    <button
      onClick={openReservation}
      style={{
        background: "var(--gs-gold)",
        color: "#0A0A0A",
        padding: "1rem 3rem",
        fontFamily: "var(--font-montserrat)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      {label}
    </button>
  );
}
