import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerEchoTool } from "./echo";
import { registerAngelTools } from "./angels";
import { registerCharacterTools } from "./characters";
import { registerEpisodeTools } from "./episodes";
import { registerEvaUnitTools } from "./eva-units";
import { registerMovieTools } from "./movies";
import { registerOrganizationTools } from "./organizations";
import { registerShowTools } from "./shows";
import { registerStaffTools } from "./staff";
import { registerStudioTools } from "./studios";

export function registerAllTools(server: McpServer) {
  registerEchoTool(server);
  registerAngelTools(server);
  registerCharacterTools(server);
  registerEpisodeTools(server);
  registerEvaUnitTools(server);
  registerMovieTools(server);
  registerOrganizationTools(server);
  registerShowTools(server);
  registerStaffTools(server);
  registerStudioTools(server);
}
