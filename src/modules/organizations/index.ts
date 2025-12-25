import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { BaseModel } from "@/utils/base-model";
import { CharactersModel } from "../characters/model";
import { EpisodesModel } from "../episodes/model";
import { OrganizationsModel } from "./model";

export const organizations = new Elysia({
  prefix: "/organizations",
  tags: ["organizations"],
})
  .get(
    "/",
    () => {
      return repositories.organizations.getAll();
    },
    {
      detail: {
        description: "Get a list of all organizations.",
      },
      response: {
        200: OrganizationsModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return organization;
    },
    {
      detail: {
        description: "Get an organization by ID.",
      },
      response: {
        200: OrganizationsModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/characters",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.organizations.getCharacters(params.id);
    },
    {
      detail: {
        description: "Get a list of characters for an organization.",
      },
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const organization = repositories.organizations.getById(params.id);

      if (!organization) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.organizations.getEpisodes(params.id);
    },
    {
      detail: {
        description: "Get a list of episodes for an organization.",
      },
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
