"use client";

import { Fragment, useEffect, useState } from "react";
import { AllergyPicker } from "./AllergyPicker";
import { PaymentButton } from "./PaymentButton";
import { BookingCalendar } from "./BookingCalendar";

/* ─────────────────────────────────── types ── */

type Shift = "NOON" | "NIGHT" | "PRIVATE";

type PreviousBarrio = "EIXAMPLE" | "SARRIA";

type FormState = {
  date: string | null;
  shift: Shift;
  guests: number;
  name: string;
  phone: string;
  email: string;
  allergies: string;
  previousVisit: boolean | null;
  previousBarrio: PreviousBarrio | null;
  comments: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  groupRef: string;
};

type FieldErrors = Partial<Record<string, string>>;

type SuccessData = {
  id: string;
  total: number;
  deposit: number;
};

const GOLD = "var(--gs-gold)";
const DARK2 = "var(--gs-bg)";
const OFFWHITE = "var(--gs-text)";
const LIGHT = "var(--gs-muted)";


const DISCOUNT_DAYS = [3, 4]; // Wed, Thu
const INITIAL_BASE_PRICE = 130;

/* ─────────────────────────────────── helpers ── */

function isSaturday(dateStr: string): boolean {

  return new Date(dateStr + "T12:00:00").getDay() === 6;
}

function isValidDay(dateStr: string): boolean {
  return [3, 4, 5, 6].includes(new Date(dateStr + "T12:00:00").getDay());
}

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

function isTooFar(dateStr: string): boolean {
  const limit = new Date();
  limit.setMonth(limit.getMonth() + 6);
  return new Date(dateStr + "T00:00:00") > limit;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/* ─────────────────────────────────── main component ── */

const INITIAL: FormState = {
  date: null,
  shift: "NIGHT",
  guests: 2,
  name: "",
  phone: "",
  email: "",
  allergies: "",
  previousVisit: null,
  previousBarrio: null,
  comments: "",
  privacyConsent: false,
  marketingConsent: false,
  groupRef: "",
};

type Props = { open: boolean; onClose: () => void };

export function ReservationModal({ open, onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  const [basePrice, setBasePrice] = useState(INITIAL_BASE_PRICE);
  const [wedThuActive, setWedThuActive] = useState(false);
  const [campaignDiscount, setCampaignDiscount] = useState(0);
  const [campaignName, setCampaignName] = useState("");


  // Sync pricing config
  useEffect(() => {
    const storedPrice = localStorage.getItem("baseMenuPrice");
    if (storedPrice) setBasePrice(parseInt(storedPrice, 10));

    fetch("/api/public/config")
      .then(res => res.json())
      .then(data => {
        if (data.wedThuActive !== undefined) setWedThuActive(data.wedThuActive);
        if (data.campaignDiscount !== undefined) setCampaignDiscount(data.campaignDiscount);
        if (data.campaignName) setCampaignName(data.campaignName);
      })
      .catch(() => {});
  }, [open]); // Re-fetch when opened to be fresh

  const getPrice = (dateStr: string | null): number => {
    if (!dateStr) return basePrice;
    const day = new Date(dateStr + "T12:00:00").getDay();
    const wedThuDiscount = (wedThuActive && DISCOUNT_DAYS.includes(day)) ? 20 : 0;
    const totalDiscount = wedThuDiscount + campaignDiscount;
    return Math.round(basePrice * (1 - totalDiscount / 100));
  };


  const [holidays, setHolidays] = useState<{ date: string; recurring: boolean }[]>([]);

  // Fetch holidays
  useEffect(() => {
    if (open) {
      fetch("/api/public/holidays")
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch holidays");
          const text = await res.text();
          if (!text) return [];
          return JSON.parse(text);
        })
        .then(data => setHolidays(data || []))
        .catch(console.error);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleClose() {
    setStep(1);
    setForm(INITIAL);
    setErrors({});
    setServerError(null);
    setSuccess(null);
    onClose();
  }

  function validateStep1(): boolean {
    const e: FieldErrors = {};
    if (!form.date) e.date = "Selecciona una fecha";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: FieldErrors = {};
    if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres";
    if (form.phone.trim().length < 6) e.phone = "Teléfono demasiado corto";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Email no válido";
    if (!form.privacyConsent) e.privacyConsent = "Debes aceptar la política de privacidad para continuar";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validateStep3()) return;
    setServerError(null);
    setLoading(true);
    try {
      const hour = form.shift === "NOON" ? "14:00:00" : "21:00:00";
      const isoDate = `${form.date}T${hour}.000Z`;
      const isPrivate = form.shift === "PRIVATE";
      const endpoint = isPrivate ? "/api/reservations/private" : "/api/reservations/normal";
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: isoDate,
          shift: form.shift,
          guests: form.guests,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          allergies: form.allergies.trim() || undefined,
          previousVisit: form.previousVisit ?? false,
          newsletter: form.marketingConsent,
          groupRef: form.groupRef.trim() || undefined,
          comments:
            (form.previousVisit && form.previousBarrio
              ? `Visita previa: ${form.previousBarrio === "EIXAMPLE" ? "Barrio del Eixample" : "Barrio de Sarrià-Sant Gervasi"}. `
              : "") + form.comments.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        reservationId?: string;
        totalAmount?: number;
        amountDue?: number;
      };
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Error al crear la reserva. Inténtalo de nuevo.");
        return;
      }
      
      if (isPrivate) {
        setSuccess({ id: "PRIVATE", total: 0, deposit: 0 });
      } else {
        setSuccess({ id: json.reservationId!, total: json.totalAmount!, deposit: json.amountDue! });
      }
    } catch {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "2rem 1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="clandestino-forced"
        style={{
          background: DARK2,
          border: "1px solid rgba(200,169,110,0.2)",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "4px",
          margin: "auto",
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
          color: OFFWHITE, // Ensure text color is set
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "2rem 2rem 1.5rem",
            borderBottom: "1px solid rgba(200,169,110,0.1)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div style={smallLabelStyle}>Reserva</div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: OFFWHITE,
              }}
            >
              Reservar mesa
            </div>
          </div>
          <button onClick={handleClose} style={closeBtnStyle}>
            ✕
          </button>
        </div>

        {success ? (
          <SuccessScreen success={success} date={form.date!} shift={form.shift} onClose={handleClose} />
        ) : (
          <>
            {/* Body */}
            <div style={{ padding: "2rem" }}>
              <Stepper step={step} />
              {step === 1 && (
                <Step1
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  setErrors={setErrors}
                  holidays={holidays}
                />
              )}
              {step === 2 && (
            <Step2 
              form={form} 
              setForm={setForm} 
              getPrice={getPrice} 
              basePrice={basePrice} 
              wedThuActive={wedThuActive} 
            />
          )}

              {step === 3 && (
                <Step3
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  serverError={serverError}
                  getPrice={getPrice}
                />
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderTop: "1px solid rgba(200,169,110,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {step > 1 ? (
                <button onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)} style={backBtnStyle}>
                  ← Atrás
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => {
                    if (step === 1 && !validateStep1()) return;
                    setErrors({});
                    setStep((s) => (s + 1) as 1 | 2 | 3);
                  }}
                  style={nextBtnStyle}
                >
                  {step === 1 ? "Siguiente — Personas" : "Siguiente — Tus datos"}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ ...nextBtnStyle, opacity: loading ? 0.5 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? "Enviando…" : (form.shift === "PRIVATE" ? "Solicitar información" : "Confirmar reserva")}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────── Stepper ── */

function Stepper({ step }: { step: number }) {
  const steps = [
    { num: 1, label: "Fecha y turno" },
    { num: 2, label: "Personas" },
    { num: 3, label: "Tus datos" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
      {steps.map((s, i) => (
        <Fragment key={s.num}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: step >= s.num ? `1px solid ${GOLD}` : "1px solid rgba(200,169,110,0.3)",
                background: step === s.num ? GOLD : "transparent",
                color: step === s.num ? "var(--gs-bg)" : step > s.num ? GOLD : LIGHT,
                fontSize: "0.72rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                flexShrink: 0,
                transition: "all 0.3s",
              }}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            {step === s.num && (
              <span
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginLeft: "0.5rem",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "1px",
                background: step > s.num ? GOLD : "rgba(200,169,110,0.15)",
                margin: "0 0.5rem",
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────── Step 1: Date + Shift ── */

function Step1({
  form,
  setForm,
  errors,
  setErrors,
  holidays,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  errors: FieldErrors;
  setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
  holidays: { date: string; recurring: boolean }[];
}) {
  function handleDateSelect(date: string) {
    if (!isValidDay(date)) {
      setForm((f) => ({ ...f, date, shift: "PRIVATE" }));
    } else {
      const sat = isSaturday(date);
      setForm((f) => ({ ...f, date, shift: f.shift === "PRIVATE" ? "NIGHT" : (sat ? f.shift : "NIGHT") }));
    }
    setErrors((e) => ({ ...e, date: undefined }));
  }

  const showNoon = form.date ? isSaturday(form.date) : false;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <BookingCalendar 
        value={form.date} 
        holidays={holidays} 
        onChange={handleDateSelect} 
        allowedDays={[3, 4, 5, 6]}
        privateDays={[0, 1, 2]}
      />
      {errors.date && (
        <p style={{ fontSize: "0.84rem", color: "#C0392B", marginTop: "0.5rem" }}>{errors.date}</p>
      )}

      {form.date && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: showNoon ? "1fr 1fr" : "1fr",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {form.shift === "PRIVATE" ? (
            <div style={{ gridColumn: "1 / -1", marginTop: "1rem", background: "rgba(200,169,110,0.05)", padding: "1.5rem", borderRadius: "4px", border: "1px solid rgba(200,169,110,0.2)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem", textAlign: "center" }}>🍽️</div>
              <h3 style={{ fontSize: "1.1rem", color: GOLD, textAlign: "center", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>Reserva el Restaurante en Exclusiva</h3>
              <p style={{ color: "rgba(245,240,232,0.8)", fontSize: "0.9rem", lineHeight: 1.6, textAlign: "center", marginBottom: "1rem" }}>
                De domingo a martes estamos cerrados al público general, pero puedes reservar el espacio entero de forma privada para ti y tus invitados. Solícitanos información y diseñaremos juntos un menú a medida con nuestro chef.
              </p>
            </div>
          ) : (
            <>
              {showNoon && (
                <ShiftCard
                  shift="NOON"
                  icon="☀"
                  name="Mediodía"
                  time="14:00 h"
                  selected={form.shift === "NOON"}
                  onClick={() => setForm((f) => ({ ...f, shift: "NOON" }))}
                />
              )}
              <ShiftCard
                shift="NIGHT"
                icon="✦"
                name="Noche"
                time="21:00 h"
                selected={form.shift === "NIGHT"}
                onClick={() => setForm((f) => ({ ...f, shift: "NIGHT" }))}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ShiftCard({
  icon,
  name,
  time,
  selected,
  onClick,
}: {
  shift: Shift;
  icon: string;
  name: string;
  time: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: selected ? `1px solid ${GOLD}` : "1px solid rgba(200,169,110,0.2)",
        background: selected ? "rgba(200,169,110,0.1)" : "transparent",
        padding: "1.2rem",
        cursor: "pointer",
        borderRadius: "2px",
        textAlign: "center",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
      <div style={{ fontSize: "0.84rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "0.2rem" }}>
        {name}
      </div>
      <div style={{ fontSize: "0.96rem", color: LIGHT }}>{time}</div>
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
    transition: "all 0.2s",
  };
}

/* ─────────────────────────────────── Step 2: Guests ── */

function Step2({
  form,
  setForm,
  getPrice,
  basePrice,
  wedThuActive
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  getPrice: (d: string | null) => number;
  basePrice: number;
  wedThuActive: boolean;
}) {
  const price = getPrice(form.date);
  const day = form.date ? new Date(form.date + "T12:00:00").getDay() : -1;
  const hasDiscount = wedThuActive && DISCOUNT_DAYS.includes(day);
  const total = price * form.guests;
  const deposit = Math.round(total * 0.3);


  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* ± selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem 0",
        }}
      >
        <button
          onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
          disabled={form.guests <= 1}
          style={guestBtnStyle(form.guests <= 1)}
        >
          −
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "4rem",
              fontWeight: 300,
              color: OFFWHITE,
              lineHeight: 1,
              minWidth: "80px",
            }}
          >
            {form.guests}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: LIGHT,
              marginTop: "0.3rem",
            }}
          >
            {form.guests === 1 ? "persona" : "personas"}
          </div>
        </div>
        <button
          onClick={() => setForm((f) => ({ ...f, guests: Math.min(12, f.guests + 1) }))}
          disabled={form.guests >= 12}
          style={guestBtnStyle(form.guests >= 12)}
        >
          +
        </button>
      </div>

      {/* Price display */}
      <div
        style={{
          textAlign: "center",
          padding: "1.5rem",
          background: "rgba(200,169,110,0.05)",
          border: "1px solid rgba(200,169,110,0.1)",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: LIGHT,
            marginBottom: "0.5rem",
          }}
        >
          Precio por persona
        </div>
        <div>
          {hasDiscount && (
            <span style={{ color: LIGHT, textDecoration: "line-through", fontSize: "1.08rem", marginRight: "0.5rem" }}>
              {basePrice} €
            </span>
          )}

          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: GOLD,
            }}
          >
            {price} €
          </span>
        </div>
        {hasDiscount && (
          <div style={{ fontSize: "0.78rem", color: GOLD, marginTop: "0.2rem" }}>
            20% dto. miércoles y jueves
          </div>
        )}
        <div style={{ fontSize: "0.9rem", color: OFFWHITE, marginTop: "0.5rem" }}>
          Total: <strong>{total} €</strong>
        </div>
        <div style={{ fontSize: "0.78rem", color: LIGHT, marginTop: "0.3rem" }}>
          Depósito (30%): {deposit} €
        </div>
      </div>
    </div>
  );
}

function guestBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid rgba(200,169,110,0.3)",
    background: "none",
    color: disabled ? "rgba(200,169,110,0.3)" : GOLD,
    fontSize: "1.3rem",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  };
}

/* ─────────────────────────────────── Step 3: Contact ── */

function Step3({
  form,
  setForm,
  errors,
  serverError,
  getPrice,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  errors: FieldErrors;
  serverError: string | null;
  getPrice: (d: string | null) => number;
}) {
  const [allergyPickerOpen, setAllergyPickerOpen] = useState(false);
  const price = getPrice(form.date);
  const total = price * form.guests;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Mini summary */}
      {form.date && (
        <div
          style={{
            background: "rgba(200,169,110,0.05)",
            border: "1px solid rgba(200,169,110,0.15)",
            borderRadius: "2px",
            padding: "0.8rem 1rem",
            marginBottom: "1.5rem",
            fontSize: "0.84rem",
            color: LIGHT,
          }}
        >
          <span style={{ color: OFFWHITE, textTransform: "capitalize" }}>
            {formatDate(form.date)}
          </span>{" "}
          · {form.shift === "NOON" ? "Mediodía" : form.shift === "NIGHT" ? "Noche" : "Cena Privada"} ·{" "}
          {form.guests} {form.guests === 1 ? "persona" : "personas"}{" "}
          {form.shift !== "PRIVATE" && (
            <>· <span style={{ color: GOLD }}>{total} €</span></>
          )}
        </div>
      )}

      {/* Name + Phone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem" }}>
        <FormField
          label="Nombre"
          error={errors.name}
          required
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Tu nombre"
            style={inputStyle}
          />
        </FormField>
        <FormField label="Teléfono" error={errors.phone} required>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+34 600 000 000"
            style={inputStyle}
          />
        </FormField>
      </div>

      {/* Email */}
      <div style={{ marginBottom: "1.2rem" }}>
        <FormField label="Email" error={errors.email} required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="tu@email.com"
            style={inputStyle}
          />
        </FormField>
      </div>

      {/* Allergies */}
      <div style={{ marginBottom: "1.2rem" }}>
        <FormField label="Alergias o intolerancias">
          <button
            type="button"
            onClick={() => setAllergyPickerOpen(true)}
            style={{
              ...inputStyle,
              textAlign: "left",
              cursor: "pointer",
              color: form.allergies ? OFFWHITE : "rgba(245,240,232,0.35)",
              display: "block", width: "100%",
              whiteSpace: "normal", wordBreak: "break-word",
              minHeight: "2.6rem",
            }}
          >
            {form.allergies || "Toca para seleccionar (opcional)"}
          </button>
        </FormField>
        <AllergyPicker
          open={allergyPickerOpen}
          onClose={() => setAllergyPickerOpen(false)}
          value={form.allergies}
          onChange={(v) => setForm((f) => ({ ...f, allergies: v }))}
        />
      </div>

      {/* Related Reservations */}
      <div style={{ marginBottom: "1.2rem" }}>
        <FormField label="Reservas relacionadas">
          <input
            type="text"
            value={form.groupRef}
            onChange={(e) => setForm((f) => ({ ...f, groupRef: e.target.value }))}
            placeholder="Nombre del titular de la otra reserva (Opcional)"
            style={inputStyle}
          />
        </FormField>
      </div>

      {/* Previous visit */}
      <div style={{ marginBottom: "1.2rem" }}>
        <div style={{ ...smallLabelStyle, marginBottom: "0.8rem" }}>¿Has venido alguna vez?</div>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: form.previousVisit === true ? "0.8rem" : "0" }}>
          {[
            { val: false, label: "Primera vez" },
            { val: true, label: "Ya he venido" },
          ].map(({ val, label }) => (
            <div
              key={String(val)}
              onClick={() => setForm((f) => ({ ...f, previousVisit: val }))}
              style={{
                flex: 1,
                padding: "0.9rem 1.2rem",
                border: form.previousVisit === val ? `1px solid ${GOLD}` : "1px solid rgba(200,169,110,0.15)",
                background: form.previousVisit === val ? "rgba(200,169,110,0.06)" : "rgba(255,255,255,0.01)",
                color: form.previousVisit === val ? OFFWHITE : "rgba(245,240,232,0.6)",
                fontSize: "0.95rem",
                borderRadius: "2px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: `1px solid ${form.previousVisit === val ? GOLD : "rgba(200,169,110,0.3)"}`,
                  background: form.previousVisit === val ? GOLD : "transparent",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Barrio selector — only when "Ya he venido" */}
        {form.previousVisit === true && (
          <div style={{ display: "flex", gap: "0.8rem", animation: "fadeIn 0.3s ease" }}>
            {[
              { val: "EIXAMPLE" as const, label: "Barrio del Eixample" },
              { val: "SARRIA" as const, label: "Barrio de Sarrià-Sant Gervasi" },
            ].map(({ val, label }) => (
              <div
                key={val}
                onClick={() => setForm((f) => ({ ...f, previousBarrio: val }))}
                style={{
                  flex: 1,
                  padding: "0.9rem 1.2rem",
                  border: form.previousBarrio === val ? `1px solid ${GOLD}` : "1px solid rgba(200,169,110,0.15)",
                  background: form.previousBarrio === val ? "rgba(200,169,110,0.06)" : "rgba(255,255,255,0.01)",
                  color: form.previousBarrio === val ? OFFWHITE : "rgba(245,240,232,0.6)",
                  fontSize: "0.95rem",
                  borderRadius: "2px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: `1px solid ${form.previousBarrio === val ? GOLD : "rgba(200,169,110,0.3)"}`,
                    background: form.previousBarrio === val ? GOLD : "transparent",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <div style={{ marginBottom: "1.2rem" }}>
        <FormField label="Comentarios">
          <textarea
            value={form.comments}
            onChange={(e) => setForm((f) => ({ ...f, comments: e.target.value }))}
            placeholder="Opcional — ocasión especial, peticiones…"
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </FormField>
      </div>

      {/* Consent checkboxes */}
      <div style={{
        display: "flex", flexDirection: "column", gap: "0.75rem",
        padding: "1rem",
        background: "rgba(200,169,110,0.04)",
        border: "1px solid rgba(200,169,110,0.12)",
        borderRadius: "2px",
        marginBottom: "0.5rem",
      }}>
        {/* Privacy — obligatorio */}
        <label style={{ display: "flex", gap: "0.75rem", cursor: "pointer", alignItems: "flex-start" }}>
          <input
            type="checkbox"
            checked={form.privacyConsent}
            onChange={(e) => setForm((f) => ({ ...f, privacyConsent: e.target.checked }))}
            style={{ marginTop: "2px", accentColor: GOLD, flexShrink: 0 }}
          />
          <span style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.7)", lineHeight: 1.6 }}>
            He leído y acepto la{" "}
            <a
              href="/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: GOLD, textDecoration: "underline" }}
            >
              Política de Privacidad
            </a>
            {" "}y consiento el tratamiento de mis datos para gestionar mi reserva.{" "}
            <span style={{ color: "rgba(192,57,43,0.9)" }}>*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p style={{ fontSize: "0.84rem", color: "#C0392B", marginTop: "-0.4rem", paddingLeft: "1.5rem" }}>
            {errors.privacyConsent}
          </p>
        )}

        {/* Marketing — voluntario */}
        <label style={{ display: "flex", gap: "0.75rem", cursor: "pointer", alignItems: "flex-start" }}>
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(e) => setForm((f) => ({ ...f, marketingConsent: e.target.checked }))}
            style={{ marginTop: "2px", accentColor: GOLD, flexShrink: 0 }}
          />
          <span style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>
            Acepto recibir comunicaciones de marketing sobre futuras experiencias,
            descuentos y novedades. (Opcional)
          </span>
        </label>
      </div>

      {serverError && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.8rem 1rem",
            background: "rgba(192,57,43,0.1)",
            border: "1px solid rgba(192,57,43,0.4)",
            borderRadius: "2px",
            fontSize: "0.84rem",
            color: "#E74C3C",
          }}
        >
          {serverError}
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ ...smallLabelStyle, marginBottom: "0.5rem" }}>
        {label}
        {required && <span style={{ color: "#C0392B", marginLeft: "0.2rem" }}>*</span>}
      </div>
      {children}
      {error && (
        <p style={{ fontSize: "0.8rem", color: "#C0392B", marginTop: "0.3rem" }}>{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────── Success Screen ── */

function SuccessScreen({
  success,
  date,
  shift,
  onClose,
}: {
  success: SuccessData;
  date: string;
  shift: Shift;
  onClose: () => void;
}) {
  if (success.id === "PRIVATE") {
    return (
      <div style={{ padding: "2rem", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
        <div style={{ width: "64px", height: "64px", border: `1px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>✓</div>
        <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem", color: OFFWHITE }}>Solicitud enviada</div>
        <p style={{ fontSize: "1.1rem", color: LIGHT, lineHeight: 1.8, maxWidth: "380px", margin: "0 auto 2rem" }}>
          Hemos recibido tu solicitud de cena privada. Nuestro equipo se pondrá en contacto contigo muy pronto para organizar los detalles y preparar tu menú.
        </p>
        <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(200,169,110,0.5)", color: LIGHT, padding: "0.8rem 2rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "2px" }}>Cerrar</button>
      </div>
    );
  }

  const today = new Date();
  const d = new Date(date + "T12:00:00");
  const diffDays = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const fmt = (dt: Date) =>
    dt.toLocaleDateString("es-ES", { day: "numeric", month: "short" });

  const chain = (() => {
    const d4 = new Date(d); d4.setDate(d4.getDate() - 4);
    const d3 = new Date(d); d3.setDate(d3.getDate() - 3);
    const d2 = new Date(d); d2.setDate(d2.getDate() - 2);
    if (diffDays < 1) return [{ label: "Ahora", desc: "Email con toda la información", date: "Inmediato" }];
    if (diffDays <= 2) return [
      { label: "D-2", desc: "Primera pista", date: fmt(d2) },
      { label: "D-0", desc: "Información final", date: fmt(d) },
    ];
    if (diffDays === 3) return [
      { label: "D-3", desc: "Primera pista", date: fmt(d3) },
      { label: "D-2", desc: "Segunda pista", date: fmt(d2) },
      { label: "D-0", desc: "Información final", date: fmt(d) },
    ];
    return [
      { label: "D-4", desc: "Primera pista", date: fmt(d4) },
      { label: "D-3", desc: "Segunda pista", date: fmt(d3) },
      { label: "D-2", desc: "Tercera pista", date: fmt(d2) },
      { label: "D-0", desc: "Información final y ubicación", date: fmt(d) },
    ];
  })();

  return (
    <div style={{ padding: "2rem", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          border: `1px solid ${GOLD}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          fontSize: "1.5rem",
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "2rem",
          fontWeight: 300,
          marginBottom: "0.5rem",
          color: OFFWHITE,
        }}
      >
        Reserva recibida
      </div>
      <p style={{ fontSize: "1.1rem", color: LIGHT, lineHeight: 1.8, maxWidth: "380px", margin: "0 auto 2rem" }}>
        Confirmaremos tu plaza en breve. Recibirás los emails de pistas a partir de 4 días antes del evento.
      </p>

      {/* Payment summary */}
      <div
        style={{
          background: "rgba(200,169,110,0.05)",
          border: "1px solid rgba(200,169,110,0.15)",
          borderRadius: "2px",
          padding: "1rem",
          marginBottom: "1.5rem",
          textAlign: "left",
        }}
      >
        {[
          { key: "Fecha", val: `${formatDate(date)} · ${shift === "NOON" ? "Mediodía" : "Noche"}` },
          { key: "Total", val: `${success.total} €` },
          { key: "Depósito (30%)", val: `${success.deposit} €` },
          { key: "Referencia", val: success.id.slice(0, 8).toUpperCase() },
        ].map(({ key, val }) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(200,169,110,0.08)",
              fontSize: "1.05rem",
            }}
          >
            <span style={{ color: LIGHT }}>{key}</span>
            <span style={{ color: OFFWHITE }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Email chain */}
      <div
        style={{
          background: "rgba(200,169,110,0.05)",
          border: "1px solid rgba(200,169,110,0.15)",
          borderRadius: "2px",
          padding: "1.2rem",
          textAlign: "left",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ ...smallLabelStyle, marginBottom: "1rem" }}>Cadena de pistas</div>
        {chain.map(({ label, desc, date: emailDate }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.6rem 0",
              borderBottom: "1px solid rgba(200,169,110,0.06)",
              fontSize: "1rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(200,169,110,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.95rem",
                color: GOLD,
                flexShrink: 0,
              }}
            >
              {label}
            </div>
            <span style={{ color: LIGHT, flex: 1 }}>{desc}</span>
            <span style={{ color: OFFWHITE, fontSize: "0.9rem" }}>{emailDate}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        <PaymentButton 
          reservationId={success.id} 
          amount={success.deposit} 
        />
        
        <p style={{ fontSize: "0.9rem", color: LIGHT, maxWidth: "300px", margin: "0 auto" }}>
          Para garantizar tu plaza, es necesario realizar el pago del depósito. 
          Serás redirigido a la pasarela segura de Redsys.
        </p>

        <button 
          onClick={onClose} 
          style={{ 
            background: "none", 
            border: "none", 
            color: LIGHT, 
            fontSize: "0.8rem", 
            textTransform: "uppercase", 
            letterSpacing: "0.1em",
            cursor: "pointer",
            marginTop: "0.5rem"
          }}
        >
          Cerrar y pagar más tarde
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────── Shared styles ── */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(200,169,110,0.2)",
  color: OFFWHITE,
  padding: "0.8rem 1rem",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.9rem",
  fontWeight: 300,
  borderRadius: "2px",
  outline: "none",
  transition: "border-color 0.2s",
};

const smallLabelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: GOLD,
};

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid rgba(200,169,110,0.2)",
  color: LIGHT,
  width: "36px",
  height: "36px",
  cursor: "pointer",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: "2px",
  transition: "all 0.2s",
};

const backBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid rgba(200,169,110,0.2)",
  color: LIGHT,
  padding: "0.8rem 1.5rem",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.8rem",
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "2px",
  transition: "all 0.2s",
};

const nextBtnStyle: React.CSSProperties = {
  background: GOLD,
  color: "#0A0A0A",
  border: "none",
  padding: "0.9rem 2rem",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "2px",
  flex: 1,
  maxWidth: "280px",
  display: "block",
  transition: "all 0.2s",
};
