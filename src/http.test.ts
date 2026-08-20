import { describe, expect, it } from "bun:test";

import { data } from "@/db/data";
import { uuids } from "@/db/uuids";
import { base } from "@/index";
import { missingId } from "@/test/list";

describe("http", () => {
  describe("CORS", () => {
    it("allows any origin", async () => {
      const response = await base.handle(
        new Request("http://localhost/v1/shows", {
          headers: { origin: "https://example.com" },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe("https://example.com");
    });
  });

  describe("Cache-Control", () => {
    it("does not cache health", async () => {
      const response = await base.handle(new Request("http://localhost/health"));

      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("no-store");
    });

    it("caches data responses", async () => {
      const response = await base.handle(new Request("http://localhost/v1/shows"));

      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("public, max-age=300");
    });

    it("caches the favicon as static", async () => {
      const response = await base.handle(new Request("http://localhost/public/favicon.svg"));

      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("public, max-age=86400");
    });
  });

  describe("trailing slashes", () => {
    it("serves the same resource with or without a trailing slash", async () => {
      const without = await base.handle(new Request("http://localhost/v1/shows"));
      const withSlash = await base.handle(new Request("http://localhost/v1/shows/"));
      const healthWithout = await base.handle(new Request("http://localhost/health"));
      const healthWith = await base.handle(new Request("http://localhost/health/"));

      expect(without.status).toBe(200);
      expect(withSlash.status).toBe(200);
      expect(await withSlash.json()).toEqual(await without.json());
      expect(healthWithout.status).toBe(200);
      expect(healthWith.status).toBe(200);
      expect(await healthWith.text()).toBe(await healthWithout.text());
    });
  });

  describe("errors", () => {
    it("returns JSON 400 for an invalid UUID", async () => {
      const response = await base.handle(new Request("http://localhost/v1/shows/not-a-uuid"));

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: "BAD_REQUEST" });
    });

    it("returns JSON 404 for a missing resource", async () => {
      const response = await base.handle(new Request(`http://localhost/v1/shows/${missingId}`));

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "NOT_FOUND" });
    });

    it("returns JSON 400 for an invalid query", async () => {
      const response = await base.handle(new Request("http://localhost/v1/episodes?limit=0"));

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: "BAD_REQUEST" });
    });
  });

  describe("show fields", () => {
    it("returns title_japanese and split air dates", async () => {
      const response = await base.handle(
        new Request(`http://localhost/v1/shows/${uuids.SHOW_IDS.nge}`),
      );

      const show = await response.json();

      expect(response.status).toBe(200);
      expect(show).toMatchObject({
        title_japanese: "新世紀エヴァンゲリオン",
        aired_from: "1995-10-04",
        aired_to: "1996-03-27",
      });
      expect(show).not.toHaveProperty("aired");
    });
  });

  describe("OpenAPI", () => {
    it("documents servers, tags, and slash-free collection paths", async () => {
      const response = await base.handle(new Request("http://localhost/openapi.json"));
      const spec = (await response.json()) as {
        servers: unknown;
        tags: { name: string }[];
        paths: Record<string, unknown>;
      };

      expect(response.status).toBe(200);
      expect(spec.servers).toEqual([
        { url: "https://nge-api.dev", description: "Production" },
        { url: "http://localhost:3000", description: "Local development" },
      ]);
      expect(spec.tags.map((tag) => tag.name)).toEqual([
        "health",
        "studios",
        "shows",
        "episodes",
        "movies",
        "mcp",
      ]);
      expect(spec.paths["/v1/shows"]).toBeDefined();
      expect(spec.paths["/v1/shows/"]).toBeUndefined();
      expect(spec.paths["/health"]).toBeDefined();
      expect(spec.paths["/health/"]).toBeUndefined();
      expect(spec.paths["/v1/episodes/{id}"]).toBeDefined();
    });
  });

  describe("pagination", () => {
    it("sorts episodes by title", async () => {
      const response = await base.handle(
        new Request("http://localhost/v1/episodes?sort=title&order=asc&limit=3"),
      );
      const body = (await response.json()) as {
        data: { title: string }[];
        meta: { total: number };
      };

      expect(response.status).toBe(200);
      expect(body.meta.total).toBe(data.episodes.length);
      expect(body.data.map((episode) => episode.title)).toEqual(
        [...data.episodes]
          .sort((a, b) => a.title.localeCompare(b.title))
          .slice(0, 3)
          .map((episode) => episode.title),
      );
    });
  });
});
