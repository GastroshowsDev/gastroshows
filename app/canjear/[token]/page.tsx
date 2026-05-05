import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { GiftRedemptionPage } from "@/components/reservation/GiftRedemptionPage";

type Props = { params: Promise<{ token: string }> };

export default async function CanjearPage({ params }: Props) {
  const { token } = await params;

  const voucher = await prisma.giftVoucher.findUnique({
    where: { token },
    include: { purchaser: { select: { name: true } } },
  });

  if (!voucher) notFound();

  const now = new Date();
  const expired = voucher.expiresAt < now;
  const redeemed = !!voucher.redeemedAt;

  const expiryStr = voucher.expiresAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <GiftRedemptionPage
      token={token}
      guests={voucher.guests}
      totalAmount={Number(voucher.totalAmount)}
      purchaserName={voucher.purchaser.name}
      expiresAt={voucher.expiresAt.toISOString()}
      expiryStr={expiryStr}
      expired={expired}
      redeemed={redeemed}
    />
  );
}
