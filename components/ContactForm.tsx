"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "reserva",
    message: "",
    honeypot: "", // anti-spam
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // bot detectado
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", phone: "", subject: "reserva", message: "", honeypot: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--gs-bg2)",
    border: "1px solid var(--gs-border)",
    color: "var(--gs-text)",
    padding: "0.85rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "var(--font-montserrat)",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--gs-muted)",
    marginBottom: "0.5rem",
  };

  if (status === "ok") {
    return (
      <div
        style={{
          padding: "3rem",
          border: "1px solid rgba(218,165,32,0.3)",
          background: "rgba(218,165,32,0.04)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.5rem",
            color: "var(--gs-text)",
            marginBottom: "0.5rem",
          }}
        >
          Mensaje enviado
        </p>
        <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem" }}>
          Te respondemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        value={form.honeypot}
        onChange={(e) => setForm((p) => ({ ...p, honeypot: e.target.value }))}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Nombre *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            style={inputStyle}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Teléfono</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            style={inputStyle}
            placeholder="+34 600 000 000"
          />
        </div>
        <div>
          <label style={labelStyle}>Motivo *</label>
          <select
            required
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="reserva">Consulta de reserva</option>
            <option value="grupo">Grupo / Evento privado</option>
            <option value="regalo">Bono regalo</option>
            <option value="alergias">Alergias / Dietas especiales</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Mensaje *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          placeholder="Cuéntanos lo que necesitas..."
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#e05252", fontSize: "0.85rem" }}>
          Ha ocurrido un error. Por favor, escríbenos directamente a info@gastroshows.es
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: status === "sending" ? "rgba(218,165,32,0.5)" : "var(--gs-gold)",
          color: "#0A0A0A",
          padding: "1rem 2.5rem",
          fontFamily: "var(--font-montserrat)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          border: "none",
          alignSelf: "flex-start",
        }}
      >
        {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
}
