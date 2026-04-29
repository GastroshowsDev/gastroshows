"use client";

import { useState } from "react";
import { Send, Users, Filter, CheckCircle2, Loader2, Megaphone } from "lucide-react";

export default function CampanasPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [campaign, setCampaign] = useState({
    subject: "",
    content: "",
    segment: "all"
  });

  async function handleSend() {
    if (!confirm("¿Estás seguro de que quieres enviar este email a todos los clientes seleccionados?")) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/comunicacion/campanas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign)
      });
      if (res.ok) setSent(true);
      else alert("Error al enviar la campaña");
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">¡Campaña enviada con éxito!</h1>
        <p className="text-zinc-500 mb-8">El proceso de envío ha comenzado a través de Mailrelay.</p>
        <button 
          onClick={() => setSent(false)}
          className="text-zinc-900 dark:text-white font-semibold underline"
        >
          Enviar otra campaña
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Campañas de Emailing</h1>
          <p className="text-zinc-500 text-sm">Envía comunicaciones masivas a tus clientes utilizando Mailrelay.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
             <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Asunto de la campaña</label>
                  <input 
                    type="text"
                    value={campaign.subject}
                    onChange={e => setCampaign({...campaign, subject: e.target.value})}
                    placeholder="Ej: ¡Nuevo menú de temporada en Gastroshows!"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Contenido del mensaje</label>
                  <textarea 
                    value={campaign.content}
                    onChange={e => setCampaign({...campaign, content: e.target.value})}
                    placeholder="Escribe aquí tu mensaje..."
                    className="w-full h-80 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-4 font-mono text-sm resize-none"
                  />
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-zinc-400" /> Segmentación
            </h3>
            <div className="space-y-3">
               {["all", "past_month", "past_year", "newsletter"].map(s => (
                 <label key={s} className="flex items-center gap-3 p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <input 
                      type="radio" 
                      name="segment" 
                      checked={campaign.segment === s}
                      onChange={() => setCampaign({...campaign, segment: s})}
                      className="accent-zinc-900"
                    />
                    <span className="text-sm capitalize">{s.replace("_", " ")}</span>
                 </label>
               ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
               <button 
                onClick={handleSend}
                disabled={loading || !campaign.subject || !campaign.content}
                className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
               >
                 {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                 Lanzar Campaña
               </button>
               <p className="text-[10px] text-center text-zinc-400 mt-4 uppercase tracking-widest font-medium">Enviado vía Mailrelay SMTP</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-4 rounded-xl">
             <div className="flex gap-3">
                <Filter className="w-4 h-4 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong>Nota:</strong> Las campañas masivas se envían de forma escalonada para proteger la reputación de tu dominio.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
