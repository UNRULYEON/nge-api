import { createMcpHandler } from "@modelcontextprotocol/server";
import { Elysia } from "elysia";

import { mcpGuardResponse } from "./mcp.guard";
import { createNgeMcpServer } from "./mcp.server";

export const mcpHandler = createMcpHandler(createNgeMcpServer);

export const mcp = new Elysia({
  prefix: "/mcp",
  tags: ["mcp"],
}).all(
  "/",
  ({ request }) => {
    const rejected = mcpGuardResponse(request);
    if (rejected) return rejected;

    return mcpHandler.fetch(request);
  },
  {
    parse: "none",
    detail: {
      description:
        "Model Context Protocol Streamable HTTP endpoint. Agents POST JSON-RPC messages to list and call tools, read resources, and get prompts for Neon Genesis Evangelion data. See https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http.",
    },
  },
);
