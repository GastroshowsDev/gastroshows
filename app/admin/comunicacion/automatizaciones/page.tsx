"use client";

import { useState, useEffect } from "react";
import { Settings, Play, Pause, Plus, Trash2, Clock, Mail, ChevronRight, Loader2, Save, Zap } from "lucide-react";

const TRIGGERS = [
  { id: "RESERVATION_CREATED", label: "Nueva Reserva" },
  { id: "RESERVATION_CONFIRMED", label: "Reserva Pagada/Confirmada" },
  { id: "VISIT_REQUESTED", label: "Solicitud de Visita" },
  { id: "PAYMENT_FAILED", label: "Fallo en el Pago" }
];

export default function AutomatizacionesPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  async function fetchWorkflows() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/workflows");
      const json = await res.json();
      if (json.ok) setWorkflows(json.data);
    } catch {
      alert("Error al cargar automatizaciones");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setEditing({
      name: "Nuevo Flujo",
      trigger: "RESERVATION_CONFIRMED",
      active: true,
      steps: [
        { type: "email", templateKey: "WELCOME", delayDays: 0 }
      ]
    });
  }

  async function handleSave() {
    try {
      const res = await fetch("/api/admin/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        alert("Automatización guardada");
        setEditing(null);
        fetchWorkflows();
      }
    } catch {
      alert("Error al guardar");
    }
  }

  function addStep() {
    setEditing({
      ...editing,
      steps: [...editing.steps, { type: "wait", delayDays: 1 }]
    });
  }

  function removeStep(index: number) {
    const next = [...editing.steps];
    next.splice(index, 1);
    setEditing({ ...editing, steps: next });
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
             <Zap className="w-8 h-8 text-amber-500" /> Automatizaciones
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Crea flujos de trabajo inteligentes como en HubSpot o Mailchimp.</p>
        </div>
        {!editing && (
          <button 
            onClick={handleCreate}
            className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Crear Automatización
          </button>
        )}
      </div>

      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workflows.map(w => (
            <div key={w.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:border-zinc-400 transition-all cursor-pointer" onClick={() => setEditing(w)}>
               <div className="flex items-center justify-between mb-4">
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${w.active ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                    {w.active ? 'Activo' : 'Pausado'}
                  </div>
                  <Settings className="w-4 h-4 text-zinc-400" />
               </div>
               <h3 className="text-xl font-bold mb-1">{w.name}</h3>
               <p className="text-sm text-zinc-500 mb-6">Disparador: <span className="text-zinc-900 dark:text-zinc-300 font-medium">{TRIGGERS.find(t => t.id === w.trigger)?.label}</span></p>
               
               <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Play className="w-3 h-3" /> {w.steps.length} pasos en el flujo
               </div>
            </div>
          ))}
          {workflows.length === 0 && (
            <div className="md:col-span-2 py-20 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
               <Zap className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
               <p className="text-zinc-400">No tienes ninguna automatización creada aún.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
            <div className="flex items-center gap-4">
               <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-zinc-900 font-medium text-sm pr-4 border-r border-zinc-200">Cancelar</button>
               <input 
                type="text" 
                value={editing.name} 
                onChange={e => setEditing({...editing, name: e.target.value})}
                className="bg-transparent text-xl font-bold focus:outline-none"
               />
            </div>
            <button 
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700"
            >
              <Save className="w-4 h-4" /> Guardar Flujo
            </button>
          </div>

          <div className="p-8">
            <div className="mb-10 max-w-lg">
               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">¿Cuándo debe empezar este flujo?</label>
               <select 
                value={editing.trigger}
                onChange={e => setEditing({...editing, trigger: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 font-medium"
               >
                 {TRIGGERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
               </select>
            </div>

            <div className="space-y-4">
               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Secuencia de pasos</label>
               
               {editing.steps.map((step: any, i: number) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0">
                      {i + 1}
                    </div>
                    
                    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex items-center gap-6">
                       <select 
                        value={step.type}
                        onChange={e => {
                          const next = [...editing.steps];
                          next[i].type = e.target.value;
                          setEditing({...editing, steps: next});
                        }}
                        className="bg-transparent font-bold text-sm focus:outline-none w-32"
                       >
                         <option value="email">Enviar Email</option>
                         <option value="wait">Esperar</option>
                       </select>

                       <ChevronRight className="w-4 h-4 text-zinc-300" />

                       {step.type === "email" ? (
                         <div className="flex-1 flex items-center gap-3">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <input 
                              type="text" 
                              placeholder="Key de plantilla (ej: D14)"
                              value={step.templateKey || ""}
                              onChange={e => {
                                const next = [...editing.steps];
                                next[i].templateKey = e.target.value;
                                setEditing({...editing, steps: next});
                              }}
                              className="bg-transparent text-sm w-full focus:outline-none"
                            />
                         </div>
                       ) : (
                         <div className="flex-1 flex items-center gap-3">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <div className="flex items-center gap-2 text-sm">
                              <input 
                                type="number" 
                                value={step.delayDays || 0}
                                onChange={e => {
                                  const next = [...editing.steps];
                                  next[i].delayDays = parseInt(e.target.value);
                                  setEditing({...editing, steps: next});
                                }}
                                className="bg-zinc-200 dark:bg-zinc-800 w-12 px-2 py-1 rounded text-center focus:outline-none"
                              />
                              <span>días</span>
                            </div>
                         </div>
                       )}

                       <button onClick={() => removeStep(i)} className="text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}

               <button 
                onClick={addStep}
                className="flex items-center gap-3 text-sm text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-white transition-colors pl-12 pt-4"
               >
                 <Plus className="w-4 h-4" /> Añadir paso a la secuencia
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
