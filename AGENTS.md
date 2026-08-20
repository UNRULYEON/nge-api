# AGENTS.md

## Cursor Cloud specific instructions

`nge-api` is a single [Bun](https://bun.sh/) + [Elysia](https://elysiajs.com/) REST API (Neon Genesis Evangelion data) using Drizzle ORM over an **in-memory** SQLite database. There is no external database, service, or environment variable to configure — the app is fully self-contained.

Standard commands live in `README.md` and `package.json` `scripts`; use those rather than duplicating them here. Key runtime notes:

- The dev server runs with `bun run dev` and listens on `http://localhost:3000`. Start it as a long-lived process in its own terminal.
- On every startup the app runs `migrate()` then `seed()` against a fresh in-memory DB (see `src/index.ts` and `src/db/client.ts`), so **all data resets on each restart** and there is nothing to persist between runs.
- The OpenAPI/Scalar docs are served at the root path `/` (not `/openapi`); the raw spec is at `/openapi.json`. All API routes are versioned under `/v1` (e.g. `/v1/health`, `/v1/studios`, `/v1/shows`, `/v1/movies`, `/v1/shows/:id/episodes`, `/v1/studios/:id/movies`).
- `bun run typecheck` uses TypeScript 7 (`tsc`); lint is `oxlint` and formatting is `oxfmt` (`bun run format` to check, `bun run format:fix` to apply).
- Tests use `bun test` and preload `src/test/setup.ts`, which runs migrate + seed against the in-memory DB before the suite.
