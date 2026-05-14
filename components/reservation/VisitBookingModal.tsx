"use client";

import { useState, Fragment, useEffect } from "react";

const GOLD = "var(--gs-gold)";
const DARK2 = "var(--gs-bg)";
const OFFWHITE = "var(--gs-text)";
const LIGHT = "var(--gs-muted)";


type Props = { open: boolean; onClose: () => void };

type FormState = {
  date: string | null;
  time: string;
  name: string;
  email: string;
  phone: string;
};

const INITIAL: FormState = {
  date: null,
  time: "",
  name: "",
  email: "",
  phone: "",
};

export function VisitBookingModal({ open, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!form.date) { setBookedTimes([]); return; }
    setLoadingSlots(true);
    fetch(`/api/public/visits?date=${form.date}`)
      .then((r) => r.json())
      .then((j) => { if (j.ok) setBookedTimes(j.bookedTimes); })
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
  }, [form.date]);

  if (!open) return null;

  function handleClose() {
    setStep(1);
    setForm(INITIAL);
    setSuccess(false);
    setErrors({});
    setBookedTimes([]);
    onClose();
  }

  async function handleSubmit() {
    // Basic validation
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Nombre requerido";
    if (!form.email) e.email = "Email requerido";
    if (!form.phone) e.phone = "Teléfono requerido";
    if (!form.time) e.time = "Hora requerida";
    
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
      else alert("Error al solicitar la visita");
    } catch (err) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={handleClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }} />
      
      <div 
        className="clandestino-forced"
        style={{ 
          position: "relative", width: "100%", maxWidth: "560px", background: "var(--gs-bg2)", border: "1px solid var(--gs-border)", 
          borderRadius: "4px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          transition: "background 0.8s ease, border 0.8s ease",
          color: "var(--gs-text)"
        }}
      >

        <button onClick={handleClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: GOLD, fontSize: "1.8rem", cursor: "pointer", zIndex: 10 }}>×</button>

        {success ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem", color: GOLD }}>✓</div>
            <h2 style={{ color: GOLD, fontSize: "1.8rem", fontFamily: "var(--font-cormorant)", marginBottom: "1rem" }}>¡Visita Solicitada!</h2>
            <p style={{ color: OFFWHITE, opacity: 0.8, maxWidth: "300px", margin: "0 auto", lineHeight: 1.6 }}>Nos pondremos en contacto contigo pronto para confirmar los detalles de tu visita.</p>
            <button onClick={handleClose} style={{ marginTop: "2.5rem", padding: "1rem 3rem", background: GOLD, color: "#0A0A0A", border: "none", borderRadius: "2px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Cerrar</button>
          </div>
        ) : (
          <div style={{ padding: "3rem 2.5rem" }}>
            <div style={{ marginBottom: "2.5rem" }}>
               <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>Experiencia</p>
               <h2 style={{ color: "var(--gs-text)", fontSize: "2.2rem", fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1.1 }}>Reserva una Visita <br/><em style={{ color: GOLD }}>Exclusiva</em></h2>
            </div>

            <StepIndicator current={step} />

            {step === 1 ? (
               <div style={{ animation: "fadeIn 0.4s ease" }}>
                  <VisitCalendar value={form.date} onChange={(d) => setForm({ ...form, date: d })} />
                  
                  {form.date && (
                    <div style={{ marginTop: "2rem", animation: "fadeUp 0.3s ease" }}>
                      <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>Selecciona el Horario</p>
                      {loadingSlots ? (
                        <p style={{ fontSize: "0.8rem", color: LIGHT, textAlign: "center" }}>Comprobando disponibilidad…</p>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.5rem" }}>
                          {getAvailableTimes(form.date).map(t => {
                            const booked   = bookedTimes.includes(t);
                            const selected = form.time === t;
                            return (
                              <div
                                key={t}
                                onClick={() => !booked && setForm({ ...form, time: t })}
                                title={booked ? "Hora no disponible" : undefined}
                                style={{
                                  padding: "0.75rem 0.5rem",
                                  textAlign: "center",
                                  background: selected ? GOLD : booked ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.03)",
                                  color: selected ? "var(--gs-bg)" : booked ? "rgba(255,255,255,0.18)" : OFFWHITE,
                                  border: `1px solid ${selected ? GOLD : booked ? "rgba(255,255,255,0.05)" : "rgba(200,169,110,0.1)"}`,
                                  borderRadius: "2px",
                                  fontSize: "0.85rem",
                                  cursor: booked ? "not-allowed" : "pointer",
                                  textDecoration: booked ? "line-through" : "none",
                                  transition: "all 0.2s",
                                  opacity: booked ? 0.35 : 1,
                                }}
                              >
                                {t}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ marginTop: "2.5rem", textAlign: "right" }}>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!form.date || !form.time}
                      style={{ 
                        padding: "1rem 3rem", background: GOLD, color: "#0A0A0A", border: "none", borderRadius: "2px", 
                        fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                        opacity: (!form.date || !form.time) ? 0.3 : 1, transition: "all 0.3s"
                      }}
                    >
                      Siguiente
                    </button>
                  </div>
               </div>
            ) : (
               <div style={{ animation: "fadeIn 0.4s ease", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Tus Datos</label>
                    <div style={{ display: "grid", gap: "1rem" }}>
                      <input type="text" placeholder="Nombre completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
                      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
                      <input type="tel" placeholder="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} />
                    </div>
                  </div>

                  <a 
                    href="https://wa.me/34620269585"
                    target="_blank"
                    rel="noreferrer"
                    style={{ 
                      padding: "1.25rem", 
                      background: "rgba(200,169,110,0.05)", 
                      border: "1px solid rgba(200,169,110,0.1)", 
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "block",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(200,169,110,0.1)";
                      e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(200,169,110,0.05)";
                      e.currentTarget.style.borderColor = "rgba(200,169,110,0.1)";
                    }}
                  >
                    <p style={{ fontSize: "0.85rem", color: OFFWHITE, opacity: 0.8, textAlign: "center", lineHeight: 1.5, margin: 0 }}>
                      ¿Necesitas otro día u hora? <br/>
                      <span style={{ color: GOLD, fontWeight: 600 }}>Contáctanos directamente por WhatsApp</span>
                    </p>
                  </a>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", background: "transparent", border: `1px solid ${GOLD}`, color: GOLD, borderRadius: "2px", fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem" }}>Atrás</button>
                    <button 
                      onClick={handleSubmit}
                      disabled={loading || !form.name || !form.email}
                      style={{ 
                        flex: 2, padding: "1rem", background: GOLD, color: "#0A0A0A", border: "none", borderRadius: "2px", 
                        fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", 
                        opacity: (loading || !form.name) ? 0.5 : 1, transition: "all 0.3s" 
                      }}
                    >
                      {loading ? "Procesando..." : "Confirmar Visita"}
                    </button>
                  </div>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem" }}>
      {[1, 2].map((n) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "24px", height: "24px", borderRadius: "50%", border: `1px solid ${current >= n ? GOLD : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem",
            color: current >= n ? GOLD : "rgba(255,255,255,0.3)", background: current === n ? "rgba(200,169,110,0.1)" : "transparent"
          }}>
            {n}
          </div>
          <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: current === n ? GOLD : "rgba(255,255,255,0.2)" }}>
            {n === 1 ? "Fecha y Hora" : "Contacto"}
          </span>
        </div>
      ))}
    </div>
  );
}

function VisitCalendar({ value, onChange }: { value: string | null, onChange: (date: string) => void }) {
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <button onClick={() => setViewMonth(m => m - 1)} style={navBtnStyle}>‹</button>
        <span style={{ color: OFFWHITE, fontSize: "0.9rem", fontWeight: 600, textTransform: "capitalize" }}>
          {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date(viewYear, viewMonth))}
        </span>
        <button onClick={() => setViewMonth(m => m + 1)} style={navBtnStyle}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
        {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map(d => <div key={d} style={{ fontSize: "0.65rem", color: GOLD, opacity: 0.4, padding: "0.5rem 0", textTransform: "uppercase" }}>{d}</div>)}
        {Array.from({ length: offset }).map((_, i) => <div key={i} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const date = new Date(viewYear, viewMonth, day);
          const dow = date.getDay(); // 0: Sun, 1: Mon, ..., 3: Wed, 4: Thu, 5: Fri, 6: Sat
          const isPast = date < new Date(new Date().setHours(0,0,0,0));
          const isAvailable = !isPast && ((dow >= 3 && dow <= 5) || dow === 6);

          return (
            <div 
              key={day}
              onClick={() => isAvailable && onChange(dateStr)}
              style={{
                padding: "0.8rem 0",
                background: value === dateStr ? GOLD : isAvailable ? "rgba(255,255,255,0.03)" : "transparent",
                color: value === dateStr ? "var(--gs-bg)" : isAvailable ? OFFWHITE : "rgba(255,255,255,0.1)",
                cursor: isAvailable ? "pointer" : "default",
                fontSize: "0.9rem",
                borderRadius: "2px",
                border: isAvailable ? `1px solid ${value === dateStr ? GOLD : "rgba(200,169,110,0.1)"}` : "none",
                transition: "all 0.2s"
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: LIGHT, textAlign: "center", lineHeight: 1.5 }}>
        Horarios de visita: <br/>
        <span style={{ color: GOLD }}>Miércoles a Viernes (17:00h - 18:30h)</span> y <span style={{ color: GOLD }}>Sábados (10:00h - 11:30h)</span>.
      </p>
    </div>
  );
}

function getAvailableTimes(dateStr: string) {
  if (!dateStr) return [];
  const date = new Date(dateStr + "T12:00:00");
  const dow = date.getDay();
  if (dow >= 3 && dow <= 5) return ["17:00", "17:30", "18:00", "18:30"];
  if (dow === 6) return ["10:00", "10:30", "11:00", "11:30"];
  return [];
}

const navBtnStyle = { background: "rgba(255,255,255,0.05)", border: `1px solid rgba(200,169,110,0.3)`, color: GOLD, width: "32px", height: "32px", borderRadius: "2px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" };
const labelStyle = { display: "block", fontSize: "0.7rem", color: GOLD, textTransform: "uppercase" as const, letterSpacing: "0.15em", marginBottom: "0.75rem" };
const inputStyle = { width: "100%", padding: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,110,0.15)", color: OFFWHITE, borderRadius: "2px", outline: "none", fontSize: "0.9rem", transition: "border 0.3s" };
