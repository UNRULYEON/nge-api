# AGENTS.md

## Cursor Cloud specific instructions

`nge-api` is a single [Bun](https://bun.sh/) + [Elysia](https://elysiajs.com/) REST API (Neon Genesis Evangelion data) using Drizzle ORM over an **in-memory** SQLite database. The app itself is fully self-contained (no app env vars). Production deploys to Railway; Cloud Agents need the Railway CLI on PATH plus a `RAILWAY_API_TOKEN` secret to inspect or manage those deploys.

Standard commands live in `README.md` and `package.json` `scripts`; use those rather than duplicating them here. Key runtime notes:

- The dev server runs with `bun run dev` and listens on `http://localhost:3000`. Start it as a long-lived process in its own terminal.
- On every startup the app runs `migrate()` then `seed()` against a fresh in-memory DB (see `src/index.ts` and `src/db/client.ts`), so **all data resets on each restart** and there is nothing to persist between runs.
- The OpenAPI/Scalar docs are served at the root path `/` (not `/openapi`); the raw spec is at `/openapi.json`. All API routes are versioned under `/v1` (e.g. `/v1/health`, `/v1/studios`, `/v1/shows`, `/v1/movies`, `/v1/shows/:id/episodes`, `/v1/studios/:id/movies`).
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

Build and start are defined in `railpack.json`. Use the default Bun install image and start with `bun run start` (`bun run src/index.ts`) so runtime still has `src/db/migrations` and `public/`. Do not slim the deploy image to a pre-bundled `dist/index.js`: Railpack's install layer does not include `src`, and Drizzle reads migrations from disk.
