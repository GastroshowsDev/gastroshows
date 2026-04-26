import { prisma } from "@/lib/prisma";
import { PromosList } from "@/components/admin/PromosList";

export const dynamic = "force-dynamic";

async function getCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  });
  return campaigns.map((c) => ({
    id: c.id,
    name: c.name,
    discountPct: Number(c.discountPct),
    startDate: c.startDate.toISOString(),
    endDate: c.endDate.toISOString(),
    active: c.active,
    createdAt: c.createdAt.toISOString(),
  }));
}

export type CampaignRow = Awaited<ReturnType<typeof getCampaigns>>[number];

export default async function PromocionesPage() {
  const campaigns = await getCampaigns();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--color-admin-border)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>Promociones y Precios</h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>Gestión comercial del restaurante</p>
        </div>
      </div>

      <PromosList campaigns={campaigns} />
    </div>
  );
}
