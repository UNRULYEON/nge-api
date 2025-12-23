# NGE API

A REST API for Neon Genesis Evangelion data.

## API Documentation

Interactive API documentation is available at the root URL. The OpenAPI spec can be found at `/openapi.json`.

**Live API**: https://nge-api.dev

## Available Resources

- **Characters** - Pilots, NERV personnel, and other characters
- **Episodes** - All 26 episodes of the original series
- **Movies** - Death & Rebirth, End of Evangelion, and the Rebuild films
- **Eva Units** - Evangelion units and their specifications
- **Angels** - The 17 Angels
- **Organizations** - NERV, SEELE, WILLE, and others
- **Staff** - Directors, writers, and key production staff
- **Studios** - Gainax, Khara, and production studios
- **Shows** - TV series and other productions

## Running Locally

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher

### Installation

```bash
git clone <repository-url>
cd nge-api
bun install
```

### Development

Start the development server with hot reload:

```bash
bun run dev
```

The API will be available at http://localhost:3000

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run start` | Start production server |
| `bun test` | Run tests |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry OTLP endpoint URL |
| `SIGNOZ_INGESTION_KEY` | SigNoz ingestion key for tracing |

## Tech Stack

- [Bun](https://bun.sh/) - Runtime
- [Elysia](https://elysiajs.com/) - Web framework
- [Scalar](https://scalar.com/) - API documentation
- SQLite - In-memory database
- OpenTelemetry - Distributed tracing

## License

[MIT](./LICENSE)
