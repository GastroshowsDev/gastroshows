# API Documentation Plan

**Status**: Manual (ROUTES.md) | **Goal**: Auto-generated OpenAPI | **Priority**: Low-Medium

---

## Current State

- ✅ Manual documentation in [ROUTES.md](ROUTES.md)
- ❌ No OpenAPI/Swagger spec
- ❌ No interactive API explorer
- ❌ No type-safe client generation

---

## Option 1: OpenAPI 3.0 + Swagger UI (Recommended)

### Setup

```bash
npm install --save-dev swagger-autogen swagger-ui-express
npm install swagger-ui-express
```

### Generation Script

```ts
// scripts/generate-swagger.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'GastroShows API',
    version: '1.0.0',
    description: 'Restaurant reservation and management API',
  },
  host: 'api.gastroshows.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
};

const outputFile = './public/swagger-output.json';
const routes = ['./app/api/**/*.ts'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger generated!');
});
```

### Serve Swagger UI

```ts
// app/api/docs/route.ts
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/public/swagger-output.json';

export const GET = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);

// Visit /api/docs for interactive explorer
```

---

## Option 2: tRPC (Type-Safe, Client Generation)

More complex but generates fully type-safe client.

```bash
npm install @trpc/server @trpc/client
```

**Pros**: Automatic client SDK, type safety end-to-end
**Cons**: Refactor existing REST endpoints

---

## Option 3: TypeSpec (Emerging Standard)

```ts
// api.tsp
import "@typespec/rest";

@service({
  title: "GastroShows API",
})
namespace GastroShowsAPI;

@route("/reservations")
interface Reservations {
  @post
  createNormal(
    @body body: CreateReservationRequest
  ): CreateReservationResponse | ErrorResponse;
}
```

**Pros**: Declarative, generates OpenAPI + clients
**Cons**: Newer tooling, less mature

---

## Recommended Plan

### Phase 1: Document Existing APIs (2-3 hours)
- [ ] Add JSDoc comments to all route handlers
- [ ] Document request/response schemas
- [ ] Document error codes

### Phase 2: Generate OpenAPI (1-2 hours)
- [ ] Install swagger-autogen
- [ ] Generate spec from code
- [ ] Host Swagger UI at `/api/docs`
- [ ] Add to CI/CD (regenerate on each deploy)

### Phase 3: Client Generation (4-6 hours)
- [ ] Generate client SDK from OpenAPI
- [ ] Publish to npm (@gastroshows/api-client)
- [ ] Use in frontend (type-safe calls)

### Phase 4: Validation (Ongoing)
- [ ] Keep spec in sync with code
- [ ] Test clients against API
- [ ] Update changelog per version

---

## JSDoc Example

```ts
/**
 * @swagger
 * /api/reservations/normal:
 *   post:
 *     summary: Create a normal reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReservationRequest'
 *     responses:
 *       201:
 *         description: Reservation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReservationResponse'
 *       400:
 *         description: Invalid request
 *       429:
 *         description: Rate limited
 */
export async function POST(request: NextRequest) {
  // ...
}
```

---

## Client Generation Example

```ts
// Automated from OpenAPI spec
// gastroshows-api-client/src/index.ts

export class GastroShowsClient {
  async createReservation(data: CreateReservationRequest): Promise<CreateReservationResponse> {
    return this.post('/api/v1/reservations/normal', data);
  }

  async getReservation(id: string): Promise<Reservation> {
    return this.get(`/api/v1/reservations/${id}`);
  }

  // ... all endpoints auto-generated with types
}

// Usage in frontend
const client = new GastroShowsClient({ baseURL: 'https://api.gastroshows.com' });
const reservation = await client.createReservation({
  name: 'John',
  email: 'john@example.com',
  // ... type-safe!
});
```

---

## CI/CD Integration

```yaml
# .github/workflows/api-docs.yml
name: Generate API Docs

on:
  push:
    branches: [main]
    paths:
      - 'app/api/**'
      - 'lib/**'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - run: npm ci
      - run: npm run swagger:generate
      - run: npm publish @gastroshows/api-client@latest
      
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          body: |
            ### API Documentation Updated
            View at: https://docs.gastroshows.com
```

---

## Timeline

- **Week 1**: Phase 1 (docs comments)
- **Week 2**: Phase 2 (Swagger setup)
- **Week 3-4**: Phase 3 (client generation)
- **Ongoing**: Phase 4 (maintenance)

---

## Related

- [OpenAPI 3.0 Spec](https://spec.openapis.org/oas/v3.0.3)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [swagger-autogen docs](https://github.com/damienbmd/swagger-autogen)
- [tRPC](https://trpc.io)
- [TypeSpec](https://typespec.io)
