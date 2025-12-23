import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { CharactersModel } from "./model";
import { ShowsModel } from "../shows/model";
import { MoviesModel } from "../movies/model";
import { EpisodesModel } from "../episodes/model";
import { OrganizationsModel } from "../organizations/model";
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
  )
  .get(
    "/:id/shows",
    ({ params }) => {
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.characters.getShows(params.id);
    },
    {
      response: {
        200: ShowsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/movies",
    ({ params }) => {
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.characters.getMovies(params.id);
    },
    {
      response: {
        200: MoviesModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.characters.getEpisodes(params.id);
    },
    {
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/organizations",
    ({ params }) => {
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.characters.getOrganizations(params.id);
    },
    {
      response: {
        200: OrganizationsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  );
