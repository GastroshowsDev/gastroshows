import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (role !== "ADMIN" && role !== "LIVE") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload || !Array.isArray(payload.reservationIds) || payload.reservationIds.length < 2) {
    return NextResponse.json({ ok: false, error: "Invalid payload. Needs at least 2 reservation IDs." }, { status: 400 });
  }

  // Generate a random ID for the group
  const mergedGroupId = crypto.randomUUID();

  try {
    await prisma.reservation.updateMany({
      where: {
        id: { in: payload.reservationIds }
      },
      data: {
        mergedGroupId
      }
    });

    return NextResponse.json({ ok: true, mergedGroupId });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
