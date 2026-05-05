import { prisma } from "@/lib/prisma";

export async function createBackup(triggeredBy: string): Promise<string> {
  const backup = await prisma.backup.create({
    data: { triggeredBy, status: "RUNNING" },
  });

  try {
    const [
      customers, venues, events, reservations,
      giftVouchers, paymentSplits, campaigns, emailTemplates, users,
    ] = await Promise.all([
      prisma.customer.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.venue.findMany(),
      prisma.event.findMany({ orderBy: { date: "asc" } }),
      prisma.reservation.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.giftVoucher.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.paymentSplit.findMany({ orderBy: { paidAt: "asc" } }),
      prisma.campaign.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.emailTemplate.findMany(),
      prisma.user.findMany({
        select: {
          id: true, name: true, email: true,
          role: true, defaultVenue: true,
          createdAt: true, updatedAt: true,
          // passwordHash excluido intencionadamente
        },
      }),
    ]);

    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      tables: {
        customers, venues, events, reservations,
        giftVouchers, paymentSplits, campaigns, emailTemplates, users,
      },
    };

    const sizeBytes = Buffer.byteLength(JSON.stringify(data), "utf8");
    const rowCount =
      customers.length + events.length + reservations.length +
      giftVouchers.length + paymentSplits.length + campaigns.length +
      customers.length;

    await prisma.backup.update({
      where: { id: backup.id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { status: "SUCCESS", data: data as any, sizeBytes, rowCount },
    });

    // Eliminar backups con más de 14 días
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 14);
    await prisma.backup.deleteMany({
      where: { createdAt: { lt: cutoff }, status: "SUCCESS" },
    });

    return backup.id;
  } catch (error) {
    await prisma.backup.update({
      where: { id: backup.id },
      data: {
        status: "FAILED",
        error: error instanceof Error ? error.message : String(error),
      },
    });
    throw error;
  }
}
