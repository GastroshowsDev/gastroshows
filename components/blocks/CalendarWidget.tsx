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

export function CalendarWidget() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { openReservation } = usePageActions();

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch("/api/public/availability");
        const json = await res.json();
        if (json.ok) setData(json);
      } catch (e) {
        console.error("Error fetching availability:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
        <div style={{ color: "var(--gs-gold)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>CARGANDO DISPONIBILIDAD...</div>
      </div>
    );
  }

  if (!data || data.days.length === 0) return null;

  return (
    <div style={{ 
      background: "var(--gs-bg2)", 
      border: "1px solid var(--gs-border)", 
      borderRadius: "4px",
      padding: "1.5rem",
      width: "100%",
      maxWidth: "400px",
      margin: "1rem auto"
    }}>
      <h4 style={{ 
        fontSize: "0.65rem", 
        letterSpacing: "0.2em", 
        textTransform: "uppercase", 
        color: "var(--gs-gold)", 
        marginBottom: "1.2rem",
        textAlign: "center"
      }}>
        Próximas Plazas Libres
      </h4>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {data.days.map((day) => (
          <div key={day.date} style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--gs-text)" }}>{day.dayShort} {day.dayNum}</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {day.shifts.map((shift) => (
                <button
                  key={shift.shift}
                  onClick={openReservation}
                  disabled={shift.isFull}
                  style={{
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    borderRadius: "2px",
                    border: "1px solid",
                    borderColor: shift.isFull ? "rgba(229,115,115,0.2)" : "var(--gs-gold)",
                    background: shift.isFull ? "transparent" : "rgba(218,165,32,0.1)",
                    color: shift.isFull ? "#E57373" : "var(--gs-gold)",
                    cursor: shift.isFull ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    opacity: shift.isFull ? 0.5 : 1
                  }}
                >
                  {shift.shift === "NOON" ? "☀" : "🌙"} {shift.isFull ? "Lleno" : `${shift.available}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={openReservation}
        style={{
          width: "100%",
          marginTop: "1.5rem",
          padding: "0.8rem",
          background: "var(--gs-gold)",
          color: "#000",
          border: "none",
          borderRadius: "2px",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer"
        }}
      >
        Reservar mesa
      </button>
    </div>
  );
}
