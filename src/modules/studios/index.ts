import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { MoviesModel } from "../movies/model";
import { ShowsModel } from "../shows/model";
import { StaffModel } from "../staff/model";
import { StudiosModel } from "./model";

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
      detail: {
        description: "Get a list of all studios.",
      },
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
      detail: {
        description: "Get a studio by ID.",
      },
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
      detail: {
        description: "Get a list of shows for a studio.",
      },
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
      detail: {
        description: "Get a list of movies for a studio.",
      },
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
      detail: {
        description: "Get a list of staff for a studio.",
      },
      response: {
        200: StaffModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
