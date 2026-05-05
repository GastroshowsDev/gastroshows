import "dotenv/config";
import { prisma } from "../lib/prisma";

async function syncEventGuests() {
  console.log("Iniciando sincronización de plazas...");
  
  // 1. Obtener todos los eventos
  const events = await prisma.event.findMany({
    include: {
      reservations: {
        where: {
          status: { in: ["CONFIRMED", "CHECKED_IN"] }, // Solo sumamos las válidas
        },
        select: {
          guests: true
        }
      }
    }
  });

  console.log(`Procesando ${events.length} eventos...`);

  for (const event of events) {
    const realTotal = event.reservations.reduce((sum, res) => sum + res.guests, 0);
    
    if (event.totalGuests !== realTotal) {
      console.log(`Evento ${event.date.toISOString().split('T')[0]} (${event.shift}): ${event.totalGuests} -> ${realTotal}`);
      await prisma.event.update({
        where: { id: event.id },
        data: { totalGuests: realTotal }
      });
    }
  }

  console.log("✅ Sincronización completada.");
}

syncEventGuests()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
