import { t, type UnwrapSchema } from "elysia";

export namespace StudiosModel {
  export const studioType = t.Object({
    id: t.String(),
    name: t.String(),
    founded: t.Number(),
    location: t.String(),
    website: t.Nullable(t.String()),
  });

  export const list = t.Array(studioType);
  export const studio = t.Nullable(studioType);
}
