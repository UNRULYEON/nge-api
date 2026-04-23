import { Elysia } from "elysia";

import { BaseModel } from "@/shared/responses";

export const health = new Elysia({
  prefix: "/health",
  tags: ["health"],
}).get("/", (): BaseModel.ok => "OK", {
  detail: {
    description: "Check the health status of the API.",
  },
  response: {
    200: BaseModel.ok,
  },
});
