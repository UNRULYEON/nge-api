import type Database from "bun:sqlite";
import { ORG_IDS } from "./ids";

export function initializeOrganizations(db: Database) {
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
    "INSERT INTO organizations (id, name, name_japanese, type, description) VALUES (?, ?, ?, ?, ?)",
  );

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
    insertOrganization.run(
      org.id,
      org.name,
      org.nameJapanese,
      org.type,
      org.description,
    );
  }
}
