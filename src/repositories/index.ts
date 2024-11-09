import { charactersRepository } from "./characters";
import { episodesRepository } from "./episodes";
import { moviesRepository } from "./movies";
import { personRepository } from "./people";

const repositories = {
  characters: charactersRepository,
  episodes: episodesRepository,
  movies: moviesRepository,
  person: personRepository,
};

export { repositories };
