import { serve } from "@hono/node-server";
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { secureHeaders } from "hono/secure-headers";
import {
  healthRoute,
  helloWorldRoute,
  peopleRoute,
  episodesRoute,
} from "@/routes";

const port = 3000;

const app = new OpenAPIHono()

app.use("*", async (c, next) => {
  await next();
  c.header("x-powered-by", "your mom");
});
app.use("*", secureHeaders());

app.get('/', swaggerUI({ url: '/openapi' }))
app.doc('/openapi', {
  openapi: '3.0.0',
  servers: [
    { url: 'https://nge-api.amar.sh', description: 'Production server' },
    { url: `http://localhost:${port}`, description: 'Development server' },
  ],
  info: {
    version: '0.0.1',
    title: 'NGE-API',
    description: 'API for Neon Genesis Evangelion',
  },
})

app.route("/health", healthRoute);
app.route("/hello-world", helloWorldRoute);

app.route("/people", peopleRoute);
app.route("/episodes", episodesRoute);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
