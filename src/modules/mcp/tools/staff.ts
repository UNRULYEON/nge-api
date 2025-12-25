import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { repositories } from "@/repositories";
import { record } from "@elysiajs/opentelemetry";

const idInputSchema = {
  id: z.string().describe("The UUID of the staff member"),
};

export function registerStaffTools(server: McpServer) {
  server.registerTool(
    "list-staff",
    {
      title: "List Staff",
      description:
        "Get all staff members from the Neon Genesis Evangelion franchise",
      inputSchema: {},
    },
    async () =>
      record("mcp.tool.list-staff", () => ({
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repositories.staff.getAll(), null, 2),
          },
        ],
      }))
  );

  server.registerTool(
    "get-staff",
    {
      title: "Get Staff",
      description: "Get a specific staff member by ID",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-staff", () => {
        const staffMember = repositories.staff.getById(id);
        if (!staffMember) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Staff member not found" }),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(staffMember, null, 2) }],
        };
      })
  );

  server.registerTool(
    "get-staff-studios",
    {
      title: "Get Staff Studios",
      description: "Get all studios a staff member has worked at",
      inputSchema: idInputSchema,
    },
    async ({ id }) =>
      record("mcp.tool.get-staff-studios", () => {
        const staffMember = repositories.staff.getById(id);
        if (!staffMember) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Staff member not found" }),
              },
            ],
            isError: true,
          };
        }
        const studios = repositories.staff.getStudios(id);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(studios, null, 2) }],
        };
      })
  );
}
