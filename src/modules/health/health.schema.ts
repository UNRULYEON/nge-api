import { t, type UnwrapSchema } from "elysia";

export namespace HealthSchema {
  export const response = t.String({
    default: "OK",
  });
}

export type HealthSchema = {
  [k in keyof typeof HealthSchema]: UnwrapSchema<(typeof HealthSchema)[k]>;
};
