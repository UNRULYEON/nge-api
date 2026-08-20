import { cache } from "./cache";
import { cors } from "./cors";
import { errors } from "./errors";
import { openapi } from "./openapi";

export const plugins = { cors, cache, errors, openapi };
