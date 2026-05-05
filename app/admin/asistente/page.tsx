"use client";

import { useState, useRef, useEffect } from "react";
import { LucideMessageSquare, LucideSend, LucideZap, LucideCode, LucideSparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  status?: "pending" | "done" | "error";
  pr?: { url: string; number: number; branch: string };
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! Soy tu asistente de IA. ¿Qué cambio te gustaría hacer en la web hoy? Puedo modificar colores, textos o incluso crear pequeños componentes." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg }),
      });
      
      const json = await res.json();
      
      if (json.ok) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "He preparado el cambio. ¿Qué quieres hacer ahora?",
          pr: json.prUrl ? { 
            url: json.prUrl, 
            number: parseInt(json.prUrl.split("/").pop() || "0"), 
            branch: json.branchName 
          } : undefined
        }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Error: " + (json.error || "No pude procesar la petición.") }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión con el servidor." }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(action: "merge", pr: { number: number; branch: string }) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "merge", pullNumber: pr.number, branchName: pr.branch }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: "✅ ¡Hecho! El cambio ya está publicado en la web oficial. En unos segundos se verá reflejado." }]);
      }
    } catch (err) {
      alert("Error al publicar el cambio.");
    } finally {
      setLoading(false);
    }
  }

  // Adivinamos la URL de Vercel basada en la rama (patrón estándar de Vercel)
  const getPreviewUrl = (branch: string) => `https://gastroshows-next-git-${branch}-gastroshowsdev.vercel.app`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)", color: "var(--color-admin-text)" }}>
      {/* Header */}
      <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #efb810 0%, #d4a30e 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <LucideSparkles size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Asistente AI de Gastroshows</h1>
          <p style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)", margin: 0 }}>Modifica tu aplicación mediante lenguaje natural</p>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: m.role === "user" ? "flex-end" : "flex-start",
            animation: m.role === "assistant" ? "fadeIn 0.3s ease-out" : "none"
          }}>
            <div style={{ 
              maxWidth: "80%",
              padding: "1rem 1.25rem",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "var(--color-admin-accent)" : "var(--color-admin-surface)",
              color: m.role === "user" ? "#fff" : "var(--color-admin-text)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontSize: "0.9rem",
              lineHeight: "1.5",
              border: m.role === "assistant" ? "1px solid var(--color-admin-border)" : "none"
            }}>
              {m.content}
              
              {/* Botones de acción para el asistente */}
              {m.pr && (
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <a 
                    href={m.pr.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      padding: "0.5rem 0.8rem", borderRadius: "8px", background: "var(--color-admin-bg)", 
                      color: "var(--color-admin-text)", fontSize: "0.75rem", fontWeight: 600, 
                      textDecoration: "none", border: "1px solid var(--color-admin-border)",
                      display: "flex", alignItems: "center", gap: "0.4rem"
                    }}
                  >
                    🔍 Revisar en GitHub (Ver Vista Previa)
                  </a>
                  <button 
                    onClick={() => m.pr && handleAction("merge", m.pr)}
                    style={{ 
                      padding: "0.5rem 0.8rem", borderRadius: "8px", background: "#16A34A", 
                      color: "#fff", fontSize: "0.75rem", fontWeight: 600, border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem"
                    }}
                  >
                    🚀 Publicar en la Web Real
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-admin-muted)", fontSize: "0.8rem" }}>
            <LucideZap size={14} className="animate-pulse" />
            Procesando...
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)" }}>
        <div style={{ 
          display: "flex", 
          gap: "0.75rem", 
          maxWidth: "900px", 
          margin: "0 auto",
          background: "var(--color-admin-bg)",
          padding: "0.5rem",
          borderRadius: "14px",
          border: "1px solid var(--color-admin-border)"
        }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe un cambio..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--color-admin-text)", padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{ 
              background: "var(--color-admin-accent)", 
              color: "#fff", 
              border: "none", 
              borderRadius: "10px", 
              padding: "0.5rem 1rem", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: (loading || !input.trim()) ? 0.6 : 1
            }}
          >
            <LucideSend size={16} />
            Enviar
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
