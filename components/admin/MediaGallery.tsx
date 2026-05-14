"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type MediaAsset = {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
  mimeType?: string;
};

type Props = {
  onSelect: (url: string) => void;
  onClose: () => void;
};

export function MediaGallery({ onSelect, onClose }: Props) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?t=${Date.now()}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) setAssets(json.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchMedia(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.ok) {
        await fetchMedia();
      } else {
        alert("Error al subir archivo");
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("¿Estás seguro de que quieres borrar este archivo?")) return;
    
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        await fetchMedia();
      } else {
        alert("Error al borrar el archivo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al borrar el archivo.");
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{
        background: "white", width: "100%", maxWidth: "900px", height: "80vh",
        borderRadius: "16px", display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #EAEEF4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1A1A2E", margin: 0 }}>Galería de Medios</h2>
            <p style={{ fontSize: "0.82rem", color: "#8B94A8", margin: 0 }}>Selecciona una imagen/video o sube uno nuevo.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                padding: "0.6rem 1.2rem", background: "#875BF7", color: "white",
                border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {uploading ? "Subiendo..." : "Subir archivo"}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} accept="image/*,video/*" />
            <button
              onClick={onClose}
              style={{ border: "none", background: "none", fontSize: "1.5rem", color: "#8B94A8", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: "0.5rem 1.5rem", background: "#F9FAFB", borderBottom: "1px solid #EAEEF4", display: "flex", gap: "0.5rem" }}>
          <button 
            onClick={() => setFilterType("all")} 
            style={{ padding: "0.4rem 0.8rem", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, background: filterType === "all" ? "#1A1A2E" : "transparent", color: filterType === "all" ? "white" : "#4B5563" }}
          >Todos</button>
          <button 
            onClick={() => setFilterType("image")} 
            style={{ padding: "0.4rem 0.8rem", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, background: filterType === "image" ? "#1A1A2E" : "transparent", color: filterType === "image" ? "white" : "#4B5563" }}
          >Imágenes</button>
          <button 
            onClick={() => setFilterType("video")} 
            style={{ padding: "0.4rem 0.8rem", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, background: filterType === "video" ? "#1A1A2E" : "transparent", color: filterType === "video" ? "white" : "#4B5563" }}
          >Vídeos</button>
        </div>

        {/* Gallery Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", background: "#F9FAFB" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#8B94A8" }}>Cargando galería...</div>
          ) : assets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#8B94A8" }}>No hay archivos en la galería.</div>
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem"
            }}>
              {assets.filter((asset) => {
                const isVideo = asset.mimeType?.startsWith("video/") || asset.url.match(/\.(mp4|webm|ogg)$/i);
                if (filterType === "image") return !isVideo;
                if (filterType === "video") return isVideo;
                return true;
              }).map((asset) => {
                const isVideo = asset.mimeType?.startsWith("video/") || asset.url.match(/\.(mp4|webm|ogg)$/i);
                
                return (
                  <div
                    key={asset.id}
                    onClick={() => onSelect(asset.url)}
                    style={{
                      position: "relative", aspectRatio: "1", borderRadius: "8px", overflow: "hidden",
                      cursor: "pointer", border: "2px solid transparent", transition: "all 0.2s",
                      background: "#E5E7EB"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#875BF7")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                  >
                    {isVideo ? (
                      <video 
                        src={asset.url}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        muted
                        playsInline
                        onMouseOver={(e) => e.currentTarget.play().catch(() => {})}
                        onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                      />
                    ) : (
                      <Image
                        src={asset.url}
                        alt={asset.filename}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="200px"
                      />
                    )}
                    
                    {isVideo && (
                      <div style={{
                        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: "40px", height: "40px",
                        display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                        pointerEvents: "none"
                      }}>
                        ▶
                      </div>
                    )}

                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px 8px",
                      background: "rgba(0,0,0,0.5)", color: "white", fontSize: "0.65rem",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                    }}>
                      {asset.filename}
                    </div>
                    
                    {/* Botón de Borrar */}
                    <button
                      onClick={(e) => handleDelete(asset.id, e)}
                      title="Borrar archivo"
                      style={{
                        position: "absolute", top: "6px", right: "6px",
                        background: "rgba(239, 68, 68, 0.9)", color: "white",
                        border: "none", borderRadius: "4px", width: "24px", height: "24px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", fontSize: "1rem", zIndex: 10,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
