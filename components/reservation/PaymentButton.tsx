"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  reservationId: string;
  amount: number;
  onLoading?: (loading: boolean) => void;
  autoTrigger?: boolean;
};

export function PaymentButton({ reservationId, amount, onLoading, autoTrigger }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (autoTrigger) {
      handlePayment();
    }
  }, [autoTrigger]);

  async function handlePayment() {
    setLoading(true);
    onLoading?.(true);

    try {
      // Check if demo mode is active
      const settingsRes = await fetch("/api/public/settings/demo-mode?t=" + Date.now(), { cache: 'no-store' });
      const settings = await settingsRes.json();
      const isDemo = settings.enabled === true;

      if (isDemo) {
        // Redirect to demo payment page
        router.push(`/demo-pago?reservationId=${reservationId}&amount=${amount}`);
        return;
      }

      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(data.error || "Error al iniciar el pago");
        return;
      }

      // Create a hidden form and submit it to Redsys
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
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      alert("Error de conexión con la pasarela de pago");
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  }

  return (
    <button
      onClick={handlePayment}
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
      {loading ? "Preparando pago..." : `Pagar depósito (${amount} €)`}
    </button>
  );
}
