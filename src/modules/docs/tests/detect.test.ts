import { describe, expect, it } from "bun:test";

import {
  hasSignatureAgent,
  isAgentUserAgent,
  prefersHtml,
  prefersMarkdown,
  wantsAgentMarkdown,
} from "@/modules/docs/detect";

describe("prefersMarkdown", () => {
  it("is false when Accept is missing or empty", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("")).toBe(false);
    expect(prefersMarkdown("   ")).toBe(false);
  });

  it("is false for browser and curl defaults", () => {
    expect(
      prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8"),
    ).toBe(false);
    expect(prefersMarkdown("*/*")).toBe(false);
  });

  it("is true when markdown is listed without html", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/x-markdown")).toBe(true);
  });

  it("is true when markdown and html share q=1 (Claude Code)", () => {
    expect(prefersMarkdown("text/markdown, text/html, */*")).toBe(true);
  });

  it("is true when markdown q is higher (Cursor, OpenCode)", () => {
    expect(
      prefersMarkdown(
        "text/markdown;q=1.0, text/x-markdown;q=0.9, text/plain;q=0.8, text/html;q=0.7",
      ),
    ).toBe(true);
  });

  it("is false when html is preferred over markdown", () => {
    expect(prefersMarkdown("text/html, text/markdown;q=0.1")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0")).toBe(false);
    expect(prefersMarkdown("text/html, text/markdown")).toBe(false);
  });
});

describe("prefersHtml", () => {
  it("is false when Accept is missing, empty, or */*", () => {
    expect(prefersHtml(null)).toBe(false);
    expect(prefersHtml("")).toBe(false);
    expect(prefersHtml("*/*")).toBe(false);
  });

  it("is true for browser Accept lists", () => {
    expect(
      prefersHtml("text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8"),
    ).toBe(true);
    expect(prefersHtml("text/html")).toBe(true);
  });

  it("is true when html is listed before markdown at the same q", () => {
    expect(prefersHtml("text/html, text/markdown")).toBe(true);
  });

  it("is false when markdown is preferred", () => {
    expect(prefersHtml("text/markdown, text/html, */*")).toBe(false);
    expect(prefersHtml("text/markdown;q=1.0, text/html;q=0.7")).toBe(false);
  });
});

describe("isAgentUserAgent", () => {
  it("is false for browsers, curl, and missing UA", () => {
    expect(isAgentUserAgent(null)).toBe(false);
    expect(isAgentUserAgent("")).toBe(false);
    expect(
      isAgentUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
    expect(isAgentUserAgent("curl/8.7.1")).toBe(false);
    expect(
      isAgentUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"),
    ).toBe(false);
  });

  it("is true for known AI agent tokens", () => {
    expect(isAgentUserAgent("Claude-Code/1.0")).toBe(true);
    expect(
      isAgentUserAgent(
        "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
      ),
    ).toBe(true);
    expect(isAgentUserAgent("Cursor")).toBe(true);
    expect(isAgentUserAgent("GPTBot/1.2")).toBe(true);
  });
});

describe("hasSignatureAgent", () => {
  it("is true only for a non-empty Signature-Agent header", () => {
    expect(hasSignatureAgent(null)).toBe(false);
    expect(hasSignatureAgent("")).toBe(false);
    expect(hasSignatureAgent("https://chatgpt.com")).toBe(true);
  });
});

describe("wantsAgentMarkdown", () => {
  it("serves markdown when Accept prefers it, regardless of User-Agent", () => {
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", { headers: { Accept: "text/markdown" } }),
      ),
    ).toBe(true);
  });

  it("serves HTML when Accept prefers it, even for known agents", () => {
    expect(wantsAgentMarkdown(new Request("http://localhost/"))).toBe(false);
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", {
          headers: { Accept: "text/html", "User-Agent": "Claude-Code/1.0" },
        }),
      ),
    ).toBe(false);
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", {
          headers: { Accept: "text/html", "Signature-Agent": "https://chatgpt.com" },
        }),
      ),
    ).toBe(false);
  });

  it("falls back to User-Agent and Signature-Agent when Accept is unspecified", () => {
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", { headers: { "User-Agent": "Claude-Code/1.0" } }),
      ),
    ).toBe(true);
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", { headers: { Accept: "*/*", "User-Agent": "Cursor" } }),
      ),
    ).toBe(true);
    expect(
      wantsAgentMarkdown(
        new Request("http://localhost/", { headers: { "Signature-Agent": "https://chatgpt.com" } }),
      ),
    ).toBe(true);
  });
});
