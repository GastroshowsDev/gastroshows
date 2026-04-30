import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { customer: true },
  });

  if (!reservation || reservation.type !== "VISIT") {
    return NextResponse.json({ ok: false, error: "Visita no encontrada" }, { status: 404 });
  }

  if (reservation.status === "CONFIRMED") {
    return NextResponse.json({ ok: false, error: "La visita ya está confirmada" }, { status: 400 });
  }

  if (!reservation.visitDate) {
    return NextResponse.json({ ok: false, error: "La visita no tiene fecha asignada" }, { status: 400 });
  }

  const { customer, visitDate, visitTime } = reservation;

  // ── 1. Confirm in DB + schedule reminder in one transaction ─────────────────
  const reminderAt = new Date(visitDate);
  reminderAt.setDate(reminderAt.getDate() - 1);
  reminderAt.setHours(10, 0, 0, 0);

  await prisma.$transaction(async (tx) => {
    await tx.reservation.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });
    // Remove any previous reminder entry before re-creating to avoid duplicates
    await tx.emailQueue.deleteMany({
      where: { reservationId: id, templateKey: "VISIT_REMINDER" },
    });
    await tx.emailQueue.create({
      data: {
        reservationId: id,
        templateKey: "VISIT_REMINDER",
        scheduledAt: reminderAt,
        status: "PENDING",
      },
    });
  });

  // ── 2. Send confirmation email immediately ───────────────────────────────────
  const formattedDate = visitDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    await sendMail({
      to: customer.email,
      subject: "Tu visita ha sido confirmada · GastroShows",
      html: buildConfirmationHtml({ name: customer.name, date: formattedDate, time: visitTime ?? "" }),
    });
  } catch (err) {
    console.error("[visits/confirm] Error sending email:", err);
    // Don't fail — DB is already updated
  }

  return NextResponse.json({ ok: true });
}

function buildConfirmationHtml({
  name,
  date,
  time,
}: {
  name: string;
  date: string;
  time: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td align="center" style="padding-bottom:32px;">
          <div style="width:1px;height:48px;background:linear-gradient(to bottom,transparent,#daa520);margin:0 auto 16px;"></div>
          <span style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#daa520;">GastroShows</span>
        </td></tr>

        <tr><td style="background:#141414;border:1px solid rgba(200,169,110,0.25);border-radius:4px;padding:48px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <tr><td align="center" style="padding-bottom:28px;">
              <div style="width:64px;height:64px;border:1px solid rgba(200,169,110,0.4);border-radius:50%;display:inline-block;line-height:64px;text-align:center;font-size:26px;color:#daa520;">✓</div>
            </td></tr>

            <tr><td align="center" style="padding-bottom:8px;">
              <span style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;">Visita confirmada</span>
            </td></tr>

            <tr><td align="center" style="padding-bottom:36px;">
              <h1 style="margin:0;font-family:'Georgia',serif;font-size:32px;font-weight:300;color:#F5F0E8;line-height:1.2;">¡Hola, ${name}!</h1>
              <p style="margin:12px 0 0;font-size:14px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">
                Tu visita a nuestro local ha sido confirmada.<br/>Te esperamos con ganas.
              </p>
            </td></tr>

            <tr><td style="padding-bottom:36px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,169,110,0.4),transparent);"></div>
            </td></tr>

            <tr><td style="padding-bottom:36px;">
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
                Si necesitas cambiar la fecha o tienes alguna pregunta,<br/>
                no dudes en contactarnos por WhatsApp o responder a este correo.
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
