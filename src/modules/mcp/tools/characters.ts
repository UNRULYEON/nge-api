import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";

const idInputSchema = {
  id: z.string().describe("The UUID of the character"),
};

export function registerCharacterTools(server: McpServer) {
  server.registerTool(
    "list-characters",
    {
      title: "List Characters",
      description:
        "Get all characters from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(repositories.characters.getAll(), null, 2),
        },
      ],
    })
  );

  server.registerTool(
    "get-character",
    {
      title: "Get Character",
      description: "Get a specific character by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const character = repositories.characters.getById(id);
      if (!character) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Character not found" }),
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(character, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-character-shows",
    {
      title: "Get Character Shows",
      description: "Get all shows a character appears in",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const character = repositories.characters.getById(id);
      if (!character) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Character not found" }),
            },
          ],
          isError: true,
        };
      }
      const shows = repositories.characters.getShows(id);
      return {
        content: [{ type: "text", text: JSON.stringify(shows, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-character-movies",
    {
      title: "Get Character Movies",
      description: "Get all movies a character appears in",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const character = repositories.characters.getById(id);
      if (!character) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Character not found" }),
            },
          ],
          isError: true,
        };
      }
      const movies = repositories.characters.getMovies(id);
      return {
        content: [{ type: "text", text: JSON.stringify(movies, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-character-episodes",
    {
      title: "Get Character Episodes",
      description: "Get all episodes a character appears in",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const character = repositories.characters.getById(id);
      if (!character) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Character not found" }),
            },
          ],
          isError: true,
        };
      }
      const episodes = repositories.characters.getEpisodes(id);
      return {
        content: [{ type: "text", text: JSON.stringify(episodes, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get-character-organizations",
    {
      title: "Get Character Organizations",
      description: "Get all organizations a character belongs to",
      inputSchema: idInputSchema,
    },
    async ({ id }) => {
      const character = repositories.characters.getById(id);
      if (!character) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Character not found" }),
            },
          ],
          isError: true,
        };
      }
      const organizations = repositories.characters.getOrganizations(id);
      return {
        content: [
          { type: "text", text: JSON.stringify(organizations, null, 2) },
        ],
      };
    }
  );
}
