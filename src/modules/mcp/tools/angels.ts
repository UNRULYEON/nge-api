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
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(repositories.angels.getAll(), null, 2),
        },
      ],
    })
  );

  server.registerTool(
    "get-angel",
    {
      title: "Get Angel",
      description: "Get a specific Angel by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const angel = repositories.angels.getById(id);
      if (!angel) {
        return {
          content: [
            { type: "text", text: JSON.stringify({ error: "Angel not found" }) },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(angel, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-angel-episodes",
    {
      title: "Get Angel Episodes",
      description: "Get all episodes where a specific Angel appears",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const angel = repositories.angels.getById(id);
      if (!angel) {
        return {
          content: [
            { type: "text", text: JSON.stringify({ error: "Angel not found" }) },
          ],
          isError: true,
        };
      }
      const episodes = repositories.angels.getEpisodes(id);
      return {
        content: [{ type: "text", text: JSON.stringify(episodes, null, 2) }],
      };
    }
  );
}
