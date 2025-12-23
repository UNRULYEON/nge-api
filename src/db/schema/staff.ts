import type Database from "bun:sqlite";
import { STAFF_IDS } from "./ids";

export function initializeStaff(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS staff (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_japanese TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL
    )
  `);

  const insertStaff = db.prepare(
    "INSERT INTO staff (id, name, name_japanese, role, bio) VALUES (?, ?, ?, ?, ?)"
  );

  const staff = [
    {
      id: STAFF_IDS.anno,
      name: "Hideaki Anno",
      nameJapanese: "庵野秀明",
      role: "Director",
      bio: "Creator and director of Neon Genesis Evangelion. Anno is known for his influential work in anime and his deeply personal storytelling approach. He founded Studio Khara in 2006 and directed the Rebuild of Evangelion tetralogy.",
    },
    {
      id: STAFF_IDS.sadamoto,
      name: "Yoshiyuki Sadamoto",
      nameJapanese: "貞本義行",
      role: "Character Designer",
      bio: "Character designer for Evangelion and author of the manga adaptation. Sadamoto's distinctive character designs became iconic in anime history. He also worked on FLCL, The Girl Who Leapt Through Time, and Summer Wars.",
    },
    {
      id: STAFF_IDS.tsurumaki,
      name: "Kazuya Tsurumaki",
      nameJapanese: "鶴巻和哉",
      role: "Assistant Director",
      bio: "Assistant director on the original Evangelion series and co-director on the Rebuild films. Later directed FLCL and Diebuster. Known for his dynamic action sequences and visual storytelling.",
    },
    {
      id: STAFF_IDS.sagisu,
      name: "Shiro Sagisu",
      nameJapanese: "鷺巣詩郎",
      role: "Composer",
      bio: "Composer of the Evangelion soundtrack, creating one of the most acclaimed anime scores. His work blends classical orchestration with electronic and choral elements. Also composed music for Bleach and Shin Godzilla.",
    },
    {
      id: STAFF_IDS.takahashi,
      name: "Hiroki Takahashi",
      nameJapanese: "高橋洋樹",
      role: "Art Director",
      bio: "Art director responsible for Evangelion's distinctive visual atmosphere. His work established the series' unique aesthetic combining urban landscapes with apocalyptic imagery.",
    },
    {
      id: STAFF_IDS.honda,
      name: "Takeshi Honda",
      nameJapanese: "本田雄",
      role: "Animation Director",
      bio: "Key animator and animation director on Evangelion. Honda's fluid animation style defined many of the series' most memorable sequences. He continued his work on the Rebuild films.",
    },
    {
      id: STAFF_IDS.masayuki,
      name: "Masayuki",
      nameJapanese: "摩砂雪",
      role: "Co-Director",
      bio: "Co-director on the Rebuild of Evangelion films. Masayuki brought fresh perspectives to the reimagined series while maintaining the original's thematic depth.",
    },
    {
      id: STAFF_IDS.enokido,
      name: "Yoji Enokido",
      nameJapanese: "榎戸洋司",
      role: "Writer",
      bio: "Screenplay writer for several Evangelion episodes. Enokido later wrote for Revolutionary Girl Utena, FLCL, and Star Driver, known for his unconventional narrative structures.",
    },
    {
      id: STAFF_IDS.satsukawa,
      name: "Akio Satsukawa",
      nameJapanese: "薩川昭夫",
      role: "Writer",
      bio: "Screenplay writer who contributed to multiple Evangelion episodes. His writing helped develop the series' psychological depth and character complexity.",
    },
    {
      id: STAFF_IDS.ogata,
      name: "Megumi Ogata",
      nameJapanese: "緒方恵美",
      role: "Voice Actor",
      bio: "Voice actor for Shinji Ikari in both the original series and Rebuild films. Ogata's portrayal of Shinji's vulnerability and growth became definitive for the character.",
    },
    {
      id: STAFF_IDS.miyamura,
      name: "Yuko Miyamura",
      nameJapanese: "宮村優子",
      role: "Voice Actor",
      bio: "Voice actor for Asuka Langley Soryu/Shikinami. Miyamura brought fierce energy and emotional depth to the character across all Evangelion productions.",
    },
    {
      id: STAFF_IDS.hayashibara,
      name: "Megumi Hayashibara",
      nameJapanese: "林原めぐみ",
      role: "Voice Actor",
      bio: "Voice actor for Rei Ayanami and performed the iconic ending theme 'Fly Me to the Moon.' One of the most prolific voice actors in anime history.",
    },
    {
      id: STAFF_IDS.mitsuishi,
      name: "Kotono Mitsuishi",
      nameJapanese: "三石琴乃",
      role: "Voice Actor",
      bio: "Voice actor for Misato Katsuragi. Known for her range from Sailor Moon to Evangelion, Mitsuishi created one of anime's most complex adult female characters.",
    },
    {
      id: STAFF_IDS.ishida,
      name: "Akira Ishida",
      nameJapanese: "石田彰",
      role: "Voice Actor",
      bio: "Voice actor for Kaworu Nagisa. Ishida's gentle yet enigmatic performance made Kaworu one of anime's most memorable characters despite limited screen time.",
    },
    {
      id: STAFF_IDS.tachiki,
      name: "Fumihiko Tachiki",
      nameJapanese: "立木文彦",
      role: "Voice Actor",
      bio: "Voice actor for Gendo Ikari and narrator. Tachiki's commanding presence defined the intimidating character. Also narrated the title cards throughout the series.",
    },
  ];

  for (const member of staff) {
    insertStaff.run(
      member.id,
      member.name,
      member.nameJapanese,
      member.role,
      member.bio
    );
  }
}
