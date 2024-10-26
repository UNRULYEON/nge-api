import { prisma } from "@/db";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const episode = new Hono();

episode.get("/", async (c) => {
  const episodes = await prisma.episode.findMany();

  return c.json(episodes);
});

episode.get("/:id", async (c) => {
  const id = c.req.param("id");

  const episode = await prisma.episode.findUnique({
    where: {
      id,
    },
  });

  if (!episode) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(episode);
});

episode.get("/:id/writers", async (c) => {
  const id = c.req.param("id");

  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    include: {
      writers: {
        include: {
          person: true,
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(person.writers);
});

episode.get("/:id/directors", async (c) => {
  const id = c.req.param("id");

  const person = await prisma.episode.findUnique({
    where: {
      id,
    },
    include: {
      directors: {
        include: {
          person: true,
        },
      },
    },
  });

  if (!person) {
    throw new HTTPException(404, { message: "Episode not found" });
  }

  return c.json(person.directors);
});

export default episode;
