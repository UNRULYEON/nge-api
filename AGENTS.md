# AGENTS.md

## Cursor Cloud specific instructions

`nge-api` is a single [Bun](https://bun.sh/) + [Elysia](https://elysiajs.com/) REST API (Neon Genesis Evangelion data) using Drizzle ORM over an **in-memory** SQLite database. The app itself is fully self-contained (no app env vars). Production deploys to Railway; Cloud Agents need the Railway CLI on PATH plus a `RAILWAY_API_TOKEN` secret to inspect or manage those deploys.

Standard commands live in `README.md` and `package.json` `scripts`; use those rather than duplicating them here. Key runtime notes:

- The dev server runs with `bun run dev` and listens on `http://localhost:3000`. Start it as a long-lived process in its own terminal.
- On every startup the app runs `migrate()` then `seed()` against a fresh in-memory DB (see `src/index.ts` and `src/db/client.ts`), so **all data resets on each restart** and there is nothing to persist between runs.
- The OpenAPI/Scalar docs are served at the root path `/` (not `/openapi`); the raw spec is at `/openapi.json`. Health is at `/health`. All data routes are versioned under `/v1` (e.g. `/v1/studios`, `/v1/shows`, `/v1/movies`, `/v1/shows/:id/episodes`, `/v1/studios/:id/movies`). Agents can also use Streamable HTTP MCP at `/v1/mcp` (`src/modules/mcp`). Production healthchecks use `/health` via `railway.json`.
- `bun run typecheck` uses TypeScript 7 (`tsc`); lint is `oxlint` and formatting is `oxfmt` (`bun run format` to check, `bun run format:fix` to apply).
- Tests use `bun test` and preload `src/test/setup.ts`, which runs migrate + seed against the in-memory DB before the suite.

## Railway

Production is Railway project `nge-api`, service `api`, environment `production`.

- Project: `71171aad-7209-40c8-b7c9-2017e1ce09c8`
- Service: `83145cf5-2b34-4055-8352-cf9f19352324`
- Environment: `4a2fdecf-84f6-46a2-a58a-565c6fbf6b09`
- Dashboard: https://railway.com/project/71171aad-7209-40c8-b7c9-2017e1ce09c8/service/83145cf5-2b34-4055-8352-cf9f19352324?environmentId=4a2fdecf-84f6-46a2-a58a-565c6fbf6b09

`.cursor/install.sh` installs the Railway CLI and puts it on PATH so Railway MCP (`railway mcp`) can start. `.cursor/mcp.json` registers that MCP server.

Authenticate with a Cursor Cloud secret named `RAILWAY_API_TOKEN` (create an account token at https://railway.com/account/tokens). Do not commit tokens. When that secret is present, `railway whoami` and Railway MCP work without an interactive login.

Pass the IDs above explicitly to MCP tools (`list_deployments`, `get_logs`, and so on) rather than relying on a linked CLI directory.

Build and start compile a standalone Bun binary (`bun run build` → `./server`). Drizzle SQL is embedded with `--asset src/db/migrations` and resolved from `import.meta.dir` (`src/paths.ts`). The favicon is imported with `with { type: "file" }` so it is bundled into the binary. `Dockerfile` follows the [Elysia production guide](https://elysiajs.com/patterns/deploy) (compile in `oven/bun`, run on distroless). `railpack.json` / `railway.json` start `./server` if Railway uses Railpack instead of the Dockerfile. Listen on `process.env.PORT ?? 3000` at `0.0.0.0`.
