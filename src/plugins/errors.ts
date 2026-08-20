import { Elysia } from "elysia";

export const errors = new Elysia({ name: "errors" }).onError({ as: "global" }, ({ code, set }) => {
  if (code === "VALIDATION" || code === "PARSE") {
    set.status = 400;
    return { error: "BAD_REQUEST" as const };
  }

  if (code === "INTERNAL_SERVER_ERROR") {
    set.status = 500;
    return { error: "INTERNAL_SERVER_ERROR" as const };
  }
});
