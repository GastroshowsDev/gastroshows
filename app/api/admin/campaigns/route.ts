import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json() as { name: string; discountPct: number; startDate: string; endDate: string };
  const campaign = await prisma.campaign.create({
    data: {
      name: body.name,
      discountPct: body.discountPct,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    },
  });
  return NextResponse.json({
    id: campaign.id,
    name: campaign.name,
    discountPct: Number(campaign.discountPct),
    startDate: campaign.startDate.toISOString(),
    endDate: campaign.endDate.toISOString(),
    active: campaign.active,
    createdAt: campaign.createdAt.toISOString(),
  });
}
