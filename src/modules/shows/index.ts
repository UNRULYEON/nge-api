import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { CharactersModel } from "../characters/model";
import { EpisodesModel } from "../episodes/model";
import { StudiosModel } from "../studios/model";
import { ShowsModel } from "./model";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
})
  .get(
    "/",
    () => {
      return repositories.shows.getAll();
    },
    {
      detail: {
        description: "Get a list of all shows.",
      },
      response: {
        200: ShowsModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const show = repositories.shows.getById(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return show;
    },
    {
      detail: {
        description: "Get a show by ID.",
      },
      response: {
        200: ShowsModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const show = repositories.shows.getById(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getByShowId(params.id);
    },
    {
      detail: {
        description: "Get a list of episodes for a show.",
      },
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const show = repositories.shows.getById(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.shows.getCharacters(params.id);
    },
    {
      detail: {
        description: "Get a list of characters for a show.",
      },
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/studio",
    ({ params }) => {
      const show = repositories.shows.getById(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      const studio = repositories.shows.getStudio(params.id);

      if (!studio) {
        throw new NotFoundError("NOT_FOUND");
      }

      return studio;
    },
    {
      detail: {
        description: "Get the studio for a show.",
      },
      response: {
        200: StudiosModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  );
