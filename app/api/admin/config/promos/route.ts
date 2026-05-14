import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";

export async function PATCH(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { wedThuActive } = await req.json();

    const config = await prisma.promotionConfig.upsert({
      where: { id: "default" },
      update: { wedThuActive },
      create: { id: "default", wedThuActive },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("[PROM_CONFIG_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
