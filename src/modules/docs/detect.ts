const MARKDOWN_TYPES = new Set(["text/markdown", "text/x-markdown"]);
const HTML_TYPES = new Set(["text/html", "application/xhtml+xml"]);

/**
 * Known AI crawler / coding-agent tokens. Matched as case-insensitive
 * substrings of User-Agent. Keep these specific so browsers and curl stay
 * on the Scalar HTML at `/`.
 */
const AGENT_UA_TOKENS = [
  "gptbot",
  "chatgpt",
  "oai-searchbot",
  "claude",
  "anthropic",
  "perplexity",
  "google-agent",
  "google-extended",
  "google-cloudvertexbot",
  "google-notebooklm",
  "meta-externalagent",
  "meta-externalfetcher",
  "ccbot",
  "cohere",
  "bytespider",
  "amazonbot",
  "applebot-extended",
  "mistralai",
  "duckassist",
  "huggingface",
  "cursor",
  "opencode",
  "copilot",
  "codex",
  "devin",
  "windsurf",
  "aider",
  "factory.ai",
  "grok",
  "xai",
  "gemini",
] as const;

type AcceptPart = {
  type: string;
  q: number;
  index: number;
};

const parseAccept = (header: string): AcceptPart[] => {
  const parts: AcceptPart[] = [];

  for (const [index, item] of header.split(",").entries()) {
    const segments = item.trim().split(";");
    const type = segments[0]?.trim().toLowerCase();
    if (!type) continue;

    let q = 1;
    for (const segment of segments.slice(1)) {
      const [key, value] = segment.trim().split("=");
      if (key?.trim() !== "q" || value == null) continue;
      const parsed = Number(value.trim());
      if (Number.isFinite(parsed)) q = parsed;
    }

    parts.push({ type, q, index });
  }

  return parts;
};

const bestPart = (parts: AcceptPart[], types: ReadonlySet<string>): AcceptPart | undefined => {
  let best: AcceptPart | undefined;

  for (const part of parts) {
    if (!types.has(part.type) || part.q <= 0) continue;
    if (best == null || part.q > best.q || (part.q === best.q && part.index < best.index)) {
      best = part;
    }
  }

  return best;
};

const beats = (winner: AcceptPart, other: AcceptPart | undefined): boolean =>
  other == null || winner.q > other.q || (winner.q === other.q && winner.index < other.index);

export const prefersMarkdown = (accept: string | null): boolean => {
  if (accept == null || accept.trim() === "") return false;

  const parts = parseAccept(accept);
  const markdown = bestPart(parts, MARKDOWN_TYPES);
  if (markdown == null) return false;

  return beats(markdown, bestPart(parts, HTML_TYPES));
};

export const prefersHtml = (accept: string | null): boolean => {
  if (accept == null || accept.trim() === "") return false;

  const parts = parseAccept(accept);
  const html = bestPart(parts, HTML_TYPES);
  if (html == null) return false;

  return beats(html, bestPart(parts, MARKDOWN_TYPES));
};

export const isAgentUserAgent = (userAgent: string | null): boolean => {
  if (userAgent == null || userAgent.trim() === "") return false;

  const lower = userAgent.toLowerCase();
  return AGENT_UA_TOKENS.some((token) => lower.includes(token));
};

export const hasSignatureAgent = (signatureAgent: string | null): boolean =>
  signatureAgent != null && signatureAgent.trim() !== "";

/** Accept wins. User-Agent / Signature-Agent are only used when Accept is unspecified. */
export const wantsAgentMarkdown = (request: Request): boolean => {
  const accept = request.headers.get("accept");
  if (prefersMarkdown(accept)) return true;
  if (prefersHtml(accept)) return false;

  return (
    isAgentUserAgent(request.headers.get("user-agent")) ||
    hasSignatureAgent(request.headers.get("signature-agent"))
  );
};
