import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-helpers";

export async function POST(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json() as {
      name: string; email: string; phone: string;
      customerType?: "PARTICULAR" | "EMPRESA" | "AGENCIA";
      cif?: string; billingStreet?: string; billingZip?: string; billingCity?: string;
      allergies?: string; comments?: string;
      previousVisit?: boolean; newsletter?: boolean; source?: string;
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ ok: false, error: "Nombre, email y teléfono son obligatorios" }, { status: 400 });
    }

    const isBusiness = body.customerType === "EMPRESA" || body.customerType === "AGENCIA";

    const customer = await prisma.customer.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        customerType: body.customerType ?? "PARTICULAR",
        cif: isBusiness ? (body.cif?.trim() || null) : null,
        billingStreet: isBusiness ? (body.billingStreet?.trim() || null) : null,
        billingZip: isBusiness ? (body.billingZip?.trim() || null) : null,
        billingCity: isBusiness ? (body.billingCity?.trim() || null) : null,
        allergies: body.customerType === "PARTICULAR" ? (body.allergies?.trim() || null) : null,
        comments: body.comments?.trim() || null,
        previousVisit: body.previousVisit ?? false,
        newsletter: body.newsletter ?? false,
        source: body.source?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, data: customer }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contacts] POST error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
