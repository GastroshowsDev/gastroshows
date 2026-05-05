"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { type VenueName } from "@prisma/client";
import type { ReservaRow } from "@/app/admin/reservas/page";
import { ImportModal } from "@/components/admin/ImportModal";
import { VenueSelectionModal } from "@/components/admin/VenueSelectionModal";

type TimeFilter = "upcoming" | "today" | "week" | "month" | "next-month" | "all" | "past" | "past-2w";
type VenueFilter = "all" | "URGELL" | "BERTRAND";
type ShiftFilter = "all" | "NOON" | "NIGHT";

const TIME_LABEL: Record<TimeFilter, string> = {
  upcoming:   "Próximas",
  today:      "Hoy",
  week:       "Esta semana",
  month:      "Este mes",
  "next-month": "Próximo mes",
  all:        "Todas",
  past:       "Pasadas",
  "past-2w":  "Últimas 2 semanas",
};
type StatusKey = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CANCELLED" | "PAYMENT_FAILED";

const STATUS_LABEL: Record<StatusKey, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CHECKED_IN: "En sala",
  CANCELLED: "Cancelada",
  PAYMENT_FAILED: "Pago fallido",
};

const STATUS_COLOR: Record<StatusKey, { bg: string; color: string }> = {
  PENDING:       { bg: "#FEF3C7", color: "#D97706" },
  CONFIRMED:     { bg: "#DCFCE7", color: "#16A34A" },
  CHECKED_IN:    { bg: "#F0EBFE", color: "#875BF7" },
  CANCELLED:     { bg: "#F1F5F9", color: "#6B7280" },
  PAYMENT_FAILED:{ bg: "#FEE2E2", color: "#DC2626" },
};

const VENUE_COLOR: Record<string, { bg: string; color: string }> = {
  BERTRAND: { bg: "#CFFAFE", color: "#0891B2" },
  SARRIA:   { bg: "#CFFAFE", color: "#0891B2" },
  URGELL:   { bg: "#EDE9FE", color: "#7C3AED" },
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return [
    d.getDate().toString().padStart(2, "0"),
    (d.getMonth() + 1).toString().padStart(2, "0"),
    d.getFullYear(),
  ].join("/");
}

/** yyyy-mm-dd for <input type="date"> */
function toDateInput(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

function dateMatchesQuery(iso: string, q: string) {
  return fmtDate(iso).includes(q);
}

const S = {
  toolbar: {
    padding: "0.75rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderBottom: "1px solid var(--color-admin-border)",
    flexShrink: 0,
    flexWrap: "wrap" as const,
    background: "var(--color-admin-surface)",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "var(--color-admin-surface)",
    border: "1px solid var(--color-admin-border)",
    borderRadius: "6px",
    padding: "0.4rem 0.75rem",
  },
  searchInput: {
    border: "none",
    background: "none",
    color: "var(--color-admin-text)",
    width: "200px",
    outline: "none",
    fontSize: "0.83rem",
  },
  chip: (active: boolean, color?: string) => ({
    padding: "0.3rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.76rem",
    fontWeight: 500,
    border: `1px solid ${active ? (color ?? "var(--color-admin-accent)") : "var(--color-admin-border)"}`,
    color: active ? "#fff" : "var(--color-admin-muted)",
    background: active ? (color ?? "var(--color-admin-accent)") : "var(--color-admin-surface)",
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  tableWrap: { overflowY: "auto" as const, flex: 1 },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.83rem" },
  th: {
    padding: "0.6rem 0.9rem",
    textAlign: "left" as const,
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "var(--color-admin-muted)",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid var(--color-admin-border)",
    background: "var(--color-admin-surface)",
    whiteSpace: "nowrap" as const,
  },
  td: {
    padding: "0.7rem 0.9rem",
    borderBottom: "1px solid var(--color-admin-border)",
    color: "var(--color-admin-text)",
    verticalAlign: "middle" as const,
  },
  btn: {
    padding: "0.4rem 1rem",
    borderRadius: "6px",
    border: "none",
    background: "var(--color-admin-accent)",
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.01em",
  },
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "var(--color-admin-surface)",
    borderRadius: "10px",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "90vh",
    overflowY: "auto" as const,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  },
  label: {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--color-admin-muted)",
    marginBottom: "0.3rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid var(--color-admin-border)",
    background: "var(--color-admin-bg)",
    color: "var(--color-admin-text)",
    fontSize: "0.85rem",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid var(--color-admin-border)",
    background: "var(--color-admin-bg)",
    color: "var(--color-admin-text)",
    fontSize: "0.85rem",
    outline: "none",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "var(--color-admin-accent)",
    textTransform: "uppercase" as const,
    marginBottom: "0.75rem",
  },
};

type ReservaForm = {
  name: string; email: string; phone: string; allergies: string;
  previousVisit: boolean; comments: string;
  date: string; shift: "NOON" | "NIGHT";
  venueName: "BERTRAND" | "URGELL" | "";
  guests: number; type: "NORMAL" | "GIFT";
  pricePerPax: number; paidAmount: number;
  status: StatusKey;
  groupRef?: string | null;
  mergedGroupId?: string | null;
};

const FORM_DEFAULT: ReservaForm = {
  name: "", email: "", phone: "", allergies: "",
  previousVisit: false, comments: "",
  date: "", shift: "NIGHT", venueName: "",
  guests: 2, type: "NORMAL",
  pricePerPax: 130, paidAmount: 0,
  status: "PENDING",
};

function rowToForm(r: ReservaRow): ReservaForm {
  return {
    name: r.customer.name,
    email: r.customer.email,
    phone: r.customer.phone,
    allergies: r.customer.allergies ?? "",
    previousVisit: r.customer.previousVisit,
    comments: r.customer.comments ?? "",
    date: toDateInput(r.event.date),
    shift: r.event.shift as "NOON" | "NIGHT",
    venueName: (r.venue?.name ?? "") as "BERTRAND" | "URGELL" | "",
    guests: r.guests,
    type: r.type as "NORMAL" | "GIFT",
    pricePerPax: r.guests > 0 ? Math.round(r.totalAmount / r.guests) : r.totalAmount,
    paidAmount: r.paidAmount,
    status: r.status as StatusKey,
  };
}

// ── Generic filter dropdown ────────────────────────────────────────────────────
function FilterDropdown<T extends string>({
  label, options, active, onSelect,
}: {
  label: string;
  options: { value: T; label: string }[];
  active: T | null;
  onSelect: (v: T | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const activeLabel = active ? options.find((o) => o.value === active)?.label : null;
  const isFiltered = active !== null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          padding: "0.3rem 0.75rem",
          borderRadius: "20px",
          fontSize: "0.76rem", fontWeight: 500,
          border: `1px solid ${isFiltered ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
          color: isFiltered ? "var(--color-admin-accent)" : "var(--color-admin-muted)",
          background: isFiltered ? "var(--color-admin-accent-light)" : "var(--color-admin-surface)",
          cursor: "pointer", transition: "all 0.15s",
        }}
      >
        {activeLabel ? `${label}: ${activeLabel}` : label}
        <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 100, minWidth: "160px", overflow: "hidden",
        }}>
          {isFiltered && (
            <button
              onClick={() => { onSelect(null); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.5rem 0.9rem", fontSize: "0.78rem",
                color: "var(--color-admin-muted)", background: "none",
                border: "none", borderBottom: "1px solid var(--color-admin-border)",
                cursor: "pointer",
              }}
            >
              ✕ Quitar filtro
            </button>
          )}
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => { onSelect(o.value); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.5rem 0.9rem", fontSize: "0.78rem",
                color: active === o.value ? "var(--color-admin-accent)" : "var(--color-admin-text)",
                fontWeight: active === o.value ? 600 : 400,
                background: active === o.value ? "var(--color-admin-accent-light)" : "none",
                border: "none", cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (active !== o.value) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-admin-bg)"; }}
              onMouseLeave={(e) => { if (active !== o.value) (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Inline badge-select for Status ────────────────────────────────────────────
function StatusSelect({ value, onChange }: { value: StatusKey; onChange: (v: StatusKey) => void }) {
  const c = STATUS_COLOR[value] ?? { bg: "#F1F5F9", color: "#6B7280" };
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as StatusKey)}
      onClick={(e) => e.stopPropagation()}
      style={{
        padding: "2px 8px",
        borderRadius: "14px",
        border: `1px solid ${c.color}`,
        background: c.bg,
        color: c.color,
        fontSize: "0.72rem",
        fontWeight: 600,
        cursor: "pointer",
        outline: "none",
      }}
    >
      {(Object.keys(STATUS_LABEL) as StatusKey[]).map((k) => (
        <option key={k} value={k}>{STATUS_LABEL[k]}</option>
      ))}
    </select>
  );
}

// ── Modal form (shared create / edit) ─────────────────────────────────────────
function ReservaModal({
  title,
  form,
  setField,
  onSubmit,
  onClose,
  saving,
  isEdit,
}: {
  title: string;
  form: ReservaForm;
  setField: <K extends keyof ReservaForm>(k: K, v: ReservaForm[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  saving: boolean;
  isEdit: boolean;
}) {
  const total = form.pricePerPax * form.guests;

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-admin-muted)" }}>✕</button>
        </div>

        <form onSubmit={(e) => void onSubmit(e)}>
          {/* Cliente */}
          <p style={S.sectionTitle}>Cliente</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div>
              <label style={S.label}>Nombre *</label>
              <input required style={S.input} value={form.name} onChange={(e) => setField("name", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Email {isEdit ? "" : "*"}</label>
              <input required={!isEdit} type="email" style={{ ...S.input, ...(isEdit && { background: "var(--color-admin-border)", color: "var(--color-admin-muted)", cursor: "default" }) }} readOnly={isEdit} value={form.email} onChange={(e) => !isEdit && setField("email", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Teléfono *</label>
              <input required style={S.input} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Alergias</label>
              <input style={S.input} value={form.allergies} onChange={(e) => setField("allergies", e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={S.label}>Comentarios</label>
            <input style={S.input} value={form.comments} onChange={(e) => setField("comments", e.target.value)} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--color-admin-text)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.previousVisit} onChange={(e) => setField("previousVisit", e.target.checked)} />
              Cliente recurrente (visita anterior)
            </label>
          </div>

          {/* Evento */}
          <p style={S.sectionTitle}>Evento</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={S.label}>Fecha *</label>
              <input required type="date" style={S.input} value={form.date} onChange={(e) => setField("date", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Turno *</label>
              <select style={S.select} value={form.shift} onChange={(e) => setField("shift", e.target.value as "NOON" | "NIGHT")}>
                <option value="NIGHT">Noche</option>
                <option value="NOON">Mediodía</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Local</label>
              <select style={S.select} value={form.venueName} onChange={(e) => setField("venueName", e.target.value as "BERTRAND" | "URGELL" | "")}>
                <option value="">Sin asignar</option>
                <option value="BERTRAND">Bertrand</option>
                <option value="URGELL">Urgell</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Pax *</label>
              <input required type="number" min={1} max={30} style={S.input} value={form.guests} onChange={(e) => setField("guests", Number(e.target.value))} />
            </div>
          </div>

          {/* Reserva */}
          <p style={S.sectionTitle}>Reserva</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={S.label}>Tipo</label>
              <select style={S.select} value={form.type} onChange={(e) => setField("type", e.target.value as "NORMAL" | "GIFT")}>
                <option value="NORMAL">Normal</option>
                <option value="GIFT">Regalo</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Estado</label>
              <select style={S.select} value={form.status} onChange={(e) => setField("status", e.target.value as StatusKey)}>
                {(Object.keys(STATUS_LABEL) as StatusKey[]).map((k) => (
                  <option key={k} value={k}>{STATUS_LABEL[k]}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={S.label}>Precio/pax (€) *</label>
              <input required type="number" min={0} step={1} style={S.input} value={form.pricePerPax} onChange={(e) => setField("pricePerPax", Number(e.target.value))} />
            </div>
            <div>
              <label style={S.label}>Total (€)</label>
              <input readOnly style={{ ...S.input, background: "var(--color-admin-border)", color: "var(--color-admin-muted)", cursor: "default" }} value={total} />
            </div>
            <div>
              <label style={S.label}>Pagado (€)</label>
              <input type="number" min={0} step={1} style={S.input} value={form.paidAmount} onChange={(e) => setField("paidAmount", Number(e.target.value))} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--color-admin-border)" }}>
            <button type="button" onClick={onClose} style={{ ...S.btn, background: "var(--color-admin-border)", color: "var(--color-admin-text)" }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} style={{ ...S.btn, opacity: saving ? 0.7 : 1 }}>
              {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear reserva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function ReservasTable({ reservas: initial, role = "ADMIN" }: { reservas: ReservaRow[]; role?: "ADMIN" | "LIVE" }) {
  const isAdmin = role === "ADMIN";
  const searchParams = useSearchParams();

  const [reservas, setReservas] = useState(initial);

  // Sincronizar estado cuando cambian las props (necesario para la paginación de servidor)
  useEffect(() => {
    setReservas(initial);
  }, [initial]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const [y, m, d] = dateParam.split("-");
      return `${d}/${m}/${y}`;
    }
    return "";
  });
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [venueFilter, setVenueFilter] = useState<VenueFilter>("all");
  const [shiftFilter, setShiftFilter] = useState<ShiftFilter>(() => {
    const s = searchParams.get("shift");
    return s === "NOON" || s === "NIGHT" ? s : "all";
  });
  const [paymentFilter, setPaymentFilter] = useState<"all" | "PAID" | "PARTIAL">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Create modal
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [createForm, setCreateForm] = useState<ReservaForm>(FORM_DEFAULT);
  const [creating, setCreating] = useState(false);

  // Edit modal
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ReservaForm>(FORM_DEFAULT);
  const [saving, setSaving] = useState(false);

  // Modal for forced venue selection
  const [modalReserva, setModalReserva] = useState<ReservaRow | null>(null);
  const [modalPendingStatus, setModalPendingStatus] = useState<StatusKey | null>(null);

  // Modal for group view
  const [groupViewId, setGroupViewId] = useState<string | null>(null);
  const groupReservations = useMemo(() => {
    if (!groupViewId) return [];
    return reservas.filter(r => r.mergedGroupId === groupViewId);
  }, [groupViewId, reservas]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = useMemo(() => {
    let list = reservas;

    const now = new Date();
    const weekEnd = new Date(today); weekEnd.setDate(today.getDate() + 7);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd   = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextMonthEnd   = new Date(today.getFullYear(), today.getMonth() + 2, 0, 23, 59, 59);
    const past2wStart = new Date(today); past2wStart.setDate(today.getDate() - 14);

    if (timeFilter === "today") {
      list = list.filter((r) => { const d = new Date(r.event.date); d.setHours(0,0,0,0); return d.getTime() === today.getTime(); });
    } else if (timeFilter === "upcoming") {
      list = list.filter((r) => new Date(r.event.date) >= today);
    } else if (timeFilter === "week") {
      list = list.filter((r) => { const d = new Date(r.event.date); return d >= today && d <= weekEnd; });
    } else if (timeFilter === "month") {
      list = list.filter((r) => { const d = new Date(r.event.date); return d >= monthStart && d <= monthEnd; });
    } else if (timeFilter === "next-month") {
      list = list.filter((r) => { const d = new Date(r.event.date); return d >= nextMonthStart && d <= nextMonthEnd; });
    } else if (timeFilter === "past") {
      list = list.filter((r) => new Date(r.event.date) < today);
    } else if (timeFilter === "past-2w") {
      list = list.filter((r) => { const d = new Date(r.event.date); return d >= past2wStart && d < today; });
    }
    // "all" → no date filter
    void now;

    if (venueFilter !== "all") {
      list = list.filter((r) => r.venue?.name === venueFilter);
    }
    if (shiftFilter !== "all") {
      list = list.filter((r) => r.event.shift === shiftFilter);
    }
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter((r) =>
        r.customer.name.toLowerCase().includes(q) ||
        r.customer.email.toLowerCase().includes(q) ||
        dateMatchesQuery(r.event.date, q)
      );
    }

    if (paymentFilter !== "all") {
      list = list.filter((r) => {
        const isPaid = r.paidAmount >= r.totalAmount && r.totalAmount > 0;
        return paymentFilter === "PAID" ? isPaid : !isPaid;
      });
    }

    // Sort by date
    list = [...list].sort((a, b) => {
      const da = new Date(a.event.date).getTime();
      const db = new Date(b.event.date).getTime();
      return sortOrder === "asc" ? da - db : db - da;
    });

    return list;
  }, [reservas, timeFilter, venueFilter, shiftFilter, search, paymentFilter, sortOrder, today]);

  // ── Selection helpers ────────────────────────────────────────────────────────
  const filteredIds = useMemo(() => new Set(filtered.map((r) => r.id)), [filtered]);
  const allSelected = filteredIds.size > 0 && [...filteredIds].every((id) => selectedIds.has(id));
  const someSelected = [...filteredIds].some((id) => selectedIds.has(id));
  const selectedCount = [...selectedIds].filter((id) => filteredIds.has(id)).length;

  function toggleAll() {
    if (allSelected) {
      setSelectedIds((prev) => { const next = new Set(prev); filteredIds.forEach((id) => next.delete(id)); return next; });
    } else {
      setSelectedIds((prev) => { const next = new Set(prev); filteredIds.forEach((id) => next.add(id)); return next; });
    }
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }

  // ── Inline venue change ──────────────────────────────────────────────────────
  async function handleVenueChange(reservaId: string, venueName: string) {
    const prev = reservas.find((r) => r.id === reservaId)?.venue?.name ?? null;
    const name = venueName as VenueName | "";
    setReservas((rs) => rs.map((r) => r.id === reservaId ? { ...r, venue: name ? { id: r.venue?.id ?? "", name: name as VenueName } : null } : r));
    const res = await fetch(`/api/reservations/${reservaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venueName: name || null }),
    });
    if (!res.ok) {
      setReservas((rs) => rs.map((r) => r.id === reservaId ? { ...r, venue: prev ? { id: r.venue?.id ?? "", name: prev as VenueName } : null } : r));
    }
  }

  // ── Inline status change ─────────────────────────────────────────────────────
  async function handleStatusChange(reservaId: string, status: StatusKey) {
    const row = reservas.find((r) => r.id === reservaId);
    if (!row) return;

    const prev = row.status as StatusKey;

    // Skip blocking modal for venue — confirmed without venue is now allowed
    /*
    if (status === "CONFIRMED" && !row.venue) {
      setModalReserva(row);
      setModalPendingStatus(status);
      return;
    }
    */


    setReservas((rs) => rs.map((r) => r.id === reservaId ? { ...r, status } : r));
    const res = await fetch(`/api/reservations/${reservaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setReservas((rs) => rs.map((r) => r.id === reservaId ? { ...r, status: prev } : r));
    }
  }

  async function handleModalConfirm(venueName: "BERTRAND" | "URGELL") {
    if (!modalReserva) return;
    const reservaId = modalReserva.id;
    const status = modalPendingStatus || "CONFIRMED";
    
    setModalReserva(null);
    setModalPendingStatus(null);

    setReservas((rs) => rs.map((r) => r.id === reservaId ? { ...r, status, venue: { id: "", name: venueName } } : r));
    
    await fetch(`/api/reservations/${reservaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, venueName }),
    });
  }

  // ── Open edit modal ──────────────────────────────────────────────────────────
  function openEdit(r: ReservaRow) {
    setEditId(r.id);
    setEditForm(rowToForm(r));
  }

  // ── Create ───────────────────────────────────────────────────────────────────
  function setCreateField<K extends keyof ReservaForm>(k: K, v: ReservaForm[K]) {
    setCreateForm((f) => ({ ...f, [k]: v }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...createForm,
          totalAmount: createForm.pricePerPax * createForm.guests,
          venueName: createForm.venueName || null,
          date: new Date(createForm.date).toISOString(),
        }),
      });
      const json = await res.json() as { ok: boolean; data?: ReservaRow };
      if (json.ok && json.data) {
        const d = json.data;
        setReservas((rs) => [{
          id: d.id, type: d.type, status: d.status, guests: d.guests,
          totalAmount: Number(d.totalAmount), paidAmount: Number(d.paidAmount),
          source: d.source ?? null,
          groupRef: d.groupRef, mergedGroupId: d.mergedGroupId,
          createdAt: d.createdAt, customer: d.customer,
          event: { id: d.event.id, date: d.event.date, shift: d.event.shift },
          venue: d.venue,
        }, ...rs]);
        setCreateOpen(false);
        setCreateForm(FORM_DEFAULT);
      }
    } finally {
      setCreating(false);
    }
  }

  // ── Update ───────────────────────────────────────────────────────────────────
  function setEditField<K extends keyof ReservaForm>(k: K, v: ReservaForm[K]) {
    setEditForm((f) => ({ ...f, [k]: v }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !editId) return;

    // Skip blocking modal for venue
    /*
    if (editForm.status === "CONFIRMED" && !editForm.venueName) {
      const row = reservas.find(r => r.id === editId);
      if (row) {
        setModalReserva(row);
        setModalPendingStatus("CONFIRMED");
        setEditId(null); // Close edit modal
      }
      return;
    }
    */


    setSaving(true);
    try {
      const res = await fetch(`/api/admin/reservations/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          allergies: editForm.allergies,
          previousVisit: editForm.previousVisit,
          comments: editForm.comments,
          date: new Date(editForm.date).toISOString(),
          shift: editForm.shift,
          venueName: editForm.venueName || null,
          guests: editForm.guests,
          type: editForm.type,
          totalAmount: editForm.pricePerPax * editForm.guests,
          paidAmount: editForm.paidAmount,
          status: editForm.status,
        }),
      });
      const json = await res.json() as { ok: boolean; data?: ReservaRow };
      if (json.ok && json.data) {
        const d = json.data;
        setReservas((rs) => rs.map((r) => r.id === editId ? {
          id: d.id, type: d.type, status: d.status, guests: d.guests,
          totalAmount: Number(d.totalAmount), paidAmount: Number(d.paidAmount),
          source: d.source ?? null,
          groupRef: d.groupRef, mergedGroupId: d.mergedGroupId,
          createdAt: d.createdAt, customer: d.customer,
          event: { id: d.event.id, date: d.event.date, shift: d.event.shift },
          venue: d.venue,
        } : r));
        setEditId(null);
      }
    } finally {
      setSaving(false);
    }
  }

  // ── Merge ───────────────────────────────────────────────────────────────────
  const [merging, setMerging] = useState(false);
  async function handleMerge() {
    if (selectedIds.size < 2 || merging) return;
    setMerging(true);
    try {
      const res = await fetch("/api/admin/reservations/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationIds: Array.from(selectedIds) }),
      });
      const json = await res.json();
      if (json.ok && json.mergedGroupId) {
        setReservas(rs => rs.map(r => selectedIds.has(r.id) ? { ...r, mergedGroupId: json.mergedGroupId } : r));
        setSelectedIds(new Set());
      } else {
        alert("Error al fusionar reservas: " + (json.error || "Desconocido"));
      }
    } catch (e) {
      alert("Error de red al fusionar reservas.");
    } finally {
      setMerging(false);
    }
  }

  return (
    <>
      {/* ── Bulk action bar ── */}
      {selectedCount > 0 && (
        <div style={{
          padding: "0.6rem 1.25rem",
          background: "var(--color-admin-accent-light)",
          borderBottom: "1px solid var(--color-admin-border)",
          display: "flex", alignItems: "center", gap: "0.75rem",
          fontSize: "0.82rem", flexShrink: 0,
        }}>
          <span style={{ fontWeight: 600, color: "var(--color-admin-accent)" }}>
            {selectedCount} reserva{selectedCount !== 1 ? "s" : ""} seleccionada{selectedCount !== 1 ? "s" : ""}
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            style={{ padding: "0.25rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "transparent", color: "var(--color-admin-muted)", fontSize: "0.76rem", cursor: "pointer" }}
          >
            Deseleccionar
          </button>
          {selectedCount > 1 && (
            <button
              onClick={handleMerge}
              disabled={merging}
              style={{ marginLeft: "auto", padding: "0.3rem 1rem", borderRadius: 6, border: "none", background: "var(--color-admin-accent)", color: "#fff", fontSize: "0.76rem", cursor: merging ? "not-allowed" : "pointer", opacity: merging ? 0.7 : 1, fontWeight: 600 }}
            >
              {merging ? "Fusionando..." : "Fusionar reservas"}
            </button>
          )}
        </div>
      )}

      {/* ── Toolbar ── */}
      <div style={S.toolbar}>
        <div style={S.searchWrap}>
          <span style={{ color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>⌕</span>
          <input style={S.searchInput} placeholder="Nombre, email, fecha..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <FilterDropdown<TimeFilter>
          label="Fecha"
          active={timeFilter === "upcoming" ? null : timeFilter}
          options={(Object.keys(TIME_LABEL) as TimeFilter[]).map((k) => ({ value: k, label: TIME_LABEL[k] }))}
          onSelect={(v) => setTimeFilter(v ?? "upcoming")}
        />
        <FilterDropdown<VenueFilter>
          label="Local"
          active={venueFilter === "all" ? null : venueFilter}
          options={[{ value: "URGELL", label: "Urgell" }, { value: "BERTRAND", label: "Bertrand" }]}
          onSelect={(v) => setVenueFilter(v ?? "all")}
        />
        <FilterDropdown<ShiftFilter>
          label="Turno"
          active={shiftFilter === "all" ? null : shiftFilter}
          options={[{ value: "NOON", label: "Mediodía" }, { value: "NIGHT", label: "Noche" }]}
          onSelect={(v) => setShiftFilter(v ?? "all")}
        />
        <FilterDropdown<"PAID" | "PARTIAL">
          label="Pago"
          active={paymentFilter === "all" ? null : paymentFilter}
          options={[
            { value: "PAID", label: "Pagado" },
            { value: "PARTIAL", label: "Pago Parcial" }
          ]}
          onSelect={(v) => setPaymentFilter(v ?? "all")}
        />
        <div style={{ flex: 1 }} />
        <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setImportOpen(true)}
          style={{ ...S.btn, background: "transparent", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)", fontSize: "0.76rem", padding: "0.3rem 0.75rem" }}
        >
          ↑ Importar XLSX
        </button>
        <button style={S.btn} onClick={() => setCreateOpen(true)}>+ Nueva reserva</button>
      </div>

      <VenueSelectionModal
        isOpen={!!modalReserva}
        onClose={() => { setModalReserva(null); setModalPendingStatus(null); }}
        onConfirm={handleModalConfirm}
        customerName={modalReserva?.customer.name ?? ""}
        reservationDetails={modalReserva ? `${modalReserva.guests} pax · ${new Date(modalReserva.event.date).toLocaleDateString("es-ES", { day: "numeric", month: "long" })} ${modalReserva.event.shift === "NOON" ? "Mediodía" : "Noche"}` : ""}
      />

      {/* ── Table ── */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: "40px" }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: "pointer" }} />
              </th>
              <th 
                style={{ ...S.th, cursor: "pointer", userSelect: "none" }} 
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  Fecha reserva {sortOrder === "asc" ? "↑" : "↓"}
                </div>
              </th>
              <th style={S.th}>Turno</th>
              <th style={S.th}>Nombre</th>
              <th style={S.th}>Pax</th>
              <th style={S.th}>Local</th>
              <th style={S.th}>Total</th>
              <th style={S.th}>Pago</th>
              <th style={S.th}>Estado</th>
              <th style={S.th}>Comprado en</th>
              <th style={S.th}>Canal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ ...S.td, textAlign: "center", padding: "3rem", color: "var(--color-admin-muted)" }}>
                  Sin reservas
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const pending = r.totalAmount - r.paidAmount;
                const isSelected = selectedIds.has(r.id);
                return (
                  <tr
                    key={r.id}
                    onClick={() => openEdit(r)}
                    style={{
                      cursor: "pointer",
                      background: isSelected ? "var(--color-admin-accent-light)" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "var(--color-admin-bg)"; }}
                    onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td style={{ ...S.td, padding: "0.7rem 0.75rem", width: 40 }} onClick={(e) => { e.stopPropagation(); toggleOne(r.id); }}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleOne(r.id)} style={{ cursor: "pointer" }} />
                    </td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{fmtDate(r.event.date)}</td>
                    <td style={{ ...S.td, color: "var(--color-admin-muted)", fontSize: "0.78rem" }}>
                      {r.event.shift === "NOON" ? "Mediodía" : "Noche"}
                    </td>
                    <td style={S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 500 }}>{r.customer.name}</span>
                        {r.type === "GIFT" && (
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "1px 6px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626" }}>
                            Regalo 🎁
                          </span>
                        )}
                        {r.customer.previousVisit && (
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "1px 6px", borderRadius: 10, background: "#EDE9FE", color: "#7C3AED" }}>
                            Repetidor
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>{r.customer.email}</div>
                      {r.customer.allergies && (
                        <div style={{ fontSize: "0.72rem", color: "#B91C1C", marginTop: "0.15rem" }}>
                          ⚠ {r.customer.allergies}
                        </div>
                      )}
                      {r.groupRef && !r.mergedGroupId && (
                        <div style={{ fontSize: "0.7rem", color: "#D97706", marginTop: "0.2rem", fontWeight: 500, display: "inline-block", background: "#FEF3C7", padding: "2px 6px", borderRadius: "4px" }}>
                          Relacionada: {r.groupRef}
                        </div>
                      )}
                      {r.mergedGroupId && (
                        <div 
                          onClick={(e) => { e.stopPropagation(); setGroupViewId(r.mergedGroupId!); }}
                          style={{ fontSize: "0.7rem", color: "#0891B2", marginTop: "0.2rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "#CFFAFE", padding: "2px 6px", borderRadius: "4px", cursor: "pointer" }}
                          title="Ver grupo"
                        >
                          🔗 Grupo Fusionado
                        </div>
                      )}
                      {r.customer.comments && (
                        <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginTop: "0.1rem", fontStyle: "italic" }}>
                          {r.customer.comments}
                        </div>
                      )}
                    </td>
                    <td style={{ ...S.td, color: "var(--color-admin-muted)" }}>{r.guests}</td>
                    <td style={{ ...S.td, padding: "0.4rem 0.9rem" }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ position: "relative" }}>
                        <select
                          value={r.venue?.name ?? ""}
                          onChange={(e) => void handleVenueChange(r.id, e.target.value)}
                          style={{
                            padding: "2px 6px",
                            borderRadius: "14px",
                            border: `1px solid ${r.venue ? (VENUE_COLOR[r.venue.name]?.color ?? "var(--color-admin-border)") : r.status === "CONFIRMED" ? "#D97706" : "var(--color-admin-border)"}`,
                            background: r.venue ? (VENUE_COLOR[r.venue.name]?.bg ?? "transparent") : r.status === "CONFIRMED" ? "#FFFBEB" : "transparent",
                            color: r.venue ? (VENUE_COLOR[r.venue.name]?.color ?? "var(--color-admin-muted)") : r.status === "CONFIRMED" ? "#D97706" : "var(--color-admin-muted)",
                            fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", outline: "none",
                          }}
                        >
                          <option value="">— Sin local</option>
                          <option value="BERTRAND">Bertrand</option>
                          <option value="URGELL">Urgell</option>
                        </select>
                        {r.status === "CONFIRMED" && !r.venue && (
                          <div style={{ position: "absolute", top: "-8px", right: "-4px", background: "#D97706", width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.6rem", fontWeight: 800, border: "1px solid #fff" }} title="Local pendiente de asignar">!</div>
                        )}
                      </div>

                    </td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{r.totalAmount.toFixed(0)}€</td>
                    <td style={{ ...S.td, padding: "0.4rem 0.9rem" }}>
                      {(() => {
                        const isPaid = r.type === "GIFT" || pending <= 0.01;
                        return (
                          <span style={{
                            padding: "2px 8px", borderRadius: 14, fontSize: "0.72rem", fontWeight: 600,
                            background: isPaid ? "#DCFCE7" : "#FEF3C7",
                            color: isPaid ? "#16A34A" : "#D97706",
                          }}>
                            {isPaid ? "Pagado" : "Parcial"}
                          </span>
                        );
                      })()}
                    </td>
                    <td style={{ ...S.td, padding: "0.4rem 0.9rem" }} onClick={(e) => e.stopPropagation()}>
                      {isAdmin ? (
                        <StatusSelect
                          value={r.status as StatusKey}
                          onChange={(v) => void handleStatusChange(r.id, v)}
                        />
                      ) : (
                        <span style={{ padding: "2px 8px", borderRadius: 14, fontSize: "0.72rem", fontWeight: 600, background: STATUS_COLOR[r.status as StatusKey]?.bg ?? "#F1F5F9", color: STATUS_COLOR[r.status as StatusKey]?.color ?? "#6B7280" }}>
                          {STATUS_LABEL[r.status as StatusKey]}
                        </span>
                      )}
                    </td>
                    <td style={{ ...S.td, color: "var(--color-admin-muted)", fontSize: "0.76rem", whiteSpace: "nowrap" }}>
                      <div>{fmtDate(r.createdAt)}</div>
                      <div style={{ fontSize: "0.7rem" }}>
                        {new Date(r.createdAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td style={S.td}>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        background: r.source === "TURITOP" ? "#DBEAFE" : r.source === "WEB" ? "#DCFCE7" : "#F3F4F6",
                        color: r.source === "TURITOP" ? "#1E40AF" : r.source === "WEB" ? "#166534" : "#4B5563",
                        border: `1px solid ${r.source === "TURITOP" ? "#BFDBFE" : r.source === "WEB" ? "#BBF7D0" : "#E5E7EB"}`
                      }}>
                        {r.source || "Manual"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Create modal ── */}
      {createOpen && (
        <ReservaModal
          title="Nueva reserva"
          form={createForm}
          setField={setCreateField}
          onSubmit={handleCreate}
          onClose={() => setCreateOpen(false)}
          saving={creating}
          isEdit={false}
        />
      )}

      {/* ── Edit modal ── */}
      {editId !== null && (
        <ReservaModal
          title="Editar reserva"
          form={editForm}
          setField={setEditField}
          onSubmit={handleUpdate}
          onClose={() => setEditId(null)}
          saving={saving}
          isEdit={true}
        />
      )}

      {/* ── Import modal ── */}
      {importOpen && (
        <ImportModal
          mode="reservations"
          onClose={() => setImportOpen(false)}
        />
      )}

      {/* ── Group View Modal ── */}
      {groupViewId && (
        <div style={S.overlay} onClick={() => setGroupViewId(null)}>
          <div style={{ ...S.modal, maxWidth: "700px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>Grupo de Reservas</h2>
              <button onClick={() => setGroupViewId(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-admin-muted)" }}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {groupReservations.map(r => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", border: "1px solid var(--color-admin-border)", borderRadius: "8px", background: "var(--color-admin-bg)" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
                      {r.customer.name}
                      <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", fontWeight: 400, color: "var(--color-admin-muted)" }}>{r.guests} pax</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
                      {fmtDate(r.event.date)} · {r.event.shift === "NOON" ? "Mediodía" : "Noche"} · {r.venue ? r.venue.name : "Sin local"}
                    </div>
                  </div>
                  <div>
                    <span style={{ padding: "2px 8px", borderRadius: 14, fontSize: "0.72rem", fontWeight: 600, background: STATUS_COLOR[r.status as StatusKey]?.bg ?? "#F1F5F9", color: STATUS_COLOR[r.status as StatusKey]?.color ?? "#6B7280" }}>
                      {STATUS_LABEL[r.status as StatusKey]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
              <button onClick={() => setGroupViewId(null)} style={{ ...S.btn, background: "var(--color-admin-border)", color: "var(--color-admin-text)" }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
