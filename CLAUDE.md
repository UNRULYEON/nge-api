# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NGE API is a Bun-based REST API using the Elysia web framework with TypeScript. The API uses Scalar for OpenAPI documentation.

## Development Commands

```bash
# Start development server with hot reload
bun run dev

# Run the application directly
bun run src/index.ts

# Start production server
bun run start

# Install dependencies
bun install

# Run tests
bun test
```

## Architecture

- **Runtime**: Bun (not Node.js)
- **Framework**: Elysia - lightweight, fast web framework for Bun
- **Database**: SQLite in-memory via `bun:sqlite`
- **Documentation**: Scalar (OpenAPI) at `/` with spec at `/openapi.json`
- **Static files**: Served from `/public` directory
- **Path aliases**: `@/*` maps to `src/*`
- **Observability**: OpenTelemetry for distributed tracing

### Entry Point

`src/index.ts` - Creates the Elysia app instance with plugins:
- `opentelemetry()` - Distributed tracing with OpenTelemetry
- `serverTiming()` - Adds Server-Timing headers for performance monitoring
- `rateLimit()` - Rate limiting (1000 requests max)
- `staticPlugin()` - Serves static files from /public
- `openapi()` - Provides Scalar documentation UI at `/`

### Adding Endpoints

Elysia uses method chaining for route definitions:

```typescript
app
  .get("/path", () => response)
  .post("/path", ({ body }) => response)
```

Use `.group()` for route prefixing and `.decorate()` for dependency injection.

## Endpoint Creation Rules

Follow the characters or studios endpoint pattern when creating new endpoints:

### File Structure

Each endpoint module lives in `src/modules/<name>/` with:
- `index.ts` - Route definitions
- `model.ts` - Request/response schemas using Elysia's `t` validator
- `<name>.test.ts` - Unit tests for the module

### Model Pattern

```typescript
// src/modules/<name>/model.ts
import { t } from "elysia";

export namespace <Name>Model {
  // Define entity schema
  export const <name> = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    // ... other fields
  });
  export type <name> = typeof <name>.static;

  // Compose response types
  export const listResponse = t.Array(<name>);
  export type listResponse = typeof listResponse.static;

  export const getResponse = <name>;
  export type getResponse = typeof getResponse.static;
}
```

### Route Pattern

```typescript
// src/modules/<name>/index.ts
import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { <Name>Model } from "./model";
import { BaseModel } from "@/utils/base-model";

export const <name> = new Elysia({
  prefix: "/<name>",
  tags: ["<name>"],
})
  .get(
    "/",
    () => {
      return repositories.<name>.getAll();
    },
    {
      detail: {
        description: "Get all <name>",
      },
      response: {
        200: <Name>Model.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const item = repositories.<name>.getById(params.id);
      if (!item) {
        throw new NotFoundError("NOT_FOUND");
      }
      return item;
    },
    {
      detail: {
        description: "Get a <name> by ID",
      },
      response: {
        200: <Name>Model.getResponse,
        404: BaseModel.notFound,
      },
    },
  );
```

### Relationship Endpoints

For entities with relationships, add sub-resource endpoints:

```typescript
.get(
  "/:id/shows",
  ({ params }) => {
    const item = repositories.<name>.getById(params.id);
    if (!item) {
      throw new NotFoundError("NOT_FOUND");
    }
    return repositories.<name>.getShows(params.id);
  },
  {
    detail: {
      description: "Get shows related to this <name>",
    },
    response: {
      200: ShowsModel.listResponse,
      404: BaseModel.notFound,
    },
  },
)
```

### Registration

1. Export from `src/modules/index.ts`:
   ```typescript
   export { <name> } from "./<name>";
   ```

2. Register in `src/index.ts`:
   ```typescript
   import { <name> } from "./modules";
   // ...
   .use(<name>)
   ```

### Key Conventions

- Use namespaced model exports (e.g., `StudiosModel.listResponse`)
- Always define response schemas for OpenAPI documentation
- Add `detail.description` for OpenAPI endpoint descriptions
- Set `tags` for Scalar UI grouping
- Use `prefix` for route grouping
- Use `BaseModel` for common error responses

## Base Model

Common response types are defined in `src/utils/base-model.ts`:

```typescript
import { BaseModel } from "@/utils/base-model";

// Available types:
BaseModel.ok           // "OK"
BaseModel.badRequest   // "BAD_REQUEST"
BaseModel.notFound     // "NOT_FOUND"
BaseModel.internalServerError  // "INTERNAL_SERVER_ERROR"
```

Use these in route response schemas for consistent error handling.

## Database

SQLite in-memory database initialized on server start. The schema is modularized into separate files per entity.

### Structure

```
src/db/
├── index.ts           # Creates db connection
└── schema/
    ├── index.ts       # Orchestrates all initialization functions
    ├── ids.ts         # Shared UUIDs for cross-file references
    ├── characters.ts  # Character table and seed data
    ├── episodes.ts    # Episode table and seed data
    ├── evas.ts        # Eva unit table and seed data
    ├── movies.ts      # Movie table and seed data
    ├── organizations.ts # Organization table and seed data
    ├── relations.ts   # Junction tables for many-to-many relationships
    ├── shows.ts       # Show table and seed data
    ├── staff.ts       # Staff table and seed data
    └── studios.ts     # Studio table and seed data
```

### Schema Module Pattern

Each schema file exports an initialization function:

```typescript
// src/db/schema/<name>.ts
import type { Database } from "bun:sqlite";
import { <NAME>_IDS } from "./ids";

export function initialize<Name>(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS <table> (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      // ... fields
    )
  `);

  const insert = db.prepare(
    "INSERT INTO <table> (id, name, ...) VALUES (?, ?, ...)"
  );

  const items = [
    { id: <NAME>_IDS.item1, name: "...", ... },
  ];

  for (const item of items) {
    insert.run(item.id, item.name, ...);
  }
}
```

### Centralized IDs

The `src/db/schema/ids.ts` file exports ID constants for all entities:

```typescript
export const STUDIO_IDS = {
  gainax: "019b48ba-...",
  khara: "019b48ba-...",
};

export const CHAR_IDS = {
  shinji: "019b48ba-...",
  rei: "019b48ba-...",
};
```

This enables safe foreign key references across schema files.

### Junction Tables (Relations)

Many-to-many relationships use junction tables defined in `src/db/schema/relations.ts`:

```typescript
db.run(`
  CREATE TABLE IF NOT EXISTS character_shows (
    character_id TEXT NOT NULL,
    show_id TEXT NOT NULL,
    PRIMARY KEY (character_id, show_id),
    FOREIGN KEY (character_id) REFERENCES characters(id),
    FOREIGN KEY (show_id) REFERENCES shows(id)
  )
`);
```

Available junction tables:
- `character_shows` - Characters appearing in shows
- `character_movies` - Characters appearing in movies
- `character_organizations` - Characters belonging to organizations
- `character_episodes` - Characters appearing in episodes
- `organization_episodes` - Organizations featured in episodes

### Adding New Schema

1. Create `src/db/schema/<name>.ts` with `initialize<Name>(db)` function
2. Add IDs to `src/db/schema/ids.ts` if needed for cross-references
3. Import and call in `src/db/schema/index.ts` (respect dependency order)
4. Add junction tables to `relations.ts` if relationships exist

## Entity Types

Entity interfaces live in `src/types/entities.ts`:

```typescript
// src/types/entities.ts
export interface <Name> {
  id: string;
  // ... fields
}
```

Re-export from `src/types/index.ts`:

```typescript
export type { <Name> } from "./entities";
```

## Repository Layer

Database operations are abstracted through repositories in `src/repositories/`. Modules should never access the database directly.

### Repository Pattern

```typescript
// src/repositories/<name>.ts
import { db } from "@/db";
import { record } from "@/utils/otel";
import type { <Name> } from "@/types/entities";

export const <name> = {
  getAll(): <Name>[] {
    return record("<name>.getAll", () => {
      return db.query("SELECT * FROM <table>").all() as <Name>[];
    });
  },

  getById(id: string): <Name> | null {
    return record("<name>.getById", () => {
      return db.query("SELECT * FROM <table> WHERE id = ?").get(id) as <Name> | null;
    });
  },
};
```

### Relationship Queries

For entities with relationships, add methods to query related data:

```typescript
getShows(id: string): Show[] {
  return record("<name>.getShows", () => {
    return db.query(`
      SELECT s.* FROM shows s
      JOIN <name>_shows ns ON s.id = ns.show_id
      WHERE ns.<name>_id = ?
    `).all(id) as Show[];
  });
},
```

### JSON Field Parsing

For entities with JSON fields stored as strings:

```typescript
interface <Name>Row {
  occupations: string;  // JSON string in DB
}

function parse<Name>(row: <Name>Row): <Name> {
  return {
    ...row,
    occupations: JSON.parse(row.occupations),
  };
}
```

### Registration

Add to `src/repositories/index.ts`:

```typescript
import { <name> } from "./<name>";

export const repositories = {
  // ... existing repositories
  <name>,
};
```

### Usage in Modules

```typescript
import { repositories } from "@/repositories";

// In route handler
const items = repositories.<name>.getAll();
const item = repositories.<name>.getById(id);
const shows = repositories.<name>.getShows(id);
```

## OpenTelemetry

The API uses OpenTelemetry for distributed tracing.

### Configuration

Environment variables:
- `OTEL_EXPORTER_OTLP_ENDPOINT` - OTLP endpoint URL
- `SIGNOZ_INGESTION_KEY` - SigNoz ingestion key (optional)

### Tracing Database Operations

Use the `record` utility to wrap database operations:

```typescript
import { record } from "@/utils/otel";

const result = record("operation.name", () => {
  return db.query("SELECT * FROM table").all();
});
```

This creates spans for each operation, enabling performance analysis.

## UUID Generation

When adding seed data or generating IDs, always use UUIDv7 via the utility script:

```bash
# Generate a single UUID
bun run src/utils/generate-uuid.ts

# Generate multiple UUIDs
bun run src/utils/generate-uuid.ts 5
```

All entity IDs use UUIDv7 format (e.g., `019b48ba-31f2-7000-85c6-4417181f7f88`).

## TypeScript Configuration

- Strict mode enabled
- Target: ES2021, Module: ES2022
- Bun types included via `bun-types`

## Deployment

The project uses Railpack for deployment configuration. The `railpack.json` file defines:

- **Bundle step**: Builds the app with `bun build` to `dist/`
- **Deploy step**: Runs the bundled app with `bun run dist/index.js`

```bash
# Build for production
bun build src/index.ts --outdir=dist --target=bun
```

## Testing

Tests use Bun's built-in test runner with a Jest-like API. Test files are co-located with their modules.

### Test Pattern

```typescript
// src/modules/<name>/<name>.test.ts
import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { <name> } from ".";

const app = new Elysia().use(<name>);

describe("<Name>", () => {
  describe("GET /<name>", () => {
    it("returns a list of all items", async () => {
      const response = await app.handle(
        new Request("http://localhost/<name>")
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe("GET /<name>/:id", () => {
    it("returns an item by ID", async () => {
      const response = await app.handle(
        new Request("http://localhost/<name>/<valid-id>")
      );

      expect(response.status).toBe(200);
    });

    it("returns 404 for non-existent item", async () => {
      const response = await app.handle(
        new Request("http://localhost/<name>/<invalid-id>")
      );

      expect(response.status).toBe(404);
    });
  });
});
```

### Key Testing Conventions

- Use Elysia's `handle()` method to simulate HTTP requests
- Requests require fully qualified URLs (e.g., `http://localhost/path`)
- Create a minimal app instance with only the module under test
- Test both success and error cases (200, 404, etc.)
- Verify response structure matches expected schema
