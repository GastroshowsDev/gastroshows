import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLandingContent, EVENTOS_DEFAULTS } from "@/lib/landing-content";
import { WebBoard } from "@/components/admin/WebBoard";

export const dynamic = "force-dynamic";

const PAGE_SECTIONS = [
  { key: "ev-hero", label: "Hero",          icon: "◈" },
  { key: "ev-feat", label: "Características", icon: "◇" },
  { key: "ev-cta",  label: "Contacto",      icon: "✉" },
];

export default async function WebEventosPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/admin/live");

  const content = await getLandingContent();

  const fields = Object.entries(EVENTOS_DEFAULTS).map(([key, meta]) => ({
    key,
    label: meta.label,
    type: meta.type,
    section: meta.section,
    order: meta.order,
    defaultValue: meta.defaultValue,
    currentValue: content[key] ?? meta.defaultValue,
  }));

  return (
    <WebBoard
      fields={fields}
      pageSections={PAGE_SECTIONS}
      backHref="/admin/web"
      previewHref="/eventos"
    />
  );
}
