import { describe, expect, it } from "bun:test";

import { Elysia } from "elysia";

import { base } from "@/index";
import {
  AGENT_MARKDOWN_LINK,
  AGENT_MARKDOWN_TYPE,
  AGENT_MARKDOWN_VARY,
  agentMarkdown,
} from "@/modules/docs/docs.routes";

const app = new Elysia().use(base);

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

describe("docs routes", () => {
  describe("GET /", () => {
    it("serves Scalar HTML to browsers", async () => {
      const response = await app.handle(
        new Request("http://localhost/", {
          headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "User-Agent": CHROME,
          },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
      expect(response.headers.get("vary")).toBe(AGENT_MARKDOWN_VARY);
      expect(response.headers.get("link")).toBe(AGENT_MARKDOWN_LINK);
      expect(await response.text()).toContain("<!doctype html>");
    });

    it("serves markdown when Accept prefers it", async () => {
      const response = await app.handle(
        new Request("http://localhost/", {
          headers: {
            Accept: "text/markdown;q=1.0, text/html;q=0.7",
            "User-Agent": CHROME,
          },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(AGENT_MARKDOWN_TYPE);
      expect(response.headers.get("vary")).toBe(AGENT_MARKDOWN_VARY);
      expect(await response.text()).toBe(agentMarkdown);
    });

    it("serves Scalar HTML when an agent Accept prefers HTML", async () => {
      const response = await app.handle(
        new Request("http://localhost/", {
          headers: {
            Accept: "text/html",
            "User-Agent": "Claude-Code/1.0",
          },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
      expect(await response.text()).toContain("<!doctype html>");
    });

    it("serves markdown for a known agent when Accept is unspecified", async () => {
      const response = await app.handle(
        new Request("http://localhost/", {
          headers: {
            Accept: "*/*",
            "User-Agent": "Claude-Code/1.0",
          },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(AGENT_MARKDOWN_TYPE);
      const body = await response.text();
      expect(body).toContain("POST https://nge-api.dev/v1/mcp");
      expect(body).toContain("/v1/shows");
    });
  });

  describe("GET /llms.txt", () => {
    it("always serves the agent markdown", async () => {
      const response = await app.handle(
        new Request("http://localhost/llms.txt", {
          headers: {
            Accept: "text/html",
            "User-Agent": CHROME,
          },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(AGENT_MARKDOWN_TYPE);
      expect(await response.text()).toBe(agentMarkdown);
    });
  });

  it("does not rewrite other routes when an agent Accept is sent", async () => {
    const health = await app.handle(
      new Request("http://localhost/health", { headers: { Accept: "text/markdown" } }),
    );
    expect(health.status).toBe(200);
    expect(await health.text()).toBe("OK");

    const shows = await app.handle(
      new Request("http://localhost/v1/shows", { headers: { Accept: "text/markdown" } }),
    );
    expect(shows.status).toBe(200);
    expect(shows.headers.get("content-type")).toContain("json");
  });
});
