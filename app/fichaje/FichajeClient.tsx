"use client";

import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";

const BARCELONA_TZ = "Europe/Madrid";
const GOLD = "#C8A96E";

type Status = "IDLE" | "LOADING" | "SUCCESS_IN" | "SUCCESS_OUT" | "ERROR";

export function FichajeClient() {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<Status>("IDLE");
  const [message, setMessage] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(formatInTimeZone(now, BARCELONA_TZ, "HH:mm"));
      setDateStr(formatInTimeZone(now, BARCELONA_TZ, "EEEE, d 'de' MMMM"));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleKey = (key: string) => {
    if (status !== "IDLE" && status !== "ERROR") return;
    if (status === "ERROR") {
      setStatus("IDLE");
      setPin("");
    }
    
    if (key === "DEL") {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        submitPin(newPin);
      }
    }
  };

  const submitPin = async (finalPin: string) => {
    setStatus("LOADING");
    try {
      const res = await fetch("/api/fichaje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: finalPin }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setStatus("ERROR");
        setMessage(data.error || "Error al fichar");
        setTimeout(() => { setStatus("IDLE"); setPin(""); }, 3000);
        return;
      }

      if (data.action === "IN") {
        setStatus("SUCCESS_IN");
        setMessage(`¡Hola ${data.employeeName}!\nEntrada registrada a las ${data.time}`);
      } else {
        setStatus("SUCCESS_OUT");
        setMessage(`¡Hasta pronto ${data.employeeName}!\nSalida registrada a las ${data.time}`);
      }

      setTimeout(() => {
        setStatus("IDLE");
        setPin("");
      }, 4000);

    } catch (err) {
      setStatus("ERROR");
      setMessage("Error de conexión");
      setTimeout(() => { setStatus("IDLE"); setPin(""); }, 3000);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.2rem", fontWeight: 300, color: "rgba(245,240,232,0.6)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>
          Control Horario
        </h1>
        <div style={{ fontSize: "4rem", fontFamily: "var(--font-cormorant), Georgia, serif", color: GOLD, lineHeight: 1 }}>
          {timeStr || "00:00"}
        </div>
        <div style={{ fontSize: "1rem", color: "rgba(245,240,232,0.8)", textTransform: "capitalize", marginTop: "0.5rem" }}>
          {dateStr}
        </div>
      </div>

      <div style={{ 
        background: "rgba(255,255,255,0.03)", 
        border: "1px solid rgba(200,169,110,0.2)",
        borderRadius: "16px",
        padding: "2rem",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        {status === "SUCCESS_IN" || status === "SUCCESS_OUT" ? (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ 
              width: "80px", height: "80px", borderRadius: "50%", 
              background: status === "SUCCESS_IN" ? "rgba(46,204,113,0.1)" : "rgba(230,126,34,0.1)",
              border: `2px solid ${status === "SUCCESS_IN" ? "#2ECC71" : "#E67E22"}`,
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem" 
            }}>
              {status === "SUCCESS_IN" ? "👋" : "🏃"}
            </div>
            <p style={{ fontSize: "1.2rem", color: "#F5F0E8", whiteSpace: "pre-line", lineHeight: 1.6 }}>
              {message}
            </p>
          </div>
        ) : (
          <>
            {/* PIN Display */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ 
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: pin.length > i ? GOLD : "rgba(255,255,255,0.1)",
                  transition: "all 0.2s"
                }} />
              ))}
            </div>

            {/* Error message */}
            <div style={{ height: "2rem", color: "#E74C3C", fontSize: "0.9rem", marginBottom: "1rem" }}>
              {status === "ERROR" ? message : ""}
              {status === "LOADING" ? "Procesando..." : ""}
            </div>

            {/* Keypad */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(k => (
                <KeypadBtn key={k} value={k} onClick={() => handleKey(k)} disabled={status === "LOADING"} />
              ))}
              <div />
              <KeypadBtn value="0" onClick={() => handleKey("0")} disabled={status === "LOADING"} />
              <KeypadBtn value="DEL" onClick={() => handleKey("DEL")} disabled={status === "LOADING" || pin.length === 0} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function KeypadBtn({ value, onClick, disabled }: { value: string, onClick: () => void, disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        aspectRatio: "1",
        borderRadius: "50%",
        border: value === "DEL" ? "none" : "1px solid rgba(200,169,110,0.3)",
        background: value === "DEL" ? "rgba(231,76,60,0.1)" : "rgba(255,255,255,0.02)",
        color: value === "DEL" ? "#E74C3C" : "#F5F0E8",
        fontSize: value === "DEL" ? "1rem" : "1.8rem",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.1s",
        opacity: disabled ? 0.5 : 1,
      }}
      onPointerDown={(e) => {
        if (!disabled) e.currentTarget.style.background = "rgba(200,169,110,0.2)";
      }}
      onPointerUp={(e) => {
        if (!disabled) e.currentTarget.style.background = value === "DEL" ? "rgba(231,76,60,0.1)" : "rgba(255,255,255,0.02)";
      }}
      onPointerLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = value === "DEL" ? "rgba(231,76,60,0.1)" : "rgba(255,255,255,0.02)";
      }}
    >
      {value}
    </button>
  );
}
