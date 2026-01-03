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

# Type check the codebase
bunx tsc --noEmit
```

## Required Checks

Always run these checks after making any code changes:

```bash
# Format and lint (auto-fixes issues)
bunx biome check --write

# Type check
bunx tsc --noEmit

# Build
bun build src/index.ts --outdir=dist --target=bun
```

Fix any formatting, linting, type errors, or build failures before considering the task complete.

## Observability Requirements

All code must be instrumented with OpenTelemetry for distributed tracing. Every significant operation should create a span for observability.

### Wrapping Operations

Use the `record` function from `@elysiajs/opentelemetry` to wrap any operation that should be traced:

```typescript
import { record } from "@elysiajs/opentelemetry";

// Database operations
const result = record("db.users.getById", () => {
  return db.query("SELECT * FROM users WHERE id = ?").get(id);
});

// MCP tool handlers
async () => record("mcp.tool.list-items", () => ({
  content: [{ type: "text" as const, text: JSON.stringify(data) }],
}))

// Business logic
const processed = record("service.processOrder", () => {
  return orderService.process(order);
});
```

### Naming Conventions

Use dot-notation for span names that indicates the layer and operation:

- `db.<entity>.<operation>` - Database operations (e.g., `db.characters.getAll`)
- `mcp.tool.<tool-name>` - MCP tool handlers (e.g., `mcp.tool.list-studios`)
- `service.<name>.<operation>` - Business logic (e.g., `service.auth.validate`)
- `http.<method>.<path>` - HTTP operations (e.g., `http.get.users`)

### What to Instrument

Always add tracing to:

- Database queries and mutations
- MCP tool handlers
- External API calls
- Complex business logic
- File system operations
- Cache operations
- Authentication/authorization checks

### Benefits

Proper instrumentation enables:

- Performance analysis and bottleneck identification
- Request flow visualization across services
- Error tracking and debugging
- SLA monitoring and alerting

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

## Entity Assets

Images and other assets for entities are stored in the repository and copied to a CDN volume at runtime.

### Structure

```
src/db/schema/assets/
└── characters/          # Character headshots
    └── <uuid>.jpeg      # Image file with UUIDv7 filename
```

### Adding an Image Asset

1. **Generate a UUIDv7 filename**:
   ```bash
   bun run src/utils/generate-uuid.ts
   # Output: 019b84d3-66a9-7000-98af-254d79aaf56e
   ```

2. **Save the image** with the UUID filename:
   ```
   src/db/schema/assets/characters/019b84d3-66a9-7000-98af-254d79aaf56e.jpeg
   ```

3. **Register the filename** in `src/db/schema/ids.ts`:
   ```typescript
   export const CHAR_HEADSHOTS = {
     shinji: "019b84d3-66a9-7000-98af-254d79aaf56e.jpeg",
     // Add new entries here
   };
   ```

4. **Link to entity** in the schema file (e.g., `characters.ts`):
   ```typescript
   const headshotMap: Record<string, string> = {
     [CHAR_IDS.shinji]: CHAR_HEADSHOTS.shinji,
     // Add new mappings here
   };
   ```

### CDN Volume

At runtime, assets are copied from the repo to a Docker volume mount:

- **Mount path**: `nge-cdn-files/data/`
- **Copy behavior**: Files are only copied if they don't already exist in the destination
- **Filename preservation**: The UUIDv7 filename is preserved (no renaming)

The copy logic lives in the entity's schema file (e.g., `characters.ts`):

```typescript
function copyHeadshotsToCdn(): void {
  const cdnDataPath = join(CDN_MOUNT_PATH, CDN_DATA_FOLDER);

  for (const filename of Object.values(CHAR_HEADSHOTS)) {
    const destPath = join(cdnDataPath, filename);
    if (existsSync(destPath)) continue;  // Skip if exists

    const sourcePath = join(ASSETS_PATH, filename);
    Bun.write(destPath, Bun.file(sourcePath));
  }
}
```

### API Response

Images are grouped in an `images` object in API responses:

```json
{
  "name": "Shinji Ikari",
  "images": {
    "headshot": "019b84d3-66a9-7000-98af-254d79aaf56e.jpeg"
  }
}
```

The CDN service serves these files, so clients construct the full URL using the CDN base URL + filename.

### Database Column Naming

Image columns use the `_image` suffix (e.g., `headshot_image`) to distinguish them from other fields.

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

## MCP Tools

The API exposes an MCP (Model Context Protocol) server via the `elysia-mcp` plugin. Tools are organized in `src/modules/mcp/tools/`.

### Structure

```
src/modules/mcp/
├── index.ts           # MCP server setup and configuration
└── tools/
    ├── index.ts       # Registers all tools with the server
    ├── echo.ts        # Simple echo tool
    ├── angels.ts      # Angel-related tools
    ├── characters.ts  # Character-related tools
    ├── episodes.ts    # Episode-related tools
    ├── eva-units.ts   # Eva unit-related tools
    ├── movies.ts      # Movie-related tools
    ├── organizations.ts # Organization-related tools
    ├── shows.ts       # Show-related tools
    ├── staff.ts       # Staff-related tools
    └── studios.ts     # Studio-related tools
```

### Adding a New Tool

1. Create a new file in `src/modules/mcp/tools/<name>.ts`:

```typescript
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the <entity>"),
};

export function register<Name>Tools(server: McpServer) {
  // List all items
  server.registerTool(
    "list-<name>",
    {
      title: "List <Name>",
      description: "Get all <name> from the database",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-<name>", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.<name>.getAll(), null, 2),
          },
        ],
      }))
  );

  // Get single item by ID
  server.registerTool(
    "get-<name>",
    {
      title: "Get <Name>",
      description: "Get a specific <name> by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-<name>", () => {
        const item = repositories.<name>.getById(id);
        if (!item) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "<Name> not found" }) },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(item, null, 2) }],
        };
      })
  );
}
```

2. Register in `src/modules/mcp/tools/index.ts`:

```typescript
import { register<Name>Tools } from "./<name>";

export function registerAllTools(server: McpServer) {
  // ... existing registrations
  register<Name>Tools(server);
}
```

### Key Conventions

- **OpenTelemetry tracing**: Always wrap handlers with `record("mcp.tool.<tool-name>", () => ...)` for observability
- **Type assertion**: Use `type: "text" as const` to preserve literal types (required by MCP SDK)
- **Input schema**: Use Zod v3 (`zod/v3`) for input validation with `.describe()` for documentation
- **Error handling**: Return `{ isError: true }` with error message in content for failures
- **Naming**: Tool names use kebab-case (e.g., `list-characters`, `get-character-shows`)
- **JSON output**: Always use `JSON.stringify(data, null, 2)` for readable output

### Adding Relationship Tools

For tools that fetch related entities:

```typescript
server.registerTool(
  "get-<name>-<related>",
  {
    title: "Get <Name> <Related>",
    description: "Get all <related> for a <name>",
    inputSchema: idInputSchema,
  },
  async ({ id }) =>
    record("mcp.tool.get-<name>-<related>", () => {
      const item = repositories.<name>.getById(id);
      if (!item) {
        return {
          content: [
            { type: "text" as const, text: JSON.stringify({ error: "<Name> not found" }) },
          ],
          isError: true,
        };
      }
      const related = repositories.<name>.get<Related>(id);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(related, null, 2) }],
      };
    })
);
```

### Updating a Tool

1. Locate the tool in `src/modules/mcp/tools/<entity>.ts`
2. Modify the tool's `title`, `description`, `inputSchema`, or handler logic
3. Ensure the `record()` span name matches the tool name
4. Run type check: `bunx tsc --noEmit`
5. Run build: `bun build src/index.ts --outdir=dist --target=bun`

### Removing a Tool

1. Remove the `server.registerTool()` call from the tool file
2. If removing an entire tool file:
   - Delete `src/modules/mcp/tools/<name>.ts`
   - Remove the import and registration from `src/modules/mcp/tools/index.ts`
3. Run type check and build to verify no broken references

### MCP Server Configuration

The MCP server is configured in `src/modules/mcp/index.ts`:

```typescript
export const mcpServerInfo = {
  name: "nge-api",
  version: "0.0.1",
};

export const mcpCapabilities = {
  tools: {},
  resources: {},
  prompts: {},
  logging: {},
};
```

And registered in `src/index.ts`:

```typescript
.use(
  mcp({
    serverInfo: mcpServerInfo,
    stateless: true,
    enableJsonResponse: true,
    capabilities: mcpCapabilities,
    setupServer: setupMcpServer,
  }),
)
