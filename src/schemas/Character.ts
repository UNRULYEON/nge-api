import { z } from "@hono/zod-openapi";

export const CharacterSchema = z
  .object({
    id: z.string().openapi({
      example: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    }),
    name: z.string().openapi({
      example: "Shinji Ikari",
    }),
  })
  .openapi("Character");

export type CharacterSchema = z.infer<typeof CharacterSchema>;
