/**
 * GET|POST /api/payments/return
 *
 * Redirección del cliente tras el pago en Redsys (URLOK y URLKO).
 * Verificamos la firma y redirigimos a la página correcta.
 *
 * Configurar en Redsys:
 *   URLOK = https://gastroshows.es/api/payments/return
 *   URLKO = https://gastroshows.es/api/payments/return
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyRedsysCallback, isRedsysSuccess } from "@/lib/redsys";

function extractFields(params: URLSearchParams | FormData) {
  const get = (key: string) =>
    params instanceof URLSearchParams
      ? (params.get(key) ?? "")
      : ((params.get(key) as string) ?? "");
  return {
    Ds_SignatureVersion: get("Ds_SignatureVersion"),
    Ds_MerchantParameters: get("Ds_MerchantParameters"),
    Ds_Signature: get("Ds_Signature"),
  };
}

function redirect(req: NextRequest, path: string) {
  const base = process.env.NEXTAUTH_URL ?? `https://${req.headers.get("host")}`;
  return NextResponse.redirect(new URL(path, base));
}

export async function GET(req: NextRequest) {
  const fields = extractFields(req.nextUrl.searchParams);
  const params = verifyRedsysCallback(fields);
  const success = params && isRedsysSuccess(params.Ds_Response);
  return success
    ? redirect(req, `/booking-confirmation?order=${params.Ds_Order}`)
    : redirect(req, `/booking-payment-failed?order=${params?.Ds_Order ?? ""}`);
}

export async function POST(req: NextRequest) {
  let fields;
  try {
    fields = extractFields(await req.formData());
  } catch {
    return redirect(req, "/booking-payment-failed");
  }
  const params = verifyRedsysCallback(fields);
  const success = params && isRedsysSuccess(params.Ds_Response);
  return success
    ? redirect(req, `/booking-confirmation?order=${params?.Ds_Order ?? ""}`)
    : redirect(req, `/booking-payment-failed?order=${params?.Ds_Order ?? ""}`);
}
