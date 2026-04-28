import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const holidays = await prisma.holiday.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(holidays);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { date, name } = await request.json();
    if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

    const holiday = await prisma.holiday.create({
      data: {
        date: new Date(date),
        name: name || null,
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
