import { Router } from "jsr:@oak/oak/router";
import { DIRECTORS, NGE, PEOPLE, WRITERS } from "@/data/index.ts";

const router = new Router();

router.get("/people", (ctx) => {
  ctx.response.body = PEOPLE;
});

router.get("/people/:id", (ctx) => {
  const paramId = ctx.params.id;

  if (!paramId) {
    ctx.throw(400, "No person ID provided");
  }

  const person = PEOPLE.find((person) => person.id === paramId);

  if (!person) {
    ctx.throw(404, "Person not found");
  }

  ctx.response
    .body = person;
});

router.get("/people/:id/directed", (ctx) => {
  const paramId = ctx.params.id;

  if (!paramId) {
    ctx.throw(400, "No person ID provided");
  }

  const person = PEOPLE.find((person) => person.id === paramId);

  if (!person) {
    ctx.throw(404, "Person not found");
  }

  const episodeIds = DIRECTORS
    .filter((director) => director.person === paramId)
    .flatMap((director) => director.episodes);

  const episodes = NGE.filter((episode) => episodeIds.includes(episode.id));

  ctx.response
    .body = episodes;
});

router.get("/people/:id/written", (ctx) => {
  const paramId = ctx.params.id;

  if (!paramId) {
    ctx.throw(400, "No person ID provided");
  }

  const person = PEOPLE.find((person) => person.id === paramId);

  if (!person) {
    ctx.throw(404, "Person not found");
  }

  const episodeIds = WRITERS
    .filter((writer) => writer.person === paramId)
    .flatMap((writer) => writer.episodes);

  const episodes = NGE.filter((episode) => episodeIds.includes(episode.id));

  ctx.response
    .body = episodes;
});

export { router };
