import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mailrelaySubscribe, mailrelayUnsubscribe } from "@/lib/mailrelay";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      name?: string; email?: string; phone?: string;
      customerType?: "PARTICULAR" | "EMPRESA";
      cif?: string | null; billingStreet?: string | null; billingZip?: string | null; billingCity?: string | null;
      allergies?: string | null; comments?: string | null;
      previousVisit?: boolean; newsletter?: boolean; source?: string | null;
    };

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name.trim() }),
        ...(body.email !== undefined && { email: body.email.trim().toLowerCase() }),
        ...(body.phone !== undefined && { phone: body.phone.trim() }),
        ...(body.customerType !== undefined && { customerType: body.customerType }),
        ...(body.cif !== undefined && { cif: body.cif?.trim() || null }),
        ...(body.billingStreet !== undefined && { billingStreet: body.billingStreet?.trim() || null }),
        ...(body.billingZip !== undefined && { billingZip: body.billingZip?.trim() || null }),
        ...(body.billingCity !== undefined && { billingCity: body.billingCity?.trim() || null }),
        ...(body.allergies !== undefined && { allergies: body.allergies?.trim() || null }),
        ...(body.comments !== undefined && { comments: body.comments?.trim() || null }),
        ...(body.previousVisit !== undefined && { previousVisit: body.previousVisit }),
        ...(body.newsletter !== undefined && { newsletter: body.newsletter }),
        ...(body.source !== undefined && { source: body.source?.trim() || null }),
      },
    });

    // Sync newsletter status to Mailrelay (fire-and-forget)
    if (body.newsletter !== undefined) {
      if (body.newsletter) {
        void mailrelaySubscribe(customer.email, customer.name);
      } else {
        void mailrelayUnsubscribe(customer.email);
      }
    }

    return NextResponse.json({ ok: true, data: customer });
  } catch (err) {
    console.error("[contacts/id] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
