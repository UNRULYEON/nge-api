import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type {
  Character,
  Episode,
  Movie,
  Organization,
  Show,
} from "@/types/entities";

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

export const characters = {
  getAll(): Character[] {
    return record("db.characters.getAll", () => {
      const rows = db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, age, gender, occupations, bio FROM characters`,
        )
        .all() as CharacterRow[];
      return rows.map(parseCharacter);
    });
  },

  getById(id: string): Character | null {
    return record("db.characters.getById", () => {
      const row = db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, age, gender, occupations, bio FROM characters WHERE id = ?`,
        )
        .get(id) as CharacterRow | null;
      return row ? parseCharacter(row) : null;
    });
  },

  getShows(characterId: string): Show[] {
    return record("db.characters.getShows", () => {
      return db
        .query(
          `SELECT s.id, s.title, s.title_japanese as titleJapanese, s.episodes, s.aired, s.synopsis
         FROM shows s
         JOIN character_shows cs ON cs.show_id = s.id
         WHERE cs.character_id = ?`,
        )
        .all(characterId) as Show[];
    });
  },

  getMovies(characterId: string): Movie[] {
    return record("db.characters.getMovies", () => {
      return db
        .query(
          `SELECT m.id, m.title, m.title_japanese as titleJapanese, m.release_date as releaseDate, m.runtime, m.synopsis
         FROM movies m
         JOIN character_movies cm ON cm.movie_id = m.id
         WHERE cm.character_id = ?
         ORDER BY m.release_date`,
        )
        .all(characterId) as Movie[];
    });
  },

  getEpisodes(characterId: string): Episode[] {
    return record("db.characters.getEpisodes", () => {
      return db
        .query(
          `SELECT e.id, e.episode_number as episodeNumber, e.title, e.title_japanese as titleJapanese, e.air_date as airDate, e.synopsis
         FROM episodes e
         JOIN character_episodes ce ON ce.episode_id = e.id
         WHERE ce.character_id = ?
         ORDER BY e.episode_number`,
        )
        .all(characterId) as Episode[];
    });
  },

  getOrganizations(characterId: string): Organization[] {
    return record("db.characters.getOrganizations", () => {
      return db
        .query(
          `SELECT o.id, o.name, o.name_japanese as nameJapanese, o.type, o.description
         FROM organizations o
         JOIN character_organizations co ON co.organization_id = o.id
         WHERE co.character_id = ?`,
        )
        .all(characterId) as Organization[];
    });
  },
};
