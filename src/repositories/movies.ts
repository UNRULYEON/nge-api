import { db } from "@/db";
import type { Character, Movie, Studio } from "@/types/entities";

interface CharacterRow {
  id: string;
  name: string;
  nameJapanese: string;
  age: number | null;
  gender: string;
  occupations: string;
  bio: string;
}

function parseCharacter(row: CharacterRow): Character {
  return {
    ...row,
    occupations: JSON.parse(row.occupations),
  };
}

export const movies = {
  getAll(): Movie[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, synopsis FROM movies ORDER BY release_date`
      )
      .all() as Movie[];
  },

  getById(id: string): Movie | null {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, synopsis FROM movies WHERE id = ?`
      )
      .get(id) as Movie | null;
  },

  getByStudioId(studioId: string): Movie[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, release_date as releaseDate, runtime, synopsis FROM movies WHERE studio_id = ? ORDER BY release_date`
      )
      .all(studioId) as Movie[];
  },

  getStudio(movieId: string): Studio | null {
    return db
      .query(
        `SELECT s.* FROM studios s JOIN movies m ON m.studio_id = s.id WHERE m.id = ?`
      )
      .get(movieId) as Studio | null;
  },

  getCharacters(movieId: string): Character[] {
    const rows = db
      .query(
        `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN character_movies cm ON cm.character_id = c.id
         WHERE cm.movie_id = ?`
      )
      .all(movieId) as CharacterRow[];
    return rows.map(parseCharacter);
  },
};
