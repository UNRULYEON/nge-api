import { GraphQLObjectType, GraphQLString } from "graphql";

export type Episode = {
  id: string;
  number: string;
  title: {
    english: string;
    japanese: string;
    romaji: string;
  };
};

export const episodeGraphQLType = new GraphQLObjectType({
  name: "Episode",
  fields: () => ({
    id: { type: GraphQLString },
    number: { type: GraphQLString },
    titleEnglish: {
      type: GraphQLString,
    },
    titleJapanese: {
      type: GraphQLString,
    },
    titleRomaji: {
      type: GraphQLString,
    },
  }),
});
