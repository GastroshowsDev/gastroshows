"use client";

import { useState, useEffect } from "react";
import {
  Plus, Clock, Mail, Loader2, Save, Zap, Settings, ArrowDown,
  X, ToggleLeft, ToggleRight, CalendarCheck2, Building2,
  Filter, Tag, Webhook,
} from "lucide-react";

const TRIGGERS = [
  { id: "RESERVATION_CONFIRMED", label: "Reserva Confirmada (pago OK)", icon: "✅", color: "#10B981" },
  { id: "RESERVATION_CREATED",   label: "Nueva Reserva",                icon: "📋", color: "#3B82F6" },
  { id: "VISIT_REQUESTED",       label: "Solicitud de Visita",          icon: "👥", color: "#8B5CF6" },
  { id: "PAYMENT_FAILED",        label: "Fallo en el Pago",             icon: "❌", color: "#EF4444" },
  { id: "GIFT_PURCHASED",        label: "Regalo Comprado",              icon: "🎁", color: "#F59E0B" },
  { id: "EVENT_TOMORROW",        label: "Evento Mañana",                icon: "📅", color: "#06B6D4" },
  { id: "POST_EVENT",            label: "Después del Evento",           icon: "🌟", color: "#EC4899" },
];

const STEP_TYPES = [
  { id: "email",             label: "Enviar Email",          icon: Mail,          color: "#3B82F6", desc: "Envía una plantilla al cliente" },
  { id: "wait",              label: "Esperar N días",        icon: Clock,         color: "#F59E0B", desc: "Pausar N días antes del siguiente paso" },
  { id: "waitUntilRelative", label: "Esperar hasta D-N",    icon: CalendarCheck2, color: "#0EA5E9", desc: "Espera hasta N días antes de la fecha del evento" },
  { id: "venueEmail",        label: "Email por local",       icon: Building2,     color: "#8B5CF6", desc: "Elige la plantilla según Bertrand o Urgell al enviar" },
  { id: "condition",         label: "Condición",             icon: Filter,        color: "#6366F1", desc: "Continuar solo si se cumple" },
  { id: "tag",               label: "Etiquetar",             icon: Tag,           color: "#10B981", desc: "Añadir etiqueta al contacto" },
  { id: "webhook",           label: "Webhook",               icon: Webhook,       color: "#EC4899", desc: "Llamar a una URL externa" },
];

const STEP_ICON: Record<string, string> = {
  email: "✉",
  wait: "⏳",
  waitUntilRelative: "📅",
  venueEmail: "🏢",
  condition: "?",
  tag: "🏷",
  webhook: "⚡",
};

const STEP_DEFAULTS: Record<string, any> = {
  email:             { type: "email",             templateKey: "",   label: "Nuevo email" },
  wait:              { type: "wait",              delayDays: 1,      label: "Esperar" },
  waitUntilRelative: { type: "waitUntilRelative", daysBeforeEvent: 14, label: "Esperar hasta D-14" },
  venueEmail:        { type: "venueEmail",        bertrandKey: "",   urgellKey: "", label: "Email por local" },
  condition:         { type: "condition",         field: "guests",   operator: "gte", value: "4", label: "Condición" },
  tag:               { type: "tag",               tagName: "",       label: "Etiqueta" },
  webhook:           { type: "webhook",           url: "",           label: "Webhook" },
};

export default function AutomatizacionesPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [showStepPicker, setShowStepPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => { fetchWorkflows(); }, []);

  async function fetchWorkflows() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/workflows");
      const json = await res.json();
      if (json.ok) setWorkflows(json.data);
    } catch { /* */ } finally { setLoading(false); }
  }

  async function handleSeedMain() {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/workflows/seed", { method: "POST" });
      const json = await res.json();
      if (json.ok) await fetchWorkflows();
      else alert(json.message ?? "Error al crear flujo");
    } catch { alert("Error de conexión"); } finally { setSeeding(false); }
  }

  function handleCreate() {
    setEditing({
      name: "Nuevo Flujo",
      trigger: "RESERVATION_CONFIRMED",
      description: "",
      active: true,
      steps: [{ type: "email", templateKey: "BIENVENIDA_RESERVA", label: "Email de bienvenida" }],
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) { setEditing(null); fetchWorkflows(); }
    } catch { alert("Error al guardar"); } finally { setSaving(false); }
  }

  function addStep(type: string) {
    setEditing({ ...editing, steps: [...editing.steps, STEP_DEFAULTS[type] || STEP_DEFAULTS.email] });
    setShowStepPicker(false);
  }

  function removeStep(i: number) {
    const next = [...editing.steps]; next.splice(i, 1);
    setEditing({ ...editing, steps: next });
  }

  function updateStep(i: number, patch: any) {
    const next = [...editing.steps]; next[i] = { ...next[i], ...patch };
    setEditing({ ...editing, steps: next });
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  /* ─── List View ─── */
  if (!editing) return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Zap className="w-8 h-8 text-amber-500" /> Automatizaciones</h1>
          <p className="text-zinc-500 text-sm mt-1">Flujos inteligentes que se ejecutan automáticamente.</p>
        </div>
        <div className="flex items-center gap-3">
          {workflows.length === 0 && (
            <button
              onClick={handleSeedMain}
              disabled={seeding}
              className="bg-amber-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:bg-amber-600 disabled:opacity-50"
            >
              {seeding ? <Loader2 className="animate-spin w-4 h-4" /> : "⚡"}
              Crear Flujo Principal
            </button>
          )}
          <button
            onClick={handleCreate}
            className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Crear Flujo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workflows.map(w => {
          const trigger = TRIGGERS.find(t => t.id === w.trigger);
          const steps = (w.steps || []) as any[];
          return (
            <div
              key={w.id}
              onClick={() => setEditing(w)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{trigger?.icon || "⚡"}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${w.active ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                    {w.active ? "Activo" : "Pausado"}
                  </span>
                </div>
                <Settings className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-1">{w.name}</h3>
              <p className="text-sm text-zinc-500 mb-5">{w.description || trigger?.label || w.trigger}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {steps.slice(0, 7).map((s: any, i: number) => {
                  const meta = STEP_TYPES.find(st => st.id === s.type);
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs" style={{ background: meta?.color || "#999" }}>
                        {STEP_ICON[s.type] ?? "⚡"}
                      </div>
                      {i < Math.min(steps.length - 1, 6) && (
                        <ArrowDown className="w-3 h-3 text-zinc-300 rotate-[-90deg]" />
                      )}
                    </div>
                  );
                })}
                {steps.length > 7 && <span className="text-[10px] text-zinc-400 ml-1">+{steps.length - 7}</span>}
              </div>
            </div>
          );
        })}
        {workflows.length === 0 && (
          <div className="md:col-span-2 py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <Zap className="w-16 h-16 text-zinc-200 dark:text-zinc-700 mx-auto mb-6" />
            <p className="text-zinc-400 text-lg mb-2">Sin automatizaciones aún</p>
            <p className="text-zinc-400 text-sm mb-6">Crea el flujo principal preconfigurado o empieza desde cero.</p>
            <button onClick={handleSeedMain} disabled={seeding} className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 disabled:opacity-50">
              {seeding ? "Creando…" : "⚡ Crear Flujo Principal de Reservas"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── Editor View ─── */
  const trigger = TRIGGERS.find(t => t.id === editing.trigger);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Top bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm font-medium">← Volver</button>
            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
            <input
              type="text"
              value={editing.name}
              onChange={e => setEditing({ ...editing, name: e.target.value })}
              className="bg-transparent text-xl font-bold focus:outline-none w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setEditing({ ...editing, active: !editing.active })} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              {editing.active ? <ToggleRight className="w-5 h-5 text-green-500" /> : <ToggleLeft className="w-5 h-5" />}
              {editing.active ? "Activo" : "Pausado"}
            </button>
            <button onClick={handleSave} disabled={saving} className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />} Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Flowchart */}
      <div className="flex flex-col items-center">
        {/* Trigger Node */}
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border-2 rounded-2xl shadow-lg overflow-hidden" style={{ borderColor: trigger?.color || "#10B981" }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${trigger?.color || "#10B981"}18` }}>
            <span className="text-2xl">{trigger?.icon || "⚡"}</span>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: trigger?.color || "#10B981" }}>Disparador</div>
              <select
                value={editing.trigger}
                onChange={e => setEditing({ ...editing, trigger: e.target.value })}
                className="bg-transparent font-bold text-sm focus:outline-none w-full mt-0.5"
              >
                {TRIGGERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800">
            <input
              type="text"
              placeholder="Descripción del flujo (opcional)"
              value={editing.description || ""}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="bg-transparent text-xs text-zinc-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Steps */}
        {editing.steps.map((step: any, i: number) => {
          const meta = STEP_TYPES.find(st => st.id === step.type);
          const Icon = meta?.icon || Mail;
          return (
            <div key={i} className="flex flex-col items-center w-full max-w-lg">
              <div className="w-0.5 h-8 bg-zinc-200 dark:bg-zinc-700" />
              <ArrowDown className="w-4 h-4 text-zinc-300 -my-1" />
              <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button onClick={() => removeStep(i)} className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm" style={{ background: meta?.color || "#999" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2.5">
                      <select
                        value={step.type}
                        onChange={e => updateStep(i, { ...STEP_DEFAULTS[e.target.value], type: e.target.value })}
                        className="bg-transparent font-bold text-sm focus:outline-none"
                      >
                        {STEP_TYPES.map(st => <option key={st.id} value={st.id}>{st.label}</option>)}
                      </select>
                      <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Paso {i + 1}</span>
                    </div>

                    {/* email */}
                    {step.type === "email" && (
                      <input
                        type="text"
                        placeholder="Clave de plantilla (ej: BIENVENIDA_RESERVA)"
                        value={step.templateKey || ""}
                        onChange={e => updateStep(i, { templateKey: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono"
                      />
                    )}

                    {/* wait */}
                    {step.type === "wait" && (
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          value={step.delayDays ?? 0}
                          onChange={e => updateStep(i, { delayDays: parseInt(e.target.value) || 0 })}
                          className="w-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-center"
                        />
                        <span className="text-sm text-zinc-500">días de espera desde el paso anterior</span>
                      </div>
                    )}

                    {/* waitUntilRelative */}
                    {step.type === "waitUntilRelative" && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-500">Esperar hasta</span>
                        <input
                          type="number"
                          min="0"
                          value={step.daysBeforeEvent ?? 0}
                          onChange={e => updateStep(i, { daysBeforeEvent: parseInt(e.target.value) || 0 })}
                          className="w-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-center"
                        />
                        <span className="text-sm text-zinc-500">días antes del evento</span>
                      </div>
                    )}

                    {/* venueEmail */}
                    {step.type === "venueEmail" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-400 w-20 shrink-0">Bertrand</span>
                          <input
                            type="text"
                            placeholder="Clave plantilla Bertrand"
                            value={step.bertrandKey || ""}
                            onChange={e => updateStep(i, { bertrandKey: e.target.value })}
                            className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm font-mono"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-400 w-20 shrink-0">Urgell</span>
                          <input
                            type="text"
                            placeholder="Clave plantilla Urgell"
                            value={step.urgellKey || ""}
                            onChange={e => updateStep(i, { urgellKey: e.target.value })}
                            className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm font-mono"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-tight">
                          La plantilla se elige en el momento del envío según el local asignado a la reserva. Si no hay local, reintenta cada 6 horas.
                        </p>
                      </div>
                    )}

                    {/* condition */}
                    {step.type === "condition" && (
                      <div className="flex items-center gap-2 text-sm">
                        <select value={step.field || "guests"} onChange={e => updateStep(i, { field: e.target.value })} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-2 text-xs">
                          <option value="guests">Nº personas</option>
                          <option value="isFirstVisit">Primera visita</option>
                          <option value="totalAmount">Importe total</option>
                        </select>
                        <select value={step.operator || "gte"} onChange={e => updateStep(i, { operator: e.target.value })} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-2 text-xs">
                          <option value="eq">=</option><option value="gte">≥</option><option value="lte">≤</option><option value="gt">&gt;</option><option value="lt">&lt;</option>
                        </select>
                        <input type="text" value={step.value || ""} onChange={e => updateStep(i, { value: e.target.value })} className="w-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-2 text-xs text-center" />
                      </div>
                    )}

                    {/* tag */}
                    {step.type === "tag" && (
                      <input type="text" placeholder="Nombre de la etiqueta" value={step.tagName || ""} onChange={e => updateStep(i, { tagName: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm" />
                    )}

                    {/* webhook */}
                    {step.type === "webhook" && (
                      <input type="url" placeholder="https://…" value={step.url || ""} onChange={e => updateStep(i, { url: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Step */}
        <div className="w-0.5 h-8 bg-zinc-200 dark:bg-zinc-700" />
        <div className="relative">
          <button
            onClick={() => setShowStepPicker(!showStepPicker)}
            className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-500 dark:hover:text-white dark:hover:border-zinc-500 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
          {showStepPicker && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-3 w-80 z-10">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-2">Añadir paso</div>
              {STEP_TYPES.map(st => (
                <button key={st.id} onClick={() => addStep(st.id)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: st.color }}>
                    <st.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{st.label}</div>
                    <div className="text-[11px] text-zinc-400">{st.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* End Node */}
        <div className="w-0.5 h-6 bg-zinc-200 dark:bg-zinc-700" />
        <div className="w-32 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Fin del flujo
        </div>
      </div>
    </div>
  );
}
