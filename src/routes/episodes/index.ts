import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";
import { EpisodeSchema, PersonSchema } from "@/schemas";
import { sortEpisodes } from "@/utils";

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

const episode = new OpenAPIHono();

episode.openapi(routes.base, async (c) => {
  const episodes = await prisma.episode.findMany({
    select: {
      id: true,
      number: true,
      titleEnglish: true,
      titleJapanese: true,
      titleRomaji: true,
    },
  });

  return c.json(sortEpisodes(episodes));
});

episode.openapi(routes.id.base, async (c) => {
  const id = c.req.param("id");

  const episode = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      number: true,
      titleEnglish: true,
      titleJapanese: true,
      titleRomaji: true,
    },
  });

  if (!episode) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(episode);
});

episode.openapi(routes.id.writers, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      writers: {
        select: {
          person: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  const writers = person.writers.map((writer) => writer.person);

  return c.json(writers);
});

episode.openapi(routes.id.directors, async (c) => {
  const id = c.req.param("id");

  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      directors: {
        select: {
          person: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  const directors = person.directors.map((director) => director.person);

  return c.json(directors);
});

export default episode;
