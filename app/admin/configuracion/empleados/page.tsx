import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EmployeeManager } from "./EmployeeManager";

export const dynamic = "force-dynamic";

export default async function EmpleadosPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Empleados y Fichaje
          </h1>
          <p style={{ color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
            Gestiona a los empleados y sus códigos PIN para el control horario.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            href="/fichaje"
            target="_blank"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--color-admin-accent)",
              color: "#0A0A0A",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span>🔗</span> Interfaz Fichaje
          </Link>
          <Link
            href="/admin/configuracion/empleados/registros"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--color-admin-surface)",
              border: "1px solid var(--color-admin-border)",
              borderRadius: "6px",
              color: "var(--color-admin-text)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            Ver registros
          </Link>
        </div>
      </div>

      <EmployeeManager initialEmployees={employees} />
    </div>
  );
}
