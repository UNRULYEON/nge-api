import { Elysia, NotFoundError } from "elysia";
import { repositories } from "@/repositories";
import { StaffModel } from "./model";
import { StudiosModel } from "../studios/model";
import { BaseModel } from "@/utils/base-model";

export const staff = new Elysia({
  prefix: "/staff",
  tags: ["staff"],
})
  .get(
    "/",
    () => {
      return repositories.staff.getAll();
    },
    {
      response: {
        200: StaffModel.listResponse,
      },
    },
  )
  .get(
    "/:id",
    ({ params }) => {
      const member = repositories.staff.getById(params.id);

      if (!member) {
        throw new NotFoundError("NOT_FOUND");
      }

      return member;
    },
    {
      response: {
        200: StaffModel.getResponse,
        404: BaseModel.notFound,
      },
    },
  )
  .get(
    "/:id/studios",
    ({ params }) => {
      const member = repositories.staff.getById(params.id);

      if (!member) {
        throw new NotFoundError("NOT_FOUND");
      }

      return repositories.staff.getStudios(params.id);
    },
    {
      response: {
        200: StudiosModel.listResponse,
        404: BaseModel.notFound,
      },
    },
  );
