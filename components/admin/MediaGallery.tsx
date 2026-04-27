"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type MediaAsset = {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
};

type Props = {
  onSelect: (url: string) => void;
  onClose: () => void;
};

export function MediaGallery({ onSelect, onClose }: Props) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
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
        alert("Error al subir imagen");
      }
    } finally {
      setUploading(false);
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
            <p style={{ fontSize: "0.82rem", color: "#8B94A8", margin: 0 }}>Selecciona una imagen o sube una nueva.</p>
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
              {uploading ? "Subiendo..." : "Subir imagen"}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} accept="image/*" />
            <button
              onClick={onClose}
              style={{ border: "none", background: "none", fontSize: "1.5rem", color: "#8B94A8", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", background: "#F9FAFB" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#8B94A8" }}>Cargando galería...</div>
          ) : assets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#8B94A8" }}>No hay imágenes en la galería.</div>
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem"
            }}>
              {assets.map((asset) => (
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
                  <Image
                    src={asset.url}
                    alt={asset.filename}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="200px"
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px 8px",
                    background: "rgba(0,0,0,0.5)", color: "white", fontSize: "0.65rem",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                  }}>
                    {asset.filename}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
