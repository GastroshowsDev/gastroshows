"use client";

import React from "react";
import { CommonStyles } from "@/lib/blocks/types";
import { Star } from "lucide-react";

type Review = {
  name: string;
  text: string;
  rating: number;
  date?: string;
  image?: string;
};

type Props = {
  layout?: "grid" | "carousel" | "list";
  reviews: Review[];
  showStars?: boolean;
  showDates?: boolean;
  styles?: CommonStyles;
};

export function ReviewsWidget({ layout = "grid", reviews = [], showStars = true, showDates = true, styles }: Props) {
  // Default reviews if none provided
  const items = reviews.length > 0 ? reviews : [
    { name: "Juan Pérez", text: "Excelente comida y ambiente. El servicio fue impecable.", rating: 5, date: "Hace 2 semanas" },
    { name: "María García", text: "Una experiencia gastronómica única. Muy recomendado.", rating: 5, date: "Hace 1 mes" },
    { name: "Carlos Ruiz", text: "Todo perfecto, volveremos sin duda.", rating: 4, date: "Hace 3 días" }
  ];

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: layout === "grid" ? "repeat(auto-fit, minmax(300px, 1fr))" : "1fr",
    gap: "1.5rem",
    ...styles as any
  };

  return (
    <div style={gridStyle}>
      {items.map((review, i) => (
        <div key={i} style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "16px",
          border: "1px solid #EAEEF4",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          transition: "transform 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ 
              width: "40px", height: "40px", borderRadius: "50%", background: "#F3F4F6", 
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#6B7280",
              overflow: "hidden"
            }}>
              {review.image ? <img src={review.image} alt={review.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : review.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827" }}>{review.name}</div>
              {showDates && review.date && <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{review.date}</div>}
            </div>
            <div style={{ marginLeft: "auto", background: "white", borderRadius: "50%", padding: "4px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" style={{ width: "16px" }} />
            </div>
          </div>

          {showStars && (
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, idx) => (
                <Star 
                  key={idx} 
                  size={14} 
                  fill={idx < review.rating ? "#FBBF24" : "none"} 
                  color={idx < review.rating ? "#FBBF24" : "#D1D5DB"} 
                />
              ))}
            </div>
          )}

          <p style={{ 
            fontSize: "0.88rem", color: "#4B5563", lineHeight: "1.6", margin: 0,
            fontStyle: "italic", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden"
          }}>
            "{review.text}"
          </p>
        </div>
      ))}
    </div>
  );
}
