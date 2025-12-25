import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type { Movie, Show, Staff, Studio } from "@/types/entities";

export const studios = {
  getAll(): Studio[] {
    return record("db.studios.getAll", () => {
      return db.query("SELECT * FROM studios").all() as Studio[];
    });
  },

  getById(id: string): Studio | null {
    return record("db.studios.getById", () => {
      return db
        .query("SELECT * FROM studios WHERE id = ?")
        .get(id) as Studio | null;
    });
  },

  getShows(studioId: string): Show[] {
    return record("db.studios.getShows", () => {
      return db
        .query(
          `SELECT id, title, title_japanese as titleJapanese, episodes, aired, synopsis FROM shows WHERE studio_id = ?`,
        )
        .all(studioId) as Show[];
    });
  },

  getMovies(studioId: string): Movie[] {
    return record("db.studios.getMovies", () => {
      return db
        .query(
          `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, synopsis FROM movies WHERE studio_id = ? ORDER BY release_date`,
        )
        .all(studioId) as Movie[];
    });
  },

  getStaff(studioId: string): Staff[] {
    return record("db.studios.getStaff", () => {
      return db
        .query(
          `SELECT s.id, s.name, s.name_japanese as nameJapanese, s.role, s.bio
         FROM staff s
         JOIN studio_staff ss ON ss.staff_id = s.id
         WHERE ss.studio_id = ?`,
        )
        .all(studioId) as Staff[];
    });
  },
};
