"use client";

import { useEffect, useState } from "react";

type Shift = "NOON" | "NIGHT";
type FieldErrors = Partial<Record<string, string>>;

type Props = {
  open: boolean;
  onClose: () => void;
  token: string;
  guests: number;
  purchaserName: string;
  expiresAt: string;
};

const GOLD = "#daa520";
const DARK2 = "#1A1A1A";
const OFFWHITE = "#F5F0E8";
const LIGHT = "#888888";

/* ── helpers ── */

function isSaturday(d: string) { return new Date(d + "T12:00:00").getDay() === 6; }
function isValidDay(d: string) { return [3, 4, 5, 6].includes(new Date(d + "T12:00:00").getDay()); }
function isPast(d: string) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return new Date(d + "T00:00:00") < today;
}
function isTooFar(d: string) {
  const limit = new Date(); limit.setMonth(limit.getMonth() + 6);
  return new Date(d + "T00:00:00") > limit;
}
function isBeforeExpiry(d: string, expiresAt: string) {
  return new Date(d + "T23:59:59") <= new Date(expiresAt);
}
function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long",
  });
}

/* ── main component ── */

export function GiftRedemptionModal({ open, onClose, token, guests, purchaserName, expiresAt }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<string | null>(null);
  const [shift, setShift] = useState<Shift>("NIGHT");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [previousVisit, setPreviousVisit] = useState<boolean | null>(null);
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleClose() {
    if (done) { window.location.reload(); return; }
    setStep(1); setDate(null); setShift("NIGHT");
    setName(""); setPhone(""); setEmail("");
    setAllergies(""); setPreviousVisit(null); setComments("");
    setErrors({}); setServerError(null);
    onClose();
  }

  /* Step 1 validation */
  function validateStep1(): boolean {
    const e: FieldErrors = {};
    if (!date) { e.date = "Selecciona una fecha"; }
    else if (!isValidDay(date)) { e.date = "Solo miércoles a sábado"; }
    else if (isPast(date)) { e.date = "Fecha pasada"; }
    else if (isTooFar(date)) { e.date = "Máximo 6 meses de antelación"; }
    else if (!isBeforeExpiry(date, expiresAt)) { e.date = "La fecha debe ser anterior a la expiración del vale"; }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* Step 3 validation */
  function validateStep3(): boolean {
    const e: FieldErrors = {};
    if (name.trim().length < 2) e.name = "Mínimo 2 caracteres";
    if (phone.trim().length < 6) e.phone = "Teléfono demasiado corto";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Email no válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validateStep3()) return;
    setServerError(null);
    setLoading(true);
    try {
      const hour = shift === "NOON" ? "12:45:00" : "19:45:00";
      const isoDate = `${date}T${hour}.000Z`;
      const res = await fetch("/api/reservations/gift/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          date: isoDate,
          shift,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          allergies: allergies.trim() || undefined,
          previousVisit: previousVisit ?? false,
          comments: comments.trim() || undefined,
        }),
      });
      const json = await res.json() as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Error al confirmar la reserva. Inténtalo de nuevo.");
        return;
      }
      setDone(true);
    } catch {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const stepTitle = done ? "Reserva confirmada" : step === 1 ? "Fecha y turno" : step === 2 ? "Personas" : "Tus datos";

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        overflowY: "auto",
        padding: "2rem 1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        style={{
          background: DARK2,
          border: "1px solid rgba(200,169,110,0.2)",
          width: "100%", maxWidth: "560px",
          borderRadius: "4px",
          margin: "auto",
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid rgba(200,169,110,0.1)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div style={smallLabel}>
              {done ? "Vale canjeado" : `Paso ${step} de 3 · ${stepTitle}`}
            </div>
            <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: OFFWHITE }}>
              {done ? "¡Nos vemos pronto!" : "Selecciona tu fecha"}
            </div>
          </div>
          <button onClick={handleClose} style={closeBtn}>✕</button>
        </div>

        {/* Step indicator (only when not done) */}
        {!done && (
          <div style={{ display: "flex", height: "2px", background: "rgba(200,169,110,0.08)" }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, background: s <= step ? GOLD : "transparent", transition: "background 0.3s" }} />
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          {done ? (
            <DoneScreen name={name} date={date!} shift={shift} guests={guests} purchaserName={purchaserName} onClose={handleClose} />
          ) : step === 1 ? (
            <Step1
              date={date} setDate={setDate}
              shift={shift} setShift={setShift}
              errors={errors}
            />
          ) : step === 2 ? (
            <Step2 guests={guests} purchaserName={purchaserName} />
          ) : (
            <Step3
              name={name} setName={setName}
              phone={phone} setPhone={setPhone}
              email={email} setEmail={setEmail}
              allergies={allergies} setAllergies={setAllergies}
              previousVisit={previousVisit} setPreviousVisit={setPreviousVisit}
              comments={comments} setComments={setComments}
              errors={errors}
              serverError={serverError}
            />
          )}
        </div>

        {/* Footer */}
        {!done && (
          <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid rgba(200,169,110,0.1)", display: "flex", justifyContent: step > 1 ? "space-between" : "flex-end" }}>
            {step > 1 && (
              <button onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)} style={secondaryBtn}>
                Atrás
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && !validateStep1()) return;
                  setErrors({});
                  setStep((s) => (s + 1) as 2 | 3);
                }}
                style={primaryBtn(false)}
              >
                Continuar
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={primaryBtn(loading)}>
                {loading ? "Confirmando…" : "Confirmar reserva"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Step 1: Date + Shift ── */
function Step1({
  date, setDate, shift, setShift, errors,
}: {
  date: string | null;
  setDate: (d: string) => void;
  shift: Shift;
  setShift: (s: Shift) => void;
  errors: FieldErrors;
}) {
  const sat = date && isSaturday(date);

  /* Build min/max for date input */
  const minDate = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; })();
  const maxDate = (() => { const d = new Date(); d.setMonth(d.getMonth() + 6); return d.toISOString().split("T")[0]; })();

  return (
    <>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
        Elige la fecha de tu experiencia. Abrimos de miércoles a sábado.
      </p>

      {/* Date picker */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ ...smallLabel, marginBottom: "0.5rem" }}>Fecha</div>
        <input
          type="date"
          value={date ?? ""}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
          style={inputSt(!!errors.date)}
        />
        {date && isValidDay(date) && (
          <p style={{ fontSize: "0.75rem", color: GOLD, marginTop: "0.4rem" }}>
            {formatDate(date)}
          </p>
        )}
        {date && !isValidDay(date) && (
          <p style={{ fontSize: "0.75rem", color: "#E57373", marginTop: "0.4rem" }}>
            Este día no hay servicio (solo mié–sáb)
          </p>
        )}
        {errors.date && <p style={errStyle}>{errors.date}</p>}
      </div>

      {/* Shift */}
      <div>
        <div style={{ ...smallLabel, marginBottom: "0.75rem" }}>Turno</div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {(sat ? (["NOON", "NIGHT"] as Shift[]) : (["NIGHT"] as Shift[])).map((s) => {
            const active = shift === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setShift(s)}
                style={{
                  flex: 1,
                  padding: "1rem",
                  border: `1px solid ${active ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.15)"}`,
                  background: active ? "rgba(200,169,110,0.08)" : "transparent",
                  borderRadius: "2px",
                  cursor: "pointer",
                  textAlign: "center" as const,
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: active ? OFFWHITE : LIGHT, marginBottom: "0.2rem" }}>
                  {s === "NOON" ? "☀ Mediodía" : "🌙 Noche"}
                </div>
                <div style={{ fontSize: "0.65rem", color: active ? "rgba(245,240,232,0.6)" : "rgba(136,136,136,0.5)" }}>
                  {s === "NOON" ? "12:45 – 16:00" : "19:45 – 23:00"}
                </div>
              </button>
            );
          })}
          {!sat && (
            <div style={{ flex: 1, padding: "1rem", border: "1px solid rgba(200,169,110,0.08)", borderRadius: "2px", textAlign: "center" as const }}>
              <div style={{ fontSize: "0.72rem", color: "rgba(136,136,136,0.4)" }}>Mediodía solo sábados</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Step 2: Guests (display only) ── */
function Step2({ guests, purchaserName }: { guests: number; purchaserName: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: "2rem" }}>
        {purchaserName} ha preparado esta experiencia para:
      </p>
      <div
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "6rem",
          fontWeight: 300,
          color: OFFWHITE,
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {guests}
      </div>
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: LIGHT, marginBottom: "2rem" }}>
        {guests === 1 ? "persona" : "personas"}
      </div>
      <div style={{ background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: "2px", padding: "1rem 1.25rem", fontSize: "0.82rem", color: LIGHT, lineHeight: 1.7 }}>
        El número de comensales está fijado por el vale. <br />Si necesitas ajustarlo, contacta con el restaurante.
      </div>
    </div>
  );
}

/* ── Step 3: Personal data ── */
function Step3({
  name, setName, phone, setPhone, email, setEmail,
  allergies, setAllergies, previousVisit, setPreviousVisit,
  comments, setComments, errors, serverError,
}: {
  name: string; setName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  allergies: string; setAllergies: (v: string) => void;
  previousVisit: boolean | null; setPreviousVisit: (v: boolean) => void;
  comments: string; setComments: (v: string) => void;
  errors: FieldErrors;
  serverError: string | null;
}) {
  return (
    <>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
        Tus datos para la reserva. Sin pago adicional — el vale cubre el importe completo.
      </p>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>Nombre completo *</div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellidos" style={inputSt(!!errors.name)} />
          {errors.name && <p style={errStyle}>{errors.name}</p>}
        </div>

        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>Teléfono *</div>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" style={inputSt(!!errors.phone)} />
          {errors.phone && <p style={errStyle}>{errors.phone}</p>}
        </div>

        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>Email *</div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" style={inputSt(!!errors.email)} />
          {errors.email && <p style={errStyle}>{errors.email}</p>}
        </div>

        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>¿Has visitado alguno de nuestros locales?</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {([true, false] as const).map((val) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setPreviousVisit(val)}
                style={{
                  flex: 1, padding: "0.6rem",
                  border: `1px solid ${previousVisit === val ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.15)"}`,
                  background: previousVisit === val ? "rgba(200,169,110,0.08)" : "transparent",
                  color: previousVisit === val ? OFFWHITE : LIGHT,
                  fontSize: "0.75rem", borderRadius: "2px", cursor: "pointer",
                }}
              >
                {val ? "Sí" : "No"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>Alergias e intolerancias</div>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Indícanos cualquier alergia o intolerancia alimentaria"
            rows={2}
            style={{ ...inputSt(false), resize: "vertical" as const, minHeight: "70px" }}
          />
        </div>

        <div>
          <div style={{ ...smallLabel, marginBottom: "0.4rem" }}>Comentarios</div>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Cumpleaños, ocasión especial, necesidades especiales…"
            rows={2}
            style={{ ...inputSt(false), resize: "vertical" as const, minHeight: "70px" }}
          />
        </div>
      </div>

      {serverError && (
        <div style={{ padding: "0.8rem 1rem", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: "2px", fontSize: "0.8rem", color: "#E74C3C", marginTop: "1rem" }}>
          {serverError}
        </div>
      )}
    </>
  );
}

/* ── Done screen ── */
function DoneScreen({
  name, date, shift, guests, purchaserName, onClose,
}: {
  name: string; date: string; shift: Shift; guests: number; purchaserName: string; onClose: () => void;
}) {
  const formattedDate = formatDate(date);
  const shiftLabel = shift === "NOON" ? "Mediodía (12:45)" : "Noche (19:45)";

  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <div style={{ width: "64px", height: "64px", border: `1px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.4rem", color: GOLD }}>
        ✓
      </div>
      <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: OFFWHITE, marginBottom: "0.5rem" }}>
        Reserva confirmada
      </div>
      <p style={{ fontSize: "0.82rem", color: LIGHT, lineHeight: 1.8, marginBottom: "1.75rem" }}>
        Recibirás un email de confirmación en breve, {name}.
      </p>

      <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "2px", padding: "1rem", textAlign: "left", marginBottom: "2rem" }}>
        {[
          ["Fecha", formattedDate],
          ["Turno", shiftLabel],
          ["Personas", `${guests} ${guests === 1 ? "persona" : "personas"}`],
          ["Regalo de", purchaserName],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(200,169,110,0.08)", fontSize: "0.82rem" }}>
            <span style={{ color: LIGHT }}>{k}</span>
            <span style={{ color: OFFWHITE }}>{v}</span>
          </div>
        ))}
      </div>

      <button onClick={onClose} style={{ background: GOLD, color: "#0A0A0A", border: "none", padding: "0.9rem 2rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, cursor: "pointer", borderRadius: "2px" }}>
        Cerrar
      </button>
    </div>
  );
}

/* ── shared styles ── */

const smallLabel: React.CSSProperties = {
  fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD,
};

const closeBtn: React.CSSProperties = {
  background: "none", border: "1px solid rgba(200,169,110,0.2)", color: LIGHT,
  width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem",
  display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0, borderRadius: "2px",
};

function primaryBtn(disabled: boolean): React.CSSProperties {
  return {
    background: GOLD, color: "#0A0A0A", border: "none",
    padding: "0.9rem 2rem",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "2px", opacity: disabled ? 0.5 : 1, transition: "all 0.2s",
  };
}

const secondaryBtn: React.CSSProperties = {
  background: "none", border: "1px solid rgba(200,169,110,0.2)", color: LIGHT,
  padding: "0.9rem 1.5rem",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em",
  textTransform: "uppercase", cursor: "pointer", borderRadius: "2px",
};

function inputSt(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hasError ? "#C0392B" : "rgba(200,169,110,0.2)"}`,
    color: OFFWHITE,
    padding: "0.8rem 1rem",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.85rem", fontWeight: 300,
    borderRadius: "2px", outline: "none", boxSizing: "border-box" as const,
  };
}

const errStyle: React.CSSProperties = {
  fontSize: "0.7rem", color: "#C0392B", margin: "0.3rem 0 0",
};
