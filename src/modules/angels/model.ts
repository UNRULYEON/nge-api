import { t } from "elysia";

export namespace AngelsModel {
  export const angel = t.Object({
    id: t.String({ format: "uuid" }),
    name: t.String(),
    nameJapanese: t.String(),
    number: t.Number(),
    description: t.String(),
    images: t.Optional(
      t.Object({
        picture: t.Nullable(t.String()),
      }),
    ),
  });
  export type angel = typeof angel.static;

  export const listResponse = t.Array(angel);
  export type listResponse = typeof listResponse.static;

  export const getResponse = angel;
  export type getResponse = typeof getResponse.static;
}
