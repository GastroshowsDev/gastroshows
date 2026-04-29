import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

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
        status: "PENDING", 
        visitDate: new Date(date),
        visitTime: time,
      },
    });

    // 3. Send Notification Email
    try {
      const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      await sendMail({
        to: email,
        subject: "Solicitud de visita recibida - GastroShows",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #daa520;">¡Hola ${name}!</h2>
            <p>Hemos recibido tu solicitud de visita a nuestro local.</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Fecha solicitada:</strong> ${formattedDate}</p>
              <p><strong>Hora solicitada:</strong> ${time}h</p>
              <p><strong>Estado:</strong> <span style="color: #daa520; font-weight: bold;">Pendiente de confirmación</span></p>
            </div>

            <p>Estamos revisando nuestra agenda y te confirmaremos la disponibilidad muy pronto por esta misma vía o por teléfono.</p>
            <p>Si tienes alguna duda urgente, puedes contactarnos directamente por WhatsApp.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #999;">GastroShows Barcelona · Experiencias Clandestinas</p>
          </div>
        `
      });
    } catch (mailError) {
      console.error("Error sending confirmation email:", mailError);
      // We don't fail the request if only the email fails
    }

    return NextResponse.json({ ok: true, id: reservation.id });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
