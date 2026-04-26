"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  ReservationFormValues,
  reservationFormSchema,
} from "@/lib/reservation-schema-client";

type SuccessData = {
  reservationId: string;
  totalAmount: number;
  amountDue: number;
};

export function ReservationForm() {
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: { previousVisit: false, shift: "NIGHT" },
  });

  const selectedDate = watch("date");
  const selectedShift = watch("shift");

  // Determine allowed shifts based on weekday
  function getAllowedShifts(dateStr: string): ("NOON" | "NIGHT")[] {
    if (!dateStr) return ["NIGHT"];
    const d = new Date(dateStr + "T12:00:00");
    const day = d.getDay(); // 0=Sun, 6=Sat
    if (day === 6) return ["NOON", "NIGHT"]; // Saturday: both
    return ["NIGHT"]; // Wed-Fri: night only
  }

  const allowedShifts = getAllowedShifts(selectedDate);

  async function onSubmit(values: ReservationFormValues) {
    setServerError(null);
    try {
      // Build ISO datetime combining date + shift time
      const hour = values.shift === "NOON" ? "14:00:00" : "21:00:00";
      const isoDate = `${values.date}T${hour}.000Z`;

      const res = await fetch("/api/reservations/normal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, date: isoDate }),
      });

      const json = await res.json() as { ok: boolean; error?: string; reservationId?: string; totalAmount?: number; amountDue?: number };

      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Error al crear la reserva. Inténtalo de nuevo.");
        return;
      }

      setSuccess({
        reservationId: json.reservationId!,
        totalAmount: json.totalAmount!,
        amountDue: json.amountDue!,
      });
    } catch {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 space-y-3 dark:border-emerald-800 dark:bg-emerald-950/30">
        <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
          ¡Reserva recibida!
        </h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Nos pondremos en contacto contigo para confirmar.
        </p>
        <div className="rounded-lg border border-emerald-200 bg-white p-4 text-sm space-y-1 dark:border-emerald-800 dark:bg-zinc-950">
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Total</span>
            <span className="font-medium">{success.totalAmount.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Depósito (30%)</span>
            <span className="font-medium text-amber-600">{success.amountDue.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Referencia</span>
            <span className="font-mono text-xs text-zinc-500">{success.reservationId}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Date + Shift */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("date")}
            min={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Turno <span className="text-red-500">*</span>
          </label>
          <select
            {...register("shift")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          >
            {allowedShifts.includes("NOON") && <option value="NOON">Mediodía (14:00)</option>}
            <option value="NIGHT">Noche (21:00)</option>
          </select>
          {selectedDate && allowedShifts.length === 1 && (
            <p className="text-xs text-zinc-500">Solo turno noche de miércoles a viernes</p>
          )}
          {errors.shift && <p className="text-xs text-red-500">{errors.shift.message}</p>}
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Número de personas <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min={1}
          max={12}
          {...register("guests", { valueAsNumber: true })}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        {errors.guests && <p className="text-xs text-red-500">{errors.guests.message}</p>}
      </div>

      {/* Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Allergies */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Alergias o intolerancias
        </label>
        <textarea
          rows={2}
          {...register("allergies")}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {/* Comments */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Comentarios
        </label>
        <textarea
          rows={2}
          {...register("comments")}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {/* Previous visit */}
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
        <input type="checkbox" {...register("previousVisit")} className="rounded" />
        Ya he visitado Gastro Shows anteriormente
      </label>

      {serverError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Enviando..." : "Solicitar reserva"}
      </button>

      <p className="text-xs text-zinc-500 text-center">
        Se requiere un depósito del 30% para confirmar la reserva. Precio base: 130 €/persona.
      </p>
    </form>
  );
}
