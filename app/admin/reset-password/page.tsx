"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Las contraseñas no coinciden"); return; }
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres"); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const json = await res.json() as { ok: boolean; error?: string };
    setLoading(false);
    if (!json.ok) { setError(json.error ?? "Error al restablecer"); return; }
    setSuccess(true);
    setTimeout(() => router.push("/admin/login"), 2000);
  }

  if (!token) return (
    <p style={{ color: "#DC2626", textAlign: "center" }}>Token inválido o faltante.</p>
  );

  return (
    <form onSubmit={(e) => void handleSubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {success ? (
        <p style={{ color: "#16A34A", textAlign: "center" }}>✓ Contraseña restablecida. Redirigiendo…</p>
      ) : (
        <>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>Nueva contraseña</label>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>Confirmar contraseña</label>
            <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const }} />
          </div>
          {error && <p style={{ color: "#DC2626", fontSize: "0.82rem", padding: "0.5rem 0.75rem", background: "#FEE2E2", borderRadius: 6 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: "0.6rem", borderRadius: 6, background: "#7C3AED", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Guardando…" : "Establecer contraseña"}
          </button>
        </>
      )}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1E293B" }}>Nueva contraseña</h1>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <a href="/admin/login" style={{ fontSize: "0.78rem", color: "#6B7280" }}>Volver al acceso</a>
        </div>
      </div>
    </main>
  );
}
