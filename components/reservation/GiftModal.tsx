"use client";

import { useEffect, useState } from "react";
import { PaymentButton } from "./PaymentButton";

const GOLD = "#C8A96E";
const DARK2 = "#1A1A1A";
const DARK = "#111111";
const OFFWHITE = "#F5F0E8";
const LIGHT = "#888888";
const BASE_PRICE = 130;

type DeliveryMode = "later" | "now";

type SuccessData = {
  voucherId: string;
  token: string;
  totalAmount: number;
  expiresAt: string;
  deliveryMode: DeliveryMode;
  recipientEmail: string;
  purchaserName: string;
  guests: number;
};

type FieldErrors = Partial<Record<string, string>>;

type Props = { open: boolean; onClose: () => void };

export function GiftModal({ open, onClose }: Props) {
  const [guests, setGuests] = useState(2);
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaserPhone, setPurchaserPhone] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("later");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleClose() {
    setGuests(2);
    setPurchaserName("");
    setPurchaserPhone("");
    setPurchaserEmail("");
    setDeliveryMode("later");
    setRecipientEmail("");
    setSendDate("");
    setErrors({});
    setServerError(null);
    setSuccess(null);
    onClose();
  }

  function validate(): boolean {
    const e: FieldErrors = {};
    if (purchaserName.trim().length < 2) e.purchaserName = "Mínimo 2 caracteres";
    if (purchaserPhone.trim().length < 6) e.purchaserPhone = "Teléfono demasiado corto";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(purchaserEmail.trim())) e.purchaserEmail = "Email no válido";
    if (deliveryMode === "now") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
        e.recipientEmail = "Email del destinatario no válido";
      }
      if (!sendDate) {
        e.sendDate = "Selecciona una fecha de envío";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setServerError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/reservations/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guests,
          purchaserName: purchaserName.trim(),
          purchaserPhone: purchaserPhone.trim(),
          purchaserEmail: purchaserEmail.trim(),
          deliveryMode,
          recipientEmail: deliveryMode === "now" ? recipientEmail.trim() : undefined,
          sendDate: deliveryMode === "now" && sendDate ? new Date(sendDate).toISOString() : undefined,
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        voucherId?: string;
        token?: string;
        totalAmount?: number;
        expiresAt?: string;
        redsysData?: any;
      };
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Error al crear el vale regalo.");
        return;
      }

      if (json.redsysData) {
        submitRedsysForm(json.redsysData);
      } else {
        setSuccess({
          voucherId: json.voucherId!,
          token: json.token!,
          totalAmount: json.totalAmount!,
          expiresAt: json.expiresAt!,
          deliveryMode,
          recipientEmail: recipientEmail.trim(),
          purchaserName: purchaserName.trim(),
          guests,
        });
      }
    } catch {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const total = BASE_PRICE * guests;

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
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="clandestino-forced"
        style={{
          background: DARK2,
          border: "1px solid rgba(200,169,110,0.2)",
          width: "100%",
          maxWidth: "520px",
          borderRadius: "4px",
          margin: "auto",
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
          color: OFFWHITE, // Ensure text color is set
        }}
      >
        {/* Header */}
        <div style={{
          padding: "2rem 2rem 1.5rem",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
        }}>
          <div>
            <div style={smallLabel}>Vale regalo</div>
            <div style={serifTitle}>Regalar la experiencia</div>
          </div>
          <button onClick={handleClose} style={closeBtn}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          {success ? (
            <SuccessScreen success={success} onClose={handleClose} />
          ) : (
            <>
              <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: "2rem" }}>
                El destinatario recibirá un enlace para elegir la fecha que prefiera. Vale válido 6 meses.
              </p>

              {/* Guest selector */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ ...smallLabel, marginBottom: "1rem" }}>Número de personas</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "1.5rem 0" }}>
                  <button onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} style={guestBtn(guests <= 1)}>−</button>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "4rem", fontWeight: 300, color: OFFWHITE, lineHeight: 1, minWidth: "80px" }}>{guests}</div>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: LIGHT, marginTop: "0.3rem" }}>{guests === 1 ? "persona" : "personas"}</div>
                  </div>
                  <button onClick={() => setGuests((g) => Math.min(12, g + 1))} disabled={guests >= 12} style={guestBtn(guests >= 12)}>+</button>
                </div>

                <div style={{ textAlign: "center", padding: "1rem", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.1)", borderRadius: "2px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.6rem", fontWeight: 300, color: GOLD }}>{total} €</span>
                  <span style={{ fontSize: "0.75rem", color: LIGHT, marginLeft: "0.5rem" }}>({BASE_PRICE} €/persona)</span>
                </div>
              </div>

              {/* Purchaser fields */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ ...smallLabel, marginBottom: "1rem" }}>Tus datos</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                  <div>
                    <input
                      type="text"
                      value={purchaserName}
                      onChange={(e) => setPurchaserName(e.target.value)}
                      placeholder="Nombre y apellidos"
                      style={inputStyle(!!errors.purchaserName)}
                    />
                    {errors.purchaserName && <p style={errorText}>{errors.purchaserName}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={purchaserPhone}
                      onChange={(e) => setPurchaserPhone(e.target.value)}
                      placeholder="Teléfono"
                      style={inputStyle(!!errors.purchaserPhone)}
                    />
                    {errors.purchaserPhone && <p style={errorText}>{errors.purchaserPhone}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={purchaserEmail}
                      onChange={(e) => setPurchaserEmail(e.target.value)}
                      placeholder="Tu email"
                      style={inputStyle(!!errors.purchaserEmail)}
                    />
                    {errors.purchaserEmail && <p style={errorText}>{errors.purchaserEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery mode */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ ...smallLabel, marginBottom: "0.75rem" }}>¿Cómo quieres enviar el vale?</div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {([
                    { value: "later" as DeliveryMode, label: "Enviádmelo a mí y yo lo reenvío", desc: "Recibes el código aquí" },
                    { value: "now" as DeliveryMode, label: "Enviarlo al destinatario", desc: "Se envía por email" },
                  ] as const).map(({ value, label, desc }) => {
                    const active = deliveryMode === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDeliveryMode(value)}
                        style={{
                          flex: 1,
                          padding: "0.85rem 0.75rem",
                          border: `1px solid ${active ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.15)"}`,
                          background: active ? "rgba(200,169,110,0.08)" : "transparent",
                          borderRadius: "2px",
                          cursor: "pointer",
                          textAlign: "center" as const,
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em", color: active ? OFFWHITE : LIGHT, marginBottom: "0.2rem" }}>{label}</div>
                        <div style={{ fontSize: "0.62rem", color: active ? LIGHT : "rgba(136,136,136,0.5)", letterSpacing: "0.02em" }}>{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient email (only when "now") */}
              {deliveryMode === "now" && (
                <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <div style={{ ...smallLabel, marginBottom: "0.5rem" }}>Email del destinatario</div>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="destinatario@email.com"
                      style={inputStyle(!!errors.recipientEmail)}
                    />
                    {errors.recipientEmail && <p style={errorText}>{errors.recipientEmail}</p>}
                  </div>
                  <div>
                    <div style={{ ...smallLabel, marginBottom: "0.5rem" }}>Fecha de envío</div>
                    <input
                      type="date"
                      value={sendDate}
                      onChange={(e) => setSendDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      style={inputStyle(!!errors.sendDate)}
                    />
                    {errors.sendDate && <p style={errorText}>{errors.sendDate}</p>}
                  </div>
                </div>
              )}

              {serverError && (
                <div style={{ padding: "0.8rem 1rem", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: "2px", fontSize: "0.8rem", color: "#E74C3C", marginBottom: "1rem" }}>
                  {serverError}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid rgba(200,169,110,0.1)", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: GOLD,
                color: "#0A0A0A",
                border: "none",
                padding: "0.9rem 2rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                cursor: loading ? "not-allowed" : "pointer",
                borderRadius: "2px",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              {loading ? "Generando…" : "Confirmar y pagar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Success screen ── */
function SuccessScreen({ success, onClose }: { success: SuccessData; onClose: () => void }) {
  const [sendEmail, setSendEmail] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(success.deliveryMode === "now");

  const expiry = new Date(success.expiresAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function handleSendNow() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sendEmail.trim())) {
      setSendError("Email no válido");
      return;
    }
    setSendError(null);
    setSending(true);
    try {
      const res = await fetch("/api/reservations/gift/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: success.token, recipientEmail: sendEmail.trim() }),
      });
      const json = await res.json() as { ok: boolean; error?: string };
      if (!json.ok) { setSendError(json.error ?? "Error al enviar"); return; }
      setSent(true);
    } catch {
      setSendError("Error de conexión");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      {/* Icon */}
      <div style={{ width: "64px", height: "64px", border: `1px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>◇</div>
      <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: OFFWHITE, marginBottom: "0.5rem" }}>
        Vale creado
      </div>
      <p style={{ fontSize: "0.8rem", color: LIGHT, lineHeight: 1.8, marginBottom: "1.5rem" }}>
        {sent
          ? `El email de regalo ha sido enviado al destinatario. Válido hasta ${expiry}.`
          : `Guarda el código de canje y compártelo cuando quieras. Válido hasta ${expiry}.`}
      </p>

      {/* Token box */}
      <div style={{ background: "rgba(200,169,110,0.08)", border: `1px solid ${GOLD}`, borderRadius: "4px", padding: "1.2rem", marginBottom: "1.5rem" }}>
        <div style={{ ...smallLabel, marginBottom: "0.5rem" }}>Código de canje</div>
        <div style={{ fontFamily: "monospace", fontSize: "0.9rem", color: GOLD, letterSpacing: "0.08em", wordBreak: "break-all" as const }}>
          {success.token}
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "2px", padding: "1rem", textAlign: "left", marginBottom: "1.5rem" }}>
        {[
          ["De", success.purchaserName],
          ["Personas", `${success.guests} ${success.guests === 1 ? "persona" : "personas"}`],
          ["Importe", `${success.totalAmount} €`],
          ["Válido hasta", expiry],
          ["Referencia", success.voucherId.slice(0, 8).toUpperCase()],
        ].map(([key, val]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(200,169,110,0.08)", fontSize: "0.82rem" }}>
            <span style={{ color: LIGHT }}>{key}</span>
            <span style={{ color: OFFWHITE }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Send now section (only when deliveryMode === "later" and not yet sent) */}
      {!sent && (
        <div style={{ background: DARK, border: "1px solid rgba(200,169,110,0.12)", borderRadius: "2px", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
          <div style={{ ...smallLabel, marginBottom: "0.75rem" }}>Enviar ahora al destinatario</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="email"
              value={sendEmail}
              onChange={(e) => setSendEmail(e.target.value)}
              placeholder="email@destinatario.com"
              style={{ ...inputStyle(!!sendError), flex: 1 }}
            />
            <button
              onClick={handleSendNow}
              disabled={sending}
              style={{
                background: GOLD,
                color: "#0A0A0A",
                border: "none",
                padding: "0 1rem",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                cursor: sending ? "not-allowed" : "pointer",
                borderRadius: "2px",
                opacity: sending ? 0.5 : 1,
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
              }}
            >
              {sending ? "…" : "Enviar"}
            </button>
          </div>
          {sendError && <p style={errorText}>{sendError}</p>}
        </div>
      )}

      {sent && (
        <div style={{ padding: "0.75rem 1rem", background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "2px", fontSize: "0.78rem", color: "#81C784", marginBottom: "1.5rem" }}>
          ✓ Email enviado al destinatario
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PaymentButton 
          reservationId={success.voucherId} 
          amount={success.totalAmount} 
          autoTrigger={true}
        />
        
        <p style={{ fontSize: "0.65rem", color: LIGHT, maxWidth: "300px", margin: "0 auto" }}>
          Para activar el vale regalo, es necesario realizar el pago. 
          Serás redirigido a la pasarela segura de Redsys.
        </p>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            color: LIGHT,
            border: "1px solid rgba(200,169,110,0.1)",
            padding: "0.75rem 2rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: "2px",
            margin: "0 auto",
            display: "block",
            marginTop: "0.5rem"
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

/* ── shared styles ── */

const smallLabel: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: GOLD,
};

const serifTitle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontSize: "1.8rem",
  fontWeight: 300,
  color: OFFWHITE,
};

const closeBtn: React.CSSProperties = {
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
};

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hasError ? "#C0392B" : "rgba(200,169,110,0.2)"}`,
    color: OFFWHITE,
    padding: "0.8rem 1rem",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.85rem",
    fontWeight: 300,
    borderRadius: "2px",
    outline: "none",
    boxSizing: "border-box",
  };
}

const errorText: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "#C0392B",
  marginTop: "0.3rem",
  margin: "0.3rem 0 0",
};

function guestBtn(disabled: boolean): React.CSSProperties {
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
  };
}

/** Redsys direct redirection helper */
function submitRedsysForm(data: any) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = data.url;
  
  const params = {
    Ds_SignatureVersion: data.Ds_SignatureVersion,
    Ds_MerchantParameters: data.Ds_MerchantParameters,
    Ds_Signature: data.Ds_Signature,
  };

  for (const [key, value] of Object.entries(params)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value as string;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
