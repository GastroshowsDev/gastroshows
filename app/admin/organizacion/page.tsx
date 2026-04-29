"use client";

import { useState } from "react";
import { Calendar, ChevronRight, LayoutGrid, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function OrganizacionPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // 3 weeks
  });
  const [results, setResults] = useState<any[] | null>(null);

  async function handleAutoAllocate() {
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch("/api/admin/events/auto-allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dates)
      });
      const json = await res.json();
      if (json.ok) setResults(json.results);
      else alert("Error: " + json.error);
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Organización de Locales</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Asignación automática de reservas entre Sarrià (Bertrand) y Urgell.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <label className="block text-sm font-medium mb-4 text-zinc-700 dark:text-zinc-300">Rango de fechas</label>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-1">Desde</span>
              <input 
                type="date" 
                value={dates.from}
                onChange={e => setDates({...dates, from: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm"
              />
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-1">Hasta</span>
              <input 
                type="date" 
                value={dates.to}
                onChange={e => setDates({...dates, to: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm"
              />
            </div>
          </div>
          
          <button
            onClick={handleAutoAllocate}
            disabled={loading}
            className="w-full mt-8 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
            Ejecutar Asignación Automática
          </button>
        </div>

        <div className="md:col-span-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-6 rounded-xl">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200">Reglas de Asignación</h3>
              <p className="text-sm text-amber-800/80 dark:text-amber-300/70 mt-1">El sistema aplicará las siguientes reglas a las reservas del periodo seleccionado:</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-amber-800/70 dark:text-amber-300/60">
            <li className="flex gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Urgell:</strong> Recibe todas las reservas si el total del evento es ≤ 26 personas.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Bertrand (Sarrià):</strong> Solo recibe grupos de número par (2, 4, 6... hasta 16).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Reparto:</strong> A partir de 27 personas, se busca el equilibrio priorizando Urgell (máx cómodo 17) y saltando Bertrand en pasos de 2.</span>
            </li>
          </ul>
        </div>
      </div>

      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Resultados del proceso</h2>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">{results.length} eventos procesados</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {results.map((res, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-zinc-500" />
                   </div>
                   <div>
                      <div className="font-semibold">{res.event}</div>
                      <div className="text-xs text-zinc-500">{res.totalGuests} personas totales</div>
                   </div>
                </div>
                
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <div className="text-[10px] uppercase text-zinc-400 font-bold mb-1">Sarrià (Bertrand)</div>
                      <div className={`font-mono text-lg ${res.assignedBertrand > 0 ? 'text-amber-500' : 'text-zinc-300'}`}>
                        {res.assignedBertrand} / {res.split.bertrand}
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] uppercase text-zinc-400 font-bold mb-1">Urgell</div>
                      <div className="font-mono text-lg text-blue-500">
                        {res.assignedUrgell} / {res.split.urgell}
                      </div>
                   </div>
                   <div className="pl-4 border-l border-zinc-100 dark:border-zinc-800">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
