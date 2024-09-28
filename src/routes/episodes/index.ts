import { Router } from "jsr:@oak/oak/router";
import { NGE } from "@/data/episodes/index.ts";

const router = new Router();

router.get("/episodes", (ctx) => {
  ctx.response.body = NGE;
});

export { router };
