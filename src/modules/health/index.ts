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
    response: {
      200: HealthModel.response,
    },
  },
);
