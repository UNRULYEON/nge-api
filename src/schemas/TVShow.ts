import { z } from "@hono/zod-openapi";

export const TVShowSchema = z
  .object({
    id: z.string().openapi({
      example: "01JD5VYX4CP94HVVRZ31VH3111",
    }),
    titleEnglish: z.string().openapi({
      example: "Neon Genesis Evangelion",
    }),
    titleJapanese: z.string().openapi({
      example: "新世紀エヴァンゲリオン",
    }),
    titleJapaneseLiteral: z.string().nullable().openapi({
      example: "New Century Evangelion",
    }),
    titleRomaji: z.string().openapi({
      example: "Shinseiki Evangerion",
    }),
    imageUrl: z.string().nullable().openapi({
      example:
        "https://https://nge-api.ams3.cdn.digitaloceanspaces.com/production/tv-show/name.jpg",
    }),
  })
  .openapi("TV Show");

export type TVShowSchema = z.infer<typeof TVShowSchema>;
