import type Database from "bun:sqlite";
import { NGE_SHOW, STUDIO_IDS } from "./ids";

export function initializeShows(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS shows (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      title_japanese TEXT NOT NULL,
      episodes INTEGER NOT NULL,
      aired TEXT NOT NULL,
      studio_id TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      FOREIGN KEY (studio_id) REFERENCES studios(id)
    )
  `);

  const insertShow = db.prepare(
    "INSERT INTO shows (id, title, title_japanese, episodes, aired, studio_id, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );

  const shows = [
    {
      id: NGE_SHOW,
      title: "Neon Genesis Evangelion",
      titleJapanese: "新世紀エヴァンゲリオン",
      episodes: 26,
      aired: "1995-10-04 to 1996-03-27",
      studioId: STUDIO_IDS.gainax,
      synopsis:
        "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of NERV, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin.",
    },
  ];

  for (const show of shows) {
    insertShow.run(
      show.id,
      show.title,
      show.titleJapanese,
      show.episodes,
      show.aired,
      show.studioId,
      show.synopsis,
    );
  }
}
