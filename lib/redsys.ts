/**
 * Redsys TPV Virtual — protocolo REST HMAC_SHA256_V1
 *
 * Env vars required:
 *   REDSYS_MERCHANT_CODE      — Código FUC del comercio
 *   REDSYS_TERMINAL           — Número de terminal (e.g. "001")
 *   REDSYS_SECRET_KEY         — Clave SHA256 (base64) del back-office Redsys
 *   REDSYS_URL                — URL del TPV (test o producción)
 *   REDSYS_URLOK              — Redirección al cliente si el pago es correcto
 *   REDSYS_URLKO              — Redirección al cliente si el pago falla
 *   REDSYS_NOTIFICATION_URL   — URL server-to-server de notificación (MERCHANTURL)
 *
 * Test URL:       https://sis-t.redsys.es:25443/sis/realizarPago
 * Producción URL: https://sis.redsys.es/sis/realizarPago
 */

import { createCipheriv, createHmac } from "crypto";

// ── Crypto ───────────────────────────────────────────────────────────────────

/** Deriva la clave de firma por pedido mediante 3DES-CBC. */
function deriveKey(order: string, merchantKeyB64: string): Buffer {
  const key = Buffer.from(merchantKeyB64, "base64");
  const iv = Buffer.alloc(8, 0);
  const cipher = createCipheriv("des-ede3-cbc", key, iv);
  cipher.setAutoPadding(false);
  const orderBuf = Buffer.alloc(8, 0);
  Buffer.from(order.padEnd(8, "\0").slice(0, 8)).copy(orderBuf);
  return Buffer.concat([cipher.update(orderBuf), cipher.final()]);
}

/** Firma el string de parámetros (base64) con HMAC-SHA256. */
function signParams(paramsB64: string, order: string, merchantKeyB64: string): string {
  const key = deriveKey(order, merchantKeyB64);
  return createHmac("sha256", key).update(paramsB64).digest("base64");
}

/** Normaliza base64 ↔ base64url para comparación de firmas. */
function normalizeB64(s: string): string {
  return s.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
}

// ── Types ────────────────────────────────────────────────────────────────────

export type RedsysFormData = {
  url: string;
  Ds_SignatureVersion: string;
  Ds_MerchantParameters: string;
  Ds_Signature: string;
};

export type RedsysCallbackFields = {
  Ds_SignatureVersion: string;
  Ds_MerchantParameters: string;
  Ds_Signature: string;
};

export type RedsysNotification = {
  Ds_Order: string;
  Ds_Amount: string;
  Ds_Response: string;   // "0000"–"0099" = éxito
  Ds_MerchantCode: string;
  Ds_Terminal: string;
  Ds_TransactionType: string;
  Ds_AuthorisationCode: string;
  [key: string]: string;
};

// ── Build payment ────────────────────────────────────────────────────────────

/**
 * Genera los parámetros firmados para el formulario de pago Redsys.
 * @param amountEuros  Importe en euros (e.g. 39.00)
 * @param orderId      Referencia de pedido única (máx 12 caracteres alfanuméricos,
 *                     debe empezar por 4 dígitos numéricos)
 */
export function buildRedsysFormData(amountEuros: number, orderId: string): RedsysFormData {
  const merchantKey = process.env.REDSYS_SECRET_KEY ?? "";
  const amountCents = Math.round(amountEuros * 100).toString();

  const params = {
    DS_MERCHANT_AMOUNT: amountCents,
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE ?? "",
    DS_MERCHANT_CURRENCY: "978",
    DS_MERCHANT_TRANSACTIONTYPE: "0",
    DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL ?? "001",
    DS_MERCHANT_MERCHANTURL: process.env.REDSYS_NOTIFICATION_URL ?? "",
    DS_MERCHANT_URLOK: process.env.REDSYS_URLOK ?? "",
    DS_MERCHANT_URLKO: process.env.REDSYS_URLKO ?? "",
    DS_MERCHANT_MERCHANTNAME: "Gastro Shows",
    DS_MERCHANT_PRODUCTDESCRIPTION: "Reserva Gastro Shows Barcelona",
    DS_MERCHANT_CONSUMERLANGUAGE: "002",
  };

  const paramsB64 = Buffer.from(JSON.stringify(params)).toString("base64");
  const signature = signParams(paramsB64, orderId, merchantKey);

  return {
    url: process.env.REDSYS_URL ?? "https://sis-t.redsys.es:25443/sis/realizarPago",
    Ds_SignatureVersion: "HMAC_SHA256_V1",
    Ds_MerchantParameters: paramsB64,
    Ds_Signature: signature,
  };
}

// ── Verify callback ──────────────────────────────────────────────────────────

/**
 * Verifica la firma de la notificación de Redsys y retorna los parámetros.
 * Retorna null si la firma es inválida.
 */
export function verifyRedsysCallback(fields: RedsysCallbackFields): RedsysNotification | null {
  const merchantKey = process.env.REDSYS_SECRET_KEY ?? "";
  try {
    const paramsJson = Buffer.from(fields.Ds_MerchantParameters, "base64").toString("utf-8");
    const params = JSON.parse(paramsJson) as RedsysNotification;
    const expected = signParams(fields.Ds_MerchantParameters, params.Ds_Order, merchantKey);
    if (normalizeB64(expected) !== normalizeB64(fields.Ds_Signature)) return null;
    return params;
  } catch {
    return null;
  }
}

/** Retorna true si el código de respuesta Redsys indica éxito (0000–0099). */
export function isRedsysSuccess(responseCode: string): boolean {
  const n = parseInt(responseCode, 10);
  return !isNaN(n) && n >= 0 && n <= 99;
}

/**
 * Genera un orderId compatible con Redsys desde un reservationId.
 * Formato: 4 dígitos (año + secuencia) + 8 alfanuméricos del ID.
 * Máximo 12 caracteres.
 */
export function reservationToOrderId(reservationId: string): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  const seq = Math.floor(Math.random() * 100).toString().padStart(2, "0");
  const suffix = reservationId.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase();
  return `${yy}${seq}${suffix}`.slice(0, 12);
}

/**
 * Extrae el sufijo de 8 caracteres del orderId para buscar la reserva.
 */
export function orderIdToReservationSuffix(orderId: string): string {
  return orderId.slice(-8).toUpperCase();
}
