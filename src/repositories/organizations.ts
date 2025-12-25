import { record } from "@elysiajs/opentelemetry";
import { db } from "@/db";
import type { Character, Episode, Organization } from "@/types/entities";

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

export const organizations = {
  getAll(): Organization[] {
    return record("db.organizations.getAll", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations`,
        )
        .all() as Organization[];
    });
  },

  getById(id: string): Organization | null {
    return record("db.organizations.getById", () => {
      return db
        .query(
          `SELECT id, name, name_japanese as nameJapanese, type, description FROM organizations WHERE id = ?`,
        )
        .get(id) as Organization | null;
    });
  },

  getCharacters(organizationId: string): Character[] {
    return record("db.organizations.getCharacters", () => {
      const rows = db
        .query(
          `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN character_organizations co ON co.character_id = c.id
         WHERE co.organization_id = ?`,
        )
        .all(organizationId) as CharacterRow[];
      return rows.map(parseCharacter);
    });
  },

  getEpisodes(organizationId: string): Episode[] {
    return record("db.organizations.getEpisodes", () => {
      return db
        .query(
          `SELECT e.id, e.episode_number as episodeNumber, e.title, e.title_japanese as titleJapanese, e.air_date as airDate, e.synopsis
         FROM episodes e
         JOIN organization_episodes oe ON oe.episode_id = e.id
         WHERE oe.organization_id = ?
         ORDER BY e.episode_number`,
        )
        .all(organizationId) as Episode[];
    });
  },
};
