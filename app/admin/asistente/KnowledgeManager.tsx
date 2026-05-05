"use client";

import { useState } from "react";
import type { KnowledgeArticle } from "@prisma/client";

type Props = {
  initialArticles: KnowledgeArticle[];
};

export function KnowledgeManager({ initialArticles }: Props) {
  const [articles, setArticles] = useState<KnowledgeArticle[]>(initialArticles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    keywords: "",
  });

  const handleEdit = (article: KnowledgeArticle) => {
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      keywords: article.keywords,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleNew = () => {
    setFormData({ title: "", category: "", content: "", keywords: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.category || !formData.content) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/asistente/articles", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Error guardando");

      const data = await res.json();

      if (editingId) {
        setArticles(articles.map((a) => (a.id === editingId ? data.article : a)));
      } else {
        setArticles([...articles, data.article]);
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", category: "", content: "", keywords: "" });
    } catch (err) {
      alert("Error guardando artículo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este artículo?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/asistente/articles?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando");

      setArticles(articles.filter((a) => a.id !== id));
    } catch (err) {
      alert("Error eliminando artículo");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, active: boolean) => {
    try {
      const res = await fetch("/api/admin/asistente/articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !active }),
      });

      if (!res.ok) throw new Error("Error actualizando");

      setArticles(articles.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
    } catch (err) {
      alert("Error actualizando artículo");
    }
  };

  return (
    <div>
      <button
        onClick={handleNew}
        style={{
          padding: "0.75rem 1.5rem",
          background: "var(--color-admin-accent)",
          color: "#0A0A0A",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        + Nuevo artículo
      </button>

      {showForm && (
        <div
          style={{
            background: "var(--color-admin-surface)",
            border: "1px solid var(--color-admin-border)",
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ marginTop: 0, color: "var(--color-admin-text)" }}>
            {editingId ? "Editar artículo" : "Nuevo artículo"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                padding: "0.75rem",
                border: "1px solid var(--color-admin-border)",
                borderRadius: "4px",
                fontSize: "0.9rem",
                color: "var(--color-admin-text)",
                background: "var(--color-admin-bg)",
              }}
            />
            <input
              type="text"
              placeholder="Categoría"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                padding: "0.75rem",
                border: "1px solid var(--color-admin-border)",
                borderRadius: "4px",
                fontSize: "0.9rem",
                color: "var(--color-admin-text)",
                background: "var(--color-admin-bg)",
              }}
            />
          </div>

          <textarea
            placeholder="Contenido (markdown soportado)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "0.75rem",
              border: "1px solid var(--color-admin-border)",
              borderRadius: "4px",
              fontSize: "0.9rem",
              color: "var(--color-admin-text)",
              background: "var(--color-admin-bg)",
              fontFamily: "monospace",
              marginBottom: "1rem",
              resize: "vertical",
            }}
          />

          <input
            type="text"
            placeholder="Palabras clave (separadas por comas)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid var(--color-admin-border)",
              borderRadius: "4px",
              fontSize: "0.9rem",
              color: "var(--color-admin-text)",
              background: "var(--color-admin-bg)",
              marginBottom: "1rem",
            }}
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                padding: "0.75rem 1.5rem",
                background: "var(--color-admin-accent)",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {editingId ? "Guardar cambios" : "Crear artículo"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "var(--color-admin-border)",
                color: "var(--color-admin-text)",
                border: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              background: "var(--color-admin-surface)",
              border: `1px solid ${article.active ? "var(--color-admin-border)" : "var(--color-admin-muted)"}`,
              borderRadius: "8px",
              padding: "1rem",
              opacity: article.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--color-admin-text)" }}>
                  {article.title}
                </h4>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "var(--color-admin-muted)" }}>
                  <strong>Categoría:</strong> {article.category}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "var(--color-admin-muted)" }}>
                  <strong>Palabras clave:</strong> {article.keywords}
                </p>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
                  {article.content.substring(0, 150)}...
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                <button
                  onClick={() => handleEdit(article)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "transparent",
                    border: "1px solid var(--color-admin-border)",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    color: "var(--color-admin-text)",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleToggle(article.id, article.active)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: article.active ? "rgba(46, 204, 113, 0.1)" : "rgba(200, 100, 100, 0.1)",
                    border: `1px solid ${article.active ? "#2ECC71" : "#E74C3C"}`,
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    color: article.active ? "#2ECC71" : "#E74C3C",
                  }}
                >
                  {article.active ? "Activo" : "Inactivo"}
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(231, 76, 60, 0.1)",
                    border: "1px solid #E74C3C",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    color: "#E74C3C",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-admin-muted)" }}>
          <p>No hay artículos. ¡Crea uno para empezar!</p>
        </div>
      )}
    </div>
  );
}
