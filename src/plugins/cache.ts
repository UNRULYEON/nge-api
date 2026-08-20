import { Elysia } from "elysia";

const DATA_CACHE = "public, max-age=300";
const HEALTH_CACHE = "no-store";
const STATIC_CACHE = "public, max-age=86400";

export const cache = new Elysia({ name: "cache" }).onAfterHandle(
  { as: "global" },
  ({ request, set }) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return;
    }

    const pathname = new URL(request.url).pathname;

    if (pathname === "/health" || pathname === "/health/") {
      set.headers["cache-control"] = HEALTH_CACHE;
      return;
    }

    if (pathname.startsWith("/public/")) {
      set.headers["cache-control"] = STATIC_CACHE;
      return;
    }

    set.headers["cache-control"] = DATA_CACHE;
  },
);
