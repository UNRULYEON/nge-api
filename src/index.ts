import { openapi } from "@elysiajs/openapi";
import { opentelemetry } from "@elysiajs/opentelemetry";
import serverTiming from "@elysiajs/server-timing";
import { staticPlugin } from "@elysiajs/static";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { Elysia } from "elysia";
import { mcp } from "elysia-mcp";
import { rateLimit } from "elysia-rate-limit";
import {
  angels,
  characters,
  episodes,
  evaUnits,
  health,
  movies,
  organizations,
  shows,
  staff,
  studios,
} from "./modules";
import { mcpCapabilities, mcpServerInfo, setupMcpServer } from "./modules/mcp";

const app = new Elysia()
  .use(
    opentelemetry({
      serviceName: "nge-api",
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
            headers: {
              "signoz-ingestion-key": process.env.SIGNOZ_INGESTION_KEY,
            },
          }),
        ),
      ],
    }),
  )
  .headers({
    "X-Powered-By": "your-mom",
  })
  .use(serverTiming())
  .use(
    rateLimit({
      max: 1000,
    }),
  )
  .use(staticPlugin())
  .use(
    openapi({
      documentation: {
        info: {
          title: "NGE API",
          version: "0.0.1",
          description: "An API for the Neon Genesis Evangelion franchise.",
          contact: {
            name: "Amar Kisoensingh",
            email: "amar@kisoensingh.sh",
            url: "https://amar.sh",
          },
        },
        tags: [
          {
            name: "mcp",
            description: `## Model Context Protocol (MCP)

This API exposes an MCP server for AI assistants and LLM tools.

### Endpoint

\`\`\`
https://nge-api.dev/mcp
\`\`\`

Stateless MCP endpoint with JSON responses enabled.
`,
          },
        ],
      },
      path: "/",
      specPath: "/openapi.json",
      scalar: {
        favicon: "public/rei-plush-favicon.svg",
        defaultOpenAllTags: true,
      },
      exclude: {
        paths: ["/", "/public/*", "/mcp", "/mcp/*"],
      },
    }),
  )
  .use(angels)
  .use(characters)
  .use(episodes)
  .use(evaUnits)
  .use(health)
  .use(movies)
  .use(organizations)
  .use(shows)
  .use(staff)
  .use(studios)
  .use(
    mcp({
      serverInfo: mcpServerInfo,
      stateless: true,
      enableJsonResponse: true,
      capabilities: mcpCapabilities,
      setupServer: setupMcpServer,
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
