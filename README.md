# NGE API

A REST API for [Neon Genesis Evangelion](https://en.wikipedia.org/wiki/Neon_Genesis_Evangelion) data.

Interactive docs (Scalar) are at [`/`](http://localhost:3000/). The OpenAPI spec is at [`/openapi.json`](http://localhost:3000/openapi.json). Production lives at [nge-api.dev](https://nge-api.dev).

The app uses an **in-memory SQLite** database. On every startup it runs migrations and seeds canon data, so **all data resets on each restart**.

## Running locally

### Prerequisites

- [Bun](https://bun.sh/) v1.4 or higher

### Installation

```bash
bun install
```

### Development

Start the development server with hot reload:

```bash
bun run dev
```

The API will be available at http://localhost:3000

```bash
curl http://localhost:3000/health
curl http://localhost:3000/v1/shows
curl http://localhost:3000/v1/shows/019db81f-170d-7000-8a57-fc028caf6046/episodes
```

## API

| Method | Path                     | Description           |
| ------ | ------------------------ | --------------------- |
| `GET`  | `/`                      | Scalar OpenAPI docs   |
| `GET`  | `/openapi.json`          | Raw OpenAPI spec      |
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

Missing resources return `404` with body `NOT_FOUND`.

### Available Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `bun run dev`         | Start development server with hot reload |
| `bun run start`       | Start from source (`src/index.ts`)       |
| `bun run start:prod`  | Start the compiled `./server` binary     |
| `bun run build`       | Compile a standalone `./server` binary   |
| `bun run smoke`       | Hit health, studios, favicon, OpenAPI    |
| `bun run db:generate` | Generate SQL migrations                  |
| `bun test`            | Run tests                                |
| `bun test:coverage`   | Run tests with coverage report           |
| `bun run typecheck`   | Type-check the codebase                  |
| `bun run lint`        | Lint with oxlint                         |
| `bun run lint:fix`    | Lint and auto-fix with oxlint            |
| `bun run format`      | Check formatting with oxfmt              |
| `bun run format:fix`  | Format with oxfmt                        |
