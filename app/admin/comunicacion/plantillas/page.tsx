"use client";

import { useState, useEffect, useMemo } from "react";
import { Mail, Save, Plus, Trash2, Code, Loader2, X, Search } from "lucide-react";

/* ─── All supported template variables ─────────────────────────────────────── */
const ALL_VARIABLES: { code: string; label: string; description: string; scope: string }[] = [
  { code: "NOMBRE",    label: "Nombre del cliente",          description: "Nombre completo de la persona que hizo la reserva o visita.",                     scope: "Reservas y visitas" },
  { code: "EMAIL",     label: "Email del cliente",           description: "Dirección de correo electrónico del cliente.",                                    scope: "Reservas y visitas" },
  { code: "TELEFONO",  label: "Teléfono del cliente",        description: "Número de teléfono de contacto del cliente.",                                     scope: "Reservas y visitas" },
  { code: "FECHA",     label: "Fecha del evento o visita",   description: "Fecha del evento (reservas) o de la visita. Formato largo: \"martes, 15 de julio de 2025\".", scope: "Reservas y visitas" },
  { code: "HORA",      label: "Hora de la visita",           description: "Hora exacta de la visita (p. ej. \"18:30\"). Solo disponible en emails de visitas, vacío en reservas de evento.", scope: "Solo visitas" },
  { code: "TURNO",     label: "Turno del evento",            description: "\"Mediodía\" o \"Noche\" según el turno de la reserva. Vacío en visitas.",         scope: "Solo reservas" },
  { code: "GUESTS",    label: "Número de personas",          description: "Cantidad de personas incluidas en la reserva (número entero).",                    scope: "Reservas y visitas" },
  { code: "TOTAL",     label: "Importe total",               description: "Precio total de la reserva en euros, formateado con dos decimales (p. ej. \"260.00 €\").", scope: "Solo reservas" },
  { code: "DEPOSITO",  label: "Importe abonado / depósito",  description: "Cantidad ya pagada por el cliente (depósito del 30% u otro importe parcial).",     scope: "Solo reservas" },
  { code: "LOCAL",     label: "Nombre del local",            description: "Nombre del local asignado a la reserva (p. ej. \"Bertrand\" o \"Eixample (Urgell)\"). Vacío si aún no está asignado.", scope: "Solo reservas" },
  { code: "REFERENCE", label: "Referencia de la reserva",   description: "Código de referencia único de la reserva (8 caracteres alfanuméricos en mayúsculas, p. ej. \"A3F7C2B1\").", scope: "Reservas y visitas" },
];

/* ─── Variable reference modal ─────────────────────────────────────────────── */
function VariablesModal({ onClose, onInsert }: { onClose: () => void; onInsert: (code: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return ALL_VARIABLES;
    return ALL_VARIABLES.filter(
      (v) =>
        v.code.toLowerCase().includes(q) ||
        v.label.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.scope.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "80vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold">Variables disponibles</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Haz clic en cualquier variable para insertar su código en el editor.</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              autoFocus
              type="text"
              placeholder="Buscar variable…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>
        </div>

        {/* Variable list */}
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-2">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-zinc-400 py-8">No se encontraron variables</p>
          )}
          {filtered.map((v) => (
            <button
              key={v.code}
              onClick={() => { onInsert(v.code); onClose(); }}
              className="w-full text-left rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 p-4 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                      {`{{${v.code}}}`}
                    </code>
                    <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{v.label}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{v.description}</p>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full shrink-0 whitespace-nowrap mt-0.5">
                  {v.scope}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────────────── */
export default function PlantillasPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [originalKey, setOriginalKey] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showVars, setShowVars] = useState(false);

  useEffect(() => { fetchTemplates(); }, []);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/templates");
      const json = await res.json();
      if (json.ok && json.data.length > 0) {
        setTemplates(json.data);
        if (!editing) selectTemplate(json.data[0]);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }

  function selectTemplate(t: any) {
    setEditing({ ...t, content: t.content || t.htmlContent || "" });
    setOriginalKey(t.key || t.templateKey || "");
  }

  function handleNew() {
    const newTpl = { key: "", subject: "", content: "", isNew: true };
    setTemplates((prev) => {
      const already = prev.find((t) => t.isNew);
      return already ? prev : [...prev, newTpl];
    });
    setEditing(newTpl);
    setOriginalKey("");
  }

  async function handleSave() {
    if (!editing?.key?.trim()) { alert("La plantilla necesita una clave/nombre (p. ej. WELCOME, D14…)"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: editing.key.trim().toUpperCase(),
          originalKey: originalKey || undefined,
          subject: editing.subject,
          content: editing.content,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        await fetchTemplates();
        // Re-select by new key after refresh
        setOriginalKey(editing.key.trim().toUpperCase());
      } else {
        alert(json.error ?? "Error al guardar");
      }
    } catch { alert("Error de conexión"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!editing?.key || editing.isNew) {
      setTemplates((prev) => prev.filter((t) => !t.isNew));
      setEditing(templates.find((t) => !t.isNew) || null);
      return;
    }
    if (!confirm(`¿Eliminar la plantilla "${editing.key}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/templates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: editing.key }),
      });
      if (res.ok) {
        const remaining = templates.filter((t) => t.key !== editing.key && !t.isNew);
        setTemplates(remaining);
        setEditing(remaining[0] || null);
        setOriginalKey(remaining[0]?.key || "");
      }
    } catch { alert("Error al eliminar"); }
    finally { setDeleting(false); }
  }

  function handleInsertVariable(code: string) {
    const insertion = `{{${code}}}`;
    setEditing((prev: any) => ({ ...prev, content: (prev.content || "") + insertion }));
  }

  const displayTemplates = templates;

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      {showVars && <VariablesModal onClose={() => setShowVars(false)} onInsert={handleInsertVariable} />}

      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Plantillas de Email</h1>
          <p className="text-zinc-500 text-sm">Gestiona los mensajes automáticos y manuales de Gastroshows.</p>
        </div>
        <button
          onClick={handleNew}
          className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Nueva Plantilla
        </button>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 shrink-0 overflow-y-auto pr-2">
          <div className="space-y-1">
            {displayTemplates.map((t, i) => {
              const key = t.key || t.templateKey || "";
              const isActive = editing && (editing.isNew ? t.isNew : (editing.key === key));
              return (
                <button
                  key={key || `new-${i}`}
                  onClick={() => selectTemplate(t)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <Mail className="w-4 h-4 opacity-70 shrink-0" />
                  <span className="font-medium text-sm truncate">{key || "Nueva plantilla"}</span>
                  {t.isNew && <span className="ml-auto text-[10px] font-bold text-amber-500">NUEVA</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        {editing && (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden shadow-sm">
              {/* Toolbar */}
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/50 gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 shrink-0">Clave</span>
                  <input
                    type="text"
                    value={editing.key || ""}
                    onChange={(e) => setEditing({ ...editing, key: e.target.value.toUpperCase().replace(/\s/g, "_") })}
                    placeholder="NOMBRE_PLANTILLA"
                    className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-1 text-xs font-mono font-bold tracking-widest w-44 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                  {originalKey && originalKey !== editing.key && (
                    <span className="text-[10px] text-amber-500 font-medium">← renombrar desde {originalKey}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-40"
                    title="Eliminar plantilla"
                  >
                    {deleting ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Guardar
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1 min-h-0">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Asunto del Email</label>
                  <input
                    type="text"
                    value={editing.subject || ""}
                    onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                    placeholder="Asunto que verá el destinatario"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Contenido (HTML)</label>
                  <textarea
                    value={editing.content || ""}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    placeholder="<p>Hola {{NOMBRE}},</p>..."
                    className="flex-1 w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-4 font-mono text-sm resize-none focus:ring-1 focus:ring-zinc-400 outline-none min-h-0"
                  />
                </div>
              </div>
            </div>

            {/* Variables hint */}
            <div className="bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-lg flex items-start gap-3 shrink-0">
              <Code className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-500 leading-relaxed">
                <p>
                  Puedes usar variables dinámicas que se sustituirán automáticamente:{" "}
                  {["NOMBRE", "FECHA", "GUESTS", "TURNO", "REFERENCE"].map((v, i, arr) => (
                    <span key={v}>
                      <code
                        className="text-blue-500 font-bold cursor-pointer hover:underline"
                        onClick={() => handleInsertVariable(v)}
                        title={`Insertar {{${v}}}`}
                      >
                        {`{{${v}}}`}
                      </code>
                      {i < arr.length - 1 ? ", " : ". "}
                    </span>
                  ))}
                </p>
                <button
                  onClick={() => setShowVars(true)}
                  className="mt-1 text-blue-500 hover:text-blue-700 underline font-medium"
                >
                  Clica aquí para conocer más variables →
                </button>
              </div>
            </div>
          </div>
        )}

        {!editing && !loading && (
          <div className="flex-1 flex items-center justify-center text-zinc-400">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Selecciona una plantilla o crea una nueva</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
