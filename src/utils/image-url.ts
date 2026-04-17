import { getRequestBaseUrl } from "./request-context";

const FALLBACK_BASE_URL = "http://localhost:3000";

export function buildImageUrl(path: string | null): string | null {
  if (!path) return null;
  const base = getRequestBaseUrl() ?? FALLBACK_BASE_URL;
  return `${base}/public/${path}`;
}
