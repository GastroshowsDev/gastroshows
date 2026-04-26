import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WebIndex } from "@/components/admin/WebIndex";

export const dynamic = "force-dynamic";

export default async function WebPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/admin/live");

  return <WebIndex />;
}
