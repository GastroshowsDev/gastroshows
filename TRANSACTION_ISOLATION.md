# Transaction Isolation & Concurrency Safety

**Status**: Using Prisma transactions | **Risk**: Race conditions in availability check | **Priority**: Medium

---

## Current Implementation

```ts
// app/api/reservations/normal/route.ts
const result = await prisma.$transaction(async (tx) => {
  // 1. READ: Get current event
  const event = await tx.event.findUnique({ where: { date_shift } });
  
  // 2. CHECK: Can we add guests?
  const remaining = 40 - (event?.totalGuests ?? 0);
  if (requested > remaining) throw new Error("EVENT_FULL");
  
  // 3. WRITE: Update event
  await tx.event.upsert({ update: { totalGuests: { increment: requested } } });
  
  // 4. WRITE: Create booking
  await tx.bookingIntent.create({ ... });
});
```

**Problem**: Between step 2 (CHECK) and step 3 (WRITE), another request might:
- Read old guest count
- Also think there's space
- Both proceed → OVERBOOKING

---

## Root Cause: Transaction Isolation Level

Prisma defaults to `READ_COMMITTED` in PostgreSQL:

| Level            | Dirty Read | Non-Repeatable Read | Phantom Read |
| ---------------- | ---------- | ------------------- | ------------ |
| READ_UNCOMMITTED | ✅         | ✅                  | ✅           |
| READ_COMMITTED   | ❌         | ✅                  | ✅           |
| REPEATABLE_READ  | ❌         | ❌                  | ✅           |
| SERIALIZABLE     | ❌         | ❌                  | ❌           |

**We need**: SERIALIZABLE (no race conditions)

---

## Solution: Explicit SERIALIZABLE Isolation

```ts
// app/api/reservations/normal/route.ts
const result = await prisma.$transaction(
  async (tx) => {
    // Same logic as before
    const event = await tx.event.findUnique({ where: { date_shift } });
    const remaining = 40 - (event?.totalGuests ?? 0);
    if (requested > remaining) throw new Error("EVENT_FULL");
    
    await tx.event.upsert({
      where: { date_shift },
      update: { totalGuests: { increment: requested } },
      create: { /* ... */ },
    });
    
    await tx.bookingIntent.create({ /* ... */ });
  },
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    // timeout: 5000, // 5 second timeout (optional)
  }
);
```

### What Happens

```
Request A          Request B          DB
─────────────────────────────────────────────
START SERIALIZABLE
                   START SERIALIZABLE
READ event (40/40)
                   READ event (40/40) ← Conflict!
UPDATE +2 → 42     UPDATE +1 → 41     ← One fails
                                      Serialization Error
```

When conflict detected, one request gets rolled back + gets error.

---

## Implementation

### 1. Update Reservation Creation

```ts
// lib/booking.ts or app/api/reservations/normal/route.ts
import { Prisma } from "@prisma/client";

export async function createNormalReservation(data: {
  name: string;
  email: string;
  // ...
}) {
  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // Availability check
        const event = await tx.event.findUnique({
          where: { date_shift: { date: serviceDate, shift: parsed.data.shift } },
        });

        const remaining = 40 - (event?.totalGuests ?? 0);
        if (parsed.data.guests > remaining) {
          // Check +1 flexibility rule
          if (!(remaining >= 1 && remaining <= 3 && parsed.data.guests === remaining + 1)) {
            throw new Error("EVENT_FULL");
          }
        }

        // Create/update event
        const eventRecord = await tx.event.upsert({
          where: { date_shift: { date: serviceDate, shift: parsed.data.shift } },
          create: { date: serviceDate, shift: parsed.data.shift, totalGuests: parsed.data.guests },
          update: { totalGuests: { increment: parsed.data.guests } },
        });

        // Create booking intent
        const intent = await tx.bookingIntent.create({
          data: {
            name: parsed.data.name,
            // ...
            eventId: eventRecord.id,
          },
        });

        return { intent, eventRecord };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        timeout: 5000, // 5 second timeout
      }
    );
    return result;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2034") {
      // Serialization conflict
      return { error: "Booking slot taken, please try again" };
    }
    throw err;
  }
}
```

### 2. Update Merge Reservations

```ts
// app/api/admin/reservations/merge/route.ts
const mergedGroupId = crypto.randomUUID();

try {
  await prisma.$transaction(
    async (tx) => {
      await tx.reservation.updateMany({
        where: { id: { in: payload.reservationIds } },
        data: { mergedGroupId },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );
} catch (err) {
  // Handle P2034 (serialization error)
}
```

---

## Testing Checklist

- [ ] Unit: Single request with SERIALIZABLE works
- [ ] Load: 10 concurrent requests to same slot → only 1 succeeds
- [ ] Load: 100 requests to different slots → all succeed
- [ ] Performance: Response time acceptable with SERIALIZABLE
- [ ] Timeout: Request that exceeds 5s timeout is rejected

### Load Test Script

```bash
# Simulate 20 concurrent bookings for same May 15 NOON slot
for i in {1..20}; do
  curl -X POST http://localhost:3000/api/reservations/normal \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Guest '$i'",
      "email": "guest'$i'@example.com",
      "phone": "+34600000000",
      "guests": 2,
      "date": "2026-05-15",
      "shift": "NOON"
    }' &
done
wait

# Expected: ~18 fail with "EVENT_FULL", ~2 succeed (or 1 if no flexibility)
```

---

## Performance Considerations

**SERIALIZABLE = slower** (not a problem for small datasets):

| Operation              | READ_COMMITTED | SERIALIZABLE | Impact        |
| ---------------------- | -------------- | ------------ | ------------- |
| 1 booking              | <1ms           | ~1ms         | Negligible    |
| 10 concurrent bookings | <10ms each     | <50ms each   | Acceptable    |
| 1000 bookings/sec peak | Overbooking!   | Safe         | Necessary     |

If performance becomes an issue, consider:
1. **Row-level locking**: `SELECT FOR UPDATE` (not available in Prisma)
2. **Optimistic locking**: Add `version` field (more complex)
3. **Event queuing**: Queue bookings instead of direct DB write

---

## References

- [Prisma Transactions](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#transaction)
- [PostgreSQL Isolation Levels](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Database Concurrency Patterns](https://www.postgresql.org/docs/current/explicit-locking.html)

---

**Status**: Needs implementation | **Effort**: Low | **Risk**: Medium (without fix)
