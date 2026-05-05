import * as dotenv from "dotenv";
import * as path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function listModels() {
  const key = process.env.GOOGLE_GEMINI_API_KEY;
  if (!key) {
    console.error("No hay API KEY en el .env");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    // Intentamos listar modelos (usando fetch directo si la lib falla)
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
    const json = await res.json();
    
    if (json.error) {
      console.error("Error de la API:", json.error);
    } else {
      console.log("--- MODELOS DISPONIBLES ---");
      json.models?.forEach((m: any) => {
        console.log(`- ${m.name} (Soporta: ${m.supportedGenerationMethods.join(", ")})`);
      });
    }
  } catch (err) {
    console.error("Error de conexión:", err);
  }
}

listModels();
