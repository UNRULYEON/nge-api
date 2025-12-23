import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { EvaUnitsModel } from "./model";
import { CharactersModel } from "../characters/model";
import { EpisodesModel } from "../episodes/model";
import { MoviesModel } from "../movies/model";
import { BaseModel } from "@/utils/base-model";

export const evaUnits = new Elysia({
  prefix: "/eva-units",
  tags: ["eva-units"],
})
  .get(
    "/",
    () => {
      return repositories.evaUnits.getAll();
    },
    {
      response: {
        200: EvaUnitsModel.listResponse,
      },
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      const evaUnit = repositories.evaUnits.getById(params.id);

      if (!evaUnit) {
        throw new NotFoundError("NOT_FOUND");
      }

      return evaUnit;
    },
    {
      response: {
        200: EvaUnitsModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/pilots",
    ({ params }) => {
      const evaUnit = repositories.evaUnits.getById(params.id);

      if (!evaUnit) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.evaUnits.getPilots(params.id);
    },
    {
      response: {
        200: CharactersModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/soul",
    ({ params }) => {
      const evaUnit = repositories.evaUnits.getById(params.id);

      if (!evaUnit) {
        throw new NotFoundError("NOT_FOUND");
      }

      const soul = repositories.evaUnits.getSoul(params.id);

      if (!soul) {
        throw new NotFoundError("NOT_FOUND");
      }

      return soul;
    },
    {
      response: {
        200: CharactersModel.getResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/episodes",
    ({ params }) => {
      const evaUnit = repositories.evaUnits.getById(params.id);

      if (!evaUnit) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.evaUnits.getEpisodes(params.id);
    },
    {
      response: {
        200: EpisodesModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  )
  .get(
    "/:id/movies",
    ({ params }) => {
      const evaUnit = repositories.evaUnits.getById(params.id);

      if (!evaUnit) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.evaUnits.getMovies(params.id);
    },
    {
      response: {
        200: MoviesModel.listResponse,
        404: BaseModel.notFound,
      },
    }
  );
