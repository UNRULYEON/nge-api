import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => c.text("Hello, world!"));

export default health;
