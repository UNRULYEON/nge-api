import { GraphQLObjectType, GraphQLString } from "graphql";
import { episodeGraphQLType } from "@/types";

export type Person = {
  id: string;
  name: string;
  imageUrl: string;
};

export const peopleGraphQLType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    imageUrl: {
      type: GraphQLString,
    },
    written: {
      type: episodeGraphQLType,
    },
    directed: {
      type: episodeGraphQLType,
    },
  }),
});
