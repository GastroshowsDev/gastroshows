import { prisma } from "@/lib/prisma";
import { VenuesManager } from "./VenuesManager";

export const dynamic = "force-dynamic";

export default async function LocalesPage() {
  const venues = await prisma.venue.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
          Locales
        </h1>
        <p style={{ color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
          Gestiona los locales disponibles del restaurante.
        </p>
      </div>

      <VenuesManager initialVenues={venues} />
    </div>
  );
}
