const DEFAULT_BASE_URL = "http://localhost:3000";

export function buildImageUrl(path: string | null): string | null {
  if (!path) return null;
  const base = process.env.API_BASE_URL ?? DEFAULT_BASE_URL;
  return `${base}/public/${path}`;
}
