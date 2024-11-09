import { moviesRepository } from "./movies";
import { personRepository } from "./people";

const repositories = {
  person: personRepository,
  movies: moviesRepository,
};

export { repositories };
