"use client";

import { useEffect, useState } from "react";

type VenueKey = "BERTRAND" | "URGELL";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (venue: VenueKey) => void;
  customerName: string;
  reservationDetails: string;
};

export function VenueSelectionModal({ isOpen, onClose, onConfirm, customerName, reservationDetails }: Props) {
  const [selected, setSelected] = useState<VenueKey | null>(null);

  // Reset selection when opening
  useEffect(() => {
    if (isOpen) setSelected(null);
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
        {/* Drag handle for mobile feel */}
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
          <VenueButton
            id="URGELL"
            name="Eixample (Urgell)"
            address="Carrer del Comte d'Urgell, 240"
            selected={selected === "URGELL"}
            onClick={() => setSelected("URGELL")}
          />
          <VenueButton
            id="BERTRAND"
            name="Bertrand (Sarrià)"
            address="Carrer de Bertrand i Serra, 8"
            selected={selected === "BERTRAND"}
            onClick={() => setSelected("BERTRAND")}
          />
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

function VenueButton({ id, name, address, selected, onClick }: {
  id: VenueKey;
  name: string;
  address: string;
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
      <span className={`mt-1 text-sm ${selected ? "text-zinc-400" : "text-zinc-500"}`}>
        {address}
      </span>
    </button>
  );
}
