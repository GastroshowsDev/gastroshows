import * as dotenv from "dotenv";
import * as path from "path";

// 1. Cargar .env de forma síncrona al principio del todo
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function cleanup() {
  console.log("Cargando base de datos...");
  // 2. Importar dinámicamente para asegurar que process.env ya tiene los datos
  const { prisma } = await import("../lib/prisma");
  
  console.log("Buscando reservas importadas de Turitop...");
  try {
    const count = await prisma.reservation.deleteMany({
      where: { source: "TURITOP" }
    });
    console.log(`Se han eliminado ${count.count} reservas de prueba.`);
  } catch (err) {
    console.error("Error durante la limpieza:", err);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup().catch(console.error);
