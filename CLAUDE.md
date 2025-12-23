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

# Install dependencies
bun install
```

## Architecture

- **Runtime**: Bun (not Node.js)
- **Framework**: Elysia - lightweight, fast web framework for Bun
- **Database**: SQLite in-memory via `bun:sqlite`
- **Documentation**: Scalar (OpenAPI) at `/` with spec at `/openapi.json`
- **Static files**: Served from `/public` directory
- **Path aliases**: `@/*` maps to `src/*`

### Entry Point

`src/index.ts` - Creates the Elysia app instance with plugins:
- `staticPlugin()` - Serves static files from /public
- `openapi()` - Provides Scalar documentation UI

### Adding Endpoints

Elysia uses method chaining for route definitions:

```typescript
app
  .get("/path", () => response)
  .post("/path", ({ body }) => response)
```

Use `.group()` for route prefixing and `.decorate()` for dependency injection.

## Endpoint Creation Rules

Follow the health endpoint pattern when creating new endpoints:

### File Structure

Each endpoint module lives in `src/modules/<name>/` with:
- `index.ts` - Route definitions
- `model.ts` - Request/response schemas using Elysia's `t` validator

### Model Pattern

```typescript
// src/modules/<name>/model.ts
import { t } from "elysia";

export namespace <Name>Model {
  export const response = t.Object({
    // schema definition
  });
  export type response = typeof response.static;
}
```

### Route Pattern

```typescript
// src/modules/<name>/index.ts
import { Elysia } from "elysia";
import { <Name>Model } from "./model";

export const <name> = new Elysia({
  prefix: "/<name>",
  tags: ["<name>"],
}).get(
  "/",
  () => {
    return { /* response */ };
  },
  {
    response: {
      200: <Name>Model.response,
    },
  },
);
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

- Use namespaced model exports (e.g., `HealthModel.response`)
- Always define response schemas for OpenAPI documentation
- Set `tags` for Scalar UI grouping
- Use `prefix` for route grouping

## Database

SQLite in-memory database initialized on server start. Schema and seed data live in `src/db/schema.ts`.

### Structure

```
src/db/
├── index.ts      # Creates db connection, calls initializeDatabase()
└── schema.ts     # Table definitions and seed data
```

### Adding Tables and Seed Data

```typescript
// In src/db/schema.ts initializeDatabase()
db.run(`
  CREATE TABLE IF NOT EXISTS <table> (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    // ... fields
  )
`);

const insert<Name> = db.prepare(
  "INSERT INTO <table> (id, name, ...) VALUES (?, ?, ...)"
);

const <items> = [
  { id: "<uuid>", name: "...", ... },
];

for (const item of <items>) {
  insert<Name>.run(item.id, item.name, ...);
}
```

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
import type { <Name> } from "@/types/entities";

export const <name> = {
  getAll(): <Name>[] {
    return db.query("SELECT * FROM <table>").all() as <Name>[];
  },

  getById(id: string): <Name> | null {
    return db.query("SELECT * FROM <table> WHERE id = ?").get(id) as <Name> | null;
  },
};
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
```

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
