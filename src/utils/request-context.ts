import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
  host: string;
  protocol: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

export function setRequestContext(request: Request): void {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");
  const url = new URL(request.url);

  const host = forwardedHost ?? hostHeader ?? url.host;
  const protocol = forwardedProto ?? url.protocol.replace(":", "") ?? "http";

  storage.enterWith({ host, protocol });
}

export function getRequestBaseUrl(): string | null {
  const ctx = storage.getStore();
  if (!ctx) return null;
  return `${ctx.protocol}://${ctx.host}`;
}
