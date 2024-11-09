import { charactersRepository } from "./characters";
import { moviesRepository } from "./movies";
import { personRepository } from "./people";

const repositories = {
  characters: charactersRepository,
  movies: moviesRepository,
  person: personRepository,
};

export { repositories };
