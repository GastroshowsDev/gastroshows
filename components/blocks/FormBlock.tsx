"use client";

import { useState, useRef } from "react";
import { WidgetConfigPopup } from "@/components/admin/WidgetConfigPopup";
import { FormWidget } from "./atoms/FormWidget";
import { FormElement } from "@/lib/blocks/types";

type Props = { 
  content: FormElement;
  isEditing?: boolean;
  onUpdate?: (newContent: FormElement) => void;
};

export function FormBlock({ content, isEditing = false, onUpdate }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateWidget = (fields: Partial<FormElement>) => {
    onUpdate?.({ ...content, ...fields });
  };

  return (
    <div style={{ padding: "4rem 2rem", background: "white", position: "relative" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <FormWidget 
          fields={content.fields}
          submitText={content.submitText}
          successMessage={content.successMessage}
          styles={content.styles}
          isEditing={isEditing}
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
            title="Configurar Formulario"
          >
            ⚙️
          </button>

          {showConfig && (
            <WidgetConfigPopup 
              title="Configurar Formulario" 
              anchorRect={anchorRect} 
              onClose={() => setShowConfig(false)}
            >
               <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", width: "300px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Texto del Botón</label>
                    <input 
                      value={content.submitText} 
                      onChange={(e) => updateWidget({ submitText: e.target.value })}
                      style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem" }}
                    />
                  </div>

                  <div style={{ borderTop: "1px solid #EAEEF4", paddingTop: "0.8rem" }}>
                     <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563", display: "block", marginBottom: "0.5rem" }}>Campos del Formulario</label>
                     <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                        {content.fields?.map((f: any, idx: number) => (
                          <div key={f.id} style={{ padding: "0.6rem", background: "#F9FAFB", borderRadius: "6px", border: "1px solid #EAEEF4", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                               <input 
                                 value={f.label} 
                                 onChange={(e) => {
                                    const newFields = [...content.fields];
                                    newFields[idx] = { ...newFields[idx], label: e.target.value };
                                    updateWidget({ fields: newFields });
                                 }}
                                 style={{ background: "transparent", border: "none", fontWeight: 700, fontSize: "0.7rem", width: "70%", outline: "none" }}
                               />
                               <button onClick={() => {
                                  const newFields = [...content.fields];
                                  newFields.splice(idx, 1);
                                  updateWidget({ fields: newFields });
                               }} style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>×</button>
                            </div>
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                               <select 
                                 value={f.type} 
                                 onChange={(e) => {
                                    const newFields = [...content.fields];
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
                                    const newFields = [...content.fields];
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
                        const newFields = [...(content.fields || []), { id: newId, type: "text", label: "Nuevo Campo", placeholder: "Escribe aquí...", required: false, width: "full" }] as any;
                        updateWidget({ fields: newFields });
                      }}
                      style={{ width: "100%", marginTop: "0.5rem", padding: "0.4rem", background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "0.6rem", cursor: "pointer" }}
                     >+ Añadir Campo</button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4B5563" }}>Mensaje de éxito</label>
                    <textarea 
                      value={content.successMessage} 
                      onChange={(e) => updateWidget({ successMessage: e.target.value })}
                      rows={2}
                      style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #D1D5DB", fontSize: "0.7rem", resize: "none" }}
                    />
                  </div>
               </div>
            </WidgetConfigPopup>
          )}
        </>
      )}
    </div>
  );
}
