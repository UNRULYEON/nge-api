import { Elysia } from "elysia";
import { HealthModel } from "./model";

export const health = new Elysia({
  prefix: "/health",
  tags: ["health"],
}).get(
  "/",
  () => {
    return "OK";
  },
  {
    detail: {
      description: "Check the health status of the API.",
    },
    response: {
      200: HealthModel.response,
    },
  },
);
