# Security & Architecture Analysis
**Date**: 2026-05-06 | **Scope**: Full codebase review | **Status**: Active findings

---

## 🔴 CRITICAL Issues

### 1. **Information Disclosure via Error Messages**
**Location**: 85 `console.error()` statements in API routes
**Risk**: Production errors may expose sensitive DB details, file paths, or internal logic
**Example**: `app/api/admin/backups/[id]/route.ts`, `app/api/admin/reservations/merge/route.ts`
```js
// ❌ BAD - leaks err.message to client
catch (err: any) {
  return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
}
```
**Fix**: 
```js
// ✅ GOOD - generic message to client, detailed logging server-side
catch (err: any) {
  console.error("[route-name] error:", err); // Server-side only
  return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
}
```
**Priority**: 🔴 **CRITICAL** — affects all admin APIs

---

### 2. **No Rate Limiting on Public Endpoints**
**Location**: `app/api/public/availability/route.ts`, `app/api/reservations/normal/route.ts`
**Risk**: 
- Reservation endpoint can be abused for capacity DoS
- Availability endpoint has no throttling (2min cache helps, but no rate limit on hits)
**Attack**: 1000 POST requests/sec to flood availability or create fake bookings
**Fix**:
```ts
// Add simple rate limiting via IP + Vercel's built-in ratelimit
import { Ratelimit } from "@vercel/edge-ratelimit";

const ratelimit = new Ratelimit({
  key: `${req.ip || 'unknown'}`,
  limit: 10,          // 10 requests
  window: '60s',      // per 60 seconds
});

const { success } = await ratelimit.limit(key);
if (!success) return new Response("Rate limited", { status: 429 });
```
**Priority**: 🔴 **CRITICAL** — public endpoints are exposed

---

### 3. **IDOR Vulnerability in Reservations (Partially Fixed)**
**Location**: `app/api/reservations/[id]/route.ts`
**Note**: ROUTES.md says "IDOR fixed" but verify the fix:
```ts
// Needs to check if user is staff OR owns this reservation
const session = await getServerSession(authOptions);
if (!session) return unauthorized;
// ❌ Missing: verify session.user.id owns this reservation OR is staff
```
**Fix**: 
```ts
const reservation = await prisma.reservation.findUnique({ where: { id } });
if (!reservation) return notFound;
if (reservation.customerId !== session.user.email && role !== 'ADMIN' && role !== 'LIVE') {
  return forbidden;
}
```
**Priority**: 🔴 **CRITICAL** — allows customer A to view/modify customer B's reservation

---

### 4. **Raw SQL Queries Without Parameterization Review**
**Location**: `app/api/admin/backups/stats/route.ts`
**Risk**: `$queryRaw` used 4 times; not vulnerable if inputs are trusted, but dangerous pattern
```ts
// ⚠️ If these queries construct strings from request params, SQL injection is possible
prisma.$queryRaw<[{ size: string }]>`SELECT ...`
```
**Audit**: Verify these queries:
- Don't construct SQL from `req.query` or `req.body`
- Only use template literals, never string concatenation
**Priority**: 🔴 **CRITICAL** — code audit required

---

## 🟠 HIGH Issues

### 5. **Insufficient Input Validation on Bulk Import**
**Location**: `app/api/admin/import/reservations/route.ts`
**Issue**: 
- Accepts ImportRow arrays with minimal validation
- No max file size check (could load 10MB of JSON)
- No duplicate email deduplication before importing
- Date parsing assumes UTF-8 ISO format; no timezone handling
```ts
// ❌ No file size limit
const body = await req.json() as { rows: ImportRow[] };
// ❌ No check on body.rows.length (could be 100k rows)
```
**Fix**:
```ts
const body = await req.json() as { rows: ImportRow[] };
if (body.rows.length > 1000) {
  return NextResponse.json({ ok: false, error: "Max 1000 rows per import" }, { status: 400 });
}
// Check for duplicate emails in the batch
const emails = body.rows.map(r => r.email?.toLowerCase()).filter(Boolean);
const dupes = emails.filter((e, i) => emails.indexOf(e) !== i);
if (dupes.length > 0) {
  return NextResponse.json({ ok: false, error: `Duplicate emails: ${dupes.join(', ')}` }, { status: 400 });
}
```
**Priority**: 🟠 **HIGH** — affects data integrity

---

### 6. **No CSRF Protection on State-Changing Endpoints**
**Location**: All POST/PATCH/DELETE endpoints
**Issue**: Next.js doesn't set SameSite=Strict by default
```ts
// Session cookie may not have SameSite=Strict
session: { strategy: "jwt" },  // No sameSite config
```
**Fix**:
```ts
session: { 
  strategy: "jwt",
  maxAge: 24 * 60 * 60,  // 24h expiry
  updateAge: 60 * 60,    // Refresh every hour
},
// Add to middleware:
const response = NextResponse.next();
response.headers.set('Set-Cookie', 'SameSite=Strict; Secure');
```
**Priority**: 🟠 **HIGH** — especially for admin endpoints

---

### 7. **No Audit Logging for Admin Actions**
**Location**: All `app/api/admin/**` endpoints
**Issue**: No record of who deleted a reservation, changed user role, modified settings, etc.
- Creates compliance issues (GDPR)
- Impossible to investigate security incidents
**Fix**: Add audit log table + middleware:
```ts
// In schema.prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  action    String   // "DELETE_RESERVATION", "UPDATE_USER", etc.
  table     String   // "Reservation", "User", etc.
  recordId  String
  before    Json?    // Previous values
  after     Json?    // New values
  createdAt DateTime @default(now())
  @@index([userId, createdAt])
}
```
**Priority**: 🟠 **HIGH** — compliance + incident response

---

## 🟡 MEDIUM Issues

### 8. **Weak Password Requirements**
**Location**: `app/api/admin/users/route.ts`, `app/api/auth/reset-password/route.ts`
**Issue**: Only checks `password.length < 8`, no complexity requirements
```ts
if (body.password.length < 8) return error; // That's all
```
**Fix**:
```ts
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
if (!passwordRegex.test(body.password)) {
  return error("Password must be 12+ chars with uppercase, lowercase, digit, and special char");
}
```
**Priority**: 🟡 **MEDIUM** — admin accounts only, but important

---

### 9. **Sensitive Data Exposure in Logging**
**Location**: Multiple `console.log()` statements log request/response data
**Risk**: Logs might include email, phone, reservation details, payment info
**Audit**: Grep for logged data:
```bash
grep -r "console.log.*phone\|console.log.*email\|console.log.*payment" app/api
```
**Fix**: Create a safe logger:
```ts
function safeLog(msg: string, data?: any) {
  const safe = JSON.stringify(data)
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '***')  // Hide SSN-like patterns
    .replace(/\b[\w\.-]+@[\w\.-]+\.\w+\b/g, '[EMAIL]');
  console.log(msg, safe);
}
```
**Priority**: 🟡 **MEDIUM** — information disclosure

---

### 10. **No Request Size Limit**
**Location**: Global API handlers
**Issue**: No `bodyParser` size limit configured in `next.config.ts`
**Risk**: Large file uploads could crash server or OOM
**Fix**:
```ts
// next.config.ts
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust per use case
    },
  },
};
```
**Priority**: 🟡 **MEDIUM** — DoS risk

---

## 🔵 LOW Issues

### 11. **Missing Security Headers**
**Location**: `middleware.ts` / response headers
**Headers Missing**:
- `X-Frame-Options: DENY` (clickjacking)
- `X-Content-Type-Options: nosniff` (MIME sniffing)
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` (XSS)

**Fix**:
```ts
// middleware.ts
export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  if (request.nextUrl.hostname === 'gastroshows.com') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  return response;
}
```
**Priority**: 🔵 **LOW** — defense in depth

---

### 12. **No Dependency Audit**
**Issue**: No `npm audit` in CI/CD; `package.json` has 25+ dependencies
**Risk**: Known vulnerabilities in transitive deps
**Fix**:
```bash
# In CI/CD pipeline
npm audit --audit-level=moderate
```
**Priority**: 🔵 **LOW** — but important for maintenance

---

### 13. **Inconsistent Error Handling**
**Location**: Various endpoints
**Issue**: Some return errors with details, others with generic messages
**Fix**: Standardize error responses:
```ts
// lib/api-errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string, // e.g., "INVALID_INPUT", "NOT_FOUND"
    message: string
  ) {
    super(message);
  }
}

// In endpoints:
try {
  // ...
} catch (err) {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { ok: false, code: err.code, error: err.message },
      { status: err.statusCode }
    );
  }
  console.error("[endpoint]", err);
  return NextResponse.json({ ok: false, code: "INTERNAL_ERROR", error: "Internal error" }, { status: 500 });
}
```
**Priority**: 🔵 **LOW** — improves maintainability

---

## 📋 Architecture Deficiencies

### 14. **Missing API Versioning**
**Status**: Currently all endpoints are `/api/...` with no version prefix
**Recommendation**: Plan for v2 by adding `/api/v1/` prefix now
```
/api/v1/reservations/normal ← reserved for future v2
/api/reservations/normal    ← current (implied v1)
```

### 15. **No OpenAPI/Swagger Documentation**
**Status**: APIs documented only in ROUTES.md (static)
**Recommendation**: Add `swagger-ui-express` + auto-generated docs from code
```ts
// Benefits:
// - Client auto-discovery of endpoints
// - Type safety via OpenAPI schema
// - Integration testing via spec
```

### 16. **Timezone Handling Inconsistent**
**Status**: `lib/reservations.ts` uses `Europe/Madrid`, but date handling mixed
**Issue**: Dates from user inputs may not respect timezone
**Fix**: Use `date-fns-tz` consistently:
```ts
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
const tz = 'Europe/Madrid';
const utcDate = zonedTimeToUtc(userDate, tz);
```

### 17. **No Transaction Isolation Guarantees**
**Status**: Uses Prisma transactions, but no explicit isolation level
**Risk**: Race conditions in availability check + booking (read-modify-write)
**Fix**:
```ts
// Ensure SERIALIZABLE isolation
await prisma.$executeRaw`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE`;
await prisma.$transaction([...], { isolationLevel: 'Serializable' });
```

---

## 🎯 Recommended Action Plan

### Phase 1: Critical (Week 1)
- [ ] Fix error message exposure (#1)
- [ ] Add rate limiting to public endpoints (#2)
- [ ] Verify + fix IDOR in reservations (#3)
- [ ] Audit raw SQL queries (#4)

### Phase 2: High (Week 2-3)
- [ ] Implement input validation + size limits (#5)
- [ ] Add CSRF protection (#6)
- [ ] Set up audit logging table + middleware (#7)

### Phase 3: Medium (Week 4)
- [ ] Strengthen password requirements (#8)
- [ ] Sanitize logging output (#9)
- [ ] Add request size limits (#10)

### Phase 4: Low (Week 5+)
- [ ] Add security headers (#11)
- [ ] Set up npm audit in CI/CD (#12)
- [ ] Standardize error handling (#13)

### Phase 5: Architecture (Ongoing)
- [ ] Plan API versioning (#14)
- [ ] Add OpenAPI docs (#15)
- [ ] Standardize timezone handling (#16)
- [ ] Test transaction isolation (#17)

---

## ✅ What's Going Well

- ✅ **Authentication**: bcrypt password hashing (12 rounds) is solid
- ✅ **Session Management**: JWT strategy with NextAuth is secure by default
- ✅ **Authorization**: Middleware properly enforces role-based access (ADMIN vs LIVE)
- ✅ **No SQL Injection (Likely)**: Using Prisma ORM prevents most SQL injection
- ✅ **.env Protection**: Properly gitignored, not committed
- ✅ **Password Reset**: Tokens have expiry + one-time use
- ✅ **Public Endpoints Protected**: `/api/admin/*` requires authentication

---

## 📞 Questions for Clarification

1. **IDOR in reservations**: Are customers meant to view their own bookings via a token/email? Current endpoint seems to require admin session.
2. **Audit logs**: Are you subject to GDPR, CCPA, or other compliance? Determines audit log retention policy.
3. **Rate limiting budget**: Vercel ratelimit is pay-per-request. Alternative: Upstash Redis for cheaper global rate limit.
4. **Sensitive logs**: Do you need to log payment amounts, phone numbers, email addresses? Plan sanitization strategy.
5. **Data retention**: How long should reservation data be kept? Affects backup strategy.

---

## 📚 Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Next.js Security: https://nextjs.org/docs/deployment/production-checklist
- Prisma Security: https://www.prisma.io/docs/orm/overview/security
- Rate Limiting: https://vercel.com/docs/edge-middleware/ratelimit

---

**Generated**: 2026-05-06 | **Reviewed by**: Claude Code | **Status**: Ready for implementation
