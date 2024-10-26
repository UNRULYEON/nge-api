import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => c.text("OK"));

export default health;
