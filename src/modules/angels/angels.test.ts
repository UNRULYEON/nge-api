import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { angels } from ".";

const app = new Elysia().use(angels);

describe("Angels", () => {
  describe("GET /angels", () => {
    it("returns a list of all angels", async () => {
      const response = await app.handle(new Request("http://localhost/angels"));

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const angel = data[0];
      expect(angel).toHaveProperty("id");
      expect(angel).toHaveProperty("name");
      expect(angel).toHaveProperty("nameJapanese");
      expect(angel).toHaveProperty("number");
      expect(angel).toHaveProperty("description");
    });

    it("returns angels sorted by number", async () => {
      const response = await app.handle(new Request("http://localhost/angels"));

      const data = await response.json();
      const numbers = data.map((angel: { number: number }) => angel.number);

      for (let i = 1; i < numbers.length; i++) {
        expect(numbers[i]).toBeGreaterThanOrEqual(numbers[i - 1]);
      }
    });
  });

  describe("GET /angels/:id", () => {
    const validAngelId = "019b4942-6ba6-7002-8642-12737a5ad140"; // Sachiel

    it("returns an angel by ID", async () => {
      const response = await app.handle(
        new Request(`http://localhost/angels/${validAngelId}`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe(validAngelId);
      expect(data.name).toBe("Sachiel");
      expect(data.nameJapanese).toBe("サキエル");
      expect(data.number).toBe(3);
      expect(typeof data.description).toBe("string");
    });

    it("returns 404 for non-existent angel", async () => {
      const nonExistentId = "019b4942-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/angels/${nonExistentId}`),
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /angels/:id/episodes", () => {
    const validAngelId = "019b4942-6ba6-7002-8642-12737a5ad140"; // Sachiel

    it("returns episodes for an angel", async () => {
      const response = await app.handle(
        new Request(`http://localhost/angels/${validAngelId}/episodes`),
      );

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        const episode = data[0];
        expect(episode).toHaveProperty("id");
        expect(episode).toHaveProperty("episodeNumber");
        expect(episode).toHaveProperty("title");
        expect(episode).toHaveProperty("titleJapanese");
        expect(episode).toHaveProperty("airDate");
        expect(episode).toHaveProperty("synopsis");
      }
    });

    it("returns 404 for non-existent angel", async () => {
      const nonExistentId = "019b4942-0000-0000-0000-000000000000";
      const response = await app.handle(
        new Request(`http://localhost/angels/${nonExistentId}/episodes`),
      );

      expect(response.status).toBe(404);
    });
  });
});
