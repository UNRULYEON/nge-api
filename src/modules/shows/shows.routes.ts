import { Elysia } from "elysia";

import { repository } from "./shows.repository";
import { ShowsModel } from "./shows.schema";

export const shows = new Elysia({
  prefix: "/shows",
  tags: ["shows"],
}).get(
  "/",
  () => {
    const shows = repository.all();

    return shows;
  },
  {
    detail: {
      description: "Get a list of all shows.",
    },
    response: {
      200: ShowsModel.list,
    },
  },
);
