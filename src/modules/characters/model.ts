import { t } from "elysia";

export namespace CharactersModel {
  export const character = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    nameJapanese: t.String(),
    age: t.Nullable(t.Number()),
    gender: t.String(),
    occupations: t.Array(t.String()),
    bio: t.String(),
    showIds: t.Array(t.String({ format: "uuid" })),
    movieIds: t.Array(t.String({ format: "uuid" })),
    organizationIds: t.Array(t.String({ format: "uuid" })),
    episodeIds: t.Array(t.String({ format: "uuid" })),
  });
  export type character = typeof character.static;

  export const listResponse = t.Array(character);
  export type listResponse = typeof listResponse.static;

  export const getResponse = character;
  export type getResponse = typeof getResponse.static;
}
