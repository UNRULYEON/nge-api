import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the movie"),
};

export function registerMovieTools(server: McpServer) {
  server.registerTool(
    "list-movies",
    {
      title: "List Movies",
      description: "Get all movies from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-movies", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.movies.getAll(), null, 2),
          },
        ],
      }))
  );

  server.registerTool(
    "get-movie",
    {
      title: "Get Movie",
      description: "Get a specific movie by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-movie", () => {
        const movie = repositories.movies.getById(id);
        if (!movie) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Movie not found" }) },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(movie, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-movie-studio",
    {
      title: "Get Movie Studio",
      description: "Get the studio that produced a movie",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-movie-studio", () => {
        const movie = repositories.movies.getById(id);
        if (!movie) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Movie not found" }) },
            ],
            isError: true,
          };
        }
        const studio = repositories.movies.getStudio(id);
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
    "get-movie-characters",
    {
      title: "Get Movie Characters",
      description: "Get all characters that appear in a movie",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-movie-characters", () => {
        const movie = repositories.movies.getById(id);
        if (!movie) {
          return {
            content: [
              { type: "text" as const, text: JSON.stringify({ error: "Movie not found" }) },
            ],
            isError: true,
          };
        }
        const characters = repositories.movies.getCharacters(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(characters, null, 2) }],
        };
      })
  );
}
