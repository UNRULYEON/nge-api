const DEFAULT_BASE_URL = "http://localhost:3000";

function resolveBaseUrl(): string {
  if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }
  return DEFAULT_BASE_URL;
}

export function buildImageUrl(path: string | null): string | null {
  if (!path) return null;
  return `${resolveBaseUrl()}/public/${path}`;
}
