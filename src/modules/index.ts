import { episodes } from "@/modules/episodes/episodes.routes";
import { health } from "@/modules/health/health.routes";
import { shows } from "@/modules/shows/shows.routes";
import { studios } from "@/modules/studios/studios.routes";
import { movies } from "@/modules/movies/movies.routes";

export const modules = {
  health,
  shows,
  studios,
  episodes,
  movies,
};
