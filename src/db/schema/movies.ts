import type Database from "bun:sqlite";
import { MOVIE_IDS, STUDIO_IDS } from "./ids";

export function initializeMovies(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      title_japanese TEXT NOT NULL,
      release_date TEXT NOT NULL,
      runtime INTEGER NOT NULL,
      studio_id TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      FOREIGN KEY (studio_id) REFERENCES studios(id)
    )
  `);

  const insertMovie = db.prepare(
    "INSERT INTO movies (id, title, title_japanese, release_date, runtime, studio_id, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );

  const movies = [
    {
      id: MOVIE_IDS.deathAndRebirth,
      title: "Evangelion: Death and Rebirth",
      titleJapanese: "新世紀エヴァンゲリオン劇場版 DEATH & REBIRTH シト新生",
      releaseDate: "1997-03-15",
      runtime: 101,
      studioId: STUDIO_IDS.gainax,
      synopsis:
        "A recap of the first 24 episodes of the TV series, followed by a new ending that was later expanded into The End of Evangelion.",
    },
    {
      id: MOVIE_IDS.endOfEva,
      title: "The End of Evangelion",
      titleJapanese: "新世紀エヴァンゲリオン劇場版 Air/まごころを、君に",
      releaseDate: "1997-07-19",
      runtime: 87,
      studioId: STUDIO_IDS.gainax,
      synopsis:
        "Concurrent theatrical ending to the TV series, taking place during episodes 25 and 26. SEELE launches an attack on NERV headquarters, leading to a climactic confrontation.",
    },
    {
      id: MOVIE_IDS.rebuild1,
      title: "Evangelion: 1.0 You Are (Not) Alone",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:序",
      releaseDate: "2007-09-01",
      runtime: 98,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "The first film in the Rebuild of Evangelion tetralogy. A retelling of the beginning of the original series, covering the first six episodes with updated animation and some new scenes.",
    },
    {
      id: MOVIE_IDS.rebuild2,
      title: "Evangelion: 2.0 You Can (Not) Advance",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:破",
      releaseDate: "2009-06-27",
      runtime: 108,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "The second Rebuild film introduces new characters and diverges significantly from the original series. Features the activation of Unit-03 and the battle against Zeruel.",
    },
    {
      id: MOVIE_IDS.rebuild3,
      title: "Evangelion: 3.0 You Can (Not) Redo",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:Q",
      releaseDate: "2012-11-17",
      runtime: 96,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "Set 14 years after the events of the second film, Shinji awakens to find the world drastically changed. WILLE, an organization led by former NERV members, now fights against NERV.",
    },
    {
      id: MOVIE_IDS.rebuild4,
      title: "Evangelion: 3.0+1.0 Thrice Upon a Time",
      titleJapanese: "シン・エヴァンゲリオン劇場版:||",
      releaseDate: "2021-03-08",
      runtime: 155,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "The final film in the Rebuild of Evangelion series. Shinji, Asuka, and Rei find refuge in a village while WILLE prepares for a final confrontation with NERV and Gendo Ikari.",
    },
  ];

  for (const movie of movies) {
    insertMovie.run(
      movie.id,
      movie.title,
      movie.titleJapanese,
      movie.releaseDate,
      movie.runtime,
      movie.studioId,
      movie.synopsis,
    );
  }
}
