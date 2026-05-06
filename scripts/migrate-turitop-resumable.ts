/**
 * Migración de Turitop a GastroShows - Versión Resumible
 * Importa 15,723+ reservas desde CSV de Turitop con capacidad de reanudar
 *
 * Características:
 * - Checkpoints cada 500 registros
 * - Detecta registros ya importados por turitopId
 * - Continúa desde el último checkpoint si se interrumpe
 * - Reportes detallados de progreso
 *
 * Uso: npx ts-node scripts/migrate-turitop-resumable.ts <path-to-csv>
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

interface MigrationState {
  csvPath: string;
  totalRecords: number;
  processedCount: number;
  lastCheckpoint: number;
  successCount: number;
  errorCount: number;
  duplicateCount: number;
  venueAssignedCount: number;
  venueNotAssignedCount: number;
  errors: Array<{ turitopId: string; error: string }>;
  duplicates: Array<{ turitopId: string; reason: string }>;
  lastProcessedId: string | null;
  startTime: string;
  resumedFrom: number;
}

const BATCH_SIZE = 500;
const CHECKPOINT_INTERVAL = 500; // Guardar estado cada 500 registros
const STATE_FILE = path.join(process.cwd(), "turitop-migration-state.json");
const REPORT_FILE = path.join(process.cwd(), "turitop-migration-report.json");

function loadState(): MigrationState | null {
  if (fs.existsSync(STATE_FILE)) {
    try {
      const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
      console.log(`\n📋 Estado previo encontrado: ${state.processedCount}/${state.totalRecords} registros`);
      console.log(`   Último checkpoint: ${state.lastCheckpoint}`);
      return state;
    } catch (err) {
      console.warn("⚠️  No se pudo cargar el estado previo, iniciando desde cero");
      return null;
    }
  }
  return null;
}

function saveState(state: MigrationState) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function generateReport(state: MigrationState) {
  const reportData = {
    timestamp: new Date().toISOString(),
    duration: state.resumedFrom > 0 ? "CONTINUADO DESDE CHECKPOINT" : "EJECUCIÓN COMPLETA",
    startTime: state.startTime,
    resumedFrom: state.resumedFrom,
    summary: {
      totalRecords: state.totalRecords,
      processedCount: state.processedCount,
      successCount: state.successCount,
      errorCount: state.errorCount,
      duplicateCount: state.duplicateCount,
      successRate: `${((state.successCount / state.processedCount) * 100).toFixed(2)}%`,
      pendingCount: state.totalRecords - state.processedCount,
    },
    venues: {
      withVenue: state.venueAssignedCount,
      withoutVenue: state.venueNotAssignedCount,
    },
    errors: state.errors.slice(0, 50),
    duplicates: state.duplicates.slice(0, 20),
    lastProcessedId: state.lastProcessedId,
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(reportData, null, 2));

  console.log("\n📋 REPORTE DE MIGRACIÓN:");
  console.log(`   Total a procesar: ${state.totalRecords.toLocaleString()}`);
  console.log(`   ✅ Ya procesados: ${state.processedCount.toLocaleString()}`);
  console.log(`   ✅ Exitosas: ${state.successCount.toLocaleString()}`);
  console.log(`   ❌ Errores: ${state.errorCount.toLocaleString()}`);
  console.log(`   ⚠️  Duplicados: ${state.duplicateCount.toLocaleString()}`);
  console.log(`   📍 Con venue asignado: ${state.venueAssignedCount.toLocaleString()}`);
  console.log(`   📍 Sin venue: ${state.venueNotAssignedCount.toLocaleString()}`);
  console.log(`   ⏳ Pendientes: ${(state.totalRecords - state.processedCount).toLocaleString()}`);
  console.log(`\n📁 Reporte guardado en: ${REPORT_FILE}`);
  console.log(`📁 Estado guardado en: ${STATE_FILE}`);
}

async function getAlreadyImported(): Promise<Set<string>> {
  const existing = await prisma.reservation.findMany({
    where: { source: "turitop" },
    select: { turitopId: true },
  });
  return new Set(existing.map(r => r.turitopId).filter((id): id is string => id !== null));
}

async function main() {
  const csvPath = process.argv[2];

  if (!csvPath) {
    console.error("❌ Uso: npx ts-node scripts/migrate-turitop-resumable.ts <path-to-csv>");
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Archivo no encontrado: ${csvPath}`);
    process.exit(1);
  }

  let state: MigrationState | null = null;

  try {
    console.log("🔄 Iniciando migración (modo resumible)...\n");

    // Cargar estado previo si existe
    state = loadState();
    const csvData = fs.readFileSync(csvPath, "utf-8");

    // Detectar delimitador (comma o tab)
    const firstLine = csvData.split("\n")[0];
    const delimiter = firstLine.includes("\t") ? "\t" : ",";

    const allRecords = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      delimiter,
      quote: '"',
      relax_quotes: true,
    }) as TuritopRecord[];

    if (!state) {
      // Primera ejecución
      state = {
        csvPath,
        totalRecords: allRecords.length,
        processedCount: 0,
        lastCheckpoint: 0,
        successCount: 0,
        errorCount: 0,
        duplicateCount: 0,
        venueAssignedCount: 0,
        venueNotAssignedCount: 0,
        errors: [],
        duplicates: [],
        lastProcessedId: null,
        startTime: new Date().toISOString(),
        resumedFrom: 0,
      };
      console.log(`📖 CSV cargado: ${state.totalRecords.toLocaleString()} registros`);
    } else {
      state.resumedFrom = state.processedCount;
      console.log(`📖 Reanudando desde registro ${state.resumedFrom}...\n`);
    }

    // Obtener IDs ya importados
    console.log("🔍 Verificando registros ya importados...");
    const alreadyImported = await getAlreadyImported();
    console.log(`   ${alreadyImported.size} registros ya están en BD\n`);

    // Procesar registros pendientes
    const startIdx = state.processedCount;
    const recordsToProcess = allRecords.slice(startIdx);

    console.log(`📥 Importando ${recordsToProcess.length.toLocaleString()} registros pendientes...\n`);

    for (let i = 0; i < recordsToProcess.length; i += BATCH_SIZE) {
      const batch = recordsToProcess.slice(i, i + BATCH_SIZE);
      const globalIndex = startIdx + i;
      const batchNumber = Math.floor(globalIndex / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(allRecords.length / BATCH_SIZE);

      console.log(`\n📦 Lote ${batchNumber}/${totalBatches} (registros ${globalIndex.toLocaleString()}-${Math.min(globalIndex + BATCH_SIZE, allRecords.length).toLocaleString()})`);

      await processBatch(batch, state, alreadyImported);

      state.lastCheckpoint = globalIndex + batch.length;
      state.processedCount = state.lastCheckpoint;

      // Guardar checkpoint
      if ((globalIndex + batch.length) % CHECKPOINT_INTERVAL === 0) {
        saveState(state);
        console.log(`   💾 Checkpoint guardado`);
      }

      const progress = Math.min(globalIndex + BATCH_SIZE, allRecords.length);
      const percentage = ((progress / allRecords.length) * 100).toFixed(1);
      console.log(`   [${progress.toLocaleString()}/${allRecords.length.toLocaleString()} - ${percentage}%]`);
    }

    state.processedCount = allRecords.length;
    saveState(state);
    generateReport(state);

    // Limpiar archivo de estado si todo fue exitoso
    if (state.processedCount === allRecords.length && state.errorCount === 0) {
      fs.unlinkSync(STATE_FILE);
      console.log("\n✨ ¡Migración completada exitosamente!");
      console.log("   Archivo de estado eliminado (migración finalizada)");
    } else if (state.processedCount < allRecords.length) {
      console.log(`\n⏸️  Migración pausada. Pendientes: ${(allRecords.length - state.processedCount).toLocaleString()} registros`);
      console.log("   Ejecuta el comando nuevamente para continuar desde donde se pausó.");
    }
  } catch (error) {
    console.error("\n❌ Error durante migración:", error);
    if (state) {
      saveState(state);
      console.log(`💾 Estado guardado. Ejecuta el comando nuevamente para continuar.`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function processBatch(
  batch: TuritopRecord[],
  state: MigrationState,
  alreadyImported: Set<string>
) {
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

      // Verificar si ya está importado
      if (alreadyImported.has(record.short_id)) {
        state.duplicateCount++;
        state.duplicates.push({
          turitopId: record.short_id,
          reason: "Ya existe en BD",
        });
        state.lastProcessedId = record.short_id;
        continue;
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
            email: `placeholder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@turitop.local`,
            phone: phone || "",
            source: "turitop",
          },
        });
      }

      // Buscar venue
      let venueId: string | null = null;
      const commentsLower = (record.comments || "").toLowerCase();

      if (commentsLower.includes("bertrand")) {
        const venue = await prisma.venue.findFirst({
          where: { name: "BERTRAND" },
        });
        if (venue) {
          venueId = venue.id;
          state.venueAssignedCount++;
        } else {
          state.venueNotAssignedCount++;
        }
      } else if (commentsLower.includes("urgell")) {
        const venue = await prisma.venue.findFirst({
          where: { name: "URGELL" },
        });
        if (venue) {
          venueId = venue.id;
          state.venueAssignedCount++;
        } else {
          state.venueNotAssignedCount++;
        }
      } else {
        state.venueNotAssignedCount++;
      }

      // Mapear status
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

      // Compilar comentarios
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
        } as any,
      });

      state.successCount++;
      state.lastProcessedId = record.short_id;
      alreadyImported.add(record.short_id);
    } catch (error) {
      state.errorCount++;
      state.errors.push({
        turitopId: record.short_id,
        error: error instanceof Error ? error.message : String(error),
      });
      state.lastProcessedId = record.short_id;
    }
  }
}

main().catch(console.error);
