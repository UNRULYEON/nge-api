import type Database from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { CHAR_HEADSHOTS, CHAR_IDS } from "./ids";

const CDN_MOUNT_PATH = "nge-cdn-files";
const CDN_DATA_FOLDER = "data";
const ASSETS_PATH = join(dirname(import.meta.path), "assets", "characters");

function copyHeadshotsToCdnFolder(): void {
  const cdnDataPath = join(CDN_MOUNT_PATH, CDN_DATA_FOLDER);

  if (!existsSync(cdnDataPath)) {
    mkdirSync(cdnDataPath, { recursive: true });
  }

  for (const filename of Object.values(CHAR_HEADSHOTS)) {
    const sourcePath = join(ASSETS_PATH, filename);
    const destPath = join(cdnDataPath, filename);

    // Skip if already exists in CDN
    if (existsSync(destPath)) {
      continue;
    }

    const sourceFile = Bun.file(sourcePath);
    if (sourceFile.size) {
      Bun.write(destPath, sourceFile);
    }
  }
}

export function initializeCharacters(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      age INTEGER,
      gender TEXT NOT NULL,
      occupations TEXT NOT NULL,
      bio TEXT NOT NULL,
      headshot_image TEXT
    )
  `);

  // Copy headshots from repo assets to CDN volume
  copyHeadshotsToCdnFolder();

  const insertCharacter = db.prepare(
    "INSERT INTO characters (id, name, name_japanese, age, gender, occupations, bio, headshot_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  );

  // Map character IDs to their headshot filenames
  const headshotMap: Record<string, string> = {
    [CHAR_IDS.shinji]: CHAR_HEADSHOTS.shinji,
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
      id: CHAR_IDS.kyoko,
      name: "Kyoko Zeppelin Soryu",
      nameJapanese: "惣流・キョウコ・ツェッペリン",
      age: null,
      gender: "Female",
      occupations: ["Scientist"],
      bio: "Asuka's mother and a scientist who worked on the Evangelion project. During a contact experiment with Evangelion Unit-02, part of her soul was absorbed into the Eva, leading to her mental breakdown and eventual suicide.",
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
    const headshot = headshotMap[character.id] ?? null;
    insertCharacter.run(
      character.id,
      character.name,
      character.nameJapanese,
      character.age,
      character.gender,
      JSON.stringify(character.occupations),
      character.bio,
      headshot,
    );
  }
}
