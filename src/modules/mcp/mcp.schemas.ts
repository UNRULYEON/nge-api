import { z } from "zod";

export const studioSchema = z.object({
  id: z.string(),
  name: z.string(),
  founded: z.number(),
  location: z.string(),
  website: z.string().nullable(),
});

export const showSchema = z.object({
  id: z.string(),
  title: z.string(),
  episodes: z.number(),
  aired: z.string(),
  synopsis: z.string(),
  studio_id: z.string().nullable(),
});

export const episodeSchema = z.object({
  id: z.string(),
  episode_number: z.number(),
  title: z.string(),
  title_japanese: z.string(),
  air_date: z.string(),
  synopsis: z.string(),
  show_id: z.string(),
});

export const movieSchema = z.object({
  id: z.string(),
  title: z.string(),
  title_japanese: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  synopsis: z.string(),
  studio_id: z.string(),
});

export const idInput = z.object({
  id: z.string().describe("Resource UUID"),
});
