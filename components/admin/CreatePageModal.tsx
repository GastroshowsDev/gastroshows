"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { title: string; slug: string }) => Promise<void>;
};

export function CreatePageModal({ isOpen, onClose, onConfirm }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Auto-generate slug if it's empty or was auto-generated
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;
    setLoading(true);
    try {
      await onConfirm({ title, slug });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 2000, backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "white", padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "400px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Crear nueva página</h2>
        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.5rem" }}>Configura los detalles básicos de tu nueva página.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem", textTransform: "uppercase" }}>Título</label>
            <input 
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Nuestra Historia"
              required
              autoFocus
              style={{ width: "100%", padding: "0.6rem", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem", outline: "none" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem", textTransform: "uppercase" }}>URL (Slug)</label>
            <div style={{ display: "flex", alignItems: "center", background: "#F3F4F6", borderRadius: "8px", border: "1px solid #D1D5DB", overflow: "hidden" }}>
              <span style={{ padding: "0.6rem", fontSize: "0.9rem", color: "#9CA3AF", borderRight: "1px solid #D1D5DB" }}>/</span>
              <input 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="nuestra-historia"
                required
                style={{ flex: 1, padding: "0.6rem", background: "transparent", border: "none", fontSize: "0.9rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button 
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: "0.6rem", background: "white", color: "#374151", border: "1px solid #D1D5DB", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: "0.6rem", background: "#875BF7", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            >
              {loading ? "Creando..." : "Crear Página"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
