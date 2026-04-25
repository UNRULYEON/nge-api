import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { repositories } from "@/repository";

beforeAll(() => {
  db.delete(schema.episodes).run();
  db.insert(schema.episodes).values(data.episodes).run();
});

afterAll(() => {
  db.delete(schema.episodes).run();
});

describe("episodes repository", () => {
  describe("all", () => {
    it("returns all episodes in the table", () => {
      expect(repositories.episodes.all()).toEqual(data.episodes);
    });
  });

  describe("byId", () => {
    it("returns an episode by id", () => {
      expect(repositories.episodes.byId({ id: data.episodes[0].id })).toStrictEqual(
        data.episodes[0],
      );
    });

    it("returns null when not found", () => {
      expect(repositories.episodes.byId({ id: "non-existing-id" })).toBeNull();
    });
  });

  describe("byShowId", () => {
    it("returns episodes by show id", () => {
      const showId = data.episodes[0].show_id;

      const expected = data.episodes.filter((episode) => episode.show_id === showId);

      expect(repositories.episodes.byShowId({ show_id: showId })).toStrictEqual(expected);
    });

    it("returns an empty array when no episodes are found for the show id", () => {
      expect(repositories.episodes.byShowId({ show_id: "non-existing-show-id" })).toStrictEqual([]);
    });
  });
});
