import { NextResponse } from "next/server";
import { z } from "zod";

import { sendGiftEmail } from "@/app/api/reservations/gift/route";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().uuid(),
  recipientEmail: z.string().email(),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { token, recipientEmail } = parsed.data;

  const voucher = await prisma.giftVoucher.findUnique({
    where: { token },
    include: { purchaser: true },
  });

  if (!voucher) {
    return NextResponse.json({ ok: false, error: "Voucher not found" }, { status: 404 });
  }
  if (voucher.redeemedAt) {
    return NextResponse.json({ ok: false, error: "Voucher already redeemed" }, { status: 409 });
  }
  if (voucher.expiresAt < new Date()) {
    return NextResponse.json({ ok: false, error: "Voucher expired" }, { status: 410 });
  }

  try {
    await sendGiftEmail({
      token: voucher.token,
      recipientEmail,
      purchaserName: voucher.purchaser.name,
      guests: voucher.guests,
      totalAmount: Number(voucher.totalAmount),
      expiresAt: voucher.expiresAt,
    });

    // Store recipient email if not already set
    if (!voucher.recipientEmail) {
      await prisma.giftVoucher.update({
        where: { id: voucher.id },
        data: { recipientEmail },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[gift/send] Failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}
