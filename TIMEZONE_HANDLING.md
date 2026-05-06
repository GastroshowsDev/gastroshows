# Timezone Handling Guide

**Current**: Inconsistent | **Target**: `Europe/Madrid` | **Status**: Needs standardization

---

## Current Issues

1. **Inconsistent parsing**: `new Date()` uses local browser time
2. **Server-side mismatch**: `lib/reservations.ts` hardcodes `Europe/Madrid`
3. **Import data**: Dates treated as UTC, ambiguous for user input
4. **Availability**: Displays slots in browser TZ, not Madrid

### Example Problem

```ts
// User in NY clicks "May 15" in browser
// Browser sends: 2026-05-15 (local: EDT, UTC-4)
// Server receives: ISO string in UTC
// Booking might be off by a day
```

---

## Solution: Standardize on Europe/Madrid

### 1. Client-Side (React)

```ts
// components/reservation/BookingCalendar.tsx
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const TZ = 'Europe/Madrid';

// User picks "May 15" in their browser
const userDate = new Date(2026, 4, 15); // Browser local

// Convert to Madrid time for server
const madridDate = zonedTimeToUtc(userDate, TZ);

// Send ISO string
const payload = { date: madridDate.toISOString() }; // Server expects UTC
```

### 2. Server-Side (Next.js)

```ts
// app/api/reservations/normal/route.ts
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const TZ = 'Europe/Madrid';

// Client sends UTC ISO string
const utcDate = new Date(parsed.data.date);

// Convert to Madrid time to check availability
const madridDate = utcToZonedTime(utcDate, TZ);

// Check if it's a valid booking day in Madrid TZ
const dayOfWeek = madridDate.toLocaleDateString('en-US', { weekday: 'long' });
```

### 3. Database (Prisma)

```ts
// Always store as UTC in DB (auto via DateTime)
const event = await prisma.event.create({
  data: {
    date: utcDate,  // Stored as UTC
    shift: 'NOON',
  },
});

// When querying, convert back to Madrid
const madridTime = utcToZonedTime(event.date, TZ);
console.log(madridTime.toLocaleString('es-ES')); // "15/5/2026 12:45:00"
```

---

## Files to Update

| File                                | Issue                                      | Fix                          |
| ----------------------------------- | ------------------------------------------ | ---------------------------- |
| `components/reservation/BookingCalendar.tsx` | Uses browser TZ                           | Accept Madrid TZ as input    |
| `lib/reservations.ts`               | Timezone comment, no actual usage          | Use in validateServiceDate   |
| `app/api/reservations/normal/route.ts` | Date parsing ambiguous                    | Convert via zonedTimeToUtc  |
| `app/api/admin/import/reservations/route.ts` | Import dates treated as UTC               | Document expected format    |
| `components/admin/ReservasTable.tsx` | Display times in browser TZ (maybe) | Display in Madrid TZ        |

---

## Implementation Plan

**Phase 1**: Document all date fields in schema (which are event times vs. metadata)
**Phase 2**: Add date-fns-tz to package.json (if not already there)
**Phase 3**: Update client-side date picker to work in Madrid TZ
**Phase 4**: Update server-side reservation creation/validation
**Phase 5**: Update admin dashboards to display Madrid TZ
**Phase 6**: Migrate historical data (if any) and test

---

## Testing

```ts
// Test: User in NY books "May 15 noon Madrid time"
// Browser: May 15 @ 6:00 AM EDT
// Server receives: 2026-05-15T10:00:00Z (10 AM UTC = noon Madrid)
// Should create event for May 15 NOON in Madrid ✅

// Test: User in Tokyo books "May 15 noon Madrid time"
// Browser: May 15 @ 9:00 PM JST
// Server receives: 2026-05-15T10:00:00Z (same UTC)
// Should create event for May 15 NOON in Madrid ✅
```

---

## Note on Daylight Saving Time

`date-fns-tz` handles DST automatically:

```ts
// March 31, 2026: Spain → CEST (UTC+2)
zonedTimeToUtc(new Date(2026, 2, 31, 12), 'Europe/Madrid'); // Correctly UTC+2

// October 25, 2026: Spain → CET (UTC+1)
zonedTimeToUtc(new Date(2026, 9, 25, 12), 'Europe/Madrid'); // Correctly UTC+1
```

No manual DST adjustment needed.

---

## References

- [date-fns-tz](https://date-fns.org/docs/Locale)
- [IANA Timezone Database](https://www.iana.org/time-zones)
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) (fallback)
