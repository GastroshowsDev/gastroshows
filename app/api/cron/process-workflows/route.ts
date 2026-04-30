import { NextResponse } from "next/server";
import { processWorkflowExecutions } from "@/lib/admin/workflow-engine";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await processWorkflowExecutions();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cron/process-workflows] Error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
