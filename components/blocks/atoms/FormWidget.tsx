"use client";

import React, { useState } from "react";
import { FormField, CommonStyles } from "@/lib/blocks/types";

type Props = {
  fields: FormField[];
  submitText: string;
  successMessage: string;
  isEditing?: boolean;
  styles?: CommonStyles;
};

export function FormWidget({ fields = [], submitText = "Enviar", successMessage, isEditing, styles }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ 
        padding: "2rem", textAlign: "center", background: "#F0FDF4", borderRadius: "12px", 
        border: "1px solid #BBF7D0", color: "#166534" 
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
        <p style={{ fontWeight: 600 }}>{successMessage || "¡Mensaje enviado con éxito!"}</p>
        <button 
          onClick={() => setSubmitted(false)}
          style={{ marginTop: "1rem", background: "none", border: "none", color: "#166534", textDecoration: "underline", cursor: "pointer", fontSize: "0.8rem" }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid var(--gs-border)",
    fontSize: "0.95rem",
    color: "var(--gs-text)",
    background: "var(--gs-bg3)",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box"
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", ...styles as any }}>
      {fields.map((field) => (
        <div 
          key={field.id} 
          style={{ 
            gridColumn: field.width === "half" ? "span 1" : "span 2",
            display: "flex", flexDirection: "column", gap: "0.4rem"
          }}
        >
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gs-text-muted)" }}>
            {field.label} {field.required && <span style={{ color: "#EF4444" }}>*</span>}
          </label>
          
          {field.type === "textarea" ? (
            <textarea 
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            />
          ) : field.type === "select" ? (
            <select 
              required={field.required}
              style={inputStyle}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : field.type === "checkbox" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input 
                type="checkbox" 
                required={field.required}
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.checked })}
              />
              <span style={{ fontSize: "0.85rem", color: "var(--gs-text-sub)" }}>{field.placeholder}</span>
            </div>
          ) : (
            <input 
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              style={inputStyle}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            />
          )}
        </div>
      ))}

      <div style={{ gridColumn: "span 2", marginTop: "1rem" }}>
        <button 
          type="submit"
          disabled={loading}
          style={{ 
            width: "100%", padding: "1rem", background: "#875BF7", color: "white", 
            border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer",
            fontSize: "1rem", boxShadow: "0 4px 12px rgba(135, 91, 247, 0.2)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          {loading ? "Enviando..." : submitText}
        </button>
      </div>
    </form>
  );
}
