import { z } from "@hono/zod-openapi";

export const EpisodeSchema = z
  .object({
    id: z.string().openapi({
      example: "01J8TXR9AZ891VF828HE22X5BW",
    }),
    number: z.string().openapi({
      example: "1",
    }),
    titleEnglish: z.string().openapi({
      example: "Angel Attack",
    }),
    titleJapanese: z.string().openapi({
      example: "使徒、襲来",
    }),
    titleRomaji: z.string().openapi({
      example: "Shito, shūrai",
    }),
  })
  .openapi("Episode");

export type EpisodeSchema = z.infer<typeof EpisodeSchema>;
