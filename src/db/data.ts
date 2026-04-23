import type { Show, Studio } from "@/types";

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

export const data = {
  shows,
  studios
}