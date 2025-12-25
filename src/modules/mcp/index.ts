import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "./tools";

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

export async function setupMcpServer(server: McpServer) {
  registerAllTools(server);
}
