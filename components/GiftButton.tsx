"use client";

import { usePageActions } from "@/context/PageActionsContext";

type Props = {
  label?: string;
  style?: React.CSSProperties;
};

export function GiftButton({ label = "Comprar Bono Regalo", style = {} }: Props) {
  const { openGift } = usePageActions();

  return (
    <button
      onClick={openGift}
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
        ...style,
      }}
    >
      {label}
    </button>
  );
}
