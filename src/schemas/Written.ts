import { z } from "@hono/zod-openapi";
import { EpisodeSchema } from "./Episode";
import { MovieSchema } from "./Movie";

export const WrittenSchema = z
  .object({
    episodes: EpisodeSchema.array(),
    movies: MovieSchema.array(),
  })
  .openapi("Written");

export type WrittenSchema = z.infer<typeof WrittenSchema>;
