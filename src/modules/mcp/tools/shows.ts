import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the show"),
};

export function registerShowTools(server: McpServer) {
  server.registerTool(
    "list-shows",
    {
      title: "List Shows",
      description: "Get all shows from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-shows", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.shows.getAll(), null, 2),
          },
        ],
      }))
  );

  server.registerTool(
    "get-show",
    {
      title: "Get Show",
      description: "Get a specific show by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-show", () => {
        const show = repositories.shows.getById(id);
        if (!show) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Show not found" }) },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(show, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-show-studio",
    {
      title: "Get Show Studio",
      description: "Get the studio that produced a show",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-show-studio", () => {
        const show = repositories.shows.getById(id);
        if (!show) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Show not found" }) },
            ],
            isError: true,
          };
        }
        const studio = repositories.shows.getStudio(id);
        if (!studio) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Studio not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(studio, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-show-characters",
    {
      title: "Get Show Characters",
      description: "Get all characters that appear in a show",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-show-characters", () => {
        const show = repositories.shows.getById(id);
        if (!show) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Show not found" }) },
            ],
            isError: true,
          };
        }
        const characters = repositories.shows.getCharacters(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(characters, null, 2) }],
        };
      })
  );
}
