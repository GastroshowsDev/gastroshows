import { NextRequest, NextResponse } from "next/server";

type RateLimitStore = Map<string, { count: number; resetAt: number }>;

// In-memory store (works per-instance; for distributed use Upstash Redis)
const store: RateLimitStore = new Map();

export interface RateLimitConfig {
  limit: number; // max requests
  window: number; // time window in seconds
  keyGenerator?: (req: NextRequest) => string; // how to identify client (default: IP)
}

/**
 * Simple rate limiter using in-memory store
 * For production, replace with Redis (Upstash) for distributed rate limiting
 */
export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<{ success: boolean; remaining: number; resetAt?: Date }> {
  const key =
    config.keyGenerator?.(req) ||
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const entry = store.get(key);

  // Reset if window expired
  if (entry && entry.resetAt < now) {
    store.delete(key);
  }

  const current = store.get(key) || { count: 0, resetAt: now + config.window * 1000 };

  if (current.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(current.resetAt),
    };
  }

  current.count++;
  store.set(key, current);

  return {
    success: true,
    remaining: config.limit - current.count,
    resetAt: new Date(current.resetAt),
  };
}

/**
 * Middleware wrapper for rate limiting endpoints
 */
export function withRateLimit(config: RateLimitConfig) {
  return async (req: NextRequest) => {
    const { success, resetAt } = await rateLimit(req, config);

    if (!success) {
      return NextResponse.json(
        { ok: false, code: "RATE_LIMITED", error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (resetAt!.getTime() - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    return null; // Continue to handler
  };
}

/**
 * Cleanup old entries periodically (runs every 5 minutes)
 */
export function startRateLimitCleanup(interval = 5 * 60 * 1000) {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) {
        store.delete(key);
      }
    }
  }, interval);
}
