"use client";

import { useState } from "react";

interface MigratePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (url: string) => Promise<void>;
  loading: boolean;
}

export function MigratePageModal({ isOpen, onClose, onConfirm, loading }: MigratePageModalProps) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    await onConfirm(url);
    setUrl("");
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "#111827" }}>
          Importar desde Gastroshows.es
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.5rem" }}>
          Introduce la URL de la página de Gastroshows que deseas migrar. Se importarán los bloques, textos e imágenes automáticamente.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>
              URL de la página
            </label>
            <input
              type="url"
              required
              placeholder="https://gastroshows.es/experiencia/nombre-evento"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-admin-accent)"}
              onBlur={(e) => e.target.style.borderColor = "#D1D5DB"}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                background: "white",
                color: "#374151",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem"
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !url}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: "var(--color-admin-accent)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⌛</span> Migrando...
                </>
              ) : (
                "Migrar ahora"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
