import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { movies } from ".";

const app = new Elysia().use(movies);

describe("Movies", () => {
  describe("GET /movies", () => {
    it("returns a list of all movies", async () => {
      const response = await app.handle(new Request("http://localhost/movies"));

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const movie = data[0];
      expect(movie).toHaveProperty("id");
      expect(movie).toHaveProperty("title");
      expect(movie).toHaveProperty("titleJapanese");
      expect(movie).toHaveProperty("releaseDate");
      expect(movie).toHaveProperty("runtime");
      expect(movie).toHaveProperty("synopsis");
    });
  });

  describe("GET /movies/:id", () => {
    const validMovieId = "019b490e-2485-7000-a616-d1c5309aa567"; // Death and Rebirth

    it("returns a movie by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/movies/${validMovieId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validMovieId);
      expect(data.title).toBe("Evangelion: Death and Rebirth");
    });

    it("returns 404 for non-existent movie", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/movies/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /movies/:id/characters", () => {
    const validMovieId = "019b490e-2485-7000-a616-d1c5309aa567"; // Death and Rebirth

    it("returns characters for a movie", async () => {
      const response = await app.handle(
        new Request(`http://localhost/movies/${validMovieId}/characters`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent movie", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/movies/${nonExistentId}/characters`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /movies/:id/studio", () => {
    const validMovieId = "019b490e-2485-7000-a616-d1c5309aa567"; // Death and Rebirth

    it("returns the studio for a movie", async () => {
      const response = await app.handle(
        new Request(`http://localhost/movies/${validMovieId}/studio`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name");
      expect(data.name).toBe("Gainax");
    });

    it("returns 404 for non-existent movie", async () => {
      const nonExistentId = "019b490e-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/movies/${nonExistentId}/studio`),
      );

      expect(response.status).toBe(404);
    });
  });
});
