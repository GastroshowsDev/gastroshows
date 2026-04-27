import { addMonths } from "date-fns";
import { NextResponse } from "next/server";

import { calculateTotalAmountWithDiscounts, giftPurchaseSchema } from "@/lib/booking";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = giftPurchaseSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { guests, purchaserName, purchaserPhone, purchaserEmail, deliveryMode, recipientEmail } =
    parsed.data;

  const now = new Date();
  const activeCampaign = await prisma.campaign.findFirst({
    where: {
      active: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    orderBy: { createdAt: "desc" },
  });

  const campaignPct = activeCampaign ? Number(activeCampaign.discountPct) : 0;
  // Use a neutral date (e.g. Sunday) to ensure no weekday discount is applied to gift vouchers
  const neutralDate = new Date("2024-01-07"); // A Sunday
  const totalAmount = calculateTotalAmountWithDiscounts(guests, neutralDate, campaignPct);
  const expiresAt = addMonths(now, 6);

  const created = await prisma.$transaction(async (tx) => {
    // Upsert purchaser by email so repeated purchases don't create duplicates
    const existing = await tx.customer.findFirst({ where: { email: purchaserEmail } });
    const purchaser = existing
      ? await tx.customer.update({
          where: { id: existing.id },
          data: { name: purchaserName, phone: purchaserPhone },
        })
      : await tx.customer.create({
          data: {
            name: purchaserName,
            phone: purchaserPhone,
            email: purchaserEmail,
            previousVisit: false,
          },
        });

    const voucher = await tx.giftVoucher.create({
      data: {
        purchaserCustomerId: purchaser.id,
        recipientEmail: deliveryMode === "now" ? recipientEmail : undefined,
        guests,
        totalAmount,
        expiresAt,
      },
    });

    return voucher;
  });

  // If deliveryMode === "now" and recipientEmail provided, send gift email immediately
  let emailSent = false;
  if (deliveryMode === "now" && recipientEmail) {
    try {
      await sendGiftEmail({
        token: created.token,
        recipientEmail,
        purchaserName,
        guests,
        totalAmount,
        expiresAt,
      });
      emailSent = true;
    } catch (err) {
      console.error("[gift] Failed to send gift email:", err);
    }
  }

  return NextResponse.json(
    {
      ok: true,
      voucherId: created.id,
      token: created.token,
      totalAmount,
      expiresAt: created.expiresAt.toISOString(),
      emailSent,
    },
    { status: 201 },
  );
}

/* ── Send gift email helper (also used by /send route) ── */
export async function sendGiftEmail({
  token,
  recipientEmail,
  purchaserName,
  guests,
  totalAmount,
  expiresAt,
}: {
  token: string;
  recipientEmail: string;
  purchaserName: string;
  guests: number;
  totalAmount: number;
  expiresAt: Date;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gastroshows.com";
  const redeemUrl = `${baseUrl}/canjear/${token}`;
  const expiryStr = new Date(expiresAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = buildGiftEmailHtml({ redeemUrl, purchaserName, guests, totalAmount, expiryStr });

  await sendMail({
    to: recipientEmail,
    subject: `${purchaserName} te regala una experiencia gastronómica única`,
    html,
  });
}

function buildGiftEmailHtml({
  redeemUrl,
  purchaserName,
  guests,
  totalAmount,
  expiryStr,
}: {
  redeemUrl: string;
  purchaserName: string;
  guests: number;
  totalAmount: number;
  expiryStr: string;
}): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tu regalo te espera</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Ornament top -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="width:1px;height:48px;background:linear-gradient(to bottom,transparent,#C8A96E);margin:0 auto 16px;"></div>
              <span style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C8A96E;">GastroShows</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#141414;border:1px solid rgba(200,169,110,0.25);border-radius:4px;padding:48px 40px;">

              <!-- Gift icon -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <div style="width:72px;height:72px;border:1px solid rgba(200,169,110,0.4);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;line-height:72px;text-align:center;">
                      ◇
                    </div>
                  </td>
                </tr>

                <!-- Pre-title -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <span style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888888;">Un regalo para ti</span>
                  </td>
                </tr>

                <!-- Main title -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <h1 style="margin:0;font-family:'Georgia',serif;font-size:36px;font-weight:300;color:#F5F0E8;line-height:1.2;">
                      ${purchaserName} te regala<br/>una experiencia
                    </h1>
                  </td>
                </tr>

                <!-- Subtitle -->
                <tr>
                  <td align="center" style="padding-bottom:40px;">
                    <p style="margin:0;font-size:13px;color:#888888;line-height:1.8;font-family:Arial,sans-serif;">
                      Una noche de gastronomía, magia y arte.<br/>
                      Solo queda elegir la fecha perfecta.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,169,110,0.4),transparent);"></div>
                  </td>
                </tr>

                <!-- Gift details -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,169,110,0.05);border:1px solid rgba(200,169,110,0.12);border-radius:2px;">
                      <tr>
                        <td style="padding:20px 24px;">
                          ${[
                            ["De", purchaserName],
                            ["Personas", `${guests} ${guests === 1 ? "persona" : "personas"}`],
                            ["Valor", `${totalAmount} €`],
                            ["Válido hasta", expiryStr],
                          ]
                            .map(
                              ([k, v]) => `
                          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(200,169,110,0.08);margin-bottom:8px;padding-bottom:8px;">
                            <tr>
                              <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#666666;font-family:Arial,sans-serif;">${k}</td>
                              <td align="right" style="font-size:13px;color:#F5F0E8;font-family:Arial,sans-serif;">${v}</td>
                            </tr>
                          </table>`,
                            )
                            .join("")}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="${redeemUrl}" style="display:inline-block;background:#C8A96E;color:#0A0A0A;text-decoration:none;padding:16px 40px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;border-radius:2px;">
                      Seleccionar fecha
                    </a>
                  </td>
                </tr>

                <!-- Secondary note -->
                <tr>
                  <td align="center" style="padding-bottom:0;">
                    <p style="margin:0;font-size:11px;color:#555555;line-height:1.8;font-family:Arial,sans-serif;">
                      O copia este enlace en tu navegador:<br/>
                      <span style="color:#C8A96E;">${redeemUrl}</span>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Ornament bottom -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <div style="width:1px;height:48px;background:linear-gradient(to top,transparent,rgba(200,169,110,0.3));margin:0 auto 16px;"></div>
              <p style="margin:0;font-size:10px;color:#444444;letter-spacing:0.1em;font-family:Arial,sans-serif;">
                GastroShows · Una experiencia única
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
