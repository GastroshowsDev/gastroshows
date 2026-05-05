import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// ── Sistema Prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un asistente experto en GastroShows, una plataforma de experiencias gastronómicas clandestinas en Barcelona.

Sobre GastroShows:
- Es una experiencia gastronómica exclusiva con menú secreto y ritual de anticipación
- Ofrece cenas privadas para grupos y eventos corporativos
- Tiene un sistema de vales regalo válidos por 6 meses
- Utilizan control horario con PIN para empleados
- Aceptan reservas con validación internacional de teléfonos (60+ países)
- El teléfono de contacto es +34 620 26 95 85

Tu rol:
1. Responder preguntas sobre cómo usar la plataforma
2. Explicar procesos de reserva, regalos, eventos privados
3. Ayudar con problemas técnicos básicos
4. Ser amable y profesional, en español
5. Si no sabes algo, di que contacten por WhatsApp

Siempre incluye fuentes si usaste documentación (ej: "Según PHONE_SYSTEM.md...")`;

// ── RAG: Buscar documentación relevante ──────────────────────────────────────
async function searchKnowledge(query: string): Promise<{ articles: typeof articles; context: string }> {
  // Buscar artículos por coincidencia en título, contenido o palabras clave
  const articles = await prisma.knowledgeArticle.findMany({
    where: {
      active: true,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
        { keywords: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 5, // Top 5 resultados más relevantes
    orderBy: { order: "asc" },
  });

  // Construir contexto con artículos encontrados
  const context =
    articles.length > 0
      ? articles.map((a) => `**${a.title}** (${a.category})\n${a.content}`).join("\n\n---\n\n")
      : "No se encontró documentación específica.";

  return { articles, context };
}

// ── POST /api/ai-assistant ──────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { question, userId } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ ok: false, error: "Question required" }, { status: 400 });
    }

    // 1. Buscar documentación relevante (RAG)
    const { articles, context } = await searchKnowledge(question);

    // 2. Construir prompt con contexto
    const userPrompt = `${context}\n\n---\n\nPregunta del usuario: ${question}`;

    // 3. Llamar a Claude
    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const answer =
      message.content[0].type === "text" ? message.content[0].text : "Error procesando respuesta";

    // 4. Guardar en BD para historial y feedback
    const sourceIds = articles.map((a) => a.id).join(",");
    await prisma.assistantChat.create({
      data: {
        userId: userId || null,
        question,
        answer,
        sources: sourceIds || null,
      },
    });

    return NextResponse.json({
      ok: true,
      answer,
      sources: articles.map((a) => ({ id: a.id, title: a.title, category: a.category })),
    });
  } catch (err: any) {
    console.error("[api/ai-assistant] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error procesando tu pregunta" },
      { status: 500 }
    );
  }
}
