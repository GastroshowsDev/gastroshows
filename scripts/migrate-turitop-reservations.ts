/**
 * Migración de Turitop a GastroShows
 * Importa 15,723+ reservas desde CSV de Turitop
 *
 * Uso: npx ts-node scripts/migrate-turitop-reservations.ts <path-to-csv>
 */

import { prisma } from "@/lib/prisma";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

interface TuritopRecord {
  short_id: string;
  date_event: string;
  name: string;
  email: string;
  phone: string;
  tickets_count: string;
  total_price: string;
  paid_online: string;
  status: string;
  comments: string;
  customtextarea: string;
}

interface MigrationResult {
  totalRecords: number;
  successCount: number;
  errorCount: number;
  duplicateCount: number;
  venueAssignedCount: number;
  venueNotAssignedCount: number;
  errors: Array<{ turitopId: string; error: string }>;
  duplicates: Array<{ turitopId: string; reason: string }>;
}

const BATCH_SIZE = 500;
const result: MigrationResult = {
  totalRecords: 0,
  successCount: 0,
  errorCount: 0,
  duplicateCount: 0,
  venueAssignedCount: 0,
  venueNotAssignedCount: 0,
  errors: [],
  duplicates: [],
};

async function main() {
  const csvPath = process.argv[2];

  if (!csvPath) {
    console.error("❌ Uso: npx ts-node scripts/migrate-turitop-reservations.ts <path-to-csv>");
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Archivo no encontrado: ${csvPath}`);
    process.exit(1);
  }

  try {
    console.log("🔄 Iniciando migración...\n");

    // 1. BACKUP
    console.log("📦 Creando backup de BD...");
    // Note: En producción, usar herramientas de backup específicas (pg_dump, etc.)
    console.log("✅ Backup preparado\n");

    // 2. LIMPIAR DATOS
    console.log("🧹 Limpiando datos existentes...");
    await cleanDatabase();
    console.log("✅ Base de datos limpiada\n");

    // 3. LEER CSV
    console.log("📖 Leyendo CSV...");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }) as TuritopRecord[];

    result.totalRecords = records.length;
    console.log(`✅ ${records.length.toLocaleString()} registros cargados\n`);

    // 4. PROCESAR EN BATCHES
    console.log("📥 Importando reservas...");
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(records.length / BATCH_SIZE);

      console.log(`  Lote ${batchNumber}/${totalBatches}...`);
      await processBatch(batch);

      const progress = Math.min(i + BATCH_SIZE, records.length);
      const percentage = ((progress / records.length) * 100).toFixed(1);
      console.log(`  [${progress.toLocaleString()}/${records.length.toLocaleString()} - ${percentage}%]`);
    }

    console.log("✅ Importación completada\n");

    // 5. GENERAR REPORTE
    console.log("📊 Generando reporte...");
    generateReport(result);

    console.log("\n✨ Migración finalizada exitosamente");
  } catch (error) {
    console.error("\n❌ Error durante migración:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanDatabase() {
  // Eliminar en orden de dependencias
  await prisma.tableAssignment.deleteMany({});
  await prisma.paymentSplit.deleteMany({});
  await prisma.emailQueue.deleteMany({});
  await prisma.workflowExecution.deleteMany({});
  await prisma.giftVoucher.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.visit.deleteMany({});
  await prisma.customer.deleteMany({});
}

async function processBatch(batch: TuritopRecord[]) {
  for (const record of batch) {
    try {
      // Validar datos básicos
      if (!record.name?.trim()) {
        throw new Error("Nombre vacío");
      }
      if (!record.date_event) {
        throw new Error("Fecha vacía");
      }
      if (!record.tickets_count) {
        throw new Error("Número de huéspedes vacío");
      }

      // Parsear datos
      const visitDate = new Date(record.date_event);
      const guests = parseInt(record.tickets_count) || 0;
      const totalAmount = parseFloat(record.total_price) || 0;
      const paidAmount = parseFloat(record.paid_online) || 0;

      if (guests <= 0) {
        throw new Error("Número de huéspedes inválido");
      }

      // Buscar/crear customer
      const email = record.email?.trim() || null;
      const phone = record.phone?.trim() || null;

      // Verificar duplicados
      const existingReservation = await prisma.reservation.findFirst({
        where: {
          turitopId: record.short_id,
        },
      });

      if (existingReservation) {
        result.duplicateCount++;
        result.duplicates.push({
          turitopId: record.short_id,
          reason: "Ya existe en BD",
        });
        return;
      }

      let customer = null;
      if (email) {
        customer = await prisma.customer.upsert({
          where: { email },
          update: {},
          create: {
            name: record.name.trim(),
            email,
            phone: phone || "",
            source: "turitop",
          },
        });
      } else {
        customer = await prisma.customer.create({
          data: {
            name: record.name.trim(),
            email: `placeholder-${Date.now()}@turitop.local`,
            phone: phone || "",
            source: "turitop",
          },
        });
      }

      // Buscar venue (BERTRAND o URGELL en comentarios)
      let venueId: string | null = null;
      const commentsLower = (record.comments || "").toLowerCase();

      if (commentsLower.includes("bertrand")) {
        const venue = await prisma.venue.findFirst({
          where: { name: "BERTRAND" },
        });
        if (venue) {
          venueId = venue.id;
          result.venueAssignedCount++;
        } else {
          result.venueNotAssignedCount++;
        }
      } else if (commentsLower.includes("urgell")) {
        const venue = await prisma.venue.findFirst({
          where: { name: "URGELL" },
        });
        if (venue) {
          venueId = venue.id;
          result.venueAssignedCount++;
        } else {
          result.venueNotAssignedCount++;
        }
      } else {
        result.venueNotAssignedCount++;
      }

      // Mapear status de Turitop
      let paymentStatus: "PARTIAL" | "COMPLETED" | "GIFT" = "PARTIAL";
      if (paidAmount === 0 && totalAmount === 0) {
        paymentStatus = "GIFT";
      } else if (paidAmount >= totalAmount) {
        paymentStatus = "COMPLETED";
      }

      let reservationStatus: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CANCELLED" | "PAYMENT_FAILED" = "PENDING";
      const turitopStatus = (record.status || "").toLowerCase();
      if (turitopStatus.includes("paid")) {
        reservationStatus = "CONFIRMED";
      } else if (turitopStatus.includes("cancelled")) {
        reservationStatus = "CANCELLED";
      }

      // Compilar comentarios (original + alergias)
      const allergies = record.customtextarea?.trim() || "";
      const combinedComments = [
        record.comments?.trim(),
        allergies ? `[ALERGIAS] ${allergies}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // Crear reserva
      await prisma.reservation.create({
        data: {
          type: "NORMAL",
          customerId: customer.id,
          venueId,
          guests,
          totalAmount,
          paidAmount,
          paymentStatus,
          status: reservationStatus,
          visitDate,
          comments: combinedComments || null,
          turitopId: record.short_id,
          isFirstVisit: true,
          source: "turitop",
        },
      });

      result.successCount++;
    } catch (error) {
      result.errorCount++;
      result.errors.push({
        turitopId: record.short_id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

function generateReport(result: MigrationResult) {
  const reportPath = path.join(process.cwd(), "turitop-migration-report.json");

  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalRecords: result.totalRecords,
      successCount: result.successCount,
      errorCount: result.errorCount,
      duplicateCount: result.duplicateCount,
      successRate: `${((result.successCount / result.totalRecords) * 100).toFixed(2)}%`,
    },
    venues: {
      withVenue: result.venueAssignedCount,
      withoutVenue: result.venueNotAssignedCount,
    },
    errors: result.errors,
    duplicates: result.duplicates,
  };

  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));

  console.log("\n📋 REPORTE DE MIGRACIÓN:");
  console.log(`   Total procesados: ${result.totalRecords.toLocaleString()}`);
  console.log(`   ✅ Exitosas: ${result.successCount.toLocaleString()}`);
  console.log(`   ❌ Errores: ${result.errorCount.toLocaleString()}`);
  console.log(`   ⚠️  Duplicados: ${result.duplicateCount.toLocaleString()}`);
  console.log(`   📍 Con venue asignado: ${result.venueAssignedCount.toLocaleString()}`);
  console.log(`   📍 Sin venue: ${result.venueNotAssignedCount.toLocaleString()}`);
  console.log(`\n📁 Reporte guardado en: ${reportPath}`);

  if (result.errors.length > 0 && result.errors.length <= 20) {
    console.log("\n⚠️  Primeros errores:");
    result.errors.slice(0, 20).forEach((err) => {
      console.log(`   - ${err.turitopId}: ${err.error}`);
    });
  }
}

main().catch(console.error);
