import { z } from "@hono/zod-openapi";

export const MediaCharacter = z
  .object({
    id: z.string().openapi({
      example: "01JD0TKRVZ6AP851FE3WD2F83J",
    }),
    movieId: z.string().nullable().openapi({
      example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    }),
    episodeId: z.string().nullable().openapi({
      example: "01J8TXR9AZ891VF828HE22X5BW",
    }),
    characterId: z.string().openapi({
      example: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    }),
    media: z.enum(["MOVIE", "EPISODE"]).openapi({
      example: "MOVIE",
    }),
    characterName: z.string().openapi({
      example: "Shinji Ikari",
    }),
    imageUrl: z.string().nullable().openapi({
      example: "https://cdn.nge-api.dev/production/media-characters/ulid.jpg",
    }),
  })
  .openapi("Character");

export type MediaCharacter = z.infer<typeof MediaCharacter>;
