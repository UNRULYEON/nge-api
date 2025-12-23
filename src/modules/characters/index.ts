import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { CharactersModel } from "./model";
import { BaseModel } from "@/utils/base-model";

export const characters = new Elysia({
  prefix: "/characters",
  tags: ["characters"],
})
  .get(
    "/",
    () => {
      return repositories.characters.getAll();
    },
    {
      response: {
        200: CharactersModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return character;
    },
    {
      response: {
        200: CharactersModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
