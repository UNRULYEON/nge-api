import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { repositories } from "@/repository";

beforeAll(() => {
  db.delete(schema.movies).run();
  db.insert(schema.movies).values(data.movies).run();
});

afterAll(() => {
  db.delete(schema.movies).run();
});

describe("movies repository", () => {
  describe("all", () => {
    it("returns all movies in the table", () => {
      expect(repositories.movies.all()).toEqual(data.movies);
    });
  });

  describe("byId", () => {
    it("returns a show by id", () => {
      expect(repositories.movies.byId({ id: data.movies[0].id })).toStrictEqual(data.movies[0]);
    });

    it("returns null when not found", () => {
      expect(repositories.movies.byId({ id: "non-existing-id" })).toBeNull();
    });
  });

  describe("byStudioId", () => {
    it("returns movies by studio id", () => {
      expect(repositories.movies.byStudioId({ studio_id: data.movies[0].studio_id! })).toStrictEqual(
        data.movies.filter((show) => show.studio_id === data.movies[0].studio_id),
      );
    });

    it("returns an empty array when no movies are found for the studio id", () => {
      expect(repositories.movies.byStudioId({ studio_id: "non-existing-studio-id" })).toStrictEqual(
        [],
      );
    });
  });
});
