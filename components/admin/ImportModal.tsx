"use client";

import { useState, useRef, useCallback } from "react";
import type { ImportRow } from "@/app/api/admin/import/reservations/route";
import type { ContactImportRow } from "@/app/api/admin/import/contacts/route";

// ── Column auto-detection patterns (Turitop headers) ────────────────────────
const PATTERNS: Record<string, RegExp> = {
  name:          /^(nombre|name|cliente?|customer|participante|asistente)$/i,
  email:         /^(e?-?mail|correo)$/i,
  phone:         /^(tel[eé]?fono?|phone|m[oó]vil|celular?|cel)$/i,
  date:          /^(fecha|date|d[ií]a)$/i,
  time:          /^(hora|time|sesi[oó]n|session|turno|horario)$/i,
  guests:        /^(plazas|personas?|pax|adultos?|guests?|cantidad|asistentes?)$/i,
  totalAmount:   /^(total|importe|precio|amount|coste?|price)$/i,
  paidAmount:    /^(pagado|paid|abonado|cobrado)$/i,
  status:        /^(estado|status)$/i,
  type:          /^(tipo|type|modalidad)$/i,
  allergies:     /^(alergia|alergias|allergies?|intolerancias?)$/i,
  comments:      /^(comentario|nota|comment|observaci[oó]n|notas?)$/i,
  venueName:     /^(local|venue|sala|lugar|espacio)$/i,
  previousVisit: /^(visita\s?anterior|recurrente|repeat|repetidor)$/i,
  newsletter:    /^(newsletter|boletin|boletin|marketing|comunicaciones?)$/i,
  source:        /^(fuente|origen|source|canal)$/i,
};

function autoDetect(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const h of headers) {
    for (const [field, re] of Object.entries(PATTERNS)) {
      if (re.test(h.trim()) && !(field in map)) {
        map[field] = h;
        break;
      }
    }
  }
  return map;
}

// ── Value normalisation helpers ──────────────────────────────────────────────
function parseDate(raw: unknown): string | null {
  if (!raw) return null;
  const s = String(raw).trim();
  // DD/MM/YYYY or DD-MM-YYYY
  const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) return `${dmy[3]}-${dmy[2].padStart(2,"0")}-${dmy[1].padStart(2,"0")}`;
  // YYYY-MM-DD or YYYY/MM/DD
  const ymd = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (ymd) return `${ymd[1]}-${ymd[2].padStart(2,"0")}-${ymd[3].padStart(2,"0")}`;
  // Excel serial number (days since 1900-01-01 with Lotus 1900 bug)
  const num = Number(raw);
  if (!isNaN(num) && num > 40000 && num < 60000) {
    const d = new Date(Math.round((num - 25569) * 86400 * 1000));
    return d.toISOString().slice(0, 10);
  }
  return null;
}

function parseShift(raw: unknown): "NOON" | "NIGHT" | null {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (/^(mediod[ií]a|noon|14|13|12|lunch)/.test(s)) return "NOON";
  if (/^(noche|night|21|20|19|18|dinner|cena)/.test(s)) return "NIGHT";
  // "HH:MM" format
  const hm = s.match(/^(\d{1,2}):?\d{0,2}$/);
  if (hm) return parseInt(hm[1]) < 17 ? "NOON" : "NIGHT";
  return null;
}

function parseStatus(raw: unknown): "PENDING" | "CONFIRMED" | "CANCELLED" {
  const s = String(raw ?? "").trim().toLowerCase();
  if (/^(confirm|confirmad|ok|paid|pagad)/.test(s)) return "CONFIRMED";
  if (/^(cancel|cancelad)/.test(s)) return "CANCELLED";
  return "PENDING";
}

function parseVenue(raw: unknown): "URGELL" | "BERTRAND" | null {
  const s = String(raw ?? "").trim().toUpperCase();
  if (s.includes("URGELL")) return "URGELL";
  if (s.includes("BERTRAND") || s.includes("SARRIA") || s.includes("SARRIÀ")) return "BERTRAND";
  return null;
}

function parseBool(raw: unknown): boolean {
  const s = String(raw ?? "").trim().toLowerCase();
  return /^(s[ií]|yes|true|1|x)$/.test(s);
}

// ── Types ────────────────────────────────────────────────────────────────────
export type ImportMode = "reservations" | "contacts";

type Props = {
  mode: ImportMode;
  onClose: () => void;
  onImported?: () => void;
};

type Step = "upload" | "preview" | "result";

type ParsedFile = {
  headers: string[];
  rows: Record<string, unknown>[];
};

type ImportResult = {
  created: number;
  updated?: number;
  skipped: number;
  errors: string[];
};

const FIELDS_RESERVATIONS = [
  { key: "name",        label: "Nombre",     required: true },
  { key: "email",       label: "Email",      required: false },
  { key: "phone",       label: "Teléfono",   required: false },
  { key: "date",        label: "Fecha",      required: true },
  { key: "time",        label: "Hora/Turno", required: true },
  { key: "guests",      label: "Personas",   required: true },
  { key: "totalAmount", label: "Total (€)",  required: false },
  { key: "paidAmount",  label: "Pagado (€)", required: false },
  { key: "status",      label: "Estado",     required: false },
  { key: "venueName",   label: "Local",      required: false },
  { key: "allergies",   label: "Alergias",   required: false },
  { key: "comments",    label: "Comentarios",required: false },
];

const FIELDS_CONTACTS = [
  { key: "name",         label: "Nombre",       required: true },
  { key: "email",        label: "Email",         required: false },
  { key: "phone",        label: "Teléfono",      required: false },
  { key: "allergies",    label: "Alergias",      required: false },
  { key: "comments",     label: "Comentarios",   required: false },
  { key: "previousVisit",label: "Visita anterior",required: false },
  { key: "newsletter",   label: "Newsletter",    required: false },
  { key: "source",       label: "Fuente",        required: false },
];

// ── Styles ───────────────────────────────────────────────────────────────────
const overlay: React.CSSProperties = {
  position: "fixed", inset: 0, zIndex: 500,
  background: "rgba(0,0,0,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "1rem",
};
const modal: React.CSSProperties = {
  background: "var(--color-admin-surface)",
  border: "1px solid var(--color-admin-border)",
  borderRadius: 12,
  width: "100%", maxWidth: 680,
  maxHeight: "90vh",
  display: "flex", flexDirection: "column",
  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  overflow: "hidden",
};
const btnPrimary: React.CSSProperties = {
  padding: "0.5rem 1.25rem", borderRadius: 8, border: "none",
  background: "var(--color-admin-accent)", color: "#fff",
  fontSize: "0.83rem", fontWeight: 600, cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  padding: "0.5rem 1rem", borderRadius: 8,
  border: "1px solid var(--color-admin-border)",
  background: "transparent", color: "var(--color-admin-muted)",
  fontSize: "0.83rem", cursor: "pointer",
};

// ── Main component ────────────────────────────────────────────────────────────
export function ImportModal({ mode, onClose, onImported }: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fields = mode === "reservations" ? FIELDS_RESERVATIONS : FIELDS_CONTACTS;
  const title = mode === "reservations" ? "Importar reservas" : "Importar contactos";
  const endpoint = mode === "reservations"
    ? "/api/admin/import/reservations"
    : "/api/admin/import/contacts";

  const processFile = useCallback(async (file: File) => {
    setLoading(true);
    try {
      // Dynamic import to avoid bloating the initial bundle
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array", cellDates: false });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
        defval: "",
        raw: true,
      });
      if (raw.length === 0) { alert("El archivo está vacío"); return; }
      const headers = Object.keys(raw[0]);
      const detected = autoDetect(headers);
      setParsed({ headers, rows: raw });
      setMapping(detected);
      setStep("preview");
    } catch {
      alert("No se pudo leer el archivo. Asegúrate de que es un .xlsx válido.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleFiles(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    void processFile(f);
  }

  async function handleImport() {
    if (!parsed) return;
    setLoading(true);
    try {
      const rows = parsed.rows.map((raw) => {
        if (mode === "reservations") {
          const r: Partial<ImportRow> = {};
          r.name        = String(raw[mapping.name] ?? "").trim();
          r.email       = mapping.email ? String(raw[mapping.email] ?? "").trim() : undefined;
          r.phone       = mapping.phone ? String(raw[mapping.phone] ?? "").trim() : undefined;
          r.date        = parseDate(mapping.date ? raw[mapping.date] : undefined) ?? "";
          r.shift       = parseShift(mapping.time ? raw[mapping.time] : undefined) ?? "NIGHT";
          r.guests      = parseInt(String(mapping.guests ? raw[mapping.guests] : "0")) || 0;
          r.totalAmount = mapping.totalAmount ? parseFloat(String(raw[mapping.totalAmount] ?? "0")) || 0 : undefined;
          r.paidAmount  = mapping.paidAmount  ? parseFloat(String(raw[mapping.paidAmount] ?? "0")) || 0 : undefined;
          r.status      = mapping.status ? parseStatus(raw[mapping.status]) : undefined;
          r.venueName   = mapping.venueName ? parseVenue(raw[mapping.venueName]) : undefined;
          r.allergies   = mapping.allergies ? String(raw[mapping.allergies] ?? "").trim() : undefined;
          r.comments    = mapping.comments  ? String(raw[mapping.comments] ?? "").trim() : undefined;
          return r as ImportRow;
        } else {
          const r: Partial<ContactImportRow> = {};
          r.name         = String(raw[mapping.name] ?? "").trim();
          r.email        = mapping.email    ? String(raw[mapping.email] ?? "").trim()    : undefined;
          r.phone        = mapping.phone    ? String(raw[mapping.phone] ?? "").trim()    : undefined;
          r.allergies    = mapping.allergies? String(raw[mapping.allergies] ?? "").trim(): undefined;
          r.comments     = mapping.comments ? String(raw[mapping.comments] ?? "").trim() : undefined;
          r.previousVisit= mapping.previousVisit ? parseBool(raw[mapping.previousVisit]) : undefined;
          r.newsletter   = mapping.newsletter    ? parseBool(raw[mapping.newsletter])    : undefined;
          r.source       = mapping.source        ? String(raw[mapping.source] ?? "").trim() : undefined;
          return r as ContactImportRow;
        }
      }).filter((r) => r.name);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const json = await res.json() as ImportResult & { ok: boolean; error?: string };
      if (!json.ok) { alert(json.error ?? "Error en la importación"); return; }
      setResult(json);
      setStep("result");
      onImported?.();
    } catch {
      alert("Error de red al importar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-admin-border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--color-admin-text)" }}>{title}</div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-admin-muted)", marginTop: 2 }}>
              {step === "upload" && "Sube un archivo Excel (.xlsx) exportado de Turitop"}
              {step === "preview" && `${parsed?.rows.length ?? 0} filas detectadas · Ajusta el mapeo si es necesario`}
              {step === "result" && "Importación completada"}
            </div>
          </div>
          <button onClick={onClose} style={{ ...btnGhost, padding: "0.3rem 0.6rem", fontSize: "1rem" }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>

          {/* ── Step 1: Upload ── */}
          {step === "upload" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
                borderRadius: 10,
                padding: "3rem 2rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.15s",
                background: dragOver ? "var(--color-admin-accent-light)" : "var(--color-admin-bg)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
              <div style={{ fontWeight: 600, color: "var(--color-admin-text)", marginBottom: "0.3rem" }}>
                {loading ? "Procesando…" : "Arrastra aquí tu archivo .xlsx"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>
                o haz clic para seleccionar
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          )}

          {/* ── Step 2: Preview + mapping ── */}
          {step === "preview" && parsed && (
            <>
              {/* Column mapping */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-admin-accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Mapeo de columnas
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.25rem" }}>
                  {fields.map(({ key, label, required }) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.76rem", color: "var(--color-admin-muted)", width: 120, flexShrink: 0 }}>
                        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
                      </span>
                      <select
                        value={mapping[key] ?? ""}
                        onChange={(e) => setMapping((m) => ({ ...m, [key]: e.target.value }))}
                        style={{
                          flex: 1, padding: "0.3rem 0.5rem", borderRadius: 6,
                          border: "1px solid var(--color-admin-border)",
                          background: "var(--color-admin-bg)",
                          color: mapping[key] ? "var(--color-admin-text)" : "var(--color-admin-muted)",
                          fontSize: "0.76rem", outline: "none",
                        }}
                      >
                        <option value="">— No importar —</option>
                        {parsed.headers.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview table (first 5 rows) */}
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-admin-accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Vista previa (primeras 5 filas)
              </div>
              <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--color-admin-border)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.73rem" }}>
                  <thead>
                    <tr style={{ background: "var(--color-admin-bg)" }}>
                      {fields.filter((f) => mapping[f.key]).map((f) => (
                        <th key={f.key} style={{ padding: "0.4rem 0.6rem", textAlign: "left", color: "var(--color-admin-muted)", fontWeight: 600, borderBottom: "1px solid var(--color-admin-border)", whiteSpace: "nowrap" }}>
                          {f.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.rows.slice(0, 5).map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                        {fields.filter((f) => mapping[f.key]).map((f) => (
                          <td key={f.key} style={{ padding: "0.4rem 0.6rem", color: "var(--color-admin-text)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {String(row[mapping[f.key]] ?? "—")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── Step 3: Result ── */}
          {step === "result" && result && (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-admin-text)", marginBottom: "0.5rem" }}>
                Importación completada
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#16A34A" }}>{result.created}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>creadas</div>
                </div>
                {result.updated !== undefined && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0891B2" }}>{result.updated}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>actualizadas</div>
                  </div>
                )}
                {result.errors.length > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#EF4444" }}>{result.errors.length}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>errores</div>
                  </div>
                )}
              </div>
              {result.errors.length > 0 && (
                <div style={{ marginTop: "1rem", textAlign: "left", background: "var(--color-admin-bg)", borderRadius: 8, padding: "0.75rem", maxHeight: 140, overflowY: "auto" }}>
                  {result.errors.map((e, i) => (
                    <div key={i} style={{ fontSize: "0.74rem", color: "#EF4444", marginBottom: 2 }}>{e}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "0.875rem 1.25rem",
          borderTop: "1px solid var(--color-admin-border)",
          display: "flex", justifyContent: "flex-end", gap: "0.5rem",
          flexShrink: 0, background: "var(--color-admin-surface)",
        }}>
          {step === "upload" && (
            <button onClick={onClose} style={btnGhost}>Cancelar</button>
          )}
          {step === "preview" && (
            <>
              <button onClick={() => setStep("upload")} style={btnGhost}>Volver</button>
              <button
                onClick={() => void handleImport()}
                disabled={loading || !fields.filter((f) => f.required).every((f) => mapping[f.key])}
                style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Importando…" : `Importar ${parsed?.rows.length ?? 0} filas`}
              </button>
            </>
          )}
          {step === "result" && (
            <button onClick={onClose} style={btnPrimary}>Cerrar</button>
          )}
        </div>
      </div>
    </div>
  );
}
