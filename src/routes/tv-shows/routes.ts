import { createRoute, z } from "@hono/zod-openapi";
import { TVShowSchema } from "@/schemas";

const base = createRoute({
  tags: ["TV Shows"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TVShowSchema.array(),
        },
      },
      description: "Returns all TV shows",
    },
  },
});

const id = createRoute({
  tags: ["TV Shows"],
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "01JD5VYX4CP94HVVRZ31VH3111",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TVShowSchema,
        },
      },
      description: "Returns details of a TV show",
    },
    404: {
      description: "TV show not found",
    },
  },
});

const routes = {
  base,
  id,
};

export { routes };
