import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { EpisodesModel } from "./model";
import { CharactersModel } from "../characters/model";
import { AngelsModel } from "../angels/model";
import { OrganizationsModel } from "../organizations/model";
import { ShowsModel } from "../shows/model";
import { BaseModel } from "@/utils/base-model";

export const episodes = new Elysia({
  prefix: "/episodes",
  tags: ["episodes"],
})
  .get(
    "/",
    () => {
      return repositories.episodes.getAll();
    },
    {
      response: {
        200: EpisodesModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return episode;
    },
    {
      response: {
        200: EpisodesModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getCharacters(params.id);
    },
    {
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/angels",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getAngels(params.id);
    },
    {
      response: {
        200: AngelsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/organizations",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.episodes.getOrganizations(params.id);
    },
    {
      response: {
        200: OrganizationsModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/show",
    ({ params }) => {
      const episode = repositories.episodes.getById(params.id);

      if (!episode) {
        throw new NotFoundError("NOT_FOUND");
      }

      const show = repositories.episodes.getShow(params.id);

      if (!show) {
        throw new NotFoundError("NOT_FOUND");
      }

      return show;
    },
    {
      response: {
        200: ShowsModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  );
