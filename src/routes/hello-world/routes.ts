import { createRoute } from "@hono/zod-openapi";

const base = createRoute({
  tags: ["Hello world"],
  method: "get",
  path: "/",
  responses: {
    200: {
      description: 'Return "Hello, world!"',
    },
  },
});

const routes = {
  base,
};

export { routes };
