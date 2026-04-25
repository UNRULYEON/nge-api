import { t, type UnwrapSchema } from "elysia";

export namespace Episodes {
  export const episodeType = t.Object({
    id: t.String(),
    episode_number: t.Number(),
    title: t.String(),
    title_japanese: t.String(),
    air_date: t.String(),
    synopsis: t.String(),
    show_id: t.String(),
  });

  export const list = t.Array(episodeType);
  export const episode = t.Nullable(episodeType);
}
