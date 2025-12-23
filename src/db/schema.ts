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

  // Organizations table
  db.run(`
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  const insertOrganization = db.prepare(
    "INSERT INTO organizations (id, name, name_japanese, type, description) VALUES (?, ?, ?, ?, ?)"
  );

  const ORG_IDS = {
    nerv: "019b4926-f52e-7000-864f-ce83257c95b2",
    seele: "019b4926-f52e-7001-88a5-b69b264dd661",
    wille: "019b4926-f52e-7002-9ca3-c07c10808b64",
    gehirn: "019b4926-f52e-7003-b6f3-415dc7665201",
    japanGov: "019b4926-f52e-7004-866d-c2f80d52d721",
    un: "019b4926-f52e-7005-bbf6-e94adc6eefa1",
  };

  const organizations = [
    {
      id: ORG_IDS.nerv,
      name: "NERV",
      nameJapanese: "ネルフ",
      type: "Paramilitary Organization",
      description:
        "A special agency under the United Nations tasked with defending humanity against the Angels using the Evangelion units. Headquartered in the GeoFront beneath Tokyo-3, NERV is publicly known for its role in protecting humanity but secretly pursues the Human Instrumentality Project.",
    },
    {
      id: ORG_IDS.seele,
      name: "SEELE",
      nameJapanese: "ゼーレ",
      type: "Secret Society",
      description:
        "A mysterious and powerful secret society that controls world governments and funds NERV. SEELE possesses the Dead Sea Scrolls and orchestrates events to bring about the Human Instrumentality Project according to their own agenda.",
    },
    {
      id: ORG_IDS.wille,
      name: "WILLE",
      nameJapanese: "ヴィレ",
      type: "Paramilitary Organization",
      description:
        "An anti-NERV organization formed by former NERV members in the Rebuild continuity. Operating from the flying battleship AAA Wunder, WILLE fights to prevent further Impacts and stop Gendo Ikari's plans.",
    },
    {
      id: ORG_IDS.gehirn,
      name: "Gehirn",
      nameJapanese: "ゲヒルン",
      type: "Research Organization",
      description:
        "The predecessor organization to NERV, responsible for the initial research and development of the Evangelion units. Gehirn was reorganized into NERV following the successful activation of Unit-00.",
    },
    {
      id: ORG_IDS.japanGov,
      name: "Japanese Government",
      nameJapanese: "日本政府",
      type: "Government",
      description:
        "The government of Japan, which maintains an uneasy relationship with NERV. While officially supporting NERV's mission, elements within the government are suspicious of NERV's true intentions and maintain their own intelligence operations.",
    },
    {
      id: ORG_IDS.un,
      name: "United Nations",
      nameJapanese: "国際連合",
      type: "Intergovernmental Organization",
      description:
        "The international body that officially oversees NERV's operations. The UN provides funding and political support for NERV, though real control lies with SEELE operating through the Human Instrumentality Committee.",
    },
  ];

  for (const org of organizations) {
    insertOrganization.run(org.id, org.name, org.nameJapanese, org.type, org.description);
  }

  // Characters table
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      age INTEGER,
      gender TEXT NOT NULL,
      occupations TEXT NOT NULL,
      bio TEXT NOT NULL
    )
  `);

  const insertCharacter = db.prepare(
    "INSERT INTO characters (id, name, name_japanese, age, gender, occupations, bio) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const CHAR_IDS = {
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

  const characters = [
    {
      id: CHAR_IDS.shinji,
      name: "Shinji Ikari",
      nameJapanese: "碇シンジ",
      age: 14,
      gender: "Male",
      occupations: ["Third Child", "Pilot of Evangelion Unit-01"],
      bio: "The main protagonist and pilot of Evangelion Unit-01. Shinji is the son of Gendo Ikari, the commander of NERV, and Yui Ikari. He is a reluctant hero who struggles with feelings of abandonment and self-worth throughout the series.",
    },
    {
      id: CHAR_IDS.rei,
      name: "Rei Ayanami",
      nameJapanese: "綾波レイ",
      age: 14,
      gender: "Female",
      occupations: ["First Child", "Pilot of Evangelion Unit-00"],
      bio: "The mysterious First Child and pilot of Evangelion Unit-00. Rei is an enigmatic girl with pale skin and blue hair who shows little emotion. Her origins and connection to Yui Ikari are central mysteries of the series.",
    },
    {
      id: CHAR_IDS.asuka,
      name: "Asuka Langley Soryu",
      nameJapanese: "惣流・アスカ・ラングレー",
      age: 14,
      gender: "Female",
      occupations: ["Second Child", "Pilot of Evangelion Unit-02"],
      bio: "The fiery Second Child and pilot of Evangelion Unit-02. Asuka is a child prodigy of German and Japanese descent who graduated from university at a young age. She is proud, competitive, and struggles with her need for validation.",
    },
    {
      id: CHAR_IDS.misato,
      name: "Misato Katsuragi",
      nameJapanese: "葛城ミサト",
      age: 29,
      gender: "Female",
      occupations: ["Director of Operations"],
      bio: "NERV's Director of Operations and guardian to Shinji and Asuka. Misato is a survivor of the Second Impact and carries deep psychological scars. Despite her professional competence, she struggles with alcoholism and personal relationships.",
    },
    {
      id: CHAR_IDS.gendo,
      name: "Gendo Ikari",
      nameJapanese: "碇ゲンドウ",
      age: 48,
      gender: "Male",
      occupations: ["Supreme Commander of NERV"],
      bio: "The cold and calculating commander of NERV and father of Shinji. Gendo is driven by his own secret agenda involving the Human Instrumentality Project. His distant relationship with Shinji stems from the death of his wife Yui.",
    },
    {
      id: CHAR_IDS.kaworu,
      name: "Kaworu Nagisa",
      nameJapanese: "渚カヲル",
      age: 15,
      gender: "Male",
      occupations: ["Fifth Child", "Pilot of Evangelion Unit-02"],
      bio: "The enigmatic Fifth Child sent by SEELE. Kaworu forms a brief but profound friendship with Shinji. He is later revealed to be the final Angel, Tabris, and his true nature forces a devastating choice upon Shinji.",
    },
    {
      id: CHAR_IDS.ritsuko,
      name: "Ritsuko Akagi",
      nameJapanese: "赤木リツコ",
      age: 30,
      gender: "Female",
      occupations: ["Head Scientist"],
      bio: "NERV's head scientist and developer of the MAGI supercomputer system. Ritsuko followed in her mother's footsteps both professionally and in her complicated relationship with Gendo Ikari.",
    },
    {
      id: CHAR_IDS.fuyutsuki,
      name: "Kozo Fuyutsuki",
      nameJapanese: "冬月コウゾウ",
      age: 59,
      gender: "Male",
      occupations: ["Deputy Commander of NERV"],
      bio: "The Deputy Commander of NERV and former professor who taught Yui Ikari. Fuyutsuki is one of the few people who knows the full truth about NERV's origins and Gendo's plans.",
    },
    {
      id: CHAR_IDS.toji,
      name: "Toji Suzuhara",
      nameJapanese: "鈴原トウジ",
      age: 14,
      gender: "Male",
      occupations: ["Student", "Fourth Child", "Pilot of Evangelion Unit-03"],
      bio: "Shinji's classmate and friend who initially resented him because his sister was injured during an Angel battle. Toji later becomes the Fourth Child and pilot of Unit-03, with tragic consequences.",
    },
    {
      id: CHAR_IDS.kensuke,
      name: "Kensuke Aida",
      nameJapanese: "相田ケンスケ",
      age: 14,
      gender: "Male",
      occupations: ["Student"],
      bio: "Shinji's classmate and friend who is a military otaku obsessed with weapons and warfare. Kensuke dreams of becoming an Eva pilot but never gets the opportunity in the original series.",
    },
    {
      id: CHAR_IDS.hikari,
      name: "Hikari Horaki",
      nameJapanese: "洞木ヒカリ",
      age: 14,
      gender: "Female",
      occupations: ["Student", "Class Representative"],
      bio: "The class representative of Shinji's class and Asuka's closest friend. Hikari has a crush on Toji and represents the normal life that the Eva pilots can never fully have.",
    },
    {
      id: CHAR_IDS.kaji,
      name: "Ryoji Kaji",
      nameJapanese: "加持リョウジ",
      age: 30,
      gender: "Male",
      occupations: ["Special Inspector", "Triple Agent"],
      bio: "A triple agent working for NERV, the Japanese government, and SEELE. Kaji is Misato's former lover and serves as a mentor figure to Shinji. His investigation into NERV's secrets leads to his death.",
    },
    {
      id: CHAR_IDS.yui,
      name: "Yui Ikari",
      nameJapanese: "碇ユイ",
      age: 27,
      gender: "Female",
      occupations: ["Scientist"],
      bio: "Shinji's mother and Gendo's wife who was absorbed into Evangelion Unit-01 during a contact experiment. Her soul remains within the Eva, and her death shaped both Gendo's and Shinji's lives profoundly.",
    },
    {
      id: CHAR_IDS.penpen,
      name: "Pen Pen",
      nameJapanese: "ペンペン",
      age: null,
      gender: "Male",
      occupations: ["Warm Water Penguin"],
      bio: "A genetically engineered warm-water penguin who lives with Misato. Pen Pen provides comic relief and represents the small moments of domestic normalcy in an otherwise dark series.",
    },
    {
      id: CHAR_IDS.mari,
      name: "Mari Makinami Illustrious",
      nameJapanese: "真希波・マリ・イラストリアス",
      age: null,
      gender: "Female",
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

  // Character-Organization junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_organizations (
      character_id TEXT NOT NULL,
      organization_id TEXT NOT NULL,
      PRIMARY KEY (character_id, organization_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (organization_id) REFERENCES organizations(id)
    )
  `);

  const insertCharacterShow = db.prepare(
    "INSERT INTO character_shows (character_id, show_id) VALUES (?, ?)"
  );

  const insertCharacterMovie = db.prepare(
    "INSERT INTO character_movies (character_id, movie_id) VALUES (?, ?)"
  );

  const insertCharacterOrg = db.prepare(
    "INSERT INTO character_organizations (character_id, organization_id) VALUES (?, ?)"
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

  // Original series characters in NGE TV show
  const originalCharacters = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.kaji,
    CHAR_IDS.yui,
    CHAR_IDS.penpen,
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
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.penpen,
  ];
  for (const charId of rebuild1Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild1);
  }

  // Rebuild 2.0 - adds Asuka, Mari, Kaji, Kaworu (cameo)
  const rebuild2Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.kaji,
    CHAR_IDS.penpen,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild2Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild2);
  }

  // Rebuild 3.0 - 14 years later, reduced cast
  const rebuild3Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild3Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild3);
  }

  // Rebuild 3.0+1.0 - most characters return
  const rebuild4Chars = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kensuke,
    CHAR_IDS.hikari,
    CHAR_IDS.yui,
    CHAR_IDS.mari,
  ];
  for (const charId of rebuild4Chars) {
    insertCharacterMovie.run(charId, MOVIES.rebuild4);
  }

  // Episodes table
  db.run(`
    CREATE TABLE IF NOT EXISTS episodes (
      id TEXT PRIMARY KEY,
      show_id TEXT NOT NULL,
      episode_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      title_japanese TEXT NOT NULL,
      air_date TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      FOREIGN KEY (show_id) REFERENCES shows(id)
    )
  `);

  const insertEpisode = db.prepare(
    "INSERT INTO episodes (id, show_id, episode_number, title, title_japanese, air_date, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const episodes = [
    {
      id: "019b492f-8465-7000-bb58-88b18b1c1c8c",
      showId: NGE_SHOW,
      episodeNumber: 1,
      title: "Angel Attack",
      titleJapanese: "使徒、襲来",
      airDate: "1995-10-04",
      synopsis: "Shinji Ikari arrives in Tokyo-3 and is recruited by his estranged father Gendo to pilot Evangelion Unit-01 against the Angel Sachiel.",
    },
    {
      id: "019b492f-8465-7001-8b63-c4863cd09e51",
      showId: NGE_SHOW,
      episodeNumber: 2,
      title: "The Beast",
      titleJapanese: "見知らぬ、天井",
      airDate: "1995-10-11",
      synopsis: "Shinji wakes up in the hospital after his first battle and struggles to come to terms with his new role as an Eva pilot.",
    },
    {
      id: "019b492f-8465-7002-b189-d2594083307b",
      showId: NGE_SHOW,
      episodeNumber: 3,
      title: "A Transfer",
      titleJapanese: "鳴らない、電話",
      airDate: "1995-10-18",
      synopsis: "Shinji begins attending school in Tokyo-3 and meets his classmates Toji and Kensuke, while struggling to connect with others.",
    },
    {
      id: "019b492f-8465-7003-be1c-77509f5cab70",
      showId: NGE_SHOW,
      episodeNumber: 4,
      title: "Hedgehog's Dilemma",
      titleJapanese: "雨、逃げ出した後",
      airDate: "1995-10-25",
      synopsis: "After a difficult battle, Shinji runs away from NERV and wanders Tokyo-3, questioning his purpose and relationships.",
    },
    {
      id: "019b492f-8465-7004-b35f-01df8b5e1325",
      showId: NGE_SHOW,
      episodeNumber: 5,
      title: "Rei I",
      titleJapanese: "レイ、心のむこうに",
      airDate: "1995-11-01",
      synopsis: "Shinji learns more about the mysterious Rei Ayanami and witnesses her cold relationship with his father during a reactivation test of Unit-00.",
    },
    {
      id: "019b492f-8465-7005-ae30-55cbf2ad7b1a",
      showId: NGE_SHOW,
      episodeNumber: 6,
      title: "Rei II",
      titleJapanese: "決戦、第3新東京市",
      airDate: "1995-11-08",
      synopsis: "Shinji and Rei must work together to defeat the Angel Ramiel, which is drilling through the Geofront toward NERV headquarters.",
    },
    {
      id: "019b492f-8465-7006-b399-85748d7fc96d",
      showId: NGE_SHOW,
      episodeNumber: 7,
      title: "A Human Work",
      titleJapanese: "人の造りしもの",
      airDate: "1995-11-15",
      synopsis: "NERV faces political pressure when the UN-backed Jet Alone project threatens to replace the Evangelions.",
    },
    {
      id: "019b492f-8465-7007-96e9-33f1dee09cbf",
      showId: NGE_SHOW,
      episodeNumber: 8,
      title: "Asuka Strikes!",
      titleJapanese: "アスカ、来日",
      airDate: "1995-11-22",
      synopsis: "The Second Child, Asuka Langley Soryu, arrives from Germany with Evangelion Unit-02 and immediately clashes with Shinji.",
    },
    {
      id: "019b492f-8465-7008-8da6-98ea8a70c9f4",
      showId: NGE_SHOW,
      episodeNumber: 9,
      title: "Both of You, Dance Like You Want to Win!",
      titleJapanese: "瞬間、心、重ねて",
      airDate: "1995-11-29",
      synopsis: "Shinji and Asuka must learn to synchronize their movements to defeat the Angel Israfel, which can split into two separate entities.",
    },
    {
      id: "019b492f-8465-7009-aa58-a6cd3df0b96e",
      showId: NGE_SHOW,
      episodeNumber: 10,
      title: "Magmadiver",
      titleJapanese: "マグマダイバー",
      airDate: "1995-12-06",
      synopsis: "Asuka pilots Unit-02 into a volcano to capture an Angel embryo, but the mission goes awry when the Angel hatches.",
    },
    {
      id: "019b492f-8465-700a-8a59-5c749ff2d371",
      showId: NGE_SHOW,
      episodeNumber: 11,
      title: "The Day Tokyo-3 Stood Still",
      titleJapanese: "静止した闇の中で",
      airDate: "1995-12-13",
      synopsis: "A massive power outage cripples Tokyo-3 and NERV, leaving the pilots trapped and vulnerable when an Angel attacks.",
    },
    {
      id: "019b492f-8465-700b-8f70-1a4df0d2bb18",
      showId: NGE_SHOW,
      episodeNumber: 12,
      title: "She Said, 'Don't Make Others Suffer for Your Personal Hatred.'",
      titleJapanese: "奇跡の価値は",
      airDate: "1995-12-20",
      synopsis: "Misato confronts her past during a mission to destroy an Angel in orbit, reflecting on her father and her motivations.",
    },
    {
      id: "019b492f-8465-700c-9ed6-39480ce4a3d7",
      showId: NGE_SHOW,
      episodeNumber: 13,
      title: "Lilliputian Hitcher",
      titleJapanese: "使徒、侵入",
      airDate: "1995-12-27",
      synopsis: "A microscopic Angel infiltrates the MAGI supercomputer system, forcing Ritsuko to confront her mother's legacy.",
    },
    {
      id: "019b492f-8465-700d-9c1f-579632c3a5f9",
      showId: NGE_SHOW,
      episodeNumber: 14,
      title: "Weaving a Story",
      titleJapanese: "ゼーレ、魂の座",
      airDate: "1996-01-03",
      synopsis: "A recap episode interspersed with new scenes showing SEELE's perspective and Rei's mysterious inner world.",
    },
    {
      id: "019b492f-8465-700e-a92e-d28d63809bb8",
      showId: NGE_SHOW,
      episodeNumber: 15,
      title: "Those Women Longed for the Touch of Others' Lips, and Thus Invited Their Kisses.",
      titleJapanese: "嘘と沈黙",
      airDate: "1996-01-10",
      synopsis: "Romantic tensions arise as Kaji returns to Tokyo-3, while Shinji experiences his first kiss with Asuka.",
    },
    {
      id: "019b492f-8465-700f-a2f0-f3fa6e4f97e5",
      showId: NGE_SHOW,
      episodeNumber: 16,
      title: "Splitting of the Breast",
      titleJapanese: "死に至る病、そして",
      airDate: "1996-01-17",
      synopsis: "Shinji is absorbed into the Angel Leliel and experiences a psychological journey through his own mind.",
    },
    {
      id: "019b492f-8465-7010-a795-afcaa41ed548",
      showId: NGE_SHOW,
      episodeNumber: 17,
      title: "Fourth Child",
      titleJapanese: "四人目の適格者",
      airDate: "1996-01-24",
      synopsis: "NERV identifies the Fourth Child for the new Evangelion Unit-03, with the choice having profound implications.",
    },
    {
      id: "019b492f-8465-7011-a180-5e1fa8e3577c",
      showId: NGE_SHOW,
      episodeNumber: 18,
      title: "Ambivalence",
      titleJapanese: "命の選択を",
      airDate: "1996-01-31",
      synopsis: "Unit-03 is taken over by an Angel during its activation test, forcing Shinji into an impossible situation.",
    },
    {
      id: "019b492f-8465-7012-b5de-0a2f64ef42f6",
      showId: NGE_SHOW,
      episodeNumber: 19,
      title: "Introjection",
      titleJapanese: "男の戰い",
      airDate: "1996-02-07",
      synopsis: "After refusing to pilot, Shinji watches helplessly as Unit-01 goes berserk against the powerful Angel Zeruel.",
    },
    {
      id: "019b492f-8465-7013-9f88-14315c9d30df",
      showId: NGE_SHOW,
      episodeNumber: 20,
      title: "Weaving a Story 2: Oral Stage",
      titleJapanese: "心のかたち 人のかたち",
      airDate: "1996-02-14",
      synopsis: "Shinji is absorbed into Unit-01 after its awakening, and NERV attempts to recover him while exploring his memories.",
    },
    {
      id: "019b492f-8465-7014-bfa6-2a5f007005fd",
      showId: NGE_SHOW,
      episodeNumber: 21,
      title: "He Was Aware That He Was Still a Child",
      titleJapanese: "ネルフ、誕生",
      airDate: "1996-02-21",
      synopsis: "Flashbacks reveal the history of NERV, the truth about the Second Impact, and the complex relationships between key personnel.",
    },
    {
      id: "019b492f-8465-7015-9345-642da2140c42",
      showId: NGE_SHOW,
      episodeNumber: 22,
      title: "Don't Be.",
      titleJapanese: "せめて、人間らしく",
      airDate: "1996-02-28",
      synopsis: "Asuka's sync rate drops as she battles the Angel Arael, which psychologically attacks her, revealing her traumatic past.",
    },
    {
      id: "019b492f-8465-7016-8e22-13e7381c5b78",
      showId: NGE_SHOW,
      episodeNumber: 23,
      title: "Rei III",
      titleJapanese: "涙",
      airDate: "1996-03-06",
      synopsis: "The truth about Rei Ayanami is revealed as she sacrifices herself to destroy the Angel Armisael.",
    },
    {
      id: "019b492f-8465-7017-8b2a-2cd062a231d6",
      showId: NGE_SHOW,
      episodeNumber: 24,
      title: "The Beginning and the End, or 'Knockin' on Heaven's Door'",
      titleJapanese: "最後のシ者",
      airDate: "1996-03-13",
      synopsis: "Kaworu Nagisa, the Fifth Child, befriends Shinji but is revealed to be the final Angel, Tabris.",
    },
    {
      id: "019b492f-8465-7018-b565-6924fdf3e6d3",
      showId: NGE_SHOW,
      episodeNumber: 25,
      title: "Do You Love Me?",
      titleJapanese: "終わる世界",
      airDate: "1996-03-20",
      synopsis: "As Instrumentality begins, the characters undergo psychological introspection, questioning their existence and relationships.",
    },
    {
      id: "019b492f-8465-7019-a0cc-4cdc5e84db1c",
      showId: NGE_SHOW,
      episodeNumber: 26,
      title: "Take Care of Yourself.",
      titleJapanese: "世界の中心でアイを叫んだけもの",
      airDate: "1996-03-27",
      synopsis: "The series concludes with Shinji's internal journey toward self-acceptance, culminating in a message of hope and congratulations.",
    },
  ];

  for (const episode of episodes) {
    insertEpisode.run(
      episode.id,
      episode.showId,
      episode.episodeNumber,
      episode.title,
      episode.titleJapanese,
      episode.airDate,
      episode.synopsis
    );
  }

  // Angels table
  db.run(`
    CREATE TABLE IF NOT EXISTS angels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      number INTEGER NOT NULL,
      description TEXT NOT NULL
    )
  `);

  const insertAngel = db.prepare(
    "INSERT INTO angels (id, name, name_japanese, number, description) VALUES (?, ?, ?, ?, ?)"
  );

  const ANGEL_IDS = {
    adam: "019b4942-6ba6-7000-b4c3-bcde78d7ef7a",
    lilith: "019b4942-6ba6-7001-9dbf-5d4564002a02",
    sachiel: "019b4942-6ba6-7002-8642-12737a5ad140",
    shamshel: "019b4942-6ba6-7003-9ad7-451cb89f665f",
    ramiel: "019b4942-6ba6-7004-abbd-78b47f6f2813",
    gaghiel: "019b4942-6ba6-7005-a8e7-5e90f5e108c6",
    israfel: "019b4942-6ba6-7006-ad7f-477ac503e22f",
    sandalphon: "019b4942-6ba6-7007-b9cf-25153d6db589",
    matarael: "019b4942-6ba6-7008-8c54-a0d1a92f6a07",
    sahaquiel: "019b4942-6ba6-7009-ba95-8303557856bf",
    ireul: "019b4942-6ba6-700a-b673-dfc0bcb8c0c9",
    leliel: "019b4942-6ba6-700b-b2c2-a6a9867d1135",
    bardiel: "019b4942-6ba6-700c-93d8-db60b0cadfd2",
    zeruel: "019b4942-6ba6-700d-b4f9-4654f0078550",
    arael: "019b4942-6ba6-700e-a4ad-49e657db7e39",
    armisael: "019b4942-6ba6-700f-816d-9994ec3bd985",
    tabris: "019b4942-6ba6-7010-8d0a-b5ca4a58a4fc",
  };

  const angels = [
    {
      id: ANGEL_IDS.adam,
      name: "Adam",
      nameJapanese: "アダム",
      number: 1,
      description: "The First Angel, the progenitor of the other Angels. Adam was discovered in Antarctica and its awakening caused the Second Impact. Its embryonic form was later recovered and used in NERV's experiments.",
    },
    {
      id: ANGEL_IDS.lilith,
      name: "Lilith",
      nameJapanese: "リリス",
      number: 2,
      description: "The Second Angel, the progenitor of humanity. Lilith is crucified in Terminal Dogma beneath NERV headquarters. The Evangelions are actually clones derived from Lilith, not Adam.",
    },
    {
      id: ANGEL_IDS.sachiel,
      name: "Sachiel",
      nameJapanese: "サキエル",
      number: 3,
      description: "The Third Angel and the first to attack Tokyo-3. A humanoid Angel with a distinctive bird-like mask face. Defeated by Evangelion Unit-01 piloted by Shinji Ikari in his first battle.",
    },
    {
      id: ANGEL_IDS.shamshel,
      name: "Shamshel",
      nameJapanese: "シャムシェル",
      number: 4,
      description: "The Fourth Angel, an insectoid creature with energy whips for arms. Shinji defeats it in close combat, though NERV is frustrated that its core was destroyed rather than captured for study.",
    },
    {
      id: ANGEL_IDS.ramiel,
      name: "Ramiel",
      nameJapanese: "ラミエル",
      number: 5,
      description: "The Fifth Angel, a massive floating blue octahedron with a powerful particle beam and strong AT Field. Defeated through Operation Yashima using a positron rifle powered by Japan's entire electrical grid.",
    },
    {
      id: ANGEL_IDS.gaghiel,
      name: "Gaghiel",
      nameJapanese: "ガギエル",
      number: 6,
      description: "The Sixth Angel, an aquatic Angel resembling a massive fish. It attacks the UN Pacific Fleet during the transport of Unit-02. Defeated by Asuka and Shinji working together in Unit-02.",
    },
    {
      id: ANGEL_IDS.israfel,
      name: "Israfel",
      nameJapanese: "イスラフェル",
      number: 7,
      description: "The Seventh Angel, capable of splitting into two separate entities that must be destroyed simultaneously. Defeated by Shinji and Asuka performing a synchronized attack after extensive training.",
    },
    {
      id: ANGEL_IDS.sandalphon,
      name: "Sandalphon",
      nameJapanese: "サンダルフォン",
      number: 8,
      description: "The Eighth Angel, discovered in embryonic form within a volcano. NERV attempts to capture it, but it hatches during the operation. Defeated by Asuka in Unit-02 in an underwater battle.",
    },
    {
      id: ANGEL_IDS.matarael,
      name: "Matarael",
      nameJapanese: "マトリエル",
      number: 9,
      description: "The Ninth Angel, a spider-like creature that attacks during a citywide power outage. It secretes a powerful acid from its central eye. Defeated by all three Eva pilots working together.",
    },
    {
      id: ANGEL_IDS.sahaquiel,
      name: "Sahaquiel",
      nameJapanese: "サハクィエル",
      number: 10,
      description: "The Tenth Angel, a massive orbital Angel that drops pieces of itself as bombs. It attempts to destroy NERV by falling on it directly. Caught and destroyed by all three Evangelion units.",
    },
    {
      id: ANGEL_IDS.ireul,
      name: "Ireul",
      nameJapanese: "イロウル",
      number: 11,
      description: "The Eleventh Angel, a microscopic, computer virus-like entity that infiltrates the MAGI supercomputer system. Defeated by Ritsuko through a biological hack that accelerated its evolution to death.",
    },
    {
      id: ANGEL_IDS.leliel,
      name: "Leliel",
      nameJapanese: "レリエル",
      number: 12,
      description: "The Twelfth Angel, whose true body is a shadow-like Dirac Sea that absorbs Unit-01 and Shinji. Its spherical appearance is actually its shadow. Unit-01 escapes by going berserk.",
    },
    {
      id: ANGEL_IDS.bardiel,
      name: "Bardiel",
      nameJapanese: "バルディエル",
      number: 13,
      description: "The Thirteenth Angel, a parasitic entity that infects Evangelion Unit-03 during its activation test. The Dummy Plug system in Unit-01 brutally destroys it, severely injuring pilot Toji Suzuhara.",
    },
    {
      id: ANGEL_IDS.zeruel,
      name: "Zeruel",
      nameJapanese: "ゼルエル",
      number: 14,
      description: "The Fourteenth Angel, one of the most powerful. A humanoid Angel with razor-sharp ribbon-like arms. Defeats Units 00 and 02 before being consumed by a berserk Unit-01, which absorbs its S² Engine.",
    },
    {
      id: ANGEL_IDS.arael,
      name: "Arael",
      nameJapanese: "アラエル",
      number: 15,
      description: "The Fifteenth Angel, an orbital entity that psychologically attacks Asuka with a beam of light, forcing her to relive traumatic memories. Destroyed by Rei using the Lance of Longinus.",
    },
    {
      id: ANGEL_IDS.armisael,
      name: "Armisael",
      nameJapanese: "アルミサエル",
      number: 16,
      description: "The Sixteenth Angel, a ring-shaped entity that attempts to merge with Unit-00 and Rei. Rei sacrifices herself and Unit-00 to destroy it, revealing her nature as a clone.",
    },
    {
      id: ANGEL_IDS.tabris,
      name: "Tabris (Kaworu Nagisa)",
      nameJapanese: "タブリス（渚カヲル）",
      number: 17,
      description: "The Seventeenth and final Angel, who takes human form as Kaworu Nagisa. He befriends Shinji before revealing his nature and attempting to initiate Third Impact. Killed by Shinji in Unit-01.",
    },
  ];

  for (const angel of angels) {
    insertAngel.run(
      angel.id,
      angel.name,
      angel.nameJapanese,
      angel.number,
      angel.description
    );
  }

  // Episode IDs for junction table references
  const EP_IDS = {
    ep1: "019b492f-8465-7000-bb58-88b18b1c1c8c",
    ep2: "019b492f-8465-7001-8b63-c4863cd09e51",
    ep3: "019b492f-8465-7002-b189-d2594083307b",
    ep4: "019b492f-8465-7003-be1c-77509f5cab70",
    ep5: "019b492f-8465-7004-b35f-01df8b5e1325",
    ep6: "019b492f-8465-7005-ae30-55cbf2ad7b1a",
    ep7: "019b492f-8465-7006-b399-85748d7fc96d",
    ep8: "019b492f-8465-7007-96e9-33f1dee09cbf",
    ep9: "019b492f-8465-7008-8da6-98ea8a70c9f4",
    ep10: "019b492f-8465-7009-aa58-a6cd3df0b96e",
    ep11: "019b492f-8465-700a-8a59-5c749ff2d371",
    ep12: "019b492f-8465-700b-8f70-1a4df0d2bb18",
    ep13: "019b492f-8465-700c-9ed6-39480ce4a3d7",
    ep14: "019b492f-8465-700d-9c1f-579632c3a5f9",
    ep15: "019b492f-8465-700e-a92e-d28d63809bb8",
    ep16: "019b492f-8465-700f-a2f0-f3fa6e4f97e5",
    ep17: "019b492f-8465-7010-a795-afcaa41ed548",
    ep18: "019b492f-8465-7011-a180-5e1fa8e3577c",
    ep19: "019b492f-8465-7012-b5de-0a2f64ef42f6",
    ep20: "019b492f-8465-7013-9f88-14315c9d30df",
    ep21: "019b492f-8465-7014-bfa6-2a5f007005fd",
    ep22: "019b492f-8465-7015-9345-642da2140c42",
    ep23: "019b492f-8465-7016-8e22-13e7381c5b78",
    ep24: "019b492f-8465-7017-8b2a-2cd062a231d6",
    ep25: "019b492f-8465-7018-b565-6924fdf3e6d3",
    ep26: "019b492f-8465-7019-a0cc-4cdc5e84db1c",
  };

  const ALL_EPISODES = Object.values(EP_IDS);

  // Character-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS character_episodes (
      character_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (character_id, episode_id),
      FOREIGN KEY (character_id) REFERENCES characters(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  const insertCharacterEpisode = db.prepare(
    "INSERT INTO character_episodes (character_id, episode_id) VALUES (?, ?)"
  );

  // Shinji appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertCharacterEpisode.run(CHAR_IDS.shinji, epId);
  }

  // Rei appears in most episodes (1-6, 9, 11, 14, 16, 19-26)
  const reiEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep5, EP_IDS.ep6,
    EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep14, EP_IDS.ep16,
    EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21, EP_IDS.ep22, EP_IDS.ep23,
    EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of reiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.rei, epId);
  }

  // Asuka appears from episode 8 onwards
  const asukaEpisodes = ALL_EPISODES.slice(7); // ep8-26
  for (const epId of asukaEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.asuka, epId);
  }

  // Misato appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertCharacterEpisode.run(CHAR_IDS.misato, epId);
  }

  // Gendo appears in most episodes
  const gendoEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep5, EP_IDS.ep6,
    EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep13, EP_IDS.ep14, EP_IDS.ep15,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21,
    EP_IDS.ep23, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of gendoEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.gendo, epId);
  }

  // Kaworu appears in episode 24 primarily
  const kaworuEpisodes = [EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26];
  for (const epId of kaworuEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kaworu, epId);
  }

  // Ritsuko appears in many episodes
  const ritsukoEpisodes = [
    EP_IDS.ep1, EP_IDS.ep2, EP_IDS.ep5, EP_IDS.ep6, EP_IDS.ep7,
    EP_IDS.ep10, EP_IDS.ep11, EP_IDS.ep12, EP_IDS.ep13, EP_IDS.ep14,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20, EP_IDS.ep21,
    EP_IDS.ep23, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of ritsukoEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.ritsuko, epId);
  }

  // Fuyutsuki appears in several episodes
  const fuyutsukiEpisodes = [
    EP_IDS.ep1, EP_IDS.ep5, EP_IDS.ep6, EP_IDS.ep7, EP_IDS.ep12,
    EP_IDS.ep14, EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep19, EP_IDS.ep20,
    EP_IDS.ep21, EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of fuyutsukiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.fuyutsuki, epId);
  }

  // Toji appears in episodes 3-4, 8-9, 11, 17-18, 26
  const tojiEpisodes = [
    EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9, EP_IDS.ep11,
    EP_IDS.ep17, EP_IDS.ep18, EP_IDS.ep26,
  ];
  for (const epId of tojiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.toji, epId);
  }

  // Kensuke appears in episodes 3-4, 8-9, 11, 26
  const kensukeEpisodes = [
    EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep26,
  ];
  for (const epId of kensukeEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kensuke, epId);
  }

  // Hikari appears in episodes 3, 9, 11, 17, 26
  const hikariEpisodes = [
    EP_IDS.ep3, EP_IDS.ep9, EP_IDS.ep11, EP_IDS.ep17, EP_IDS.ep26,
  ];
  for (const epId of hikariEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.hikari, epId);
  }

  // Kaji appears in episodes 8, 10, 12, 15, 17, 18, 21
  const kajiEpisodes = [
    EP_IDS.ep8, EP_IDS.ep10, EP_IDS.ep12, EP_IDS.ep15, EP_IDS.ep17,
    EP_IDS.ep18, EP_IDS.ep21,
  ];
  for (const epId of kajiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.kaji, epId);
  }

  // Yui appears in flashbacks: episodes 16, 20, 21, 25, 26
  const yuiEpisodes = [
    EP_IDS.ep16, EP_IDS.ep20, EP_IDS.ep21, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of yuiEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.yui, epId);
  }

  // Pen Pen appears in domestic scenes throughout
  const penpenEpisodes = [
    EP_IDS.ep2, EP_IDS.ep3, EP_IDS.ep4, EP_IDS.ep8, EP_IDS.ep9,
    EP_IDS.ep10, EP_IDS.ep11, EP_IDS.ep15, EP_IDS.ep26,
  ];
  for (const epId of penpenEpisodes) {
    insertCharacterEpisode.run(CHAR_IDS.penpen, epId);
  }

  // Mari doesn't appear in the TV series (Rebuild only)

  // Organization-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS organization_episodes (
      organization_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (organization_id, episode_id),
      FOREIGN KEY (organization_id) REFERENCES organizations(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  const insertOrgEpisode = db.prepare(
    "INSERT INTO organization_episodes (organization_id, episode_id) VALUES (?, ?)"
  );

  // NERV appears in all episodes
  for (const epId of ALL_EPISODES) {
    insertOrgEpisode.run(ORG_IDS.nerv, epId);
  }

  // SEELE appears in committee scenes
  const seeleEpisodes = [
    EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep14, EP_IDS.ep17, EP_IDS.ep21,
    EP_IDS.ep24, EP_IDS.ep25, EP_IDS.ep26,
  ];
  for (const epId of seeleEpisodes) {
    insertOrgEpisode.run(ORG_IDS.seele, epId);
  }

  // Gehirn appears in flashbacks
  const gehirnEpisodes = [EP_IDS.ep21];
  for (const epId of gehirnEpisodes) {
    insertOrgEpisode.run(ORG_IDS.gehirn, epId);
  }

  // Japanese Government appears occasionally
  const japanGovEpisodes = [EP_IDS.ep7, EP_IDS.ep12, EP_IDS.ep17];
  for (const epId of japanGovEpisodes) {
    insertOrgEpisode.run(ORG_IDS.japanGov, epId);
  }

  // UN appears in political episodes
  const unEpisodes = [EP_IDS.ep7, EP_IDS.ep12];
  for (const epId of unEpisodes) {
    insertOrgEpisode.run(ORG_IDS.un, epId);
  }

  // WILLE doesn't appear in the TV series (Rebuild only)

  // Angel-Episode junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS angel_episodes (
      angel_id TEXT NOT NULL,
      episode_id TEXT NOT NULL,
      PRIMARY KEY (angel_id, episode_id),
      FOREIGN KEY (angel_id) REFERENCES angels(id),
      FOREIGN KEY (episode_id) REFERENCES episodes(id)
    )
  `);

  const insertAngelEpisode = db.prepare(
    "INSERT INTO angel_episodes (angel_id, episode_id) VALUES (?, ?)"
  );

  // Adam appears in flashbacks and Episode 21
  insertAngelEpisode.run(ANGEL_IDS.adam, EP_IDS.ep15);
  insertAngelEpisode.run(ANGEL_IDS.adam, EP_IDS.ep21);

  // Lilith appears when revealed in Terminal Dogma
  insertAngelEpisode.run(ANGEL_IDS.lilith, EP_IDS.ep15);
  insertAngelEpisode.run(ANGEL_IDS.lilith, EP_IDS.ep24);

  // Sachiel - Episodes 1-2
  insertAngelEpisode.run(ANGEL_IDS.sachiel, EP_IDS.ep1);
  insertAngelEpisode.run(ANGEL_IDS.sachiel, EP_IDS.ep2);

  // Shamshel - Episode 3
  insertAngelEpisode.run(ANGEL_IDS.shamshel, EP_IDS.ep3);

  // Ramiel - Episodes 5-6
  insertAngelEpisode.run(ANGEL_IDS.ramiel, EP_IDS.ep5);
  insertAngelEpisode.run(ANGEL_IDS.ramiel, EP_IDS.ep6);

  // Gaghiel - Episode 8
  insertAngelEpisode.run(ANGEL_IDS.gaghiel, EP_IDS.ep8);

  // Israfel - Episode 9
  insertAngelEpisode.run(ANGEL_IDS.israfel, EP_IDS.ep9);

  // Sandalphon - Episode 10
  insertAngelEpisode.run(ANGEL_IDS.sandalphon, EP_IDS.ep10);

  // Matarael - Episode 11
  insertAngelEpisode.run(ANGEL_IDS.matarael, EP_IDS.ep11);

  // Sahaquiel - Episode 12
  insertAngelEpisode.run(ANGEL_IDS.sahaquiel, EP_IDS.ep12);

  // Ireul - Episode 13
  insertAngelEpisode.run(ANGEL_IDS.ireul, EP_IDS.ep13);

  // Leliel - Episode 16
  insertAngelEpisode.run(ANGEL_IDS.leliel, EP_IDS.ep16);

  // Bardiel - Episodes 17-18
  insertAngelEpisode.run(ANGEL_IDS.bardiel, EP_IDS.ep17);
  insertAngelEpisode.run(ANGEL_IDS.bardiel, EP_IDS.ep18);

  // Zeruel - Episode 19
  insertAngelEpisode.run(ANGEL_IDS.zeruel, EP_IDS.ep19);

  // Arael - Episode 22
  insertAngelEpisode.run(ANGEL_IDS.arael, EP_IDS.ep22);

  // Armisael - Episode 23
  insertAngelEpisode.run(ANGEL_IDS.armisael, EP_IDS.ep23);

  // Tabris (Kaworu) - Episode 24
  insertAngelEpisode.run(ANGEL_IDS.tabris, EP_IDS.ep24);

  // Character-Organization relationships
  // NERV members
  const nervMembers = [
    CHAR_IDS.shinji,
    CHAR_IDS.rei,
    CHAR_IDS.asuka,
    CHAR_IDS.misato,
    CHAR_IDS.gendo,
    CHAR_IDS.kaworu,
    CHAR_IDS.ritsuko,
    CHAR_IDS.fuyutsuki,
    CHAR_IDS.toji,
    CHAR_IDS.kaji,
  ];
  for (const charId of nervMembers) {
    insertCharacterOrg.run(charId, ORG_IDS.nerv);
  }

  // SEELE members
  insertCharacterOrg.run(CHAR_IDS.gendo, ORG_IDS.seele);
  insertCharacterOrg.run(CHAR_IDS.kaworu, ORG_IDS.seele);
  insertCharacterOrg.run(CHAR_IDS.kaji, ORG_IDS.seele);

  // WILLE members (Rebuild)
  insertCharacterOrg.run(CHAR_IDS.misato, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.ritsuko, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.asuka, ORG_IDS.wille);
  insertCharacterOrg.run(CHAR_IDS.mari, ORG_IDS.wille);

  // Gehirn members
  insertCharacterOrg.run(CHAR_IDS.yui, ORG_IDS.gehirn);
  insertCharacterOrg.run(CHAR_IDS.gendo, ORG_IDS.gehirn);
  insertCharacterOrg.run(CHAR_IDS.fuyutsuki, ORG_IDS.gehirn);

  // Japanese Government
  insertCharacterOrg.run(CHAR_IDS.kaji, ORG_IDS.japanGov);
}
