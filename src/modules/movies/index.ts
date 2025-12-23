import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { MoviesModel } from "./model";
import { CharactersModel } from "../characters/model";
import { StudiosModel } from "../studios/model";
import { BaseModel } from "@/utils/base-model";

export const movies = new Elysia({
  prefix: "/movies",
  tags: ["movies"],
})
  .get(
    "/",
    () => {
      return repositories.movies.getAll();
    },
    {
      detail: {
        description: "Get a list of all movies.",
      },
      response: {
        200: MoviesModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const movie = repositories.movies.getById(params.id);

      if (!movie) {
        throw new NotFoundError("NOT_FOUND");
      }

      return movie;
    },
    {
      detail: {
        description: "Get a movie by ID.",
      },
      response: {
        200: MoviesModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const movie = repositories.movies.getById(params.id);

      if (!movie) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.movies.getCharacters(params.id);
    },
    {
      detail: {
        description: "Get a list of characters for a movie.",
      },
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/studio",
    ({ params }) => {
      const movie = repositories.movies.getById(params.id);

      if (!movie) {
        throw new NotFoundError("NOT_FOUND");
      }

      const studio = repositories.movies.getStudio(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return studio;
    },
    {
      detail: {
        description: "Get the studio for a movie.",
      },
      response: {
        200: StudiosModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
