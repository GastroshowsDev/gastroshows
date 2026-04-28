"use client";

import { useCallback, useEffect, useState } from "react";
import { VenueSelectionModal } from "./VenueSelectionModal";

type VenueName = "BERTRAND" | "SARRIA" | "URGELL";

type PendingRow = {
  id: string;
  guests: number;
  totalAmount: string;
  createdAt: string;
  isFirstVisit: boolean;
  customer: { name: string; phone: string; email: string; comments: string | null };
  event: { date: string; shift: string };
  venue: { name: string } | null;
};

const VENUE_LABELS: Record<VenueName, string> = {
  BERTRAND: "Bertrand",
  SARRIA:   "Bertrand",
  URGELL:   "Eixample (Urgell)",
};

export function PendingReservationsPanel() {
  const [rows, setRows] = useState<PendingRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [venueSelect, setVenueSelect] = useState<Partial<Record<string, VenueName>>>({});
  
  // State for the modal
  const [modalReservation, setModalReservation] = useState<PendingRow | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reservations/pending");
      const json = (await res.json()) as { ok: boolean; data?: PendingRow[]; error?: string };
      if (!json.ok || !Array.isArray(json.data)) {
        setError(json.error ?? "No se pudieron cargar las reservas pendientes");
        return;
      }
      setError(null);
      setRows(json.data);
    } catch {
      setError("Error de conexión");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const id = setInterval(() => void load(), 30_000);
    return () => clearInterval(id);
  }, [load]);

  async function patchReservation(id: string, body: { status: string; venueName?: VenueName | null }) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Error al actualizar la reserva");
        return;
      }
      await load();
    } catch {
      setError("Error de conexión al actualizar");
    } finally {
      setBusyId(null);
    }
  }

  function confirm(id: string) {
    const row = rows.find(r => r.id === id);
    if (!row) return;

    const currentVenue = venueSelect[id] || (row.venue?.name as VenueName | undefined);
    
    // We now allow confirming without venue. 
    // The venue will be assigned later (5 days before).
    void patchReservation(id, { status: "CONFIRMED", venueName: currentVenue || null });
  }


  function handleModalConfirm(venue: "BERTRAND" | "URGELL") {
    if (!modalReservation) return;
    const id = modalReservation.id;
    setModalReservation(null);
    void patchReservation(id, { status: "CONFIRMED", venueName: venue });
  }

  function cancel(id: string) {
    void patchReservation(id, { status: "CANCELLED" });
  }

  const count = rows.length;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            Pendientes de confirmar
          </h2>
          {count > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              {count}
            </span>
          )}
        </div>
        <button
          onClick={() => void load()}
          className="text-xs text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </p>
      )}

      {count === 0 && !error ? (
        <p className="py-6 text-center text-sm text-zinc-400">
          No hay reservas pendientes de confirmar.
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => {
            const isBusy = busyId === r.id;
            const eventDate = new Date(r.event.date).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            });
            const shift = r.event.shift === "NOON" ? "Mediodía" : "Noche";
            const total = parseFloat(r.totalAmount);
            const deposit = (total * 0.3).toFixed(2);

            return (
              <li
                key={r.id}
                className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Header row */}
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {r.customer.name}
                    </span>
                    {r.isFirstVisit && (
                      <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        Primera visita
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-400">
                    {new Date(r.createdAt).toLocaleString("es-ES", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Details grid */}
                <dl className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
                  <Detail label="Fecha" value={`${eventDate} · ${shift}`} wide />
                  <Detail label="Personas" value={`${r.guests} pax`} />
                  <Detail label="Total" value={`${total.toFixed(2)} € (depósito ${deposit} €)`} />
                  <Detail label="Teléfono" value={r.customer.phone} />
                  <Detail label="Email" value={r.customer.email} />
                  {r.customer.comments && (
                    <Detail label="Notas" value={r.customer.comments} wide />
                  )}
                </dl>

                {/* Venue selector */}
                <div className="mb-3">
                  <p className="mb-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Asignar local
                  </p>
                  <div className="flex gap-2">
                    {(["BERTRAND", "URGELL"] as Array<"BERTRAND" | "URGELL">).map((v) => (
                      <button
                        key={v}
                        onClick={() =>
                          setVenueSelect((prev) => ({
                            ...prev,
                            [r.id]: prev[r.id] === v ? undefined : v,
                          }))
                        }
                        className={`rounded-md border px-3 py-1.5 text-xs transition ${
                          venueSelect[r.id] === v
                            ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                            : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
                        }`}
                      >
                        {VENUE_LABELS[v]}
                      </button>
                    ))}
                    {r.venue && (
                      <span className="self-center text-xs text-zinc-400">
                        (actual: {r.venue.name})
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    disabled={isBusy}
                    onClick={() => confirm(r.id)}
                    className="rounded-md bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    {isBusy ? "…" : "Confirmar"}
                  </button>
                  <button
                    disabled={isBusy}
                    onClick={() => cancel(r.id)}
                    className="rounded-md border border-red-200 px-4 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-40 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    {isBusy ? "…" : "Cancelar"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {/* Venue Selection Modal */}
      <VenueSelectionModal
        isOpen={!!modalReservation}
        onClose={() => setModalReservation(null)}
        onConfirm={handleModalConfirm}
        customerName={modalReservation?.customer.name ?? ""}
        reservationDetails={modalReservation ? `${modalReservation.guests} pax · ${new Date(modalReservation.event.date).toLocaleDateString("es-ES", { day: "numeric", month: "long" })} ${modalReservation.event.shift === "NOON" ? "Mediodía" : "Noche"}` : ""}
      />
    </section>
  );
}

function Detail({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2 sm:col-span-3" : ""}>
      <dt className="text-xs text-zinc-400">{label}</dt>
      <dd className="text-sm text-zinc-700 dark:text-zinc-300">{value}</dd>
    </div>
  );
}
