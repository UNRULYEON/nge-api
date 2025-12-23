import { t } from "elysia";

export namespace StudiosModel {
  export const studio = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    founded: t.Number(),
    location: t.String(),
    website: t.Nullable(t.String()),
  });
  export type studio = typeof studio.static;

  export const listResponse = t.Array(studio);
  export type listResponse = typeof listResponse.static;

  export const getResponse = studio;
  export type getResponse = typeof getResponse.static;
}
