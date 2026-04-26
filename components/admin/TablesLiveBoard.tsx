"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Shift = "NOON" | "NIGHT";
type AllergyRange = "today" | "week";

type AllergyRow = {
  id: string;
  customerName: string;
  guests: number;
  allergies: string | null;
  comments: string | null;
  eventDate: string;
  shift: Shift;
  venueName: string | null;
};
import type { LiveReservationRow } from "@/types/live-reservation";

type VenueFilter = "BERTRAND" | "URGELL" | null;

type Props = {
  initialShift: Shift;
  initialItems: LiveReservationRow[];
  defaultVenue?: "BERTRAND" | "URGELL" | null;
};

export function TablesLiveBoard({ initialShift, initialItems, defaultVenue = null }: Props) {
  const [shift, setShift] = useState<Shift>(initialShift);
  const [venueFilter, setVenueFilter] = useState<VenueFilter>(defaultVenue ?? null);
  const [items, setItems] = useState<LiveReservationRow[]>(
    initialItems.filter((r) => r.status !== "CHECKED_IN"),
  );
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Allergies modal
  const [allergyOpen, setAllergyOpen] = useState(false);
  const [allergyRange, setAllergyRange] = useState<AllergyRange>("today");
  const [allergyRows, setAllergyRows] = useState<AllergyRow[]>([]);
  const [allergyLoading, setAllergyLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextFilterEffect = useRef(true);

  const load = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const params = new URLSearchParams({ eventDate: today, shift });
    const res = await fetch(`/api/admin/reservations/live?${params.toString()}`);
    const json: unknown = await res.json();
    const body = json as { ok?: boolean; data?: LiveReservationRow[]; error?: string };
    if (!body.ok || !Array.isArray(body.data)) {
      setError(body.error ?? "No se pudo cargar el servicio");
      return;
    }
    setError(null);
    setItems(body.data.filter((r) => r.status !== "CHECKED_IN"));
  }, [shift]);

  useEffect(() => {
    if (skipNextFilterEffect.current) {
      skipNextFilterEffect.current = false;
      return;
    }
    void load();
  }, [shift, load]);

  useEffect(() => {
    const id = setInterval(() => void load(), 30_000);
    return () => {
      clearInterval(id);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [load]);

  async function checkIn(id: string) {
    setBusyId(id);
    try {
      const row = items.find((r) => r.id === id);
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CHECKED_IN" }),
      });
      const json: unknown = await res.json();
      const body = json as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setError(body.error ?? "Check-in fallido");
        return;
      }
      if (row) {
        const updatedRow = { ...row, status: "CHECKED_IN" as const };
        window.dispatchEvent(
          new CustomEvent("reservation:checkin", { detail: updatedRow }),
        );
        setItems((prev) => prev.filter((r) => r.id !== id));
      } else {
        await load();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function openAllergies(range: AllergyRange = allergyRange) {
    setAllergyOpen(true);
    setAllergyLoading(true);
    try {
      const res = await fetch(`/api/admin/reservations/allergies?range=${range}`);
      const json = await res.json() as { ok: boolean; data?: AllergyRow[] };
      if (json.ok && Array.isArray(json.data)) setAllergyRows(json.data);
    } finally {
      setAllergyLoading(false);
    }
  }

  async function switchAllergyRange(range: AllergyRange) {
    setAllergyRange(range);
    setAllergyLoading(true);
    try {
      const res = await fetch(`/api/admin/reservations/allergies?range=${range}`);
      const json = await res.json() as { ok: boolean; data?: AllergyRow[] };
      if (json.ok && Array.isArray(json.data)) setAllergyRows(json.data);
    } finally {
      setAllergyLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Turno</span>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value as Shift)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="NOON">Mediodía</option>
            <option value="NIGHT">Noche</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Local</span>
          <select
            value={venueFilter ?? ""}
            onChange={(e) => setVenueFilter((e.target.value || null) as VenueFilter)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Todos</option>
            <option value="BERTRAND">Bertrand</option>
            <option value="URGELL">Urgell</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-md border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700"
        >
          Recargar
        </button>
        <button
          type="button"
          onClick={() => void openAllergies()}
          className="rounded-md border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:border-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
        >
          ⚠ Alergias y comentarios
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="inline-block size-2 rounded-full bg-emerald-500" aria-hidden />
        <span>Actualización automática (30s)</span>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <ul className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-2 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        {items.filter((r) => !venueFilter || r.venue?.name === venueFilter || (venueFilter === "BERTRAND" && r.venue?.name === "SARRIA")).length === 0 && !error ? (
          <li className="px-3 py-4 text-zinc-500">No hay reservas para esta fecha y turno.</li>
        ) : null}
        {items.filter((r) => !venueFilter || r.venue?.name === venueFilter || (venueFilter === "BERTRAND" && r.venue?.name === "SARRIA")).map((r) => {
          const checkedIn = r.status === "CHECKED_IN";
          return (
            <li
              key={r.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2 ${
                checkedIn
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                  : "border-zinc-100 dark:border-zinc-800"
              }`}
            >
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">{r.customer.name}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {r.status} · {r.guests} pax
                  {r.venue ? ` · ${r.venue.name}` : " · Sin local"}
                </div>
              </div>
              <button
                type="button"
                disabled={checkedIn || busyId === r.id}
                onClick={() => void checkIn(r.id)}
                className="rounded-md bg-zinc-900 px-3 py-1 text-xs text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {checkedIn ? "En sala" : busyId === r.id ? "…" : "Check-in"}
              </button>
            </li>
          );
        })}
      </ul>
      {/* ── Allergy & comments modal ── */}
      {allergyOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setAllergyOpen(false)}
        >
          <div
            style={{
              background: "var(--color-admin-surface)",
              border: "1px solid var(--color-admin-border)",
              borderRadius: 12,
              width: "100%", maxWidth: 600,
              maxHeight: "80vh",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--color-admin-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div>
                <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-admin-text)", margin: 0 }}>
                  ⚠ Alergias y comentarios
                </h2>
              </div>
              <button
                onClick={() => setAllergyOpen(false)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-admin-muted)", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* Range toggle */}
            <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--color-admin-border)", display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              {(["today", "week"] as AllergyRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => void switchAllergyRange(r)}
                  style={{
                    padding: "0.3rem 0.9rem",
                    borderRadius: 20,
                    fontSize: "0.78rem", fontWeight: 500,
                    border: `1px solid ${allergyRange === r ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
                    background: allergyRange === r ? "var(--color-admin-accent)" : "transparent",
                    color: allergyRange === r ? "#fff" : "var(--color-admin-muted)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {r === "today" ? "Hoy" : "Esta semana"}
                </button>
              ))}
            </div>

            {/* Body */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0.75rem 1.25rem" }}>
              {allergyLoading ? (
                <p style={{ textAlign: "center", padding: "2rem", color: "var(--color-admin-muted)", fontSize: "0.85rem" }}>
                  Cargando…
                </p>
              ) : allergyRows.length === 0 ? (
                <p style={{ textAlign: "center", padding: "2rem", color: "var(--color-admin-muted)", fontSize: "0.85rem" }}>
                  Sin alergias ni comentarios para {allergyRange === "today" ? "hoy" : "esta semana"}
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {allergyRows.map((row) => {
                    const dateStr = new Date(row.eventDate).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
                    const shiftLabel = row.shift === "NOON" ? "☀️ Mediodía" : "🌙 Noche";
                    const venueLabel = row.venueName === "BERTRAND" || row.venueName === "SARRIA" ? "Bertrand" : row.venueName === "URGELL" ? "Urgell" : null;
                    return (
                      <div
                        key={row.id}
                        style={{
                          borderRadius: 8,
                          border: row.allergies ? "1px solid #FCA5A5" : "1px solid var(--color-admin-border)",
                          background: row.allergies ? "#FFF7F7" : "var(--color-admin-bg)",
                          padding: "0.75rem 1rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.3rem" }}>
                          <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-admin-text)" }}>
                            {row.customerName}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>
                            {dateStr} · {shiftLabel}{venueLabel ? ` · ${venueLabel}` : ""} · {row.guests} pax
                          </span>
                        </div>
                        {row.allergies && (
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: row.comments ? "0.35rem" : 0 }}>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#DC2626", background: "#FEE2E2", padding: "1px 6px", borderRadius: 10, flexShrink: 0, marginTop: 1 }}>
                              ALERGIA
                            </span>
                            <span style={{ fontSize: "0.83rem", color: "#B91C1C" }}>{row.allergies}</span>
                          </div>
                        )}
                        {row.comments && (
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-admin-accent)", background: "var(--color-admin-accent-light)", padding: "1px 6px", borderRadius: 10, flexShrink: 0, marginTop: 1 }}>
                              NOTA
                            </span>
                            <span style={{ fontSize: "0.83rem", color: "var(--color-admin-text)" }}>{row.comments}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
