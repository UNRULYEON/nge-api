import { t } from "elysia";

export namespace EpisodesModel {
  export const episode = t.Object({
    id: t.String({ format: "uuid" }),
    showId: t.String({ format: "uuid" }),
    episodeNumber: t.Number(),
    title: t.String(),
    titleJapanese: t.String(),
    airDate: t.String(),
    synopsis: t.String(),
    characterIds: t.Array(t.String({ format: "uuid" })),
    angelIds: t.Array(t.String({ format: "uuid" })),
  });
  export type episode = typeof episode.static;

  export const listResponse = t.Array(episode);
  export type listResponse = typeof listResponse.static;

  export const getResponse = episode;
  export type getResponse = typeof getResponse.static;
}
