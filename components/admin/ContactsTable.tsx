"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { ContactRow } from "@/app/admin/contactos/page";
import { ImportModal } from "@/components/admin/ImportModal";

// ── Styles ────────────────────────────────────────────────────────────────────
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
    maxWidth: "520px",
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
    boxSizing: "border-box" as const,
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

type VisitFilter = "all" | "recurrent" | "first" | "newsletter" | "empresa" | "agencia";

type ContactForm = {
  name: string; email: string; phone: string;
  customerType: "PARTICULAR" | "EMPRESA" | "AGENCIA";
  cif: string; billingStreet: string; billingZip: string; billingCity: string;
  allergies: string; comments: string;
  previousVisit: boolean; newsletter: boolean; source: string;
};

const FORM_DEFAULT: ContactForm = {
  name: "", email: "", phone: "",
  customerType: "PARTICULAR",
  cif: "", billingStreet: "", billingZip: "", billingCity: "",
  allergies: "", comments: "",
  previousVisit: false, newsletter: false, source: "",
};

function rowToForm(c: ContactRow): ContactForm {
  return {
    name: c.name, email: c.email, phone: c.phone,
    customerType: c.customerType,
    cif: c.cif, billingStreet: c.billingStreet, billingZip: c.billingZip, billingCity: c.billingCity,
    allergies: c.allergies, comments: c.comments,
    previousVisit: c.previousVisit, newsletter: c.newsletter, source: c.source,
  };
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function exportCSV(rows: ContactRow[], filename: string) {
  const headers = ["Nombre", "Email", "Teléfono", "Reservas", "LTV (€)", "Última visita", "Marketing", "Canal", "Alergias", "Comentarios"];
  const data = rows.map((c) => [
    c.name, c.email, c.phone, c.reservaCount,
    c.totalSpent.toFixed(0),
    c.lastVisit ? new Date(c.lastVisit).toLocaleDateString("es-ES") : "—",
    c.newsletter ? "Sí" : "No",
    c.source || "—",
    c.allergies || "—",
    c.comments || "—",
  ]);
  const csv = [headers, ...data].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Filter dropdown (reusing same pattern as ReservasTable) ───────────────────
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

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          padding: "0.3rem 0.75rem", borderRadius: "20px",
          fontSize: "0.76rem", fontWeight: 500,
          border: `1px solid ${active ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
          color: active ? "var(--color-admin-accent)" : "var(--color-admin-muted)",
          background: active ? "var(--color-admin-accent-light)" : "var(--color-admin-surface)",
          cursor: "pointer",
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
          {active && (
            <button onClick={() => { onSelect(null); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.9rem", fontSize: "0.78rem", color: "var(--color-admin-muted)", background: "none", border: "none", borderBottom: "1px solid var(--color-admin-border)", cursor: "pointer" }}>
              ✕ Quitar filtro
            </button>
          )}
          {options.map((o) => (
            <button key={o.value} onClick={() => { onSelect(o.value); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.9rem", fontSize: "0.78rem", color: active === o.value ? "var(--color-admin-accent)" : "var(--color-admin-text)", fontWeight: active === o.value ? 600 : 400, background: active === o.value ? "var(--color-admin-accent-light)" : "none", border: "none", cursor: "pointer" }}
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

// ── Contact modal (create + edit) ─────────────────────────────────────────────
function ContactModal({
  title, form, setField, onSubmit, onClose, saving, isEdit,
}: {
  title: string;
  form: ContactForm;
  setField: <K extends keyof ContactForm>(k: K, v: ContactForm[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  saving: boolean;
  isEdit: boolean;
}) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-admin-muted)" }}>✕</button>
        </div>

        <form onSubmit={(e) => void onSubmit(e)}>
          {/* Tipo de contacto */}
          <p style={S.sectionTitle}>Tipo de contacto</p>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
            {(["PARTICULAR", "EMPRESA", "AGENCIA"] as const).map((tipo) => (
              <label
                key={tipo}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: `1px solid ${form.customerType === tipo ? "var(--color-admin-accent)" : "var(--color-admin-border)"}`,
                  background: form.customerType === tipo ? "var(--color-admin-accent-light)" : "var(--color-admin-bg)",
                  cursor: "pointer",
                  fontSize: "0.83rem",
                  fontWeight: form.customerType === tipo ? 600 : 400,
                  color: form.customerType === tipo ? "var(--color-admin-accent)" : "var(--color-admin-text)",
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="customerType"
                  value={tipo}
                  checked={form.customerType === tipo}
                  onChange={() => setField("customerType", tipo)}
                  style={{ display: "none" }}
                />
                {tipo === "PARTICULAR" ? "◉ Particular" : tipo === "EMPRESA" ? "◈ Empresa" : "★ Agencia"}
              </label>
            ))}
          </div>

          {/* Datos personales */}
          <p style={S.sectionTitle}>Datos personales</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div>
              <label style={S.label}>Nombre *</label>
              <input required style={S.input} value={form.name} onChange={(e) => setField("name", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Email *</label>
              <input required type="email" style={{ ...S.input, ...(isEdit && { background: "var(--color-admin-border)", color: "var(--color-admin-muted)", cursor: "default" }) }} readOnly={isEdit} value={form.email} onChange={(e) => !isEdit && setField("email", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Teléfono *</label>
              <input required style={S.input} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Canal captación</label>
              <input style={S.input} placeholder="web, instagram, regalo…" value={form.source} onChange={(e) => setField("source", e.target.value)} />
            </div>
          </div>

          {/* Datos fiscales (condicional) */}
          {(form.customerType === "EMPRESA" || form.customerType === "AGENCIA") && (
            <>
              <p style={S.sectionTitle}>Datos fiscales</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div>
                  <label style={S.label}>CIF</label>
                  <input style={S.input} placeholder="B12345678" value={form.cif} onChange={(e) => setField("cif", e.target.value)} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={S.label}>Calle y número</label>
                  <input style={S.input} placeholder="Carrer de Mallorca, 234" value={form.billingStreet} onChange={(e) => setField("billingStreet", e.target.value)} />
                </div>
                <div>
                  <label style={S.label}>Código postal</label>
                  <input style={S.input} placeholder="08008" value={form.billingZip} onChange={(e) => setField("billingZip", e.target.value)} />
                </div>
                <div>
                  <label style={S.label}>Localidad</label>
                  <input style={S.input} placeholder="Barcelona" value={form.billingCity} onChange={(e) => setField("billingCity", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* Notas */}
          <p style={S.sectionTitle}>Notas</p>
          <div style={{ display: "grid", gridTemplateColumns: form.customerType === "PARTICULAR" ? "1fr 1fr" : "1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            {form.customerType === "PARTICULAR" && (
              <div>
                <label style={S.label}>Alergias</label>
                <input style={S.input} value={form.allergies} onChange={(e) => setField("allergies", e.target.value)} />
              </div>
            )}
            <div>
              <label style={S.label}>Comentarios</label>
              <input style={S.input} value={form.comments} onChange={(e) => setField("comments", e.target.value)} />
            </div>
          </div>

          {/* Preferencias */}
          <p style={S.sectionTitle}>Preferencias</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--color-admin-text)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.previousVisit} onChange={(e) => setField("previousVisit", e.target.checked)} />
              Cliente recurrente (visita anterior)
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--color-admin-text)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.newsletter} onChange={(e) => setField("newsletter", e.target.checked)} />
              Acepta comunicaciones de marketing <span style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>(post-visita)</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--color-admin-border)" }}>
            <button type="button" onClick={onClose} style={{ ...S.btn, background: "var(--color-admin-border)", color: "var(--color-admin-text)" }}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ ...S.btn, opacity: saving ? 0.7 : 1 }}>
              {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear contacto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function ContactsTable({ contacts: initial }: { contacts: ContactRow[] }) {
  const [contacts, setContacts] = useState(initial);

  // Sincronizar estado cuando cambian las props (necesario para la paginación de servidor)
  useEffect(() => {
    setContacts(initial);
  }, [initial]);

  const [search, setSearch] = useState("");
  const [visitFilter, setVisitFilter] = useState<VisitFilter | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Create modal
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [createForm, setCreateForm] = useState<ContactForm>(FORM_DEFAULT);
  const [creating, setCreating] = useState(false);

  // Edit modal
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ContactForm>(FORM_DEFAULT);
  const [saving, setSaving] = useState(false);

  // Error
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = contacts;
    if (visitFilter === "recurrent") list = list.filter((c) => c.reservaCount > 1 || c.previousVisit);
    if (visitFilter === "first") list = list.filter((c) => c.reservaCount <= 1 && !c.previousVisit);
    if (visitFilter === "newsletter") list = list.filter((c) => c.newsletter);
    if (visitFilter === "empresa") list = list.filter((c) => c.customerType === "EMPRESA");
    if (visitFilter === "agencia") list = list.filter((c) => c.customerType === "AGENCIA");
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
      );
    }

    // Sort by last visit
    list = [...list].sort((a, b) => {
      const da = a.lastVisit ? new Date(a.lastVisit).getTime() : 0;
      const db = b.lastVisit ? new Date(b.lastVisit).getTime() : 0;
      return sortOrder === "asc" ? da - db : db - da;
    });

    return list;
  }, [contacts, visitFilter, search, sortOrder]);

  // ── Selection helpers ────────────────────────────────────────────────────────
  const filteredIds = useMemo(() => new Set(filtered.map((c) => c.id)), [filtered]);
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

  // ── Inline newsletter toggle ─────────────────────────────────────────────────
  async function handleNewsletterToggle(id: string, value: boolean) {
    setContacts((cs) => cs.map((c) => c.id === id ? { ...c, newsletter: value } : c));
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newsletter: value }),
    });
  }

  // ── Create ───────────────────────────────────────────────────────────────────
  function setCreateField<K extends keyof ContactForm>(k: K, v: ContactForm[K]) {
    setCreateForm((f) => ({ ...f, [k]: v }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (creating) return;
    setCreating(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const json = await res.json() as { ok: boolean; data?: { id: string; name: string; email: string; phone: string; customerType: "PARTICULAR" | "EMPRESA" | "AGENCIA"; cif: string | null; billingStreet: string | null; billingZip: string | null; billingCity: string | null; allergies: string | null; comments: string | null; previousVisit: boolean; newsletter: boolean; source: string | null; createdAt: string }; error?: string };
      if (json.ok && json.data) {
        const d = json.data;
        setContacts((cs) => [{
          id: d.id, name: d.name, email: d.email, phone: d.phone,
          customerType: d.customerType,
          cif: d.cif ?? "", billingStreet: d.billingStreet ?? "",
          billingZip: d.billingZip ?? "", billingCity: d.billingCity ?? "",
          allergies: d.allergies ?? "", comments: d.comments ?? "",
          previousVisit: d.previousVisit, newsletter: d.newsletter,
          source: d.source ?? "",
          reservaCount: 0, totalSpent: 0, lastVisit: "",
          createdAt: d.createdAt,
        }, ...cs]);
        setCreateOpen(false);
        setCreateForm(FORM_DEFAULT);
      } else {
        setErrorMsg(json.error || "Error al crear contacto");
      }
    } catch {
      setErrorMsg("Error de red al crear contacto");
    } finally {
      setCreating(false);
    }
  }

  // ── Edit ─────────────────────────────────────────────────────────────────────
  function openEdit(c: ContactRow) {
    setEditId(c.id);
    setEditForm(rowToForm(c));
  }

  function setEditField<K extends keyof ContactForm>(k: K, v: ContactForm[K]) {
    setEditForm((f) => ({ ...f, [k]: v }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !editId) return;
    setSaving(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/contacts/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json() as { ok: boolean; data?: { name: string; phone: string; customerType?: string; allergies: string | null; comments: string | null; previousVisit: boolean; newsletter: boolean; source: string | null }; error?: string };
      if (json.ok && json.data) {
        const d = json.data;
        setContacts((cs) => cs.map((c) => c.id === editId ? {
          ...c,
          name: d.name,
          phone: d.phone,
          allergies: d.allergies ?? "",
          comments: d.comments ?? "",
          previousVisit: d.previousVisit,
          newsletter: d.newsletter,
          source: d.source ?? "",
          customerType: (d.customerType as ContactForm["customerType"]) ?? c.customerType,
        } : c));
        setEditId(null);
      } else {
        setErrorMsg(json.error || "Error al guardar contacto");
      }
    } catch {
      setErrorMsg("Error de red al guardar contacto");
    } finally {
      setSaving(false);
    }
  }

  // ── Export ───────────────────────────────────────────────────────────────────
  function handleExport() {
    const toExport = selectedCount > 0
      ? filtered.filter((c) => selectedIds.has(c.id))
      : filtered;
    exportCSV(toExport, `contactos_${new Date().toISOString().slice(0, 10)}.csv`);
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
            {selectedCount} contacto{selectedCount !== 1 ? "s" : ""} seleccionado{selectedCount !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleExport}
            style={{ padding: "0.25rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-accent)", background: "transparent", color: "var(--color-admin-accent)", fontSize: "0.76rem", fontWeight: 600, cursor: "pointer" }}
          >
            ↓ Exportar selección
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            style={{ padding: "0.25rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "transparent", color: "var(--color-admin-muted)", fontSize: "0.76rem", cursor: "pointer" }}
          >
            Deseleccionar
          </button>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div style={S.toolbar}>
        <div style={S.searchWrap}>
          <span style={{ color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>⌕</span>
          <input style={S.searchInput} placeholder="Nombre, email, teléfono…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <FilterDropdown<VisitFilter>
          label="Tipo"
          active={visitFilter}
          options={[
            { value: "all",       label: "Todos" },
            { value: "empresa",   label: "Empresa" },
            { value: "agencia",   label: "Agencia" },
            { value: "recurrent", label: "Recurrentes" },
            { value: "first",     label: "Primera vez" },
            { value: "newsletter",label: "Newsletter" },
          ]}
          onSelect={(v) => setVisitFilter(v === "all" ? null : v)}
        />
        <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
        <button
          style={{ ...S.btn, background: "transparent", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)", fontSize: "0.76rem", padding: "0.3rem 0.75rem" }}
          onClick={handleExport}
        >
          ↓ {selectedCount > 0 ? `Exportar (${selectedCount})` : "Exportar CSV"}
        </button>
        <button
          onClick={() => setImportOpen(true)}
          style={{ ...S.btn, background: "transparent", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-muted)", fontSize: "0.76rem", padding: "0.3rem 0.75rem" }}
        >
          ↑ Importar XLSX
        </button>
        <button style={S.btn} onClick={() => setCreateOpen(true)}>+ Nuevo contacto</button>
        <button
          style={{ ...S.btn, background: "var(--color-admin-surface)", border: "2px solid var(--color-admin-accent)", color: "var(--color-admin-accent)" }}
          onClick={() => window.open("/admin/oportunidades", "_self")}
        >
          💼 Ir a Oportunidades
        </button>
      </div>

      {/* ── Error message ── */}
      {errorMsg && (
        <div style={{
          padding: "0.6rem 1.25rem",
          background: "#FEE2E2",
          color: "#DC2626",
          fontSize: "0.82rem",
          fontWeight: 500,
          borderBottom: "1px solid #FECACA",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <span>⚠</span>
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        </div>
      )}

      {/* ── Table ── */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: 40, padding: "0.6rem 0.75rem" }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={toggleAll}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th style={S.th}>Contacto</th>
              <th style={S.th}>Email / Teléfono</th>
              <th style={S.th}>Reservas</th>
              <th style={S.th}>LTV</th>
              <th 
                style={{ ...S.th, cursor: "pointer", userSelect: "none" }}
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              >
                Última visita {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th style={S.th}>Marketing</th>
              <th style={S.th}>Tipo</th>
              <th style={S.th}>Alergias / Nota</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ ...S.td, textAlign: "center", padding: "3rem", color: "var(--color-admin-muted)" }}>
                  Sin contactos
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const isSelected = selectedIds.has(c.id);
                const lastVisitLabel = c.lastVisit
                  ? new Date(c.lastVisit).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
                  : "—";
                const isRecurrent = c.reservaCount > 1 || c.previousVisit;

                return (
                  <tr
                    key={c.id}
                    onClick={() => openEdit(c)}
                    style={{
                      cursor: "pointer",
                      background: isSelected ? "var(--color-admin-accent-light)" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "var(--color-admin-bg)"; }}
                    onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    {/* Checkbox */}
                    <td style={{ ...S.td, padding: "0.7rem 0.75rem", width: 40 }} onClick={(e) => { e.stopPropagation(); toggleOne(c.id); }}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleOne(c.id)} style={{ cursor: "pointer" }} />
                    </td>

                    {/* Nombre */}
                    <td style={S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--color-admin-accent-light)", color: "var(--color-admin-accent)", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {initials(c.name)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>

                    {/* Email / Teléfono */}
                    <td style={{ ...S.td, color: "var(--color-admin-muted)" }}>
                      <div style={{ fontSize: "0.82rem" }}>{c.email}</div>
                      <div style={{ fontSize: "0.75rem", marginTop: 2 }}>{c.phone}</div>
                    </td>

                    {/* Reservas */}
                    <td style={{ ...S.td, fontWeight: 500, textAlign: "center" as const }}>{c.reservaCount}</td>

                    {/* LTV */}
                    <td style={{ ...S.td, fontWeight: 600, color: c.totalSpent > 0 ? "var(--color-admin-accent)" : "var(--color-admin-muted)" }}>
                      {c.totalSpent > 0 ? `${c.totalSpent.toFixed(0)}€` : "—"}
                    </td>

                    {/* Última visita */}
                    <td style={{ ...S.td, color: "var(--color-admin-muted)", fontSize: "0.8rem" }}>{lastVisitLabel}</td>

                    {/* Newsletter toggle */}
                    <td style={{ ...S.td, textAlign: "center" as const }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => void handleNewsletterToggle(c.id, !c.newsletter)}
                        style={{
                          width: 36, height: 20, borderRadius: 10, border: "none",
                          background: c.newsletter ? "#16A34A" : "var(--color-admin-border)",
                          cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
                        }}
                        title={c.newsletter ? "Quitar de marketing" : "Añadir a marketing"}
                      >
                        <span style={{
                          position: "absolute", top: 2, left: c.newsletter ? 18 : 2,
                          width: 16, height: 16, borderRadius: "50%", background: "#fff",
                          transition: "left 0.2s",
                        }} />
                      </button>
                    </td>

                    {/* Tipo */}
                    <td style={S.td}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        {c.customerType === "EMPRESA" && (
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 700, background: "#FEF3C7", color: "#92400E" }}>
                            Empresa
                          </span>
                        )}
                        {c.customerType === "AGENCIA" && (
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 700, background: "#DBEAFE", color: "#1E40AF" }}>
                            Agencia
                          </span>
                        )}
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600, background: isRecurrent ? "#DCFCE7" : "#F0EBFE", color: isRecurrent ? "#16A34A" : "var(--color-admin-accent)" }}>
                          {isRecurrent ? "Recurrente" : "Primera vez"}
                        </span>
                      </div>
                    </td>

                    {/* Alergias / Nota */}
                    <td style={S.td}>
                      {c.allergies && (
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600, background: "#FEE2E2", color: "#DC2626", marginBottom: c.comments ? 3 : 0 }}>
                          ⚠ {c.allergies}
                        </span>
                      )}
                      {c.comments && (
                        <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.comments}
                        </div>
                      )}
                      {!c.allergies && !c.comments && <span style={{ color: "var(--color-admin-muted)", fontSize: "0.78rem" }}>—</span>}
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
        <ContactModal title="Nuevo contacto" form={createForm} setField={setCreateField} onSubmit={handleCreate} onClose={() => setCreateOpen(false)} saving={creating} isEdit={false} />
      )}

      {/* ── Edit modal ── */}
      {editId !== null && (
        <ContactModal title="Editar contacto" form={editForm} setField={setEditField} onSubmit={handleUpdate} onClose={() => setEditId(null)} saving={saving} isEdit={true} />
      )}

      {/* ── Import modal ── */}
      {importOpen && (
        <ImportModal
          mode="contacts"
          onClose={() => setImportOpen(false)}
        />
      )}
    </>
  );
}
