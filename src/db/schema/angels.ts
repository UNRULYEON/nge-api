import type Database from "bun:sqlite";
import { ANGEL_IDS } from "./ids";

export function initializeAngels(db: Database) {
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
    "INSERT INTO angels (id, name, name_japanese, number, description) VALUES (?, ?, ?, ?, ?)",
  );

  const angels = [
    {
      id: ANGEL_IDS.adam,
      name: "Adam",
      nameJapanese: "アダム",
      number: 1,
      description:
        "The First Angel, the progenitor of the other Angels. Adam was discovered in Antarctica and its awakening caused the Second Impact. Its embryonic form was later recovered and used in NERV's experiments.",
    },
    {
      id: ANGEL_IDS.lilith,
      name: "Lilith",
      nameJapanese: "リリス",
      number: 2,
      description:
        "The Second Angel, the progenitor of humanity. Lilith is crucified in Terminal Dogma beneath NERV headquarters. The Evangelions are actually clones derived from Lilith, not Adam.",
    },
    {
      id: ANGEL_IDS.sachiel,
      name: "Sachiel",
      nameJapanese: "サキエル",
      number: 3,
      description:
        "The Third Angel and the first to attack Tokyo-3. A humanoid Angel with a distinctive bird-like mask face. Defeated by Evangelion Unit-01 piloted by Shinji Ikari in his first battle.",
    },
    {
      id: ANGEL_IDS.shamshel,
      name: "Shamshel",
      nameJapanese: "シャムシェル",
      number: 4,
      description:
        "The Fourth Angel, an insectoid creature with energy whips for arms. Shinji defeats it in close combat, though NERV is frustrated that its core was destroyed rather than captured for study.",
    },
    {
      id: ANGEL_IDS.ramiel,
      name: "Ramiel",
      nameJapanese: "ラミエル",
      number: 5,
      description:
        "The Fifth Angel, a massive floating blue octahedron with a powerful particle beam and strong AT Field. Defeated through Operation Yashima using a positron rifle powered by Japan's entire electrical grid.",
    },
    {
      id: ANGEL_IDS.gaghiel,
      name: "Gaghiel",
      nameJapanese: "ガギエル",
      number: 6,
      description:
        "The Sixth Angel, an aquatic Angel resembling a massive fish. It attacks the UN Pacific Fleet during the transport of Unit-02. Defeated by Asuka and Shinji working together in Unit-02.",
    },
    {
      id: ANGEL_IDS.israfel,
      name: "Israfel",
      nameJapanese: "イスラフェル",
      number: 7,
      description:
        "The Seventh Angel, capable of splitting into two separate entities that must be destroyed simultaneously. Defeated by Shinji and Asuka performing a synchronized attack after extensive training.",
    },
    {
      id: ANGEL_IDS.sandalphon,
      name: "Sandalphon",
      nameJapanese: "サンダルフォン",
      number: 8,
      description:
        "The Eighth Angel, discovered in embryonic form within a volcano. NERV attempts to capture it, but it hatches during the operation. Defeated by Asuka in Unit-02 in an underwater battle.",
    },
    {
      id: ANGEL_IDS.matarael,
      name: "Matarael",
      nameJapanese: "マトリエル",
      number: 9,
      description:
        "The Ninth Angel, a spider-like creature that attacks during a citywide power outage. It secretes a powerful acid from its central eye. Defeated by all three Eva pilots working together.",
    },
    {
      id: ANGEL_IDS.sahaquiel,
      name: "Sahaquiel",
      nameJapanese: "サハクィエル",
      number: 10,
      description:
        "The Tenth Angel, a massive orbital Angel that drops pieces of itself as bombs. It attempts to destroy NERV by falling on it directly. Caught and destroyed by all three Evangelion units.",
    },
    {
      id: ANGEL_IDS.ireul,
      name: "Ireul",
      nameJapanese: "イロウル",
      number: 11,
      description:
        "The Eleventh Angel, a microscopic, computer virus-like entity that infiltrates the MAGI supercomputer system. Defeated by Ritsuko through a biological hack that accelerated its evolution to death.",
    },
    {
      id: ANGEL_IDS.leliel,
      name: "Leliel",
      nameJapanese: "レリエル",
      number: 12,
      description:
        "The Twelfth Angel, whose true body is a shadow-like Dirac Sea that absorbs Unit-01 and Shinji. Its spherical appearance is actually its shadow. Unit-01 escapes by going berserk.",
    },
    {
      id: ANGEL_IDS.bardiel,
      name: "Bardiel",
      nameJapanese: "バルディエル",
      number: 13,
      description:
        "The Thirteenth Angel, a parasitic entity that infects Evangelion Unit-03 during its activation test. The Dummy Plug system in Unit-01 brutally destroys it, severely injuring pilot Toji Suzuhara.",
    },
    {
      id: ANGEL_IDS.zeruel,
      name: "Zeruel",
      nameJapanese: "ゼルエル",
      number: 14,
      description:
        "The Fourteenth Angel, one of the most powerful. A humanoid Angel with razor-sharp ribbon-like arms. Defeats Units 00 and 02 before being consumed by a berserk Unit-01, which absorbs its S² Engine.",
    },
    {
      id: ANGEL_IDS.arael,
      name: "Arael",
      nameJapanese: "アラエル",
      number: 15,
      description:
        "The Fifteenth Angel, an orbital entity that psychologically attacks Asuka with a beam of light, forcing her to relive traumatic memories. Destroyed by Rei using the Lance of Longinus.",
    },
    {
      id: ANGEL_IDS.armisael,
      name: "Armisael",
      nameJapanese: "アルミサエル",
      number: 16,
      description:
        "The Sixteenth Angel, a ring-shaped entity that attempts to merge with Unit-00 and Rei. Rei sacrifices herself and Unit-00 to destroy it, revealing her nature as a clone.",
    },
    {
      id: ANGEL_IDS.tabris,
      name: "Tabris (Kaworu Nagisa)",
      nameJapanese: "タブリス（渚カヲル）",
      number: 17,
      description:
        "The Seventeenth and final Angel, who takes human form as Kaworu Nagisa. He befriends Shinji before revealing his nature and attempting to initiate Third Impact. Killed by Shinji in Unit-01.",
    },
  ];

  for (const angel of angels) {
    insertAngel.run(
      angel.id,
      angel.name,
      angel.nameJapanese,
      angel.number,
      angel.description,
    );
  }
}
