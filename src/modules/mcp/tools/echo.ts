import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";

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
    async ({ text }) => ({
      content: [{ type: "text", text: `Echo: ${text}` }],
    })
  );
}
