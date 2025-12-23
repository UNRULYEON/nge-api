import { db } from "@/db";
import type { Movie, Show, Studio } from "@/types/entities";

export const studios = {
  getAll(): Studio[] {
    return db.query("SELECT * FROM studios").all() as Studio[];
  },

  getById(id: string): Studio | null {
    return db
      .query("SELECT * FROM studios WHERE id = ?")
      .get(id) as Studio | null;
  },

  getShows(studioId: string): Show[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, synopsis FROM shows WHERE studio_id = ?`
      )
      .all(studioId) as Show[];
  },

  getMovies(studioId: string): Movie[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, synopsis FROM movies WHERE studio_id = ? ORDER BY release_date`
      )
      .all(studioId) as Movie[];
  },
};
