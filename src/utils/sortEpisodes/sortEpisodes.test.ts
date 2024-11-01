import { expect, test } from "vitest";
import { sortEpisodes } from "./sortEpisodes";

const EPISODES = [
  {
    number: "18",
  },
  {
    number: "19",
  },
  {
    number: "2",
  },
  {
    number: "16",
  },
];

test("Sorts episodes by number", () => {
  expect(sortEpisodes(EPISODES)).toEqual([
    { number: "2" },
    { number: "16" },
    { number: "18" },
    { number: "19" },
  ]);
});
