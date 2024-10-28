import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";

const base = createRoute({
  tags: ['People'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'Returns details of all people',
    },
  },
})

const id = createRoute({
  tags: ['People'],
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: 'id',
            in: 'path',
          },
          example: '01J8WYGT621JTJRF0TZYZY8EFP',
        }),
    })
  },
  responses: {
    200: {
      description: 'Returns details of a person',
    },
    404: {
      description: 'Episode not found',
    }
  },
})

const written = createRoute({
  tags: ['People'],
  method: 'get',
  path: '/{id}/written',
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: 'id',
            in: 'path',
          },
          example: '01J8WYGT621JTJRF0TZYZY8EFP',
        }),
    })
  },
  responses: {
    200: {
      description: 'Returns media written by a specific person',
    },
    404: {
      description: 'Episode not found',
    }
  },
})

const directed = createRoute({
  tags: ['People'],
  method: 'get',
  path: '/{id}/directed',
  request: {
    params: z.object({
      id: z
        .string()
        .min(1)
        .openapi({
          param: {
            name: 'id',
            in: 'path',
          },
          example: '01J8WYGT621JTJRF0TZYZY8EFP',
        }),
    })
  },
  responses: {
    200: {
      description: 'Returns media directed by a specific person',
    },
    404: {
      description: 'Episode not found',
    }
  },
})

const routes = {
  base,
  id,
  written,
  directed
}

const people = new OpenAPIHono();

people.openapi(routes.base, async (c) => {
  const people = await prisma.person.findMany();

  return c.json(people);
});

people.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.person.findUnique({
    where: {
      id,
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json(person);
});

people.openapi(routes.written, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    include: {
      written: {
        include: {
          episode: true,
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json(person.written);
});

people.openapi(routes.directed, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    include: {
      directed: {
        include: {
          episode: true,
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  return c.json(person.directed);
});

export default people;
