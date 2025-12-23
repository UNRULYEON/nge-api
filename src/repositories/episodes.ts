import { db } from "@/db";
import type { Episode } from "@/types/entities";

interface EpisodeRow {
  id: string;
  showId: string;
  episodeNumber: number;
  title: string;
  titleJapanese: string;
  airDate: string;
  synopsis: string;
}

function getCharacterIds(episodeId: string): string[] {
  const rows = db
    .query(
      `SELECT character_id FROM character_episodes WHERE episode_id = ?`
    )
    .all(episodeId) as { character_id: string }[];
  return rows.map((r) => r.character_id);
}

function getAngelIds(episodeId: string): string[] {
  const rows = db
    .query(`SELECT angel_id FROM angel_episodes WHERE episode_id = ?`)
    .all(episodeId) as { angel_id: string }[];
  return rows.map((r) => r.angel_id);
}

function parseEpisode(row: EpisodeRow): Episode {
  return {
    ...row,
    characterIds: getCharacterIds(row.id),
    angelIds: getAngelIds(row.id),
  };
}

export const episodes = {
  getAll(): Episode[] {
    const rows = db
      .query(
        `SELECT id, show_id as showId, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes ORDER BY episode_number`
      )
      .all() as EpisodeRow[];
    return rows.map(parseEpisode);
  },

  getById(id: string): Episode | null {
    const row = db
      .query(
        `SELECT id, show_id as showId, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes WHERE id = ?`
      )
      .get(id) as EpisodeRow | null;
    return row ? parseEpisode(row) : null;
  },

  getByShowId(showId: string): Episode[] {
    const rows = db
      .query(
        `SELECT id, show_id as showId, episode_number as episodeNumber, title, title_japanese as titleJapanese, air_date as airDate, synopsis FROM episodes WHERE show_id = ? ORDER BY episode_number`
      )
      .all(showId) as EpisodeRow[];
    return rows.map(parseEpisode);
  },
};
