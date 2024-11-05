import { z } from "@hono/zod-openapi";
import { EpisodeSchema } from "./Episode";
import { MovieSchema } from "./Movie";

export const DirectedSchema = z
  .object({
    episodes: EpisodeSchema.array(),
    movies: MovieSchema.array(),
  })
  .openapi("Directed");
