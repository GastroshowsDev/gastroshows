import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PageBuilderEditor } from "@/components/admin/PageBuilderEditor";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditorPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/admin/live");

  const { id } = await params;

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <PageBuilderEditor pageId={id} />
    </div>
  );
}
