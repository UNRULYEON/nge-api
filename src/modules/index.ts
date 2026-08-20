import { docs } from "@/modules/docs/docs.routes";
import { episodes } from "@/modules/episodes/episodes.routes";
import { health } from "@/modules/health/health.routes";
import { mcp } from "@/modules/mcp/mcp.routes";
import { movies } from "@/modules/movies/movies.routes";
import { shows } from "@/modules/shows/shows.routes";
import { studios } from "@/modules/studios/studios.routes";

export const modules = {
  docs,
  health,
  shows,
  studios,
  episodes,
  movies,
  mcp,
};
