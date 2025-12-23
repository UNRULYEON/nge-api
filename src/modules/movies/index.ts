import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { MoviesModel } from "./model";
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
      response: {
        200: MoviesModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
