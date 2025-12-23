import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { shows } from ".";

const app = new Elysia().use(shows);

describe("Shows", () => {
  describe("GET /shows", () => {
    it("returns a list of all shows", async () => {
      const response = await app.handle(new Request("http://localhost/shows"));

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const show = data[0];
      expect(show).toHaveProperty("id");
      expect(show).toHaveProperty("title");
      expect(show).toHaveProperty("titleJapanese");
      expect(show).toHaveProperty("episodes");
      expect(show).toHaveProperty("aired");
      expect(show).toHaveProperty("synopsis");
    });
  });

  describe("GET /shows/:id", () => {
    const validShowId = "019b490e-2484-7000-a31d-63a21df12ff4"; // NGE

    it("returns a show by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${validShowId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validShowId);
      expect(data.title).toBe("Neon Genesis Evangelion");
      expect(data.titleJapanese).toBe("新世紀エヴァンゲリオン");
      expect(data.episodes).toBe(26);
    });

    it("returns 404 for non-existent show", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/shows/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /shows/:id/episodes", () => {
    const validShowId = "019b490e-2484-7000-a31d-63a21df12ff4"; // NGE

    it("returns episodes for a show", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${validShowId}/episodes`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(26);
    });

    it("returns 404 for non-existent show", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/shows/${nonExistentId}/episodes`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /shows/:id/characters", () => {
    const validShowId = "019b490e-2484-7000-a31d-63a21df12ff4"; // NGE

    it("returns characters for a show", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${validShowId}/characters`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent show", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/shows/${nonExistentId}/characters`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /shows/:id/studio", () => {
    const validShowId = "019b490e-2484-7000-a31d-63a21df12ff4"; // NGE

    it("returns the studio for a show", async () => {
      const response = await app.handle(
        new Request(`http://localhost/shows/${validShowId}/studio`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name");
      expect(data.name).toBe("Gainax");
    });

    it("returns 404 for non-existent show", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/shows/${nonExistentId}/studio`),
      );

      expect(response.status).toBe(404);
    });
  });
});
