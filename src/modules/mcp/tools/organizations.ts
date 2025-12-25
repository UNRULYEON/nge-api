import { record } from "@elysiajs/opentelemetry";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";

const idInputSchema = {
  id: z.string().describe("The UUID of the organization"),
};

export function registerOrganizationTools(server: McpServer) {
  server.registerTool(
    "list-organizations",
    {
      title: "List Organizations",
      description:
        "Get all organizations from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-organizations", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.organizations.getAll(), null, 2),
          },
        ],
      })),
  );

  server.registerTool(
    "get-organization",
    {
      title: "Get Organization",
      description: "Get a specific organization by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-organization", () => {
        const organization = repositories.organizations.getById(id);
        if (!organization) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Organization not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(organization, null, 2),
            },
          ],
        };
      }),
  );

  server.registerTool(
    "get-organization-characters",
    {
      title: "Get Organization Characters",
      description: "Get all characters that belong to an organization",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-organization-characters", () => {
        const organization = repositories.organizations.getById(id);
        if (!organization) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Organization not found" }),
              },
            ],
            isError: true,
          };
        }
        const characters = repositories.organizations.getCharacters(id);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(characters, null, 2),
            },
          ],
        };
      }),
  );

  server.registerTool(
    "get-organization-episodes",
    {
      title: "Get Organization Episodes",
      description: "Get all episodes where an organization is featured",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-organization-episodes", () => {
        const organization = repositories.organizations.getById(id);
        if (!organization) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Organization not found" }),
              },
            ],
            isError: true,
          };
        }
        const episodes = repositories.organizations.getEpisodes(id);
        return {
          content: [
            { type: "text" as const, text: JSON.stringify(episodes, null, 2) },
          ],
        };
      }),
  );
}
