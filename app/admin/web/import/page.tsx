"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ImportPage() {
  const router = useRouter();
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [config, setConfig] = useState<{ 
    title: string; 
    slug: string;
    seoTitle: string;
    seoDesc: string;
    ogImage: string;
    oldPath: string;
    createRedirect: boolean;
  } | null>(null);

  const handleJsonUpdate = (val: string) => {
    setJson(val);
    try {
      const parsed = JSON.parse(val);
      let title = parsed.title || "Nueva Página";
      let slug = parsed.slug || "";
      let seoTitle = parsed.seoTitle || parsed.title || "";
      let seoDesc = parsed.seoDesc || parsed.meta_description || "";
      let ogImage = parsed.ogImage || parsed.open_graph?.image || (parsed.images && parsed.images[0]?.src) || "";
      let oldPath = "";

      if (parsed.url) {
        const urlObj = new URL(parsed.url);
        oldPath = urlObj.pathname;
        if (!parsed.slug) {
          slug = urlObj.pathname === "/" ? "home" : urlObj.pathname.split("/").filter(Boolean).pop() || "imported";
        }
      }
      
      setConfig({ 
        title, 
        slug, 
        seoTitle, 
        seoDesc, 
        ogImage, 
        oldPath, 
        createRedirect: !!oldPath && oldPath !== `/${slug}` 
      });
      setError(null);
    } catch {
      setConfig(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleJsonUpdate(content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!json.trim() || !config) {
      setError("Pega el contenido JSON válido primero.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const parsed = JSON.parse(json);
      const payload = { 
        ...parsed, 
        ...config 
      };

      const res = await fetch("/api/admin/web/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.ok) {
        router.push(`/admin/web/pages/${data.data.id}/editor`);
      } else {
        setError(data.error || "Error al importar la página.");
      }
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", background: "var(--color-admin-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/admin/web" style={{ color: "var(--color-admin-muted)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
            ← Volver a la lista de páginas
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-admin-text)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Importar Página desde JSON
          </h1>
          <p style={{ color: "var(--color-admin-muted)", fontSize: "0.95rem" }}>
            Configura el destino de la migración antes de procesar el archivo.
          </p>
        </div>

        <div style={{ background: "var(--color-admin-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--color-admin-border)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.75rem", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
              1. Cargar archivo JSON
            </label>
            <div style={{ marginBottom: "1.5rem" }}>
              <input 
                type="file" 
                id="file-upload"
                accept=".json" 
                onChange={handleFileUpload} 
                style={{ display: "none" }} 
              />
              <button
                type="button"
                onClick={() => document.getElementById("file-upload")?.click()}
                style={{
                  padding: "0.5rem 1rem",
                  background: "white",
                  border: "1px solid var(--color-admin-border)",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>📂</span> Seleccionar archivo
              </button>
              <p style={{ 
                marginTop: "0.4rem", 
                fontSize: "0.75rem", 
                color: fileName ? "var(--color-admin-accent)" : "#999",
                fontWeight: fileName ? 600 : 400
              }}>
                {fileName ? `Archivo: ${fileName}` : "Ningún archivo seleccionado"}
              </p>
            </div>
            
            <label style={{ display: "block", marginBottom: "0.75rem", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
              O pegar contenido JSON directamente
            </label>
            <textarea
              value={json}
              onChange={(e) => handleJsonUpdate(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid var(--color-admin-border)",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                background: "#f9f9f9",
                resize: "vertical"
              }}
              placeholder='Pega aquí tu JSON...'
            />
          </div>

          {config && (
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "#F0F9FF", borderRadius: "12px", border: "1px solid #BAE6FD" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0369A1", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>⚙️</span> 2. Configurar destino y SEO
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>Título Interno (Admin)</label>
                  <input 
                    type="text" 
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #DDD" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>URL de la página (Slug)</label>
                  <div style={{ display: "flex", alignItems: "center", background: "#EEE", borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD" }}>
                    <span style={{ padding: "0 0.75rem", color: "#666", fontSize: "0.85rem" }}>/</span>
                    <input 
                      type="text" 
                      value={config.slug}
                      onChange={(e) => setConfig({ ...config, slug: e.target.value })}
                      style={{ flex: 1, padding: "0.75rem", border: "none", background: "white", outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>Título SEO (Aparece en Google)</label>
                <input 
                  type="text" 
                  value={config.seoTitle}
                  onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #DDD" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>Descripción SEO (Meta Description)</label>
                <textarea 
                  value={config.seoDesc}
                  onChange={(e) => setConfig({ ...config, seoDesc: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>URL Imagen para compartir (OG Image)</label>
                <input 
                  type="text" 
                  value={config.ogImage}
                  onChange={(e) => setConfig({ ...config, ogImage: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "0.85rem" }}
                />
                {config.ogImage && (
                  <img src={config.ogImage} alt="Preview" style={{ marginTop: "0.5rem", height: "60px", borderRadius: "4px", border: "1px solid #DDD" }} />
                )}
              </div>

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "white", borderRadius: "8px", border: "1px solid #BAE6FD" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
                  <input 
                    type="checkbox" 
                    checked={config.createRedirect}
                    onChange={(e) => setConfig({ ...config, createRedirect: e.target.checked })}
                  />
                  <span>Crear redirección 301 desde la URL antigua ({config.oldPath || "N/A"})</span>
                </label>
                <p style={{ fontSize: "0.7rem", color: "#666", marginTop: "0.4rem", marginLeft: "1.5rem" }}>
                  Recomendado para no perder el posicionamiento en Google si cambias la dirección de la página.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div style={{ 
              marginBottom: "2rem", 
              padding: "1rem", 
              background: "#FEF2F2", 
              color: "#B91C1C", 
              borderRadius: "10px", 
              fontSize: "0.9rem",
              border: "1px solid #FEE2E2"
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !config}
            style={{
              width: "100%",
              padding: "1rem",
              background: config ? "var(--color-admin-accent)" : "#CCC",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: (loading || !config) ? "not-allowed" : "pointer",
              fontSize: "1rem"
            }}
          >
            {loading ? "Procesando..." : "Confirmar Importación"}
          </button>
          
          <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--color-admin-muted)", textAlign: "center" }}>
            Al importar, la página se creará como <b>borrador</b>. Podrás publicarla desde el editor visual.
          </p>
        </div>
      </div>
    </div>
  );
}
