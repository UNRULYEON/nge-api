import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";

const health = new OpenAPIHono();

health.openapi(routes.base, (c) => c.text("OK"));

export default health;
