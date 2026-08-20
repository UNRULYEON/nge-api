import { openapi as openapiPlugin } from "@elysiajs/openapi";

export const openapi = openapiPlugin({
  documentation: {
    info: {
      title: "NGE API",
      version: "0.1.0",
      description:
        "Read-only REST API for Neon Genesis Evangelion canon data (studios, shows, episodes, and movies). List endpoints are paginated. Paths without a trailing slash are canonical; trailing slashes are accepted. Agents can also use the Streamable HTTP MCP endpoint at `/v1/mcp`.",
      contact: {
        name: "Amar Kisoensingh",
        email: "amar@kisoensingh.sh",
        url: "https://amar.sh",
      },
    },
    servers: [
      { url: "https://nge-api.dev", description: "Production" },
      { url: "http://localhost:3000", description: "Local development" },
    ],
    tags: [
      { name: "health", description: "Liveness check" },
      { name: "studios", description: "Animation studios" },
      { name: "shows", description: "TV series" },
      { name: "episodes", description: "TV episodes" },
      { name: "movies", description: "Films" },
      { name: "mcp", description: "Model Context Protocol (Streamable HTTP)" },
    ],
  },
  path: "/",
  specPath: "/openapi.json",
  scalar: {
    favicon: "/public/favicon.svg",
    defaultOpenAllTags: false,
  },
  exclude: {
    paths: ["/", "/public/*"],
  },
});
