# API Versioning Strategy

**Status**: Planned | **Implementation**: Phase 5+ | **Retroactive**: No

---

## Current State

- All endpoints at `/api/*` (implied v1)
- No explicit version prefix
- Schema changes could break clients

## Proposed Strategy

### Option 1: URL Path Versioning (Recommended)
```
/api/v1/reservations/normal  ← Current endpoints moved here
/api/v2/reservations/normal  ← Future breaking changes
```

**Pros**: Clear, simple, cacheable, easy to feature-gate per version
**Cons**: URL duplication, requires client updates

### Option 2: Header Versioning
```
GET /api/reservations/normal
Accept-Version: 1.0  ← Client specifies version

# Response
Deprecation: true
Sunset: 2026-12-31
```

**Pros**: Single URL, semantic versioning, graceful deprecation
**Cons**: Harder to debug (need to check headers), less visible

### Option 3: Query Parameter
```
/api/reservations/normal?version=2
```

**Pros**: Works with simple clients (curl, browsers)
**Cons**: Caching issues, ugly URLs

---

## Recommendation: Path + Headers Hybrid

1. **Default**: `/api/v1/*` (current endpoints)
2. **New features**: Additive (backward compat in v1)
3. **Breaking changes**: Announce 6 months before → `/api/v2/*`
4. **Deprecation headers**: Add `Deprecation` + `Sunset` headers

### Example Timeline

**2026-05-06**: v1 live (current)
**2026-11-06**: v2 beta announced
**2027-05-06**: v2 GA, v1 deprecated (Sunset header added)
**2027-11-06**: v1 sunset, v2 primary

---

## Migration Checklist

- [ ] Create `/api/v1/` directory, copy current endpoints
- [ ] Update middleware to route based on version prefix
- [ ] Add version field to API response envelopes
- [ ] Document v1 API (frozen)
- [ ] Create deprecation headers helper
- [ ] Test client compatibility

---

## Backward Compatibility within v1

For non-breaking additions:

```ts
// ✅ OK: Add new optional field
GET /api/v1/reservations/123
{
  "ok": true,
  "data": {
    "id": "...",
    "customerId": "...",
    "newField": null  // Added in v1.2, null if not applicable
  },
  "version": "1.2"  // Added in response envelope
}

// ❌ NOT OK: Remove field
// ❌ NOT OK: Change field type (string -> number)
// ❌ NOT OK: Remove enum value
```

---

## Documentation Plan

- [ ] OpenAPI/Swagger spec for v1 (auto-generated)
- [ ] Interactive API explorer (Swagger UI)
- [ ] Changelog per version
- [ ] Migration guide: v1 → v2

---

## Related

- See SECURITY_ANALYSIS.md #14 for context
- Future: Consider GraphQL subset for more flexible versioning
