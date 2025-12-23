import { t } from "elysia";

export namespace MoviesModel {
  export const movie = t.Object({
    id: t.String({ format: "uuid" }),
    title: t.String(),
    titleJapanese: t.String(),
    releaseDate: t.String(),
    runtime: t.Number(),
    synopsis: t.String(),
  });
  export type movie = typeof movie.static;

  export const listResponse = t.Array(movie);
  export type listResponse = typeof listResponse.static;

  export const getResponse = movie;
  export type getResponse = typeof getResponse.static;
}
