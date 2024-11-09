import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";

const helloWorld = new OpenAPIHono();

helloWorld.openapi(routes.base, (c) => c.text("Hello, world!"));

export default helloWorld;
