import { Elysia } from "elysia";

import { wantsAgentMarkdown } from "./detect";
import llms from "./llms.md" with { type: "text" };

export const AGENT_MARKDOWN_TYPE = "text/markdown; charset=utf-8";
export const AGENT_MARKDOWN_VARY = "Accept, User-Agent, Signature-Agent";
export const AGENT_MARKDOWN_LINK = '</llms.txt>; rel="alternate"; type="text/markdown"';

export const agentMarkdown = llms;

const isDocsPath = (path: string) => path === "/" || path === "";

const markdownResponse = () =>
  new Response(agentMarkdown, {
    status: 200,
    headers: {
      "content-type": AGENT_MARKDOWN_TYPE,
      vary: AGENT_MARKDOWN_VARY,
      link: AGENT_MARKDOWN_LINK,
    },
  });

export const docs = new Elysia({ name: "docs" })
  .onBeforeHandle({ as: "global" }, ({ path, request }) => {
    if (!isDocsPath(path)) return;
    if (request.method !== "GET" && request.method !== "HEAD") return;
    if (!wantsAgentMarkdown(request)) return;

    return markdownResponse();
  })
  .onAfterHandle({ as: "global" }, ({ path, set }) => {
    if (!isDocsPath(path)) return;

    set.headers["vary"] = AGENT_MARKDOWN_VARY;
    set.headers["link"] = AGENT_MARKDOWN_LINK;
  })
  .get("/llms.txt", () => markdownResponse(), {
    detail: {
      hide: true,
    },
  });
