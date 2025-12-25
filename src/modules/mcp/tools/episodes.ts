import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the episode"),
};

export function registerEpisodeTools(server: McpServer) {
  server.registerTool(
    "list-episodes",
    {
      title: "List Episodes",
      description:
        "Get all episodes from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-episodes", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.episodes.getAll(), null, 2),
          },
        ],
      }))
  );

  server.registerTool(
    "get-episode",
    {
      title: "Get Episode",
      description: "Get a specific episode by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-episode", () => {
        const episode = repositories.episodes.getById(id);
        if (!episode) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Episode not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(episode, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-episode-show",
    {
      title: "Get Episode Show",
      description: "Get the show that an episode belongs to",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-episode-show", () => {
        const episode = repositories.episodes.getById(id);
        if (!episode) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Episode not found" }),
              },
            ],
            isError: true,
          };
        }
        const show = repositories.episodes.getShow(id);
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
    "get-episode-characters",
    {
      title: "Get Episode Characters",
      description: "Get all characters that appear in an episode",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-episode-characters", () => {
        const episode = repositories.episodes.getById(id);
        if (!episode) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Episode not found" }),
              },
            ],
            isError: true,
          };
        }
        const characters = repositories.episodes.getCharacters(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(characters, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-episode-angels",
    {
      title: "Get Episode Angels",
      description: "Get all Angels that appear in an episode",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-episode-angels", () => {
        const episode = repositories.episodes.getById(id);
        if (!episode) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Episode not found" }),
              },
            ],
            isError: true,
          };
        }
        const angels = repositories.episodes.getAngels(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(angels, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-episode-organizations",
    {
      title: "Get Episode Organizations",
      description: "Get all organizations featured in an episode",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-episode-organizations", () => {
        const episode = repositories.episodes.getById(id);
        if (!episode) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Episode not found" }),
              },
            ],
            isError: true,
          };
        }
        const organizations = repositories.episodes.getOrganizations(id);
        return {
          content: [
            { type: "text" as const, text: JSON.stringify(organizations, null, 2) },
          ],
        };
      })
  );
}
