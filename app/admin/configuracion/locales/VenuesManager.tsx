"use client";

import { useState } from "react";
import type { Venue } from "@prisma/client";

const S = {
  th: { padding: "0.6rem 1rem", textAlign: "left" as const, fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", letterSpacing: "0.04em", textTransform: "uppercase" as const, borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", whiteSpace: "nowrap" as const },
  td: { padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", verticalAlign: "middle" as const },
  input: { width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" as const },
  label: { display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", marginBottom: "0.3rem", letterSpacing: "0.04em", textTransform: "uppercase" as const },
  btn: (accent?: boolean) => ({ padding: "0.4rem 1rem", borderRadius: 6, border: accent ? "none" : "1px solid var(--color-admin-border)", background: accent ? "var(--color-admin-accent)" : "transparent", color: accent ? "#fff" : "var(--color-admin-muted)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }),
  overlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "var(--color-admin-surface)", borderRadius: 10, padding: "1.5rem", width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
};

type VenueForm = { name: string; capacity: number };
const FORM_DEFAULT: VenueForm = { name: "", capacity: 40 };

function VenueModal({
  title,
  form,
  setField,
  onSubmit,
  onClose,
  saving,
  isEdit,
}: {
  title: string;
  form: VenueForm;
  setField: <K extends keyof VenueForm>(k: K, v: VenueForm[K]) => void;
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ gridColumn: "span 2" }}>
              <label style={S.label}>Nombre del local *</label>
              <input required style={S.input} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Ej: BERTRAND, URGELL" />
            </div>
            <div>
              <label style={S.label}>Capacidad *</label>
              <input required type="number" min="1" style={S.input} value={form.capacity} onChange={(e) => setField("capacity", parseInt(e.target.value) || 40)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--color-admin-border)" }}>
            <button type="button" onClick={onClose} style={S.btn(false)}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ ...S.btn(true), opacity: saving ? 0.7 : 1 }}>{saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear local"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  venueName,
  onConfirm,
  onCancel,
  deleting,
}: {
  venueName: string;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  const [input, setInput] = useState("");
  const requiredText = `Eliminar ${venueName}`;
  const isValid = input === requiredText;

  return (
    <div style={S.overlay} onClick={onCancel}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#DC2626" }}>⚠️ Eliminar local</h2>
          <button onClick={onCancel} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-admin-muted)" }}>✕</button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--color-admin-text)", marginBottom: "0.75rem" }}>
            Esta acción <strong>no se puede deshacer</strong>. Se eliminará el local <strong>"{venueName}"</strong> y todos sus datos asociados.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-admin-text)", marginBottom: "0.75rem" }}>
            Para confirmar, escribe lo siguiente:
          </p>
          <div style={{ padding: "0.75rem", background: "var(--color-admin-bg)", borderRadius: 6, border: "1px solid var(--color-admin-border)", fontSize: "0.8rem", fontFamily: "monospace", fontWeight: 600, color: "var(--color-admin-accent)", marginBottom: "0.75rem" }}>
            {requiredText}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe el texto anterior"
            style={{ ...S.input as any, marginBottom: "0.75rem" }}
            disabled={deleting}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--color-admin-border)" }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            style={{ ...S.btn(false), opacity: deleting ? 0.5 : 1 }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!isValid || deleting}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 6,
              border: "none",
              background: isValid && !deleting ? "#DC2626" : "var(--color-admin-border)",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: isValid && !deleting ? "pointer" : "not-allowed",
              opacity: isValid && !deleting ? 1 : 0.5,
            }}
          >
            {deleting ? "Eliminando…" : "Eliminar local"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function VenuesManager({ initialVenues }: { initialVenues: Venue[] }) {
  const [venues, setVenues] = useState(initialVenues);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<VenueForm>(FORM_DEFAULT);
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<VenueForm>(FORM_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function setCreateField<K extends keyof VenueForm>(k: K, v: VenueForm[K]) { setCreateForm((f) => ({ ...f, [k]: v })); }
  function setEditField<K extends keyof VenueForm>(k: K, v: VenueForm[K]) { setEditForm((f) => ({ ...f, [k]: v })); }

  function openEdit(v: Venue) {
    setEditId(v.id);
    setEditForm({ name: v.name, capacity: v.capacity });
    setApiError(null);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (creating) return;
    setCreating(true);
    setApiError(null);
    try {
      const res = await fetch("/api/admin/venues", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(createForm) });
      const json = await res.json() as { ok: boolean; data?: Venue; error?: string };
      if (!json.ok) { setApiError(json.error ?? "Error al crear"); return; }
      if (json.data) setVenues((vs) => [...vs, json.data!].sort((a, b) => a.name.localeCompare(b.name)));
      setCreateOpen(false);
      setCreateForm(FORM_DEFAULT);
    } finally { setCreating(false); }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !editId) return;
    setSaving(true);
    setApiError(null);
    try {
      const res = await fetch(`/api/admin/venues/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) });
      const json = await res.json() as { ok: boolean; data?: Venue; error?: string };
      if (!json.ok) { setApiError(json.error ?? "Error al actualizar"); return; }
      if (json.data) setVenues((vs) => vs.map((v) => v.id === editId ? json.data! : v).sort((a, b) => a.name.localeCompare(b.name)));
      setEditId(null);
    } finally { setSaving(false); }
  }

  async function handleConfirmDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/venues/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVenues((vs) => vs.filter((v) => v.id !== id));
        setDeleteConfirmId(null);
      } else {
        setApiError("Error al eliminar el local");
      }
    } catch {
      setApiError("Error al eliminar el local");
    } finally {
      setDeletingId(null);
    }
  }

  function openDeleteConfirm(id: string) {
    setDeleteConfirmId(id);
  }

  return (
    <>
      <div style={{ padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "flex-end", borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", borderRadius: "6px 6px 0 0", flexShrink: 0 }}>
        <button onClick={() => { setCreateForm(FORM_DEFAULT); setApiError(null); setCreateOpen(true); }} style={{ ...S.btn(true) }}>+ Nuevo local</button>
      </div>

      <div style={{ overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
          <thead>
            <tr>
              <th style={S.th}>Nombre</th>
              <th style={S.th}>Capacidad</th>
              <th style={S.th}></th>
            </tr>
          </thead>
          <tbody>
            {venues.length === 0 ? (
              <tr><td colSpan={3} style={{ ...S.td, textAlign: "center", padding: "3rem", color: "var(--color-admin-muted)" }}>Sin locales. Crea el primero.</td></tr>
            ) : venues.map((v) => (
              <tr key={v.id} onClick={() => openEdit(v)} style={{ cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "var(--color-admin-bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
              >
                <td style={S.td}>
                  <span style={{ fontWeight: 500 }}>{v.name}</span>
                </td>
                <td style={S.td}>{v.capacity} pax</td>
                <td style={{ ...S.td, textAlign: "right" as const }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openDeleteConfirm(v.id)} style={{ padding: "0.25rem 0.6rem", borderRadius: 6, background: "#FEE2E2", color: "#DC2626", border: "none", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {apiError && (
        <div style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", background: "#FEE2E2", color: "#DC2626", padding: "0.6rem 1.25rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, zIndex: 2000 }}>
          {apiError}
        </div>
      )}

      {createOpen && (
        <VenueModal title="Nuevo local" form={createForm} setField={setCreateField} onSubmit={handleCreate} onClose={() => setCreateOpen(false)} saving={creating} isEdit={false} />
      )}
      {editId !== null && (
        <VenueModal title="Editar local" form={editForm} setField={setEditField} onSubmit={handleUpdate} onClose={() => setEditId(null)} saving={saving} isEdit={true} />
      )}
      {deleteConfirmId !== null && (
        <DeleteConfirmModal
          venueName={venues.find((v) => v.id === deleteConfirmId)?.name ?? ""}
          onConfirm={() => void handleConfirmDelete(deleteConfirmId)}
          onCancel={() => setDeleteConfirmId(null)}
          deleting={deletingId === deleteConfirmId}
        />
      )}
    </>
  );
}
