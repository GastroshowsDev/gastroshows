"use client";

import { useCallback, useEffect, useState } from "react";
import type { LiveReservationRow } from "@/types/live-reservation";

const POLL_INTERVAL = 30_000;

type Props = {
  initialItems: LiveReservationRow[];
};

export function RecentActivityFeed({ initialItems }: Props) {
  const [items, setItems] = useState<LiveReservationRow[]>(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/reservations/live?limit=40");
    const json: unknown = await res.json();
    const body = json as { ok?: boolean; data?: LiveReservationRow[]; error?: string };
    if (!body.ok || !Array.isArray(body.data)) {
      setError(body.error ?? "No se pudo cargar actividades");
      return;
    }
    setError(null);
    setItems(body.data);
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    const id = setInterval(() => void load(), POLL_INTERVAL);
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="inline-block size-2 rounded-full bg-emerald-500" aria-hidden />
        <span>
          {lastUpdated
            ? `Actualizado ${lastUpdated.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
            : "Cargando…"}
        </span>
        <button
          type="button"
          onClick={() => void load()}
          className="text-zinc-900 underline dark:text-zinc-100"
        >
          Actualizar
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <ul className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-2 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        {items.length === 0 && !error ? (
          <li className="px-3 py-4 text-zinc-500">Sin actividad reciente.</li>
        ) : null}
        {items.map((r) => {
          const label =
            r.status === "PENDING" ? "Nueva reserva" :
            r.status === "CONFIRMED" ? "Confirmada" :
            r.status === "CHECKED_IN" ? "Check-in" :
            r.status === "CANCELLED" ? "Cancelada" :
            r.status === "PAYMENT_FAILED" ? "Pago fallido" :
            "Actualizada";
          const dotColor =
            r.status === "CANCELLED" ? "#EF4444" :
            r.status === "PAYMENT_FAILED" ? "#EF4444" :
            r.status === "CONFIRMED" ? "#10B981" :
            r.status === "CHECKED_IN" ? "#875BF7" : 
            "#F59E0B"; // PENDING
          const venueName = r.venue
            ? (r.venue.name === "BERTRAND" || r.venue.name === "SARRIA" ? "Bertrand" : r.venue.name === "URGELL" ? "Urgell" : r.venue.name)
            : null;
          return (
            <li
              key={r.id}
              className="rounded-md border border-zinc-100 px-3 py-2 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0, display: "inline-block" }} />
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{r.customer.name}</span>
                <span className="ml-auto text-xs" style={{ color: dotColor, fontWeight: 600 }}>{label}</span>
              </div>
              <div className="mt-0.5 text-zinc-500 dark:text-zinc-400" style={{ fontSize: "0.75rem", paddingLeft: "14px" }}>
                {r.guests} pax{venueName ? ` · ${venueName}` : ""}
                {r.event ? ` · ${new Date(r.event.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })} ${r.event.shift === "NOON" ? "Med." : "Noc."}` : ""}
              </div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500" style={{ paddingLeft: "14px" }}>
                {new Date(r.updatedAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
