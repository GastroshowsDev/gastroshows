"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  type: "user" | "assistant";
  content: string;
  sources?: Array<{ id: string; title: string; category: string }>;
  helpful?: boolean;
};

export function AiAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente de GastroShows. Puedo ayudarte con preguntas sobre reservas, vales regalo, eventos privados, validación de teléfonos... ¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();

      if (data.ok) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          type: "assistant",
          content: data.answer,
          sources: data.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "assistant",
            content: data.error || "Error procesando tu pregunta",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "assistant",
          content: "Error de conexión. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, helpful } : m))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--gs-bg)",
        borderRadius: "8px",
        border: "1px solid var(--gs-border)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid var(--gs-border)",
          background: "var(--gs-bg2)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--gs-text)",
          }}
        >
          🤖 Asistente GastroShows
        </h3>
        <p
          style={{
            margin: "0.25rem 0 0 0",
            fontSize: "0.75rem",
            color: "var(--gs-muted)",
          }}
        >
          Preguntas sobre la plataforma
        </p>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <div
              style={{
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "0.75rem 1rem",
                  background: msg.type === "user" ? "var(--gs-gold)" : "var(--gs-bg2)",
                  color: msg.type === "user" ? "#0A0A0A" : "var(--gs-text)",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </div>
            </div>

            {/* Sources */}
            {msg.sources && msg.sources.length > 0 && (
              <div style={{ fontSize: "0.75rem", color: "var(--gs-muted)", marginLeft: "0.5rem" }}>
                <strong>Fuentes:</strong>
                {msg.sources.map((src) => (
                  <div key={src.id} style={{ marginLeft: "0.5rem" }}>
                    • {src.title} ({src.category})
                  </div>
                ))}
              </div>
            )}

            {/* Feedback buttons */}
            {msg.type === "assistant" && msg.helpful === undefined && (
              <div style={{ fontSize: "0.75rem", marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleFeedback(msg.id, true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--gs-muted)",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    fontSize: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--gs-gold)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--gs-muted)")
                  }
                >
                  👍 Útil
                </button>
                <button
                  onClick={() => handleFeedback(msg.id, false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--gs-muted)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--gs-gold)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "var(--gs-muted)")
                  }
                >
                  👎 No útil
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "var(--gs-bg2)",
                color: "var(--gs-text-muted)",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              ✍️ Escribiendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: "1px solid var(--gs-border)",
          padding: "1rem",
          background: "var(--gs-bg2)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "var(--gs-bg)",
            border: "1px solid var(--gs-border)",
            color: "var(--gs-text)",
            borderRadius: "4px",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--gs-gold)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--gs-border)";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--gs-gold)",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "4px",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: "0.85rem",
            opacity: loading || !input.trim() ? 0.5 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!loading && input.trim()) {
              (e.currentTarget as HTMLButtonElement).style.background = "#E8D5A8";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--gs-gold)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
