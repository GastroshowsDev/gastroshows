import { prisma } from "@/lib/prisma";
import { UsuariosTable } from "@/components/admin/UsuariosTable";

export const dynamic = "force-dynamic";

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
  });
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as "ADMIN" | "LIVE",
    defaultVenue: u.defaultVenue ?? null,
    createdAt: u.createdAt.toISOString(),
  }));
}

export type UserRow = Awaited<ReturnType<typeof getUsers>>[number];

export default async function UsuariosPage() {
  const users = await getUsers();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>Usuarios</h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
            {users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <UsuariosTable users={users} />
    </div>
  );
}
