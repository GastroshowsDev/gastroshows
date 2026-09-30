import crypto from "node:crypto";

const TOKEN_SECRET = process.env.TPV_TOKEN_SECRET || "tpv-secret-change-in-prod";
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

export type OperatorPayload = { id: string; name: string; iat: number; exp: number };

export function signOperatorToken(payload: Omit<OperatorPayload, "iat" | "exp">): string {
  const now = Date.now();
  const tokenData: OperatorPayload = {
    ...payload,
    iat: now,
    exp: now + TOKEN_TTL_MS,
  };
  const message = JSON.stringify(tokenData);
  const hmac = crypto.createHmac("sha256", TOKEN_SECRET);
  hmac.update(message);
  const sig = hmac.digest("hex");
  return btoa(message) + "." + sig;
}

export function verifyOperatorToken(token: string): OperatorPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;
  const message = atob(b64);
  const hmac = crypto.createHmac("sha256", TOKEN_SECRET);
  hmac.update(message);
  const expectedSig = hmac.digest("hex");
  if (sig !== expectedSig) return null;
  const payload: OperatorPayload = JSON.parse(message);
  if (Date.now() > payload.exp) return null;
  return payload;
}
