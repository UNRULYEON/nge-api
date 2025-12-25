import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type {
  Angel,
  Character,
  Episode,
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

export const episodes = {
  getAll(): Episode[] {
    return record("db.episodes.getAll", () => {
      return db
        .query(
          `SELECT id, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes ORDER BY episode_number`,
        )
        .all() as Episode[];
    });
  },

  getById(id: string): Episode | null {
    return record("db.episodes.getById", () => {
      return db
        .query(
          `SELECT id, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes WHERE id = ?`,
        )
        .get(id) as Episode | null;
    });
  },

  getByShowId(showId: string): Episode[] {
    return record("db.episodes.getByShowId", () => {
      return db
        .query(
          `SELECT id, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes WHERE show_id = ? ORDER BY episode_number`,
        )
        .all(showId) as Episode[];
    });
  },

  getShow(episodeId: string): Show | null {
    return record("db.episodes.getShow", () => {
      return db
        .query(
          `SELECT s.id, s.title, s.title_japanese as titleJapanese, s.episodes, s.aired, s.synopsis
         FROM shows s
         JOIN episodes e ON e.show_id = s.id
         WHERE e.id = ?`,
        )
        .get(episodeId) as Show | null;
    });
  },

  getCharacters(episodeId: string): Character[] {
    return record("db.episodes.getCharacters", () => {
      const rows = db
        .query(
          `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN character_episodes ce ON ce.character_id = c.id
         WHERE ce.episode_id = ?`,
        )
        .all(episodeId) as CharacterRow[];
      return rows.map(parseCharacter);
    });
  },

  getAngels(episodeId: string): Angel[] {
    return record("db.episodes.getAngels", () => {
      return db
        .query(
          `SELECT a.id, a.name, a.name_japanese as nameJapanese, a.number, a.description
         FROM angels a
         JOIN angel_episodes ae ON ae.angel_id = a.id
         WHERE ae.episode_id = ?
         ORDER BY a.number`,
        )
        .all(episodeId) as Angel[];
    });
  },

  getOrganizations(episodeId: string): Organization[] {
    return record("db.episodes.getOrganizations", () => {
      return db
        .query(
          `SELECT o.id, o.name, o.name_japanese as nameJapanese, o.type, o.description
         FROM organizations o
         JOIN organization_episodes oe ON oe.organization_id = o.id
         WHERE oe.episode_id = ?`,
        )
        .all(episodeId) as Organization[];
    });
  },
};
