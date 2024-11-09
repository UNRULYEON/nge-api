import { createRoute, z } from "@hono/zod-openapi";
import { PersonSchema, WrittenSchema, DirectedSchema } from "@/schemas";

const base = createRoute({
  tags: ["People"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PersonSchema.array(),
        },
      },
      description: "Returns details of all people",
    },
  },
});

const id = createRoute({
  tags: ["People"],
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
          example: "01J8WYGT621JTJRF0TZYZY8EFP",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PersonSchema,
        },
      },
      description: "Returns details of a person",
    },
    404: {
      description: "Person not found",
    },
  },
});

const written = createRoute({
  tags: ["People"],
  method: "get",
  path: "/{id}/written",
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
          example: "01J8WYGT621JTJRF0TZYZY8EFP",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WrittenSchema,
        },
      },
      description: "Returns media written by a specific person",
    },
    404: {
      description: "Person not found",
    },
  },
});

const directed = createRoute({
  tags: ["People"],
  method: "get",
  path: "/{id}/directed",
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
          example: "01J8WYGT621JTJRF0TZYZY8EFP",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DirectedSchema,
        },
      },
      description: "Returns media directed by a specific person",
    },
    404: {
      description: "Person not found",
    },
  },
});

const routes = {
  base,
  id,
  written,
  directed,
};

export { routes };
