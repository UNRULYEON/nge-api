import { t } from "elysia";

export namespace HealthModel {
  export const response = t.String({
    default: "OK",
  });
  export type response = typeof response.static;
}
