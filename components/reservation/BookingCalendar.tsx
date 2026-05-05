"use client";

import { useState } from "react";
import { isPast as dateFnsIsPast } from "date-fns";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAY_NAMES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const GOLD = "#daa520";
const OFFWHITE = "#F5F0E8";
const LIGHT = "#888888";

type Props = {
  value: string | null;
  holidays: { date: string; recurring: boolean }[];
  onChange: (date: string) => void;
  allowedDays?: number[]; // [1, 2, 3, 4, 5, 6, 0]
  privateDays?: number[]; // Days that show as private dinner instead of just unavailable
};

export function BookingCalendar({
  value,
  holidays,
  onChange,
  allowedDays = [3, 4, 5, 6],
  privateDays = []
}: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const maxDateLimit = new Date(today);
  maxDateLimit.setMonth(maxDateLimit.getMonth() + 6);
  const isMaxMonth = viewYear === maxDateLimit.getFullYear() && viewMonth === maxDateLimit.getMonth();

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDayOfWeek + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function isDatePast(d: string) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(d + "T00:00:00") < today;
  }
  
  function isTooFar(d: string) {
    const limit = new Date(); limit.setMonth(limit.getMonth() + 6);
    return new Date(d + "T00:00:00") > limit;
  }

  function isValidDay(d: string) {
    return allowedDays.includes(new Date(d + "T12:00:00").getDay());
  }

  function dayStatus(day: number): "selected" | "available" | "past" | "unavailable" | "holiday" | "private" {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const monthDay = dateStr.substring(5);
    
    if (value === dateStr) return "selected";
    if (isDatePast(dateStr)) return "past";
    if (isTooFar(dateStr)) return "unavailable";
    
    const isHoliday = holidays.some(h => h.date === dateStr || (h.recurring && h.date.endsWith(monthDay)));
    if (isHoliday) return "holiday";
    
    if (allowedDays.includes(new Date(dateStr + "T12:00:00").getDay())) return "available";
    if (privateDays.includes(new Date(dateStr + "T12:00:00").getDay())) return "private";
    
    return "unavailable";
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <button onClick={prevMonth} disabled={isCurrentMonth} style={calNavBtnStyle(isCurrentMonth)}>‹</button>
        <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 300, color: OFFWHITE, textTransform: "capitalize" }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} disabled={isMaxMonth} style={calNavBtnStyle(isMaxMonth)}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {DAY_NAMES.map((d) => (
          <div key={d} style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: LIGHT, textAlign: "center", padding: "0.5rem 0" }}>{d}</div>
        ))}
        {Array.from({ length: offset }, (_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const status = dayStatus(day);
          const clickable = status === "available" || status === "selected" || status === "private";
          return (
            <button
              type="button"
              key={day}
              onClick={() => {
                if (!clickable) return;
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                onChange(dateStr);
              }}
              title={
                status === "holiday" ? "Festivo / Cerrado" :
                status === "private" ? "Cena Privada Exclusiva" :
                status === "past" ? "Fecha pasada" : undefined
              }
              disabled={!clickable}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.96rem",
                border: status === "selected" ? `1px solid ${GOLD}` : (status === "private" ? `1px dashed rgba(200,169,110,0.4)` : (status === "available" ? `1px solid rgba(255,255,255,0.1)` : "1px solid transparent")),
                background: status === "selected" ? GOLD : (status === "available" ? "rgba(255,255,255,0.03)" : "transparent"),
                color: status === "selected" ? "black" : (status === "private" ? "rgba(200,169,110,0.7)" : (status === "available" ? OFFWHITE : "rgba(245,240,232,0.15)")),
                fontWeight: status === "selected" ? 600 : 300,
                width: "100%",
                padding: 0,
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function calNavBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    background: "none",
    border: "1px solid rgba(200,169,110,0.2)",
    color: disabled ? "rgba(200,169,110,0.3)" : GOLD,
    width: "34px",
    height: "34px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
  };
}
