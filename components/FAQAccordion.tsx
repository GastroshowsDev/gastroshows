"use client";

import { useState } from "react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => toggleAccordion(item.id)}
            style={{
              width: "100%",
              padding: "1.5rem",
              textAlign: "left",
              background: openId === item.id ? "rgba(200,169,110,0.08)" : "transparent",
              border: "1px solid rgba(200,169,110,0.15)",
              color: "var(--gs-gold)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 400,
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                openId === item.id ? "rgba(200,169,110,0.08)" : "transparent";
            }}
          >
            <span>{item.question}</span>
            <span
              style={{
                fontSize: "1.5rem",
                transform: openId === item.id ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                flexShrink: 0,
                marginLeft: "1rem",
              }}
            >
              ▼
            </span>
          </button>

          {openId === item.id && (
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(200,169,110,0.03)",
                borderLeft: "3px solid var(--gs-gold)",
                borderRight: "1px solid rgba(200,169,110,0.15)",
                borderBottom: "1px solid rgba(200,169,110,0.15)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(245,240,232,0.8)",
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                animation: "fadeIn 0.3s ease",
              }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }

        @media (max-width: 768px) {
          button {
            padding: 1rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
