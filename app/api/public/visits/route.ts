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
        status: "CONFIRMED", 
        visitDate: new Date(date),
        visitTime: time,
      },
    });

    // 3. Send Confirmation Email
    try {
      const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      await sendMail({
        to: email,
        subject: "Confirmación de tu visita a GastroShows",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #daa520;">¡Hola ${name}!</h2>
            <p>Tu visita a nuestro local ha sido confirmada correctamente.</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Fecha:</strong> ${formattedDate}</p>
              <p><strong>Hora:</strong> ${time}h</p>
              <p><strong>Ubicación:</strong> C/ de Bertrand i Serra, 7, 08017 Barcelona (Sarrià)</p>
            </div>

            <p>Te esperamos para enseñarte nuestro espacio y hablar sobre tu próximo evento.</p>
            <p>Si necesitas cambiar la fecha o tienes alguna duda, puedes responder a este correo o contactarnos por WhatsApp.</p>
            
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
