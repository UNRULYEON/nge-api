import { describe, expect, it, mock } from "bun:test";

import { Elysia } from "elysia";

import type * as ShowsRepository from "@/modules/shows/shows.repository";
import { shows as showsFixtures } from "@/test/fixtures/shows";

await mock.module("@/modules/shows/shows.repository", (): typeof ShowsRepository => ({
  repository: {
    all: () => showsFixtures,
  },
}));

const { shows } = await import("@/modules/shows/shows.routes");

const app = new Elysia().use(shows);

describe("shows", () => {
  describe("GET /shows", () => {
    it("returns a list of shows", async () => {
      const response = await app.handle(new Request("http://localhost/shows"));

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(showsFixtures);
    });
  });
});
