"use client";

import { useState, useRef } from "react";
import { WidgetConfigPopup } from "@/components/admin/WidgetConfigPopup";
import { ReviewsWidget } from "./atoms/ReviewsWidget";
import { ReviewsElement } from "@/lib/blocks/types";
type Props = { 
  content: ReviewsElement;
  isEditing?: boolean;
  onUpdate?: (newContent: ReviewsElement) => void;
};

export function ReviewsBlock({ content, isEditing = false, onUpdate }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateWidget = (fields: Partial<ReviewsElement>) => {
    onUpdate?.({ ...content, ...fields });
  };

  return (
    <div style={{ padding: "4rem 2rem", background: "white", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ReviewsWidget 
          layout={content.layout}
          reviews={content.reviews}
          showStars={content.showStars}
          showDates={content.showDates}
          styles={content.styles}
        />
      </div>

      {isEditing && (
        <>
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorRect(buttonRef.current?.getBoundingClientRect() || null);
              setShowConfig(!showConfig);
            }}
            style={{
              position: "absolute", top: "10px", right: "10px",
              width: "32px", height: "32px", borderRadius: "50%",
              background: "#875BF7", color: "white", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 100, boxShadow: "0 2px 8px rgba(135,91,247,0.3)",
              fontSize: "1.2rem", fontWeight: "bold"
            }}
            title="Configurar Google Reviews"
          >
            ⚙️
          </button>

          {showConfig && (
            <WidgetConfigPopup 
              title="Configurar Google Reviews" 
              anchorRect={anchorRect} 
              onClose={() => setShowConfig(false)}
            >
               <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "280px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Origen de los datos</label>
                    <div style={{ display: "flex", background: "#F3F4F6", borderRadius: "6px", padding: "2px" }}>
                      <button 
                        onClick={() => updateWidget({ useGoogleReviews: false })}
                        style={{ flex: 1, padding: "0.3rem", borderRadius: "4px", border: "none", fontSize: "0.65rem", fontWeight: 600, cursor: "pointer", background: !content.useGoogleReviews ? "white" : "transparent", color: !content.useGoogleReviews ? "#875BF7" : "#6B7280", boxShadow: !content.useGoogleReviews ? "0 1px 2px rgba(0,0,0,0.1)" : "none" }}
                      >Manual</button>
                      <button 
                        onClick={() => updateWidget({ useGoogleReviews: true })}
                        style={{ flex: 1, padding: "0.3rem", borderRadius: "4px", border: "none", fontSize: "0.65rem", fontWeight: 600, cursor: "pointer", background: content.useGoogleReviews ? "white" : "transparent", color: content.useGoogleReviews ? "#875BF7" : "#6B7280", boxShadow: content.useGoogleReviews ? "0 1px 2px rgba(0,0,0,0.1)" : "none" }}
                      >Google</button>
                    </div>
                  </div>

                  {content.useGoogleReviews ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Google Place ID</label>
                        <input 
                          type="text" 
                          value={content.googlePlaceId || ""} 
                          onChange={(e) => updateWidget({ googlePlaceId: e.target.value })}
                          placeholder="ChIJ..."
                          style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                        />
                        <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" style={{ fontSize: "0.55rem", color: "#875BF7", textDecoration: "none" }}>¿Cómo obtenerlo?</a>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Mín. Estrellas</label>
                          <select 
                            value={content.minRating || 1} 
                            onChange={(e) => updateWidget({ minRating: parseInt(e.target.value) })}
                            style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                          >
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ estrellas</option>)}
                          </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Ordenar por</label>
                          <select 
                            value={content.sortBy || "latest"} 
                            onChange={(e) => updateWidget({ sortBy: e.target.value as any })}
                            style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                          >
                            <option value="latest">Recientes</option>
                            <option value="random">Aleatorio</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        onClick={async () => {
                          if (!content.googlePlaceId) return alert("Introduce un Place ID");
                          const res = await fetch(`/api/admin/web/google-reviews?placeId=${content.googlePlaceId}&minRating=${content.minRating || 1}&sortBy=${content.sortBy || "latest"}`);
                          const json = await res.json();
                          if (json.ok) {
                            updateWidget({ reviews: json.data });
                            alert(`Se han sincronizado ${json.data.length} reseñas.`);
                          } else {
                            alert(json.error);
                          }
                        }}
                        style={{ padding: "0.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}
                      >
                        🔄 Sincronizar ahora
                      </button>
                    </>
                  ) : (
                    <div style={{ borderTop: "1px solid #EAEEF4", paddingTop: "0.8rem" }}>
                      <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563", display: "block", marginBottom: "0.5rem" }}>Reviews Manuales</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "200px", overflowY: "auto", paddingRight: "4px" }}>
                          {content.reviews?.map((r: any, idx: number) => (
                            <div key={idx} style={{ padding: "0.4rem", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #EAEEF4", fontSize: "0.65rem", display: "flex", justifyContent: "space-between" }}>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                              <button onClick={() => {
                                const newReviews = [...content.reviews];
                                newReviews.splice(idx, 1);
                                updateWidget({ reviews: newReviews });
                              }} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>×</button>
                            </div>
                          ))}
                      </div>
                      <button 
                        onClick={() => {
                          const newReviews = [...(content.reviews || []), { name: "Nuevo Cliente", text: "Escribe aquí la reseña...", rating: 5, date: "Hoy" }];
                          updateWidget({ reviews: newReviews });
                        }}
                        style={{ width: "100%", marginTop: "0.5rem", padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "0.6rem", cursor: "pointer" }}
                      >+ Añadir Review</button>
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", borderTop: "1px solid #EAEEF4", paddingTop: "0.8rem" }}>
                    <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Diseño</label>
                    <select 
                      value={content.layout || "grid"} 
                      onChange={(e) => updateWidget({ layout: e.target.value as any })}
                      style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                    >
                      <option value="grid">Cuadrícula</option>
                      <option value="list">Lista</option>
                      <option value="carousel">Carrusel</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <label style={{ fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                      <input type="checkbox" checked={content.showStars !== false} onChange={(e) => updateWidget({ showStars: e.target.checked })} />
                      Estrellas
                    </label>
                    <label style={{ fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                      <input type="checkbox" checked={content.showDates !== false} onChange={(e) => updateWidget({ showDates: e.target.checked })} />
                      Fechas
                    </label>
                  </div>
               </div>
            </WidgetConfigPopup>
          )}
        </>
      )}
    </div>
  );
}
