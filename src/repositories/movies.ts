import { db } from "@/db";
import type { Movie } from "@/types/entities";

export const movies = {
  getAll(): Movie[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, studio_id as studioId, synopsis FROM movies`
      )
      .all() as Movie[];
  },

  getById(id: string): Movie | null {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, studio_id as studioId, synopsis FROM movies WHERE id = ?`
      )
      .get(id) as Movie | null;
  },
};
