import { t } from "elysia";

export namespace ShowsModel {
  export const show = t.Object({
    id: t.String({ format: "uuid" }),
    title: t.String(),
    titleJapanese: t.String(),
    episodes: t.Number(),
    aired: t.String(),
    studioId: t.String({ format: "uuid" }),
    synopsis: t.String(),
  });
  export type show = typeof show.static;

  export const listResponse = t.Array(show);
  export type listResponse = typeof listResponse.static;

  export const getResponse = show;
  export type getResponse = typeof getResponse.static;
}
