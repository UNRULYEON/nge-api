// import { Router } from "jsr:@oak/oak/router";
// import { DIRECTORS, NGE, PEOPLE, WRITERS } from "@/data/index.ts";

// const router = new Router();

// router.get("/episodes", (ctx) => {
//   ctx.response.body = NGE;
// });

// router.get("/episodes/:id", (ctx) => {
//   const paramId = ctx.params.id;

//   if (!paramId) {
//     ctx.throw(400, "No episode ID provided");
//   }

//   const episode = NGE.find((episode) => episode.id === paramId);

//   if (!episode) {
//     ctx.throw(404, "Episode not found");
//   }

//   ctx.response
//     .body = episode;
// });

// router.get("/episodes/:id/directors", (ctx) => {
//   const paramId = ctx.params.id;

//   if (!paramId) {
//     ctx.throw(400, "No episode ID provided");
//   }

//   const episode = NGE.find((episode) => episode.id === paramId);

//   if (!episode) {
//     ctx.throw(404, "Episode not found");
//   }

//   const directorIds = DIRECTORS
//     .filter((director) => director.episodes.includes(paramId))
//     .flatMap((director) => director.person);

//   const directors = PEOPLE.filter((person) => directorIds.includes(person.id));

//   ctx.response.body = directors;
// });

// router.get("/episodes/:id/writers", (ctx) => {
//   const paramId = ctx.params.id;

//   if (!paramId) {
//     ctx.throw(400, "No episode ID provided");
//   }

//   const episode = NGE.find((episode) => episode.id === paramId);

//   if (!episode) {
//     ctx.throw(404, "Episode not found");
//   }

//   const writerIds = WRITERS
//     .filter((writer) => writer.episodes.includes(paramId))
//     .flatMap((writer) => writer.person);

//   const writers = PEOPLE.filter((person) => writerIds.includes(person.id));

//   ctx.response.body = writers;
// });

// export { router };
