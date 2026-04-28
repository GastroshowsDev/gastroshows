"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  employees: { id: string; name: string }[];
  defaultPeriod: "day" | "week" | "month";
  defaultDate: string;
  defaultEmployeeId: string;
};

export function TimeLogFilters({ employees, defaultPeriod, defaultDate, defaultEmployeeId }: Props) {
  const router = useRouter();
  const [period, setPeriod] = useState(defaultPeriod);
  const [date, setDate] = useState(defaultDate);
  const [employeeId, setEmployeeId] = useState(defaultEmployeeId);

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("period", period);
    params.set("date", date);
    if (employeeId !== "all") {
      params.set("employeeId", employeeId);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div style={{ background: "var(--color-admin-surface)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-admin-border)", marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
      <div>
        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>Período</label>
        <select 
          value={period} 
          onChange={e => setPeriod(e.target.value as any)}
          style={{ padding: "0.5rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }}
        >
          <option value="day">Por Día</option>
          <option value="week">Por Semana</option>
          <option value="month">Por Mes</option>
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>
          Fecha de referencia
        </label>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)}
          style={{ padding: "0.5rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px", colorScheme: "dark" }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>Empleado</label>
        <select 
          value={employeeId} 
          onChange={e => setEmployeeId(e.target.value)}
          style={{ padding: "0.5rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }}
        >
          <option value="all">Todos los empleados</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={applyFilters}
        style={{ padding: "0.5rem 1rem", background: "var(--color-admin-accent)", color: "#0A0A0A", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer", height: "35px" }}
      >
        Filtrar
      </button>
    </div>
  );
}
