import { z } from "@hono/zod-openapi";

export const CharacterSchema = z
  .object({
    id: z.string().openapi({
      example: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    }),
    name: z.string().openapi({
      example: "Shinji Ikari",
    }),
    imageUrl: z.string().nullable().openapi({
      example:
        "https://https://nge-api.ams3.cdn.digitaloceanspaces.com/production/characters/first-name-last-name.jpg",
    }),
  })
  .openapi("Character");
