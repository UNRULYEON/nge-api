# NGE API

Read-only [Neon Genesis Evangelion](https://en.wikipedia.org/wiki/Neon_Genesis_Evangelion) catalog.

`GET /` is a human OpenAPI UI (Scalar). Do not scrape that HTML. Use MCP or the HTTP API instead.

Base URL: `https://nge-api.dev`

The database is in-memory SQLite. It is migrated and seeded on every process start, so **data resets on restart**.

## MCP (preferred for agents)

Streamable HTTP endpoint: `POST https://nge-api.dev/v1/mcp`

Protocol: [MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http) (stateless fallback for 2025-era clients).

Send JSON-RPC with:

- `Content-Type: application/json`
- `Accept: application/json, text/event-stream`

```json
{ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }
```

Cursor / other Streamable HTTP clients:

```json
{
  "mcpServers": {
    "nge-api": {
      "url": "https://nge-api.dev/v1/mcp"
    }
  }
}
```

Read-only tools: `list-studios`, `get-studio`, `list-studio-shows`, `list-studio-movies`, `list-shows`, `get-show`, `list-show-episodes`, `list-episodes`, `get-episode`, `list-movies`, `get-movie`.

Resources are JSON at `nge://` URIs. Prompts: `explore-studio`, `explore-show`.

## HTTP API

Machine-readable OpenAPI spec: `https://nge-api.dev/openapi.json`

| Method | Path                     | Description           |
| ------ | ------------------------ | --------------------- |
| `GET`  | `/health`                | Liveness check (`OK`) |
| `GET`  | `/v1/studios`            | List studios          |
| `GET`  | `/v1/studios/:id`        | Get a studio          |
| `GET`  | `/v1/studios/:id/shows`  | Shows for a studio    |
| `GET`  | `/v1/studios/:id/movies` | Movies for a studio   |
| `GET`  | `/v1/shows`              | List shows            |
| `GET`  | `/v1/shows/:id`          | Get a show            |
| `GET`  | `/v1/shows/:id/episodes` | Episodes for a show   |
| `GET`  | `/v1/episodes`           | List episodes         |
| `GET`  | `/v1/episodes/:id`       | Get an episode        |
| `GET`  | `/v1/movies`             | List movies           |
| `GET`  | `/v1/movies/:id`         | Get a movie           |

Missing REST resources return `404` with body `NOT_FOUND`.

```bash
curl https://nge-api.dev/v1/shows
curl https://nge-api.dev/v1/shows/019db81f-170d-7000-8a57-fc028caf6046/episodes
```

This file is always at `/llms.txt`. `GET /` also returns it when `Accept` prefers `text/markdown` or the client looks like an agent.
