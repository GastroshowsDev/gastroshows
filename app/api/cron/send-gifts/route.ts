import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendGiftEmail } from "../../reservations/gift/route";

// This endpoint is meant to be called by Vercel Cron
export async function GET(request: Request) {
  // Enforce cron security if we're in production on Vercel
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  try {
    // Find all gift vouchers that:
    // 1. Have a recipientEmail (meaning they are meant to be sent)
    // 2. Have not been sent yet
    // 3. Have a sendDate that is today or in the past
    const pendingVouchers = await prisma.giftVoucher.findMany({
      where: {
        recipientEmail: { not: null },
        emailSent: false,
        sendDate: {
          lte: now,
        },
      },
      include: {
        purchaser: true,
      },
    });

    if (pendingVouchers.length === 0) {
      return NextResponse.json({ ok: true, message: "No pending gifts to send today." });
    }

    const sentIds: string[] = [];
    const failedIds: string[] = [];

    for (const voucher of pendingVouchers) {
      if (!voucher.recipientEmail) continue;

      try {
        await sendGiftEmail({
          token: voucher.token,
          recipientEmail: voucher.recipientEmail,
          purchaserName: voucher.purchaser.name,
          guests: voucher.guests,
          totalAmount: Number(voucher.totalAmount),
          expiresAt: voucher.expiresAt,
        });

        sentIds.push(voucher.id);
      } catch (err) {
        console.error(`[cron] Failed to send gift voucher ${voucher.id}:`, err);
        failedIds.push(voucher.id);
      }
    }

    // Mark successfully sent vouchers
    if (sentIds.length > 0) {
      await prisma.giftVoucher.updateMany({
        where: { id: { in: sentIds } },
        data: { emailSent: true },
      });
    }

    return NextResponse.json({
      ok: true,
      message: `Processed ${pendingVouchers.length} gifts. Sent: ${sentIds.length}, Failed: ${failedIds.length}`,
      sentIds,
      failedIds,
    });
  } catch (error) {
    console.error("[cron] Error running send-gifts cron:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
