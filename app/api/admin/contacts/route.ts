import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string; email: string; phone: string;
      customerType?: "PARTICULAR" | "EMPRESA";
      cif?: string; billingStreet?: string; billingZip?: string; billingCity?: string;
      allergies?: string; comments?: string;
      previousVisit?: boolean; newsletter?: boolean; source?: string;
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ ok: false, error: "Nombre, email y teléfono son obligatorios" }, { status: 400 });
    }

    const isEmpresa = body.customerType === "EMPRESA";

    const customer = await prisma.customer.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        customerType: isEmpresa ? "EMPRESA" : "PARTICULAR",
        cif: isEmpresa ? (body.cif?.trim() || null) : null,
        billingStreet: isEmpresa ? (body.billingStreet?.trim() || null) : null,
        billingZip: isEmpresa ? (body.billingZip?.trim() || null) : null,
        billingCity: isEmpresa ? (body.billingCity?.trim() || null) : null,
        allergies: body.allergies?.trim() || null,
        comments: body.comments?.trim() || null,
        previousVisit: body.previousVisit ?? false,
        newsletter: body.newsletter ?? false,
        source: body.source?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, data: customer }, { status: 201 });
  } catch (err) {
    console.error("[contacts] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
