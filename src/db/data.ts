import type { Show, Studio, Episode, Movie } from "@/types";

import { uuids } from "./uuids";

const shows: Show[] = [
  {
    id: uuids.SHOWS.nge,
    title: "Neon Genesis Evangelion",
    episodes: 26,
    aired: "1995-10-04 to 1996-03-27",
    synopsis:
      "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of NERV, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin.",
    studio_id: uuids.STUDIO_IDS.gainax,
  },
];

const studios: Studio[] = [
  {
    id: uuids.STUDIO_IDS.gainax,
    name: "Gainax",
    founded: 1984,
    location: "Tokyo, Japan",
    website: null,
  },
  {
    id: uuids.STUDIO_IDS.khara,
    name: "Khara",
    founded: 2006,
    location: "Tokyo, Japan",
    website: "https://www.khara.co.jp",
  },
  {
    id: uuids.STUDIO_IDS.tatsunoko,
    name: "Tatsunoko Production",
    founded: 1962,
    location: "Tokyo, Japan",
    website: "https://www.tatsunoko.co.jp",
  },
];

const episodes: Episode[] = [
  {
    id: uuids.EP_IDS.ep1,
    episode_number: 1,
    title: "Angel Attack",
    title_japanese: "使徒、襲来",
    air_date: "1995-10-04",
    synopsis:
      "Shinji Ikari arrives in Tokyo-3 and is recruited by his estranged father Gendo to pilot Evangelion Unit-01 against the Angel Sachiel.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep2,
    episode_number: 2,
    title: "The Beast",
    title_japanese: "見知らぬ、天井",
    air_date: "1995-10-11",
    synopsis:
      "Shinji wakes up in the hospital after his first battle and struggles to come to terms with his new role as an Eva pilot.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep3,
    episode_number: 3,
    title: "A Transfer",
    title_japanese: "鳴らない、電話",
    air_date: "1995-10-18",
    synopsis:
      "Shinji begins attending school in Tokyo-3 and meets his classmates Toji and Kensuke, while struggling to connect with others.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep4,
    episode_number: 4,
    title: "Hedgehog's Dilemma",
    title_japanese: "雨、逃げ出した後",
    air_date: "1995-10-25",
    synopsis:
      "After a difficult battle, Shinji runs away from NERV and wanders Tokyo-3, questioning his purpose and relationships.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep5,
    episode_number: 5,
    title: "Rei I",
    title_japanese: "レイ、心のむこうに",
    air_date: "1995-11-01",
    synopsis:
      "Shinji learns more about the mysterious Rei Ayanami and witnesses her cold relationship with his father during a reactivation test of Unit-00.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep6,
    episode_number: 6,
    title: "Rei II",
    title_japanese: "決戦、第3新東京市",
    air_date: "1995-11-08",
    synopsis:
      "Shinji and Rei must work together to defeat the Angel Ramiel, which is drilling through the Geofront toward NERV headquarters.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep7,
    episode_number: 7,
    title: "A Human Work",
    title_japanese: "人の造りしもの",
    air_date: "1995-11-15",
    synopsis:
      "NERV faces political pressure when Japan Heavy Chemical Industries' Jet Alone project, a nuclear-powered robot, threatens to replace the Evangelions.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep8,
    episode_number: 8,
    title: "Asuka Strikes!",
    title_japanese: "アスカ、来日",
    air_date: "1995-11-22",
    synopsis:
      "The Second Child, Asuka Langley Soryu, arrives from Germany with Evangelion Unit-02 and immediately clashes with Shinji.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep9,
    episode_number: 9,
    title: "Both of You, Dance Like You Want to Win!",
    title_japanese: "瞬間、心、重ねて",
    air_date: "1995-11-29",
    synopsis:
      "Shinji and Asuka must learn to synchronize their movements to defeat the Angel Israfel, which can split into two separate entities.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep10,
    episode_number: 10,
    title: "Magmadiver",
    title_japanese: "マグマダイバー",
    air_date: "1995-12-06",
    synopsis:
      "Asuka pilots Unit-02 into a volcano to capture an Angel embryo, but the mission goes awry when the Angel hatches.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep11,
    episode_number: 11,
    title: "The Day Tokyo-3 Stood Still",
    title_japanese: "静止した闇の中で",
    air_date: "1995-12-13",
    synopsis:
      "A massive power outage cripples Tokyo-3 and NERV, leaving the pilots trapped and vulnerable when an Angel attacks.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep12,
    episode_number: 12,
    title: "She Said, 'Don't Make Others Suffer for Your Personal Hatred.'",
    title_japanese: "奇跡の価値は",
    air_date: "1995-12-20",
    synopsis:
      "Misato confronts her past during a mission to destroy an Angel in orbit, reflecting on her father and her motivations.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep13,
    episode_number: 13,
    title: "Lilliputian Hitcher",
    title_japanese: "使徒、侵入",
    air_date: "1995-12-27",
    synopsis:
      "A microscopic Angel infiltrates the MAGI supercomputer system, forcing Ritsuko to confront her mother's legacy.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep14,
    episode_number: 14,
    title: "Weaving a Story",
    title_japanese: "ゼーレ、魂の座",
    air_date: "1996-01-03",
    synopsis:
      "A recap episode interspersed with new scenes showing SEELE's perspective and Rei's mysterious inner world.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep15,
    episode_number: 15,
    title: "Those Women Longed for the Touch of Others' Lips, and Thus Invited Their Kisses.",
    title_japanese: "嘘と沈黙",
    air_date: "1996-01-10",
    synopsis:
      "Romantic tensions arise as Kaji returns to Tokyo-3, while Shinji experiences his first kiss with Asuka.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep16,
    episode_number: 16,
    title: "Splitting of the Breast",
    title_japanese: "死に至る病、そして",
    air_date: "1996-01-17",
    synopsis:
      "Shinji is absorbed into the Angel Leliel and experiences a psychological journey through his own mind.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep17,
    episode_number: 17,
    title: "Fourth Child",
    title_japanese: "四人目の適格者",
    air_date: "1996-01-24",
    synopsis:
      "NERV identifies the Fourth Child for the new Evangelion Unit-03, with the choice having profound implications.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep18,
    episode_number: 18,
    title: "Ambivalence",
    title_japanese: "命の選択を",
    air_date: "1996-01-31",
    synopsis:
      "Unit-03 is taken over by an Angel during its activation test, forcing Shinji into an impossible situation.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep19,
    episode_number: 19,
    title: "Introjection",
    title_japanese: "男の戰い",
    air_date: "1996-02-07",
    synopsis:
      "After refusing to pilot, Shinji watches helplessly as Unit-01 goes berserk against the powerful Angel Zeruel.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep20,
    episode_number: 20,
    title: "Weaving a Story 2: Oral Stage",
    title_japanese: "心のかたち 人のかたち",
    air_date: "1996-02-14",
    synopsis:
      "Shinji is absorbed into Unit-01 after its awakening, and NERV attempts to recover him while exploring his memories.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep21,
    episode_number: 21,
    title: "He Was Aware That He Was Still a Child",
    title_japanese: "ネルフ、誕生",
    air_date: "1996-02-21",
    synopsis:
      "Flashbacks reveal the history of NERV, the truth about the Second Impact, and the complex relationships between key personnel.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep22,
    episode_number: 22,
    title: "Don't Be.",
    title_japanese: "せめて、人間らしく",
    air_date: "1996-02-28",
    synopsis:
      "Asuka's sync rate drops as she battles the Angel Arael, which psychologically attacks her, revealing her traumatic past.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep23,
    episode_number: 23,
    title: "Rei III",
    title_japanese: "涙",
    air_date: "1996-03-06",
    synopsis:
      "The truth about Rei Ayanami is revealed as she sacrifices herself to destroy the Angel Armisael.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep24,
    episode_number: 24,
    title: "The Beginning and the End, or 'Knockin' on Heaven's Door'",
    title_japanese: "最後のシ者",
    air_date: "1996-03-13",
    synopsis:
      "Kaworu Nagisa, the Fifth Child, befriends Shinji but is revealed to be the final Angel, Tabris.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep25,
    episode_number: 25,
    title: "Do You Love Me?",
    title_japanese: "終わる世界",
    air_date: "1996-03-20",
    synopsis:
      "As Instrumentality begins, the characters undergo psychological introspection, questioning their existence and relationships.",
    show_id: uuids.SHOWS.nge,
  },
  {
    id: uuids.EP_IDS.ep26,
    episode_number: 26,
    title: "Take Care of Yourself.",
    title_japanese: "世界の中心でアイを叫んだけもの",
    air_date: "1996-03-27",
    synopsis:
      "The series concludes with Shinji's internal journey toward self-acceptance, culminating in a message of hope and congratulations.",
    show_id: uuids.SHOWS.nge,
  },
];

const movies: Movie[] = [
  {
    id: uuids.MOVIE_IDS.deathAndRebirth,
    title: "Evangelion: Death and Rebirth",
    title_japanese: "新世紀エヴァンゲリオン劇場版 DEATH & REBIRTH シト新生",
    release_date: "1997-03-15",
    runtime: 101,
    studio_id: uuids.STUDIO_IDS.gainax,
    synopsis:
      "A recap of the first 24 episodes of the TV series, followed by a new ending that was later expanded into The End of Evangelion.",
  },
  {
    id: uuids.MOVIE_IDS.endOfEva,
    title: "The End of Evangelion",
    title_japanese: "新世紀エヴァンゲリオン劇場版 Air/まごころを、君に",
    release_date: "1997-07-19",
    runtime: 87,
    studio_id: uuids.STUDIO_IDS.gainax,
    synopsis:
      "Concurrent theatrical ending to the TV series, taking place during episodes 25 and 26. SEELE launches an attack on NERV headquarters, leading to a climactic confrontation.",
  },
  {
    id: uuids.MOVIE_IDS.rebuild1,
    title: "Evangelion: 1.0 You Are (Not) Alone",
    title_japanese: "ヱヴァンゲリヲン新劇場版:序",
    release_date: "2007-09-01",
    runtime: 98,
    studio_id: uuids.STUDIO_IDS.khara,
    synopsis:
      "The first film in the Rebuild of Evangelion tetralogy. A retelling of the beginning of the original series, covering the first six episodes with updated animation and some new scenes.",
  },
  {
    id: uuids.MOVIE_IDS.rebuild2,
    title: "Evangelion: 2.0 You Can (Not) Advance",
    title_japanese: "ヱヴァンゲリヲン新劇場版:破",
    release_date: "2009-06-27",
    runtime: 108,
    studio_id: uuids.STUDIO_IDS.khara,
    synopsis:
      "The second Rebuild film introduces new characters and diverges significantly from the original series. Features the activation of Unit-03 and the battle against Zeruel.",
  },
  {
    id: uuids.MOVIE_IDS.rebuild3,
    title: "Evangelion: 3.0 You Can (Not) Redo",
    title_japanese: "ヱヴァンゲリヲン新劇場版:Q",
    release_date: "2012-11-17",
    runtime: 96,
    studio_id: uuids.STUDIO_IDS.khara,
    synopsis:
      "Set 14 years after the events of the second film, Shinji awakens to find the world drastically changed. WILLE, an organization led by former NERV members, now fights against NERV.",
  },
  {
    id: uuids.MOVIE_IDS.rebuild4,
    title: "Evangelion: 3.0+1.0 Thrice Upon a Time",
    title_japanese: "シン・エヴァンゲリオン劇場版:||",
    release_date: "2021-03-08",
    runtime: 155,
    studio_id: uuids.STUDIO_IDS.khara,
    synopsis:
      "The final film in the Rebuild of Evangelion series. Shinji, Asuka, and Rei find refuge in a village while WILLE prepares for a final confrontation with NERV and Gendo Ikari.",
  },
];

export const data = {
  shows,
  studios,
  episodes,
  movies,
};
