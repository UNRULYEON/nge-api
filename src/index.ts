import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import {
  healthRoute,
  helloWorldRoute,
  peopleRoute,
  episodesRoute,
} from "@/routes";

const app = new Hono();

app.use("*", async (c, next) => {
  await next();
  c.header("x-powered-by", "your mom");
});
app.use("*", secureHeaders());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/health", healthRoute);
app.route("/hello-world", helloWorldRoute);
app.route("/people", peopleRoute);
app.route("/episodes", episodesRoute);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
