import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

async function getCustomersBySegment(segment: string) {
  const now = new Date();

  switch (segment) {
    case "attended":
      return prisma.customer.findMany({
        where: {
          reservations: {
            some: {
              status: { in: ["CONFIRMED", "CHECKED_IN"] },
              type: { not: "VISIT" },
              event: { date: { lt: now } },
            },
          },
        },
      });

    case "attended_6months":
      return prisma.customer.findMany({
        where: {
          reservations: {
            some: {
              status: { in: ["CONFIRMED", "CHECKED_IN"] },
              type: { not: "VISIT" },
              event: { date: { gte: new Date(now.getTime() - SIX_MONTHS_MS), lt: now } },
            },
          },
        },
      });

    case "upcoming":
      return prisma.customer.findMany({
        where: {
          reservations: {
            some: {
              status: "CONFIRMED",
              type: { not: "VISIT" },
              event: { date: { gt: now } },
            },
          },
        },
      });

    case "repeat":
      return prisma.customer.findMany({
        where: { previousVisit: true },
      });

    case "gift_purchasers":
      return prisma.customer.findMany({
        where: { giftVouchers: { some: {} } },
      });

    case "newsletter":
      return prisma.customer.findMany({
        where: { newsletter: true },
      });

    default:
      return prisma.customer.findMany();
  }
}

export async function POST(request: Request) {
  try {
    const { subject, content, segment } = await request.json();

    if (!subject || !content) {
      return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
    }

    const customers = await getCustomersBySegment(segment ?? "all");

    const results = [];
    for (const customer of customers) {
      try {
        const html = content.replace(/\{\{NOMBRE\}\}/g, customer.name);
        await sendMail({ to: customer.email, subject, html });
        results.push({ email: customer.email, ok: true });
      } catch (err) {
        results.push({ email: customer.email, ok: false, error: String(err) });
      }
    }

    return NextResponse.json({
      ok: true,
      sentCount: results.filter((r) => r.ok).length,
      total: customers.length,
    });
  } catch (err) {
    console.error("[api/campanas] error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
