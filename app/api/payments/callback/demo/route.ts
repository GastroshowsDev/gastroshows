import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { reservationId } = await req.json();
    
    // Check if demo mode is active
    const demoMode = await prisma.setting.findUnique({ where: { key: "demo_mode" } });
    if (demoMode?.value !== "true") {
      return NextResponse.json({ error: "Demo mode is not active" }, { status: 403 });
    }

    // Update reservation as paid
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { 
        status: "CONFIRMED",
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process demo payment" }, { status: 500 });
  }
}
