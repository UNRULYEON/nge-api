import { createRoute, z } from "@hono/zod-openapi";
import { MovieSchema, PersonSchema } from "@/schemas";

const base = createRoute({
  tags: ["Movies"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: MovieSchema.array(),
        },
      },
      description: "Returns details of all movies",
    },
  },
});

const id = createRoute({
  tags: ["Movies"],
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
          example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: MovieSchema,
        },
      },
      description: "Returns details of a movie",
    },
    404: {
      description: "Movie not found",
    },
  },
});

const directors = createRoute({
  tags: ["Movies"],
  method: "get",
  path: "/{id}/directors",
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
          example: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PersonSchema.array(),
        },
      },
      description: "Returns directores of a specific movie",
    },
    404: {
      description: "Movie not found",
    },
  },
});

const routes = {
  base,
  id: {
    base: id,
    directors,
  },
};

export { routes };
