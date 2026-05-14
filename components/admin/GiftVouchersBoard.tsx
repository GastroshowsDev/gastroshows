"use client";

import React, { useState, useMemo, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type GiftVoucher = {
  id: string;
  token: string;
  guests: number;
  totalAmount: number;
  expiresAt: string;
  redeemedAt: string | null;
  createdAt: string;
  purchaser: {
    name: string;
    email: string;
  };
  reservation?: {
    visitDate: string | null;
    status: string;
  } | null;
};

interface GiftVouchersBoardProps {
  initialVouchers: any[];
  totalCount: number;
}

export function GiftVouchersBoard({ initialVouchers, totalCount }: GiftVouchersBoardProps) {
  const [vouchers, setVouchers] = useState<GiftVoucher[]>(initialVouchers);
  
  // Sincronizar estado cuando cambian las props (necesario para la paginación de servidor)
  useEffect(() => {
    setVouchers(initialVouchers);
  }, [initialVouchers]);
  
  // Filtros de UI (pueden mantenerse en cliente para el subset actual)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "redeemed" | "pending">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      const matchesSearch = 
        v.purchaser.name.toLowerCase().includes(search.toLowerCase()) ||
        v.purchaser.email.toLowerCase().includes(search.toLowerCase()) ||
        v.token.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        (statusFilter === "redeemed" && v.redeemedAt) || 
        (statusFilter === "pending" && !v.redeemedAt);
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? da - db : db - da;
    });
  }, [vouchers, search, statusFilter, sortOrder]);

  // Estadísticas (basadas en el rango actual o totales si se prefiere)
  const totalInPage = filteredVouchers.length;
  const totalRevenue = filteredVouchers.reduce((acc, v) => acc + Number(v.totalAmount), 0);
  const redeemedCount = filteredVouchers.filter((v) => v.redeemedAt).length;
  const pendingCount = totalInPage - redeemedCount;

  return (
    <div className="space-y-6">
      {/* Cards de Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Registros", value: totalCount, sub: "En toda la base de datos", color: "text-zinc-900 dark:text-zinc-50" },
          { label: "Importe en Rango", value: `${totalRevenue.toFixed(0)}€`, sub: "Suma del rango actual", color: "text-[var(--gs-accent)]" },
          { label: "Canjeados (Rango)", value: redeemedCount, sub: "Ya disfrutados", color: "text-emerald-600" },
          { label: "Pendientes (Rango)", value: pendingCount, sub: "Por disfrutar", color: "text-amber-600" },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-zinc-500 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Barra de Filtros en Rango */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Filtrar en este rango (comprador o token)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-[var(--gs-accent)]/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none"
        >
          <option value="all">Todos los estados</option>
          <option value="redeemed">Canjeados</option>
          <option value="pending">Pendientes</option>
        </select>
        <button
          onClick={() => { setSearch(""); setStatusFilter("all"); }}
          className="px-4 py-2 text-xs font-bold text-[var(--gs-accent)] hover:bg-[var(--gs-accent)]/10 rounded-lg transition-colors"
        >
          Limpiar Filtros
        </button>
      </div>

      {/* Tabla de Registros */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th 
                  className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer select-none"
                  onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                >
                  Fecha Compra {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Comprador</th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Pax</th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Importe</th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Estado</th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Token</th>
                <th className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-zinc-500 italic">
                    No se han encontrado cheques en este rango con estos filtros.
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((v) => (
                  <tr key={v.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
                      {format(new Date(v.createdAt), "dd MMM yyyy", { locale: es })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{v.purchaser.name}</div>
                      <div className="text-[11px] text-zinc-500">{v.purchaser.email}</div>
                    </td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">{v.guests}</td>
                    <td className="px-4 py-4 font-bold text-[var(--gs-accent)]">{Number(v.totalAmount).toFixed(0)}€</td>
                    <td className="px-4 py-4">
                      {v.redeemedAt ? (
                        <div className="flex flex-col">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-[10px] font-bold uppercase w-fit">
                            Canjeado
                          </span>
                          {v.reservation?.visitDate && (
                            <span className="text-[10px] text-zinc-500 mt-1">
                              Reserva: {format(new Date(v.reservation.visitDate), "dd/MM/yy")}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 text-[10px] font-bold uppercase w-fit">
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 font-mono text-[10px] text-zinc-400">{v.token.slice(0, 8)}...</td>
                    <td className="px-4 py-4 text-right">
                      {!v.redeemedAt && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = `${window.location.origin}/canjear/${v.token}`;
                            navigator.clipboard.writeText(url);
                            alert("Enlace copiado al portapapeles");
                          }}
                          className="p-2 text-zinc-400 hover:text-[var(--gs-accent)] transition-colors"
                          title="Copiar enlace de reserva"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
