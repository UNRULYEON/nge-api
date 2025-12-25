import { record } from "@elysiajs/opentelemetry";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";

const idInputSchema = {
  id: z.string().describe("The UUID of the Angel"),
};

export function registerAngelTools(server: McpServer) {
  server.registerTool(
    "list-angels",
    {
      title: "List Angels",
      description: "Get all Angels from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-angels", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.angels.getAll(), null, 2),
          },
        ],
      })),
  );

  server.registerTool(
    "get-angel",
    {
      title: "Get Angel",
      description: "Get a specific Angel by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-angel", () => {
        const angel = repositories.angels.getById(id);
        if (!angel) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Angel not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [
            { type: "text" as const, text: JSON.stringify(angel, null, 2) },
          ],
        };
      }),
  );

  server.registerTool(
    "get-angel-episodes",
    {
      title: "Get Angel Episodes",
      description: "Get all episodes where a specific Angel appears",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-angel-episodes", () => {
        const angel = repositories.angels.getById(id);
        if (!angel) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Angel not found" }),
              },
            ],
            isError: true,
          };
        }
        const episodes = repositories.angels.getEpisodes(id);
        return {
          content: [
            { type: "text" as const, text: JSON.stringify(episodes, null, 2) },
          ],
        };
      }),
  );
}
