import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the Eva unit"),
};

export function registerEvaUnitTools(server: McpServer) {
  server.registerTool(
    "list-eva-units",
    {
      title: "List Eva Units",
      description:
        "Get all Evangelion units from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-eva-units", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.evaUnits.getAll(), null, 2),
          },
        ],
      }))
  );

  server.registerTool(
    "get-eva-unit",
    {
      title: "Get Eva Unit",
      description: "Get a specific Evangelion unit by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-eva-unit", () => {
        const eva = repositories.evaUnits.getById(id);
        if (!eva) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Eva unit not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(eva, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-eva-unit-soul",
    {
      title: "Get Eva Unit Soul",
      description: "Get the soul (character) contained within an Eva unit",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-eva-unit-soul", () => {
        const eva = repositories.evaUnits.getById(id);
        if (!eva) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Eva unit not found" }),
              },
            ],
            isError: true,
          };
        }
        const soul = repositories.evaUnits.getSoul(id);
        if (!soul) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Soul not found for this Eva" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(soul, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-eva-unit-pilots",
    {
      title: "Get Eva Unit Pilots",
      description: "Get all pilots who have piloted an Eva unit",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-eva-unit-pilots", () => {
        const eva = repositories.evaUnits.getById(id);
        if (!eva) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Eva unit not found" }),
              },
            ],
            isError: true,
          };
        }
        const pilots = repositories.evaUnits.getPilots(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(pilots, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-eva-unit-episodes",
    {
      title: "Get Eva Unit Episodes",
      description: "Get all episodes where an Eva unit appears",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-eva-unit-episodes", () => {
        const eva = repositories.evaUnits.getById(id);
        if (!eva) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Eva unit not found" }),
              },
            ],
            isError: true,
          };
        }
        const episodes = repositories.evaUnits.getEpisodes(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(episodes, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-eva-unit-movies",
    {
      title: "Get Eva Unit Movies",
      description: "Get all movies where an Eva unit appears",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-eva-unit-movies", () => {
        const eva = repositories.evaUnits.getById(id);
        if (!eva) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Eva unit not found" }),
              },
            ],
            isError: true,
          };
        }
        const movies = repositories.evaUnits.getMovies(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(movies, null, 2) }],
        };
      })
  );
}
