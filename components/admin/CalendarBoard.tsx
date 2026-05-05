"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CalendarEvent } from "@/app/admin/calendario/page";

type VenueFilter = string;

// Mon=0 … Sun=6  (index in our DAYS array starting Monday)
// Operating days: Wed(2), Thu(3), Fri(4), Sat(5)
const OPERATING_DOW = new Set([3, 4, 5, 6]); // JS getDay(): 0=Sun,1=Mon…6=Sat

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startMonday = getMonday(firstDay);
  const days: Date[] = [];
  const cur = new Date(startMonday);
  while (cur <= lastDay || days.length % 7 !== 0) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
    if (days.length > 42) break;
  }
  return days;
}

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const S = {
  chip: (active: boolean, color?: string) => ({
    padding: "0.3rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.76rem",
    fontWeight: 500,
    border: `1px solid ${active ? (color ?? "var(--color-admin-accent)") : "var(--color-admin-border)"}`,
    color: active ? "#fff" : "var(--color-admin-muted)",
    background: active ? (color ?? "var(--color-admin-accent)") : "var(--color-admin-surface)",
    cursor: "pointer",
    transition: "all 0.15s",
  }),
};

const VENUE_COLORS = [
  { bg: "#EDE9FE", color: "#7C3AED" },
  { bg: "#CFFAFE", color: "#0891B2" },
  { bg: "#CCE5FF", color: "#1E40AF" },
  { bg: "#DDD6FE", color: "#6366F1" },
  { bg: "#DCFCE7", color: "#22C55E" },
  { bg: "#FCE7F3", color: "#EC4899" },
  { bg: "#FEF3C7", color: "#F59E0B" },
];

function getVenueStyle(venueName: string | null, venueMap: Map<string, number>) {
  if (!venueName) return { letter: "?", bg: "var(--color-admin-bg)", color: "var(--color-admin-muted)" };
  const index = venueMap.get(venueName) ?? 0;
  const colorSet = VENUE_COLORS[index % VENUE_COLORS.length];
  const letter = venueName.substring(0, 1).toUpperCase();
  return { letter, bg: colorSet.bg, color: colorSet.color };
}

function EventChip({ ev, venueMap }: { ev: CalendarEvent; venueMap: Map<string, number> }) {
  const vs = getVenueStyle(ev.venueName, venueMap);
  
  if (ev.isVisit) {
    return (
      <div style={{
        borderRadius: 5, padding: "3px 7px",
        fontSize: "0.72rem", fontWeight: 700,
        display: "inline-flex", alignItems: "center", gap: "2px",
        background: vs.bg, color: vs.color, whiteSpace: "nowrap",
        border: `1px solid ${vs.color}40`
      }} title={`Visita: ${ev.customerName} a las ${ev.shift}`}>
        📍 {ev.shift}
      </div>
    );
  }

  const emoji = ev.shift === "NOON" ? "☀️" : "🌙";
  const isFull = ev.status === "FULL";
  const bg = isFull ? "#FEE2E2" : vs.bg;
  const color = isFull ? "#DC2626" : vs.color;
  return (
    <div style={{
      borderRadius: 5, padding: "3px 7px",
      fontSize: "0.75rem", fontWeight: 700,
      display: "inline-flex", alignItems: "center", gap: "2px",
      background: bg, color, whiteSpace: "nowrap" as const,
    }}>
      {vs.letter}{emoji}{ev.totalGuests}
    </div>
  );
}



// ── Regular cell ─────────────────────────────────────────────────────────────
function RegularCell({
  day, dayStr, isToday, isCurrentMonth, isOperating, dayEvents, onNavigate, venueMap,
}: {
  day: Date; dayStr: string; isToday: boolean;
  isCurrentMonth: boolean; isOperating: boolean;
  dayEvents: CalendarEvent[];
  onNavigate: (date: string) => void;
  venueMap: Map<string, number>;
}) {
  const operatingBorder = isOperating
    ? "2px solid rgba(135,91,247,0.35)"
    : `1px solid ${isToday ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`;

  return (
    <div
      style={{
        background: isCurrentMonth
          ? isOperating
            ? "linear-gradient(135deg, rgba(135,91,247,0.04) 0%, var(--color-admin-surface) 100%)"
            : "var(--color-admin-surface)"
          : "transparent",
        border: operatingBorder,
        borderRadius: 8,
        minHeight: 90,
        padding: "0.6rem",
        cursor: isCurrentMonth ? "pointer" : "default",
        opacity: isCurrentMonth ? 1 : 0,
        transition: "all 0.15s",
      }}
      onClick={() => { if (isCurrentMonth) onNavigate(dayStr); }}
      onMouseEnter={(e) => {
        if (isCurrentMonth) (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-admin-accent)";
      }}
      onMouseLeave={(e) => {
        if (isCurrentMonth) (e.currentTarget as HTMLDivElement).style.borderColor =
          isOperating ? "rgba(135,91,247,0.35)" : isToday ? "var(--color-admin-accent)" : "var(--color-admin-border)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{
          fontSize: "0.8rem", fontWeight: isToday ? 700 : 600,
          color: isToday ? "var(--color-admin-accent)" : "var(--color-admin-text)",
        }}>
          {day.getDate()}
        </span>
        {isOperating && (
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(135,91,247,0.5)", flexShrink: 0 }} />
        )}
      </div>
      {dayEvents.filter((ev) => ev.reservationCount > 0).map((ev) => (
        <div key={ev.id} style={{ marginBottom: 2 }}>
          <EventChip ev={ev} venueMap={venueMap} />
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function CalendarBoard({
  events,
  closedDates = [],
}: {
  events: CalendarEvent[];
  /** ISO date strings (YYYY-MM-DD) of vacation / closure days — operating-day highlight is suppressed */
  closedDates?: string[];
}) {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [venueFilter, setVenueFilter] = useState<VenueFilter>("all");
  const [venues, setVenues] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetch("/api/admin/venues")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) setVenues(res.data);
      });
  }, []);

  function handleNavigate(date: string, shift?: "NOON" | "NIGHT") {
    const params = new URLSearchParams({ date });
    if (shift) params.set("shift", shift);
    router.push(`/admin/reservas?${params.toString()}`);
  }

  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const closedSet = useMemo(() => new Set(closedDates), [closedDates]);

  const venueMap = useMemo(() => {
    const map = new Map<string, number>();
    venues.forEach((v, i) => map.set(v.name, i));
    return map;
  }, [venues]);

  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      if (venueFilter !== "all" && (e.venueName ?? "") !== venueFilter) continue;
      const key = e.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return map;
  }, [events, venueFilter]);

  const todayStr = ymd(now);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }
  function goToday() { setYear(now.getFullYear()); setMonth(now.getMonth()); }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
      {/* Nav row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
          {MONTH_NAMES[month]} {year}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button style={S.chip(venueFilter === "all")} onClick={() => setVenueFilter("all")}>Todos</button>
            {venues.map((v, i) => {
              const colorSet = VENUE_COLORS[i % VENUE_COLORS.length];
              return (
                <button
                  key={v.id}
                  style={S.chip(venueFilter === v.name, colorSet.color)}
                  onClick={() => setVenueFilter(v.name)}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button onClick={prevMonth} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", cursor: "pointer", color: "var(--color-admin-muted)", fontSize: "1rem" }}>‹</button>
            <button onClick={goToday} style={{ padding: "0 0.65rem", height: 30, borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", cursor: "pointer", fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>Hoy</button>
            <button onClick={nextMonth} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", cursor: "pointer", color: "var(--color-admin-muted)", fontSize: "1rem" }}>›</button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
        {/* Day headers */}
        {DAYS.map((d, i) => {
          // i=0 Lu … i=5 Sá  (i+1 maps to JS DOW: Mon=1…Sat=6)
          const isOpDayHeader = i >= 2 && i <= 5; // Mi, Ju, Vi, Sá
          return (
            <div key={d} style={{
              textAlign: "center", fontSize: "0.7rem", fontWeight: 600,
              color: isOpDayHeader ? "var(--color-admin-accent)" : "var(--color-admin-muted)",
              textTransform: "uppercase", letterSpacing: "0.05em",
              padding: "0.5rem 0",
            }}>
              {d}
            </div>
          );
        })}

        {/* Day cells */}
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === month;
          const dayStr = ymd(day);
          const isToday = dayStr === todayStr;
          const dow = day.getDay(); // 0=Sun,1=Mon,…,6=Sat
          const isOperating = isCurrentMonth && OPERATING_DOW.has(dow) && !closedSet.has(dayStr);
          const dayEvents = eventMap.get(dayStr) ?? [];

          return (
            <RegularCell
              key={i}
              day={day} dayStr={dayStr}
              isToday={isToday} isCurrentMonth={isCurrentMonth}
              isOperating={isOperating}
              dayEvents={dayEvents}
              onNavigate={handleNavigate}
              venueMap={venueMap}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "1rem", fontSize: "0.72rem", color: "var(--color-admin-muted)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, border: "2px solid rgba(135,91,247,0.4)", background: "rgba(135,91,247,0.04)" }} />
          Día de apertura (Mi–Sá)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--color-admin-accent-light)" }} />
          Con reservas
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#FEE2E2" }} />
          Completo
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)" }} />
          Sin reservas
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#FFFBEB", border: "1px solid #B45309" }} />
          Visitas
        </div>
      </div>
    </div>
  );
}
