import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [config, campaign] = await Promise.all([
      prisma.promotionConfig.findUnique({ where: { id: "default" } }),
      prisma.campaign.findFirst({
        where: {
          active: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
      }),
    ]);

    return NextResponse.json({
      wedThuActive: config?.wedThuActive ?? false,
      hasCampaign: !!campaign,
      campaignName: campaign?.name,
      campaignDiscount: campaign ? Number(campaign.discountPct) : 0,
    });
  } catch (error) {
    return NextResponse.json({ wedThuActive: false, hasCampaign: false });
  }
}
