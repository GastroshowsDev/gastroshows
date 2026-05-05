import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "octokit";
import fs from "fs";
import path from "path";

// Configuración de GitHub
const REPO_OWNER = "GastroshowsDev";
const REPO_NAME = "gastroshows";
const FILE_PATH = "app/globals.css"; // Archivo que permitiremos modificar para la PoC

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { prompt, action, pullNumber, branchName: inputBranchName } = await req.json();

    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!geminiKey || !githubToken) {
      return NextResponse.json({ 
        error: "Faltan variables de entorno. Configúralas en tu .env" 
      }, { status: 500 });
    }

    const octokit = new Octokit({ auth: githubToken });

    // --- ACCIÓN: MERGE (Publicar) ---
    if (action === "merge" && pullNumber) {
      await octokit.rest.pulls.merge({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        pull_number: pullNumber,
      });
      
      if (inputBranchName) {
        try {
          await octokit.rest.git.deleteRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${inputBranchName}`,
          });
        } catch (e) {
          console.warn("No se pudo borrar la rama, quizá ya fue borrada.");
        }
      }

      return NextResponse.json({ ok: true, message: "¡Cambio publicado con éxito en la web oficial!" });
    }

    // --- ACCIÓN: CREATE (Modificar código con Gemini) ---
    if (!prompt) return NextResponse.json({ error: "Prompt vacío" }, { status: 400 });

    // 2. Leer el archivo actual
    const fullPath = path.join(process.cwd(), FILE_PATH);
    let currentContent = "";
    try {
      if (fs.existsSync(fullPath)) {
        currentContent = fs.readFileSync(fullPath, "utf-8");
      } else {
        throw new Error("Local file not found");
      }
    } catch (e) {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      currentContent = Buffer.from((data as any).content, "base64").toString();
    }

    // 3. Llamar a Gemini
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const aiPrompt = `
      Eres un experto en desarrollo web y CSS.
      Tu tarea es modificar el archivo CSS actual basándote en la petición del usuario.
      
      ARCHIVO ACTUAL:
      ${currentContent}
      
      PETICIÓN DEL USUARIO:
      "${prompt}"
      
      REGLAS:
      - Responde ÚNICAMENTE con el nuevo código completo del archivo.
      - No añadas explicaciones, solo el código.
      - No uses bloques de código con triple comilla (\`\`\`), solo el texto plano del código.
    `;

    const result = await model.generateContent(aiPrompt);
    const newContent = result.response.text().trim();

    // 4. Lógica de Git (Ramas y PR)
    const newBranchName = `ai-change-${Date.now()}`;
    
    const { data: mainBranch } = await octokit.rest.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: "heads/main",
    });

    await octokit.rest.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${newBranchName}`,
      sha: mainBranch.object.sha,
    });

    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: `🤖 AI: ${prompt.slice(0, 50)}`,
      content: Buffer.from(newContent).toString("base64"),
      sha: (currentFile as any).sha,
      branch: newBranchName,
    });

    const { data: pr } = await octokit.rest.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `Cambio sugerido por IA: ${prompt.slice(0, 50)}`,
      head: newBranchName,
      base: "main",
      body: `He realizado los siguientes cambios basados en tu petición: "${prompt}"`,
    });

    return NextResponse.json({ 
      ok: true, 
      message: `¡Cambio preparado! Pulsa el botón "Revisar en GitHub". Allí verás un comentario de Vercel (tarda unos 60 segundos en aparecer) con el enlace para probar la web. Si te gusta el resultado, vuelve aquí y dale a "Publicar".`,
      prUrl: pr.html_url,
      branchName: newBranchName
    });

  } catch (error: any) {
    console.error("Error en Asistente AI:", error);
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}
