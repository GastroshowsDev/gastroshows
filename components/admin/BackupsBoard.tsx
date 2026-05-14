"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type BackupStatus = "RUNNING" | "SUCCESS" | "FAILED";

type Backup = {
  id: string;
  createdAt: string;
  triggeredBy: string;
  status: BackupStatus;
  sizeBytes: number | null;
  rowCount: number | null;
  error: string | null;
};

type TableStat = {
  name: string;
  label: string;
  size: string;
  rowCount: number;
  deadRows: number;
  lastAutovacuum: string | null;
  lastAutoanalyze: string | null;
};

type DBStats = {
  dbSize: string;
  cacheHitRatio: number | null;
  activeConnections: number;
  tables: TableStat[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit", month: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

function nextBackupTime(): string {
  const now = new Date();
  const next = new Date();
  next.setDate(now.getHours() >= 1 ? now.getDate() + 1 : now.getDate());
  next.setHours(1, 0, 0, 0); // 01:00 UTC = 02:00 hora peninsular
  const diff = next.getTime() - now.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return `En ${h}h ${m}min`;
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: BackupStatus }) {
  const map = {
    SUCCESS: { label: "Completado", bg: "#DCFCE7", color: "#16A34A", icon: "✓" },
    FAILED:  { label: "Error",      bg: "#FEE2E2", color: "#DC2626", icon: "✗" },
    RUNNING: { label: "En curso…",  bg: "#FEF3C7", color: "#D97706", icon: "◌" },
  };
  const s = map[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.3rem",
      padding: "2px 8px", borderRadius: 12,
      fontSize: "0.72rem", fontWeight: 600,
      background: s.bg, color: s.color,
    }}>
      <span style={{ animation: status === "RUNNING" ? "spin 1.2s linear infinite" : undefined }}>
        {s.icon}
      </span>
      {s.label}
    </span>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: "var(--color-admin-surface)",
      border: "1px solid var(--color-admin-border)",
      borderRadius: 10, padding: "1rem 1.25rem",
      display: "flex", flexDirection: "column", gap: "0.25rem",
      flex: "1 1 180px",
    }}>
      <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: "0.7rem", color: "var(--color-admin-muted)" }}>{sub}</div>
      )}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ borderBottom: "1px solid var(--color-admin-border)", paddingBottom: "0.6rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-admin-text)" }}>{title}</div>
      {description && (
        <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginTop: "0.15rem" }}>{description}</div>
      )}
    </div>
  );
}

// ── Config row ────────────────────────────────────────────────────────────────

function ConfigRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      padding: "0.65rem 0", borderBottom: "1px solid var(--color-admin-border)",
      gap: "1rem",
    }}>
      <div>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-admin-text)" }}>{label}</div>
        {note && <div style={{ fontSize: "0.7rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>{note}</div>}
      </div>
      <div style={{
        fontSize: "0.8rem", fontWeight: 500, color: "var(--color-admin-accent)",
        background: "var(--color-admin-accent-light)", padding: "2px 10px",
        borderRadius: 12, whiteSpace: "nowrap" as const, flexShrink: 0,
      }}>
        {value}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function BackupsBoard() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [stats, setStats] = useState<DBStats | null>(null);
  const [loadingBackups, setLoadingBackups] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmRestoreId, setConfirmRestoreId] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadBackups = useCallback(async () => {
    const res = await fetch("/api/admin/backups");
    const json = await res.json() as { ok: boolean; data?: Backup[] };
    if (json.ok && json.data) setBackups(json.data);
    setLoadingBackups(false);
  }, []);

  const loadStats = useCallback(async () => {
    const res = await fetch("/api/admin/backups/stats");
    const json = await res.json() as { ok: boolean; data?: DBStats };
    if (json.ok && json.data) setStats(json.data);
    setLoadingStats(false);
  }, []);

  useEffect(() => {
    void loadBackups();
    void loadStats();
  }, [loadBackups, loadStats]);

  // Polling while a backup is RUNNING
  useEffect(() => {
    const hasRunning = backups.some((b) => b.status === "RUNNING");
    if (hasRunning && !pollRef.current) {
      pollRef.current = setInterval(() => void loadBackups(), 4_000);
    }
    if (!hasRunning && pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    return () => {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    };
  }, [backups, loadBackups]);

  async function handleCreate() {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/backups", { method: "POST" });
      const json = await res.json() as { ok: boolean; error?: string };
      if (!json.ok) { setError(json.error ?? "Error al crear el backup"); return; }
      await loadBackups();
    } finally {
      setCreating(false);
    }
  }

  async function handleDownload(id: string) {
    setDownloadingId(id);
    try {
      const res = await fetch(`/api/admin/backups/${id}`);
      if (!res.ok) { setError("No se pudo descargar el backup"); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const cd = res.headers.get("content-disposition") ?? "";
      const match = /filename="([^"]+)"/.exec(cd);
      a.href = url;
      a.download = match?.[1] ?? `backup_${id.slice(0, 8)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingId(null);
    }
  }

  async function handleRestore(id: string) {
    setRestoringId(id);
    setConfirmRestoreId(null);
    try {
      const res = await fetch(`/api/admin/backups/${id}/restore`, { method: "POST" });
      const json = await res.json() as { ok: boolean; error?: string };
      if (json.ok) {
        alert("Restauración completada con éxito. La página se recargará.");
        window.location.reload();
      } else {
        setError(json.error ?? "Error al restaurar el backup");
      }
    } catch (e) {
      setError("Error de red al restaurar");
    } finally {
      setRestoringId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      await fetch(`/api/admin/backups/${id}`, { method: "DELETE" });
      setBackups((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  // Derived stats
  const lastSuccess = backups.find((b) => b.status === "SUCCESS");
  const successCount = backups.filter((b) => b.status === "SUCCESS").length;

  return (
    <>
      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)", margin: 0 }}>
            Backups y base de datos
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.25rem" }}>
            Copia de seguridad automática diaria. Se conservan los últimos 14 días.
          </p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 8, fontSize: "0.82rem", color: "#DC2626" }}>
            {error}
            <button onClick={() => setError(null)} style={{ marginLeft: "0.75rem", background: "none", border: "none", cursor: "pointer", color: "#DC2626", fontWeight: 700 }}>✕</button>
          </div>
        )}

        {/* Stat cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <StatCard
            label="Último backup"
            value={lastSuccess ? fmtDateShort(lastSuccess.createdAt) : "Ninguno"}
            sub={lastSuccess ? `${fmtBytes(lastSuccess.sizeBytes)} · ${(lastSuccess.rowCount ?? 0).toLocaleString("es-ES")} registros` : "Haz el primer backup ahora"}
          />
          <StatCard
            label="Próximo automático"
            value={nextBackupTime()}
            sub="Cada día a las 02:00"
          />
          <StatCard
            label="Backups guardados"
            value={`${successCount} / 14`}
            sub="Retención: 14 días"
          />
          <StatCard
            label="Tamaño de la BD"
            value={loadingStats ? "…" : (stats?.dbSize ?? "—")}
            sub={stats ? `Caché: ${stats.cacheHitRatio ?? "—"}% · Conexiones: ${stats.activeConnections}` : undefined}
          />
        </div>

        {/* Create backup */}
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 10, padding: "1.25rem",
        }}>
          <SectionHeader
            title="Crear backup manual"
            description="Genera una copia de todos los datos en este momento. Puedes descargarlo como fichero JSON."
          />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => void handleCreate()}
              disabled={creating || backups.some((b) => b.status === "RUNNING")}
              style={{
                padding: "0.55rem 1.25rem", borderRadius: 8,
                background: creating ? "var(--color-admin-border)" : "var(--color-admin-accent)",
                color: creating ? "var(--color-admin-muted)" : "#fff",
                border: "none", fontSize: "0.85rem", fontWeight: 600,
                cursor: creating ? "not-allowed" : "pointer", transition: "all 0.15s",
              }}
            >
              {creating ? "Creando backup…" : backups.some((b) => b.status === "RUNNING") ? "Backup en curso…" : "＋ Crear backup ahora"}
            </button>
            <span style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>
              El proceso tarda unos segundos. No cierres esta página.
            </span>
          </div>
        </div>

        {/* Backup list */}
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 10, padding: "1.25rem",
        }}>
          <SectionHeader
            title={`Historial de backups (${backups.length})`}
            description="Haz clic en Descargar para guardar una copia en tu ordenador."
          />

          {loadingBackups ? (
            <p style={{ fontSize: "0.82rem", color: "var(--color-admin-muted)", textAlign: "center", padding: "2rem" }}>Cargando…</p>
          ) : backups.length === 0 ? (
            <p style={{ fontSize: "0.82rem", color: "var(--color-admin-muted)", textAlign: "center", padding: "2rem" }}>
              No hay backups todavía. Crea el primero con el botón de arriba.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr>
                    {["Fecha", "Creado por", "Estado", "Registros", "Tamaño", "Acciones"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: "0.5rem 0.75rem",
                        borderBottom: "1px solid var(--color-admin-border)",
                        fontSize: "0.7rem", fontWeight: 700, color: "var(--color-admin-muted)",
                        textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                      <td style={{ padding: "0.65rem 0.75rem", whiteSpace: "nowrap", color: "var(--color-admin-text)", fontWeight: 500 }}>
                        {fmtDate(b.createdAt)}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--color-admin-muted)" }}>
                        {b.triggeredBy === "auto" ? "Automático" : b.triggeredBy}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>
                        <StatusBadge status={b.status} />
                        {b.status === "FAILED" && b.error && (
                          <div style={{ fontSize: "0.68rem", color: "#DC2626", marginTop: "0.2rem", maxWidth: 200 }}>{b.error}</div>
                        )}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--color-admin-muted)" }}>
                        {b.rowCount != null ? b.rowCount.toLocaleString("es-ES") : "—"}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--color-admin-muted)" }}>
                        {fmtBytes(b.sizeBytes)}
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                              <button
                                onClick={() => void handleDownload(b.id)}
                                disabled={downloadingId === b.id}
                                style={{
                                  padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600,
                                  border: "1px solid var(--color-admin-accent)", color: "var(--color-admin-accent)",
                                  background: "transparent", cursor: "pointer",
                                }}
                              >
                                {downloadingId === b.id ? "…" : "↓ Descargar"}
                              </button>
                              
                              {confirmRestoreId === b.id ? (
                                <>
                                  <button
                                    onClick={() => void handleRestore(b.id)}
                                    disabled={restoringId === b.id}
                                    style={{
                                      padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600,
                                      border: "1px solid #D97706", color: "#fff", background: "#D97706", cursor: "pointer",
                                    }}
                                  >
                                    {restoringId === b.id ? "Restaurando..." : "¡Confirmar Restauración!"}
                                  </button>
                                  <button
                                    onClick={() => setConfirmRestoreId(null)}
                                    style={{
                                      padding: "3px 8px", borderRadius: 6, fontSize: "0.72rem",
                                      border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)",
                                      background: "transparent", cursor: "pointer",
                                    }}
                                  >
                                    Cancelar
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setConfirmRestoreId(b.id)}
                                  disabled={restoringId !== null}
                                  style={{
                                    padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600,
                                    border: "1px solid #D97706", color: "#D97706",
                                    background: "transparent", cursor: "pointer",
                                  }}
                                >
                                  Restaurar
                                </button>
                              )}
                          {confirmDeleteId === b.id ? (
                            <>
                              <button
                                onClick={() => void handleDelete(b.id)}
                                disabled={deletingId === b.id}
                                style={{
                                  padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600,
                                  border: "1px solid #DC2626", color: "#fff", background: "#DC2626", cursor: "pointer",
                                }}
                              >
                                {deletingId === b.id ? "…" : "Confirmar"}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                style={{
                                  padding: "3px 8px", borderRadius: 6, fontSize: "0.72rem",
                                  border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)",
                                  background: "transparent", cursor: "pointer",
                                }}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(b.id)}
                              style={{
                                padding: "3px 8px", borderRadius: 6, fontSize: "0.72rem",
                                border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)",
                                background: "transparent", cursor: "pointer",
                              }}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* DB Stats */}
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 10, padding: "1.25rem",
        }}>
          <SectionHeader
            title="Estado de las tablas"
            description="Información en tiempo real sobre el tamaño y salud de cada tabla de la base de datos."
          />

          {loadingStats ? (
            <p style={{ fontSize: "0.82rem", color: "var(--color-admin-muted)", textAlign: "center", padding: "2rem" }}>Cargando estadísticas…</p>
          ) : !stats || stats.tables.length === 0 ? (
            <p style={{ fontSize: "0.82rem", color: "var(--color-admin-muted)", textAlign: "center", padding: "2rem" }}>Sin datos</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr>
                    {["Tabla", "Registros activos", "Filas eliminadas", "Tamaño", "Último mantenimiento"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: "0.5rem 0.75rem",
                        borderBottom: "1px solid var(--color-admin-border)",
                        fontSize: "0.7rem", fontWeight: 700, color: "var(--color-admin-muted)",
                        textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.tables.map((t, idx) => (
                    <tr key={`table-${idx}`} style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                      <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600, color: "var(--color-admin-text)" }}>
                        {t.label}
                        <div style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", fontWeight: 400 }}>{t.name}</div>
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", color: "var(--color-admin-text)" }}>
                        {t.rowCount.toLocaleString("es-ES")}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>
                        {t.deadRows > 0 ? (
                          <span style={{ color: t.deadRows > 1000 ? "#D97706" : "var(--color-admin-muted)" }}>
                            {t.deadRows.toLocaleString("es-ES")}
                            {t.deadRows > 1000 && " ⚠"}
                          </span>
                        ) : (
                          <span style={{ color: "var(--color-admin-muted)" }}>0</span>
                        )}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", color: "var(--color-admin-muted)", whiteSpace: "nowrap" }}>
                        {t.size}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>
                        {t.lastAutovacuum
                          ? fmtDateShort(t.lastAutovacuum)
                          : <span style={{ color: "#D97706" }}>Sin ejecutar aún</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: "0.7rem", color: "var(--color-admin-muted)", marginTop: "0.75rem" }}>
                Las filas eliminadas se limpian automáticamente por el sistema de mantenimiento de PostgreSQL (autovacuum). Si hay muchas acumuladas, el sistema las limpiará en la siguiente pasada.
              </p>
            </div>
          )}
        </div>

        {/* Configuration */}
        <div style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: 10, padding: "1.25rem",
        }}>
          <SectionHeader
            title="Configuración"
            description="Parámetros actuales del sistema de backups y la base de datos."
          />
          <ConfigRow
            label="Backup automático"
            value="02:00 cada día"
            note="Se ejecuta automáticamente de madrugada sin necesidad de intervención."
          />
          <ConfigRow
            label="Retención de backups"
            value="14 días"
            note="Los backups con más de 14 días se eliminan automáticamente para liberar espacio."
          />
          <ConfigRow
            label="Formato de exportación"
            value="JSON"
            note="Incluye clientes, reservas, eventos, bonos, pagos, plantillas y promociones. Las contraseñas nunca se exportan."
          />
          <ConfigRow
            label="Almacenamiento"
            value="Base de datos"
            note="Los backups se guardan en la propia base de datos PostgreSQL (Supabase)."
          />
          <ConfigRow
            label="Motor de base de datos"
            value="PostgreSQL"
            note="Gestionado por Supabase con alta disponibilidad y copias de seguridad de infraestructura propias."
          />
          <ConfigRow
            label="Tamaño de la BD"
            value={loadingStats ? "…" : (stats?.dbSize ?? "—")}
            note="Tamaño total incluyendo índices y tablas del sistema."
          />
          <div style={{ paddingTop: "0.65rem" }}>
            <ConfigRow
              label="Eficiencia de caché"
              value={stats?.cacheHitRatio != null ? `${stats.cacheHitRatio}%` : "—"}
              note="Porcentaje de consultas resueltas desde memoria sin acceder al disco. Por encima del 90% es óptimo."
            />
          </div>
        </div>

      </div>
    </>
  );
}
