import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";

const idInputSchema = {
  id: z.string().describe("The UUID of the studio"),
};

export function registerStudioTools(server: McpServer) {
  server.registerTool(
    "list-studios",
    {
      title: "List Studios",
      description:
        "Get all studios from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(repositories.studios.getAll(), null, 2),
        },
      ],
    })
  );

  server.registerTool(
    "get-studio",
    {
      title: "Get Studio",
      description: "Get a specific studio by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const studio = repositories.studios.getById(id);
      if (!studio) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Studio not found" }),
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(studio, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-studio-shows",
    {
      title: "Get Studio Shows",
      description: "Get all shows produced by a studio",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const studio = repositories.studios.getById(id);
      if (!studio) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Studio not found" }),
            },
          ],
          isError: true,
        };
      }
      const shows = repositories.studios.getShows(id);
      return {
        content: [{ type: "text", text: JSON.stringify(shows, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-studio-movies",
    {
      title: "Get Studio Movies",
      description: "Get all movies produced by a studio",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const studio = repositories.studios.getById(id);
      if (!studio) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Studio not found" }),
            },
          ],
          isError: true,
        };
      }
      const movies = repositories.studios.getMovies(id);
      return {
        content: [{ type: "text", text: JSON.stringify(movies, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-studio-staff",
    {
      title: "Get Studio Staff",
      description: "Get all staff members who have worked at a studio",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const studio = repositories.studios.getById(id);
      if (!studio) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Studio not found" }),
            },
          ],
          isError: true,
        };
      }
      const staff = repositories.studios.getStaff(id);
      return {
        content: [{ type: "text", text: JSON.stringify(staff, null, 2) }],
      };
    }
  );
}
