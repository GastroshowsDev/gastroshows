"use client";

import { useEffect, useState } from "react";
import type { LiveReservationRow } from "@/types/live-reservation";

const VENUE_COLOR: Record<string, { bg: string; color: string }> = {
  BERTRAND: { bg: "#CFFAFE", color: "#0891B2" },
  SARRIA:   { bg: "#CFFAFE", color: "#0891B2" },
  URGELL:   { bg: "#EDE9FE", color: "#7C3AED" },
};

function badge(bg: string, color: string, text: string) {
  return (
    <span style={{
      padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem",
      fontWeight: 600, background: bg, color,
    }}>
      {text}
    </span>
  );
}

function ActionBtn({ label, color, onClick }: { label: string; color?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.3rem 0.75rem",
        borderRadius: "6px",
        border: `1px solid ${color ?? "var(--color-admin-border)"}`,
        background: "transparent",
        color: color ?? "var(--color-admin-text)",
        fontSize: "0.75rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = color ? `${color}18` : "var(--color-admin-bg)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
    >
      {label}
    </button>
  );
}

function PlusMenu({ reservaId }: { reservaId: string }) {
  const [open, setOpen] = useState(false);
  void reservaId;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "28px", height: "28px", borderRadius: "50%",
          border: "1px solid var(--color-admin-border)",
          background: "transparent",
          color: "var(--color-admin-muted)",
          fontSize: "1rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-admin-bg)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        +
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", bottom: "calc(100% + 6px)", right: 0,
            background: "var(--color-admin-surface)",
            border: "1px solid var(--color-admin-border)",
            borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 100, minWidth: "160px", overflow: "hidden",
          }}>
            {[
              { label: "Desencolar", icon: "↩" },
              { label: "Enviar descuento", icon: "%" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  width: "100%", padding: "0.55rem 0.9rem",
                  fontSize: "0.8rem", color: "var(--color-admin-text)",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: "1px solid var(--color-admin-border)",
                  textAlign: "left" as const,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-admin-bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
              >
                <span style={{ opacity: 0.6, fontSize: "0.85rem" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Cobrar modal ─────────────────────────────────────────────────────────────
function CobrarModal({
  reservation,
  onClose,
  onPaid,
}: {
  reservation: LiveReservationRow;
  onClose: () => void;
  onPaid: (updated: LiveReservationRow) => void;
}) {
  const pending = reservation.totalAmount - reservation.paidAmount;
  const [tab, setTab] = useState<"CASH" | "CARD">("CASH");
  const [cashInput, setCashInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cashReceived = parseFloat(cashInput) || 0;
  const change = cashReceived - pending;
  const cashValid = cashReceived >= pending - 0.01;

  function handleKey(val: string) {
    setCashInput((prev) => {
      if (val === "⌫") return prev.slice(0, -1);
      if (val === "." && prev.includes(".")) return prev;
      if (val === "." && prev === "") return "0.";
      return prev + val;
    });
  }

  async function handleAccept() {
    setBusy(true);
    setError(null);
    const amount = tab === "CASH" ? pending : pending; // always charge the pending amount
    try {
      const res = await fetch(`/api/admin/reservations/${reservation.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: tab, amount }),
      });
      const json = await res.json() as { ok?: boolean; data?: LiveReservationRow; error?: string };
      if (!json.ok) { setError(json.error ?? "Error"); return; }
      if (json.data) onPaid(json.data as LiveReservationRow);
      onClose();
    } catch {
      setError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  const overlay: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "1rem",
  };
  const modal: React.CSSProperties = {
    background: "var(--color-admin-surface)",
    border: "1px solid var(--color-admin-border)",
    borderRadius: 12,
    width: "100%", maxWidth: 320,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    overflow: "hidden",
  };
  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: "0.6rem",
    background: active ? "var(--color-admin-accent)" : "transparent",
    color: active ? "#fff" : "var(--color-admin-muted)",
    border: "none", cursor: "pointer",
    fontSize: "0.82rem", fontWeight: 600,
    borderRadius: 6, transition: "all 0.15s",
  });

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid var(--color-admin-border)" }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
            Cobrar — {reservation.customer.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: 2 }}>
            Pendiente: <strong style={{ color: "#D97706" }}>{pending.toFixed(2)}€</strong>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, padding: "0.75rem 1.25rem 0" }}>
          <button style={tabBtn(tab === "CASH")} onClick={() => setTab("CASH")}>Efectivo</button>
          <button style={tabBtn(tab === "CARD")} onClick={() => setTab("CARD")}>Tarjeta</button>
        </div>

        {/* Body */}
        <div style={{ padding: "0.75rem 1.25rem 1.25rem" }}>
          {tab === "CASH" ? (
            <>
              {/* Display */}
              <div style={{
                background: "var(--color-admin-bg)", borderRadius: 8,
                padding: "0.6rem 0.75rem", marginBottom: "0.75rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>Recibido</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                  {cashInput || "0"}€
                </span>
              </div>
              {cashInput && (
                <div style={{
                  textAlign: "right", fontSize: "0.8rem", marginBottom: "0.5rem",
                  color: change >= 0 ? "#16A34A" : "#EF4444", fontWeight: 600,
                }}>
                  {change >= 0 ? `Cambio: ${change.toFixed(2)}€` : `Faltan: ${Math.abs(change).toFixed(2)}€`}
                </div>
              )}
              {/* Keypad */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {["7","8","9","4","5","6","1","2","3",".",  "0","⌫"].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    style={{
                      padding: "0.65rem",
                      borderRadius: 8,
                      border: "1px solid var(--color-admin-border)",
                      background: k === "⌫" ? "var(--color-admin-bg)" : "var(--color-admin-surface)",
                      color: "var(--color-admin-text)",
                      fontSize: k === "⌫" ? "1rem" : "0.9rem",
                      fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              background: "var(--color-admin-bg)", borderRadius: 8,
              padding: "1rem", textAlign: "center", marginBottom: "0.75rem",
            }}>
              <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginBottom: 4 }}>
                Importe a cobrar
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                {pending.toFixed(2)}€
              </div>
            </div>
          )}

          {error && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginBottom: "0.5rem" }}>{error}</p>}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, marginTop: "0.75rem" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "0.6rem",
                border: "1px solid var(--color-admin-border)",
                borderRadius: 8, background: "transparent",
                color: "var(--color-admin-muted)",
                fontSize: "0.82rem", cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => void handleAccept()}
              disabled={busy || (tab === "CASH" && !cashValid)}
              style={{
                flex: 2, padding: "0.6rem",
                borderRadius: 8, border: "none",
                background: busy || (tab === "CASH" && !cashValid) ? "var(--color-admin-border)" : "#16A34A",
                color: "#fff",
                fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              {busy ? "…" : "Aceptar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SalaBoard({ initialItems }: { initialItems: LiveReservationRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [cobrarId, setCobrarId] = useState<string | null>(null);

  useEffect(() => {
    function handler(e: Event) {
      const row = (e as CustomEvent<LiveReservationRow>).detail;
      setItems((prev) =>
        prev.some((r) => r.id === row.id) ? prev : [...prev, row],
      );
    }
    window.addEventListener("reservation:checkin", handler);
    return () => window.removeEventListener("reservation:checkin", handler);
  }, []);

  async function handleCheckout(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      setItems((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--color-admin-muted)", fontSize: "0.85rem" }}>
        No hay reservas en sala ahora mismo
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {items.map((r) => {
        const pending = r.totalAmount - r.paidAmount;
        const vc = r.venue ? (VENUE_COLOR[r.venue.name] ?? null) : null;

        return (
          <div
            key={r.id}
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "0.9rem 1.25rem",
              borderBottom: "1px solid var(--color-admin-border)",
              flexWrap: "wrap" as const,
            }}
          >
            {/* Guest info */}
            <div style={{ flex: "1 1 180px", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-admin-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.customer.name}
                </span>
                {r.type === "GIFT" && (
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "1px 6px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626" }}>
                    Regalo 🎁
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)", marginTop: "2px" }}>
                {r.customer.phone}
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
              <span style={{
                padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 600,
                background: "var(--color-admin-accent-light)", color: "var(--color-admin-accent)",
              }}>
                {r.guests} pax
              </span>
              {vc && r.venue && badge(vc.bg, vc.color, r.venue.name === "BERTRAND" || r.venue.name === "SARRIA" ? "Bertrand" : "Urgell")}
            </div>

            {/* Payment */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexShrink: 0 }}>
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total</div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-admin-text)" }}>{r.totalAmount.toFixed(0)}€</div>
              </div>
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Pagado</div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#16A34A" }}>{r.paidAmount.toFixed(0)}€</div>
              </div>
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Pendiente</div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: pending > 0 ? "#D97706" : "var(--color-admin-muted)" }}>
                  {pending > 0 ? `${pending.toFixed(0)}€` : "—"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, marginLeft: "auto" }}>
              <ActionBtn
                label="Cobrar"
                color="#16A34A"
                onClick={pending > 0 ? () => setCobrarId(r.id) : undefined}
              />
              <ActionBtn
                label={busyId === r.id ? "…" : "Check out"}
                color="#875BF7"
                onClick={busyId === r.id ? undefined : () => void handleCheckout(r.id)}
              />
              <ActionBtn label="Editar" />
              <PlusMenu reservaId={r.id} />
            </div>
          </div>
        );
      })}

      {cobrarId && (() => {
        const res = items.find((r) => r.id === cobrarId);
        if (!res) return null;
        return (
          <CobrarModal
            reservation={res}
            onClose={() => setCobrarId(null)}
            onPaid={(updated) => {
              setItems((prev) => prev.map((r) =>
                r.id === updated.id
                  ? { ...r, paidAmount: Number(updated.paidAmount), totalAmount: Number(updated.totalAmount) }
                  : r
              ));
            }}
          />
        );
      })()}
    </div>
  );
}
