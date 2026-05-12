"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Info, Share2, Globe, Search } from "lucide-react";

type Props = {
  page: any;
  onUpdate: (data: any) => void;
  openMedia: (callback: (url: string) => void) => void;
};

export function PageSeoPanel({ page, onUpdate, openMedia }: Props) {
  const [activeTab, setActiveTab] = useState<"general" | "social" | "multimedia" | "performance" | "linking" | "advanced" | "technical">("general");
  const [internalLinks, setInternalLinks] = useState<{title: string, slug: string}[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);

  const update = (fields: any) => {
    onUpdate({ ...page, ...fields });
  };

  const fetchLinks = async () => {
    setLoadingLinks(true);
    try {
      const res = await fetch("/api/admin/web/pages/links");
      const json = await res.json();
      if (json.ok) setInternalLinks(json.data);
    } finally {
      setLoadingLinks(false);
    }
  };

  useEffect(() => {
    if (activeTab === "linking") fetchLinks();
  }, [activeTab]);

  const suggestMetadata = () => {
    const firstHeading = page.blocks?.find((b: any) => b.type === "SECTION")?.content?.columns?.[0]?.elements?.find((el: any) => el.type === "HEADING")?.text;
    const firstText = page.blocks?.find((b: any) => b.type === "SECTION")?.content?.columns?.[0]?.elements?.find((el: any) => el.type === "TEXT")?.body;

    if (firstHeading) {
      update({ seoTitle: `${firstHeading} | GastroShows` });
    }
    if (firstText) {
      const cleanText = firstText.replace(/<[^>]*>/g, '').substring(0, 155);
      update({ seoDesc: cleanText + "..." });
    }
  };

  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" };
  const inputStyle = { width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "0.85rem", marginBottom: "1rem" };
  const sectionTitle = { fontSize: "0.85rem", fontWeight: 700, color: "#111827", marginBottom: "1rem", marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" };

  const titleLength = page.seoTitle?.length || 0;
  const descLength = page.seoDesc?.length || 0;
  const isTitleGood = titleLength >= 30 && titleLength <= 60;
  const isDescGood = descLength >= 120 && descLength <= 160;

  return (
    <div style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1.5rem", background: "#F3F4F6", padding: "0.2rem", borderRadius: "8px" }}>
        {[
          { id: "general", label: "General", icon: <Search size={12} /> },
          { id: "social", label: "Social", icon: <Share2 size={12} /> },
          { id: "multimedia", label: "Media", icon: <Globe size={12} /> },
          { id: "technical", label: "Technical", icon: <Globe size={12} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
              padding: "0.5rem 0.3rem", border: "none", borderRadius: "6px", fontSize: "0.6rem", fontWeight: 700,
              background: activeTab === tab.id ? "white" : "transparent",
              boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              cursor: "pointer", color: activeTab === tab.id ? "#875BF7" : "#6B7280",
              transition: "all 0.2s ease"
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {activeTab === "general" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={sectionTitle}><Search size={16} /> Google Search Preview</div>
              <div style={{ 
                fontSize: "0.6rem", padding: "2px 6px", borderRadius: "100px", fontWeight: 700,
                background: page.robots?.includes("noindex") ? "#FEE2E2" : "#D1FAE5",
                color: page.robots?.includes("noindex") ? "#B91C1C" : "#065F46",
                border: `1px solid ${page.robots?.includes("noindex") ? "#FCA5A5" : "#6EE7B7"}`
              }}>
                {page.robots?.includes("noindex") ? "NO-INDEX" : "INDEXABLE"}
              </div>
            </div>
            <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #E5E7EB", marginBottom: "1.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ color: "#1a0dab", fontSize: "1.1rem", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {page.seoTitle || page.title || "Título de la página..." }
              </div>
              <div style={{ color: "#006621", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
                https://gastroshows.com/{page.slug}
              </div>
              <div style={{ color: "#545454", fontSize: "0.8rem", lineHeight: "1.4" }}>
                {page.seoDesc || "Escribe una descripción meta para mejorar el CTR en los buscadores..."}
              </div>
            </div>

            <label style={labelStyle}>
              SEO Title
              <span style={{ float: "right", display: "flex", gap: "0.5rem" }}>
                <button onClick={suggestMetadata} style={{ fontSize: "0.6rem", background: "#EEF2FF", color: "#4F46E5", border: "1px solid #C7D2FE", borderRadius: "4px", padding: "0 4px", cursor: "pointer" }}>✨ Sugerir</button>
                <span style={{ color: isTitleGood ? "#10B981" : "#F59E0B" }}>{titleLength}/60</span>
              </span>
            </label>
            <input 
              value={page.seoTitle || ""} 
              onChange={(e) => update({ seoTitle: e.target.value })} 
              style={{ ...inputStyle, borderColor: isTitleGood ? "#D1D5DB" : "#F59E0B" }} 
            />

            <label style={labelStyle}>
              Meta Description
              <span style={{ float: "right", color: isDescGood ? "#10B981" : "#F59E0B" }}>{descLength}/160</span>
            </label>
            <textarea 
              value={page.seoDesc || ""} 
              onChange={(e) => update({ seoDesc: e.target.value })} 
              style={{ ...inputStyle, height: "100px", resize: "none", borderColor: isDescGood ? "#D1D5DB" : "#F59E0B" }} 
            />

            <div style={{ background: "#FEF3C7", padding: "0.8rem", borderRadius: "8px", display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "1rem" }}>
               <AlertTriangle size={16} style={{ color: "#D97706", flexShrink: 0, marginTop: "2px" }} />
               <div style={{ fontSize: "0.7rem", color: "#92400E" }}>
                 {!isTitleGood && <p style={{ margin: "0 0 0.2rem 0" }}>El título debería tener entre 30 y 60 caracteres.</p>}
                 {!isDescGood && <p style={{ margin: "0 0 0.2rem 0" }}>La descripción debería tener entre 120 y 160 caracteres.</p>}
                 {page.published && page.robots?.includes("noindex") && (
                   <p style={{ margin: "0.4rem 0 0 0", fontWeight: 700, color: "#B91C1C" }}>
                     ⚠️ ERROR CRÍTICO: La página está publicada pero tiene 'noindex'.
                   </p>
                 )}
               </div>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div style={sectionTitle}><Share2 size={16} /> Redes Sociales (OG)</div>
            <label style={labelStyle}>Imagen Compartida</label>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <div 
                style={{ width: "80px", height: "60px", background: "#F3F4F6", borderRadius: "6px", overflow: "hidden", border: "1px solid #E5E7EB", cursor: "pointer" }}
                onClick={() => openMedia(url => update({ ogImage: url }))}
              >
                {page.ogImage ? <img src={page.ogImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9CA3AF" }}>📷</div>}
              </div>
              <input value={page.ogImage || ""} readOnly style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            </div>
            <label style={labelStyle}>OG Type</label>
            <select value={page.ogType || "website"} onChange={(e) => update({ ogType: e.target.value })} style={inputStyle}>
              <option value="website">Sitio Web</option>
              <option value="article">Artículo</option>
            </select>
          </>
        )}

        {activeTab === "multimedia" && (
          <>
            <div style={sectionTitle}>🖼️ Auditoría de Imágenes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {(() => {
                const images: any[] = [];
                const scan = (blocks: any[]) => {
                  blocks.forEach(b => {
                    if (b.type === "SECTION" || b.type === "CONTAINER") {
                       b.content?.columns?.forEach((c: any) => {
                          c.elements?.forEach((el: any) => {
                             if (el.type === "IMAGE") images.push(el);
                             if (el.type === "CONTAINER") scan([el]);
                          });
                       });
                    }
                  });
                };
                scan(page.blocks || []);
                if (images.length === 0) return <p style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>No hay imágenes.</p>;
                return images.map((img, i) => (
                  <div key={i} style={{ background: "white", padding: "0.8rem", borderRadius: "8px", border: "1px solid #E5E7EB", display: "flex", gap: "0.8rem", alignItems: "center" }}>
                    <img src={img.src} style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <input value={img.alt || ""} onChange={(e) => { img.alt = e.target.value; onUpdate({ ...page }); }} style={{ ...inputStyle, marginBottom: 0, padding: "0.4rem" }} placeholder="Texto Alt..." />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </>
        )}

        {activeTab === "performance" && (
          <>
            <div style={sectionTitle}>⚡ Web Vitals (Estimado)</div>
            <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #E5E7EB", marginBottom: "1rem" }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                  <span>LCP (Carga)</span>
                  <span style={{ color: "#10B981" }}>1.2s</span>
               </div>
               <div style={{ height: "4px", background: "#E5E7EB", borderRadius: "2px" }}>
                  <div style={{ width: "20%", height: "100%", background: "#10B981" }} />
               </div>
            </div>
          </>
        )}

        {activeTab === "linking" && (
          <>
            <div style={sectionTitle}>🔗 Enlaces Internos</div>
            {loadingLinks ? <p style={{ fontSize: "0.7rem" }}>Escaneando...</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {(() => {
                  const suggestions: any[] = [];
                  const allText: string[] = [];
                  const scanText = (blocks: any[]) => {
                    blocks.forEach(b => {
                      if (b.type === "SECTION" || b.type === "CONTAINER") {
                        b.content?.columns?.forEach((c: any) => {
                          c.elements?.forEach((el: any) => {
                            if (el.type === "TEXT") allText.push(el.body || "");
                            if (el.type === "HEADING") allText.push(el.text || "");
                            if (el.type === "CONTAINER") scanText([el]);
                          });
                        });
                      }
                    });
                  };
                  scanText(page.blocks || []);
                  const combinedText = allText.join(" ").toLowerCase();
                  internalLinks.forEach(link => {
                    if (link.slug !== page.slug && combinedText.includes(link.title.toLowerCase())) suggestions.push(link);
                  });
                  if (suggestions.length === 0) return <p style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Sin sugerencias.</p>;
                  return suggestions.map((s, i) => (
                    <div key={i} style={{ background: "white", padding: "0.8rem", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>"{s.title}"</div>
                      <button onClick={() => navigator.clipboard.writeText(`/${s.slug}`)} style={{ width: "100%", marginTop: "0.5rem", padding: "0.3rem", background: "#EEF2FF", color: "#4F46E5", border: "1px solid #C7D2FE", borderRadius: "4px", fontSize: "0.65rem", cursor: "pointer" }}>Copiar /{s.slug}</button>
                    </div>
                  ));
                })()}
              </div>
            )}
          </>
        )}

        {activeTab === "technical" && (
          <>
            <div style={sectionTitle}><Globe size={16} /> Directivas Robots Avanzadas</div>
            <p style={{ fontSize: "0.65rem", color: "#6B7280", marginBottom: "1rem" }}>
              Control total sobre cómo los buscadores rastrean e indexan esta página.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
               {[
                 { id: "index", label: "Index (Indexar)" },
                 { id: "follow", label: "Follow (Seguir)" },
                 { id: "noarchive", label: "No Archive (Sin caché)" },
                 { id: "nosnippet", label: "No Snippet (Sin resumen)" },
                 { id: "noimageindex", label: "No Image Index" },
                 { id: "unavailable_after", label: "Expiración" }
               ].map(opt => (
                 <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", background: "white", padding: "0.5rem", borderRadius: "6px", border: "1px solid #E5E7EB", cursor: "pointer" }}>
                   <input 
                     type="checkbox" 
                     checked={(() => {
                       const r = page.robots || "index, follow";
                       if (opt.id === "index") return !r.includes("noindex");
                       if (opt.id === "follow") return !r.includes("nofollow");
                       return r.includes(opt.id);
                     })()} 
                     onChange={(e) => {
                       const isChecked = e.target.checked;
                       let tags = (page.robots || "index, follow").split(",").map((t: string) => t.trim()).filter(Boolean);
                       
                       if (opt.id === "index") {
                         tags = tags.filter((t: string) => t !== "index" && t !== "noindex");
                         tags.push(isChecked ? "index" : "noindex");
                       } else if (opt.id === "follow") {
                         tags = tags.filter((t: string) => t !== "follow" && t !== "nofollow");
                         tags.push(isChecked ? "follow" : "nofollow");
                       } else {
                         tags = tags.filter((t: string) => t !== opt.id);
                         if (isChecked) tags.push(opt.id);
                       }
                       
                       update({ robots: tags.join(", ") });
                     }} 
                   />
                   {opt.label}
                 </label>
               ))}
            </div>

            <div style={sectionTitle}><Info size={16} /> X-Robots-Tag (HTTP Headers)</div>
            <p style={{ fontSize: "0.65rem", color: "#6B7280", marginBottom: "0.8rem" }}>
              Configura encabezados de respuesta para crawlers que no leen HTML.
            </p>
            <div style={{ background: "#F9FAFB", padding: "1rem", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
               <label style={{ ...labelStyle, marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                 Status de Header
                 <span style={{ color: page.robots?.includes("noindex") ? "#EF4444" : "#10B981" }}>
                   {page.robots?.includes("noindex") ? "X-Robots-Tag: noindex" : "X-Robots-Tag: index"}
                 </span>
               </label>
               <p style={{ fontSize: "0.6rem", color: "#6B7280", margin: 0 }}>
                 * Este encabezado se inyectará automáticamente vía Middleware para crawlers de IA y buscadores.
               </p>
            </div>

            <div style={sectionTitle}><Search size={16} /> URL Canónica</div>
            <input value={page.canonical || ""} onChange={(e) => update({ canonical: e.target.value })} style={inputStyle} placeholder="https://..." />
            {page.canonical && !page.canonical.includes(page.slug) && (
              <p style={{ fontSize: "0.65rem", color: "#D97706", marginTop: "-0.5rem", marginBottom: "1rem" }}>
                💡 Sugerencia: Asegúrate de que la canónica apunte a la versión principal de este contenido.
              </p>
            )}

            <div style={sectionTitle}><Info size={16} /> Structured Data (JSON-LD)</div>
            <textarea 
              value={typeof page.schemaOrg === 'string' ? page.schemaOrg : JSON.stringify(page.schemaOrg, null, 2)} 
              onChange={(e) => update({ schemaOrg: e.target.value })} 
              style={{ ...inputStyle, height: "150px", fontFamily: "monospace", fontSize: "0.7rem" }} 
              placeholder='{ "@context": "https://schema.org", ... }'
            />
          </>
        )}
      </div>

      <div style={{ marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid #EAEEF4" }}>
        <button 
          onClick={() => update({ published: !page.published })}
          style={{ width: "100%", padding: "0.7rem", background: page.published ? "#F9FAFB" : "#875BF7", color: page.published ? "#111827" : "white", border: page.published ? "1px solid #D1D5DB" : "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
        >
          {page.published ? "📦 Despublicar" : "🚀 Publicar"}
        </button>
      </div>
    </div>
  );
}
