import type Database from "bun:sqlite";

// Studio IDs for foreign key references
const STUDIO_IDS = {
  gainax: "019b48ba-eac5-7000-85c0-3ef877607b73",
  khara: "019b48ba-eac5-7001-832b-cc5d8b463318",
  tatsunoko: "019b48ba-eac5-7002-8e4f-b99f9f2765be",
};

export function initializeDatabase(db: Database) {
  // Studios table
  db.run(`
    CREATE TABLE IF NOT EXISTS studios (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      founded INTEGER NOT NULL,
      location TEXT NOT NULL,
      website TEXT
    )
  `);

  const insertStudio = db.prepare(
    "INSERT INTO studios (id, name, founded, location, website) VALUES (?, ?, ?, ?, ?)"
  );

  const studios = [
    {
      id: STUDIO_IDS.gainax,
      name: "Gainax",
      founded: 1984,
      location: "Tokyo, Japan",
      website: null,
    },
    {
      id: STUDIO_IDS.khara,
      name: "Khara",
      founded: 2006,
      location: "Tokyo, Japan",
      website: "https://www.khara.co.jp",
    },
    {
      id: STUDIO_IDS.tatsunoko,
      name: "Tatsunoko Production",
      founded: 1962,
      location: "Tokyo, Japan",
      website: "https://www.tatsunoko.co.jp",
    },
  ];

  for (const studio of studios) {
    insertStudio.run(studio.id, studio.name, studio.founded, studio.location, studio.website);
  }

  // Shows table
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
    "INSERT INTO shows (id, title, title_japanese, episodes, aired, studio_id, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const shows = [
    {
      id: "019b490e-2484-7000-a31d-63a21df12ff4",
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
      show.synopsis
    );
  }

  // Movies table
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
    "INSERT INTO movies (id, title, title_japanese, release_date, runtime, studio_id, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const movies = [
    {
      id: "019b490e-2485-7000-a616-d1c5309aa567",
      title: "Evangelion: Death and Rebirth",
      titleJapanese: "新世紀エヴァンゲリオン劇場版 DEATH & REBIRTH シト新生",
      releaseDate: "1997-03-15",
      runtime: 101,
      studioId: STUDIO_IDS.gainax,
      synopsis:
        "A recap of the first 24 episodes of the TV series, followed by a new ending that was later expanded into The End of Evangelion.",
    },
    {
      id: "019b490e-2485-7001-99aa-8cc0e821e0fe",
      title: "The End of Evangelion",
      titleJapanese: "新世紀エヴァンゲリオン劇場版 Air/まごころを、君に",
      releaseDate: "1997-07-19",
      runtime: 87,
      studioId: STUDIO_IDS.gainax,
      synopsis:
        "Concurrent theatrical ending to the TV series, taking place during episodes 25 and 26. SEELE launches an attack on NERV headquarters, leading to a climactic confrontation.",
    },
    {
      id: "019b490e-2485-7002-9d0f-270f6b95977d",
      title: "Evangelion: 1.0 You Are (Not) Alone",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:序",
      releaseDate: "2007-09-01",
      runtime: 98,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "The first film in the Rebuild of Evangelion tetralogy. A retelling of the beginning of the original series, covering the first six episodes with updated animation and some new scenes.",
    },
    {
      id: "019b490e-2485-7003-a911-0ab94dd9e700",
      title: "Evangelion: 2.0 You Can (Not) Advance",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:破",
      releaseDate: "2009-06-27",
      runtime: 108,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "The second Rebuild film introduces new characters and diverges significantly from the original series. Features the activation of Unit-03 and the battle against Zeruel.",
    },
    {
      id: "019b490e-2485-7004-b921-736c7525ddc1",
      title: "Evangelion: 3.0 You Can (Not) Redo",
      titleJapanese: "ヱヴァンゲリヲン新劇場版:Q",
      releaseDate: "2012-11-17",
      runtime: 96,
      studioId: STUDIO_IDS.khara,
      synopsis:
        "Set 14 years after the events of the second film, Shinji awakens to find the world drastically changed. WILLE, an organization led by former NERV members, now fights against NERV.",
    },
    {
      id: "019b490e-2485-7005-83de-8d38f0397f09",
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
      movie.synopsis
    );
  }
}
