import { createRoute, z } from "@hono/zod-openapi";
import { CharacterSchema } from "@/schemas";

const base = createRoute({
  tags: ["Characters"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CharacterSchema.array(),
        },
      },
      description: "Returns details of all characters",
    },
  },
});

const id = createRoute({
  tags: ["Characters"],
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
          example: "01JBN9BCKHZ3GSCMAD95TMR1M8",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CharacterSchema,
        },
      },
      description: "Returns details of a character",
    },
    404: {
      description: "Character not found",
    },
  },
});

const routes = {
  base,
  id,
};

export { routes };
