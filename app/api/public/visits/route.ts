import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { date, time, name, email, phone } = await request.json();

    if (!date || !time || !name || !email || !phone) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // 1. Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { email: email.toLowerCase().trim() },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name,
          email: email.toLowerCase().trim(),
          phone,
        },
      });
    }

    // 2. Create Reservation of type VISIT
    const reservation = await prisma.reservation.create({
      data: {
        type: "VISIT",
        customerId: customer.id,
        guests: 1,
        totalAmount: 0,
        paidAmount: 0,
        status: "CONFIRMED", // Visits are auto-confirmed for simplicity, or PENDING if staff needs to review
        visitDate: new Date(date),
        visitTime: time,
      },
    });

    return NextResponse.json({ ok: true, id: reservation.id });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
