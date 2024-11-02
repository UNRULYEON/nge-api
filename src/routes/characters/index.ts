import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";
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

const characters = new OpenAPIHono();

characters.openapi(routes.base, async (c) => {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  return c.json(characters);
});

characters.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const character = await prisma.character.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  if (!character) {
    throw new HTTPException(404, { message: "Character not found" });
  }

  return c.json(character);
});

export default characters;
