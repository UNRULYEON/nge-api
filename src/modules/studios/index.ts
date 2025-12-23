import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { StudiosModel } from "./model";
import { ShowsModel } from "../shows/model";
import { MoviesModel } from "../movies/model";
import { StaffModel } from "../staff/model";
import { BaseModel } from "@/utils/base-model";

export const studios = new Elysia({
  prefix: "/studios",
  tags: ["studios"],
})
  .get(
    "/",
    () => {
      return repositories.studios.getAll();
    },
    {
      response: {
        200: StudiosModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const studio = repositories.studios.getById(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return studio;
    },
    {
      response: {
        200: StudiosModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/shows",
    ({ params }) => {
      const studio = repositories.studios.getById(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.studios.getShows(params.id);
    },
    {
      response: {
        200: ShowsModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/movies",
    ({ params }) => {
      const studio = repositories.studios.getById(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.studios.getMovies(params.id);
    },
    {
      response: {
        200: MoviesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/staff",
    ({ params }) => {
      const studio = repositories.studios.getById(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.studios.getStaff(params.id);
    },
    {
      response: {
        200: StaffModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
