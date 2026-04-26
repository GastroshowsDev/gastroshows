import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSeoSettings } from "@/lib/seo";
import { SeoBoard } from "@/components/admin/SeoBoard";

export default async function SeoPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if ((session.user as { role?: string })?.role !== "ADMIN") redirect("/admin/live");

  const settings = await getSeoSettings();

  return <SeoBoard initialSettings={settings} />;
}
