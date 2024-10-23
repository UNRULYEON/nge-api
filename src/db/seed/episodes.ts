import { PrismaClient } from "@/db/client.ts";
import type { Episode } from "@/types/Episode.ts";

const episodes = async (prisma: PrismaClient) => {
  return await Promise.all(NGE.map(async ({ id, number, title }) => {
    return await prisma.episode.upsert({
      create: {
        id,
        number,
        titleEnglish: title.english,
        titleJapanese: title.japanese,
        titleRomaji: title.romaji,
      },
      where: {
        id,
      },
      update: {
        number,
        titleEnglish: title.english,
        titleJapanese: title.japanese,
        titleRomaji: title.romaji,
      },
    });
  }));
};

export { episodes };

export const NGE: Episode[] = [
  {
    id: "01J8TXR9AZ891VF828HE22X5BW",
    number: "1",
    title: {
      english: "Angel Attack",
      japanese: "使徒、襲来",
      romaji: "Shito, shūrai",
    },
  },
  {
    id: "01J8TXR9AZXGY9VWC2WPBDTX13",
    number: "2",
    title: {
      english: "The Beast",
      japanese: "Mishiranu, tenjō",
      romaji: "見知らぬ、天井",
    },
  },
  {
    id: "01J8TXR9AZV1AN1VR4MHSFXGT9",
    number: "3",
    title: {
      english: "A Transfer",
      japanese: "Naranai, denwa",
      romaji: "鳴らない、電話",
    },
  },
  {
    id: "01J8TXR9AZDNZN4WF2VAKA8M0D",
    number: "4",
    title: {
      english: "Hedgehog's Dilemma",
      japanese: "Ame, nigedashita ato",
      romaji: "雨、逃げ出した後",
    },
  },
  {
    id: "01J8TXR9AZH90HX96RYNRRMJQE",
    number: "5",
    title: {
      english: "Rei I",
      japanese: "Rei, kokoro no mukō ni",
      romaji: "レイ、心のむこうに",
    },
  },
  {
    id: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
    number: "6",
    title: {
      english: "Rei II",
      japanese: "Kessen, daisan shin Tōkyō-shi",
      romaji: "決戦、第3新東京市",
    },
  },
  {
    id: "01J8TXR9AZ14NJ5T6N2T3WG94G",
    number: "7",
    title: {
      english: "A Human Work",
      japanese: "Hito no tsukurishimono",
      romaji: "人の造りしもの",
    },
  },
  {
    id: "01J8TXR9AZZE4DV6YNSBZZG6FK",
    number: "8",
    title: {
      english: "Asuka Strikes!",
      japanese: "Asuka, rainichi",
      romaji: "アスカ、来日",
    },
  },
  {
    id: "01J8TXR9AZGFHRJPG00VDERG00",
    number: "9",
    title: {
      english: "Both of You, Dance Like You Want to Win!",
      japanese: "Shunkan, kokoro, kasanete",
      romaji: "瞬間、心、重ねて",
    },
  },
  {
    id: "01J8TXR9AZ097D1QEJZYECHR5B",
    number: "10",
    title: {
      english: "MagmaDiver",
      japanese: "Magumadaibā",
      romaji: "マグマダイバー",
    },
  },
  {
    id: "01J8TXR9AZJHR3PSHFTDDDHH9F",
    number: "11",
    title: {
      english: "The Day Tokyo-3 Stood Still",
      japanese: "静止した闇の中で",
      romaji: "Seishishita yami no naka de",
    },
  },
  {
    id: "01J8TXR9AZTTPYHA8DPTPYPPM8",
    number: "12",
    title: {
      english: "She Said, 'Don't Make Others Suffer for Your Personal Hatred.'",
      japanese: "奇跡の価値は",
      romaji: "Kiseki no kachi wa",
    },
  },
  {
    id: "01J8TXR9AZC955C8839VVNX95E",
    number: "13",
    title: {
      english: "Lilliputian Hitcher",
      japanese: "Shito, shinnyū",
      romaji: "使徒、侵入",
    },
  },
  {
    id: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
    number: "14",
    title: {
      english: "Weaving a Story",
      japanese: "Zēre, tamashii no za",
      romaji: "ゼーレ、魂の座",
    },
  },
  {
    id: "01J8TXR9AZGBX3CG6H651X2MQS",
    number: "15",
    title: {
      english:
        "Those women longed for the touch of others' lips, and thus invited their kisses.",
      japanese: "Uso to chinmoku",
      romaji: "嘘と沈黙",
    },
  },
  {
    id: "01J8TXR9AZ9139190KYWPZ5BEG",
    number: "16",
    title: {
      english: "Splitting of the Breast",
      japanese: "Shi ni itaru yamai, soshite",
      romaji: "死に至る病、そして",
    },
  },
  {
    id: "01J8TXR9AZNRYKH51CRZF05TJK",
    number: "17",
    title: {
      english: "Fourth Child",
      japanese: "Yoninme no tekikakusha",
      romaji: "四人目の適格者",
    },
  },
  {
    id: "01J8TXR9AZWA9X3STXAKZDR5NX",
    number: "18",
    title: {
      english: "Ambivalence",
      japanese: "Inochi no sentaku o",
      romaji: "命の選択を",
    },
  },
  {
    id: "01J8TXR9AZYRTFXXZTG6W2HSCC",
    number: "19",
    title: {
      english: "Introjection",
      japanese: "Otoko no tatakai",
      romaji: "男の戰い",
    },
  },
  {
    id: "01J8TXR9AZBAT5XQ36G5YJXPF7",
    number: "20",
    title: {
      english: "Weaving a Story 2: oral stage",
      japanese: "Kokoro no katachi, hito no katachi",
      romaji: "心のかたち 人のかたち",
    },
  },
  {
    id: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
    number: "21",
    title: {
      english: "He was aware that he was still a child.",
      japanese: "Nerufu, tanjō",
      romaji: "ネルフ、誕生",
    },
  },
  {
    id: "01J8TXR9AZQ6HEBS12GMWQJSY4",
    number: "22",
    title: {
      english: "Don't Be.",
      japanese: "Semete, ningen rashiku",
      romaji: "せめて、人間らしく",
    },
  },
  {
    id: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
    number: "23",
    title: {
      english: "Rei III",
      japanese: "Namida",
      romaji: "涙",
    },
  },
  {
    id: "01J8TXR9AZQ8ESPQWE87E7300N",
    number: "24",
    title: {
      english: "The Beginning and the End, or 'Knockin' on Heaven's Door'",
      japanese: "Saigo no shisha",
      romaji: "最後のシ者",
    },
  },
  {
    id: "01J8TXR9AZKJT36D6RXHDKR3N1",
    number: "25",
    title: {
      english: "Do you love me?",
      japanese: "Owaru sekai",
      romaji: "終わる世界",
    },
  },
  {
    id: "01J8TXR9AZ2ZDKYCKN56F4PNER",
    number: "26",
    title: {
      english: "Take care of yourself.",
      japanese: `Sekai no chūshin de "ai" o sakenda kemono`,
      romaji: "世界の中心でアイを叫んだけもの",
    },
  },
];
