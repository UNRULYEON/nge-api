import type Database from "bun:sqlite";
import { CHAR_IDS, EVA_IDS } from "./ids";

export function initializeEvas(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS evas (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      designation TEXT NOT NULL,
      type TEXT NOT NULL,
      soul_id TEXT,
      description TEXT NOT NULL,
      FOREIGN KEY (soul_id) REFERENCES characters(id)
    )
  `);

  const insertEva = db.prepare(
    "INSERT INTO evas (id, name, name_japanese, designation, type, soul_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const evas = [
    {
      id: EVA_IDS.unit00,
      name: "Evangelion Unit-00",
      nameJapanese: "エヴァンゲリオン零号機",
      designation: "EVA-00",
      type: "Prototype",
      soulId: null,
      description:
        "The first functional Evangelion, designated as the Prototype. It has an unstable temperament and went berserk during early activation tests. Originally orange, it was rebuilt with blue armor after being damaged. Piloted by Rei Ayanami.",
    },
    {
      id: EVA_IDS.unit01,
      name: "Evangelion Unit-01",
      nameJapanese: "エヴァンゲリオン初号機",
      designation: "EVA-01",
      type: "Test Type",
      soulId: CHAR_IDS.yui,
      description:
        "The Test Type Evangelion and the series' iconic purple mecha. Contains the soul of Yui Ikari, Shinji's mother. Known for going berserk and displaying unprecedented power. It later absorbs the S² Engine from the Angel Zeruel. Piloted by Shinji Ikari.",
    },
    {
      id: EVA_IDS.unit02,
      name: "Evangelion Unit-02",
      nameJapanese: "エヴァンゲリオン弐号機",
      designation: "EVA-02",
      type: "Production Model",
      soulId: CHAR_IDS.kyoko,
      description:
        "The first Production Model Evangelion, built in Germany. Features distinctive red armor and four-eyed head design. Contains the soul of Kyoko Zeppelin Soryu, Asuka's mother. Piloted primarily by Asuka Langley Soryu.",
    },
    {
      id: EVA_IDS.unit03,
      name: "Evangelion Unit-03",
      nameJapanese: "エヴァンゲリオン参号機",
      designation: "EVA-03",
      type: "Production Model",
      soulId: null,
      description:
        "A Production Model built in the United States. During its activation test in Japan, it was possessed by the Angel Bardiel. The Dummy Plug-controlled Unit-01 brutally destroyed it, severely injuring its pilot Toji Suzuhara.",
    },
    {
      id: EVA_IDS.unit04,
      name: "Evangelion Unit-04",
      nameJapanese: "エヴァンゲリオン四号機",
      designation: "EVA-04",
      type: "Production Model",
      soulId: null,
      description:
        "A Production Model that was being built in the United States. It was destroyed along with NERV's Second Branch during an experiment with the S² Engine, creating a massive explosion.",
    },
    {
      id: EVA_IDS.massProduction,
      name: "Mass Production Evangelions",
      nameJapanese: "エヴァンゲリオン量産機",
      designation: "EVA-05 to EVA-13",
      type: "Mass Production Model",
      soulId: null,
      description:
        "Nine identical Evangelions produced by SEELE, designated Units 05 through 13. They feature white armor, no eyes, and are equipped with Dummy Plugs based on Kaworu Nagisa. Each carries a replica of the Lance of Longinus and possesses S² Engines for unlimited power.",
    },
    {
      id: EVA_IDS.unit08,
      name: "Evangelion Unit-08",
      nameJapanese: "エヴァンゲリオン8号機",
      designation: "EVA-08",
      type: "Production Model (Rebuild)",
      soulId: null,
      description:
        "A new Evangelion appearing in the Rebuild of Evangelion series. Features distinctive pink armor and is piloted by Mari Makinami Illustrious. It can transform into various configurations and is operated by WILLE.",
    },
    {
      id: EVA_IDS.unit13,
      name: "Evangelion Unit-13",
      nameJapanese: "エヴァンゲリオン第13号機",
      designation: "EVA-13",
      type: "Special Model (Rebuild)",
      soulId: null,
      description:
        "A unique dual-entry Evangelion from the Rebuild series, requiring two pilots: Shinji Ikari and Kaworu Nagisa. It has four arms and is central to Gendo's plans in Evangelion 3.0.",
    },
    {
      id: EVA_IDS.mark06,
      name: "Evangelion Mark.06",
      nameJapanese: "エヴァンゲリオンMark.06",
      designation: "Mark.06",
      type: "Special Model (Rebuild)",
      soulId: null,
      description:
        "A mysterious Evangelion constructed on the Moon by SEELE in the Rebuild continuity. Features blue armor with a distinctive halo. Piloted by Kaworu Nagisa.",
    },
  ];

  for (const eva of evas) {
    insertEva.run(
      eva.id,
      eva.name,
      eva.nameJapanese,
      eva.designation,
      eva.type,
      eva.soulId,
      eva.description
    );
  }
}
