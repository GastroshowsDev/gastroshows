"use client";

import { useEffect, useRef, useState } from "react";

/* ── Los 14 alérgenos de declaración obligatoria (UE) + 3 habituales en hostelería ── */
const ALLERGENS = [
  { id: "gluten",      name: "Gluten",        emoji: "🌾" },
  { id: "crustaceos",  name: "Crustáceos",    emoji: "🦐" },
  { id: "huevos",      name: "Huevos",         emoji: "🥚" },
  { id: "pescado",     name: "Pescado",        emoji: "🐟" },
  { id: "cacahuetes",  name: "Cacahuetes",    emoji: "🥜" },
  { id: "soja",        name: "Soja",           emoji: "🫘" },
  { id: "lacteos",     name: "Lácteos",        emoji: "🥛" },
  { id: "frutossecos", name: "Frutos secos",   emoji: "🌰" },
  { id: "apio",        name: "Apio",           emoji: "🌿" },
  { id: "mostaza",     name: "Mostaza",        emoji: "🌼" },
  { id: "sesamo",      name: "Sésamo",         emoji: "🌱" },
  { id: "sulfitos",    name: "Sulfitos",       emoji: "🍷" },
  { id: "altramuces",  name: "Altramuces",    emoji: "🌸" },
  { id: "moluscos",    name: "Moluscos",       emoji: "🦑" },
  { id: "fructosa",    name: "Fructosa",       emoji: "🍬" },
  { id: "cebolla",     name: "Cebolla / Ajo",  emoji: "🧅" },
  { id: "latexfruta",  name: "Látex-fruta",    emoji: "🥑" },
] as const;

type AllergenId = (typeof ALLERGENS)[number]["id"];
type Severity   = "alergia" | "intolerancia";
type Selected   = Map<AllergenId, Severity>;

/* ── Props ── */
type Props = {
  open: boolean;
  onClose: () => void;
  /** El campo actual de texto libre; el picker lo complementa. */
  value: string;
  onChange: (serialized: string) => void;
};

/* ── Serialización → texto legible para guardar en BD ── */
function serialize(selected: Selected, custom: string): string {
  const parts: string[] = [];
  for (const allergen of ALLERGENS) {
    const sev = selected.get(allergen.id);
    if (sev) parts.push(`${allergen.emoji} ${allergen.name} (${sev})`);
  }
  if (custom.trim()) parts.push(custom.trim());
  return parts.join(", ");
}

/* ── Deserialización → recuperar estado desde texto ── */
function deserialize(text: string): { selected: Selected; custom: string } {
  const selected: Selected = new Map();
  let remaining = text;
  for (const allergen of ALLERGENS) {
    const alergia      = `${allergen.emoji} ${allergen.name} (alergia)`;
    const intolerancia = `${allergen.emoji} ${allergen.name} (intolerancia)`;
    if (remaining.includes(alergia)) {
      selected.set(allergen.id, "alergia");
      remaining = remaining.replace(alergia, "").replace(/^,\s*|,\s*$/, "").replace(/,\s*,/, ",").trim();
    } else if (remaining.includes(intolerancia)) {
      selected.set(allergen.id, "intolerancia");
      remaining = remaining.replace(intolerancia, "").replace(/^,\s*|,\s*$/, "").replace(/,\s*,/, ",").trim();
    }
  }
  return { selected, custom: remaining };
}

const GOLD  = "#daa520";
const DARK  = "#222222";
const DARK2 = "#1A1A1A";
const LIGHT = "#888888";
const OFF   = "#F5F0E8";

/* ── Componente ── */
export function AllergyPicker({ open, onClose, value, onChange }: Props) {
  const init     = deserialize(value);
  const [sel,    setSel]    = useState<Selected>(init.selected);
  const [custom, setCustom] = useState(init.custom);
  const customRef = useRef<HTMLInputElement>(null);

  /* Sincronizar con el valor externo al abrir */
  useEffect(() => {
    if (open) {
      const parsed = deserialize(value);
      setSel(parsed.selected);
      setCustom(parsed.custom);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  function toggle(id: AllergenId) {
    setSel((prev) => {
      const next = new Map(prev);
      if (!next.has(id)) {
        next.set(id, "alergia");
      } else if (next.get(id) === "alergia") {
        next.set(id, "intolerancia");
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function setSeverity(id: AllergenId, sev: Severity) {
    setSel((prev) => { const m = new Map(prev); m.set(id, sev); return m; });
  }

  function handleConfirm() {
    onChange(serialize(sel, custom));
    onClose();
  }

  function handleClear() {
    setSel(new Map());
    setCustom("");
  }

  const selectedCount = sel.size;

  return (
    /* Overlay */
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) { handleConfirm(); } }}
    >
      {/* Card */}
      <div
        style={{
          background: DARK2,
          border: "1px solid rgba(200,169,110,0.2)",
          borderRadius: 6,
          width: "100%", maxWidth: 560,
          maxHeight: "90vh",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: LIGHT, marginBottom: "0.2rem" }}>
              Alergias e intolerancias
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 300, color: OFF, fontFamily: "var(--font-cormorant), Georgia, serif" }}>
              Indica lo que aplica
            </div>
          </div>
          <button
            onClick={handleConfirm}
            style={{ background: "none", border: "none", color: LIGHT, fontSize: "1.1rem", cursor: "pointer", padding: "0.25rem 0.5rem", lineHeight: 1 }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Instrucción */}
        <div style={{ padding: "0.75rem 1.5rem 0", flexShrink: 0 }}>
          <p style={{ fontSize: "0.72rem", color: LIGHT, margin: 0, lineHeight: 1.5 }}>
            Toca una vez para <span style={{ color: "#E57373" }}>alergia</span> · toca de nuevo para <span style={{ color: "#FFB74D" }}>intolerancia</span> · toca otra vez para quitar
          </p>
        </div>

        {/* Grid de alérgenos */}
        <div style={{
          overflowY: "auto", flex: 1,
          padding: "1rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))",
          gap: "0.5rem",
          alignContent: "start",
        }}>
          {ALLERGENS.map((a) => {
            const sev  = sel.get(a.id);
            const isA  = sev === "alergia";
            const isI  = sev === "intolerancia";

            const borderColor = isA ? "#E57373" : isI ? "#FFB74D" : "rgba(200,169,110,0.18)";
            const bgColor     = isA ? "rgba(229,115,115,0.10)" : isI ? "rgba(255,183,77,0.10)" : "transparent";

            return (
              <div key={a.id} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {/* Pill */}
                <button
                  type="button"
                  onClick={() => toggle(a.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.45rem",
                    padding: "0.45rem 0.75rem",
                    border: `1px solid ${borderColor}`,
                    background: bgColor,
                    borderRadius: 20,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "1rem", lineHeight: 1, flexShrink: 0 }}>{a.emoji}</span>
                  <span style={{ fontSize: "0.75rem", color: sev ? OFF : LIGHT, fontWeight: sev ? 500 : 400, letterSpacing: "0.01em", textAlign: "left" }}>
                    {a.name}
                  </span>
                  {sev && (
                    <span style={{
                      marginLeft: "auto", fontSize: "0.58rem", fontWeight: 700, flexShrink: 0,
                      color: isA ? "#E57373" : "#FFB74D",
                      background: isA ? "rgba(229,115,115,0.15)" : "rgba(255,183,77,0.15)",
                      padding: "1px 5px", borderRadius: 10,
                    }}>
                      {isA ? "A" : "I"}
                    </span>
                  )}
                </button>

                {/* Severity toggle (visible solo cuando está seleccionado) */}
                {sev && (
                  <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(200,169,110,0.15)" }}>
                    {(["alergia", "intolerancia"] as Severity[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSeverity(a.id, s)}
                        style={{
                          flex: 1, padding: "3px 0",
                          fontSize: "0.62rem", fontWeight: 600,
                          border: "none", cursor: "pointer",
                          background: sev === s
                            ? (s === "alergia" ? "#E57373" : "#FFB74D")
                            : "rgba(255,255,255,0.04)",
                          color: sev === s ? "#0A0A0A" : LIGHT,
                          transition: "all 0.12s",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {s === "alergia" ? "Alergia" : "Intolerancia"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Campo libre */}
        <div style={{ padding: "0 1.5rem 1rem", flexShrink: 0, borderTop: "1px solid rgba(200,169,110,0.08)", paddingTop: "0.85rem" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: LIGHT, marginBottom: "0.4rem" }}>
            Otras (texto libre)
          </div>
          <input
            ref={customRef}
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Ej: intolerancia al anisakis, alergia a las fresas…"
            style={{
              width: "100%", background: DARK, border: "1px solid rgba(200,169,110,0.2)",
              color: OFF, padding: "0.5rem 0.75rem", borderRadius: 4,
              fontSize: "0.78rem", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "0.85rem 1.5rem",
          borderTop: "1px solid rgba(200,169,110,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0, gap: "1rem",
        }}>
          <button
            type="button"
            onClick={handleClear}
            style={{ background: "none", border: "none", color: LIGHT, fontSize: "0.75rem", cursor: "pointer", padding: 0 }}
          >
            Limpiar todo
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              background: GOLD, color: "#0A0A0A", border: "none",
              padding: "0.6rem 1.5rem", borderRadius: 2,
              fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {selectedCount > 0 ? `Confirmar (${selectedCount})` : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
