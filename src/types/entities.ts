export interface Studio {
  id: string;
  name: string;
  founded: number;
  location: string;
  website: string | null;
}

export interface Show {
  id: string;
  title: string;
  titleJapanese: string;
  episodes: number;
  aired: string;
  synopsis: string;
}

export interface Movie {
  id: string;
  title: string;
  titleJapanese: string;
  releaseDate: string;
  runtime: number;
  synopsis: string;
}

export interface Character {
  id: string;
  name: string;
  nameJapanese: string;
  age: number | null;
  gender: string;
  occupations: string[];
  bio: string;
}

export interface Organization {
  id: string;
  name: string;
  nameJapanese: string;
  type: string;
  description: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  titleJapanese: string;
  airDate: string;
  synopsis: string;
}

export interface Angel {
  id: string;
  name: string;
  nameJapanese: string;
  number: number;
  description: string;
}

export interface Eva {
  id: string;
  name: string;
  nameJapanese: string;
  designation: string;
  type: string;
  description: string;
}
