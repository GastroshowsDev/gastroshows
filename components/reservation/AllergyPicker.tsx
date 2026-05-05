"use client";

import { useEffect, useState } from "react";

type Severity = "alergia" | "intolerancia" | "no-gusta";

interface AllergenDef {
  id: string;
  name: string;
  emoji: string;
  subOptions?: { id: string; name: string; emoji: string }[];
}

const ALLERGENS: AllergenDef[] = [
  { id: "gluten",      name: "Gluten",        emoji: "🌾" },
  { id: "huevos",      name: "Huevos",         emoji: "🥚" },
  { id: "pescado",     name: "Pescado",        emoji: "🐟" },
  { id: "lacteos",     name: "Lácteos",        emoji: "🥛" },
  { 
    id: "frutossecos", 
    name: "Frutos secos",   
    emoji: "🌰",
    subOptions: [
      { id: "almendras", name: "Almendras", emoji: "🥜" },
      { id: "avellanas", name: "Avellanas", emoji: "🌰" },
      { id: "nueces",    name: "Nueces",    emoji: "🥥" },
      { id: "pistachos", name: "Pistachos", emoji: "🟢" },
    ]
  },
  { 
    id: "crustaceos",  
    name: "Crustáceos",    
    emoji: "🦐",
    subOptions: [
      { id: "gambas",    name: "Gambas / Langostinos", emoji: "🦐" },
      { id: "langosta",  name: "Langosta / Bogavante", emoji: "🦞" },
      { id: "cangrejo",  name: "Cangrejos",           emoji: "🦀" },
    ]
  },
  { 
    id: "moluscos",    
    name: "Moluscos",       
    emoji: "🦑", 
    subOptions: [
      { id: "bivalvos",   name: "Bivalvos (Almejas, Mejillones...)", emoji: "🐚" },
      { id: "cefalopodos", name: "Cefalópodos (Pulpo, Calamar...)",   emoji: "🐙" },
    ] 
  },
  { id: "cacahuetes",  name: "Cacahuetes",    emoji: "🥜" },
  { id: "soja",        name: "Soja",           emoji: "🫘" },
  { id: "apio",        name: "Apio",           emoji: "🌿" },
  { id: "mostaza",     name: "Mostaza",        emoji: "🌼" },
  { id: "sesamo",      name: "Sésamo",         emoji: "🌱" },
  { id: "sulfitos",    name: "Sulfitos",       emoji: "🍷" },
  { id: "altramuces",  name: "Altramuces",    emoji: "🌸" },
  { id: "cebolla",     name: "Cebolla",        emoji: "🧅" },
  { id: "ajo",         name: "Ajo",           emoji: "🧄" },
  { id: "fructosa",    name: "Fructosa",       emoji: "🍬" },
  { id: "latexfruta",  name: "Látex-fruta",    emoji: "🥑" },
];

type Selected = Map<string, { severity: Severity; subOptions?: string[] }>;

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (serialized: string) => void;
};

/* ── Helpers ── */
function serialize(selected: Selected, custom: string): string {
  const parts: string[] = [];
  for (const allergen of ALLERGENS) {
    const data = selected.get(allergen.id);
    if (data) {
      const sevLabel = data.severity === "no-gusta" ? "No gusta" : data.severity;
      let label = `${allergen.emoji} ${allergen.name} (${sevLabel})`;
      if (data.subOptions?.length) {
        label += `: ${data.subOptions.join(" + ")}`;
      }
      parts.push(label);
    }
  }
  if (custom.trim()) parts.push(custom.trim());
  return parts.join(", ");
}

function deserialize(text: string): { selected: Selected; custom: string } {
  const selected: Selected = new Map();
  let remaining = text;
  
  for (const allergen of ALLERGENS) {
    const pattern = new RegExp(`${allergen.emoji} ${allergen.name} \\((alergia|intolerancia|No gusta)\\)(: ([^,]+))?`);
    const match = remaining.match(pattern);
    if (match) {
      const sev = match[1] === "No gusta" ? "no-gusta" : match[1] as Severity;
      const subs = match[3] ? match[3].split(" + ") : undefined;
      selected.set(allergen.id, { severity: sev, subOptions: subs });
      remaining = remaining.replace(match[0], "").replace(/^,\s*|,\s*$/, "").replace(/,\s*,/, ",").trim();
    }
  }
  return { selected, custom: remaining };
}

const GOLD  = "#daa520";
const DARK  = "#111111";
const DARK2 = "#0A0A0A";
const LIGHT = "#A0A0A0";
const OFF   = "#FFFFFF";

export function AllergyPicker({ open, onClose, value, onChange }: Props) {
  const init = deserialize(value);
  const [sel, setSel] = useState<Selected>(init.selected);
  const [custom, setCustom] = useState(init.custom);

  useEffect(() => {
    if (open) {
      const parsed = deserialize(value);
      setSel(parsed.selected);
      setCustom(parsed.custom);
    }
  }, [open, value]);

  if (!open) return null;

  function toggle(id: string) {
    setSel((prev) => {
      const next = new Map(prev);
      if (!next.has(id)) {
        next.set(id, { severity: "alergia" });
      } else {
        const current = next.get(id)!;
        if (current.severity === "alergia") next.set(id, { ...current, severity: "intolerancia" });
        else if (current.severity === "intolerancia") next.set(id, { ...current, severity: "no-gusta" });
        else next.delete(id);
      }
      return next;
    });
  }

  function toggleSubOption(allergenId: string, subName: string) {
    setSel((prev) => {
      const next = new Map(prev);
      const current = next.get(allergenId);
      if (!current) return next;
      
      const subs = current.subOptions || [];
      const newSubs = subs.includes(subName) 
        ? subs.filter(s => s !== subName) 
        : [...subs, subName];
      
      next.set(allergenId, { ...current, subOptions: newSubs });
      return next;
    });
  }

  function handleConfirm() {
    onChange(serialize(sel, custom));
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleConfirm(); }}
    >
      <div
        style={{
          background: DARK2,
          border: "1px solid rgba(200,169,110,0.3)",
          borderRadius: 16,
          width: "100%", maxWidth: 800,
          maxHeight: "92vh",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "2rem",
          borderBottom: "1px solid rgba(200,169,110,0.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "0.5rem" }}>
              Protocolo de Seguridad Alimentaria
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 300, color: OFF, fontFamily: "var(--font-cormorant), Georgia, serif" }}>
              Indique alergias, intolerancias o preferencias
            </div>
          </div>
          <button onClick={handleConfirm} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: OFF, width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        </div>

        {/* Grid Principal */}
        <div style={{ overflowY: "auto", flex: 1, padding: "2rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}>
            {ALLERGENS.map((a) => {
              const data = sel.get(a.id);
              const isSelected = !!data;
              
              const severityColors = {
                "alergia": "#EF4444",
                "intolerancia": "#F59E0B",
                "no-gusta": "#10B981"
              };
              
              const activeColor = data ? severityColors[data.severity] : "rgba(200,169,110,0.2)";

              return (
                <div key={a.id} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {/* Botón Principal (Píldora) */}
                  <button
                    type="button"
                    onClick={() => toggle(a.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 1.25rem",
                      border: `1px solid ${isSelected ? activeColor : "rgba(255,255,255,0.1)"}`,
                      background: isSelected ? `${activeColor}15` : "transparent",
                      borderRadius: 99,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{a.emoji}</span>
                    <span style={{ fontSize: "1.1rem", color: isSelected ? OFF : LIGHT, fontWeight: isSelected ? 600 : 400 }}>
                      {a.name}
                    </span>
                    {data && (
                      <div style={{ 
                        marginLeft: "auto", 
                        width: 12, height: 12, 
                        borderRadius: "50%", 
                        background: activeColor,
                        boxShadow: `0 0 10px ${activeColor}`
                      }} />
                    )}
                  </button>

                  {/* Selector de Severidad */}
                  {data && (
                    <div style={{ 
                      display: "flex", 
                      background: "rgba(255,255,255,0.03)", 
                      borderRadius: 12, 
                      padding: "4px",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      {(["alergia", "intolerancia", "no-gusta"] as Severity[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            const next = new Map(sel);
                            next.set(a.id, { ...data, severity: s });
                            setSel(next);
                          }}
                          style={{
                            flex: 1, padding: "6px 2px", borderRadius: 8, fontSize: "0.7rem", fontWeight: 700,
                            textTransform: "uppercase", border: "none", cursor: "pointer",
                            background: data.severity === s ? severityColors[s] : "transparent",
                            color: data.severity === s ? "#000" : LIGHT,
                            transition: "all 0.2s",
                          }}
                        >
                          {s === "no-gusta" ? "No gusta" : s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Sub-opciones (UI Mejorada) */}
                  {data && a.subOptions && (
                    <div style={{ 
                      marginTop: "0.5rem", 
                      padding: "1rem", 
                      background: "rgba(200,169,110,0.05)", 
                      borderRadius: 16,
                      border: "1px solid rgba(200,169,110,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}>
                      <div style={{ fontSize: "0.7rem", color: GOLD, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                        Especificar {a.name}:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {a.subOptions.map((sub) => {
                          const isSubActive = data.subOptions?.includes(sub.name);
                          return (
                            <button
                              key={sub.id}
                              onClick={() => toggleSubOption(a.id, sub.name)}
                              style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                padding: "0.6rem 1rem", borderRadius: 99, fontSize: "0.85rem",
                                border: `1px solid ${isSubActive ? GOLD : "rgba(255,255,255,0.1)"}`,
                                background: isSubActive ? `${GOLD}30` : "transparent",
                                color: isSubActive ? OFF : LIGHT,
                                cursor: "pointer", transition: "all 0.2s",
                              }}
                            >
                              <span>{sub.emoji}</span>
                              <span>{sub.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "2rem", borderTop: "1px solid rgba(200,169,110,0.15)", display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
             <div style={{ fontSize: "0.75rem", color: GOLD, fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase" }}>Notas adicionales de cocina</div>
             <input 
               type="text" 
               value={custom}
               onChange={(e) => setCustom(e.target.value)}
               placeholder="Ej: Alergia severa a las fresas, trazas de frutos secos..."
               style={{
                 width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                 padding: "1rem 1.25rem", borderRadius: 12, color: OFF, fontSize: "1rem", outline: "none"
               }}
             />
          </div>
          <button 
            onClick={handleConfirm}
            style={{
              background: GOLD, color: "#000", border: "none",
              padding: "1.2rem 3rem", borderRadius: 99,
              fontSize: "1rem", fontWeight: 800, textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.3s",
              boxShadow: `0 8px 24px ${GOLD}40`
            }}
          >
            Confirmar Parte
          </button>
        </div>
      </div>
    </div>
  );
}
