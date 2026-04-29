"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function DemoPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get("reservationId");
  const amount = searchParams.get("amount") || "0";
  
  const [step, setStep] = useState<"card" | "processing" | "success">("card");
  
  useEffect(() => {
    if (!reservationId) {
      router.push("/");
    }
  }, [reservationId, router]);

  const handlePay = () => {
    setStep("processing");
    setTimeout(async () => {
      try {
        // Simulate callback to our own system
        const res = await fetch("/api/payments/callback/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reservationId })
        });
        
        if (res.ok) {
          setStep("success");
          setTimeout(() => {
            router.push("/api/payments/return?reservationId=" + reservationId);
          }, 2000);
        } else {
          alert("Error en la simulación de pago");
          setStep("card");
        }
      } catch (error) {
        alert("Error de conexión");
        setStep("card");
      }
    }, 2500);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f3f4f6", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <div style={{ 
        background: "white", 
        padding: "2rem", 
        borderRadius: "8px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1f2937" }}>Pasarela de Pago</h1>
          <div style={{ background: "#fee2e2", color: "#b91c1c", fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>MODO DEMO</div>
        </div>

        {step === "card" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>IMPORTE A PAGAR</label>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827" }}>{amount} €</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>NÚMERO DE TARJETA</label>
              <input type="text" defaultValue="4242 4242 4242 4242" disabled style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", background: "#f9fafb" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>FECHA CADUCIDAD</label>
                <input type="text" defaultValue="12 / 28" disabled style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", background: "#f9fafb" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>CVC</label>
                <input type="text" defaultValue="123" disabled style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", background: "#f9fafb" }} />
              </div>
            </div>

            <button 
              onClick={handlePay}
              style={{ 
                width: "100%", 
                background: "#2563eb", 
                color: "white", 
                padding: "1rem", 
                borderRadius: "4px", 
                border: "none", 
                fontWeight: 700, 
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              PAGAR AHORA
            </button>
            
            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", marginTop: "1.5rem" }}>
              Esta es una simulación para pruebas del sistema.
            </p>
          </div>
        )}

        {step === "processing" && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              border: "4px solid #e5e7eb", 
              borderTopColor: "#2563eb", 
              borderRadius: "50%", 
              animation: "gs-spin 1s linear infinite",
              margin: "0 auto 1.5rem"
            }} />
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#374151" }}>Procesando pago...</h2>
            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>No cierre esta ventana</p>
          </div>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center", padding: "2rem 0", animation: "fadeIn 0.3s ease" }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              background: "#dcfce7", 
              color: "#166534", 
              borderRadius: "50%", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              margin: "0 auto 1.5rem"
            }}>✓</div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#166534" }}>Pago Autorizado</h2>
            <p style={{ fontSize: "0.875rem", color: "#166534", marginTop: "0.5rem" }}>Redirigiendo de vuelta al comercio...</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gs-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function DemoPaymentPage() {
  return (
    <Suspense fallback={<div>Cargando pasarela...</div>}>
      <DemoPaymentContent />
    </Suspense>
  );
}
