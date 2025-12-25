import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { episodes } from ".";

const app = new Elysia().use(episodes);

describe("Episodes", () => {
  describe("GET /episodes", () => {
    it("returns a list of all episodes", async () => {
      const response = await app.handle(
        new Request("http://localhost/episodes"),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const episode = data[0];
      expect(episode).toHaveProperty("id");
      expect(episode).toHaveProperty("episodeNumber");
      expect(episode).toHaveProperty("title");
      expect(episode).toHaveProperty("titleJapanese");
      expect(episode).toHaveProperty("airDate");
      expect(episode).toHaveProperty("synopsis");
    });

    it("returns episodes sorted by episode number", async () => {
      const response = await app.handle(
        new Request("http://localhost/episodes"),
      );

      const data = await response.json();
      const numbers = data.map(
        (episode: { episodeNumber: number }) => episode.episodeNumber,
      );

      for (let i = 1; i < numbers.length; i++) {
        expect(numbers[i]).toBeGreaterThanOrEqual(numbers[i - 1]);
      }
    });
  });

  describe("GET /episodes/:id", () => {
    const validEpisodeId = "019b492f-8465-7000-bb58-88b18b1c1c8c"; // Episode 1

    it("returns an episode by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/episodes/${validEpisodeId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validEpisodeId);
      expect(data.title).toBe("Angel Attack");
      expect(data.episodeNumber).toBe(1);
    });

    it("returns 404 for non-existent episode", async () => {
      const nonExistentId = "019b492f-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/episodes/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /episodes/:id/characters", () => {
    const validEpisodeId = "019b492f-8465-7000-bb58-88b18b1c1c8c"; // Episode 1

    it("returns characters for an episode", async () => {
      const response = await app.handle(
        new Request(`http://localhost/episodes/${validEpisodeId}/characters`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent episode", async () => {
      const nonExistentId = "019b492f-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/episodes/${nonExistentId}/characters`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /episodes/:id/angels", () => {
    const validEpisodeId = "019b492f-8465-7000-bb58-88b18b1c1c8c"; // Episode 1

    it("returns angels for an episode", async () => {
      const response = await app.handle(
        new Request(`http://localhost/episodes/${validEpisodeId}/angels`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent episode", async () => {
      const nonExistentId = "019b492f-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/episodes/${nonExistentId}/angels`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /episodes/:id/organizations", () => {
    const validEpisodeId = "019b492f-8465-7000-bb58-88b18b1c1c8c"; // Episode 1

    it("returns organizations for an episode", async () => {
      const response = await app.handle(
        new Request(
          `http://localhost/episodes/${validEpisodeId}/organizations`,
        ),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent episode", async () => {
      const nonExistentId = "019b492f-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/episodes/${nonExistentId}/organizations`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /episodes/:id/show", () => {
    const validEpisodeId = "019b492f-8465-7000-bb58-88b18b1c1c8c"; // Episode 1

    it("returns the show for an episode", async () => {
      const response = await app.handle(
        new Request(`http://localhost/episodes/${validEpisodeId}/show`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("title");
      expect(data.title).toBe("Neon Genesis Evangelion");
    });

    it("returns 404 for non-existent episode", async () => {
      const nonExistentId = "019b492f-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/episodes/${nonExistentId}/show`),
      );

      expect(response.status).toBe(404);
    });
  });
});
