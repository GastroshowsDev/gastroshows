import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RedirectsList } from "@/components/admin/RedirectsList";

export const dynamic = "force-dynamic";

export default async function RedirectsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/admin/live");

  return <RedirectsList />;
}
