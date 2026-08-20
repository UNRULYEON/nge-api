import { status } from "elysia";

export const notFoundIfNull = <T>(value: T | null | undefined): T => {
  if (value == null) throw status(404, { error: "NOT_FOUND" });
  return value;
};
