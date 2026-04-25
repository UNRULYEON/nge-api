import { t, type UnwrapSchema } from "elysia";

export namespace Shows {
  export const showType = t.Object({
    id: t.String(),
    title: t.String(),
    episodes: t.Number(),
    aired: t.String(),
    synopsis: t.String(),
    studio_id: t.Nullable(t.String()),
  });

  export const list = t.Array(showType);
  export const show = t.Nullable(showType);
}
