"use client";

import { useState, useEffect } from "react";
import type { UserRow } from "@/app/admin/usuarios/page";

const S = {
  th: { padding: "0.6rem 1rem", textAlign: "left" as const, fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", letterSpacing: "0.04em", textTransform: "uppercase" as const, borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", whiteSpace: "nowrap" as const },
  td: { padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", verticalAlign: "middle" as const },
  input: { width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" as const },
  select: { width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", fontSize: "0.85rem", outline: "none", cursor: "pointer" },
  label: { display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", marginBottom: "0.3rem", letterSpacing: "0.04em", textTransform: "uppercase" as const },
  btn: (accent?: boolean) => ({ padding: "0.4rem 1rem", borderRadius: 6, border: accent ? "none" : "1px solid var(--color-admin-border)", background: accent ? "var(--color-admin-accent)" : "transparent", color: accent ? "#fff" : "var(--color-admin-muted)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }),
  overlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "var(--color-admin-surface)", borderRadius: 10, padding: "1.5rem", width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
};

type UserForm = { name: string; email: string; password: string; role: "ADMIN" | "LIVE"; defaultVenue: string };
const FORM_DEFAULT: UserForm = { name: "", email: "", password: "", role: "LIVE", defaultVenue: "" };

function RoleBadge({ role }: { role: "ADMIN" | "LIVE" }) {
  return (
    <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 700, background: role === "ADMIN" ? "var(--color-admin-accent-light)" : "#F0FDF4", color: role === "ADMIN" ? "var(--color-admin-accent)" : "#16A34A" }}>
      {role === "ADMIN" ? "Admin" : "Live"}
    </span>
  );
}

function UserModal({ title, form, setField, onSubmit, onClose, saving, isEdit, venues }: {
  title: string; form: UserForm;
  setField: <K extends keyof UserForm>(k: K, v: UserForm[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void; saving: boolean; isEdit: boolean;
  venues: Array<{ id: string; name: string }>;
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
            <div>
              <label style={S.label}>Nombre *</label>
              <input required style={S.input} value={form.name} onChange={(e) => setField("name", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Email *</label>
              <input required type="email" style={{ ...S.input, ...(isEdit && { background: "var(--color-admin-border)", color: "var(--color-admin-muted)", cursor: "default" }) }} readOnly={isEdit} value={form.email} onChange={(e) => !isEdit && setField("email", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>{isEdit ? "Nueva contraseña" : "Contraseña *"}</label>
              <input type="password" required={!isEdit} minLength={8} placeholder={isEdit ? "Dejar vacío para no cambiar" : ""} style={S.input} value={form.password} onChange={(e) => setField("password", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Rol *</label>
              <select style={S.select} value={form.role} onChange={(e) => setField("role", e.target.value as "ADMIN" | "LIVE")}>
                <option value="ADMIN">Admin — acceso total</option>
                <option value="LIVE">Live — acceso limitado</option>
              </select>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={S.label}>Local por defecto (Recepción)</label>
              <select style={S.select} value={form.defaultVenue} onChange={(e) => setField("defaultVenue", e.target.value)}>
                <option value="">Sin filtro</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {form.role === "LIVE" && (
            <div style={{ padding: "0.6rem 0.75rem", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 6, fontSize: "0.76rem", color: "#166534", marginBottom: "0.75rem" }}>
              <strong>Rol Live:</strong> puede usar Recepción, Sala, Reservas y Contactos. No tiene acceso a Estadísticas, Usuarios ni a la sección de reservas pendientes.
            </div>
          )}
          {form.role === "ADMIN" && (
            <div style={{ padding: "0.6rem 0.75rem", background: "var(--color-admin-accent-light)", border: "1px solid var(--color-admin-accent)", borderRadius: 6, fontSize: "0.76rem", color: "var(--color-admin-accent)", marginBottom: "0.75rem" }}>
              <strong>Rol Admin:</strong> acceso completo a todas las secciones del panel.
            </div>
          )}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--color-admin-border)" }}>
            <button type="button" onClick={onClose} style={S.btn(false)}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ ...S.btn(true), opacity: saving ? 0.7 : 1 }}>{saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear usuario"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function UsuariosTable({ users: initial }: { users: UserRow[] }) {
  const [users, setUsers] = useState(initial);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<UserForm>(FORM_DEFAULT);
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UserForm>(FORM_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [venues, setVenues] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetch("/api/admin/venues")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) setVenues(res.data);
      });
  }, []);

  function setCreateField<K extends keyof UserForm>(k: K, v: UserForm[K]) { setCreateForm((f) => ({ ...f, [k]: v })); }
  function setEditField<K extends keyof UserForm>(k: K, v: UserForm[K]) { setEditForm((f) => ({ ...f, [k]: v })); }

  function openEdit(u: UserRow) {
    setEditId(u.id);
    setEditForm({ name: u.name, email: u.email, password: "", role: u.role, defaultVenue: u.defaultVenue ?? "" });
    setApiError(null);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (creating) return;
    setCreating(true); setApiError(null);
    try {
      const res = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(createForm) });
      const json = await res.json() as { ok: boolean; data?: UserRow; error?: string };
      if (!json.ok) { setApiError(json.error ?? "Error al crear"); return; }
      if (json.data) setUsers((us) => [...us, json.data!]);
      setCreateOpen(false); setCreateForm(FORM_DEFAULT);
    } finally { setCreating(false); }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !editId) return;
    setSaving(true); setApiError(null);
    try {
      const body: Partial<UserForm> = { name: editForm.name, role: editForm.role, defaultVenue: editForm.defaultVenue };
      if (editForm.password) body.password = editForm.password;
      const res = await fetch(`/api/admin/users/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json() as { ok: boolean; data?: UserRow; error?: string };
      if (!json.ok) { setApiError(json.error ?? "Error al actualizar"); return; }
      if (json.data) setUsers((us) => us.map((u) => u.id === editId ? json.data! : u));
      setEditId(null);
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar el usuario "${name}"? Esta acción no se puede deshacer.`)) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers((us) => us.filter((u) => u.id !== id));
  }

  return (
    <>
      <div style={{ padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "flex-end", borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", flexShrink: 0 }}>
        <button onClick={() => { setCreateForm(FORM_DEFAULT); setApiError(null); setCreateOpen(true); }} style={{ ...S.btn(true) }}>+ Nuevo usuario</button>
      </div>

      <div style={{ overflowY: "auto", flex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
          <thead>
            <tr>
              <th style={S.th}>Nombre</th>
              <th style={S.th}>Email</th>
              <th style={S.th}>Rol</th>
              <th style={S.th}>Creado</th>
              <th style={S.th}></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={5} style={{ ...S.td, textAlign: "center", padding: "3rem", color: "var(--color-admin-muted)" }}>Sin usuarios. Crea el primero.</td></tr>
            ) : users.map((u) => (
              <tr key={u.id} onClick={() => openEdit(u)} style={{ cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "var(--color-admin-bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
              >
                <td style={S.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--color-admin-accent-light)", color: "var(--color-admin-accent)", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 500 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ ...S.td, color: "var(--color-admin-muted)" }}>{u.email}</td>
                <td style={S.td}><RoleBadge role={u.role} /></td>
                <td style={{ ...S.td, color: "var(--color-admin-muted)", fontSize: "0.78rem" }}>
                  {new Date(u.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td style={{ ...S.td, textAlign: "right" as const }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => void handleDelete(u.id, u.name)} style={{ padding: "0.25rem 0.6rem", borderRadius: 6, background: "#FEE2E2", color: "#DC2626", border: "none", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>Eliminar</button>
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
        <UserModal title="Nuevo usuario" form={createForm} setField={setCreateField} onSubmit={handleCreate} onClose={() => setCreateOpen(false)} saving={creating} isEdit={false} venues={venues} />
      )}
      {editId !== null && (
        <UserModal title="Editar usuario" form={editForm} setField={setEditField} onSubmit={handleUpdate} onClose={() => setEditId(null)} saving={saving} isEdit={true} venues={venues} />
      )}
    </>
  );
}
