import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const holidays = await prisma.holiday.findMany({
      select: { date: true, recurring: true },
    });
    
    const formattedHolidays = holidays.map(h => ({
      date: h.date.toISOString().split("T")[0],
      recurring: h.recurring
    }));
    return NextResponse.json(formattedHolidays);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return NextResponse.json([], { status: 500 });
  }
}
