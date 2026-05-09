import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const pending = await prisma.emailQueue.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: now },
        attempts: { lt: 3 },
      },
      include: {
        reservation: {
          include: { customer: true, event: true, venue: true },
        },
      },
      take: 20,
    });

    const templateKeys = Array.from(new Set(pending.map((p) => p.templateKey)));
    const templates = await prisma.emailTemplate.findMany({
      where: { templateKey: { in: templateKeys } },
    });

    const results = [];

    for (const job of pending) {
      const { reservation } = job;
      const isVisit = reservation.type === "VISIT";

      // Build template variables — visits use visitDate, reservations use event.date
      const dateValue = isVisit
        ? reservation.visitDate?.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) ?? ""
        : reservation.event?.date.toLocaleDateString("es-ES") ?? "";

      const timeValue = isVisit ? (reservation.visitTime ?? "") : "";

      const venueNameMap: Record<string, string> = {
        BERTRAND: "Bertrand",
        URGELL: "Eixample (Urgell)",
      };

      const data: Record<string, string> = {
        NOMBRE: reservation.customer.name,
        EMAIL: reservation.customer.email,
        TELEFONO: reservation.customer.phone,
        FECHA: dateValue,
        HORA: timeValue,
        GUESTS: reservation.guests.toString(),
        TURNO: reservation.event?.shift === "NOON" ? "Mediodía" : "Noche",
        TOTAL: `${Number(reservation.totalAmount).toFixed(2)} €`,
        DEPOSITO: `${Number(reservation.paidAmount).toFixed(2)} €`,
        LOCAL: reservation.venue ? (venueNameMap[reservation.venue.name] ?? reservation.venue.name) : "",
        REFERENCE: reservation.id.slice(0, 8).toUpperCase(),
      };

      // Look for template in DB; fall back to built-in for VISIT_REMINDER
      const template = templates.find((t) => t.templateKey === job.templateKey);
      let subject: string;
      let htmlBody: string;

      if (template) {
        subject  = renderTemplate(template.subject, data);
        htmlBody = renderTemplate(template.htmlContent, data);
      } else if (job.templateKey === "VISIT_REMINDER") {
        subject  = `Recordatorio: tu visita mañana · GastroShows`;
        htmlBody = buildVisitReminderHtml({
          name:  reservation.customer.name,
          date:  dateValue,
          time:  timeValue,
        });
      } else {
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "FAILED", attempts: { increment: 1 } },
        });
        continue;
      }

      try {
        await sendMail({ to: reservation.customer.email, subject, html: htmlBody });
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "SENT", sentAt: new Date() },
        });
        results.push({ id: job.id, ok: true });
      } catch (err) {
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { attempts: { increment: 1 } },
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
    return data[k] ?? `{{${k}}}`;
  });
}

function buildVisitReminderHtml({ name, date, time }: { name: string; date: string; time: string }) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td align="center" style="padding-bottom:32px;">
          <div style="width:1px;height:48px;background:linear-gradient(to bottom,transparent,#C8A96E);margin:0 auto 16px;"></div>
          <span style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C8A96E;">GastroShows</span>
        </td></tr>

        <tr><td style="background:#141414;border:1px solid rgba(200,169,110,0.25);border-radius:4px;padding:48px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <tr><td align="center" style="padding-bottom:8px;">
              <span style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;">Recordatorio de visita</span>
            </td></tr>

            <tr><td align="center" style="padding-bottom:32px;">
              <h1 style="margin:0;font-family:'Georgia',serif;font-size:30px;font-weight:300;color:#F5F0E8;line-height:1.2;">¡Hola, ${name}!</h1>
              <p style="margin:12px 0 0;font-size:14px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">
                Te recordamos que mañana tienes una visita confirmada con nosotros.
              </p>
            </td></tr>

            <tr><td style="padding-bottom:32px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,169,110,0.4),transparent);"></div>
            </td></tr>

            <tr><td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,169,110,0.05);border:1px solid rgba(200,169,110,0.12);border-radius:2px;padding:20px 24px;">
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(200,169,110,0.08);">
                  <table width="100%"><tr>
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#666;font-family:Arial,sans-serif;">Fecha</td>
                    <td align="right" style="font-size:13px;color:#F5F0E8;font-family:Arial,sans-serif;">${date}</td>
                  </tr></table>
                </td></tr>
                ${time ? `<tr><td style="padding:10px 0;">
                  <table width="100%"><tr>
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#666;font-family:Arial,sans-serif;">Hora</td>
                    <td align="right" style="font-size:13px;color:#F5F0E8;font-family:Arial,sans-serif;">${time}h</td>
                  </tr></table>
                </td></tr>` : ""}
              </table>
            </td></tr>

            <tr><td align="center">
              <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">
                Si necesitas cancelar o cambiar la hora, por favor avísanos<br/>
                con antelación por WhatsApp o respondiendo a este correo.
              </p>
            </td></tr>

          </table>
        </td></tr>

        <tr><td align="center" style="padding-top:32px;">
          <div style="width:1px;height:48px;background:linear-gradient(to top,transparent,rgba(200,169,110,0.3));margin:0 auto 16px;"></div>
          <p style="margin:0;font-size:10px;color:#444;letter-spacing:0.1em;font-family:Arial,sans-serif;">GastroShows · Una experiencia única</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
