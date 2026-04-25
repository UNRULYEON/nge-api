import { t, type UnwrapSchema } from "elysia";

export namespace Movies {
  export const movieType = t.Object({
    id: t.String(),
    title: t.String(),
    title_japanese: t.String(),
    release_date: t.String(),
    runtime: t.Number(),
    synopsis: t.String(),
    studio_id: t.String(),
  });

  export const list = t.Array(movieType);
  export const movie = t.Nullable(movieType);
}
