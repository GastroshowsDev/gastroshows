import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { subject, content, segment } = await request.json();

    if (!subject || !content) {
      return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
    }

    // 1. Fetch customers based on segment
    let customers;
    if (segment === "newsletter") {
      customers = await prisma.customer.findMany({ where: { newsletter: true } });
    } else if (segment === "past_month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      customers = await prisma.customer.findMany({ where: { createdAt: { gte: lastMonth } } });
    } else {
      customers = await prisma.customer.findMany();
    }

    // 2. Send emails (In a real massive production, this should be a job/queue)
    // For now, we'll send them in small batches or direct loop if count is low
    const results = [];
    for (const customer of customers) {
      try {
        // Personalize if needed (e.g. replace {{NOMBRE}})
        const personalizedContent = content.replace(/\{\{NOMBRE\}\}/g, customer.name);

        await sendMail({
          to: customer.email,
          subject,
          html: personalizedContent
        });
        results.push({ email: customer.email, ok: true });
      } catch (err) {
        results.push({ email: customer.email, ok: false, error: String(err) });
      }
    }

    return NextResponse.json({ ok: true, sentCount: results.filter(r => r.ok).length, total: customers.length });
  } catch (err) {
    console.error("[api/campanas] error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
