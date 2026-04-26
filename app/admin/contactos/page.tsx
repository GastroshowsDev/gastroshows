import { prisma } from "@/lib/prisma";
import { ContactsTable } from "@/components/admin/ContactsTable";

export const dynamic = "force-dynamic";

async function getContacts() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
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

  return customers.map((c) => ({
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
}

export type ContactRow = Awaited<ReturnType<typeof getContacts>>[number];

export default async function ContactosPage() {
  const contacts = await getContacts();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      {/* Page header */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--color-admin-border)",
          background: "var(--color-admin-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Contactos
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
            {contacts.length} contacto{contacts.length !== 1 ? "s" : ""} registrado{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Table client component */}
      <ContactsTable contacts={contacts} />
    </div>
  );
}
