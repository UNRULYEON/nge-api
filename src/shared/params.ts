import { t } from "elysia";

export const idParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Resource UUID",
  }),
});
