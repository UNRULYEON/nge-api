import { db } from "@/db";
import type { Character, Episode, Eva, Movie } from "@/types/entities";

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

export const evaUnits = {
  getAll(): Eva[] {
    return db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, designation, type, description FROM evas ORDER BY designation`
      )
      .all() as Eva[];
  },

  getById(id: string): Eva | null {
    return db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, designation, type, description FROM evas WHERE id = ?`
      )
      .get(id) as Eva | null;
  },

  getSoul(evaId: string): Character | null {
    const row = db
      .query(
        `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN evas e ON e.soul_id = c.id
         WHERE e.id = ?`
      )
      .get(evaId) as CharacterRow | null;
    return row ? parseCharacter(row) : null;
  },

  getPilots(evaId: string): Character[] {
    const rows = db
      .query(
        `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN eva_pilots ep ON ep.character_id = c.id
         WHERE ep.eva_id = ?`
      )
      .all(evaId) as CharacterRow[];
    return rows.map(parseCharacter);
  },

  getEpisodes(evaId: string): Episode[] {
    return db
      .query(
        `SELECT e.id, e.episode_number as episodeNumber, e.title, e.title_japanese as titleJapanese, e.air_date as airDate, e.synopsis
         FROM episodes e
         JOIN eva_episodes ee ON ee.episode_id = e.id
         WHERE ee.eva_id = ?
         ORDER BY e.episode_number`
      )
      .all(evaId) as Episode[];
  },

  getMovies(evaId: string): Movie[] {
    return db
      .query(
        `SELECT m.id, m.title, m.title_japanese as titleJapanese, m.release_date as releaseDate, m.runtime, m.synopsis
         FROM movies m
         JOIN eva_movies em ON em.movie_id = m.id
         WHERE em.eva_id = ?
         ORDER BY m.release_date`
      )
      .all(evaId) as Movie[];
  },
};
