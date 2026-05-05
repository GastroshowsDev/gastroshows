"use client";

import { useState } from "react";
import { GiftRedemptionModal } from "./GiftRedemptionModal";

const GOLD = "#daa520";
const OFFWHITE = "#F5F0E8";
const LIGHT = "#888888";

type Props = {
  token: string;
  guests: number;
  totalAmount: number;
  purchaserName: string;
  expiresAt: string;
  expiryStr: string;
  expired: boolean;
  redeemed: boolean;
};

export function GiftRedemptionPage({
  token,
  guests,
  totalAmount,
  purchaserName,
  expiresAt,
  expiryStr,
  expired,
  redeemed,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo / brand */}
      <div style={{ marginBottom: "3rem", textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,169,110,0.6)", marginBottom: "0.75rem" }}>
          GastroShows
        </div>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(200,169,110,0.4), transparent)", margin: "0 auto" }} />
      </div>

      {/* Card */}
      <div
        style={{
          background: "#141414",
          border: "1px solid rgba(200,169,110,0.2)",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "480px",
          padding: "2.5rem 2rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {expired ? (
          <ExpiredState expiryStr={expiryStr} />
        ) : redeemed ? (
          <RedeemedState />
        ) : (
          <ActiveState
            purchaserName={purchaserName}
            guests={guests}
            totalAmount={totalAmount}
            expiryStr={expiryStr}
            onSelect={() => setModalOpen(true)}
          />
        )}
      </div>

      {/* Bottom ornament */}
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to top, rgba(200,169,110,0.3), transparent)", margin: "0 auto 0.75rem" }} />
        <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#333333" }}>
          Una experiencia única
        </div>
      </div>

      {/* Redemption modal */}
      {!expired && !redeemed && (
        <GiftRedemptionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          token={token}
          guests={guests}
          purchaserName={purchaserName}
          expiresAt={expiresAt}
        />
      )}
    </div>
  );
}

/* ── Sub-states ── */

function ActiveState({
  purchaserName,
  guests,
  totalAmount,
  expiryStr,
  onSelect,
}: {
  purchaserName: string;
  guests: number;
  totalAmount: number;
  expiryStr: string;
  onSelect: () => void;
}) {
  return (
    <>
      {/* Gift icon */}
      <div
        style={{
          width: "72px",
          height: "72px",
          border: "1px solid rgba(200,169,110,0.35)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.75rem",
          fontSize: "1.6rem",
          color: GOLD,
        }}
      >
        ◇
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: LIGHT, marginBottom: "0.5rem" }}>
        Un regalo para ti
      </div>

      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
          fontWeight: 300,
          color: OFFWHITE,
          lineHeight: 1.25,
          margin: "0 0 0.75rem",
        }}
      >
        {purchaserName} te regala<br />una experiencia
      </h1>

      <p style={{ fontSize: "0.85rem", color: LIGHT, lineHeight: 1.8, margin: "0 0 2rem" }}>
        Una noche de gastronomía, magia y espectáculo.<br />Solo queda elegir la fecha perfecta.
      </p>

      {/* Details */}
      <div
        style={{
          background: "rgba(200,169,110,0.05)",
          border: "1px solid rgba(200,169,110,0.12)",
          borderRadius: "2px",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        {[
          ["Personas", `${guests} ${guests === 1 ? "persona" : "personas"}`],
          ["Valor del regalo", `${totalAmount} €`],
          ["Válido hasta", expiryStr],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.4rem 0",
              borderBottom: "1px solid rgba(200,169,110,0.07)",
              fontSize: "0.82rem",
            }}
          >
            <span style={{ color: LIGHT }}>{k}</span>
            <span style={{ color: OFFWHITE }}>{v}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        style={{
          background: GOLD,
          color: "#0A0A0A",
          border: "none",
          padding: "1rem 2.5rem",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: "2px",
          width: "100%",
          maxWidth: "280px",
          margin: "0 auto",
          display: "block",
        }}
      >
        Seleccionar fecha
      </button>
    </>
  );
}

function ExpiredState({ expiryStr }: { expiryStr: string }) {
  return (
    <>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "rgba(200,169,110,0.3)" }}>◇</div>
      <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: OFFWHITE, marginBottom: "0.75rem" }}>
        Vale expirado
      </div>
      <p style={{ fontSize: "0.85rem", color: LIGHT, lineHeight: 1.7 }}>
        Este vale de regalo venció el {expiryStr} y ya no se puede canjear.<br />
        Contacta con el restaurante para más información.
      </p>
    </>
  );
}

function RedeemedState() {
  return (
    <>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: GOLD }}>✓</div>
      <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: OFFWHITE, marginBottom: "0.75rem" }}>
        Vale canjeado
      </div>
      <p style={{ fontSize: "0.85rem", color: LIGHT, lineHeight: 1.7 }}>
        Este vale ya ha sido utilizado para hacer una reserva.<br />
        ¡Nos vemos pronto!
      </p>
    </>
  );
}
