import { prisma } from "@/lib/prisma";
import { KnowledgeManager } from "./KnowledgeManager";

export const dynamic = "force-dynamic";

export default async function AsistenteAdminPage() {
  const articles = await prisma.knowledgeArticle.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
          Base de Conocimiento - Asistente IA
        </h1>
        <p style={{ color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
          Gestiona los artículos que usa el asistente para responder preguntas.
        </p>
      </div>

      <KnowledgeManager initialArticles={articles} />
    </div>
  );
}
