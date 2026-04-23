import { t, type UnwrapSchema } from "elysia";

export namespace ShowsModel {
  export const show = t.Object({
    id: t.String({ format: "uuid" }),
    title: t.String(),
    episodes: t.Number(),
    aired: t.String(),
    synopsis: t.String(),
  });

  export const list = t.Array(show);
}

export type ShowsModel = {
  [k in keyof typeof ShowsModel]: UnwrapSchema<(typeof ShowsModel)[k]>;
};
