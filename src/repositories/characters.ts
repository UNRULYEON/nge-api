import { db } from "@/db";
import type { Character } from "@/types/entities";

interface CharacterRow {
  id: string;
  name: string;
  nameJapanese: string;
  age: number | null;
  gender: string;
  affiliations: string;
  occupations: string;
  bio: string;
}

function getShowIds(characterId: string): string[] {
  const rows = db
    .query(`SELECT show_id FROM character_shows WHERE character_id = ?`)
    .all(characterId) as { show_id: string }[];
  return rows.map((r) => r.show_id);
}

function getMovieIds(characterId: string): string[] {
  const rows = db
    .query(`SELECT movie_id FROM character_movies WHERE character_id = ?`)
    .all(characterId) as { movie_id: string }[];
  return rows.map((r) => r.movie_id);
}

function parseCharacter(row: CharacterRow): Character {
  return {
    ...row,
    affiliations: JSON.parse(row.affiliations),
    occupations: JSON.parse(row.occupations),
    showIds: getShowIds(row.id),
    movieIds: getMovieIds(row.id),
  };
}

export const characters = {
  getAll(): Character[] {
    const rows = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, age, gender, affiliations, occupations, bio FROM characters`
      )
      .all() as CharacterRow[];
    return rows.map(parseCharacter);
  },

  getById(id: string): Character | null {
    const row = db
      .query(
        `SELECT id, name, name_japanese as nameJapanese, age, gender, affiliations, occupations, bio FROM characters WHERE id = ?`
      )
      .get(id) as CharacterRow | null;
    return row ? parseCharacter(row) : null;
  },
};
