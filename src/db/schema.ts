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

  // Characters table
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      age INTEGER,
      gender TEXT NOT NULL,
      affiliations TEXT NOT NULL,
      occupations TEXT NOT NULL,
      bio TEXT NOT NULL
    )
  `);

  const insertCharacter = db.prepare(
    "INSERT INTO characters (id, name, name_japanese, age, gender, affiliations, occupations, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const characters = [
    {
      id: "019b491a-6b36-7000-9dce-eac3a1978cd9",
      name: "Shinji Ikari",
      nameJapanese: "碇シンジ",
      age: 14,
      gender: "Male",
      affiliations: ["NERV"],
      occupations: ["Third Child", "Pilot of Evangelion Unit-01"],
      bio: "The main protagonist and pilot of Evangelion Unit-01. Shinji is the son of Gendo Ikari, the commander of NERV, and Yui Ikari. He is a reluctant hero who struggles with feelings of abandonment and self-worth throughout the series.",
    },
    {
      id: "019b491a-6b36-7001-8877-7768134a9a61",
      name: "Rei Ayanami",
      nameJapanese: "綾波レイ",
      age: 14,
      gender: "Female",
      affiliations: ["NERV"],
      occupations: ["First Child", "Pilot of Evangelion Unit-00"],
      bio: "The mysterious First Child and pilot of Evangelion Unit-00. Rei is an enigmatic girl with pale skin and blue hair who shows little emotion. Her origins and connection to Yui Ikari are central mysteries of the series.",
    },
    {
      id: "019b491a-6b36-7002-b500-53981aee69dd",
      name: "Asuka Langley Soryu",
      nameJapanese: "惣流・アスカ・ラングレー",
      age: 14,
      gender: "Female",
      affiliations: ["NERV"],
      occupations: ["Second Child", "Pilot of Evangelion Unit-02"],
      bio: "The fiery Second Child and pilot of Evangelion Unit-02. Asuka is a child prodigy of German and Japanese descent who graduated from university at a young age. She is proud, competitive, and struggles with her need for validation.",
    },
    {
      id: "019b491a-6b36-7003-acad-14b9d61a8c56",
      name: "Misato Katsuragi",
      nameJapanese: "葛城ミサト",
      age: 29,
      gender: "Female",
      affiliations: ["NERV"],
      occupations: ["Director of Operations"],
      bio: "NERV's Director of Operations and guardian to Shinji and Asuka. Misato is a survivor of the Second Impact and carries deep psychological scars. Despite her professional competence, she struggles with alcoholism and personal relationships.",
    },
    {
      id: "019b491a-6b36-7004-aa4c-cd8165837828",
      name: "Gendo Ikari",
      nameJapanese: "碇ゲンドウ",
      age: 48,
      gender: "Male",
      affiliations: ["NERV", "SEELE"],
      occupations: ["Supreme Commander of NERV"],
      bio: "The cold and calculating commander of NERV and father of Shinji. Gendo is driven by his own secret agenda involving the Human Instrumentality Project. His distant relationship with Shinji stems from the death of his wife Yui.",
    },
    {
      id: "019b491a-6b36-7005-8538-312b60ed8cb7",
      name: "Kaworu Nagisa",
      nameJapanese: "渚カヲル",
      age: 15,
      gender: "Male",
      affiliations: ["SEELE", "NERV"],
      occupations: ["Fifth Child", "Pilot of Evangelion Unit-02"],
      bio: "The enigmatic Fifth Child sent by SEELE. Kaworu forms a brief but profound friendship with Shinji. He is later revealed to be the final Angel, Tabris, and his true nature forces a devastating choice upon Shinji.",
    },
    {
      id: "019b491a-6b36-7006-bf17-0f2e7e5e6bae",
      name: "Ritsuko Akagi",
      nameJapanese: "赤木リツコ",
      age: 30,
      gender: "Female",
      affiliations: ["NERV"],
      occupations: ["Head Scientist"],
      bio: "NERV's head scientist and developer of the MAGI supercomputer system. Ritsuko followed in her mother's footsteps both professionally and in her complicated relationship with Gendo Ikari.",
    },
    {
      id: "019b491a-6b36-7007-91d5-9841b4cea779",
      name: "Kozo Fuyutsuki",
      nameJapanese: "冬月コウゾウ",
      age: 59,
      gender: "Male",
      affiliations: ["NERV"],
      occupations: ["Deputy Commander of NERV"],
      bio: "The Deputy Commander of NERV and former professor who taught Yui Ikari. Fuyutsuki is one of the few people who knows the full truth about NERV's origins and Gendo's plans.",
    },
    {
      id: "019b491a-6b36-7008-a432-a2b30175da16",
      name: "Toji Suzuhara",
      nameJapanese: "鈴原トウジ",
      age: 14,
      gender: "Male",
      affiliations: ["NERV"],
      occupations: ["Student", "Fourth Child", "Pilot of Evangelion Unit-03"],
      bio: "Shinji's classmate and friend who initially resented him because his sister was injured during an Angel battle. Toji later becomes the Fourth Child and pilot of Unit-03, with tragic consequences.",
    },
    {
      id: "019b491a-6b36-7009-a789-792bef2bbf55",
      name: "Kensuke Aida",
      nameJapanese: "相田ケンスケ",
      age: 14,
      gender: "Male",
      affiliations: [],
      occupations: ["Student"],
      bio: "Shinji's classmate and friend who is a military otaku obsessed with weapons and warfare. Kensuke dreams of becoming an Eva pilot but never gets the opportunity in the original series.",
    },
    {
      id: "019b491a-6b36-700a-b44e-a41035614633",
      name: "Hikari Horaki",
      nameJapanese: "洞木ヒカリ",
      age: 14,
      gender: "Female",
      affiliations: [],
      occupations: ["Student", "Class Representative"],
      bio: "The class representative of Shinji's class and Asuka's closest friend. Hikari has a crush on Toji and represents the normal life that the Eva pilots can never fully have.",
    },
    {
      id: "019b491a-6b36-700b-8a56-65c22af2e85b",
      name: "Ryoji Kaji",
      nameJapanese: "加持リョウジ",
      age: 30,
      gender: "Male",
      affiliations: ["NERV", "Japanese Government", "SEELE"],
      occupations: ["Special Inspector", "Triple Agent"],
      bio: "A triple agent working for NERV, the Japanese government, and SEELE. Kaji is Misato's former lover and serves as a mentor figure to Shinji. His investigation into NERV's secrets leads to his death.",
    },
    {
      id: "019b491a-6b36-700c-9161-4718f2c0ac14",
      name: "Yui Ikari",
      nameJapanese: "碇ユイ",
      age: 27,
      gender: "Female",
      affiliations: ["Gehirn", "NERV"],
      occupations: ["Scientist"],
      bio: "Shinji's mother and Gendo's wife who was absorbed into Evangelion Unit-01 during a contact experiment. Her soul remains within the Eva, and her death shaped both Gendo's and Shinji's lives profoundly.",
    },
    {
      id: "019b491a-6b36-700d-bc23-fc5b19bad780",
      name: "Pen Pen",
      nameJapanese: "ペンペン",
      age: null,
      gender: "Male",
      affiliations: ["Katsuragi Residence"],
      occupations: ["Warm Water Penguin"],
      bio: "A genetically engineered warm-water penguin who lives with Misato. Pen Pen provides comic relief and represents the small moments of domestic normalcy in an otherwise dark series.",
    },
    {
      id: "019b491a-6b36-700e-bc42-1e7497fb9d27",
      name: "Mari Makinami Illustrious",
      nameJapanese: "真希波・マリ・イラストリアス",
      age: null,
      gender: "Female",
      affiliations: ["WILLE"],
      occupations: ["Eva Pilot"],
      bio: "A new character introduced in the Rebuild of Evangelion films. Mari is an enigmatic and cheerful pilot who seems to know more about the Evangelions than she lets on. She plays a major role in the Rebuild continuity.",
    },
  ];

  for (const character of characters) {
    insertCharacter.run(
      character.id,
      character.name,
      character.nameJapanese,
      character.age,
      character.gender,
      JSON.stringify(character.affiliations),
      JSON.stringify(character.occupations),
      character.bio
    );
  }

  // Character-Show junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_shows (
      character_id TEXT NOT NULL,
      show_id TEXT NOT NULL,
      PRIMARY KEY (character_id, show_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (show_id) REFERENCES shows(id)
    )
  `);

  // Character-Movie junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_movies (
      character_id TEXT NOT NULL,
      movie_id TEXT NOT NULL,
      PRIMARY KEY (character_id, movie_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (movie_id) REFERENCES movies(id)
    )
  `);

  const insertCharacterShow = db.prepare(
    "INSERT INTO character_shows (character_id, show_id) VALUES (?, ?)"
  );

  const insertCharacterMovie = db.prepare(
    "INSERT INTO character_movies (character_id, movie_id) VALUES (?, ?)"
  );

  // Show ID
  const NGE_SHOW = "019b490e-2484-7000-a31d-63a21df12ff4";

  // Movie IDs
  const MOVIES = {
    deathAndRebirth: "019b490e-2485-7000-a616-d1c5309aa567",
    endOfEva: "019b490e-2485-7001-99aa-8cc0e821e0fe",
    rebuild1: "019b490e-2485-7002-9d0f-270f6b95977d",
    rebuild2: "019b490e-2485-7003-a911-0ab94dd9e700",
    rebuild3: "019b490e-2485-7004-b921-736c7525ddc1",
    rebuild4: "019b490e-2485-7005-83de-8d38f0397f09",
  };

  // Character IDs
  const CHARS = {
    shinji: "019b491a-6b36-7000-9dce-eac3a1978cd9",
    rei: "019b491a-6b36-7001-8877-7768134a9a61",
    asuka: "019b491a-6b36-7002-b500-53981aee69dd",
    misato: "019b491a-6b36-7003-acad-14b9d61a8c56",
    gendo: "019b491a-6b36-7004-aa4c-cd8165837828",
    kaworu: "019b491a-6b36-7005-8538-312b60ed8cb7",
    ritsuko: "019b491a-6b36-7006-bf17-0f2e7e5e6bae",
    fuyutsuki: "019b491a-6b36-7007-91d5-9841b4cea779",
    toji: "019b491a-6b36-7008-a432-a2b30175da16",
    kensuke: "019b491a-6b36-7009-a789-792bef2bbf55",
    hikari: "019b491a-6b36-700a-b44e-a41035614633",
    kaji: "019b491a-6b36-700b-8a56-65c22af2e85b",
    yui: "019b491a-6b36-700c-9161-4718f2c0ac14",
    penpen: "019b491a-6b36-700d-bc23-fc5b19bad780",
    mari: "019b491a-6b36-700e-bc42-1e7497fb9d27",
  };

  // Original series characters in NGE TV show
  const originalCharacters = [
    CHARS.shinji,
    CHARS.rei,
    CHARS.asuka,
    CHARS.misato,
    CHARS.gendo,
    CHARS.kaworu,
    CHARS.ritsuko,
    CHARS.fuyutsuki,
    CHARS.toji,
    CHARS.kensuke,
    CHARS.hikari,
    CHARS.kaji,
    CHARS.yui,
    CHARS.penpen,
  ];

  for (const charId of originalCharacters) {
    insertCharacterShow.run(charId, NGE_SHOW);
  }

  // Death and Rebirth & End of Evangelion - same as TV series
  for (const charId of originalCharacters) {
    insertCharacterMovie.run(charId, MOVIES.deathAndRebirth);
    insertCharacterMovie.run(charId, MOVIES.endOfEva);
  }

  // Rebuild 1.0 - early story, no Asuka or Kaworu yet
  const rebuild1Chars = [
    CHARS.shinji,
    CHARS.rei,
    CHARS.misato,
    CHARS.gendo,
    CHARS.ritsuko,
    CHARS.fuyutsuki,
    CHARS.toji,
    CHARS.kensuke,
    CHARS.hikari,
    CHARS.penpen,
  ];
  for (const charId of rebuild1Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild1);
  }

  // Rebuild 2.0 - adds Asuka, Mari, Kaji, Kaworu (cameo)
  const rebuild2Chars = [
    CHARS.shinji,
    CHARS.rei,
    CHARS.asuka,
    CHARS.misato,
    CHARS.gendo,
    CHARS.kaworu,
    CHARS.ritsuko,
    CHARS.fuyutsuki,
    CHARS.toji,
    CHARS.kensuke,
    CHARS.hikari,
    CHARS.kaji,
    CHARS.penpen,
    CHARS.mari,
  ];
  for (const charId of rebuild2Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild2);
  }

  // Rebuild 3.0 - 14 years later, reduced cast
  const rebuild3Chars = [
    CHARS.shinji,
    CHARS.rei,
    CHARS.asuka,
    CHARS.misato,
    CHARS.gendo,
    CHARS.kaworu,
    CHARS.ritsuko,
    CHARS.fuyutsuki,
    CHARS.mari,
  ];
  for (const charId of rebuild3Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild3);
  }

  // Rebuild 3.0+1.0 - most characters return
  const rebuild4Chars = [
    CHARS.shinji,
    CHARS.rei,
    CHARS.asuka,
    CHARS.misato,
    CHARS.gendo,
    CHARS.kaworu,
    CHARS.ritsuko,
    CHARS.fuyutsuki,
    CHARS.toji,
    CHARS.kensuke,
    CHARS.hikari,
    CHARS.yui,
    CHARS.mari,
  ];
  for (const charId of rebuild4Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild4);
  }
}
