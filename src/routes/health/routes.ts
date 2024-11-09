import { createRoute } from "@hono/zod-openapi";

const base = createRoute({
  tags: ["Health"],
  method: "get",
  path: "/",
  responses: {
    200: {
      description: 'Return "OK" when the API is health',
    },
  },
});

const routes = {
  base,
};

export { routes };
