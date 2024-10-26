import { prisma } from "@/db";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const people = new Hono();

people.get("/", async (c) => {
  const people = await prisma.person.findMany();

  return c.json(people);
});

people.get("/:id", async (c) => {
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

people.get("/:id/written", async (c) => {
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

people.get("/:id/directed", async (c) => {
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
