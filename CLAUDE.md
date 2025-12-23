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
- **Database**: Drizzle ORM with in-memory SQLite (`bun:sqlite`)
- **Documentation**: Scalar (OpenAPI) at `/` with spec at `/openapi.json`
- **Static files**: Served from `/public` directory

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

- **ORM**: Drizzle with `bun-sqlite` driver
- **Storage**: In-memory SQLite (`:memory:`)
- **Location**: `src/db/`

### Structure

```
src/db/
├── index.ts      # Database connection and export
└── schema.ts     # Table definitions (if needed)
```

### Usage

```typescript
import { db } from "./db";

// Query example
const results = await db.query.tableName.findMany();
```

### Schema Definition

Use `drizzle-orm/sqlite-core` for table definitions:

```typescript
// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const example = sqliteTable("example", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
```

### Notes

- Database is in-memory; data resets on server restart
- Pass schema to drizzle for type-safe queries: `drizzle(sqlite, { schema })`

## TypeScript Configuration

- Strict mode enabled
- Target: ES2021, Module: ES2022
- Bun types included via `bun-types`
