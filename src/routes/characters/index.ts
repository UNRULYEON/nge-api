import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { prisma } from "@/db";
import { routes } from "./routes";
import { repositories } from "@/repositories";

const characters = new OpenAPIHono();

characters.openapi(routes.base, async (c) => {
  const characters = await repositories.characters.get.all();

  return c.json(characters);
});

characters.openapi(routes.id, async (c) => {
  const id = c.req.param("id");

  const character = await repositories.characters.get.byId({ id });

  if (!character) {
    throw new HTTPException(404, { message: "Character not found" });
  }

  return c.json(character);
});

export default characters;
