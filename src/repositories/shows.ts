import { db } from "@/db";
import type { Character, Show, Studio } from "@/types/entities";

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

export const shows = {
  getAll(): Show[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, synopsis FROM shows`
      )
      .all() as Show[];
  },

  getById(id: string): Show | null {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, synopsis FROM shows WHERE id = ?`
      )
      .get(id) as Show | null;
  },

  getByStudioId(studioId: string): Show[] {
    return db
      .query(
        `SELECT id, title, title_japanese as titleJapanese, episodes, aired, synopsis FROM shows WHERE studio_id = ?`
      )
      .all(studioId) as Show[];
  },

  getStudio(showId: string): Studio | null {
    return db
      .query(
        `SELECT s.* FROM studios s JOIN shows sh ON sh.studio_id = s.id WHERE sh.id = ?`
      )
      .get(showId) as Studio | null;
  },

  getCharacters(showId: string): Character[] {
    const rows = db
      .query(
        `SELECT c.id, c.name, c.name_japanese as nameJapanese, c.age, c.gender, c.occupations, c.bio
         FROM characters c
         JOIN character_shows cs ON cs.character_id = c.id
         WHERE cs.show_id = ?`
      )
      .all(showId) as CharacterRow[];
    return rows.map(parseCharacter);
  },
};
