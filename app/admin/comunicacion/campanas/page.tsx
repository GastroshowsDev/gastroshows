"use client";

import { useState, useEffect } from "react";
import { Send, Users, CheckCircle2, Loader2, Megaphone, Info, ChevronDown } from "lucide-react";

const SEGMENTS = [
  {
    id: "all",
    label: "Todos los contactos",
    desc: "Cualquier persona registrada en la base de datos",
  },
  {
    id: "attended",
    label: "Ya visitaron el local",
    desc: "Reservas confirmadas con fecha de evento en el pasado",
  },
  {
    id: "attended_6months",
    label: "Visitaron en los últimos 6 meses",
    desc: "Igual que el anterior, pero solo los últimos 6 meses — mayor engagement",
  },
  {
    id: "upcoming",
    label: "Reserva próxima confirmada",
    desc: "Tienen una reserva activa con fecha futura — útil para comunicaciones pre-evento",
  },
  {
    id: "repeat",
    label: "Clientes repetidos",
    desc: "Marcados como 'previousVisit = true' — tus clientes más fieles",
  },
  {
    id: "gift_purchasers",
    label: "Compradores de regalo",
    desc: "Han comprado al menos un GiftVoucher — segmento para campañas de gifting",
  },
  {
    id: "newsletter",
    label: "Suscritos al newsletter",
    desc: "Han dado consentimiento explícito de comunicaciones",
  },
];

export default function CampanasPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [result, setResult] = useState<{ sentCount: number; total: number } | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [campaign, setCampaign] = useState({
    subject: "",
    content: "",
    segment: "attended",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const res = await fetch("/api/admin/templates");
      const json = await res.json();
      if (json.ok && json.data) {
        setTemplates(json.data);
      }
    } catch {
      /* silent */
    } finally {
      setTemplatesLoading(false);
    }
  }

  function selectTemplate(template: any) {
    setCampaign({
      ...campaign,
      subject: template.subject || "",
      content: template.content || template.htmlContent || "",
    });
    setShowTemplateDropdown(false);
  }

  async function handleSend() {
    const seg = SEGMENTS.find(s => s.id === campaign.segment);
    if (!confirm(`¿Enviar este email al segmento "${seg?.label}"? Esta acción no se puede deshacer.`)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/comunicacion/campanas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });
      const json = await res.json();
      if (json.ok) {
        setResult({ sentCount: json.sentCount, total: json.total });
        setSent(true);
      } else {
        alert(json.error ?? "Error al enviar la campaña");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  if (sent && result) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">¡Campaña enviada!</h1>
        <p className="text-zinc-500 mb-2">
          <span className="font-bold text-zinc-900 dark:text-white">{result.sentCount}</span> de {result.total} emails enviados correctamente.
        </p>
        <p className="text-zinc-400 text-sm mb-8">El proceso de envío ha comenzado vía SMTP.</p>
        <button
          onClick={() => { setSent(false); setResult(null); }}
          className="text-zinc-900 dark:text-white font-semibold underline"
        >
          Enviar otra campaña
        </button>
      </div>
    );
  }

  const activeSeg = SEGMENTS.find(s => s.id === campaign.segment);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Campañas de Emailing</h1>
          <p className="text-zinc-500 text-sm">Envía comunicaciones masivas a segmentos de tus clientes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Asunto de la campaña</label>
              <input
                type="text"
                value={campaign.subject}
                onChange={e => setCampaign({ ...campaign, subject: e.target.value })}
                placeholder="Ej: ¡Nuevo menú de temporada en Gastroshows!"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Contenido (HTML)</label>
              <textarea
                value={campaign.content}
                onChange={e => setCampaign({ ...campaign, content: e.target.value })}
                placeholder={"<p>Hola {{NOMBRE}},</p>\n<p>...</p>"}
                className="w-full h-80 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-4 font-mono text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Plantilla Email</label>
              <div className="relative">
                <button
                  onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {templatesLoading ? "Cargando plantillas..." : templates.length === 0 ? "No hay plantillas disponibles" : "Selecciona una plantilla"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${showTemplateDropdown ? "rotate-180" : ""}`} />
                </button>

                {showTemplateDropdown && !templatesLoading && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {templates.length === 0 ? (
                      <div className="p-4 text-sm text-zinc-500 text-center">No hay plantillas disponibles</div>
                    ) : (
                      templates.map((template) => (
                        <button
                          key={template.key || template.id}
                          onClick={() => selectTemplate(template)}
                          className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 transition-colors"
                        >
                          <div className="font-semibold text-sm text-zinc-900 dark:text-white">{template.key}</div>
                          <div className="text-xs text-zinc-500 mt-1 line-clamp-1">{template.subject}</div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Segmentación */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-zinc-400" /> Segmentación
            </h3>
            <div className="space-y-2">
              {SEGMENTS.map(s => (
                <label
                  key={s.id}
                  className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                    campaign.segment === s.id
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-700"
                      : "border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="segment"
                    checked={campaign.segment === s.id}
                    onChange={() => setCampaign({ ...campaign, segment: s.id })}
                    className="accent-blue-600 mt-0.5 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold leading-tight">{s.label}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{s.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {activeSeg && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-lg p-3 flex gap-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">{activeSeg.desc}</p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={handleSend}
                disabled={loading || !campaign.subject || !campaign.content}
                className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                Lanzar Campaña
              </button>
              <p className="text-[10px] text-center text-zinc-400 mt-3 uppercase tracking-widest font-medium">Enviado vía SMTP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
