import { prisma } from "@/lib/prisma";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { GiftVouchersBoard } from "@/components/admin/GiftVouchersBoard";

export const dynamic = "force-dynamic";

async function getGiftsData(offset: number, limit: number) {
  const total = await prisma.giftVoucher.count();

  const vouchers = await prisma.giftVoucher.findMany({
    include: {
      purchaser: true,
      reservation: {
        include: {
          event: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    skip: offset - 1,
    take: limit,
  });

  // Mapeamos para asegurar que las fechas sean strings para el componente cliente
  const rows = vouchers.map(v => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    expiresAt: v.expiresAt.toISOString(),
    redeemedAt: v.redeemedAt?.toISOString() ?? null,
    reservation: v.reservation ? {
      ...v.reservation,
      createdAt: v.reservation.createdAt.toISOString(),
      visitDate: v.reservation.visitDate?.toISOString() ?? null,
      event: v.reservation.event ? {
        ...v.reservation.event,
        date: v.reservation.event.date.toISOString(),
      } : null
    } : null
  }));

  return { rows, total };
}

export default async function AdminGiftsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ offset?: string, limit?: string }> 
}) {
  const { offset, limit } = await searchParams;
  
  const currentOffset = parseInt(offset || "1");
  const currentLimit = parseInt(limit || "25");

  const { rows: vouchers, total } = await getGiftsData(currentOffset, currentLimit);

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
              Gestión de Regalos
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
              Seguimiento de cheques regalo y estadísticas
            </p>
          </div>

          <AdminPagination total={total} defaultLimit={25} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
        <GiftVouchersBoard initialVouchers={vouchers} totalCount={total} />
      </div>
    </div>
  );
}
