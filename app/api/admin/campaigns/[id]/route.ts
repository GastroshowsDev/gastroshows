import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json() as { active?: boolean };
  const campaign = await prisma.campaign.update({
    where: { id },
    data: { ...(body.active !== undefined && { active: body.active }) },
  });
  return NextResponse.json({ id: campaign.id, active: campaign.active });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
