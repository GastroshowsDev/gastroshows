"use client";

import { useState, useEffect } from "react";
import type { CampaignRow } from "@/app/admin/promociones/page";

const PROMO_ICONS = ["🏷", "🎁", "⭐", "🔥", "💎", "🎯"];

// ── Spanish holiday presets ───────────────────────────────────────────────────
type Preset = { name: string; icon: string; desc: string; month: number; day: number; duration: number; discount: number };

const PRESETS: Preset[] = [
  { name: "Año Nuevo",        icon: "🥂", desc: "1 enero",        month: 1,  day: 1,  duration: 3,  discount: 15 },
  { name: "Reyes Magos",      icon: "👑", desc: "6 enero",        month: 1,  day: 4,  duration: 4,  discount: 10 },
  { name: "San Valentín",     icon: "❤️", desc: "14 febrero",     month: 2,  day: 10, duration: 6,  discount: 10 },
  { name: "Día del Padre",    icon: "👨", desc: "19 marzo",       month: 3,  day: 17, duration: 4,  discount: 10 },
  { name: "Semana Santa",     icon: "✨", desc: "Pascua",         month: 3,  day: 25, duration: 9,  discount: 12 },
  { name: "Día de la Madre",  icon: "💐", desc: "1º domingo mayo",month: 4,  day: 30, duration: 5,  discount: 10 },
  { name: "Puente de Mayo",   icon: "🌷", desc: "1 mayo",         month: 4,  day: 29, duration: 5,  discount: 8  },
  { name: "Verano",           icon: "☀️", desc: "Julio-agosto",   month: 7,  day: 1,  duration: 61, discount: 8  },
  { name: "La Diada",         icon: "🌹", desc: "11 septiembre",  month: 9,  day: 9,  duration: 5,  discount: 10 },
  { name: "Halloween",        icon: "🎃", desc: "31 octubre",     month: 10, day: 28, duration: 5,  discount: 10 },
  { name: "Nochebuena",       icon: "🎄", desc: "24 diciembre",   month: 12, day: 22, duration: 4,  discount: 15 },
  { name: "Nochevieja",       icon: "🎆", desc: "31 diciembre",   month: 12, day: 29, duration: 4,  discount: 20 },
];

function presetDates(p: Preset) {
  const year = new Date().getFullYear();
  const start = new Date(year, p.month - 1, p.day);
  const end = new Date(year, p.month - 1, p.day + p.duration - 1);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

// ── Toggle component ──────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      aria-checked={on}
      role="switch"
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: on ? "var(--color-admin-accent)" : "var(--color-admin-border)",
        position: "relative", cursor: "pointer", border: "none", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", display: "block",
      }} />
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function PromosList({ campaigns }: { campaigns: CampaignRow[] }) {
  const [localCampaigns, setLocalCampaigns] = useState(campaigns);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  // Editable base price (persisted in localStorage)
  const [basePrice, setBasePrice] = useState(130);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceInput, setPriceInput] = useState("130");

  useEffect(() => {
    const stored = localStorage.getItem("baseMenuPrice");
    if (stored) {
      const n = parseInt(stored, 10);
      if (!isNaN(n) && n > 0) { setBasePrice(n); setPriceInput(String(n)); }
    }
  }, []);

  function commitPrice() {
    const n = parseInt(priceInput, 10);
    if (!isNaN(n) && n > 0) {
      setBasePrice(n);
      localStorage.setItem("baseMenuPrice", String(n));
    } else {
      setPriceInput(String(basePrice));
    }
    setEditingPrice(false);
  }

  function applyPreset(p: Preset) {
    const { startDate, endDate } = presetDates(p);
    setNewName(p.name);
    setNewDiscount(String(p.discount));
    setNewStart(startDate);
    setNewEnd(endDate);
    setShowPresets(false);
    setShowNew(true);
  }

  async function toggleActive(id: string, active: boolean) {
    setLocalCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, active } : c)));
    await fetch(`/api/admin/campaigns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
  }

  async function handleCreate() {
    if (!newName || !newDiscount || !newStart || !newEnd) return;
    setSaving(true);
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, discountPct: parseFloat(newDiscount), startDate: newStart, endDate: newEnd }),
    });
    if (res.ok) {
      const created = await res.json() as CampaignRow;
      setLocalCampaigns((prev) => [created, ...prev]);
      setShowNew(false);
      setNewName(""); setNewDiscount(""); setNewStart(""); setNewEnd("");
    }
    setSaving(false);
  }

  async function deleteCampaign(id: string) {
    if (!confirm("¿Eliminar esta promoción?")) return;
    await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
    setLocalCampaigns((prev) => prev.filter((c) => c.id !== id));
  }

  const now = new Date().toISOString().slice(0, 10);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
      {/* ── Base price ── */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
          Precio base
        </h2>
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 12, padding: "1.25rem",
          display: "flex", alignItems: "flex-start", gap: "1rem",
        }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--color-admin-accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
            💰
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-admin-text)" }}>Menú degustación</div>
            <div style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.2rem", lineHeight: 1.5 }}>
              Precio por persona · Experiencia gastronómica completa
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {editingPrice ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <input
                  type="number"
                  min={1}
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") commitPrice(); if (e.key === "Escape") { setPriceInput(String(basePrice)); setEditingPrice(false); } }}
                  autoFocus
                  style={{
                    fontFamily: "DM Mono, monospace", fontSize: "1.5rem", fontWeight: 500,
                    width: "90px", textAlign: "right",
                    border: "1px solid var(--color-admin-accent)", borderRadius: 6,
                    padding: "0.1rem 0.4rem", outline: "none",
                    color: "var(--color-admin-text)", background: "var(--color-admin-bg)",
                  }}
                />
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: "1.8rem", fontWeight: 500, color: "var(--color-admin-text)" }}>€</span>
                <button onClick={commitPrice} style={{ padding: "0.25rem 0.6rem", borderRadius: 6, background: "var(--color-admin-accent)", color: "#fff", border: "none", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>✓</button>
                <button onClick={() => { setPriceInput(String(basePrice)); setEditingPrice(false); }} style={{ padding: "0.25rem 0.6rem", borderRadius: 6, background: "var(--color-admin-border)", color: "var(--color-admin-muted)", border: "none", fontSize: "0.78rem", cursor: "pointer" }}>✕</button>
              </div>
            ) : (
              <button
                onClick={() => setEditingPrice(true)}
                title="Editar precio"
                style={{ display: "flex", alignItems: "baseline", gap: "0.1rem", background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0.4rem", borderRadius: 6 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-admin-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: "1.8rem", fontWeight: 500, color: "var(--color-admin-text)" }}>{basePrice}€</span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-admin-muted)", marginLeft: 4 }}>✎</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Campaigns header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Campañas
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setShowPresets((v) => !v)}
            style={{
              padding: "0.4rem 0.9rem", borderRadius: 6,
              background: showPresets ? "var(--color-admin-accent-light)" : "var(--color-admin-surface)",
              color: showPresets ? "var(--color-admin-accent)" : "var(--color-admin-muted)",
              border: `1px solid ${showPresets ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
              fontSize: "0.82rem", fontWeight: 500, cursor: "pointer",
            }}
          >
            🎉 Presets festividades
          </button>
          <button
            onClick={() => setShowNew(true)}
            style={{ padding: "0.4rem 0.9rem", borderRadius: 6, background: "var(--color-admin-accent)", color: "#fff", border: "none", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer" }}
          >
            + Nueva campaña
          </button>
        </div>
      </div>

      {/* ── Holiday presets panel ── */}
      {showPresets && (
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 12, padding: "1.25rem", marginBottom: "1rem",
        }}>
          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--color-admin-text)", marginBottom: "0.75rem" }}>
            Festividades — clic para pre-rellenar el formulario
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.5rem" }}>
            {PRESETS.map((p) => {
              const { startDate, endDate } = presetDates(p);
              const fmtDate = (s: string) => new Date(s).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
              return (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start",
                    padding: "0.65rem 0.75rem", borderRadius: 8, cursor: "pointer",
                    border: "1px solid var(--color-admin-border)",
                    background: "var(--color-admin-bg)",
                    textAlign: "left", transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-admin-accent)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--color-admin-accent-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-admin-border)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--color-admin-bg)"; }}
                >
                  <span style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>{p.icon}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-text)" }}>{p.name}</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--color-admin-muted)" }}>
                    {fmtDate(startDate)} → {fmtDate(endDate)}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "var(--color-admin-accent)", fontWeight: 600, marginTop: "0.15rem" }}>-{p.discount}%</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── New campaign form ── */}
      {showNew && (
        <div style={{ background: "var(--color-admin-surface)", border: "1px solid var(--color-admin-accent)", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-admin-text)", marginBottom: "1rem" }}>Nueva campaña</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>Nombre</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej: Descuento verano"
                style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1px solid var(--color-admin-border)", borderRadius: 6, fontSize: "0.85rem", outline: "none", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>Descuento (%)</label>
              <input
                type="number" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)}
                placeholder="10" min="0" max="100"
                style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1px solid var(--color-admin-border)", borderRadius: 6, fontSize: "0.85rem", outline: "none", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>Precio con descuento</label>
              <div style={{ padding: "0.55rem 0.75rem", border: "1px solid var(--color-admin-border)", borderRadius: 6, fontSize: "0.85rem", background: "var(--color-admin-border)", color: "var(--color-admin-muted)" }}>
                {newDiscount ? `${(basePrice * (1 - parseFloat(newDiscount) / 100)).toFixed(0)}€/persona` : `${basePrice}€/persona`}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>Fecha inicio</label>
              <input
                type="date" value={newStart} onChange={(e) => setNewStart(e.target.value)}
                style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1px solid var(--color-admin-border)", borderRadius: 6, fontSize: "0.85rem", outline: "none", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>Fecha fin</label>
              <input
                type="date" value={newEnd} onChange={(e) => setNewEnd(e.target.value)}
                style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1px solid var(--color-admin-border)", borderRadius: 6, fontSize: "0.85rem", outline: "none", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", boxSizing: "border-box" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "flex-end" }}>
            <button onClick={() => setShowNew(false)} style={{ padding: "0.4rem 0.9rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", color: "var(--color-admin-muted)", fontSize: "0.82rem", cursor: "pointer" }}>
              Cancelar
            </button>
            <button onClick={() => void handleCreate()} disabled={saving} style={{ padding: "0.4rem 0.9rem", borderRadius: 6, background: "var(--color-admin-accent)", color: "#fff", border: "none", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", opacity: saving ? 0.6 : 1 }}>
              {saving ? "Guardando..." : "Crear campaña"}
            </button>
          </div>
        </div>
      )}

      {/* ── Campaign list ── */}
      {localCampaigns.length === 0 && !showNew ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-admin-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏷</div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-admin-text)", marginBottom: "0.3rem" }}>Sin campañas</div>
          <div style={{ fontSize: "0.8rem" }}>Crea tu primera campaña de descuento</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {localCampaigns.map((c, i) => {
            const start = new Date(c.startDate).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
            const end = new Date(c.endDate).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
            const isExpired = c.endDate < now;
            const isUpcoming = c.startDate > now;
            const isRunning = !isExpired && !isUpcoming;
            const discountedPrice = basePrice * (1 - c.discountPct / 100);

            return (
              <div
                key={c.id}
                style={{
                  background: "var(--color-admin-surface)",
                  border: `1px solid ${c.active && isRunning ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
                  borderRadius: 12, padding: "1.25rem",
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  opacity: isExpired ? 0.6 : 1,
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: c.active && isRunning ? "var(--color-admin-accent-light)" : "var(--color-admin-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                  {PROMO_ICONS[i % PROMO_ICONS.length]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-admin-text)" }}>{c.name}</span>
                    {isRunning && c.active && (
                      <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, background: "#DCFCE7", color: "#16A34A" }}>EN CURSO</span>
                    )}
                    {isUpcoming && (
                      <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, background: "#DBEAFE", color: "#2563EB" }}>PRÓXIMA</span>
                    )}
                    {isExpired && (
                      <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, background: "var(--color-admin-bg)", color: "var(--color-admin-muted)" }}>EXPIRADA</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", lineHeight: 1.5 }}>
                    {start} → {end} · <strong style={{ color: "var(--color-admin-accent)" }}>-{c.discountPct}%</strong> · {discountedPrice.toFixed(0)}€/persona
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                  <Toggle on={c.active} onChange={(v) => void toggleActive(c.id, v)} />
                  <button
                    onClick={() => void deleteCampaign(c.id)}
                    style={{ padding: "0.3rem 0.6rem", borderRadius: 6, background: "#FEE2E2", color: "#DC2626", border: "none", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
