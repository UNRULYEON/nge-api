import { createRoute, z } from "@hono/zod-openapi";
import { EpisodeSchema, PersonSchema } from "@/schemas";

const base = createRoute({
  tags: ["Episodes"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EpisodeSchema.array(),
        },
      },
      description: "Returns details of all episodes",
    },
  },
});

const id = createRoute({
  tags: ["Episodes"],
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
          example: "01J8TXR9AZ891VF828HE22X5BW",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EpisodeSchema,
        },
      },
      description: "Returns details of an episode",
    },
    404: {
      description: "Episode not found",
    },
  },
});

const writers = createRoute({
  tags: ["Episodes"],
  method: "get",
  path: "/{id}/writers",
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
          example: "01J8TXR9AZ891VF828HE22X5BW",
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
      description: "Returns writers of a specific episode",
    },
    404: {
      description: "Episode not found",
    },
  },
});

const directors = createRoute({
  tags: ["Episodes"],
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
          example: "01J8TXR9AZ891VF828HE22X5BW",
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
      description: "Returns directores of a specific episode",
    },
    404: {
      description: "Episode not found",
    },
  },
});

const routes = {
  base,
  id: {
    base: id,
    writers,
    directors,
  },
};

export { routes };
