import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const holidays = await prisma.holiday.findMany({
      select: { date: true },
    });
    
    const formattedHolidays = holidays.map(h => h.date.toISOString().split("T")[0]);
    return NextResponse.json(formattedHolidays);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return NextResponse.json([], { status: 500 });
  }
}
