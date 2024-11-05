import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";
import {
  EpisodeSchema,
  PersonSchema,
  WrittenSchema,
  DirectedSchema,
} from "@/schemas";
import { sortEpisodes } from "@/utils";

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

const people = new OpenAPIHono();

people.openapi(routes.base, async (c) => {
  const people = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  return c.json(people);
});

people.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
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
    select: {
      written: {
        select: {
          episode: {
            select: {
              id: true,
              number: true,
              titleEnglish: true,
              titleJapanese: true,
              titleRomaji: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  const episodesDirected = person.written
    .map((m) => m.episode)
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return c.json({
    episodes: sortEpisodes(episodesDirected),
    movies: [],
  });
});

people.openapi(routes.directed, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    select: {
      directed: {
        select: {
          type: true,
          episode: {
            select: {
              id: true,
              number: true,
              titleEnglish: true,
              titleJapanese: true,
              titleRomaji: true,
            },
          },
          movie: {
            select: {
              id: true,
              titleEnglish: true,
              titleJapanese: true,
              titleJapaneseLiteral: true,
              titleRomaji: true,
              runTimeInMinutes: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Person not found" });
  }

  const episodesDirected = person.directed
    .map((m) => m.episode)
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const moviesDirected = person.directed
    .map((m) => m.movie)
    .filter((m): m is NonNullable<typeof m> => m !== null);

  return c.json({
    episodes: sortEpisodes(episodesDirected),
    movies: moviesDirected,
  });
});

export default people;
