import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { EpisodesModel } from "../episodes/model";
import { MoviesModel } from "../movies/model";
import { OrganizationsModel } from "../organizations/model";
import { ShowsModel } from "../shows/model";
import { CharactersModel } from "./model";

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
      detail: {
        description: "Get a list of all characters.",
      },
      response: {
        200: CharactersModel.listResponse,
      },
    },
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
      detail: {
        description: "Get a character by ID.",
      },
      response: {
        200: CharactersModel.getResponse,
        404: BaseModel.notFound,
      },
    },
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
      detail: {
        description: "Get a list of shows for a character.",
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
      const character = repositories.characters.getById(params.id);

      if (!character) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.characters.getMovies(params.id);
    },
    {
      detail: {
        description: "Get a list of movies for a character.",
      },
      response: {
        200: MoviesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
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
      detail: {
        description: "Get a list of episodes for a character.",
      },
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
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
      detail: {
        description: "Get a list of organizations for a character.",
      },
      response: {
        200: OrganizationsModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
