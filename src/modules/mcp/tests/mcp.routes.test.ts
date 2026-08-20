import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { Elysia } from "elysia";

import { db } from "@/db";
import { data } from "@/db/data";
import { schema } from "@/db/schema";
import { mcp } from "@/modules/mcp/mcp.routes";

const MCP_URL = "http://localhost/v1/mcp";

const resourceJson = (contents: ReadonlyArray<{ text?: unknown } | { blob?: unknown }>) => {
  const first = contents[0];
  if (first == null || !("text" in first) || typeof first.text !== "string") {
    throw new Error("expected a text resource");
  }

  return JSON.parse(first.text) as unknown;
};

const app = new Elysia({ prefix: "/v1" }).use(mcp);

const connect = async () => {
  const transport = new StreamableHTTPClientTransport(new URL(MCP_URL), {
    fetch: (input, init) => app.handle(new Request(String(input), init)),
  });
  const client = new Client(
    { name: "nge-api-test", version: "0.0.1" },
    { versionNegotiation: { mode: "auto" } },
  );

  await client.connect(transport);

  return client;
};

beforeAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.movies).run();
  db.delete(schema.shows).run();
  db.delete(schema.studios).run();
  db.insert(schema.studios).values(data.studios).run();
  db.insert(schema.shows).values(data.shows).run();
  db.insert(schema.episodes).values(data.episodes).run();
  db.insert(schema.movies).values(data.movies).run();
});

afterAll(() => {
  db.delete(schema.episodes).run();
  db.delete(schema.movies).run();
  db.delete(schema.shows).run();
  db.delete(schema.studios).run();
});

describe("mcp routes", () => {
  describe("tools", () => {
    it("lists catalog tools", async () => {
      const client = await connect();

      try {
        const { tools } = await client.listTools();
        const names = tools.map((tool) => tool.name).toSorted();

        expect(names).toEqual([
          "get-episode",
          "get-movie",
          "get-show",
          "get-studio",
          "list-episodes",
          "list-movies",
          "list-show-episodes",
          "list-shows",
          "list-studio-movies",
          "list-studio-shows",
          "list-studios",
        ]);
      } finally {
        await client.close();
      }
    });

    it("returns studios and a studio by id", async () => {
      const client = await connect();
      const studio = data.studios[0];

      try {
        const listed = await client.callTool({ name: "list-studios", arguments: {} });
        expect(listed.isError).toBeFalsy();
        expect(listed.structuredContent).toEqual({ studios: data.studios });

        const got = await client.callTool({ name: "get-studio", arguments: { id: studio.id } });
        expect(got.isError).toBeFalsy();
        expect(got.structuredContent).toEqual({ studio });
      } finally {
        await client.close();
      }
    });

    it("returns show episodes for a known show", async () => {
      const client = await connect();
      const show = data.shows[0];
      const expected = data.episodes.filter((episode) => episode.show_id === show.id);

      try {
        const result = await client.callTool({
          name: "list-show-episodes",
          arguments: { id: show.id },
        });

        expect(result.isError).toBeFalsy();
        expect(result.structuredContent).toEqual({ episodes: expected });
      } finally {
        await client.close();
      }
    });

    it("returns a tool error when a studio is missing", async () => {
      const client = await connect();

      try {
        const result = await client.callTool({
          name: "get-studio",
          arguments: { id: "missing-id" },
        });

        expect(result.isError).toBe(true);
        expect(result.content).toEqual([
          { type: "text", text: 'No studio found with id "missing-id".' },
        ]);
      } finally {
        await client.close();
      }
    });
  });

  describe("resources", () => {
    it("reads catalog JSON by URI", async () => {
      const client = await connect();
      const show = data.shows[0];

      try {
        const { resources } = await client.listResources();
        const uris = resources.map((resource) => resource.uri);

        expect(uris).toContain("nge://studios");
        expect(uris).toContain(`nge://shows/${show.id}`);

        const studios = await client.readResource({ uri: "nge://studios" });
        expect(resourceJson(studios.contents)).toEqual(data.studios);

        const oneShow = await client.readResource({ uri: `nge://shows/${show.id}` });
        expect(resourceJson(oneShow.contents)).toEqual(show);
      } finally {
        await client.close();
      }
    });
  });

  describe("prompts", () => {
    it("fills the explore-show prompt", async () => {
      const client = await connect();
      const show = data.shows[0];

      try {
        const { prompts } = await client.listPrompts();
        expect(prompts.map((prompt) => prompt.name).toSorted()).toEqual([
          "explore-show",
          "explore-studio",
        ]);

        const result = await client.getPrompt({
          name: "explore-show",
          arguments: { id: show.id },
        });

        expect(result.messages[0]?.content).toEqual({
          type: "text",
          text: `Using the NGE API tools, summarize show ${show.id}. Cover its studio, air dates, synopsis, and episode list.`,
        });
      } finally {
        await client.close();
      }
    });
  });

  describe("http guards", () => {
    it("rejects a non-localhost Origin against a localhost Host", async () => {
      const response = await app.handle(
        new Request(MCP_URL, {
          method: "POST",
          headers: {
            Accept: "application/json, text/event-stream",
            "Content-Type": "application/json",
            Origin: "https://evil.example",
          },
          body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
        }),
      );

      expect(response.status).toBe(403);
      expect(await response.json()).toMatchObject({
        jsonrpc: "2.0",
        error: { message: "Invalid Origin: evil.example" },
      });
    });
  });
});
