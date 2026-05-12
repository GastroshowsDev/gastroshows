"use client";

import { ElementData } from "@/lib/blocks/types";
import { SectionBlock } from "./SectionBlock";
import { HeadingElement } from "./atoms/HeadingElement";
import { ButtonElement } from "./atoms/ButtonElement";
import { TextElement } from "./atoms/TextElement";
import { ImageElement } from "./atoms/ImageElement";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { CalendarWidget } from "./CalendarWidget";
import { AvailabilityWidget } from "./atoms/AvailabilityWidget";
import { WidgetConfigPopup } from "../admin/WidgetConfigPopup";
import { useState, useRef } from "react";
import { ReviewsWidget } from "./atoms/ReviewsWidget";
import { FormWidget } from "./atoms/FormWidget";

type Props = {
  id: string;
  element: ElementData;
  isEditing?: boolean;
  onUpdate?: (newElement: ElementData) => void;
  onSelectElement?: (path: string) => void;
  selectedElementPath?: string | null;
};

export function ElementRenderer({ id, element, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateWidget = (fields: any) => {
    onUpdate?.({ ...element, ...fields });
  };

  const renderContent = () => {
    switch (element.type) {
      case "HEADING":
        return <HeadingElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "BUTTON":
        return <ButtonElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "TEXT":
        return <TextElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "IMAGE":
        return <ImageElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "SPACER":
        return <div style={{ height: element.height }} />;
      case "CALENDAR":
        return <CalendarWidget />;
      case "FORM":
        return (
          <FormWidget 
            fields={element.fields}
            submitText={element.submitText}
            successMessage={element.successMessage}
            styles={element.styles}
            isEditing={isEditing}
          />
        );
      case "REVIEWS":
        return (
          <ReviewsWidget 
            layout={element.layout}
            reviews={element.reviews}
            showStars={element.showStars}
            showDates={element.showDates}
            styles={element.styles}
          />
        );
      case "AVAILABILITY":
        return (
          <AvailabilityWidget 
            title={element.title}
            subtitle={element.subtitle}
            buttonText={element.buttonText}
            buttonColor={element.buttonColor}
            styles={element.styles}
            isEditing={isEditing}
          />
        );
      case "CONTAINER":
        return (
          <SectionBlock 
            id={id} 
            content={element.content} 
            isEditing={isEditing} 
            onUpdate={(newContent) => onUpdate?.({ ...element, content: newContent })}
            onSelectElement={(path) => onSelectElement?.(path)}
            selectedElementPath={selectedElementPath}
          />
        );
      default:
        return <div style={{ color: "red" }}>Unknown Element: {(element as any).type}</div>;
    }
  };


  return (
    <AnimatedWrapper animation={element.styles?.animation}>
      <div style={{ position: "relative" }}>
        {renderContent()}
        
        {isEditing && (element.type === "AVAILABILITY" || element.type === "CALENDAR" || element.type === "REVIEWS" || element.type === "FORM") && (
          <>
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorRect(buttonRef.current?.getBoundingClientRect() || null);
                setShowConfig(!showConfig);
              }}
              style={{
                position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)",
                width: "24px", height: "24px", borderRadius: "50%",
                background: "#875BF7", color: "white", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 100, boxShadow: "0 2px 8px rgba(135,91,247,0.3)",
                fontSize: "1rem", fontWeight: "bold"
              }}
              title="Configurar Widget"
            >
              +
            </button>

            {showConfig && (
              <WidgetConfigPopup 
                title={`Configurar ${element.type}`} 
                anchorRect={anchorRect} 
                onClose={() => setShowConfig(false)}
              >
                {element.type === "FORM" && (
                   <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", width: "300px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Texto del Botón</label>
                        <input 
                          value={element.submitText} 
                          onChange={(e) => updateWidget({ submitText: e.target.value })}
                          style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                        />
                      </div>

                      <div style={{ borderTop: "1px solid #EAEEF4", paddingTop: "0.8rem" }}>
                         <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563", display: "block", marginBottom: "0.5rem" }}>Campos del Formulario</label>
                         <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                            {element.fields?.map((f: any, idx: number) => (
                              <div key={f.id} style={{ padding: "0.6rem", background: "#F9FAFB", borderRadius: "6px", border: "1px solid #EAEEF4", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                   <input 
                                     value={f.label} 
                                     onChange={(e) => {
                                        const newFields = [...element.fields];
                                        newFields[idx] = { ...newFields[idx], label: e.target.value };
                                        updateWidget({ fields: newFields });
                                     }}
                                     style={{ background: "transparent", border: "none", fontWeight: 700, fontSize: "0.7rem", width: "70%", outline: "none" }}
                                   />
                                   <button onClick={() => {
                                      const newFields = [...element.fields];
                                      newFields.splice(idx, 1);
                                      updateWidget({ fields: newFields });
                                   }} style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>×</button>
                                </div>
                                <div style={{ display: "flex", gap: "0.4rem" }}>
                                   <select 
                                     value={f.type} 
                                     onChange={(e) => {
                                        const newFields = [...element.fields];
                                        newFields[idx] = { ...newFields[idx], type: e.target.value as any };
                                        updateWidget({ fields: newFields });
                                     }}
                                     style={{ flex: 1, padding: "0.2rem", fontSize: "0.6rem", borderRadius: "4px", border: "1px solid #D1D5DB" }}
                                   >
                                      <option value="text">Texto</option>
                                      <option value="email">Email</option>
                                      <option value="tel">Teléfono</option>
                                      <option value="textarea">Área de texto</option>
                                      <option value="select">Desplegable</option>
                                   </select>
                                   <select 
                                     value={f.width || "full"} 
                                     onChange={(e) => {
                                        const newFields = [...element.fields];
                                        newFields[idx] = { ...newFields[idx], width: e.target.value as any };
                                        updateWidget({ fields: newFields });
                                     }}
                                     style={{ flex: 1, padding: "0.2rem", fontSize: "0.6rem", borderRadius: "4px", border: "1px solid #D1D5DB" }}
                                   >
                                      <option value="full">Ancho total</option>
                                      <option value="half">Media columna</option>
                                   </select>
                                </div>
                              </div>
                            ))}
                         </div>
                         <button 
                          onClick={() => {
                            const newId = Math.random().toString(36).substr(2, 9);
                            const newFields = [...(element.fields || []), { id: newId, type: "text", label: "Nuevo Campo", placeholder: "Escribe aquí...", required: false, width: "full" }] as any;
                            updateWidget({ fields: newFields });
                          }}
                          style={{ width: "100%", marginTop: "0.5rem", padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "0.6rem", cursor: "pointer" }}
                         >+ Añadir Campo</button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Mensaje de éxito</label>
                        <textarea 
                          value={element.successMessage} 
                          onChange={(e) => updateWidget({ successMessage: e.target.value })}
                          rows={2}
                          style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem", resize: "none" }}
                        />
                      </div>
                   </div>
                )}

                {element.type === "REVIEWS" && (
                   <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "250px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Diseño</label>
                        <select 
                          value={element.layout || "grid"} 
                          onChange={(e) => updateWidget({ layout: e.target.value })}
                          style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                        >
                          <option value="grid">Cuadrícula</option>
                          <option value="list">Lista</option>
                          <option value="carousel">Carrusel (Próximamente)</option>
                        </select>
                      </div>

                      <div style={{ display: "flex", gap: "1rem" }}>
                        <label style={{ fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                          <input type="checkbox" checked={element.showStars !== false} onChange={(e) => updateWidget({ showStars: e.target.checked })} />
                          Estrellas
                        </label>
                        <label style={{ fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                          <input type="checkbox" checked={element.showDates !== false} onChange={(e) => updateWidget({ showDates: e.target.checked })} />
                          Fechas
                        </label>
                      </div>

                      <div style={{ borderTop: "1px solid #EAEEF4", paddingTop: "0.8rem" }}>
                         <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563", display: "block", marginBottom: "0.5rem" }}>Reviews Manuales</label>
                         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "200px", overflowY: "auto", paddingRight: "4px" }}>
                            {element.reviews?.map((r: any, idx: number) => (
                              <div key={idx} style={{ padding: "0.4rem", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #EAEEF4", fontSize: "0.65rem", display: "flex", justifyContent: "space-between" }}>
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                                <button onClick={() => {
                                  const newReviews = [...element.reviews];
                                  newReviews.splice(idx, 1);
                                  updateWidget({ reviews: newReviews });
                                }} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>×</button>
                              </div>
                            ))}
                         </div>
                         <button 
                          onClick={() => {
                            const newReviews = [...(element.reviews || []), { name: "Nuevo Cliente", text: "Escribe aquí la reseña...", rating: 5, date: "Hoy" }];
                            updateWidget({ reviews: newReviews });
                          }}
                          style={{ width: "100%", marginTop: "0.5rem", padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "0.6rem", cursor: "pointer" }}
                         >+ Añadir Review</button>
                      </div>
                   </div>
                )}

                {element.type === "AVAILABILITY" && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Título (Soporta {"{total}"})</label>
                      <input 
                        value={element.title} 
                        onChange={(e) => updateWidget({ title: e.target.value })}
                        style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Subtítulo</label>
                      <input 
                        value={element.subtitle || ""} 
                        onChange={(e) => updateWidget({ subtitle: e.target.value })}
                        style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Texto Botón</label>
                      <input 
                        value={element.buttonText || ""} 
                        onChange={(e) => updateWidget({ buttonText: e.target.value })}
                        style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                      />
                    </div>
                  </>
                )}
                {element.type === "CALENDAR" && (
                  <p style={{ fontSize: "0.7rem", color: "#6B7280", fontStyle: "italic" }}>
                    El widget de calendario se conecta automáticamente con la disponibilidad en vivo de TuriTop. Configura los estilos visuales en el panel derecho.
                  </p>
                )}
              </WidgetConfigPopup>
            )}
          </>
        )}
      </div>
    </AnimatedWrapper>
  );
}
