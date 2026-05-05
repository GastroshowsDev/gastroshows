"use client";

import { useState, useRef } from "react";
type ContentType = "TEXT" | "TEXTAREA" | "IMAGE_URL" | "URL";

type FieldDef = {
  key: string;
  label: string;
  type: ContentType;
  section: string;
  order: number;
  defaultValue: string;
  currentValue: string;
};

type SectionDef = { key: string; label: string; icon: string };

type Props = {
  fields: FieldDef[];
  pageSections?: SectionDef[];
  backHref?: string;
  previewHref?: string;
};

const LANDING_SECTIONS: SectionDef[] = [
  { key: "hero",    label: "Hero principal",   icon: "◈" },
  { key: "ritual",  label: "La experiencia",   icon: "◇" },
  { key: "regalo",  label: "Vale regalo",      icon: "✉" },
  { key: "footer",  label: "Pie de página",    icon: "◻" },
];

export function WebBoard({ fields, pageSections, backHref, previewHref = "/" }: Props) {
  const SECTIONS = pageSections ?? LANDING_SECTIONS;
  const [activeSection, setActiveSection] = useState(SECTIONS[0]?.key ?? "hero");
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.currentValue]))
  );
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved]    = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const defaultMap = Object.fromEntries(fields.map((f) => [f.key, f.defaultValue]));
  const sectionFields = fields
    .filter((f) => f.section === activeSection)
    .sort((a, b) => a.order - b.order);

  const isDirty = sectionFields.some((f) => values[f.key] !== f.currentValue);

  async function saveSection() {
    setSaving(true);
    setSaved(null);
    try {
      const updates: Record<string, string> = {};
      sectionFields.forEach((f) => { updates[f.key] = values[f.key] ?? ""; });
      const res = await fetch("/api/admin/web", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (res.ok) setSaved(activeSection);
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(null), 3000);
    }
  }

  async function seedDefaults() {
    if (!confirm("¿Poblar la base de datos con los valores predeterminados? Esto solo añade entradas que no existen, no sobreescribe nada.")) return;
    setSeeding(true);
    try {
      await fetch("/api/admin/web?action=seed", { method: "POST" });
      window.location.reload();
    } finally {
      setSeeding(false);
    }
  }

  function resetField(key: string) {
    setValues((v) => ({ ...v, [key]: defaultMap[key] ?? "" }));
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F4F6FA" }}>

      {/* ── Left sidebar ── */}
      <aside style={{
        width: "220px", flexShrink: 0,
        background: "#FFFFFF",
        borderRight: "1px solid #EAEEF4",
        display: "flex", flexDirection: "column",
        padding: "1.5rem 0",
      }}>
        <div style={{ padding: "0 1.25rem 1.25rem", borderBottom: "1px solid #EAEEF4", marginBottom: "1rem" }}>
          {backHref && (
            <a
              href={backHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.3rem",
                fontSize: "0.72rem", color: "#8B94A8", textDecoration: "none",
                marginBottom: "0.75rem", transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#875BF7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8B94A8"; }}
            >
              ← Volver
            </a>
          )}
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B94A8" }}>
            Contenido web
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {SECTIONS.map((s) => {
            const sFields = fields.filter((f) => f.section === s.key);
            const hasChanges = sFields.some((f) => values[f.key] !== f.currentValue);
            const active = activeSection === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.65rem 1.25rem",
                  background: active ? "#F0EBFE" : "transparent",
                  color: active ? "#875BF7" : "#4B5563",
                  border: "none", borderLeft: `3px solid ${active ? "#875BF7" : "transparent"}`,
                  fontSize: "0.85rem", fontWeight: active ? 600 : 400,
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "1rem", opacity: 0.7 }}>{s.icon}</span>
                {s.label}
                {hasChanges && (
                  <span style={{
                    marginLeft: "auto", width: "7px", height: "7px", borderRadius: "50%",
                    background: "#F59E0B", flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Vista previa + Seed */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #EAEEF4", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", textAlign: "center",
              padding: "0.5rem", borderRadius: "6px",
              border: "1px solid #875BF7", color: "#875BF7",
              fontSize: "0.75rem", fontWeight: 500,
              textDecoration: "none", transition: "all 0.15s",
            }}
          >
            ↗ Vista previa
          </a>
          <button
            onClick={seedDefaults}
            disabled={seeding}
            title="Poblar valores por defecto (útil al migrar a nueva BD)"
            style={{
              padding: "0.45rem", borderRadius: "6px",
              border: "1px solid #E2E8F0", background: "transparent",
              color: "#8B94A8", fontSize: "0.7rem", cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {seeding ? "Cargando…" : "⟳ Inicializar BD"}
          </button>
        </div>
      </aside>

      {/* ── Main panel ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#1A1A2E", marginBottom: "0.25rem" }}>
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#8B94A8" }}>
              Los cambios se publican en la web al guardar.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {saved === activeSection && (
              <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: 500 }}>
                ✓ Guardado
              </span>
            )}
            <button
              onClick={saveSection}
              disabled={saving || !isDirty}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: isDirty ? "#875BF7" : "#E2E8F0",
                color: isDirty ? "#FFFFFF" : "#9CA3AF",
                fontSize: "0.85rem", fontWeight: 600,
                cursor: isDirty ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "760px" }}>
          {sectionFields.map((field) => (
            <ContentField
              key={field.key}
              field={field}
              value={values[field.key] ?? ""}
              defaultValue={defaultMap[field.key] ?? ""}
              onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
              onReset={() => resetField(field.key)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// ── Individual field ──────────────────────────────────────────────────────────
function ContentField({
  field,
  value,
  defaultValue,
  onChange,
  onReset,
}: {
  field: FieldDef;
  value: string;
  defaultValue: string;
  onChange: (v: string) => void;
  onReset: () => void;
}) {
  const isModified = value !== defaultValue;
  const isDirtyFromSaved = value !== field.currentValue;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    border: `1px solid ${isDirtyFromSaved ? "#F59E0B" : "#E2E8F0"}`,
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: "#1A1A2E",
    background: "#FFFFFF",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #EAEEF4",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151" }}>
          {field.label}
          {isDirtyFromSaved && (
            <span style={{ marginLeft: "0.4rem", fontSize: "0.7rem", color: "#F59E0B", fontWeight: 400 }}>
              · sin guardar
            </span>
          )}
        </label>
        {isModified && (
          <button
            onClick={onReset}
            style={{
              background: "none", border: "none", color: "#9CA3AF",
              fontSize: "0.75rem", cursor: "pointer", padding: "0 0.25rem",
            }}
            title="Restaurar valor original"
          >
            Restaurar original
          </button>
        )}
      </div>

      {/* Input */}
      {field.type === "TEXTAREA" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      ) : field.type === "IMAGE_URL" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
            placeholder="https://..."
          />
          {value && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={value}
              alt="Preview"
              style={{
                width: "100%", maxHeight: "160px",
                objectFit: "cover", borderRadius: "6px",
                border: "1px solid #E2E8F0",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}

      {/* Default hint */}
      {isModified && (
        <p style={{ marginTop: "0.45rem", fontSize: "0.72rem", color: "#9CA3AF" }}>
          Original: <em>{defaultValue.length > 80 ? defaultValue.slice(0, 80) + "…" : defaultValue}</em>
        </p>
      )}
    </div>
  );
}
