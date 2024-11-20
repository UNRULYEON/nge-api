import { charactersRepository } from "./characters";
import { episodesRepository } from "./episodes";
import { moviesRepository } from "./movies";
import { personRepository } from "./people";
import { tvShowsRepository } from "./tvShows";

const repositories = {
  characters: charactersRepository,
  episodes: episodesRepository,
  movies: moviesRepository,
  tvShows: tvShowsRepository,
  person: personRepository,
};

export { repositories };
