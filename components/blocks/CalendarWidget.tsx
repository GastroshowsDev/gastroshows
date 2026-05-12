"use client";

import { useEffect, useState } from "react";
import { usePageActions } from "@/context/PageActionsContext";

type ShiftData = {
  shift: "NOON" | "NIGHT";
  available: number;
  isFull: boolean;
};

type DayData = {
  date: string;
  dayShort: string;
  dayNum: number;
  shifts: ShiftData[];
  totalAvailable: number;
};

type ApiResponse = {
  ok: boolean;
  days: DayData[];
};

import { BookingCalendar } from "../reservation/BookingCalendar";

export function CalendarWidget() {
  const [holidays, setHolidays] = useState<{ date: string; recurring: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const { openReservation } = usePageActions();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/public/holidays");
        const json = await res.json();
        setHolidays(json || []);
      } catch (e) {
        console.error("Error fetching holidays:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="gs-loader" style={{ margin: "0 auto 1rem" }} />
        <div style={{ color: "var(--gs-gold)", fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 600 }}>CARGANDO CALENDARIO...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "rgba(10,10,10,0.4)", 
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(200,169,110,0.2)", 
      borderRadius: "8px",
      padding: "2rem",
      width: "100%",
      maxWidth: "450px",
      margin: "0 auto",
      boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
    }}>
      <h4 style={{ 
        fontSize: "0.75rem", 
        letterSpacing: "0.3em", 
        textTransform: "uppercase", 
        color: "var(--gs-gold)", 
        marginBottom: "2rem",
        textAlign: "center",
        fontWeight: 600
      }}>
        Disponibilidad en Vivo
      </h4>

      <BookingCalendar 
        value={null}
        holidays={holidays}
        onChange={(date) => openReservation(date)}
        allowedDays={[3, 4, 5, 6]}
        privateDays={[0, 1, 2]}
      />

      <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(200,169,110,0.1)", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Selecciona una fecha disponible para iniciar tu reserva. <br/>
          De Miércoles a Sábado.
        </p>
        <button 
          onClick={() => openReservation()}
          className="gs-btn-primary"
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderRadius: "99px",
            cursor: "pointer"
          }}
        >
          Ver disponibilidad general
        </button>
      </div>
    </div>
  );
}
