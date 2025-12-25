import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { characters } from ".";

const app = new Elysia().use(characters);

describe("Characters", () => {
  describe("GET /characters", () => {
    it("returns a list of all characters", async () => {
      const response = await app.handle(
        new Request("http://localhost/characters"),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const character = data[0];
      expect(character).toHaveProperty("id");
      expect(character).toHaveProperty("name");
      expect(character).toHaveProperty("nameJapanese");
      expect(character).toHaveProperty("age");
      expect(character).toHaveProperty("gender");
      expect(character).toHaveProperty("occupations");
      expect(character).toHaveProperty("bio");
    });
  });

  describe("GET /characters/:id", () => {
    const validCharacterId = "019b491a-6b36-7000-9dce-eac3a1978cd9"; // Shinji

    it("returns a character by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/characters/${validCharacterId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validCharacterId);
      expect(data.name).toBe("Shinji Ikari");
      expect(data.nameJapanese).toBe("碇シンジ");
    });

    it("returns 404 for non-existent character", async () => {
      const nonExistentId = "019b491a-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/characters/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /characters/:id/shows", () => {
    const validCharacterId = "019b491a-6b36-7000-9dce-eac3a1978cd9"; // Shinji

    it("returns shows for a character", async () => {
      const response = await app.handle(
        new Request(`http://localhost/characters/${validCharacterId}/shows`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent character", async () => {
      const nonExistentId = "019b491a-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/characters/${nonExistentId}/shows`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /characters/:id/movies", () => {
    const validCharacterId = "019b491a-6b36-7000-9dce-eac3a1978cd9"; // Shinji

    it("returns movies for a character", async () => {
      const response = await app.handle(
        new Request(`http://localhost/characters/${validCharacterId}/movies`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent character", async () => {
      const nonExistentId = "019b491a-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/characters/${nonExistentId}/movies`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /characters/:id/episodes", () => {
    const validCharacterId = "019b491a-6b36-7000-9dce-eac3a1978cd9"; // Shinji

    it("returns episodes for a character", async () => {
      const response = await app.handle(
        new Request(`http://localhost/characters/${validCharacterId}/episodes`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent character", async () => {
      const nonExistentId = "019b491a-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/characters/${nonExistentId}/episodes`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /characters/:id/organizations", () => {
    const validCharacterId = "019b491a-6b36-7000-9dce-eac3a1978cd9"; // Shinji

    it("returns organizations for a character", async () => {
      const response = await app.handle(
        new Request(
          `http://localhost/characters/${validCharacterId}/organizations`,
        ),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("returns 404 for non-existent character", async () => {
      const nonExistentId = "019b491a-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(
          `http://localhost/characters/${nonExistentId}/organizations`,
        ),
      );

      expect(response.status).toBe(404);
    });
  });
});
