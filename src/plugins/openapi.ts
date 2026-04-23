import { openapi as openapiPlugin } from "@elysiajs/openapi";

export const openapi = openapiPlugin({
  documentation: {
    info: {
      title: "NGE API",
      version: "0.0.1",
      description: "An API for Neon Genesis Evangelion.",
      contact: {
        name: "Amar Kisoensingh",
        email: "amar@kisoensingh.sh",
        url: "https://amar.sh",
      },
    },
  },
  path: "/",
  specPath: "/openapi.json",
  scalar: {
    favicon: "public/rei-plush-favicon.svg",
    defaultOpenAllTags: false,
  },
  exclude: {
    paths: ["/", "/v1/public/*"],
  },
});
