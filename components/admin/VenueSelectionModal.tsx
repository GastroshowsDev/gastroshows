"use client";

import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (venueName: string) => void;
  customerName: string;
  reservationDetails: string;
};

export function VenueSelectionModal({ isOpen, onClose, onConfirm, customerName, reservationDetails }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [venues, setVenues] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSelected(null);
    setLoading(true);
    fetch("/api/admin/venues")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) setVenues(res.data);
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full animate-in fade-in slide-in-from-bottom-8 duration-300 rounded-t-2xl bg-white p-6 pb-10 dark:bg-zinc-900 sm:max-w-md sm:rounded-2xl sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 sm:hidden" />

        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Seleccionar Local</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Es obligatorio asignar un local para confirmar la reserva de <span className="font-semibold text-zinc-900 dark:text-zinc-100">{customerName}</span>.
          </p>
          <div className="mt-2 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {reservationDetails}
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="py-4 text-center text-sm text-zinc-500">Cargando locales...</div>
          ) : venues.length === 0 ? (
            <div className="py-4 text-center text-sm text-zinc-500">No hay locales disponibles</div>
          ) : (
            venues.map((venue) => (
              <VenueButton
                key={venue.id}
                name={venue.name}
                selected={selected === venue.name}
                onClick={() => setSelected(venue.name)}
              />
            ))
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className="flex h-14 items-center justify-center rounded-xl bg-zinc-900 text-base font-bold text-white transition-all active:scale-95 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900 sm:h-12 sm:flex-1"
          >
            Confirmar y Asignar
          </button>
          <button
            onClick={onClose}
            className="flex h-14 items-center justify-center rounded-xl border border-zinc-200 text-base font-semibold text-zinc-600 transition-all active:scale-95 dark:border-zinc-800 dark:text-zinc-400 sm:h-12 sm:flex-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function VenueButton({ name, selected, onClick }: {
  name: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.98] ${
        selected
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-100 bg-zinc-50 text-zinc-900 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-lg font-bold">{name}</span>
        {selected && (
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            ✓
          </span>
        )}
      </div>
    </button>
  );
}
