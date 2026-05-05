import { prisma } from "@/lib/prisma";
import { ContactsTable } from "@/components/admin/ContactsTable";
import { AdminPagination } from "@/components/admin/AdminPagination";

export const dynamic = "force-dynamic";

async function getContactsData(offset: number, limit: number) {
  const total = await prisma.customer.count();

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    skip: offset - 1,
    take: limit,
    include: {
      reservations: {
        where: { status: { notIn: ["CANCELLED"] } },
        select: {
          id: true,
          createdAt: true,
          totalAmount: true,
          event: { select: { date: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const rows = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    customerType: c.customerType,
    cif: c.cif ?? "",
    billingStreet: c.billingStreet ?? "",
    billingZip: c.billingZip ?? "",
    billingCity: c.billingCity ?? "",
    allergies: c.allergies ?? "",
    previousVisit: c.previousVisit,
    newsletter: c.newsletter,
    source: c.source ?? "",
    comments: c.comments ?? "",
    reservaCount: c.reservations.length,
    totalSpent: c.reservations.reduce((s, r) => s + Number(r.totalAmount), 0),
    lastVisit: c.reservations[0]?.event?.date?.toISOString() ?? null,
    createdAt: c.createdAt.toISOString(),
  }));

  return { rows, total };
}

export type ContactRow = Awaited<ReturnType<typeof getContactsData>>["rows"][number];

export default async function ContactosPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ offset?: string, limit?: string }> 
}) {
  const { offset, limit } = await searchParams;
  
  const currentOffset = parseInt(offset || "1");
  const currentLimit = parseInt(limit || "25");

  const { rows: contacts, total } = await getContactsData(currentOffset, currentLimit);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-admin-border)",
          background: "var(--color-admin-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
              Contactos
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
              Base de datos de clientes
            </p>
          </div>

          <AdminPagination total={total} defaultLimit={25} />
        </div>
      </div>

      <ContactsTable contacts={contacts} />
    </div>
  );
}
