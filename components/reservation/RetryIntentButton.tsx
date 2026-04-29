"use client";

import { useState } from "react";

type Props = {
  intentId: string;
  amount: number;
};

function submitRedsysForm(redsysData: any) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = redsysData.url;
  for (const [key, value] of Object.entries({
    Ds_SignatureVersion: redsysData.Ds_SignatureVersion,
    Ds_MerchantParameters: redsysData.Ds_MerchantParameters,
    Ds_Signature: redsysData.Ds_Signature,
  })) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value as string;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export function RetryIntentButton({ intentId, amount }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/retry-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Error al reintentar el pago");
        return;
      }
      submitRedsysForm(data.redsysData);
    } catch {
      setError("Error de conexión con la pasarela de pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleRetry}
        disabled={loading}
        style={{
          background: "#daa520",
          color: "#0A0A0A",
          border: "none",
          padding: "1rem 2.5rem",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: "2px",
          width: "100%",
          maxWidth: "320px",
          display: "block",
          margin: "0 auto",
          transition: "all 0.2s",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Preparando pago..." : `Reintentar pago (${amount.toFixed(2)} €)`}
      </button>
      {error && (
        <p style={{ color: "#ff4d4d", fontSize: "0.8rem", marginTop: "0.75rem", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
