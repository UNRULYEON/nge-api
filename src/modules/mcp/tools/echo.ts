import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { record } from "@elysiajs/opentelemetry";

export function registerEchoTool(server: McpServer) {
  server.registerTool(
    "echo",
    {
      title: "Echo",
      description: "Echoes back the provided text",
      inputSchema: {
        text: z.string().describe("The text to echo back"),
      },
    },
    async ({ text }) =>
      record("mcp.tool.echo", () => ({
        content: [{ type: "text" as const, text: `Echo: ${text}` }],
      }))
  );
}
