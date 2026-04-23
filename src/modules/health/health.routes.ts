import { Elysia } from "elysia";

import { HealthSchema } from "@/modules/health/health.schema";

export const health = new Elysia({
  prefix: "/health",
  tags: ["health"],
}).get("/", () => "OK", {
  detail: {
    description: "Check the health status of the API.",
  },
  response: {
    200: HealthSchema.response,
  },
});
