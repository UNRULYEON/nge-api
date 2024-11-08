import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { secureHeaders } from "hono/secure-headers";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import type { TimingVariables } from "hono/timing";
import { apiReference } from "@scalar/hono-api-reference";
import {
  healthRoute,
  helloWorldRoute,
  peopleRoute,
  episodesRoute,
  charactersRoute,
  moviesRoute,
} from "@/routes";

const port = 3000;

type Variables = TimingVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();

app.use(timing());
app.use(logger());
app.use("*", async (c, next) => {
  await next();
  c.header("x-powered-by", "your mom");
});
app.use("*", secureHeaders());
app.use("*", etag());
app.use(prettyJSON());

app.doc("/openapi", {
  openapi: "3.0.0",
  servers: [
    { url: "https://nge-api.dev", description: "Production server" },
    { url: `http://localhost:${port}`, description: "Development server" },
  ],
  info: {
    version: "0.0.1",
    title: "NGE-API",
    description: "API for Neon Genesis Evangelion",
  },
});
app.get("/swagger", swaggerUI({ url: "/openapi" }));
app.get(
  "/",
  apiReference({
    pageTitle: "NGE API Reference",
    favicon: "/static/rei-plush-favicon.svg",
    spec: {
      url: "/openapi",
    },
  })
);

app.use("/static/*", serveStatic({ root: "./src" }));

app.route("/health", healthRoute);
app.route("/hello-world", helloWorldRoute);

app.route("/people", peopleRoute);
app.route("/episodes", episodesRoute);
app.route("/movies", moviesRoute);

app.route("/characters", charactersRoute);

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
