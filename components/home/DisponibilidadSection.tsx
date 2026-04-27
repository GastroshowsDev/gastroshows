"use client";

import { useEffect, useRef, useState } from "react";

type ShiftData = {
  shift: "NOON" | "NIGHT";
  label: string;
  totalGuests: number;
  capacity: number;
  available: number;
  isFull: boolean;
};

type DayData = {
  date: string;
  dayShort: string;
  dayNum: number;
  month: string;
  shifts: ShiftData[];
  totalAvailable: number;
  totalCapacity: number;
};

type ApiResponse = {
  ok: boolean;
  week: string;
  weekLabel: string;
  days: DayData[];
  totalAvailable: number;
  totalCapacity: number;
};

function addWeeks(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n * 7);
  return d.toISOString().split("T")[0];
}

function isThisWeek(weekStr: string): boolean {
  const now = new Date();
  const monday = new Date(weekStr + "T00:00:00Z");
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return now >= monday && now <= sunday;
}

export function DisponibilidadSection({ 
  onReservar,
  title,
  subtitle 
}: { 
  onReservar: () => void,
  title?: string,
  subtitle?: string
}) {
  const [week, setWeek]       = useState<string | null>(null);
  const [data, setData]       = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  async function fetchWeek(weekParam?: string) {
    setLoading(true);
    try {
      const url = weekParam
        ? `/api/public/availability?week=${weekParam}`
        : "/api/public/availability";
      const res  = await fetch(url);
      const json = (await res.json()) as ApiResponse;
      if (json.ok) {
        setData(json);
        setWeek(json.week);
      }
    } catch {
      // silently fail — section just won't render data
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void fetchWeek(); }, []);

  const urgency = data && data.totalAvailable <= 6 && data.totalAvailable > 0;
  const soldOut = data && data.totalAvailable === 0;

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "5rem 2rem 6rem",
        background: "var(--gs-bg)",
        borderTop: "1px solid var(--gs-border)",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
              {subtitle || "Disponibilidad"}
            </p>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.1,
              transition: "color 0.3s",
            }}>
              {loading ? (
                <span style={{ opacity: 0.4 }}>Cargando…</span>
              ) : title ? (
                title.replace("{total}", data?.totalAvailable?.toString() || "0")
              ) : soldOut ? (
                <>Semana <em style={{ color: "#E57373" }}>completa</em></>
              ) : (
                <>
                  Quedan{" "}
                  <em style={{ color: urgency ? "#E57373" : "var(--gs-gold)" }}>
                    {data?.totalAvailable}
                  </em>{" "}
                  plazas esta semana
                </>
              )}
            </h2>
          </div>

          {/* Week navigator */}
          {week && (
            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
              <NavBtn
                onClick={() => fetchWeek(addWeeks(week, -1))}
                disabled={loading}
                label="←"
              />
              <span style={{
                padding: "0.55rem 1.1rem",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "var(--gs-text)",
                background: "var(--gs-bg2)",
                border: "1px solid var(--gs-border)",
                borderLeft: "none",
                borderRight: "none",
                whiteSpace: "nowrap",
                transition: "all 0.3s",
              }}>
                {isThisWeek(week) ? "Esta semana" : data?.weekLabel ?? ""}
              </span>
              <NavBtn
                onClick={() => fetchWeek(addWeeks(week, 1))}
                disabled={loading}
                label="→"
              />
            </div>
          )}
        </div>

        {/* Day grid */}
        {!loading && data && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}>
            {data.days.map((day) => (
              <DayCard key={day.date} day={day} />
            ))}
          </div>
        )}

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                height: "140px",
                background: "var(--gs-bg2)",
                borderRadius: "2px",
                opacity: 0.5,
                animation: `fadeUp 0.5s ${i * 0.1}s both`,
              }} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onReservar}
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              border: "none",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.background = "var(--gs-gold-hover)";
              b.style.transform = "translateY(-2px)";
              b.style.boxShadow = "0 10px 30px rgba(200,169,110,0.3)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.background = "var(--gs-gold)";
              b.style.transform = "translateY(0)";
              b.style.boxShadow = "none";
            }}
          >
            Reservar ahora
          </button>
          {urgency && !soldOut && (
            <p style={{ fontSize: "0.72rem", color: "#E57373", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
              Quedan pocas plazas esta semana
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function DayCard({ day }: { day: DayData }) {
  const pct = day.totalCapacity > 0 ? 1 - day.totalAvailable / day.totalCapacity : 1;
  const isFull = day.totalAvailable === 0;
  const isLow  = day.totalAvailable > 0 && day.totalAvailable <= 4;

  return (
    <div style={{
      background: "var(--gs-bg2)",
      border: `1px solid ${isFull ? "rgba(229,115,115,0.2)" : isLow ? "rgba(255,183,77,0.2)" : "var(--gs-border)"}`,
      borderRadius: "2px",
      padding: "1.25rem",
      transition: "all 0.3s",
    }}>
      {/* Day header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gs-muted)", marginBottom: "0.2rem" }}>
            {day.dayShort}
          </div>
          <div style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "2rem",
            fontWeight: 300,
            color: "var(--gs-text)",
            lineHeight: 1,
            transition: "color 0.3s",
          }}>
            {day.dayNum}
          </div>
          <div style={{ fontSize: "0.62rem", color: "var(--gs-muted)", marginTop: "0.1rem" }}>{day.month}</div>
        </div>
        {isFull ? (
          <span style={{
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#E57373",
            background: "rgba(229,115,115,0.1)", padding: "3px 8px", borderRadius: "2px",
          }}>
            Completo
          </span>
        ) : isLow ? (
          <span style={{
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#FFB74D",
            background: "rgba(255,183,77,0.1)", padding: "3px 8px", borderRadius: "2px",
          }}>
            Últimas
          </span>
        ) : null}
      </div>

      {/* Shift bars */}
      {day.shifts.map((shift) => (
        <div key={shift.shift} style={{ marginBottom: "0.6rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.62rem", color: "var(--gs-muted)" }}>
              {shift.shift === "NOON" ? "☀ Med." : "🌙 Noche"}
            </span>
            <span style={{ fontSize: "0.62rem", color: shift.isFull ? "#E57373" : "var(--gs-muted)" }}>
              {shift.isFull ? "Lleno" : `${shift.available} lib.`}
            </span>
          </div>
          {/* Bar */}
          <div style={{
            height: "3px",
            background: "rgba(200,169,110,0.12)",
            borderRadius: "3px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${(shift.totalGuests / shift.capacity) * 100}%`,
              background: shift.isFull ? "#E57373" : shift.available <= 3 ? "#FFB74D" : "var(--gs-gold)",
              borderRadius: "3px",
              transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>
        </div>
      ))}

      {/* Total */}
      {!isFull && (
        <p style={{ fontSize: "0.7rem", color: "var(--gs-text-muted)", marginTop: "0.75rem", transition: "color 0.3s" }}>
          <strong style={{ color: "var(--gs-gold)" }}>{day.totalAvailable}</strong>
          {" "}de {day.totalCapacity} disponibles
        </p>
      )}
    </div>
  );
}

function NavBtn({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gs-bg2)",
        border: "1px solid var(--gs-border)",
        color: disabled ? "var(--gs-border)" : "var(--gs-gold)",
        fontSize: "1rem",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        borderRadius: "2px",
      }}
    >
      {label}
    </button>
  );
}
