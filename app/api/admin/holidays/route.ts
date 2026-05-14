import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

import { requireAdmin, requireStaff } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  const holidays = await prisma.holiday.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(holidays);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { date, name, recurring } = await request.json();
    if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

    const holiday = await prisma.holiday.create({
      data: {
        date: new Date(date),
        name: name || null,
        recurring: !!recurring,
      },
    });

    return NextResponse.json(holiday);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Date already exists as a holiday" }, { status: 400 });
    }
    console.error("Failed to create holiday:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
