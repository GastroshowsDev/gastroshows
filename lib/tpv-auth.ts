import { NextResponse } from "next/server";
import { verifyOperatorToken } from "@/lib/tpv-token";

const HEADER = "Authorization";
const SCHEME = "Bearer ";

export async function requirePosOperator(request: Request): Promise<
  { ok: true; operatorId: string; operatorName: string } | { ok: false; response: NextResponse }
> {
  const authHeader = request.headers.get(HEADER);
  if (!authHeader || !authHeader.startsWith(SCHEME)) {
    return { ok: false, response: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }) };
  }
  const token = authHeader.slice(SCHEME.length);
  const payload = verifyOperatorToken(token);
  if (!payload) {
    return { ok: false, response: NextResponse.json({ ok: false, error: "Token inválido o expirado" }, { status: 401 }) };
  }
  return { ok: true, operatorId: payload.id, operatorName: payload.name };
}
