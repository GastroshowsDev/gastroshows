import { NextResponse } from "next/server";

export type ErrorCode =
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR"
  | "RATE_LIMITED"
  | "TOO_LARGE";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiErrorResponse(
  error: unknown,
  defaultMessage = "Internal error"
): [errorData: { ok: false; code: ErrorCode; error: string }, statusCode: number] {
  // Log full error server-side (safe)
  if (error instanceof Error) {
    console.error("[api-error]", error.name, error.message);
  } else {
    console.error("[api-error]", error);
  }

  if (error instanceof ApiError) {
    return [
      { ok: false, code: error.code, error: error.message },
      error.statusCode,
    ];
  }

  // Generic response for unknown errors (no details exposed)
  return [{ ok: false, code: "INTERNAL_ERROR", error: defaultMessage }, 500];
}

export function createErrorResponse(
  statusCode: number,
  code: ErrorCode,
  message: string,
  details?: Record<string, unknown>
) {
  const [data, status] = apiErrorResponse(
    new ApiError(statusCode, code, message, details),
    message
  );
  return NextResponse.json(data, { status });
}
