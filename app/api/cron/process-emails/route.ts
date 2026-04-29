import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Simple auth check for cron (e.g. via secret header)
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get pending emails scheduled for now or earlier
    const now = new Date();
    const pending = await prisma.emailQueue.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: now },
        attempts: { lt: 3 }
      },
      include: {
        reservation: {
          include: {
            customer: true,
            event: true
          }
        }
      },
      take: 20
    });

    // 2. Fetch all templates once to avoid DB overhead in loop
    const templateKeys = Array.from(new Set(pending.map(p => p.templateKey)));
    const templates = await prisma.emailTemplate.findMany({
      where: { templateKey: { in: templateKeys } }
    });

    const results = [];

    for (const job of pending) {
      const template = templates.find(t => t.templateKey === job.templateKey);
      
      if (!template) {
        // Fallback or skip if template not in DB
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "FAILED", attempts: { increment: 1 } }
        });
        continue;
      }

      // Render content
      const data = {
        NOMBRE: job.reservation.customer.name,
        FECHA: job.reservation.event?.date.toLocaleDateString("es-ES") || "",
        GUESTS: job.reservation.guests.toString(),
        TURNO: job.reservation.event?.shift === "NOON" ? "Mediodía" : "Noche",
        REFERENCE: job.reservation.id.slice(0, 8).toUpperCase()
      };

      const renderedBody = renderTemplate(template.htmlContent, data);
      const renderedSubject = renderTemplate(template.subject, data);

      try {
        await sendMail({
          to: job.reservation.customer.email,
          subject: renderedSubject,
          html: renderedBody
        });

        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "SENT", sentAt: new Date() }
        });
        results.push({ id: job.id, ok: true });
      } catch (err) {
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { attempts: { increment: 1 } }
        });
        results.push({ id: job.id, ok: false, error: String(err) });
      }
    }

    return NextResponse.json({ ok: true, processed: results.length, details: results });
  } catch (err) {
    console.error("[cron/process-emails] Error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

function renderTemplate(template: string, data: Record<string, string>) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const k = key.trim();
    return data[k] || `{{${k}}}`;
  });
}
