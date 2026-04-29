"use client";

import { useState, useEffect } from "react";
import { Mail, Save, Plus, Trash2, Eye, Code, Loader2 } from "lucide-react";

const DEFAULT_TEMPLATES = [
  {
    key: "D14",
    subject: "[Confirmación Requerida] Tu experiencia en Gastroshows - {{FECHA}}",
    content: `Hola **{{NOMBRE}}**,

Faltan exactamente **dos semanas** para tu reserva con nosotros y ya estamos empezando a organizar todos los detalles para que disfrutes de una noche inolvidable.

Para que podamos ofrecerte el mejor servicio y asegurar que la disposición de la sala sea perfecta, necesitamos que nos confirmes un par de puntos:

1.  **Número de asistentes:** Confírmanos si el número de personas indicado en tu reserva (**{{GUESTS}} personas**) sigue siendo el mismo. Cualquier pequeño cambio es importante para nosotros.
2.  **¿Vienes con más amigos?:** Si vienes acompañado de otras personas que hayan hecho su reserva por separado, por favor, indícanos su nombre o número de referencia. Así podremos organizar vuestras mesas para que estéis juntos o lo más cerca posible.

**¿Cómo confirmar?**
Simplemente responde a este email o envíanos un WhatsApp rápido al **+34 620 26 95 85**.

Tu colaboración nos ayuda a que, cuando cruces nuestra puerta, todo esté exactamente como lo imaginamos para ti.

¡Estamos deseando recibirte!

Atentamente,
**El equipo de Gastroshows**`
  }
];

export default function PlantillasPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState("D14");
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/templates");
      const json = await res.json();
      if (json.ok) {
        setTemplates(json.data.length > 0 ? json.data : DEFAULT_TEMPLATES);
        const initial = json.data.find((t: any) => t.key === "D14") || DEFAULT_TEMPLATES[0];
        setEditing(initial);
      }
    } catch {
      setTemplates(DEFAULT_TEMPLATES);
      setEditing(DEFAULT_TEMPLATES[0]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        alert("Plantilla guardada correctamente");
        fetchTemplates();
      }
    } catch {
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Plantillas de Email</h1>
          <p className="text-zinc-500 text-sm">Gestiona los mensajes automáticos y manuales de Gastroshows.</p>
        </div>
        <button className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
          <Plus className="w-4 h-4" /> Nueva Plantilla
        </button>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 shrink-0 overflow-y-auto pr-2">
          <div className="space-y-1">
            {templates.map(t => (
              <button
                key={t.key}
                onClick={() => setEditing(t)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  editing?.key === t.key 
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Mail className="w-4 h-4 opacity-70" />
                <span className="font-medium text-sm">{t.key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        {editing && (
          <div className="flex-1 flex flex-col gap-6 min-h-0">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden shadow-sm">
              <div className="p-4 border-bottom border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400">ID: {editing.key}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} disabled={saving} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Guardar Cambios
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Asunto del Email</label>
                  <input 
                    type="text"
                    value={editing.subject}
                    onChange={e => setEditing({...editing, subject: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 font-medium"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Contenido (Markdown / HTML)</label>
                  <textarea 
                    value={editing.content || editing.htmlContent}
                    onChange={e => setEditing({...editing, content: e.target.value})}
                    className="flex-1 w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-4 font-mono text-sm resize-none focus:ring-1 focus:ring-zinc-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-lg flex items-start gap-3">
              <Code className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Puedes usar variables dinámicas que se sustituirán automáticamente: <br/>
                  <code className="text-blue-500 font-bold">{"{{NOMBRE}}"}</code>, 
                  <code className="text-blue-500 font-bold">{" {{FECHA}}"}</code>, 
                  <code className="text-blue-500 font-bold">{" {{GUESTS}}"}</code>, 
                  <code className="text-blue-500 font-bold">{" {{TURNO}}"}</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
