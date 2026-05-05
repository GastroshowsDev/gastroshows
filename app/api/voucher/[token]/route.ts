import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const paramsSchema = z.object({ token: z.string().uuid() });
type RouteContext = { params: Promise<{ token: string }> };

export async function GET(_: Request, context: RouteContext) {
  const parsedParams = paramsSchema.safeParse(await context.params);
  if (!parsedParams.success) {
    return NextResponse.json(
      { valid: false, alreadyUsed: false, error: "Invalid token format" },
      { status: 400 },
    );
  }

  const voucher = await prisma.giftVoucher.findUnique({
    where: { token: parsedParams.data.token },
    select: {
      guests: true,
      expiresAt: true,
      redeemedAt: true,
    },
  });

  if (!voucher) {
    return NextResponse.json({ valid: false, alreadyUsed: false }, { status: 200 });
  }

  const expired = voucher.expiresAt < new Date();
  const alreadyUsed = Boolean(voucher.redeemedAt);

  return NextResponse.json({
    valid: !expired && !alreadyUsed,
    guests: voucher.guests,
    expiresAt: voucher.expiresAt.toISOString(),
    alreadyUsed,
  });
}
