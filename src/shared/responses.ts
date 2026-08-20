import { t } from "elysia";

export namespace BaseModel {
  export const ok = t.Literal("OK");
  export type ok = typeof ok.static;

  export const badRequest = t.Object({
    error: t.Literal("BAD_REQUEST"),
  });
  export type badRequest = typeof badRequest.static;

  export const notFound = t.Object({
    error: t.Literal("NOT_FOUND"),
  });
  export type notFound = typeof notFound.static;

  export const internalServerError = t.Object({
    error: t.Literal("INTERNAL_SERVER_ERROR"),
  });
  export type internalServerError = typeof internalServerError.static;
}
