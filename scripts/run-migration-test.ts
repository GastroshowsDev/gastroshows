import "dotenv/config";
import { migrateTuritopData, TuritopRow } from "../lib/turitop-migrator";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

async function runTestMigration() {
  const csvPath = "c:\\Users\\renat\\Downloads\\testreservas.csv";
  
  if (!fs.existsSync(csvPath)) {
    console.error("No se encuentra el archivo en:", csvPath);
    return;
  }

  console.log("Leyendo archivo CSV...");
  const workbook = XLSX.readFile(csvPath, { codepage: 65001 });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = (XLSX.utils.sheet_to_json(sheet) as any[]);

  console.log(`Total de filas detectadas: ${rows.length}`);

  // Mapeamos TODAS las filas del archivo de prueba (unas 200)
  const mappedRows: TuritopRow[] = rows.map((row) => {
    // Lógica para determinar invitados (Pareja = 2, Individual = 1)
    const orderList = (row.order_list || "").toLowerCase();
    const isPareja = orderList.includes("pareja");
    const guests = (row.tickets_count || 1) * (isPareja ? 2 : 1);

    let datePart = "";
    let shift: "NOON" | "NIGHT" = "NIGHT";

    if (row.date_event) {
      let dateObj: Date;
      if (typeof row.date_event === "number") {
        // Conversión de número de serie de Excel a JS Date
        dateObj = new Date((row.date_event - 25569) * 86400 * 1000);
      } else {
        dateObj = new Date(String(row.date_event));
      }

      if (!isNaN(dateObj.getTime())) {
        datePart = dateObj.toISOString().split("T")[0];
        const hour = dateObj.getHours();
        if (hour > 0 && hour < 16) shift = "NOON";
      }
    }

    let purchaseDateISO = undefined;
    if (row.date_booking) {
      let pDate: Date;
      if (typeof row.date_booking === "number") {
        pDate = new Date((row.date_booking - 25569) * 86400 * 1000);
      } else {
        pDate = new Date(String(row.date_booking));
      }
      if (!isNaN(pDate.getTime())) {
        purchaseDateISO = pDate.toISOString();
      }
    }

    return {
      name: row.name || "Sin nombre",
      email: row.email,
      phone: row.phone,
      guests: guests,
      date: datePart,
      shift: shift,
      totalAmount: parseFloat(String(row.total_price || "0")),
      paidAmount: parseFloat(String(row.paid_online || "0")),
      comments: row.comments,
      allergies: row.customtextarea,
      isGift: row.gift_certificate === 1 || (row.comments || "").toLowerCase().includes("regalo"),
      purchaseDate: purchaseDateISO,
    };
  });

  console.log(`Iniciando migración de prueba (${mappedRows.length} filas)...`);
  const results = await migrateTuritopData(mappedRows);

  console.log("--- RESULTADOS ---");
  console.log(`Procesadas: ${results.total}`);
  console.log(`Creadas con éxito: ${results.created}`);
  if (results.errors.length > 0) {
    console.log("Errores detectados:");
    results.errors.forEach(e => console.log(` - ${e}`));
  }
}

runTestMigration().catch(console.error);
