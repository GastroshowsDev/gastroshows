import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BackupsBoard } from "@/components/admin/BackupsBoard";

export const dynamic = "force-dynamic";

export default async function BackupsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") redirect("/admin/live");

  return <BackupsBoard />;
}
